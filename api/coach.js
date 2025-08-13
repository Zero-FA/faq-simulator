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
You are CoachBot, a training assistant for a futures prop firm simulator.

Your job:
Ask ONE concise, clear, and varied question a trainee should be able to answer based ONLY on the provided FAQ context.

Rules:
- Do NOT include the answer.
- Do NOT repeat phrasing used in your previous questions — especially starting every question with "What".
- Rotate question styles: use "How", "When", "Why", "Which", "Describe", "Explain", etc.
- You can rephrase the same concept in different ways across turns (e.g., "Explain the..." vs "What is the purpose of...").
- If the FAQ context is limited, pick a different valid detail instead of repeating past questions.
- Your tone should match a real trainer: natural, precise, and professional.

Examples of good question openings:
- "How does..."
- "Why is..."
- "When should a trader..."
- "Which rule applies if..."
- "Describe the process for..."
- "Explain what happens when..."

Always return just the question, nothing else.

Channel: ${channel}
`.trim();

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
