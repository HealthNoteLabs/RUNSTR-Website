-- Newsletter signups for the No Burnout website.
-- Separate from the existing `subscribers` table (which is the npub/plan
-- paid-subscription table, service-role only and RLS-locked).
CREATE TABLE email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS, then allow ONLY anonymous INSERTs (no SELECT/UPDATE/DELETE for
-- anon, so the public anon key cannot read or scrape the list).
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can subscribe"
  ON email_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);
