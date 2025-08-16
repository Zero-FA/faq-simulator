export const config = { runtime: 'nodejs' };
// /api/coach.js — Vercel Serverless Function (NO AUTH)

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

    const {
      channel = '#platform-setup',
      history = [],
      faqMd = '',
      usedIndexes = [] // NEW
    } = body || {};

    if (!faqMd) return res.status(400).json({ error: 'Missing faqMd' });

    // --- Random chunk selection ---
    const chunks = chunkText(faqMd, 2800);
    let used = Array.isArray(usedIndexes) ? [...usedIndexes] : [];
    if (used.length >= chunks.length) used = []; // reset when all used
    const available = chunks.map((_, i) => i).filter(i => !used.includes(i));
    const selectedIndex = available[Math.floor(Math.random() * available.length)];
    used.push(selectedIndex);
    const context = chunks[selectedIndex];
    // --------------------------------

    const system = `
You are CoachBot for a futures prop firm training sim.
ONLY use the FAQ context provided. If it's not in the context, ask about a different detail from the context.
Ask exactly ONE concise, realistic question a trainee should be able to answer from the FAQ.
Avoid yes/no questions; prefer "how / what / when" style. Do not include the answer.
Channel: ${channel}
`.trim();

    const messages = [
      { role: 'system', content: system },
      { role: 'user', content: `FAQ CONTEXT (Markdown):\n${context}` },
      ...(Array.isArray(history) ? history : [])
    ];

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1', // ✅ switched to GPT-5
        temperature: 0.4,
        messages
      })
    });

    const data = await aiRes.json().catch(e => ({ parseError: String(e) }));
    if (!aiRes.ok) {
      return res.status(aiRes.status).json({ error: 'OpenAI error', detail: data });
    }

    const question = data?.choices?.[0]?.message?.content?.trim?.() || '';
    if (!question) {
      return res.status(500).json({ error: 'No question from model', raw: data });
    }

    return res.status(200).json({
      reply: { role: 'assistant', content: question },
      usage: data.usage || null,
      usedIndexes: used, // ✅ send back updated list
      selectedIndex
    });
  } catch (err) {
    return res.status(500).json({ error: 'Unhandled Coach error', detail: String(err) });
  }
}

// --- helpers ---
function chunkText(t, n = 2800) {
  const out = [];
  for (let i = 0; i < t.length; i += n) out.push(t.slice(i, i + n));
  return out;
}
