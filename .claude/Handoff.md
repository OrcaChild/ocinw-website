# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-25
> Session: #18 (Security Fixes + Consent System + CI + README + License)

---

## At A Glance

**Current Phase:** Phase 10 COMPLETE (code) — consent system built, security fixes applied, CI fixed | **Security:** 14/14 resolved | **Tests:** 238 passing | **Next Action:** Run SQL migrations → SEO foundations → deploy

---

## Quick Status

| Phase                          | Status          | Notes                                                    |
| ------------------------------ | --------------- | -------------------------------------------------------- |
| Phase 1 — Legal Foundation     | NOT STARTED     | Independent of website dev                                |
| Phase 2 — Brand Identity       | **COMPLETE**    | Carlsbad Coastal redesign                                 |
| Phase 3 — Tech Stack           | DECIDED         | All choices locked                                        |
| Phase 4 — Project Scaffolding  | **COMPLETE**    | 11 steps, 11 commits                                     |
| Phase 5 — Core Website         | **COMPLETE**    | All pages, nav, forms, security                           |
| Phase 6 — Weather & Tides      | **COMPLETE**    | Dashboard, live APIs, geolocation, tide chart             |
| Phase 7 — Donation System      | **COMPLETE**    | Donate page + Zeffy placeholder                           |
| Phase 8 — Volunteer System     | **COMPLETE**    | Full signup + consent code system + COPPA                 |
| Phase 9 — Education Content    | **COMPLETE**    | Velite + 23 MDX files + hubs                              |
| Phase 10 — Events System       | **CODE COMPLETE** | Needs SQL migrations before go-live                     |
| Phase 11 — Testing             | **COMPLETE**    | 238 tests, E2E, axe-core                                 |
| Phase 12 — Pre-Launch          | NOT STARTED     | All features must be built                                |
| Phase 13 — Launch              | IN PROGRESS     | VPS deployed, HTTPS live                                  |
| Phase 14 — Post-Launch         | NOT STARTED     | —                                                         |

---

## NEXT SESSION — Priority Actions (in order)

### 1. Run SQL Migrations in Supabase (user action)

Two migration files need to be run in Supabase SQL Editor:

1. **`supabase/migrations/002_events_phase10.sql`** — Events tables, RPC function, UNIQUE constraint, deleted_at column
2. **`supabase/migrations/003_parental_consent.sql`** — Consent request + consent code tables, RLS, indexes

### 2. SEO Foundations (start ranking in search)

User wants to rank alongside orgs like Heal the Bay and OC Coastkeeper.

- `src/app/sitemap.ts` — Dynamic sitemap generation
- `src/app/robots.ts` — robots.txt config
- JSON-LD structured data (Organization, Event, Article schemas)
- Open Graph + Twitter Card meta tags
- Rich meta descriptions on key pages

### 3. Seed Test Events

Insert 2-3 sample events into the `events` table so pages have content.

### 4. Push to GitHub & Deploy to VPS

```bash
git push
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30 \
  "cd ~/ocinw-website && git pull && pnpm install --frozen-lockfile && pnpm build && pm2 restart ocinw"
```

---

## What Was Completed This Session (#18)

### Security Fixes (E-A through E-E — all resolved)
- **E-A (HIGH):** COPPA min age raised 8→13 in event registration schema
- **E-B (MEDIUM):** CCPA `deleted_at` column added to event_registrations
- **E-C (MEDIUM):** Duplicate registration prevention (UNIQUE constraint + 23505 handling)
- **E-D (LOW):** `parent_consent` set to `false` before verification
- **E-E (POLICY):** Under-16 parent-present notices on both forms

### CI Workflow Fix
- Added `pnpm velite` step before type-check (generates `#content` module)
- Added stub env vars so build completes in CI
- Stopped 15+ consecutive failure emails

### Marine-Themed GitHub README
- Ocean wave ASCII art, mission, features, tech stack, security

### Parental Consent Verification System (COPPA)
- **DB:** `parent_consent_requests` + `consent_codes` tables with RLS
- **Schemas:** `parentConsentRequestSchema`, `consentCodeSchema`, updated volunteer refinement
- **Actions:** `submitParentConsentRequest` + `validateConsentCode` + volunteer action rewrite
- **Form UX:** 4-mode state machine (initial → parent_contact → code_entry → full_form)
- **Flow:** Minor submits ONLY parent info → org calls parent → admin generates 9-char code → code unlocks full form
- **i18n:** ~22 new consent keys in EN/ES
- **Tests:** 20 new tests (238 total)

