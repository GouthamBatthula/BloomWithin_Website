# BloomWithin

Production-oriented storefront for the Bloom Diary. Product imagery, price, business WhatsApp number, legal content and contact details must be supplied before launch.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- Vercel

## Local setup

1. Copy `.env.example` to `.env.local` and supply every value. `PRODUCT_UNIT_PRICE_PAISE` is required and is an integer (for example, `129900` means ₹1,299.00).
2. In Supabase SQL Editor, run `supabase/migrations/202611130001_create_orders.sql` using a service role/server connection. Do **not** put the service role key in a browser-exposed variable.
3. `npm install && npm run dev`
4. Run checks with `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.

## Deploy

Push this folder to GitHub, import it into Vercel, then set the environment variables in Vercel's project settings. Connect the custom domain after deployment. Use a private Supabase service-role key only in Vercel server-side environment settings.

## Required before launch

- Actual price, WhatsApp number and legal/business contact details.
- Real product photographs in `public/images/` named `bloom-diary-main.webp` and `bloom-diary-1.webp` through `bloom-diary-3.webp` (the UI deliberately shows an honest placeholder until these exist).
- Review policy page placeholders with counsel/business owner.
