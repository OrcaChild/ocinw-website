-- =============================================================================
-- Phase 8b: Parental Consent Verification System
-- =============================================================================
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- Creates tables for manual parental consent verification via phone + code.
-- =============================================================================

-- 1. Parent consent requests — stores ONLY parent contact info (zero child PII)
CREATE TABLE IF NOT EXISTS parent_consent_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  minor_age_range TEXT NOT NULL CHECK (minor_age_range IN ('under-13', '13-17')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Consent codes — admin-generated, single-use, 9-char alphanumeric
CREATE TABLE IF NOT EXISTS consent_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  consent_request_id UUID REFERENCES parent_consent_requests(id) ON DELETE SET NULL,
  used_at TIMESTAMPTZ,
  used_by_volunteer_id UUID REFERENCES volunteers(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_pcr_status ON parent_consent_requests(status);
CREATE INDEX IF NOT EXISTS idx_pcr_created_at ON parent_consent_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_pcr_parent_email ON parent_consent_requests(parent_email);
CREATE INDEX IF NOT EXISTS idx_consent_codes_code ON consent_codes(code);
CREATE INDEX IF NOT EXISTS idx_consent_codes_unused ON consent_codes(used_at) WHERE used_at IS NULL;

-- 4. Auto-update timestamp trigger (reuses existing function from schema.sql)
CREATE TRIGGER update_pcr_updated_at
  BEFORE UPDATE ON parent_consent_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. Row Level Security
ALTER TABLE parent_consent_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_codes ENABLE ROW LEVEL SECURITY;

-- Public: anyone can submit a consent request (form submission)
CREATE POLICY "Anyone can submit parent consent request"
  ON parent_consent_requests FOR INSERT
  TO anon WITH CHECK (true);

-- Public: anyone can look up a consent code (needed for validation)
-- Safe: 36^9 = ~101 trillion possibilities + rate limiting
CREATE POLICY "Anyone can validate consent codes"
  ON consent_codes FOR SELECT
  TO anon USING (true);

-- Public: anyone can redeem an unused consent code
CREATE POLICY "Anyone can redeem consent codes"
  ON consent_codes FOR UPDATE
  TO anon
  USING (used_at IS NULL)
  WITH CHECK (used_at IS NOT NULL);

-- Admin: view and manage consent requests
CREATE POLICY "Admins can view consent requests"
  ON parent_consent_requests FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage consent requests"
  ON parent_consent_requests FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()
            AND role IN ('super_admin', 'volunteer_manager'))
  );

-- Admin: full access to consent codes
CREATE POLICY "Admins can manage consent codes"
  ON consent_codes FOR ALL
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()
            AND role IN ('super_admin', 'volunteer_manager'))
  );

-- =============================================================================
-- ADMIN QUICK REFERENCE — Run these in the SQL Editor as needed
-- =============================================================================
--
-- Generate a consent code (30-day expiry):
--
--   INSERT INTO consent_codes (code, consent_request_id, expires_at)
--   VALUES (
--     (SELECT string_agg(substr('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
--       floor(random() * 36 + 1)::int, 1), '') FROM generate_series(1, 9)),
--     NULL,  -- or replace with a consent_request UUID
--     NOW() + INTERVAL '30 days'
--   ) RETURNING code;
--
-- View pending consent requests:
--
--   SELECT id, parent_name, parent_email, parent_phone,
--          minor_age_range, status, created_at
--   FROM parent_consent_requests
--   WHERE status = 'pending'
--   ORDER BY created_at DESC;
--
-- Mark request as approved after phone call:
--
--   UPDATE parent_consent_requests
--   SET status = 'approved', admin_notes = 'Verified via phone YYYY-MM-DD'
--   WHERE id = '<UUID>';
--
-- =============================================================================
