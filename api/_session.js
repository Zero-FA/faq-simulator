// /api/_session.js
import { kv } from '@vercel/kv';

const SESSION_TTL = (10 * 60) + 60; // must match frontend RUN_SECONDS + buffer

export async function requireSession(req, res) {
  const auth = req.headers.authorization || '';
  const sessionId = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (!sessionId) {
    res.status(401).json({ error: 'Missing session' });
    return null;
  }

  const sess = await kv.get(`session:${sessionId}`);
  if (!sess) {
    res.status(403).json({ error: 'Session expired' });
    return null;
  }

  let code;
  try { ({ code } = JSON.parse(sess)); } catch {
    res.status(403).json({ error: 'Bad session data' });
    return null;
  }

  const lockKey = `lock:${code}`;
  const owner = await kv.get(lockKey);
  if (owner !== sessionId) {
    res.status(409).json({ error: 'Code is in use by another device' });
    return null;
  }

  // (optional) refresh ttl here if you want
  // await kv.expire(lockKey, SESSION_TTL);
  // await kv.expire(`session:${sessionId}`, SESSION_TTL);

  return { sessionId, code };
}

export { SESSION_TTL };
