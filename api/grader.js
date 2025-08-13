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
You are a strict, fair grader. Grade a trainee's answer using ONLY the provided FAQ context.
- If the question can't be answered from the context, mark passed=false and add "out_of_scope" to flags.
- Be concise and avoid inventing facts.
Return ONLY a compact JSON object with these fields:
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
