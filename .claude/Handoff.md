# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-25
> Session: #17 (Phase 10 Events System)

---

## At A Glance

**Current Phase:** Phase 10 COMPLETE (code) — needs SQL migration + security hardening | **Security:** 9/9 resolved + 5 new items queued | **Next Action:** Security/legal fixes → SQL migration → seed events → deploy

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
| Phase 8 — Volunteer System     | **COMPLETE**    | Full signup + age-gating + COPPA                          |
| Phase 9 — Education Content    | **COMPLETE**    | Velite + 23 MDX files + hubs                              |
| Phase 10 — Events System       | **CODE COMPLETE** | Needs SQL migration + security fixes before go-live     |
| Phase 11 — Testing             | **COMPLETE**    | 218 tests, E2E, axe-core                                 |
| Phase 12 — Pre-Launch          | NOT STARTED     | All features must be built                                |
| Phase 13 — Launch              | IN PROGRESS     | VPS deployed, HTTPS live                                  |
| Phase 14 — Post-Launch         | NOT STARTED     | —                                                         |

---

## NEXT SESSION — Priority Actions (in order)

### 1. Security & Legal Fixes (5 items — do before deploying events)

These were identified during the Phase 10 security audit. All 5 must be done before the events system goes live.

#### Fix A: COPPA — Raise Minimum Age to 13
- **File:** `src/lib/types/forms.ts`
- **Change:** `z.number().int().min(8)` → `z.number().int().min(13)`
- **Why:** COPPA requires verifiable parental consent before collecting data from under-13 children. The consent email system isn't built yet. Raising to 13 is the safest legal path. Under-13 participants must be registered by a parent.
- **Also update:** Test in `schemas.test.ts` that checks "rejects age below 8" → "rejects age below 13"

#### Fix B: CCPA — Add `deleted_at` to `event_registrations`
- **File:** `supabase/migrations/002_events_phase10.sql` (add to bottom)
- **SQL:**
  ```sql
  ALTER TABLE event_registrations ADD COLUMN deleted_at TIMESTAMPTZ;
  CREATE INDEX idx_event_reg_deleted_at ON event_registrations(deleted_at) WHERE deleted_at IS NULL;
  ```
- **Why:** California residents have data deletion rights. Other tables (`volunteers`, `newsletter_subscribers`, `donations`) already have `deleted_at`.

#### Fix C: Duplicate Registration Prevention
- **SQL:** Add `ALTER TABLE event_registrations ADD CONSTRAINT unique_event_email UNIQUE (event_id, email);`
- **Code:** In `src/app/actions/event-registration.ts`, handle error code `23505` (duplicate) like the volunteer form does.
- **Why:** Without this, a bot could register for the same event 1000 times and fill all capacity.

#### Fix D: Parent Consent Flag — Don't Claim Consent Before Verification
- **File:** `src/app/actions/event-registration.ts` line 115
- **Change:** `parent_consent: data.age < 18` → `parent_consent: false`
- **Why:** Setting `true` at insert time claims consent was verified when it hasn't been. Should be `false` (pending) until parent actually confirms.

#### Fix E: Under-16 Must Have Parent Present
- **Policy:** Anyone under 16 must have a parent/guardian physically present during events and volunteering.
- **Files:** Add notice to `EventRegistrationForm.tsx` (shown when age 13-15), add translation keys to `en.json` and `es.json`
- **Also:** Add notice to volunteer form/page for `under-13` and `13-17` age ranges
- **Why:** User-specified safety policy for the nonprofit

### 2. Run SQL Migration (user runs in Supabase SQL Editor)

After fixes A-C are applied to the migration file:
- Open Supabase Dashboard > SQL Editor > New Query
- Paste contents of `supabase/migrations/002_events_phase10.sql`
- Click Run

### 3. Seed Test Events

Insert 2-3 sample events into the `events` table via Supabase dashboard so pages have content.

### 4. Push to GitHub & Deploy to VPS

```bash
git push
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30 \
  "cd ~/ocinw-website && git pull && pnpm install --frozen-lockfile && pnpm build && pm2 restart ocinw"
```

---

## What Was Completed This Session (#17)

### VPS Priorities (done first)
- **Priority 1:** Updated VPS `.env.local` with real Supabase keys, rebuilt, PM2 restarted — forms now persist to database
- **Priority 2:** Nginx www redirect configured — `orcachildinthewild.com` → `www.orcachildinthewild.com`

