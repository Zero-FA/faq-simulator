// /api/report-list.js
export const config = { runtime: 'nodejs' };
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Token');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const q = (url.searchParams.get('search') || '').toLowerCase();

    // newest first
    const members = await kv.zrange('trainees', 0, -1, { rev: true });
    const items = [];
    for (const nameKey of members) {
      const p = await kv.hgetall(`profile:${nameKey}`);
      if (!p) continue;
      const name = p.name || '';
      const email = p.email || '';
      if (q && !name.toLowerCase().includes(q) && !email.toLowerCase().includes(q)) continue;

      items.push({
        nameKey,
        name,
        email: email || null,
        lastPct: typeof p.lastPct === 'string' ? Number(p.lastPct) : (p.lastPct ?? null),
        lastRunId: p.lastRunId || null,
        updatedAt: Number(p.updatedAt || 0)
      });
    }

    return res.status(200).json({ items });
  } catch (err) {
    return res.status(500).json({ error: 'List failed', detail: String(err) });
  }
}
