// /api/report.js
export const config = { runtime: 'nodejs' };
const fetch = global.fetch;

// split a long string into pieces ≤ n chars
function chunk(text, n) {
  const out = [];
  for (let i = 0; i < text.length; i += n) out.push(text.slice(i, i + n));
  return out;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Token');
  if (req.method === 'OPTIONS') return res.status(204).end();

  // Optional tiny health check
  if (req.method === 'GET') {
    const haveAny =
      !!process.env.REPORT_WEBHOOKS ||
      !!process.env.REPORT_WEBHOOKS_CHANNEL ||
      !!process.env.REPORT_WEBHOOKS_FINAL;
    return res.status(200).json({ ok: true, expects: 'POST', haveWebhooks: haveAny });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // parse body safely (supports string or object)
    const rawTxt = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    let body;
    try { body = typeof req.body === 'string' ? JSON.parse(rawTxt || '{}') : (req.body || {}); }
    catch { return res.status(400).json({ error: 'Bad JSON' }); }

    const {
      kind = 'channel',                // 'channel' | 'final'
      trainee = {},                    // { fullName, email? }
      channelId, channelName,
      startedAt, endedAt,
      summary,                         // channel: { total, outOf, pct }
      results,                         // channel: [{ qText, ans, passed, why, matched, missing }]
      overall,                         // final: { correct, total, pct }
      scoresByChannel,                 // final: { [id]: { total, pct, results: [...] } }
      qaByChannel                      // final: optional, grouped Q/A details
    } = body;

    // choose webhook list by kind (with fallback)
    const listEnv =
      kind === 'final'
        ? (process.env.REPORT_WEBHOOKS_FINAL || process.env.REPORT_WEBHOOKS)
        : (process.env.REPORT_WEBHOOKS_CHANNEL || process.env.REPORT_WEBHOOKS);

    const list = String(listEnv || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (list.length === 0) {
      return res.status(500).json({
        error: 'Missing REPORT_WEBHOOKS_* env var',
        detail: 'Set REPORT_WEBHOOKS_FINAL and/or REPORT_WEBHOOKS_CHANNEL (or REPORT_WEBHOOKS as fallback).'
      });
    }

    // build human-readable header
    const started = startedAt ? new Date(startedAt).toLocaleString() : '—';
    const ended   = endedAt   ? new Date(endedAt).toLocaleString()   : '—';

    let header;
    if (kind === 'channel') {
      header =
`📝 Training Report (Channel)
Trainee: ${trainee.fullName || 'Unknown'}${trainee.email ? ` • ${trainee.email}` : ''}
Channel: ${channelName || channelId || '—'}
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

    // build details text
    let details = '';
    if (kind === 'channel' && Array.isArray(results)) {
      details = results.map((r, i) => ([
        `Q${i+1}: ${r.qText}`,
        `Answer: ${r.ans || r.answer || ''}`,
        `Result: ${r.passed ? '✅ Correct' : '❌ Needs Work'}`,
        r.missing?.length ? `Missing: ${r.missing.join(', ')}` : '',
        r.matched?.length ? `Matched: ${r.matched.join(', ')}` : '',
        r.why ? `Why: ${r.why}` : ''
      ].filter(Boolean).join('\n'))).join('\n\n');
    } else if (kind === 'final') {
      if (scoresByChannel) {
        details += Object.entries(scoresByChannel).map(([id, s]) => {
          if (!s) return `• ${id}: not completed`;
          const outOf = (s.results || []).length || '—';
          return `• ${id}: ${s.total}/${outOf} (${s.pct}%)`;
        }).join('\n');
      }
      if (qaByChannel && typeof qaByChannel === 'object') {
        const blocks = [];
        for (const [id, arr] of Object.entries(qaByChannel)) {
          if (!Array.isArray(arr) || arr.length === 0) continue;
          const title = `\n\n### ${id}\n`;
          const listText = arr.map(row => ([
            row.q,
            `Answer: ${row.a || ''}`,
            `Result: ${row.passed ? '✅ Correct' : '❌ Needs Work'}`,
            row.missing?.length ? `Missing: ${row.missing.join(', ')}` : '',
            row.matched?.length ? `Matched: ${row.matched.join(', ')}` : '',
            row.why ? `Why: ${row.why}` : ''
          ].filter(Boolean).join('\n'))).join('\n\n');
          blocks.push(title + listText);
        }
        details += blocks.join('');
      }
    }

    const text = details ? `${header}\n\n${details}` : header;

    // send to each destination
    const deliveries = [];
    for (const url of list) {
      const isSlack   = /hooks\.slack\.com/.test(url);
      const isDiscord = /discord(?:app)?\.com\/api\/webhooks/.test(url);

      try {
        if (isSlack) {
          // Slack text message (chunk at ~2800)
          for (const part of chunk(text, 2800)) {
            const r = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: part })
            });
            deliveries.push({ url, ok: r.ok, status: r.status });
          }
        } else if (isDiscord) {
          // Discord content message (chunk at ~1900)
          for (const part of chunk(text, 1900)) {
            const r = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: part })
            });
            deliveries.push({ url, ok: r.ok, status: r.status });
          }
        } else {
          // Generic webhook: forward full JSON payload
          const r = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });
          deliveries.push({ url, ok: r.ok, status: r.status });
        }
      } catch (e) {
        deliveries.push({ url, ok: false, status: 0, error: String(e) });
      }
    }

    return res.status(200).json({ ok: true, delivered: list.length, deliveries });
  } catch (err) {
    return res.status(500).json({ error: 'Report relay failed', detail: String(err) });
  }
}
