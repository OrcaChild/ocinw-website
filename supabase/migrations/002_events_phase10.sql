-- =============================================================================
-- Phase 10: Events System — Database Additions
-- =============================================================================
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- Adds missing columns to event_registrations and a secure count function.
-- =============================================================================

-- 1. Add columns to event_registrations for safety-critical data
ALTER TABLE event_registrations ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE event_registrations ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
ALTER TABLE event_registrations ADD COLUMN IF NOT EXISTS emergency_phone TEXT;

-- 2. RPC function: returns registration count without exposing PII
-- Uses SECURITY DEFINER to bypass RLS (only returns an integer)
CREATE OR REPLACE FUNCTION get_event_registration_count(p_event_id UUID)
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(COUNT(*)::INTEGER, 0)
  FROM event_registrations
  WHERE event_id = p_event_id AND status = 'confirmed';
$$;

-- 3. Grant execute to anon role so listing/detail pages can show capacity
GRANT EXECUTE ON FUNCTION get_event_registration_count(UUID) TO anon;

-- 4. Prevent duplicate registrations (same person, same event)
-- Without this, a bot could fill all capacity by registering the same email 1000 times.
ALTER TABLE event_registrations
  ADD CONSTRAINT unique_event_email UNIQUE (event_id, email);

-- 5. CCPA compliance: soft-delete support for event_registrations
-- Matches pattern used by volunteers, newsletter_subscribers, and donations tables.
ALTER TABLE event_registrations ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS idx_event_reg_deleted_at
  ON event_registrations(deleted_at) WHERE deleted_at IS NULL;

-- 6. Update RPC to exclude soft-deleted registrations from count
CREATE OR REPLACE FUNCTION get_event_registration_count(p_event_id UUID)
RETURNS INTEGER
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(COUNT(*)::INTEGER, 0)
  FROM event_registrations
  WHERE event_id = p_event_id AND status = 'confirmed' AND deleted_at IS NULL;
$$;
