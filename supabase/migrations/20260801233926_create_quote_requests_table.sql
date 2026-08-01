/*
# Create quote_requests table

## Purpose
Stores submissions from the "Get Your Free Quote" form on the Squeegee Maids
website so the business owner has a permanent, queryable record of every lead —
in addition to the email that is sent to support@squeegeemaids.com.

## New Tables
- `quote_requests`
  - `id`            uuid, primary key
  - `name`          text, not null — the visitor's full name
  - `email`         text, not null — visitor's email address
  - `phone`         text, not null — visitor's phone number
  - `service`       text, not null — selected service type (e.g. "Residential Cleaning")
  - `bedrooms`      text — number of bedrooms (e.g. "2", "Studio")
  - `bathrooms`     text — number of bathrooms (e.g. "2.5", "4+")
  - `frequency`     text — how often (e.g. "One-time", "Weekly", "Bi-weekly", "Monthly")
  - `notes`         text, nullable — any extra details the visitor typed
  - `status`        text, default 'new' — lets the owner track each lead
                     (new / contacted / booked / archived)
  - `created_at`    timestamptz, default now() — when the request was submitted

## Indexes
- `idx_quote_requests_created_at` on `created_at DESC` so the newest leads appear first.
- `idx_quote_requests_status` on `status` so the owner can filter by lead stage.

## Security
This is a marketing site with no sign-in screen, so it is single-tenant.
- RLS is enabled on `quote_requests`.
- The public (anon + authenticated roles) can INSERT new quote requests — this is
  how the website form saves a submission.
- Only the service role (used server-side / in the dashboard, bypasses RLS) can
  read, update, or delete requests. The anon role cannot read, update, or delete,
  so visitors cannot see or tamper with other people's submissions.
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  bedrooms text,
  bathrooms text,
  frequency text,
  notes text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at
  ON quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status
  ON quote_requests (status);

-- Public visitors can submit a quote request (INSERT only).
DROP POLICY IF EXISTS "anon_insert_quote_requests" ON quote_requests;
CREATE POLICY "anon_insert_quote_requests"
  ON quote_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No SELECT / UPDATE / DELETE for anon or authenticated — only the service role
-- (which bypasses RLS) can read or manage submissions. This keeps visitor leads
-- private to the business owner.
