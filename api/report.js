// /api/report.js
export const config = { runtime: 'nodejs' };
const fetch = global.fetch;

function chunk(text, n = 1800) {
  const out = [];
  for (let i = 0; i < text.length; i += n) out.push(text.slice(i, i + n));
  return out;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Token');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const bodyTxt = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    let body;
    try { body = typeof req.body === 'string' ? JSON.parse(bodyTxt || '{}') : (req.body || {}); }
    catch { return res.status(400).json({ error: 'Bad JSON' }); }

    const {
      kind = 'channel',               // 'channel' | 'final'
      trainee = {},                   // { fullName, email? }
      channelId, channelName,
      startedAt, endedAt,
      summary,                        // { total, outOf, pct } for channel
      results,                        // array of Q/A rows
      overall,                        // final: { correct, total, pct }
      scoresByChannel                 // final: per-channel snapshot
    } = body;

    const list = String(process.env.REPORT_WEBHOOKS || '').split(',').map(s=>s.trim()).filter(Boolean);
    if (list.length === 0) {
      return res.status(500).json({ error: 'Missing REPORT_WEBHOOKS env var (comma-separated)' });
    }

    // Build a concise human-readable summary for Slack/Discord
    const started = startedAt ? new Date(startedAt).toLocaleString() : '—';
    const ended = endedAt ? new Date(endedAt).toLocaleString() : '—';
    let header;
    if (kind === 'channel') {
      header =
`📝 Training Report (Channel)
Trainee: ${trainee.fullName || 'Unknown'}${trainee.email ? ` • ${trainee.email}` : ''}
Channel: ${channelName || channelId}
Started: ${started}
Ended:   ${ended}
Score:   ${summary?.total ?? 0}/${summary?.outOf ?? 0} (${summary?.pct ?? 0}%)`;
    } else {
      header =
`🏁 Final Training Report
Trainee: ${trainee.fullName || 'Unknown'}${trainee.email ? ` • ${trainee.email}` : ''}
Overall: ${overall?.correct ?? 0}/${overall?.total ?? 0} (${overall?.pct ?? 0}%)
Completed: ${ended}`;
    }

    const details = (kind === 'channel' && Array.isArray(results))
      ? results.map((r,i)=>[
          `Q${i+1}: ${r.qText}`,
          `Answer: ${r.ans || r.answer || ''}`,
          `Result: ${r.passed ? '✅ Correct' : '❌ Needs Work'}`,
          r.missing?.length ? `Missing: ${r.missing.join(', ')}` : '',
          r.matched?.length ? `Matched: ${r.matched.join(', ')}` : '',
          r.why ? `Why: ${r.why}` : ''
        ].filter(Boolean).join('\n')).join('\n\n')
      : (kind === 'final' && scoresByChannel)
        ? Object.entries(scoresByChannel).map(([id, s])=>{
            if (!s) return `• ${id}: not completed`;
            return `• ${id}: ${s.total}/${(s.results||[]).length} (${s.pct}%)`;
          }).join('\n')
        : '';

    const text = details ? `${header}\n\n${details}` : header;

    // Send to each destination
    for (const url of list) {
      const isSlack = /hooks\.slack\.com/.test(url);
      const isDiscord = /discord(?:app)?\.com\/api\/webhooks/.test(url);

      if (isSlack) {
        // Slack text message (simple & robust)
        const parts = chunk(text, 2800);
        for (const part of parts) {
          await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: part })
          });
        }
      } else if (isDiscord) {
        const parts = chunk(text, 1900);
        for (const part of parts) {
          await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: part })
          });
        }
      } else {
        // Generic webhook / Apps Script / your API gets the full JSON payload
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }
    }

    return res.status(200).json({ ok: true, delivered: list.length });
  } catch (err) {
    return res.status(500).json({ error: 'Report relay failed', detail: String(err) });
  }
}
