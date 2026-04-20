import Stripe from 'stripe';

const key = import.meta.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY || '';

export const stripe = key ? new Stripe(key, { apiVersion: '2024-12-18.acacia' as any }) : null as any;

export function stripeOk(): boolean {
  return !!key;
}
