# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-26
> Session: #23 (Species Photos + SEO JSON-LD + Homepage Hero + Team Page)

---

## At A Glance

**Current Phase:** Phase 13 — Live on VPS, all code complete | **Security:** A+ (nonce CSP, full RLS, CSRF) | **Tests:** 238 passing | **Deployed:** `https://www.orcachildinthewild.com` | **Next Action:** SQL migrations → volunteer welcome email → Phase 12 pre-launch checklist

---

## Quick Status

| Phase                          | Status            | Notes                                                    |
| ------------------------------ | ----------------- | -------------------------------------------------------- |
| Phase 1 — Legal Foundation     | NOT STARTED       | Independent of website dev                               |
| Phase 2 — Brand Identity       | **COMPLETE**      | Carlsbad Coastal redesign                                |
| Phase 3 — Tech Stack           | DECIDED           | All choices locked                                       |
| Phase 4 — Project Scaffolding  | **COMPLETE**      | 11 steps, 11 commits                                     |
| Phase 5 — Core Website         | **COMPLETE**      | All pages, nav, forms, security                          |
| Phase 6 — Weather & Tides      | **COMPLETE**      | Dashboard, live APIs, geolocation, tide chart            |
| Phase 7 — Donation System      | **COMPLETE**      | Donate page + Zeffy placeholder                          |
| Phase 8 — Volunteer System     | **COMPLETE**      | Full signup + consent code system + COPPA                |
| Phase 9 — Education Content    | **COMPLETE**      | Velite + 23 MDX files + hubs + 10 species photos         |
| Phase 10 — Events System       | **CODE COMPLETE** | Needs SQL migrations before go-live                      |
| Phase 11 — Testing             | **COMPLETE**      | 238 tests, E2E, axe-core                                 |
| Phase 12 — Pre-Launch          | NOT STARTED       | Blocked on SQL migrations                                |
| Phase 13 — Launch              | **IN PROGRESS**   | VPS live, HTTPS, all sessions deployed                   |
| Phase 14 — Post-Launch         | NOT STARTED       | —                                                        |

---

## NEXT SESSION — Priority Actions (in order)

### 1. Run SQL Migrations in Supabase (user action required)

Run in Supabase SQL Editor → these unlock events and parental consent:

1. **`supabase/migrations/002_events_phase10.sql`** — Events tables, RPC function, UNIQUE constraint, deleted_at column
2. **`supabase/migrations/003_parental_consent.sql`** — Consent request + consent code tables, RLS, indexes

After running: seed 2-3 test events so the Events pages have real content.

### 2. Volunteer Welcome Email (plan ready)

Plan at `.claude/plans/volunteer-welcome-email.md`. Steps:
- `pnpm add resend @react-email/components`
- Create `src/emails/VolunteerWelcome.tsx` + `src/emails/VolunteerNotification.tsx`
- Wire into `src/app/actions/volunteer.ts` (two `// TODO` comments)
- Content: welcome + beach day guide (what to bring, what we provide, coral-safe sunscreen only)

### 3. Phase 12 — Pre-Launch Checklist

Once SQL migrations are run:
- Accessibility audit (axe-core on live pages)
- Performance audit (Lighthouse on VPS)
- Security headers audit (securityheaders.com)
- Privacy policy + terms finalization
- Google Search Console setup (after sitemap submission)

### 4. Low-Priority Design Polish (A26–A28)

- **A26:** Standardize dark section backgrounds (3 patterns: `white/[0.02]`, `muted/30`, `muted/20`)
- **A27:** Standardize CTA button shapes — some `rounded-md` vs `rounded-full` (not-found, error, about, team)
- **A28:** DonorRecognition uses non-brand colors (sky, emerald, indigo, purple)

---

## What Was Completed This Session (#23)

### Species Photos + Image Credits (10 photos)
- Added 10 real species photos to `public/images/species/` — all public domain or CC licensed
- Added `imageCredit` frontmatter field to velite.config.ts species schema
- Updated all 10 species MDX files: real species-specific images + proper photo attribution
- Species page hero wrapped in `<figure>/<figcaption>` to display credit below image
- Fixed file corruption: removed SOH (`\x01`) byte artifacts from all 10 MDX frontmatter blocks
  that caused duplicate `featuredImageAlt` keys (caught by new continuity checks)

### SEO — JSON-LD Structured Data
- **Article pages:** JSON-LD `Article` schema + OG `type: "article"` with `publishedTime` + `authors`
- **Species pages:** JSON-LD `Article/Thing` schema + richer OG description including conservation status + image
- **Event pages:** JSON-LD `Event` schema (startDate, endDate, location, organizer, eventStatus
  mapped to `EventScheduled`/`EventCancelled`) + OG image; server component wrapper for client UI
- All 3 `dangerouslySetInnerHTML` uses are trusted server-side data (JSON.stringify of schema objects)

### Article Date Fixes
- 7 articles had March 2026 future dates — corrected to Feb 20–26 to match actual launch week

### Homepage Hero
- Title: "Young Guardians of Our Waters" → **"Guardians of Our Waters"** (EN + ES)
- Added `heroTagline` below h1: "Youth-led · All ages welcome · Families · Community"
  (subtle, `text-white/75` — makes clear the org is youth-run but open to everyone)

### Team Page
- Removed Scout Rosario and Elenore Rosario + entire "Junior Marine Protectors" section
- Team page now shows: Jordyn (Founder) + Join the Team CTA
- Section can be re-added when ready with the right members

### ProjectHealth.md — Section 10: Content Continuity Checks
- 5 runnable bash/python checks: date integrity, YAML duplicate keys + SOH bytes,
  referenced image existence, required frontmatter fields, `dangerouslySetInnerHTML` audit
