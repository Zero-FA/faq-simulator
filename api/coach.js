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
    const { channel = '#platform-setup', history = [], faqMd = '' } = body || {};
    if (!faqMd) return res.status(400).json({ error: 'Missing faqMd' });

    // Build lightweight retrieval context from last user message
    const lastUser = [...(Array.isArray(history) ? history : [])]
      .reverse().find(m => m?.role === 'user')?.content || '';
    const chunks = chunkText(faqMd, 2800);
    const terms = (lastUser.toLowerCase().match(/\b[a-z]{4,}\b/g) || []);
    const ranked = chunks.map((c, i) => ({
      i, c, score: terms.filter(w => c.toLowerCase().includes(w)).length
    })).sort((a, b) => b.score - a.score);
    const context = ranked.slice(0, 2).map(r => r.c).join('\n---\n');

    const system = `
You are CoachBot, the training assistant for a futures prop firm simulator.

Your task:
Generate ONE realistic, relevant question a trainee should be able to answer **based solely on the provided FAQ context**.

Guidelines:
- Only ask about information that appears **explicitly** in the FAQ context.
- Do NOT include the answer.
- Avoid yes/no questions. Favor open-ended formats: "how", "what", "when", "why", etc.
- Each question must be concise, clear, and practical — like something a team lead would ask in onboarding.
- If the context is too limited or the info is missing, ask about a **different valid detail** from the context instead.
- Vary the phrasing across turns to avoid repetition.
- Stay within the tone of a professional trainer: neutral, precise, and curious.

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
        model: 'gpt-4o-mini',
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
      usage: data.usage || null
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