### Fully Restricted License
- `LICENSE` file — All Rights Reserved
- README updated from MIT to All Rights Reserved

---

## Security Status

| ID | Severity | Issue | Status |
|----|----------|-------|--------|
| V1–V9 | Various | Previous security vulnerabilities | ALL RESOLVED |
| E-A | HIGH | COPPA: min age raised to 13 | **RESOLVED** |
| E-B | MEDIUM | CCPA: deleted_at on event_registrations | **RESOLVED** |
| E-C | MEDIUM | Duplicate registration prevention | **RESOLVED** |
| E-D | LOW | parent_consent flag fixed | **RESOLVED** |
| E-E | POLICY | Under-16 parent present notices | **RESOLVED** |

---

## VPS Connection Details

| Detail | Value |
|--------|-------|
| Host | 72.62.200.30 |
| SSH Port | 2222 |
| SSH User | orcachild |
| SSH Key | `~/.ssh/orcachild_vps` |
| SSH Command | `ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30` |
| Web Console | Hostinger hPanel → VPS → Terminal |
| App Path | `/home/orcachild/ocinw-website/` |
| PM2 Process | `ocinw` (ID 1) |
| Domain | `www.orcachildinthewild.com` (canonical) |
| SSL Expiry | 2026-05-26 (auto-renews) |
| SITE_URL | `https://www.orcachildinthewild.com` |

### Deployment Workflow
```bash
# One-liner deploy from local machine:
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30 \
  "cd ~/ocinw-website && git pull && pnpm install --frozen-lockfile && pnpm build && pm2 restart ocinw"
```

---

## Blockers & Open Questions

1. **SQL migrations not yet run** — must run 002 + 003 in Supabase SQL Editor before events/consent work
2. **Zeffy account not created** — requires registered nonprofit
3. **No logo yet** — using Waves icon placeholder
4. **Original photos in progress** — user assembling real photos
5. **Admin code generation** — currently manual via Supabase SQL Editor (no admin UI yet)

---

## Decisions Made This Session

| Decision | Choice | Why |
| -------- | ------ | --- |
| Consent approach | Manual phone + 9-char alphanumeric code | Family-run org, personal verification preferred over automated email |
| Form UX | 4-mode state machine | Zero child PII until parental consent verified |
| Code format | 9-char A-Z0-9 uppercase | ~101 trillion possibilities, easy to read aloud |
| Code lifetime | Single-use, 30-day expiry | Prevents code sharing/reuse |
| License | All Rights Reserved | User wants fully restricted licensing |
| CI fix | Velite before type-check | #content module must exist before tsc |

---

## Supabase Project Details

| Detail | Value |
|--------|-------|
| Project | ocinw-website |
| Region | West US (North California) |
| URL | `https://eepwfuxxiftyedyvfgyv.supabase.co` |
| Dashboard | `https://supabase.com/dashboard/project/eepwfuxxiftyedyvfgyv` |
| Schema | `supabase/schema.sql` (8 tables) + 2 pending migrations (10 tables total) |

---

## Environment Setup Notes

- Development machine: Windows 11 Pro
- Shell: bash (Git Bash)
- Working directory: `c:\OrcaChild`
- **Note:** Turbopack crashes on this machine. Use `pnpm dev --webpack` for dev server.

### Key Versions (Local Dev)
- Next.js 16.1.6 | React 19.2.3 | TypeScript 5.9.3
- Tailwind CSS v4.2.0 | shadcn/ui (latest) | Velite 0.3.1
- Zod v4.3.6 | next-intl v4.8.3
- Vitest 4.0.18 | Playwright 1.58.2 | happy-dom 20.7.0
- pnpm 10.10.0 | Node.js v20.18.0

### Key Versions (VPS)
- Node.js v22.22.0 | pnpm 10.30.2 | PM2 6.0.14
- Nginx 1.24.0 | Certbot 2.9.0
- Ubuntu 24.04 LTS | Kernel 6.8.0-101-generic
