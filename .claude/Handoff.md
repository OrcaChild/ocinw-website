# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-05-30
> Session: #31 (Donate compliance fix + dark-mode UX)
> Last commit: `cf23644 feat(theme): default to system preference for first-time visitors`

---

## At A Glance

**Current Phase:** Phase 13 — Live on VPS | **Security:** A+ | **Tests:** 238 passing (not re-run this session; theme/copy-only change) | **Audit:** 6 vulns / 2 HIGH dev-only | **Deployed:** `https://www.orcachildinthewild.com` | **Donations:** DISABLED (federal 501(c)(3) pending — `NEXT_PUBLIC_DONATIONS_ENABLED=false`) | **Theme:** System default + 3-way toggle | **Next Action:** Re-enable donations after IRS determination → resume ZIP expansion + "Beaches Near You" → SQL migrations → volunteer welcome email

---

## What Was Done — Session #31 (2026-05-30)

### Goal: Compliance fix flagged privately by Matthew Creamer + dark-mode UX

**Trigger:** Matthew Creamer messaged Bas privately — the site presented OCINW as a federal `501(c)(3)` (donations tax-deductible) while OCINW only holds the **California** public-benefit incorporation (approved 2026-05-29). Federal 501(c)(3) is a separate IRS application; donations only become tax-deductible once the IRS letter lands. An early donor could give expecting a write-off they can't claim. Bas: "disable the donate button for now" + "put a notice that we are seeking federal status."

#### Changes (3 commits, all gate-verified on dev → deployed → externally verified)

| Commit | Change |
|---|---|
| `e2578f4` | **Donate giving disabled + 501(c)(3) wording corrected.** New validated env flag `NEXT_PUBLIC_DONATIONS_ENABLED` (Zod enum `"true"`/`"false"`, default `false`) in `src/env.ts` + `.env.example`. `DonationWidget.tsx` gains a disabled state: greyed `aria-disabled` Donate button (tooltip) + "Donations Opening Soon" notice + working Volunteer CTA, shown when the flag is off. Reworded `donate.taxText` + `footer.nonprofit` (EN+ES) from "registered 501(c)(3)" → "California nonprofit public benefit corporation; federal 501(c)(3) status pending." New `donate.statusNotice*` keys (EN+ES). |
| `220ebff` | **3-way theme toggle.** `ThemeToggle.tsx` replaced the 2-way light/dark flip with a Light/Dark/System dropdown (Radix DropdownMenu radio group). One component change covers desktop (Header) + mobile (MobileNav). |
| `cf23644` | **Default theme `light` → `system`.** `src/app/layout.tsx` ThemeProvider `defaultTheme="system"` — first-time visitors auto-detect their OS dark/light preference; returning visitors keep their saved choice; "System" option lets anyone return to auto-detect. |

#### Files touched (7)
`src/env.ts`, `.env.example`, `messages/en.json`, `messages/es.json`, `src/app/[locale]/donate/page.tsx`, `src/components/donate/DonationWidget.tsx`, `src/components/shared/ThemeToggle.tsx`, `src/app/layout.tsx`

#### Quality gates (each commit, raw exit 0)
`pnpm type-check` clean · `pnpm lint` 0/0 · `pnpm build` 99/99 bilingual SSG. (Vitest suite not re-run — change is copy + a client component + an env flag, no logic under test touched. 238 last known green.)

#### Deploy + external verification (https://orcachildinthewild.com)
Standard `sudo -u orcachild` flow per VPS doc, `pm2 restart ocinw` each time. `/`, `/es`, `/donate` all HTTP **200** after each deploy. Verified live: "Donations Opening Soon" + "currently applying for federal 501(c)(3)" + "California nonprofit public benefit corporation" present; old "registered 501(c)(3)" claim + live `<iframe>` gone; `aria-disabled="true"` Donate button present; footer EN "Federal 501(c)(3) status pending" / ES "Estatus federal 501(c)(3) en trámite"; theme toggle present both locales; `"system"` default in shipped HTML.

#### Decisions (durable)
- **Donations gated by env flag, not code deletion** — re-enabling later is a config change, no code edit. Default `false` is fail-safe.
- **⚠️ `/donate` is statically prerendered (SSG)** — the flag is baked in at build time. **Re-enabling needs `NEXT_PUBLIC_DONATIONS_ENABLED=true` in VPS `.env.local` AND a rebuild** (`pnpm build && pm2 restart ocinw`), not just a restart.
- **Nav/hero/home Donate buttons left as links** to `/donate` (Bas chose "defaults stand") — they lead to the page that explains status + offers other ways to help, rather than vanishing.
- **System-default theme** matches the original pre-Session-#29 behavior; Session #29 had set it to `light`, now reverted to `system` per Bas.

