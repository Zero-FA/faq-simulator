// /api/coach.js
const fs = require('fs/promises');
const path = require('path');

/** Normalize "#platform-setup" or "platform-setup" → "platform-setup" */
function normalizeChannel(input) {
  const s = String(input || '').trim();
  return s.startsWith('#') ? s.slice(1) : s;
}

/** Absolute path to the per-channel questions JSON file */
function fileForChannel(channelId) {
  // Files live at: /faqs/questions/<channel>.json
  return path.join(process.cwd(), 'faqs', 'questions', `${channelId}.json`);
}

/** Light normalization to compare strings (case/punct/whitespace insensitive) */
function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Parse body (supports raw string or already-parsed JSON)
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body || '{}'); }
      catch (e) { return res.status(400).json({ error: 'Bad JSON', detail: String(e) }); }
    }
    const {
      channel = '#platform-setup', // can be "#platform-setup" or "platform-setup"
      avoid = [],                  // array of already-asked question strings
      order = 'sequential'         // 'sequential' | 'random'
    } = body || {};

    const channelId = normalizeChannel(channel);
    const file = fileForChannel(channelId);

    // Load questions for this channel
    let raw;
    try {
      raw = await fs.readFile(file, 'utf8');
    } catch {
      return res.status(404).json({ error: `No question file for channel '${channelId}'` });
    }

    let questions;
    try {
      questions = JSON.parse(raw);
    } catch {
      return res.status(500).json({ error: `Invalid JSON in ${file}` });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(500).json({ error: `Empty or invalid question list for '${channelId}'` });
    }

    // Filter out items present in `avoid` (normalized comparison)
    const avoidNorm = new Set((avoid || []).map(norm).filter(Boolean));
    const remaining = questions
      .map(q => String(q || '').trim())
      .filter(q => q && !avoidNorm.has(norm(q)));

    if (remaining.length === 0) {
      return res.status(200).json({
        reply: { role: 'assistant', content: 'Ask: (No more unique questions available for this channel)' }
      });
    }

    // Choose next question
    let nextQ;
    if (order === 'random') {
      nextQ = remaining[Math.floor(Math.random() * remaining.length)];
    } else {
      // default sequential
      // Keep original order by finding the first item from the source list that isn't in avoid
      nextQ = questions.find(q => q && !avoidNorm.has(norm(q)));
      if (!nextQ) nextQ = remaining[0]; // fallback (shouldn't happen)
    }

    return res.status(200).json({
      reply: { role: 'assistant', content: String(nextQ).trim() }
    });
  } catch (e) {
    return res.status(500).json({ error: 'Coach error', detail: String(e) });
  }
};

// Ensure Node runtime in serverless environments that support this flag
module.exports.config = { runtime: 'nodejs' };
