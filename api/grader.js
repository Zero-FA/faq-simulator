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
You are 'Coach', a strict but helpful grading assistant for Apex Trader Funding FAQs. Your job is to evaluate a trainee’s answer using ONLY the provided FAQ context.

Your goals:
1. Judge accuracy and completeness.
2. Detect if any part of the answer is outside the FAQ context (do not hallucinate).
3. Provide **constructive feedback** when the answer is wrong or incomplete, to help the trainee improve.

Instructions:
- Do not invent facts or go beyond the FAQ context.
- Allow for **partial matches**: identify which parts of the answer align with the FAQ and which do not.
- Be strict but fair: small errors = "passed: false", but reward good understanding.
- Do not explain the FAQ — focus on feedback about their answer.

Output ONLY a JSON object with the following fields:

{
  "passed": boolean,                     // true only if the answer is fully correct per FAQ
  "why": string,                         // clear reason why it passed or failed, in simple language
  "matched": string[],                   // quotes or paraphrases from the FAQ that were matched correctly
  "missing": string[],                   // key ideas or phrases from the FAQ that were missing or misrepresented
  "flags": string[],                     // ["out_of_scope"] if irrelevant info was included, or other issues
  "feedback": string                     // helpful tip on how to improve the answer (only if passed=false)
}

Examples of flags:
- "out_of_scope" → content not in FAQ
- "partial_match" → almost correct, but missing key detail
- "misinterpretation" → misunderstood the FAQ info

Always return valid JSON.
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
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
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
