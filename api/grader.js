export const config = { runtime: 'nodejs' };
// /api/grader.js — Vercel Serverless Function (NO AUTH)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Token');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
    }

// Parse body
let body = req.body;
if (typeof body === 'string') {
  try { body = JSON.parse(body || '{}'); }
  catch (e) { return res.status(400).json({ error: 'Bad JSON', detail: String(e) }); }
}
const { channel = '#platform-setup', question = '', answer = '', faqMd = '' } = body || {};
if (!faqMd) return res.status(400).json({ error: 'Missing faqMd' });

const system = `
You are a strict, fair grader. Use ONLY the provided FAQ context as the ground truth.

Goal:
- Judge whether the trainee’s answer is semantically correct given the FAQ, even if it’s not word-for-word.
- Allow reasonable paraphrasing, synonyms, and small harmless additions that don’t contradict the FAQ.
- Do NOT infer new facts that aren’t supported by the FAQ.

Passing rule:
- passed=true if the answer covers the essential facts from the FAQ with no contradictions, even if phrased differently or with minor extra detail that is plausible but not explicitly named in the FAQ.
- Use a semantic match threshold ≈ 0.7 coverage of the key required points for the question, with zero contradictions.
- If it’s mostly right but adds small extras not explicitly in the FAQ, still pass and add "minor_overreach" to flags.

Failing rule:
- passed=false if:
  - The FAQ does not contain the needed information (flag "out_of_scope").
  - The answer contradicts the FAQ (flag "contradiction").
  - The answer misses a critical required element (list it in "missing").
  - The answer is too vague to confirm against the FAQ (flag "needs_precision").

How to compare:
- Prefer meaning over exact wording. Accept synonyms and equivalent phrasings.
- If the trainee gives specific names/details that the FAQ doesn’t list, but those specifics don’t conflict with the FAQ, allow it and flag "minor_overreach".
- If the trainee includes extras that change the meaning or add requirements not supported by the FAQ, fail and flag "contradiction" or "unsupported_requirement".

What to return:
Return ONLY a compact JSON object:
{ "passed": boolean, "why": string, "matched": string[], "missing": string[], "flags": string[] }

Field rules:
- "why": 1–2 short sentences explaining your decision.
- "matched": brief points mapping trainee claims to the FAQ (semantic matches OK).
- "missing": essential points not mentioned (empty array if none).
- "flags": zero or more of ["minor_overreach","contradiction","out_of_scope","needs_precision","format_error"].

Edge-case guidance:
- If the trainee answers: “You need to sign the professional agreement along with the user agreement,” and the FAQ only says “You need to sign the agreements,” mark passed=true, flags=["minor_overreach"].
- If the trainee lists a requirement the FAQ does NOT support, mark passed=false and flags=["unsupported_requirement"] or "contradiction".
`.trim();

const userMsg = `
FAQ CONTEXT (Markdown):
${faqMd}

QUESTION:
${question}

TRAINEE ANSWER:
${answer}

Return JSON only.
`.trim();

const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: userMsg }
    ]
  })
});

    const data = await aiRes.json().catch(e => ({ parseError: String(e) }));
    if (!aiRes.ok) {
      return res.status(aiRes.status).json({ error: 'OpenAI error', detail: data });
    }

    const raw = data?.choices?.[0]?.message?.content || '';
    const graded = safeJSON(raw) || {
      passed: false,
      why: 'Grader returned non-JSON response.',
      matched: [],
      missing: [],
      flags: ['parser_error']
    };

    return res.status(200).json(graded);
  } catch (err) {
    return res.status(500).json({ error: 'Unhandled Grader error', detail: String(err) });
  }
}

// Try to extract a JSON object from a model response
function safeJSON(txt) {
  try {
    return JSON.parse(txt);
  } catch {
    const m = txt.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try { return JSON.parse(m[0]); } catch { return null; }
  }
}
