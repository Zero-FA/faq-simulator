export const config = { runtime: 'nodejs' };

import crypto from 'crypto';

function verify(code, secret) {
  const [b64, sig] = String(code || '').split('.');
  if (!b64 || !sig) return null;
  const expected = crypto.createHmac('sha256', secret).update(b64).digest('base64url');
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const json = Buffer.from(b64, 'base64url').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });

  try {
    if (!process.env.CODE_SECRET) {
      return res.status(500).json({ error:'Missing CODE_SECRET' });
    }
    let body = req.body;
    if (typeof body === 'string') try { body = JSON.parse(body) } catch {}
    const { clientId, channelId, code } = body || {};
    if (!clientId || !channelId || !code) return res.status(400).json({ error:'Missing clientId, channelId, or code' });

    const payload = verify(code, process.env.CODE_SECRET);
    if (!payload) return res.status(400).json({ error:'Invalid code' });

    if (payload.clientId !== clientId) return res.status(400).json({ error:'Code not for this client' });
    if (payload.channelId !== channelId) return res.status(400).json({ error:'Code not for this channel' });
    if (payload.exp <= Math.floor(Date.now()/1000)) return res.status(400).json({ error:'Code expired' });

    return res.status(200).json({ ok:true });
  } catch (e) {
    return res.status(500).json({ error:'Unhandled error', detail:String(e) });
  }
}
