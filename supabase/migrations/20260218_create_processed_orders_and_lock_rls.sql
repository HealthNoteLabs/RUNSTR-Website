-- Create processed_orders table for webhook idempotency
CREATE TABLE processed_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  zaprite_order_id TEXT NOT NULL UNIQUE,
  npub TEXT NOT NULL,
  plan TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_processed_orders_zaprite_id ON processed_orders(zaprite_order_id);

-- Enable RLS with no policies = no anon access
ALTER TABLE processed_orders ENABLE ROW LEVEL SECURITY;

-- Lock down subscribers table
-- Enable RLS (service role key bypasses RLS automatically)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Drop any existing permissive policies that allow anon access
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname
    FROM pg_policies
    WHERE tablename = 'subscribers'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON subscribers', pol.policyname);
  END LOOP;
END
$$;
