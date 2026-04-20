import type { APIRoute } from 'astro';
import { supabase, sbOk } from '../../lib/supabase';
import { sendEmail } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body?.email || '').trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (sbOk()) {
      await supabase.from('subscribers').insert({ email, source: 'site' }).then(() => {}, () => {});
    }
    sendEmail({
      to: email,
      subject: 'Welcome to the MyStore list',
      html: `<div style=\"font-family:-apple-system,sans-serif;background:#faf7f2;padding:32px\"><div style=\"max-width:520px;margin:0 auto;background:#fff;border:1px solid #e8e2d6;padding:32px\"><h1 style=\"font-family:Georgia,serif\">You're in.</h1><p>Thanks for joining the MyStore list. We'll send a note the moment our next drop goes live — one email per release, no nonsense.</p></div></div>`,
    }).catch(() => {});
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
