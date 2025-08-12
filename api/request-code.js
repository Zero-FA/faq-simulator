export const config = { runtime: 'nodejs' };
// Receives { clientId, channelId } and notifies you (optional Discord webhook)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error:'Method not allowed' });

  try {
    let body = req.body;
    if (typeof body === 'string') try { body = JSON.parse(body) } catch {}
    const { clientId, channelId } = body || {};
    if (!clientId || !channelId) return res.status(400).json({ error:'Missing clientId or channelId' });

    // Optional: post to Discord
    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          content: `🔑 Code request\nClient: \`${clientId}\`\nChannel: \`${channelId}\``
        })
      }).catch(()=>{});
    } else {
      console.log('Code requested:', { clientId, channelId, ts: new Date().toISOString() });
    }

    return res.status(200).json({ ok:true });
  } catch (e) {
    return res.status(500).json({ error:'Unhandled error', detail:String(e) });
  }
}
