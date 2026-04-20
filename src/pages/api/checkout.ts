import type { APIRoute } from 'astro';
import { stripe, stripeOk } from '../../lib/stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!stripeOk()) {
    return new Response(JSON.stringify({ error: 'Checkout not configured.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  let body: any;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  const items = Array.isArray(body?.items) ? body.items : [];
  if (!items.length) {
    return new Response(JSON.stringify({ error: 'Cart is empty.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const envOrigin = (import.meta.env.PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
  const hostHdr = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const protoHdr = request.headers.get('x-forwarded-proto') || 'https';
  const origin = envOrigin || (hostHdr ? `${protoHdr}://${hostHdr}` : 'http://localhost:4321');

  try {
    const { getProductBySlug } = await import('../../lib/products');

    const line_items: any[] = [];
    for (const raw of items) {
      const prod = await getProductBySlug(String(raw.slug || ''));
      if (!prod) continue;
      const qty = Math.max(1, Math.min(10, parseInt(String(raw.qty || 1), 10) || 1));
      line_items.push({
        quantity: qty,
        price_data: {
          currency: prod.currency.toLowerCase(),
          unit_amount: prod.price_pence,
          product_data: {
            name: prod.name,
            description: `${raw.variant || prod.type} · SKU ${raw.sku || ''}`.slice(0, 499),
            images: prod.image_url ? [prod.image_url] : [],
            metadata: { sku: String(raw.sku || ''), product_id: prod.id, slug: prod.slug },
          },
        },
      });
    }

    if (!line_items.length) {
      return new Response(JSON.stringify({ error: 'No valid items in cart.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: { allowed_countries: ['GB','IE','FR','DE','ES','IT','NL','BE','PT','SE','DK','NO','FI','AT','PL','US','CA','AU','NZ'] },
      automatic_tax: { enabled: false },
      phone_number_collection: { enabled: false },
      allow_promotion_codes: true,
      metadata: {
        cart_summary: items.map((i) => `${i.sku || '-'}×${i.qty || 1}`).join(','),
      },
    });

    return new Response(JSON.stringify({ url: session.url, id: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error('checkout error', e);
    return new Response(JSON.stringify({ error: String(e?.message || 'Checkout failed.') }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
