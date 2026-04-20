# MyStore

A full-stack Astro ecommerce store — graphic apparel, music-inspired goods and everyday essentials. Built to deploy on Vercel with Supabase, Stripe and Resend.

## What's built

- **Homepage** (`/`) — hero, featured products, collections grid, story, testimonials, CTA
- **Shop** (`/shop`) — master catalogue of every product
- **Collections hub** (`/collections`) — plus individual collection pages at `/collections/bestsellers`, `/collections/new-arrivals`, `/collections/sale`, `/collections/gifts`
- **Product detail** (`/products/[slug]`) — gallery, variant picker (size + colour), add-to-cart, long description, FAQ disclosure
- **Cart** (`/cart`) — localStorage-backed cart with Stripe Checkout
- **Order confirmation** (`/checkout/success`) and **abandon** (`/checkout/cancel`)
- **About**, **Contact** (with working form), **FAQ** (FAQPage schema), **Shipping & Returns**
- **Blog index + post template** (`/blog`, `/blog/[slug]`) — reads from Supabase `content` table; Harbor Writer will publish into it
- **API routes**: `/api/checkout`, `/api/stripe/webhook`, `/api/contact`, `/api/subscribe`

## SEO

- `@astrojs/sitemap` → `/sitemap-index.xml`
- `public/robots.txt` referencing the sitemap
- JSON-LD on every page (Organization, WebSite, Product, CollectionPage, ItemList, FAQPage, BreadcrumbList, BlogPosting)
- OG + Twitter + canonical via shared `src/components/SEOHead.astro`

## Stack

- Astro 5 (server output) + `@astrojs/vercel@^8`
- Tailwind v4 via `@tailwindcss/vite`
- Supabase (products + content + orders + subscribers + contact_messages)
- Stripe Checkout (dynamic pricing, server-side price lookup)
- Resend (transactional emails via REST)