- These checks would have caught the MDX corruption and future-dated articles automatically
- Marked A21–A25 as RESOLVED (were still showing open despite being fixed in sessions #21–22)

### Quality Gates (all passing, VPS deployed)
- ✅ `pnpm lint` — 0 errors
- ✅ `pnpm type-check` — 0 errors
- ✅ `pnpm test` — 238/238 passing
- ✅ `pnpm build` — clean
- ✅ VPS deployed — PM2 online, `https://www.orcachildinthewild.com` live

### Commits This Session
- `b31a84d` — feat: add real species photos with image credits
- `e2bce0d` — feat: SEO — JSON-LD structured data + OG images for articles, species, events
- `43ced20` — feat: homepage hero — 'Guardians of Our Waters' + everyone welcome tagline
- `fdcf93f` — fix: remove Scout and Elenore from team page

---

## Audit Health Summary (updated Session #23)

| Dimension         | Score    | Grade | Notes |
| ----------------- | -------- | ----- | ----- |
| Quality Gates     | 5/5      | A+    | lint, type-check, test, build, audit all pass |
| Code Quality      | 9/10     | A     | — |
| Security          | 10/10    | A+    | Nonce CSP, full RLS, CSRF, no PII logging |
| Accessibility     | 9/10     | A     | Needs live axe-core run |
| Performance       | 9/10     | A     | All images have sizes; needs Lighthouse run |
| i18n              | 9/10     | A     | EN/ES parity; 23 MDX files still EN-only (D8) |
| Inclusivity       | 9/10     | A     | Everyone welcome tagline added to hero |
| Bias              | 9/10     | A     | — |
| Test Coverage     | 9/10     | A     | 238 tests |
| Design Continuity | 8/10     | B+    | A26-A28 still open (low priority) |
| Tech Debt         | 9/10     | A     | — |
| Dependencies      | 9/10     | A     | 2 high vulns, dev-only |
| Documentation     | 10/10    | A+    | Continuity checks added |
| SEO               | 9/10     | A     | JSON-LD on all content pages + sitemap + OG |
| **Overall**       | **9.3**  | **A** | ↑ from 9.1 |

---

## Open Audit Items

| ID  | Severity | Issue | Status |
|-----|----------|-------|--------|
| A26 | LOW      | Standardize dark section backgrounds | Open |
| A27 | LOW      | Standardize CTA button shapes | Open |
| A28 | LOW      | DonorRecognition non-brand colors | Open |

---

## Deferred Content Work

| ID   | Issue                                           |
| ---- | ----------------------------------------------- |
| D8   | 23 MDX files need Spanish translations          |
| D9   | 16 MDX files missing `readingLevel` frontmatter |
| D10  | No accessibility accommodations info anywhere   |

---

## Blockers & Open Questions

1. **SQL migrations not yet run** — must run 002 + 003 in Supabase SQL Editor before events/consent go live
2. **Zeffy account not created** — requires registered nonprofit status
3. **No logo yet** — using Waves icon placeholder
4. **Original photos in progress** — real species photos now live (CC licensed); Jordyn's own photos to replace when ready
5. **og-image.jpg not created** — 1200×630 branded image needed for Open Graph previews
6. **Website content is placeholder** — user will work with Jordyn to write real content
7. **Admin code generation** — currently manual via Supabase SQL Editor (no admin UI yet)

---

## Idea Backlog

- **Animated wave video background** — hero beach image as looping MP4/WebM. Needs a 5-10s clip. Deferred.
- **Junior Marine Protectors section** — Team page ready to re-add when members confirmed.

---

## Security Status

All vulnerabilities from Sessions #7–21 are resolved. Current status: **A+**

| Control | Status |
|---------|--------|
| CSP nonces (prod) | PASS — per-request nonces in `proxy.ts` |
| RLS on all tables | PASS |
| CSRF protection | PASS — all server actions + validateConsentCode |
| COPPA age-gating | PASS — full parental consent flow |
| Rate limiting | PASS — all form endpoints |
| `dangerouslySetInnerHTML` | PASS — 3 approved JSON-LD uses (server-side trusted data) |
| Secrets in code | PASS — 0 hardcoded |
| PII logging | PASS — 0 instances |

---

## VPS Connection Details

| Detail | Value |
|--------|-------|
| Host | 72.62.200.30 |
| SSH Port | 2222 |
| SSH Key | `~/.ssh/orcachild_vps` |
| SSH Command | `ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30` |
| App Path | `/home/orcachild/ocinw-website/` |
| PM2 Process | `ocinw` (ID 0) |
| Domain | `www.orcachildinthewild.com` (canonical) |
| SSL Expiry | 2026-05-26 (auto-renews) |

```bash
# One-liner deploy:
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
| Schema | `supabase/schema.sql` (8 tables live) + 2 pending migrations = 10 tables total |

---

## Environment Notes

- Dev machine: Windows 11 Pro | Shell: bash (Git Bash) | Working dir: `c:\OrcaChild`
- **Turbopack crashes on this machine** — always use `pnpm dev --webpack`

| | Local Dev | VPS |
|--|-----------|-----|
| Next.js | 16.1.6 | 16.1.6 |
| Node.js | 20.18.0 | 22.22.0 |
| pnpm | 10.10.0 | 10.30.2 |
| PM2 | — | 6.0.14 |
| TypeScript | 5.9.3 | — |
| Tailwind | v4.2.0 | — |
| Zod | v4.3.6 | — |
| next-intl | v4.8.3 | — |
