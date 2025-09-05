// /api/report-collector.js
export const config = { runtime: 'nodejs' };
import { kv } from '@vercel/kv';

function slug(s='') { return String(s).toLowerCase().trim().replace(/[^\w]+/g, '-'); }

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Token');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method === 'GET') {
    // health check (does NOT reveal secrets)
    return res.status(200).json({ ok: true, expects: 'POST', kv: !!process.env.KV_REST_API_URL });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // (Optional) shared-secret protection
  if (process.env.REPORT_SHARED_SECRET) {
    const token = req.headers['x-auth-token'];
    if (token !== process.env.REPORT_SHARED_SECRET) return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const bodyTxt = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    let body;
    try { body = typeof req.body === 'string' ? JSON.parse(bodyTxt || '{}') : (req.body || {}); }
    catch { return res.status(400).json({ error: 'Bad JSON' }); }

    const {
      kind = 'channel', trainee = {}, overall, scoresByChannel, qaByChannel, runId: providedRunId, endedAt
    } = body;

    // We only store FINAL reports; ignore per-channel if any slip through.
    if (kind !== 'final') return res.status(200).json({ ok: true, ignored: 'non-final' });

    const runId = providedRunId || (global.crypto?.randomUUID?.() || String(Date.now()));
    const name = String(trainee?.fullName || 'Unknown').trim();
    const email = String(trainee?.email || '').trim();
    const nameKey = slug(name + (email ? `-${email}` : ''));

    const record = {
      runId, name, email,
      overall: overall || null,
      scoresByChannel: scoresByChannel || null,
      qaByChannel: qaByChannel || null,
      endedAt: endedAt || Date.now(),
      createdAt: Date.now()
    };

    // Store run
    await kv.set(`run:${runId}`, record);
    // Index trainee + last summary
    await kv.zadd('trainees', { score: Date.now(), member: nameKey });
    await kv.hset(`profile:${nameKey}`, {
      name, email, lastRunId: runId,
      lastPct: (overall?.pct ?? null),
      updatedAt: Date.now()
    });
    // Keep list of runIds for this trainee (latest first)
    await kv.lpush(`runs:${nameKey}`, runId);
    await kv.ltrim(`runs:${nameKey}`, 0, 199); // keep latest 200

    return res.status(200).json({ ok: true, runId, nameKey });
  } catch (err) {
    return res.status(500).json({ error: 'Collector failed', detail: String(err) });
  }
}
