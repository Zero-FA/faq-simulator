// /api/coach.js
const fs = require('fs/promises');
const path = require('path');

function normalizeChannel(input) {
  // Accept "#platform-setup" or "platform-setup"
  const s = String(input || '').trim();
  return s.startsWith('#') ? s.slice(1) : s;
}

function fileForChannel(channelId) {
  // channelId like "platform-setup"
  return path.join(process.cwd(), 'faqs', 'questions', `${channelId}.json`);
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
      avoid = [],         // array of strings (already asked)
      order = 'random'    // 'random' | 'sequential'
    } = body || {};

    const channelId = normalizeChannel(channel);
    const file = fileForChannel(channelId);

    // Load list of canonical questions for the channel
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

    // Filter out already-asked items (exact match; your list is canonical)
    const avoidSet = new Set((avoid || []).map(s => String(s || '').trim()));
    const remaining = questions.filter(q => !avoidSet.has(String(q || '').trim()));

    if (remaining.length === 0) {
      // No more unused questions
      return res.status(200).json({
        reply: { role: 'assistant', content: 'Ask: (No more unique questions available for this channel)' }
      });
    }

    // Choose next question
    let nextQ;
    if (order === 'sequential') {
      nextQ = remaining[0];
    } else {
      // random by default
      nextQ = remaining[Math.floor(Math.random() * remaining.length)];
    }

    return res.status(200).json({
      reply: { role: 'assistant', content: String(nextQ).trim() }
    });
  } catch (e) {
    return res.status(500).json({ error: 'Coach error', detail: String(e) });
  }
};

module.exports.config = { runtime: 'nodejs' };
