# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-25
> Session: #15 (Security Audit + Hardening + CSRF www Fix)

---

## At A Glance

**Current Phase:** Phase 9 COMPLETE, VPS DEPLOYED + LIVE | **Blockers:** 0 critical code (V6 Supabase deferred) | **Next Action:** Nginx www redirect + Phase 10 (Events)

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
| Phase 10 — Events System       | NOT STARTED     | Events listing, detail, registration                      |
| Phase 11 — Testing             | **COMPLETE**    | 218 tests, E2E, axe-core                                 |
| Phase 12 — Pre-Launch          | NOT STARTED     | All features must be built                                |
| Phase 13 — Launch              | IN PROGRESS     | VPS deployed, HTTPS live                                  |
| Phase 14 — Post-Launch         | NOT STARTED     | —                                                         |

---

## Currently In-Progress

### Nginx www Canonical Redirect (NOT YET DONE)
User wants `https://www.orcachildinthewild.com` as the canonical domain. Need to add Nginx redirect from non-www to www. Run this in **Hostinger root console**:

```nginx
# Add a separate server block for non-www → www redirect on port 443
# This needs to be added to /etc/nginx/sites-available/ocinw
# The existing port 443 server block should only serve www
```

The exact Nginx config change still needs to be crafted and applied. The CSRF code fix (www-tolerant `isValidOrigin()`) is already deployed as a safety net.

---

## What Was Completed This Session (Session #15)

### Security Posture Report
- Created comprehensive pentester-level security audit at `.claude/SecurityPosture.md`
- 10 sections: exec summary, stack, architecture, VPS, app, vulnerabilities, risk register, compliance, maintenance, incident response
- Rewrote for readability (narrow tables, broken categories, ~410 lines)

### Security Fixes — Code (commit `2fb97c3`)
| Fix | Vulnerability | What Changed |
|-----|--------------|--------------|
| V3  | IP spoofing  | All 3 server actions use `x-real-ip` instead of spoofable `x-forwarded-for` |
| V7  | CSRF leniency| Origin header now required (reject if missing) |
| V8  | No field limits| Max length on all text fields, phone regex, howHeard enum |

### Security Fixes — VPS (run by user in Hostinger root console)
| Fix | Vulnerability | What Changed |
|-----|--------------|--------------|
| V1  | Fail2ban wrong port | `jail.local` updated to port 2222 |
| V2  | SSH auth ordering | Renamed to `00-security.conf` (loads first) |
| V4  | Missing HSTS | Added `Strict-Transport-Security` to Nginx |
| V5  | PM2 not boot-persistent | Created `pm2-orcachild.service` |

### CSRF www Fix (commit `7e3516d`)
- **Root cause:** Browser on `www.orcachildinthewild.com` sends `Origin: https://www.orcachildinthewild.com` but `SITE_URL` was `https://orcachildinthewild.com`
- **Fix:** Created shared `src/lib/utils/csrf.ts` with `isValidOrigin()` that strips `www.` from both sides before comparing
- All 3 server actions refactored to use the shared helper
- VPS `NEXT_PUBLIC_SITE_URL` updated to `https://www.orcachildinthewild.com`

### Test Updates
- Updated CSRF tests: "allows absent origin" → "rejects absent origin"
- Split IP extraction test into x-real-ip + x-forwarded-for fallback
- 218 tests passing (up from 217)

---

## What Should Be Done Next

### Priority 1: Nginx www Redirect
User wants `www.orcachildinthewild.com` as canonical. Need to configure Nginx to redirect `orcachildinthewild.com` → `www.orcachildinthewild.com` on port 443. This requires editing `/etc/nginx/sites-available/ocinw` in the Hostinger root console.

### Priority 2: Phase 10 — Events System
Events listing, detail pages, event registration, calendar view.

### Remaining Open Vulnerabilities

| ID | Severity | Issue | Fix |
|----|----------|-------|-----|
| V6 | CRITICAL | Forms don't persist data | Supabase (Phase 10+) |
| V9 | MEDIUM   | Geolocation in localStorage | Switch to sessionStorage |

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

1. **Supabase project not created** — need for DB features (V6)
2. **Zeffy account not created** — requires registered nonprofit
3. **No logo yet** — using Waves icon placeholder
4. **Original photos in progress** — user assembling real photos
5. **Nginx www redirect not configured** — needs root console

---

## Decisions Made This Session

| Decision | Choice | Why |
| -------- | ------ | --- |
| Canonical domain | `www.orcachildinthewild.com` | User preference |
| CSRF validation | Shared `isValidOrigin()` helper | DRY, www-tolerant, used by all 3 actions |
| IP extraction | `x-real-ip` first | Set by Nginx from `$remote_addr`, not spoofable |
| Origin header | Required (reject if missing) | Stricter CSRF — Next.js also has built-in tokens as backup |

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
