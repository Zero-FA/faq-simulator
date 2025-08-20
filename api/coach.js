// /api/coach.js
export const config = { runtime: 'nodejs' };

const fetch = global.fetch;

/* ------------------------ small text utils ------------------------ */
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
    if (nq === np) return true;
    if (Math.abs(nq.length - np.length) < 12 && nq.includes(np)) return true;
    return jaccardSim(nq, np) >= threshold;
  });
}
function chunkText(t, n = 2800) {
  const out = [];
  for (let i = 0; i < t.length; i += n) out.push(t.slice(i, i + n));
  return out;
}
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ------------------ clarification classification ------------------ */
function heuristicClarifier(s) {
  const raw = String(s || '').trim();
  const text = norm(raw);

  if (!raw) return { verdict: 'clarification', confidence: 0.99, reason: 'empty' };

  const cues = [
    'is this','do you mean','which one','which platform','which account','which section',
    'are you asking','what do you mean','what does this mean','can you clarify','clarify',
    'not sure','could you specify','are we talking about','is it about'
  ];

  const isQ = /\?\s*$/.test(raw);
  const tokens = text.split(' ').filter(Boolean).length;

  if (isQ && tokens <= 6) return { verdict: 'clarification', confidence: 0.9, reason: 'very short question' };

  if (isQ) for (const c of cues) if (text.includes(c)) {
    return { verdict: 'clarification', confidence: 0.85, reason: `matched cue "${c}"` };
  }

  if (isQ && /^(is|are|does|do)\s+(this|that|it|you)\b/i.test(raw))
    return { verdict: 'clarification', confidence: 0.8, reason: 'meta-question structure' };

  if (isQ && /^(which|what|where|who|when|how)\b/i.test(raw)) {
    if (!/\b(price|value|step|button|setting|field|number|time|date|account|contract|qty|quantity)\b/i.test(raw)) {
      return { verdict: 'clarification', confidence: 0.7, reason: 'wh-question lacking factual content' };
    }
  }

  return { verdict: 'answer', confidence: 0.6, reason: 'no strong clarification signals' };
}

/* ----------- optional: tiny LLM fallback for classification --------- */
async function llmClarifierFallback(message) {
  const model = process.env.CLARIFIER_MODEL; // e.g., gpt-4o-mini (optional)
  if (!model || !process.env.OPENAI_API_KEY) return null;

  const system = `You are a strict one-word classifier.
Return ONLY "clarification" if the trainee message is asking for scope/clarity/hints.
Return ONLY "answer" if it attempts to answer the coach's question.`;
  const user = `Trainee message: ${JSON.stringify(String(message || '').trim())}`;

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });
    const data = await resp.json().catch(() => ({}));
    const out = data?.choices?.[0]?.message?.content?.trim?.().toLowerCase();
    if (out === 'clarification' || out === 'answer') return out;
  } catch {}
  return null;
}

/* ---------------- tiny helper for clarification replies ------------ */
function buildClarificationReply({ lastQuestion, scopeHint }) {
  const PLATFORM_HINTS = [
    'Tradovate','TradingView','WealthCharts','Rithmic','NinjaTrader Dashboard','aMember','Authorize.net'
  ];

  const qRaw = String(lastQuestion || '').trim();
  const qNorm = norm(qRaw);

  let detected = null;
  for (const p of PLATFORM_HINTS) {
    if (qNorm.includes(norm(p))) { detected = p; break; }
  }
  const scope = scopeHint || detected;

  const prefix = scope
    ? `This one is about ${scope}.`
    : `This one is about the platform referenced in the question.`;

  return qRaw
    ? `${prefix} Now please answer: ${qRaw}`
    : `${prefix} Now please provide your answer.`;
}

