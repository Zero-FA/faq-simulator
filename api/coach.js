// /api/coach.js
export const config = { runtime: 'nodejs' };

const fetch = global.fetch;

// --- simple similarity guard (no extra API calls) ---
function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function jaccardSim(a, b) {
  const A = new Set(norm(a).split(' ').filter(Boolean));
  const B = new Set(norm(b).split(' ').filter(Boolean));
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / (A.size + B.size - inter);
}
function isTooSimilar(q, prevList, threshold = 0.78) {
  const nq = norm(q);
  return prevList.some(p => {
    const np = norm(p);
    if (nq === np) return true;                // exact after normalization
    if (Math.abs(nq.length - np.length) < 12 && nq.includes(np)) return true; // near substring
    return jaccardSim(nq, np) >= threshold;    // token overlap
  });
}

// --- helpers ---
function chunkText(t, n = 2800) {
  const out = [];
  for (let i = 0; i < t.length; i += n) out.push(t.slice(i, i + n));
  return out;
}
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default async function handler(req, res) {
  // CORS
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
      usedIndexes = [],
      usedQuestions = []
    } = body || {};

    if (!faqMd) return res.status(400).json({ error: 'Missing faqMd' });

    // Chunk FAQ
    const chunks = chunkText(faqMd, 2800);
    if (chunks.length === 0) {
      return res.status(400).json({ error: 'FAQ produced no chunks' });
    }

    // Build available chunk list (no repeat within session until exhausted)
    let usedIdx = Array.isArray(usedIndexes) ? [...usedIndexes] : [];
    if (usedIdx.length >= chunks.length) usedIdx = []; // reset after full coverage

    let available = chunks.map((_, i) => i).filter(i => !usedIdx.includes(i));
    if (available.length === 0) available = chunks.map((_, i) => i);

    // Strong system prompt (back to your one-question flow)
    const system = `
You are CoachBot for a futures prop firm training simulation.

Create exactly ONE clear, concise, fact-based question that a trainee can answer using ONLY the provided FAQ context.

Rules:
1) Output must be a single question and end with a question mark (?).
2) Do NOT include the answer, hints, or fill-in-the-blank formats.
3) Avoid yes/no; prefer "how / what / when / where / why" style.
4) Do NOT repeat any question from THIS SESSION (a list is provided) — avoid rewordings and same single facts.
5) If the context overlaps a previously asked topic, select a different fact from the context.
6) One sentence only.
Channel: ${channel}
`.trim();

    // Prior questions list sent to the model for awareness
    const priorQs = Array.isArray(usedQuestions) ? usedQuestions : [];

    // Try up to N attempts: pick a chunk → ask model → enforce uniqueness
    let question = '';
    let chosenIndex = null;

    for (let attempt = 0; attempt < 6; attempt++) {
      const idx = pickRandom(available);
      const context = chunks[idx];

      const userMsg = `
FAQ CONTEXT (Markdown):
${context}

ALREADY ASKED THIS SESSION:
${priorQs.map((q, i) => `Q${i+1}: ${q}`).join('\n') || '(none)'}

Produce ONE new question that obeys all rules. Do not include any answers. Return only the question text.
`.trim();

      const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1',          // use 4.1 (you can swap to gpt-5 when available)
          temperature: 0.4,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: userMsg },
            ...(Array.isArray(history) ? history : [])
          ]
        })
      });

      const data = await aiRes.json().catch(e => ({ parseError: String(e) }));
      if (!aiRes.ok) {
        return res.status(aiRes.status).json({ error: 'OpenAI error', detail: data });
      }

      const candidate = data?.choices?.[0]?.message?.content?.trim?.() || '';

      // Basic validations
      if (!candidate || !candidate.endsWith('?')) {
        // try another chunk
        available = available.filter(i => i !== idx);
        if (available.length === 0) available = chunks.map((_, i) => i);
        continue;
      }

      // No repeats / near-duplicates within the session
      if (isTooSimilar(candidate, priorQs)) {
        // try a different chunk next
        available = available.filter(i => i !== idx);
        if (available.length === 0) available = chunks.map((_, i) => i);
        continue;
      }

      // Accept
      question = candidate;
      chosenIndex = idx;
      break;
    }

    if (!question) {
      return res.status(500).json({ error: 'Failed to generate a unique question' });
    }

    // Update state to send back to client
    const nextUsedIdx = Array.from(new Set([...(usedIdx || []), chosenIndex]));
    const nextUsedQs = Array.from(new Set([...(priorQs || []), question]));

    return res.status(200).json({
      reply: { role: 'assistant', content: question },
      usedIndexes: nextUsedIdx,
      usedQuestions: nextUsedQs
    });

  } catch (err) {
    return res.status(500).json({ error: 'Unhandled Coach error', detail: String(err) });
  }
}
