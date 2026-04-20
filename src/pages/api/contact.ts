import type { APIRoute } from 'astro';
import { supabase, sbOk } from '../../lib/supabase';
import { sendEmail } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim().toLowerCase();
    const topic = String(body?.topic || '').trim();
    const message = String(body?.message || '').trim();
    if (!email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email and message are required.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (sbOk()) {
      await supabase.from('contact_messages').insert({ name, email, message: `[${topic}] ${message}` }).then(() => {}, () => {});
    }
    sendEmail({
      to: 'hello@mystore.example',
      subject: `[MyStore] Contact: ${topic || 'general'}`,
      html: `<p><strong>From:</strong> ${name || '(no name)'} &lt;${email}&gt;</p><p><strong>Topic:</strong> ${topic || '(none)'}</p><hr/><pre style=\"white-space:pre-wrap;font-family:inherit\">${message.replace(/</g,'&lt;')}</pre>`,
    }).catch(() => {});
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
