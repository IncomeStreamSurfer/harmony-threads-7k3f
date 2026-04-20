const KEY = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY || '';
const FROM = 'MyStore <onboarding@resend.dev>';

export async function sendEmail(opts: { to: string; subject: string; html: string }) {
  if (!KEY) return { ok: false, error: 'RESEND_API_KEY not set' };
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM, to: opts.to, subject: opts.subject, html: opts.html }),
    });
    const body = await r.json().catch(() => ({}));
    return { ok: r.ok, body };
  } catch (e: any) {
    return { ok: false, error: String(e?.message || e) };
  }
}

export function orderConfirmationHtml(params: {
  orderId: string;
  email: string;
  items: { name: string; qty: number; price_pence: number; variant?: string }[];
  total_pence: number;
  currency: string;
}) {
  const rows = params.items
    .map(
      (i) => `<tr><td style=\"padding:10px 8px;border-bottom:1px solid #eee;font:14px/1.4 -apple-system,sans-serif\"><strong>${i.name}</strong>${i.variant ? `<br/><span style=\"color:#777;font-size:12px\">${i.variant}</span>` : ''}</td><td style=\"padding:10px 8px;border-bottom:1px solid #eee;text-align:center;font:14px -apple-system,sans-serif\">${i.qty}</td><td style=\"padding:10px 8px;border-bottom:1px solid #eee;text-align:right;font:14px -apple-system,sans-serif\">£${((i.price_pence * i.qty) / 100).toFixed(2)}</td></tr>`,
    )
    .join('');
  return `<!doctype html><html><body style=\"background:#faf7f2;margin:0;padding:32px;font-family:-apple-system,sans-serif;color:#0a0a0a\"><div style=\"max-width:560px;margin:0 auto;background:#fff;border:1px solid #e8e2d6;padding:36px\"><h1 style=\"font-family:Georgia,serif;font-size:28px;margin:0 0 12px\">Thanks for your order.</h1><p style=\"font-size:15px;color:#555;line-height:1.5\">Hi ${params.email}, your order is confirmed. We'll send another note when it ships.</p><table style=\"width:100%;border-collapse:collapse;margin-top:24px\"><tbody>${rows}</tbody><tfoot><tr><td colspan=\"2\" style=\"padding:14px 8px;font-weight:600\">Order total</td><td align=\"right\" style=\"padding:14px 8px;font-weight:600\">£${(params.total_pence / 100).toFixed(2)}</td></tr></tfoot></table><p style=\"font-size:13px;color:#777;margin-top:28px\">Order reference <code>${params.orderId}</code></p></div></body></html>`;
}
