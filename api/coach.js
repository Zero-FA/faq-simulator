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

// --- helpers ---
function chunkText(t, n = 2800) {
  const out = [];
  for (let i = 0; i < t.length; i += n) out.push(t.slice(i, i + n));
  return out;
}
