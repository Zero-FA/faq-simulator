// /api/report-get.js
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
    const runId = url.searchParams.get('runId');
    const nameKey = url.searchParams.get('nameKey');

    let id = runId;
    if (!id && nameKey) {
      const lastRunId = await kv.hget(`profile:${nameKey}`, 'lastRunId');
      id = lastRunId;
    }
    if (!id) return res.status(400).json({ error: 'Missing runId or nameKey' });

    const run = await kv.get(`run:${id}`);
    if (!run) return res.status(404).json({ error: 'Not found' });

    return res.status(200).json(run);
  } catch (err) {
    return res.status(500).json({ error: 'Get failed', detail: String(err) });
  }
}
