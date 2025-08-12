export const config = { runtime: 'nodejs' };
// Make a signed code for client+channel. Header: X-Admin-Token: <ADMIN_TOKEN>

import crypto from 'crypto';

function sign(payload, secret) {
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(b64).digest('base64url');
  return `${b64}.${sig}`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });

  try {
    const token = req.headers['x-admin-token'];
    if (!token || token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ error:'Unauthorized' });
    }
    if (!process.env.CODE_SECRET) {
      return res.status(500).json({ error:'Missing CODE_SECRET' });
    }

    let body = req.body;
    if (typeof body === 'string') try { body = JSON.parse(body) } catch {}
    const { clientId, channelId, ttlSeconds = 3600 } = body || {};
    if (!clientId || !channelId) return res.status(400).json({ error:'Missing clientId or channelId' });

    const exp = Math.floor(Date.now()/1000) + Math.max(60, Math.min(ttlSeconds, 24*3600));
    const code = sign({ clientId, channelId, exp }, process.env.CODE_SECRET);

    return res.status(200).json({ code, exp });
  } catch (e) {
    return res.status(500).json({ error:'Unhandled error', detail:String(e) });
  }
}
