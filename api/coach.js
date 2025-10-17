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

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = async function handler(req, res) {
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
      avoid = []  // already asked questions
    } = body || {};

    const channelId = normalizeChannel(channel);
    const file = fileForChannel(channelId);

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
      return res.status(200).json({
        reply: { role: 'assistant', content: 'Ask: (No questions available for this channel — add items to faqs/questions/<channel>.json)' }
      });
    }

    // Filter out already-asked questions
    const avoidNorm = new Set((avoid || []).map(norm).filter(Boolean));
    const remaining = questions
      .map(q => String(q || '').trim())
      .filter(q => q && !avoidNorm.has(norm(q)));

    if (remaining.length === 0) {
      return res.status(200).json({
        reply: { role: 'assistant', content: 'Ask: (No more unique questions available for this channel)' }
      });
    }

    // Always random by default
    const nextQ = remaining[Math.floor(Math.random() * remaining.length)];

    return res.status(200).json({
      reply: { role: 'assistant', content: String(nextQ).trim() }
    });
  } catch (e) {
    return res.status(500).json({ error: 'Coach error', detail: String(e) });
  }
};

module.exports.config = { runtime: 'nodejs' };