/* ----------------------------- handler ---------------------------- */
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Token');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Parse body
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body || '{}'); }
      catch (e) { return res.status(400).json({ error: 'Bad JSON', detail: String(e) }); }
    }

    const {
      channel = '#platform-setup',
      history = [],

      // generation inputs
      faqMd = '',
      usedIndexes = [],
      usedQuestions = [],

      // runtime mode
      task,                  // 'generate' (default), 'classify', or 'chat'
      traineeMsg,
      lastQuestion,
      scopeHint
    } = body || {};

    /* -------------------- branch: classify only -------------------- */
    if (task === 'classify') {
      const heur = heuristicClarifier(traineeMsg);
      let verdict = heur.verdict;
      let confidence = heur.confidence;
      let via = 'heuristic';

      if (confidence < 0.8) {
        const llmVerdict = await llmClarifierFallback(traineeMsg);
        if (llmVerdict) { verdict = llmVerdict; via = 'llm_fallback'; confidence = Math.max(confidence, 0.85); }
      }

      const helperReply =
        verdict === 'clarification' ? buildClarificationReply({ lastQuestion, scopeHint }) : null;

      return res.status(200).json({
        result: {
          type: verdict,                  // 'clarification' | 'answer'
          nextAction: verdict === 'clarification' ? 'respond_with_helper' : 'send_to_grader',
          confidence,
          via,
          helperReply,
          capturedAnswer: verdict === 'answer' ? String(traineeMsg || '').trim() : null
        }
      });
    }

    /* -------------------- branch: chat (no grading) ----------------
       Goal: allow normal convo.
       - If traineeMsg is a clarification: return a 1-line reply (and DO NOT grade).
       - If it's an answer: DO NOT reply; signal the app to send it to the grader.
    -----------------------------------------------------------------*/
    if (task === 'chat') {
      const heur = heuristicClarifier(traineeMsg);
      let verdict = heur.verdict;
      let confidence = heur.confidence;

      if (confidence < 0.8) {
        const llmVerdict = await llmClarifierFallback(traineeMsg);
        if (llmVerdict) { verdict = llmVerdict; confidence = Math.max(confidence, 0.85); }
      }

      if (verdict === 'clarification') {
        const reply = buildClarificationReply({ lastQuestion, scopeHint });
        return res.status(200).json({
          result: {
            type: 'clarification',
            reply,                 // UI should display this message from Coach
            nextAction: 'await_answer' // keep the same question active
          }
        });
      }

      // It's an answer → don't give feedback, just hand it to grader
      return res.status(200).json({
        result: {
          type: 'answer',
          capturedAnswer: String(traineeMsg || '').trim(),
          nextAction: 'send_to_grader'   // your app should call the grader service now
        }
      });
    }

    /* -------------------- default: generate question --------------- */
    if (!faqMd) return res.status(400).json({ error: 'Missing faqMd' });
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY for question generation' });
    }

    const chunks = chunkText(faqMd, 2800);
    if (chunks.length === 0) return res.status(400).json({ error: 'FAQ produced no chunks' });

    // Build available chunk list (no repeat within session until exhausted)
    let usedIdx = Array.isArray(usedIndexes) ? [...usedIndexes] : [];
    if (usedIdx.length >= chunks.length) usedIdx = []; // reset after full coverage

    let available = chunks.map((_, i) => i).filter(i => !usedIdx.includes(i));
    if (available.length === 0) available = chunks.map((_, i) => i);

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

    const priorQs = Array.isArray(usedQuestions) ? usedQuestions : [];

    let question = '';
    let chosenIndex = null;

    for (let attempt = 0; attempt < 6; attempt++) {
      const idx = pickRandom(available);
      const context = chunks[idx];

      const userMsg = `
FAQ CONTEXT (Markdown):
${context}

ALREADY ASKED THIS SESSION:
${priorQs.map((q, i) => `Q${i + 1}: ${q}`).join('\n') || '(none)'}

Produce ONE new question that obeys all rules. Do not include any answers. Return only the question text.
`.trim();

      const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1',
          temperature: 0.4,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: userMsg },
            ...(Array.isArray(history) ? history : []),
          ],
        }),
      });

      const data = await aiRes.json().catch(e => ({ parseError: String(e) }));
      if (!aiRes.ok) {
        return res.status(aiRes.status).json({ error: 'OpenAI error', detail: data });
      }

      const candidate = data?.choices?.[0]?.message?.content?.trim?.() || '';

      if (!candidate || !candidate.endsWith('?')) {
        available = available.filter(i => i !== idx);
        if (available.length === 0) available = chunks.map((_, i) => i);
        continue;
      }

      if (isTooSimilar(candidate, priorQs)) {
        available = available.filter(i => i !== idx);
        if (available.length === 0) available = chunks.map((_, i) => i);
        continue;
      }

      question = candidate;
      chosenIndex = idx;
      break;
    }

    if (!question) {
      return res.status(500).json({ error: 'Failed to generate a unique question' });
    }

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
