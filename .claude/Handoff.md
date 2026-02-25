# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-25
> Session: #14 (Production Bug Fixes — MDX CSP + Newsletter CSRF)

---

## At A Glance

**Current Phase:** Phase 9 COMPLETE, VPS DEPLOYED + LIVE | **Blockers:** 0 critical (1 remaining: O3 Supabase) | **Next Action:** Phase 10 (Events System) or remaining security hardening

---

## Quick Status

| Phase                          | Status          | Dependencies                         | Notes                                                    |
| ------------------------------ | --------------- | ------------------------------------ | -------------------------------------------------------- |
| Phase 1 — Legal Foundation     | NOT STARTED     | None                                 | Independent of website dev; can run in parallel           |
| Phase 2 — Brand Identity       | **COMPLETE**    | None                                 | Carlsbad Coastal redesign — warm palette + images         |
| Phase 3 — Tech Stack           | DECIDED         | None                                 | All technology choices locked in OCINW.MD                 |
| Phase 4 — Project Scaffolding  | **COMPLETE**    | None                                 | 11 steps, 11 commits, all gates pass                     |
| Phase 5 — Core Website         | **COMPLETE**    | Phase 4                              | All pages, nav, forms, error handling, security headers   |
| Phase 6 — Weather & Tides      | **COMPLETE**    | Phase 5                              | Full dashboard, live APIs, geolocation, tide chart        |
| Phase 7 — Donation System      | **COMPLETE**    | Phase 1 (Zeffy needs nonprofit)      | Full donate page + thank-you + Zeffy embed placeholder    |
| Phase 8 — Volunteer System     | **COMPLETE**    | Phase 5                              | Full signup form + age-gating + COPPA fields + thank-you  |
| Phase 9 — Education Content    | **COMPLETE**    | Phase 4 (MDX infra)                  | Velite + 23 MDX files + Education Hub + Conservation Hub  |
| Phase 10 — Events System       | NOT STARTED     | Phase 5                              | Events listing, detail, registration, calendar            |
| Phase 11 — Testing             | **COMPLETE**    | Phase 5+                             | 217 unit tests, 4 E2E suites, axe-core a11y tests        |
| Phase 12 — Pre-Launch          | NOT STARTED     | Phase 5-11                           | All features must be built                                |
| Phase 13 — Launch              | IN PROGRESS     | Phase 12                             | VPS deployed, HTTPS live                                  |
| Phase 14 — Post-Launch         | NOT STARTED     | Phase 13                             | —                                                         |

---

## Currently In-Progress

Nothing active — all bugs fixed, site fully live, ready for next phase.

---

## What Was Completed This Session (Session #14)

### Bug Fix — MDX Pages "Something Went Wrong" (CSP Issue)
- **Symptom:** All MDX content pages (articles, species, ecosystems, projects) showed error boundary on live site
- **Root cause:** `MDXContent.tsx` was a `"use client"` component using `new Function(code)` which requires `unsafe-eval` in CSP. Production CSP (`script-src 'self' 'unsafe-inline'`) correctly blocks `unsafe-eval`.
- **Fix:** Converted `MDXContent.tsx` from client component to **server component**. Removed `"use client"` directive and `useMemo` hook. `new Function()` now runs in Node.js (server-side) where CSP doesn't apply. The rendered HTML is sent to the browser without needing client-side code evaluation.
- File changed: `src/components/shared/MDXContent.tsx`

### Bug Fix — Newsletter Subscribe "Something went wrong"
- **Symptom:** Newsletter subscribe in footer always showed "Something went wrong. Please try again."
- **Root cause:** CSRF origin check in `src/app/actions/newsletter.ts` compares browser's `Origin` header against `NEXT_PUBLIC_SITE_URL`. The env var was `http://orcachildinthewild.com` but the browser sends `https://orcachildinthewild.com` — protocol mismatch fails the check.
- **Fix:** Updated `.env.local` on VPS from `http://` to `https://`
- File changed: VPS `/home/orcachild/ocinw-website/.env.local`

### Deployment
- Committed both fixes to GitHub (`19b5a84`)
- Pulled, rebuilt (89 static pages), and restarted PM2 on VPS
- Verified: all page types return 200, MDX articles render full content, no error boundaries

---

## What Was Completed Last Session (Session #13)

### VPS Deployment + Velite Fix + Security Hardening
See Completed.md for full details.

---

## What Should Be Done Next

### Option A: Phase 10 — Events System
Events listing, detail pages, event registration, calendar view.

### Option B: Run Remaining Security Hardening
3 root commands in the web console (run as root):
```
echo "PasswordAuthentication no" > /etc/ssh/sshd_config.d/00-security.conf && systemctl restart ssh
usermod -s /usr/sbin/nologin ubuntu
ufw delete allow 22/tcp
```
Note: Use `00-security.conf` (not `99-`) because SSH uses first-match-wins and `50-cloud-init.conf` would override it.

### Option C: PM2 Startup on Boot
Run this as root in web console so the app survives server reboots:
```
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u orcachild --hp /home/orcachild
```

### Remaining Open Issues (1)

| ID | Severity | Issue                                | Status                        |
| -- | -------- | ------------------------------------ | ----------------------------- |
| O3 | HIGH     | Forms don't persist data             | Deferred to Supabase setup    |

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
| Domain | `orcachildinthewild.com` |
| SSL Expiry | 2026-05-26 (auto-renews) |

### Deployment Workflow (for future updates)
```bash
# SSH into server
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30

# Pull latest, install deps, rebuild, restart
cd ~/ocinw-website && git pull && pnpm install && pnpm build && pm2 restart ocinw
```

---

## Hostinger Firewall (hPanel)

| Port | Protocol | Purpose |
|------|----------|---------|
| 80   | TCP      | HTTP (redirects to HTTPS) |
| 443  | TCP      | HTTPS |
| 2222 | TCP      | SSH |

---

## DNS (Wix)

| Type | Host | Value |
|------|------|-------|
| A | orcachildinthewild.com | 72.62.200.30 |
| CNAME | www.orcachildinthewild.com | orcachildinthewild.com |

---

## Repository

- **GitHub:** `https://github.com/OrcaChild/ocinw-website`
- **Branch:** `main`
- **Git config:** user.name="Orca Child", user.email="orcachildinthewild@gmail.com"

---

## Blockers & Open Questions

1. **Supabase project not created** — need free-tier project for DB features
2. **Zeffy account not created** — requires registered nonprofit status for full donation setup
3. **No logo yet** — using Waves icon (lucide) as placeholder
4. **Original photos in progress** — user assembling real photos to replace stock placeholders
5. **PM2 startup on boot not configured** — needs root command (see Option D above)

*None of these block Phase 10.*

---

## Decisions Made This Session

| Decision | Choice | Why | Session |
| -------- | ------ | --- | ------- |
| MDXContent rendering | Server component | Avoids `unsafe-eval` in CSP; `new Function()` runs server-side where CSP doesn't apply | #14 |
| SITE_URL protocol | `https://` | Must match browser Origin header for CSRF validation | #14 |

---

## Environment Setup Notes

- Development machine: Windows 11 Pro
- Shell: bash (Git Bash)
- Working directory: `c:\OrcaChild`
- Node.js: v20.18.0
- pnpm: 10.10.0
- GitHub CLI: v2.87.2
- **Note:** Turbopack crashes on this machine. Use `pnpm dev --webpack` for dev server.
- **VPS SSH:** `ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30`

---

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