### Phase 10 — Events System (full feature build)
- **Skip-to-Content fix:** Changed from `-translate-y-full` to `sr-only`/`focus:not-sr-only` (Tailwind v4 compatible)
- **SQL migration:** `supabase/migrations/002_events_phase10.sql` — adds `age`, `emergency_contact`, `emergency_phone` columns + `get_event_registration_count` RPC
- **TypeScript types:** `src/lib/types/events.ts` — Event, EventWithCapacity, CapacityStatus, computeCapacityStatus()
- **Zod refinement:** `eventRegistrationSchema` — UUID eventId, `z.literal(true)` waiver, `.refine()` for parent email when age < 18
- **Data fetching:** `src/lib/api/events.ts` — getUpcomingEvents, getEventBySlug, getEventsWithCapacity, getEventBySlugWithCapacity (all via RPC for counts)
- **i18n:** ~60 new `"events"` keys in both `en.json` and `es.json`
- **Components:** EventCard, EventStatusBadge, EventCapacityBadge, EventMeta, EventRegistrationForm
- **Pages:** Events listing page + Event detail page (both `force-dynamic`)
- **Server action:** `event-registration.ts` — CSRF → rate limit → Zod → capacity check → Supabase insert
- **iCal API:** `src/app/api/events/[slug]/ical/route.ts` — .ics download
- **Navigation:** Events link added to DesktopNav, MobileNav, Conservation hub
- **Tests:** Fixed 4 failing tests (UUID fixture + waiver literal), all 218 passing
- **Quality gates:** lint ✓ | type-check ✓ | build ✓ | 218/218 tests ✓
- **Committed:** `6bba59c` — not yet pushed

### Security Audit (documented, not yet fixed)
- Full audit of RLS policies, data flow, COPPA, CCPA, free-tier limits
- Identified 5 issues (Fix A-E above) — deferred to next session per user request

---

## Files Created This Session (11 new)

| File | Purpose |
|------|---------|
| `src/lib/types/events.ts` | Event types, CapacityStatus, computeCapacityStatus |
| `src/lib/api/events.ts` | Supabase query helpers for events |
| `src/components/events/EventCard.tsx` | Event card for listing page |
| `src/components/events/EventStatusBadge.tsx` | Status pill + capacity badge |
| `src/components/events/EventMeta.tsx` | Date/location display with icons |
| `src/components/events/EventRegistrationForm.tsx` | Client-side registration form |
| `src/app/[locale]/conservation/events/page.tsx` | Events listing page |
| `src/app/[locale]/conservation/events/[slug]/page.tsx` | Event detail page |
| `src/app/actions/event-registration.ts` | Registration server action |
| `src/app/api/events/[slug]/ical/route.ts` | iCal download API |
| `supabase/migrations/002_events_phase10.sql` | DB migration (not yet run) |

## Files Modified This Session (10)

| File | Change |
|------|--------|
| `src/components/shared/SkipToContent.tsx` | Fixed visibility (sr-only pattern) |
| `src/lib/types/forms.ts` | Refined eventRegistrationSchema |
| `src/lib/types/index.ts` | Added event type re-exports |
| `messages/en.json` | Added events namespace (~60 keys) |
| `messages/es.json` | Added events namespace (~60 keys) |
| `src/components/layout/DesktopNav.tsx` | Added Events nav link |
| `src/components/layout/MobileNav.tsx` | Added Events nav link |
| `src/app/[locale]/conservation/page.tsx` | Added Events quick-nav card |
| `tests/fixtures/index.ts` | Updated event fixture (UUID, parentEmail) |
| `tests/unit/schemas.test.ts` | Updated waiver test expectations |

---

## Security Status

| ID | Severity | Issue | Status |
|----|----------|-------|--------|
| V1–V9 | Various | Previous security vulnerabilities | ALL RESOLVED |
| E-A | HIGH | COPPA: min age 8, no consent verification | **QUEUED** — raise to 13 |
| E-B | MEDIUM | CCPA: no `deleted_at` on event_registrations | **QUEUED** — add column |
| E-C | MEDIUM | No duplicate registration prevention | **QUEUED** — unique constraint |
| E-D | LOW | parent_consent set true before verification | **QUEUED** — set false |
| E-E | POLICY | Under-16 requires parent present | **QUEUED** — add notices |

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

1. **SQL migration not yet run** — must run in Supabase SQL Editor before events work
2. **5 security/legal fixes queued** — must complete before deploying events
3. **Under-16 parent-present policy** — user wants this displayed on event + volunteer forms
4. **Zeffy account not created** — requires registered nonprofit
5. **No logo yet** — using Waves icon placeholder
6. **Original photos in progress** — user assembling real photos

---

## Decisions Made This Session

| Decision | Choice | Why |
| -------- | ------ | --- |
| Events architecture | force-dynamic pages + RPC counts | Registration counts change in real-time |
| Registration counts | SECURITY DEFINER RPC function | Returns integer only, no PII exposure |
| Date formatting | Native Intl API | date-fns not installed, avoids new dependency |
| Waiver validation | z.literal(true) | Must accept waiver — false is invalid |
| Skip-to-content | sr-only/focus:not-sr-only | Tailwind v4 compatible, more reliable |
| COPPA approach | Raise min age to 13 (next session) | Simplest legal path until consent email is built |
| Under-16 policy | Parent must be physically present | User-specified safety requirement |

---

## Supabase Project Details

| Detail | Value |
|--------|-------|
| Project | ocinw-website |
| Region | West US (North California) |
| URL | `https://eepwfuxxiftyedyvfgyv.supabase.co` |
| Dashboard | `https://supabase.com/dashboard/project/eepwfuxxiftyedyvfgyv` |
| Schema | `supabase/schema.sql` (8 tables, 16 indexes, 13 RLS policies) |

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
