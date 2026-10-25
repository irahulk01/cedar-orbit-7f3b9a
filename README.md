# Nepal Together

A Next.js App Router + TypeScript website for a Nepal flood recovery campaign. Responsive design, licensed historical photographs with dates and credits, an official video loaded on demand, transparent launch status, privacy and accountability pages, and a server-validated donation preview.

## Run

Requires Node.js 22.18+ (tested on Node.js 24).

```sh
npm ci
npm run dev
```

Open the Local URL printed by Next.js. Production check: `npm run build`. Start a production server: `npm start`. Donation-policy checks: `npm test`.

## Current status

**Payments are disabled unconditionally.** `/api/donations` validates the request and rejects Nepal residence/billing selections; valid preview requests receive HTTP 503 with `DONATIONS_NOT_ENABLED`. It does not create payment sessions or collect donor details. It does not claim IP verification or provider-level Nepal blocking. Do not replace this with a success response or enable money collection without a verified arrangement.

No payment account, database, or banking connection exists. The website is being built for a Nepal-based client. Its receiving organisation, registration, and bank account details are awaiting confirmation. This needs a qualified review of foreign-funding eligibility, banking requirements, and onward fund use. Technical controls cannot establish legal eligibility.

## Database and payments

`database/schema.sql` is a proposed PostgreSQL schema, not an applied migration. Use managed PostgreSQL when integrating payments. See `IMPLEMENTATION.md` for the planned checkout/webhook workflow and provider research. No database is necessary for the current preview.

Use provider-hosted checkout. Store amounts as integer minor units, confirm payments from signed webhooks, deduplicate provider event IDs, and record refunds/disputes. Public totals must come from verified records, separated by currency or using a documented conversion policy. Never store card numbers or card security codes.

## Country policy

The preview excludes Nepali residence/billing selections and requires confirmation of being outside Nepal. This is a demonstration, not reliable location enforcement. Production requires trusted deployment location signals and provider enforcement for all payment methods, with unknown location handled according to the approved policy. Card origin, residence, nationality, and physical location are different signals. No arbitrary client-supplied country header should be trusted.

## Media

Photo credit: Gaurav Dhwaj Khadka, CC BY-SA 4.0. Historical photographs from 2020 and 2021; details in `public/images/CREDITS.md` and `/accountability#media`. Optimised WebP assets retain the same license. Video is embedded from original UNICEF reporting and is not covered by that image license. No affiliation is claimed.

## Deployment

This is actual Next.js, suitable for a Next.js-compatible Node.js host (for example Vercel or a Node.js container). Keep payment collection disabled for any preview deployment. Configure the public campaign identity, provider controls, privacy contact, rate limiting, security headers, and approved banking arrangement before launching fundraising. Hosting credentials and a public domain have not been configured in this workspace.

## Press archive update

Added five dated, linked headline cards and a Getty photo-reference panel using six distinct user-supplied thumbnails. Images are locally served WebP assets. Duplicate supplied links are consolidated. Headline figures are historical, not current campaign statistics. See `public/images/press/CREDITS.md` for credits and rights status. Build and desktop/mobile browser checks passed.
