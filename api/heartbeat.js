// /api/heartbeat.js
import { kv } from '@vercel/kv';
import { requireSession, SESSION_TTL } from './_session';

export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const sess = await requireSession(req, res);
  if (!sess) return; // response already sent

  const { sessionId, code } = sess;
  const lockKey = `lock:${code}`;

  await kv.expire(lockKey, SESSION_TTL);
  await kv.expire(`session:${sessionId}`, SESSION_TTL);

  return res.status(200).json({ ok: true });
}
