# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-26
> Session: #23 (Species Photos + SEO JSON-LD + Homepage Hero)

---

## At A Glance

**Current Phase:** Phase 10 COMPLETE (code) — All HIGH/MEDIUM audit items resolved | **Security:** A21 RESOLVED (nonce-based CSP) | **Tests:** 238 passing | **Next Action:** SQL migrations → volunteer welcome email → low-priority design polish (A26–A28)

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
| Phase 11 — Testing             | **COMPLETE**    | 238 tests, E2E, axe-core                                  |
| Phase 12 — Pre-Launch          | NOT STARTED     | All features must be built                                |
| Phase 13 — Launch              | IN PROGRESS     | VPS deployed, HTTPS live                                  |
| Phase 14 — Post-Launch         | NOT STARTED     | —                                                         |

---

## NEXT SESSION — Priority Actions (in order)

### 1. Run SQL Migrations in Supabase (user action required)

Two migration files need to be run in Supabase SQL Editor before events/consent goes live:

1. **`supabase/migrations/002_events_phase10.sql`** — Events tables, RPC function, UNIQUE constraint, deleted_at column
2. **`supabase/migrations/003_parental_consent.sql`** — Consent request + consent code tables, RLS, indexes

### 2. Volunteer Welcome Email (plan ready)

Detailed plan at `.claude/plans/volunteer-welcome-email.md`. Requires:
- `pnpm add resend @react-email/components`
- Create `src/emails/VolunteerWelcome.tsx` and `src/emails/VolunteerNotification.tsx`
- Wire up in `src/app/actions/volunteer.ts` (replace two `// TODO` comments)
- Content: welcome + beach day guide (what to bring, what we provide, coral-safe sunscreen only)

### 3. Low-Priority Design Polish (optional, A26–A28)

- **A26:** Standardize dark section backgrounds (3 patterns: `white/[0.02]`, `muted/30`, `muted/20`)
- **A27:** Standardize CTA button shapes — some use `rounded-md` vs `rounded-full` (not-found, error, about, team)
- **A28:** DonorRecognition uses non-brand colors (sky, emerald, indigo, purple) — consider brand palettes

### 4. Seed Test Events

Insert 2-3 sample events into the `events` table so pages have real content to display.

### 5. Phase 12 — Pre-Launch Checklist

Once SQL migrations are run and test events are seeded, Phase 12 can begin:
- Accessibility audit (axe-core on live pages)
- Performance audit (Lighthouse on VPS)
- Security headers audit (securityheaders.com)
- Privacy policy + terms finalization
- Google Search Console setup (after sitemap submission)

---

## What Was Completed This Session (#23)

### Species Photos + Image Credits
- Added 10 real species photos to `public/images/species/` (all public domain or Creative Commons)
- Added `imageCredit` field to `velite.config.ts` species schema
- Updated all 10 species MDX files: real species-specific images + proper attribution
- Species page hero wrapped in `<figure>/<figcaption>` to display photo credit
- Fixed file corruption: removed SOH (`\x01`) byte artifacts from all 10 MDX frontmatter blocks
  (orphaned duplicate `featuredImageAlt` keys left by previous edit pass)

### SEO — JSON-LD Structured Data
- Article pages: JSON-LD `Article` schema + OG `type: "article"` with publishedTime and authors
- Species pages: JSON-LD `Article/Thing` schema + OG description including conservation status
- Event pages: JSON-LD `Event` schema (startDate, endDate, location, eventStatus mapped to
  `EventScheduled`/`EventCancelled`) + OG image; injected in server component (client component
  renders UI, JSON-LD lives in server wrapper)
- All `dangerouslySetInnerHTML` uses are trusted server-side data only (JSON.stringify of schema objects)

### Article Date Fixes
- 7 articles had March 2026 dates (future-dated); corrected to Feb 20–26 to reflect launch week

### Homepage Hero
- Title: "Young Guardians of Our Waters" → **"Guardians of Our Waters"** (EN + ES)
- Added `heroTagline` below title: "Youth-led · All ages welcome · Families · Community"
  (subtle, `text-white/75`, makes clear the org is youth-run but open to everyone)

### ProjectHealth.md — Content Continuity Checks (Section 10)
- Added 5 runnable checks: date integrity, YAML duplicate keys + SOH bytes, image path existence,
  required frontmatter fields, `dangerouslySetInnerHTML` audit
