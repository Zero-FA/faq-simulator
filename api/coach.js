// /api/coach.js
const fs = require('fs/promises');
const path = require('path');

function normalizeChannel(input) {
  const s = String(input || '').trim();
  return s.startsWith('#') ? s.slice(1) : s;
}

function fileForChannel(channelId) {
  return path.join(process.cwd(), 'faqs', 'questions', `${channelId}.json`);
}

function stateFileFor(channelId, sessionId) {
  const safe = String(sessionId || 'default').replace(/[^a-zA-Z0-9._-]/g, '_');
  return path.join(process.cwd(), 'faqs', 'state', `${channelId}.${safe}.json`);
}

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function ensureDir(p) {
  try { await fs.mkdir(p, { recursive: true }); } catch {}
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body || '{}'); }
      catch (e) { return res.status(400).json({ error: 'Bad JSON', detail: String(e) }); }
    }

    const {
      channel = '#platform-setup',
      avoid = [],        // optional: client-supplied list to skip
      sessionId = 'default' // NEW: track progress & avoid repeats per session
    } = body || {};

    const channelId = normalizeChannel(channel);
    const qFile = fileForChannel(channelId);

    // Load questions
    let raw;
    try {
      raw = await fs.readFile(qFile, 'utf8');
    } catch {
      return res.status(404).json({ error: `No question file for channel '${channelId}'` });
    }

    let questions;
    try {
      questions = JSON.parse(raw);
    } catch {
      return res.status(500).json({ error: `Invalid JSON in ${qFile}` });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(200).json({
        reply: { role: 'assistant', content: 'Ask: (No questions available for this channel — add items to faqs/questions/<channel>.json)' }
      });
    }

    // Clean the questions list
    const cleaned = questions.map(q => String(q || '').trim()).filter(Boolean);
    if (cleaned.length === 0) {
      return res.status(200).json({
        reply: { role: 'assistant', content: 'Ask: (No questions available for this channel — add items to faqs/questions/<channel>.json)' }
      });
    }

    // Optional stateless filter (still supported)
    const avoidNorm = new Set((avoid || []).map(norm).filter(Boolean));

    // ---- Stateful no-repeat logic (per sessionId) ----
    const stateDir = path.join(process.cwd(), 'faqs', 'state');
    await ensureDir(stateDir);
    const sFile = stateFileFor(channelId, sessionId);

    let state = null;
    try {
      const sRaw = await fs.readFile(sFile, 'utf8');
      state = JSON.parse(sRaw);
    } catch {
      state = null;
    }

    const makeState = () => ({
      order: shuffle(cleaned),
      index: 0,
      sourceLen: cleaned.length,
      updatedAt: Date.now()
    });

    // If state missing or the question set size changed, rebuild
    if (
      !state ||
      !Array.isArray(state.order) ||
      typeof state.index !== 'number' ||
      state.sourceLen !== cleaned.length
    ) {
      state = makeState();
    }

    // Advance until we find a question not in the client-provided avoid list
    let picked = null;
    while (state.index < state.order.length) {
      const candidate = state.order[state.index];
      state.index += 1; // claim it
      if (!avoidNorm.has(norm(candidate))) {
        picked = candidate;
        break;
      }
      // else keep skipping
    }

    if (!picked) {
      // Exhausted for this session
      await fs.writeFile(sFile, JSON.stringify(state, null, 2)).catch(() => {});
      return res.status(200).json({
        reply: { role: 'assistant', content: 'Ask: (No more unique questions available for this channel in this session)' },
        done: true
      });
    }

    // Save progress
    state.updatedAt = Date.now();
    await fs.writeFile(sFile, JSON.stringify(state, null, 2));

    return res.status(200).json({
      reply: { role: 'assistant', content: String(picked).trim() },
      meta: {
        channel: channelId,
        sessionId,
        remaining: Math.max(0, state.order.length - state.index)
      }
    });
  } catch (e) {
    return res.status(500).json({ error: 'Coach error', detail: String(e) });
  }
};

module.exports.config = { runtime: 'nodejs' };
