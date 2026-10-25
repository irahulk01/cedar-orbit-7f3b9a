# Donation implementation

Current state: Next.js prototype; payment endpoint returns 503. No database connected, credentials configured, or live money collected.

Recommended production stack: Next.js App Router + TypeScript; managed PostgreSQL; eligible hosted checkout; signed server-to-server webhooks.

Before selecting the provider, confirm the recipient organisation's registration and bank country, fundraising eligibility, and provider-level enforcement of the Nepal donor exclusion.

Stripe: Nepal is absent from its supported account-country list (https://stripe.com/global). A supported-country organisation must still satisfy Stripe onboarding and donation requirements.

GlobalGiving: accepts eligible registered nonprofits internationally following due diligence; a fiscal sponsor may provide another route (https://www.globalgiving.org/nonprofits/). External checkout alone does not establish a Nepal exclusion or provide verified local totals.

Implementation flow:
1. Server validates amount, currency, campaign status and country policy.
2. Server creates a hosted checkout session with an idempotency key and campaign reference.
3. Payment details are entered only on the provider checkout.
4. Verify webhook signature and deduplicate provider event IDs.
5. Atomically persist confirmed payment state and events in PostgreSQL. Handle delayed payments, failure, refunds and disputes.
6. Display campaign totals by currency from confirmed records, net of refunds. A success-page redirect must never mark a donation paid.
7. Protect administrator access and minimise donor data.

Nepal exclusion: a country selector or IP check alone is insufficient. Stripe Radar can block Nepal-issued cards via card_country = NP, but card origin is not donor nationality or residence. Confirm the intended definition and provider support for every enabled payment method before enabling collection.
Reference: https://support.stripe.com/questions/block-a-card-based-on-location-using-radar

Media: official UNICEF video embed, linked to its original report and publication date. Two dated historical Bagmati River photographs are included under CC BY-SA 4.0 with credits and adaptation notices. See public/images/CREDITS.md.

Local development: npm install, then npm run dev. Build verification: npm run build.


Current preview: country and amount policy is implemented on client and server. Nepal residence/billing selections return HTTP 403. Valid preview requests return HTTP 503 because collection remains unconditionally disabled. Seven policy tests, a production build, HTTP checks and browser checks were completed. No IP/location verification or payment-origin blocking is implemented yet.
