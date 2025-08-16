// /api/coach.js
const fetch = global.fetch;

// Store asked questions in memory for the current session
let askedQuestions = new Set();

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

    // Parse request body
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body || '{}'); }
      catch (e) { return res.status(400).json({ error: 'Bad JSON', detail: String(e) }); }
    }
    const { faqMd = '', numQuestions = 5 } = body || {};
    if (!faqMd) return res.status(400).json({ error: 'Missing faqMd' });

    const systemPrompt = `
You are a coach giving quiz questions to a trainee.
Use ONLY the provided FAQ context.
Rules:
- Do not repeat any questions already given in this session (provided in "ALREADY ASKED" list).
- Only ask clear, distinct, and concise questions.
- Do not ask questions that are essentially the same with slightly different wording.
- No answers should be included.
- The questions should be random and cover a variety of topics from the FAQ.
- Output only a JSON array of questions, nothing else.
`.trim();

    const alreadyAsked = Array.from(askedQuestions);

    const userPrompt = `
FAQ CONTEXT (Markdown):
${faqMd}

ALREADY ASKED:
${alreadyAsked.join("\n")}

Generate ${numQuestions} new, unique questions based on the FAQ.
Do not repeat or rephrase any from the ALREADY ASKED list.
Output JSON only.
`.trim();

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
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

    const raw = data?.choices?.[0]?.message?.content || '[]';
    let questions;
    try { questions = JSON.parse(raw); } catch { questions = []; }

    // Track questions to avoid repeats in future calls
    questions.forEach(q => askedQuestions.add(q));

    return res.status(200).json({ questions });
  } catch (err) {
    return res.status(500).json({ error: 'Unhandled Coach error', detail: String(err) });
  }
}

module.exports = handler;
module.exports.config = { runtime: 'nodejs' };
