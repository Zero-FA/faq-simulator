// /api/grader.js
const fetch = global.fetch;

async function handler(req, res) {
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
- Judge whether the trainee’s answer is semantically correct even if not word-for-word.
- Allow paraphrasing/synonyms and small harmless additions that don’t contradict the FAQ.
- Do NOT invent new facts beyond the FAQ.

Passing rule:
- passed=true if essential facts are covered with zero contradictions (semantic coverage ≈0.7).
- If mostly right but with minor extra detail not named in the FAQ, pass and flag "minor_overreach".

Failing rule:
- passed=false if out_of_scope, contradiction, missing critical elements, or too vague ("needs_precision").

Compare by meaning, accept equivalents; extras that change meaning → fail ("contradiction"/"unsupported_requirement").

Return ONLY:
{ "passed": boolean, "why": string, "matched": string[], "missing": string[], "flags": string[] }
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
        model: 'gpt-4o',
        temperature: 0.2,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userMsg }
        ]
      })
    });

    const dataTxt = await aiRes.text();
    let data;
    try { data = JSON.parse(dataTxt); } catch {
      return res.status(502).json({ error: 'Upstream non-JSON', detail: dataTxt.slice(0, 500) });
    }
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

function safeJSON(txt) {
  try { return JSON.parse(txt); }
  catch {
    const m = txt && txt.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try { return JSON.parse(m[0]); } catch { return null; }
  }
}

module.exports = handler;
module.exports.config = { runtime: 'nodejs' };