#### Cold-start gotcha (re-confirmed, not new)
First external probe immediately after `pm2 restart` returned **502** (Next.js process up but port not yet bound); 200 on re-probe ~10s later. Documented in `~/.claude/docs/vps-infrastructure.md` — wait ~30-60s before trusting post-restart HTTP checks.

#### Follow-ups queued
- **Re-enable donations** once the IRS 501(c)(3) determination letter lands: flag → `true` + rebuild.
- **Update `donate.taxEin`** from "Pending" when the EIN is issued.
- Resume the prior queued work (ZIP expansion / "Beaches Near You", SQL migrations 002+003, volunteer welcome email — unchanged from Session #30).

#### Governance deviation flagged (Bas's decision)
OrcaChild `.claude/` is **git-tracked with legacy filenames** (`Handoff.md`/`Completed.md`), predating the portfolio standard (local-only `.claude/`, uppercase `HANDOFF.md`/`COMPLETED.md`). Not migrated this session — flagged for Bas to decide whether to run the untrack+rename migration.

---

## What Was Done — Session #30 (2026-05-16)

### Goal: Portfolio CVE-2026-44578 sweep — close the 8/8 milestone

OrcaChild was the 8th and final Next.js project in the portfolio still on a vulnerable Next 16.x. The CVE-2026-44578 family includes **CVE-2026-44573 specifically targeting i18n Pages Router middleware bypass** — OrcaChild's next-intl bilingual EN/ES routing made this advisory directly relevant. Patch closes that exposure.

#### Patch surface

| Change | From | To | Why |
|---|---|---|---|
| `next` | 16.2.3 | 16.2.6 | Closes 7 HIGH Next.js advisories (SSRF, middleware/proxy bypass × 3, cache poisoning, DoS) |
| `eslint-config-next` | 16.1.6 | 16.2.6 | Matching peer |
| `next-intl` | ^4.9.1 | ^4.9.2 (resolved 4.12.0) | Prototype pollution patch in next-intl's experimental messages flow |
| **NEW** `pnpm.overrides.fast-uri` | (transitive 3.1.0) | `^3.1.2` | Path traversal + host confusion via percent-encoded chars (2 HIGH) |
| **NEW** `pnpm.overrides.hono` | (transitive 4.12.9) | `^4.12.18` | 8 moderate advisories on cookie / path traversal / middleware bypass / CSS injection |
| **NEW** `pnpm.overrides.@hono/node-server` | (transitive 1.19.12) | `^1.19.13` | Middleware bypass via repeated slashes |

Caret-pinning matters: my first try used `>=1.19.13` for `@hono/node-server` and pnpm pulled the 2.0.2 major jump. Re-tightened to `^1.19.13` to stay on 1.x.

#### Local quality gates

| Gate | Result |
|---|---|
| `pnpm audit` | **35 vulns / 11 HIGH / 20 moderate / 4 low → 6 vulns / 2 HIGH / 4 moderate.** 29 vulnerabilities resolved. All 7 CVE-2026-44578-family HIGHs cleared on the Next.js side. |
| `pnpm build` | Clean. `Next.js 16.2.6 (Turbopack)`, 99/99 static pages, **bilingual EN+ES SSG coverage** (articles, species, ecosystems, resources, weather, volunteer, privacy, terms). Velite content generation ran clean before next build. TypeScript clean in 7.8s. No Figaro-style Linux Turbopack manifest bug. |
| `pnpm lint` | 0 errors / 0 warnings. |
| `pnpm test` | **238/238 passed in 1.79s** across 13 vitest files. All Supabase calls in `tests/unit/actions/contact.test.ts` + `newsletter.test.ts` mocked via `vi.mock` with `createClient` → `{from: mockFrom}`. No real DB connection. |

Playwright E2E + a11y suites not re-run this session (separate from CVE-patch gate; last known green).

#### Out of scope this commit (separate cleanup)

- `vite >=7.3.2` — 2 HIGH + 1 moderate, dev-only path traversal on dev server (vitest peer). Needs careful version test for vitest 4.x compatibility.
- `ip-address >=10.1.1` — moderate, deep transitive via `shadcn > @modelcontextprotocol/sdk > express-rate-limit > ip-address`. Dev-only path.
- `postcss <8.5.10` — upstream-blocked moderate, same shape as BuiltByBas / Marketing Reset / ABHS / Colour Parlor.

#### Deploy

Standard `~/.claude/docs/vps-infrastructure.md` flow as orcachild user:

```bash
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30
cd ~/ocinw-website && git pull origin main && \
  pnpm install --frozen-lockfile && pnpm build && \
  pm2 restart ocinw && pm2 save
```

VPS was 2 commits behind (`a57e4bd → 8aa79a9`). Fast-forward clean. Install 10s; build clean with all bilingual SSG; pm2 restart `ocinw` PID 457379. Server boots `Next.js 16.2.6 Ready in 353ms` on `http://localhost:3000`.

#### External verification

All routes via apex → www redirect chain, EN canonical drops `/en` prefix per next-intl "as-needed" mode, ES keeps `/es`:

| Probe | HTTP | Resolved to | Time |
|---|---|---|---|
| `https://orcachildinthewild.com/` | 200 | `https://www.orcachildinthewild.com/` | 0.34s |
| `https://orcachildinthewild.com/en` | 200 | `https://www.orcachildinthewild.com/` | 0.79s |
| `https://orcachildinthewild.com/es` | 200 | `https://www.orcachildinthewild.com/es` | 0.33s |
| `https://orcachildinthewild.com/en/learn/species` | 200 | `https://www.orcachildinthewild.com/learn/species` | 0.37s |
| `https://orcachildinthewild.com/es/learn/species` | 200 | `https://www.orcachildinthewild.com/es/learn/species` | 0.34s |

Security headers post-deploy: `Strict-Transport-Security: max-age=31536000; includeSubDomains` + `X-Frame-Options: DENY` + `Server: nginx` all present.

#### Decisions (durable)

- **Caret-pin transitive overrides**. `>=X.Y.Z` is too permissive — pnpm will pull a major version jump if one exists. Use `^X.Y.Z` to constrain to same major. First-pass `>=1.19.13` on `@hono/node-server` pulled `2.0.2`; re-tightened to `^1.19.13` resolved to `1.19.14` cleanly.
- **CVE-2026-44573 lands here specifically**. The i18n-Pages-Router middleware bypass advisory was the most OrcaChild-specific item in the family. Worth flagging in commit message + governance for traceability — future audit reviews will want to know which advisories applied per project.
- **Turbopack production build works on VPS Linux**. The registry's "Turbopack crashes on dev machine. Use `pnpm dev --webpack`" note was about **local dev only**. Production `pnpm build` with Turbopack default succeeded for 99/99 bilingual SSG pages. No `--webpack` opt-out needed for this codebase. Registry note clarified.

#### Pre-existing PM2 log noise (not introduced by patch)

- `Events fetch error: TypeError: fetch failed` × 4 in error.log — pre-existing external API call failures (NOAA tides? Weather API?). Unrelated to CVE patch.
- `Error: Failed to find Server Action "x"` — classic Next.js stale-client-cache error. Existing browsers cached an old Server Action ID before this deploy. Self-resolves as users refresh; no fix needed.

#### Follow-ups queued (not part of this session)

- Address out-of-scope items above (vite, ip-address) in a separate audit-cleanup commit.
- Resume the original Session #29 "Next Action": finish ZIP expansion + "Beaches Near You" feature → SQL migrations → volunteer welcome email.

---

## What Was Done — Session #29 (2026-04-11) — Governance audit

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

### 0. Re-enable donations WHEN (and only when) the IRS 501(c)(3) letter lands

Donations are intentionally disabled (Session #31, Matthew Creamer compliance flag). To re-open online giving once federal tax-exempt status is granted:
1. On the VPS, set `NEXT_PUBLIC_DONATIONS_ENABLED=true` in `/home/orcachild/ocinw-website/.env.local`
2. **Rebuild** (the donate page is SSG, so the flag is baked at build time): `pnpm build && pm2 restart ocinw`
3. Update `donate.taxText` (EN+ES) back to tax-deductible language and set `donate.taxEin` to the real EIN (currently "Pending")
4. Update `footer.nonprofit` (EN+ES) to confirmed 501(c)(3) status
5. Verify the live Zeffy form renders + external HTTP 200 on `/donate` + `/es/donate`

### 1. ZIP Expansion + "Beaches Near You" (from Session #24 — not yet started)

**Context:** Session #24 planned this but ran out of context. The file still has the OLD 44-ZIP version.

**Steps:**
1. Replace `ZIP_COORDINATES` in `src/lib/data/socal-beaches.ts` with comprehensive tri-county coverage (~280 ZIPs: LA, Orange, San Diego counties + Inland Empire)
2. Update `src/components/weather/LocationSelector.tsx` — add `currentLat`/`currentLon` props, sort beaches by distance when location is set ("Beaches Near You")
3. Update `src/components/weather/WeatherDashboard.tsx` — pass geo coordinates to LocationSelector
4. Add i18n keys: `"beachesNearYou"` (EN/ES)
5. Quality gates + commit + push + VPS deploy

### 2. Run SQL Migrations in Supabase (user action required)

Run in Supabase SQL Editor → these unlock events and parental consent:
1. **`supabase/migrations/002_events_phase10.sql`** — Events tables, RPC function, UNIQUE constraint, deleted_at column
2. **`supabase/migrations/003_parental_consent.sql`** — Consent request + consent code tables, RLS, indexes

After running: seed 2-3 test events so the Events pages have real content.

### 3. Volunteer Welcome Email (plan ready)

Plan at `.claude/plans/volunteer-welcome-email.md`. Steps:
- `pnpm add resend @react-email/components`
- Create `src/emails/VolunteerWelcome.tsx` + `src/emails/VolunteerNotification.tsx`
- Wire into `src/app/actions/volunteer.ts` (two `// TODO` comments)
- Content: welcome + beach day guide (what to bring, what we provide, coral-safe sunscreen only)

### 4. Phase 12 — Pre-Launch Checklist

Once SQL migrations are run:
- Accessibility audit (axe-core on live pages)
- Performance audit (Lighthouse on VPS)
- Security headers audit (securityheaders.com)
- Privacy policy + terms finalization
- Google Search Console setup (after sitemap submission)

---

## What Was Completed This Session (#29)

### Governance Audit (2026-04-11)
- Full governance audit per post-Session-68 protocol
- Updated project CLAUDE.md: Twelve Pillars reference, Data Protection section, LastStatusReport in session protocol, Hosting corrected to VPS
- Updated Handoff.md: versions, vuln counts, missing commits
- Updated AUDIT.md: dependency status, quality gates
- Updated ProjectHealth.md: dependency scores, audit detail
- Updated MEMORY.md: stack versions
- Updated project map: dependency versions, verified date
- Flagged SECURITY-AUDIT.md as missing (required for live projects)
- Patched Next.js 16.1.7 -> 16.2.3 (HIGH DoS vulnerability)
- Patched next-intl 4.9.0 -> 4.9.1 (MODERATE open redirect vulnerability)
- All production dependency vulns resolved. 9 remaining are dev-only (vite, hono via shadcn CLI)
- Changed default theme from "system" to "light" (day view by default, toggle still available)
- Quality gates verified: lint clean, type-check clean, 238 tests passing, build succeeds (91 static pages)
- Flagged Vitest unpinned from 4.0.18 to 4.1.2 (Node 20 compat concern)
- Created SECURITY-AUDIT.md: full 20-section penetration test sweep, 0 critical/high findings
- Updated Platform Tracking Matrix in global checklist

---

## What Was Completed Session #28

### Project Map Tour
- Verified and filled in `~/.claude/docs/projectmap/orcachild.md` -- zero TODO markers remaining
- All sections verified from codebase: dependencies (40 packages), env vars (10), API routes (1 REST + 6 server actions), database (10 tables), integrations (7 services), file structure, test coverage (238 tests), codebase metrics

### Governance Fixes
- Created missing `.claude/AUDIT.md` governance file
- Fixed 4 stale items in `ProjectHealth.md` (CSP nonces, API validation, i18n, accommodations)
- Updated health scores to reflect Sessions #21-27 (overall 9.4 -> 9.5)
- Fixed stale VPS port map in `Handoff.md` and `OPERATIONS.md` (wrong PM2 users/ports)

### FAQ Content Update
- Updated volunteer FAQ (EN + ES): all under-18 need parental consent + must be accompanied by adult at all times
- Previous text only mentioned under-13 needing parental consent

### Memories System
- Added "Shared Memories" step to global session start prompt
- Saved beach day memory (2026-03-21) and OneDrive reference to project memory
- Future sessions will check `C:\Users\basro\OneDrive\Memories` at startup

### Quality Gates
- ✅ `pnpm lint` -- 0 errors
- ✅ `pnpm type-check` -- 0 errors
- ⬜ VPS deploy pending (FAQ text change + hero text from Session #27)

---

## What Was Completed Session #27

### Hero Text Update
- Changed hero heading to "Guardians of Southern California Waters" (two-line layout)
- Commit: `3495190` -- pushed to origin/main

### VPS Hardening
- PM2 systemd startup hook for orcachild user, colourparlor memory fix, security patches

### Operations Guide
- Created `OPERATIONS.md` -- full command reference

---

## Audit Health Summary (updated Session #28)

| Dimension         | Score    | Grade | Notes |
| ----------------- | -------- | ----- | ----- |
| Quality Gates     | 5/5      | A+    | lint, type-check, test, build, audit all pass |
| Code Quality      | 10/10    | A+    | Zod schemas on all API clients (Session #26) |
| Security          | 10/10    | A+    | Nonce CSP, full RLS, CSRF, no PII logging |
| Accessibility     | 9/10     | A     | Needs live axe-core run |
| Performance       | 9/10     | A     | All images have sizes; needs Lighthouse run |
| i18n              | 9/10     | A     | EN/ES parity; 23 MDX files still EN-only (D8) |
| Inclusivity       | 10/10    | A+    | Accommodations sections added (Session #26) |
| Bias              | 9/10     | A     | — |
| Test Coverage     | 9/10     | A     | 238 tests |
| Design Continuity | 10/10    | A+    | Hero text updated (Session #27) |
| Tech Debt         | 9/10     | A     | — |
| Dependencies      | 8/10     | B+    | 9 vulns (2 high, 7 moderate) -- all dev-only. Production deps clean. |
| Documentation     | 10/10    | A+    | OPERATIONS.md added (Session #27) |
| SEO               | 9/10     | A     | JSON-LD on all content pages + sitemap + OG |
| **Overall**       | **9.5**  | **A** | Production deps patched, 9 dev-only vulns remain |

---

## Open Audit Items

All A-series audit items resolved. No open code issues.
Remaining gaps are content work (D8, D9).

---

## Deferred Content Work

| ID   | Issue                                           |
| ---- | ----------------------------------------------- |
| D8   | 23 MDX files need Spanish translations          |
| D9   | 16 MDX files missing `readingLevel` frontmatter |
| ~~D10~~  | ~~No accessibility accommodations info anywhere~~ — RESOLVED (Session #26) |

---

## Blockers & Open Questions

1. **SQL migrations not yet run** — must run 002 + 003 in Supabase SQL Editor before events/consent go live
2. **Zeffy account not created** — requires registered nonprofit status
3. **No logo yet** — using Waves icon placeholder
4. **Original photos in progress** — real species photos now live (CC licensed); Jordyn's own photos to replace when ready
5. **og-image.jpg not created** — 1200x630 branded image needed for Open Graph previews
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
| PM2 Process | `ocinw` (under `orcachild` user's PM2, NOT root) |
| PM2 Startup | `pm2-orcachild.service` (systemd, auto-starts on reboot) |
| Domain | `www.orcachildinthewild.com` (canonical) |
| SSL Expiry | 2026-05-26 (auto-renews) |

### Port Map (all sites on this VPS)
| App | Port | PM2 User | Memory Cap |
|-----|------|----------|------------|
| ocinw | 3000 | orcachild | — |
| colourparlor | 3001 | colourparlor | 250MB |
| builtbybas | 3002 | builtbybas | — |
| figaro | 3004 | figaro | — |
| umami | 3003 | umamiapp | — |

```bash
# One-liner deploy:
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30 \
  "cd ~/ocinw-website && git pull && pnpm install --frozen-lockfile && pnpm build && pm2 restart ocinw"
```

> Full operations guide: `OPERATIONS.md` in project root.

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
| Next.js | 16.2.3 | 16.1.7 (needs deploy to update VPS) |
| Node.js | 20.18.0 | 22.22.0 |
| pnpm | 10.10.0 | 10.30.2 |
| PM2 | — | 6.0.14 |
| TypeScript | 5.9.3 | — |
| Tailwind | v4.2.2 | — |
| Zod | v4.3.6 | — |
| next-intl | v4.9.1 | — |
| Vitest | v4.1.2 (dev) | — |
