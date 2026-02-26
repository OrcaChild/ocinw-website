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
