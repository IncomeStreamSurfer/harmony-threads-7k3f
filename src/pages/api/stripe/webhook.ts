import type { APIRoute } from 'astro';
import { stripe, stripeOk } from '../../../lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { sendEmail, orderConfirmationHtml } from '../../../lib/email';

export const prerender = false;

const WEBHOOK_SECRET = import.meta.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET || '';
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || '';
const SERVICE_ROLE = import.meta.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE || '';

export const POST: APIRoute = async ({ request }) => {
  if (!stripeOk()) return new Response('stripe not configured', { status: 500 });

  const sig = request.headers.get('stripe-signature') || '';
  const raw = await request.text();

  let event: any;
  try {
    if (!WEBHOOK_SECRET) {
      event = JSON.parse(raw);
    } else {
      event = stripe.webhooks.constructEvent(raw, sig, WEBHOOK_SECRET);
    }
  } catch (e: any) {
    console.error('stripe sig verify fail', e?.message);
    return new Response(`Webhook Error: ${e?.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session: any = event.data.object;

    try {
      const line = await stripe.checkout.sessions.listLineItems(session.id, { limit: 50, expand: ['data.price.product'] });
      const items = line.data.map((li: any) => ({
        name: li.description || li.price?.product?.name || 'Item',
        qty: li.quantity || 1,
        price_pence: li.price?.unit_amount || 0,
        variant: li.price?.product?.description || '',
      }));

      if (SUPABASE_URL && SERVICE_ROLE) {
        const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
        await admin.from('orders').insert({
          stripe_session_id: session.id,
          email: session.customer_details?.email || session.customer_email,
          amount_total: session.amount_total,
          currency: session.currency,
          status: session.payment_status,
          shipping: session.shipping_details || null,
          items,
        });
      }

      const email = session.customer_details?.email || session.customer_email;
      if (email) {
        await sendEmail({
          to: email,
          subject: 'Your MyStore order is confirmed',
          html: orderConfirmationHtml({
            orderId: session.id.slice(-12).toUpperCase(),
            email,
            items,
            total_pence: session.amount_total || 0,
            currency: session.currency || 'gbp',
          }),
        });
      }
    } catch (e: any) {
      console.error('order processing error', e?.message);
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
