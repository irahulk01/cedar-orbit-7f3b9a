-- Proposed PostgreSQL schema. Not connected or migrated.
CREATE TABLE campaigns (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','active','closed')),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE donations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 campaign_id uuid NOT NULL REFERENCES campaigns(id),
 provider text NOT NULL,
 provider_payment_id text NOT NULL,
 amount_minor bigint NOT NULL CHECK(amount_minor > 0),
 currency char(3) NOT NULL,
 refunded_amount_minor bigint NOT NULL DEFAULT 0 CHECK(refunded_amount_minor >= 0 AND refunded_amount_minor <= amount_minor),
 status text NOT NULL CHECK(status IN ('pending','paid','failed','refunded','partially_refunded','disputed')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(provider,provider_payment_id)
);
CREATE TABLE payment_events (
 provider text NOT NULL,
 event_id text NOT NULL,
 processed_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(provider,event_id)
);
-- Process signed webhooks and donation updates together in one transaction.
-- Calculate totals per currency from confirmed payments minus refunds.
-- Never store card numbers, card security codes, or unneeded donor personal data.