- Marked A21–A25 as RESOLVED (fixed in sessions #21–22; were still showing as open)
- Updated security posture: `dangerouslySetInnerHTML` now shows 3 approved JSON-LD uses

### Quality Gates (all passing)
- ✅ `pnpm lint` — 0 errors
- ✅ `pnpm type-check` — 0 errors
- ✅ `pnpm test` — 238/238 passing
- ✅ `pnpm build` — clean (not re-run after final commit but lint/type/test all green)

### Commits This Session
- `b31a84d` — feat: add real species photos with image credits to all 10 species pages
- `e2bce0d` — feat: SEO — JSON-LD structured data + OG images for articles, species, events
- `43ced20` — feat: homepage hero — 'Guardians of Our Waters' + everyone welcome tagline

---

## What Was Completed This Session (#22)

### Volunteer Form — Age Range Simplification
- Removed granular adult age ranges (18-25, 26-40, 41-60, 60+) — now just `Under 13 / 13-17 / 18+`
- Cleaned up accidental `agreeToAge` field (introduced and abandoned mid-session; removed from schema, form component, en.json, es.json)
- Full COPPA parental consent flow (state machine: initial → parent_contact → code_entry → full_form) untouched
- `src/lib/types/forms.ts` — `AGE_RANGES = ["under-13", "13-17", "18+"]`
- `src/components/volunteer/VolunteerForm.tsx` — simplified age options, removed `isUnder16` alert
- `messages/en.json` + `messages/es.json` — restored all consent/code/validation keys, updated FAQ1

### Nav Dropdown Alignment
- `src/components/layout/DesktopNav.tsx` — added `viewport={false}` to NavigationMenu, `className="left-1/2 -translate-x-1/2"` to all three NavigationMenuContent elements
- Each dropdown now centers under its own trigger (About, Education, Conservation)

### Article Category Fixes
- `california-tide-pools-guide.mdx` — `"Marine Science"` → `"Marine Biology"` (fixes Velite enum)
- `kelp-forest-southern-california.mdx` — same fix

### Tests Updated
- `tests/fixtures/index.ts` — fixed `validVolunteerForm` (ageRange: "18+", removed agreeToAge), restored `validMinorVolunteerForm`, `validParentConsentRequest`, `validConsentCode`
- `tests/unit/schemas.test.ts` — updated age range test to use ["under-13", "13-17", "18+"], updated parentConsentRequestSchema adult rejection test

### Beach Day Email Plan Doc
- Created `.claude/plans/volunteer-welcome-email.md` — detailed plan for post-signup auto-email with beach guide, equipment list, coral-safe sunscreen note, implementation approach using Resend + React Email

### Quality Gates (all passing)
- ✅ `pnpm lint` — 0 errors
- ✅ `pnpm type-check` — 0 errors
- ✅ `pnpm test` — 238/238 passing
- ✅ `pnpm build` — 99 pages compiled
- ✅ VPS deployed — PM2 online

---

## What Was Completed This Session (#21)

### Audit Fixes (A21–A25) — all HIGH/MEDIUM items from Session #20 resolved

**A21 — CSP Nonces (HIGH security)**
- `proxy.ts` rewritten: generates per-request nonce, sets nonce-based CSP
- Production: `script-src 'self' 'nonce-{nonce}' 'strict-dynamic' 'unsafe-inline'` — CSP3 browsers use nonce+strict-dynamic (unsafe-inline ignored); CSP2 fallback preserved
- `next.config.ts`: CSP removed (now per-request in middleware), pre-existing lint warning fixed

**A22–A24 — i18n fixes**
- `global-error.tsx`: inline EN/ES translations, lazy useState locale detection from URL
- `WeatherErrorBoundary.tsx`: extracted `ErrorFallback` functional component with `useTranslations`
- `LocationSelector.tsx`: 3 hardcoded strings replaced with translation keys
- `messages/en.json` + `es.json`: 5 new weather keys

**A25 — Image sizes**
- Added `sizes` to all 10 Image components missing it (5 card components + 5 slug pages)
- Bonus: also fixed 6 additional page-level Images that were missing it (total: ~16 fixed)

### SEO Foundations
- `src/app/sitemap.ts` — created (28 static + all published content, hreflang alternates)
- `src/app/robots.ts` — created
- `src/app/layout.tsx` — added Open Graph, Twitter card, robots directives, NonprofitOrganization JSON-LD

### Quality Gates
- ✅ `pnpm lint` — 0 errors, 0 warnings
- ✅ `pnpm type-check` — 0 errors
- ✅ `pnpm test` — 238/238 passing

---

## Audit Health Summary (updated Session #21)

| Dimension         | Score   | Grade | Change |
| ----------------- | ------- | ----- | ------ |
| Quality Gates     | 5/5     | A+    | —      |
| Code Quality      | 9/10    | A     | —      |
| Security          | 10/10   | A+    | ↑ A21 resolved |
| Accessibility     | 9/10    | A     | —      |
| Performance       | 9/10    | A     | ↑ Image sizes fixed |
| i18n              | 9/10    | A     | ↑ A22-A24 fixed |
| Inclusivity       | 8/10    | B+    | —      |
| Bias              | 9/10    | A     | —      |
| Test Coverage     | 9/10    | A     | —      |
| Design Continuity | 8/10    | B+    | —      |
| Tech Debt         | 9/10    | A     | ↑ lint warning fixed |
| Dependencies      | 9/10    | A     | —      |
| Documentation     | 10/10   | A+    | —      |
| SEO               | 7/10    | B     | ↑ new (sitemap+OG+JSON-LD) |
| **Overall**       | **9.1** | **A** | ↑ from 8.8 |

---

## Open Audit Items

| ID  | Severity | Issue | Status |
|-----|----------|-------|--------|
| A26 | LOW      | Standardize dark section backgrounds | Open |
| A27 | LOW      | Standardize CTA button shapes | Open |
| A28 | LOW      | DonorRecognition non-brand colors | Open |

---

## Deferred Content Work

| ID   | Phase   | Issue                                          |
| ---- | ------- | ---------------------------------------------- |
| D8   | Content | 23 MDX files need Spanish translations         |
| D9   | Content | 16 MDX files missing `readingLevel` frontmatter |
| D10  | Content | No accessibility accommodations info anywhere  |

---

## Idea Backlog

- **Animated wave video background** — User wants the hero beach image to be a looping video of gentle waves. React can handle `<video autoplay loop muted>`. Would need a short 5-10s MP4/WebM clip of the same beach. Deferred — not part of audit.

---

## Security Status

| ID | Severity | Issue | Status |
|----|----------|-------|--------|
| V1–V9 | Various | Original security vulnerabilities (Sessions #7-9) | ALL RESOLVED |
| E-A–E-E | Various | Event/COPPA security (Session #18) | ALL RESOLVED |
| A6 | MEDIUM | CSRF on validateConsentCode | **RESOLVED** (Session #20) |
| A7 | MEDIUM | Unsafe `as number` type assertions | **RESOLVED** (Session #20) |
| A8 | MEDIUM | No slug validation in iCal route | **RESOLVED** (Session #20) |
| A9 | MEDIUM | Header injection in iCal route | **RESOLVED** (Session #20) |
| A14 | LOW | Non-null assertion in VolunteerForm | **RESOLVED** (Session #20) |
| A21 | HIGH | Production CSP needs nonces | **RESOLVED** (Session #21) |

---

## Blockers & Open Questions

1. **SQL migrations not yet run** — must run 002 + 003 in Supabase SQL Editor before events/consent work
2. **Zeffy account not created** — requires registered nonprofit
3. **No logo yet** — using Waves icon placeholder
4. **Original photos in progress** — user assembling real photos
5. **Admin code generation** — currently manual via Supabase SQL Editor (no admin UI yet)
6. **Website content is filler** — user will work with Jordyn to create real content
7. **og-image.jpg not yet created** — placeholder referenced in Open Graph meta; needs a 1200×630 branded image

---

## Decisions Made This Session (#21)

| Decision | Choice | Why |
| -------- | ------ | --- |
| CSP nonces approach | nonce + strict-dynamic + unsafe-inline fallback | strict-dynamic makes unsafe-inline ignored on CSP3 browsers; fallback ensures CSP2 compatibility |
| global-error.tsx i18n | Lazy useState with window.location | No next-intl provider available; lazy initializer avoids useEffect + setState pattern, no flash |
| Image sizes | Fixed all 10+ missing, not just the 10 from audit | Already reading all Image components, fixing all is better ROI |
| sitemap | Include both EN and ES routes with hreflang | Bilingual site needs proper hreflang for Google to understand language targeting |

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
| PM2 Process | `ocinw` (ID 0) |
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
