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
You are CoachBot for a futures prop firm training simulation.

You must create exactly ONE clear, concise, fact-based question that a trainee should be able to answer by reading the FAQ context provided.

Rules:
1. It MUST be in question form and end with a question mark (?).
2. It MUST be fully answerable from the provided FAQ context — do not make up or assume anything not in the context.
3. Do NOT include the answer, hints, clues, or “fill in the blank” formats.
4. Avoid yes/no questions; prefer "how / what / when / where / why" style.
5. Do NOT ask about the same topic, fact, or concept as any previous questions in this session — even if worded differently.
6. If the provided context relates to a topic already covered, select a completely different fact or topic from it.
7. Keep it concise — no more than one sentence.

Channel: ${channel}
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
        model: 'gpt-4.1-mini',
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
      flags: ['needs_work', 'parser_error']
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
