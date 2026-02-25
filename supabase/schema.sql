-- =============================================================================
-- OCINW Database Schema — Supabase (PostgreSQL)
-- =============================================================================
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- This creates all 8 tables, enables RLS, and sets up access policies.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. TABLES
-- ---------------------------------------------------------------------------

-- Volunteer signups
CREATE TABLE volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  age_range TEXT NOT NULL, -- 'under-13', '13-17', '18-25', '26-40', '41-60', '60+'
  zip_code TEXT NOT NULL,
  interests TEXT[] DEFAULT '{}',
  availability TEXT[] DEFAULT '{}',
  parent_guardian_name TEXT,
  parent_guardian_email TEXT,
  parent_guardian_phone TEXT,
  parent_consent_status TEXT DEFAULT 'not_required', -- 'not_required', 'pending', 'confirmed', 'rejected'
  parent_consent_token UUID,
  parent_consent_date TIMESTAMPTZ,
  parent_consent_ip TEXT,
  how_heard TEXT,
  skills TEXT,
  message TEXT,
  agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
  deleted_at TIMESTAMPTZ, -- Soft delete for CCPA/COPPA
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  language_preference TEXT DEFAULT 'en',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ -- Soft delete for CCPA/COPPA
);

-- Events (for dynamic event management — Phase 10)
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  location_name TEXT NOT NULL,
  location_address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  max_participants INTEGER,
  requires_parent_consent BOOLEAN DEFAULT false,
  image_url TEXT,
  status TEXT DEFAULT 'upcoming', -- upcoming, active, completed, cancelled
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event registrations
CREATE TABLE event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  volunteer_id UUID REFERENCES volunteers(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  num_participants INTEGER DEFAULT 1,
  status TEXT DEFAULT 'confirmed', -- 'confirmed', 'waitlisted', 'cancelled'
  parent_consent BOOLEAN DEFAULT false,
  waiver_signed BOOLEAN DEFAULT false,
  waiver_signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donation records (linked to Zeffy)
CREATE TABLE donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT,
  donor_email TEXT,
  amount INTEGER NOT NULL, -- Cents to avoid floating-point issues
  currency TEXT DEFAULT 'USD',
  donation_type TEXT NOT NULL DEFAULT 'one-time', -- 'one-time', 'monthly', 'annual'
  zeffy_transaction_id TEXT UNIQUE,
  is_anonymous BOOLEAN DEFAULT false,
  in_honor_of TEXT,
  display_name_publicly BOOLEAN DEFAULT false,
  donated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ, -- Soft delete for CCPA
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users with RBAC
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'viewer', -- 'super_admin', 'content_manager', 'volunteer_manager', 'viewer'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit log for admin actions
CREATE TABLE audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL, -- 'create', 'update', 'delete', 'export', 'login'
  table_name TEXT NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- 2. INDEXES (performance)
-- ---------------------------------------------------------------------------

CREATE INDEX idx_volunteers_email ON volunteers(email);
CREATE INDEX idx_volunteers_created_at ON volunteers(created_at);
CREATE INDEX idx_volunteers_deleted_at ON volunteers(deleted_at) WHERE deleted_at IS NULL;

CREATE INDEX idx_contact_created_at ON contact_submissions(created_at);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_deleted_at ON newsletter_subscribers(deleted_at) WHERE deleted_at IS NULL;

CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_start_date ON events(start_date);

CREATE INDEX idx_event_reg_event_id ON event_registrations(event_id);
CREATE INDEX idx_event_reg_email ON event_registrations(email);

CREATE INDEX idx_donations_donated_at ON donations(donated_at);
CREATE INDEX idx_donations_deleted_at ON donations(deleted_at) WHERE deleted_at IS NULL;

CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
CREATE INDEX idx_audit_log_table_name ON audit_log(table_name);

-- ---------------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------

ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- 4. RLS POLICIES — Public access (via anon key in server actions)
-- ---------------------------------------------------------------------------

-- Public can submit forms (INSERT only, no read access)
CREATE POLICY "Anyone can sign up as volunteer"
  ON volunteers FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon WITH CHECK (true);

-- Public can view upcoming/active events (read-only)
CREATE POLICY "Anyone can view upcoming events"
  ON events FOR SELECT
  TO anon USING (status = 'upcoming' OR status = 'active');

-- Public can register for events
CREATE POLICY "Anyone can register for events"
  ON event_registrations FOR INSERT
  TO anon WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- 5. RLS POLICIES — Admin access (authenticated users with roles)
-- ---------------------------------------------------------------------------

-- Admins can view all volunteers (including soft-deleted for management)
CREATE POLICY "Admins can view volunteers"
  ON volunteers FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- Authorized admins can update/delete volunteers
CREATE POLICY "Authorized admins can manage volunteers"
  ON volunteers FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()
            AND role IN ('super_admin', 'volunteer_manager'))
  );

-- Admins can view contact submissions
CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- Admins can view newsletter subscribers
CREATE POLICY "Admins can view newsletter subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- Admins can update newsletter subscribers (unsubscribe, soft-delete)
CREATE POLICY "Admins can manage newsletter subscribers"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()
            AND role IN ('super_admin', 'content_manager'))
  );

-- Content managers can manage events
CREATE POLICY "Authorized admins can manage events"
  ON events FOR ALL
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()
            AND role IN ('super_admin', 'content_manager'))
  );

-- Admins can view event registrations
CREATE POLICY "Admins can view event registrations"
  ON event_registrations FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- Admins can view donations
CREATE POLICY "Admins can view donations"
  ON donations FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- Super admins can manage admin users
CREATE POLICY "Super admins can manage admin users"
  ON admin_users FOR ALL
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND role = 'super_admin')
  );

-- Admins can view audit log
CREATE POLICY "Admins can view audit log"
  ON audit_log FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- 6. AUTO-UPDATE updated_at TRIGGER
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_volunteers_updated_at
  BEFORE UPDATE ON volunteers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
