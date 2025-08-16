export const config = { runtime: 'nodejs' };

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

    // Parse request
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body || '{}'); }
      catch (e) { return res.status(400).json({ error: 'Bad JSON', detail: String(e) }); }
    }

    const {
      channel = '#platform-setup',
      history = [],
      faqMd = '',
      usedIndexes = [],
      usedQuestions = [] // track previous questions in the run
    } = body || {};

    if (!faqMd) return res.status(400).json({ error: 'Missing faqMd' });

    const chunks = chunkText(faqMd, 2800);
    let usedIdx = Array.isArray(usedIndexes) ? [...usedIndexes] : [];
    let usedQ = Array.isArray(usedQuestions) ? [...usedQuestions] : [];

    // Pick a chunk — avoid repeats if possible
    if (usedIdx.length >= chunks.length) usedIdx = []; // reset chunk use if all used

    let available = chunks.map((_, i) => i).filter(i => !usedIdx.includes(i));
    if (available.length === 0) available = chunks.map((_, i) => i); // if fewer chunks than needed

    const selectedIndex = available[Math.floor(Math.random() * available.length)];
    usedIdx.push(selectedIndex);

    const context = chunks[selectedIndex];

const system = `
You are CoachBot for a futures prop firm training simulation.

You must create exactly ONE clear, concise, fact-based question that a trainee should be able to answer by reading the FAQ context provided.

Rules for the question:
1. It MUST be in question form and end with a question mark (?).
2. It MUST be fully answerable from the provided FAQ context — do not make up or assume anything not in the context.
3. Do NOT include the answer, hints, clues, or “fill in the blank” formats.
4. Avoid yes/no questions; prefer "how", "what", "when", "where", or "why" style.
5. Avoid repeating, rewording, or asking about the same fact or topic as any previous questions in the current run (even if phrased differently).
6. Aim for variety — select a different detail or topic from the FAQ each time.
7. Keep it concise — no more than one sentence.

Channel: ${channel}
`.trim();

    const messages = [
      { role: 'system', content: system },
      { role: 'user', content: `FAQ CONTEXT (Markdown):\n${context}` },
      ...(Array.isArray(history) ? history : [])
    ];

    // Generate until we get a unique question (avoid duplicates if chunk reused)
    let question = '';
    let tries = 0;
    while ((!question || usedQ.includes(question)) && tries < 3) {
      tries++;
      const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1', // swap to gpt-5 when available
          temperature: 0.4,
          messages
        })
      });

      const data = await aiRes.json().catch(e => ({ parseError: String(e) }));
      if (!aiRes.ok) {
        return res.status(aiRes.status).json({ error: 'OpenAI error', detail: data });
      }

      question = data?.choices?.[0]?.message?.content?.trim?.() || '';
    }

    if (!question) {
      return res.status(500).json({ error: 'No question from model' });
    }

    usedQ.push(question);

    return res.status(200).json({
      reply: { role: 'assistant', content: question },
      usedIndexes: usedIdx,
      usedQuestions: usedQ
    });
  } catch (err) {
    return res.status(500).json({ error: 'Unhandled Coach error', detail: String(err) });
  }
}

function chunkText(t, n = 2800) {
  const out = [];
  for (let i = 0; i < t.length; i += n) out.push(t.slice(i, i + n));
  return out;
}
