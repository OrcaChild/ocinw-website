# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-25
> Session: #13 (VPS Deployment + Velite Fix)

---

## At A Glance

**Current Phase:** Phase 9 COMPLETE, VPS DEPLOYED | **Blockers:** 0 critical (1 remaining: O3 Supabase) | **Next Action:** Phase 10 (Events System), commit Phase 9, or run remaining security hardening commands

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

Nothing active — deployment complete, ready for next phase.

---

## What Was Completed This Session (Session #13)

### Bug Fix — Velite ESM Import
- Fixed `Internal Server Error` on dev server startup
- **Root cause:** Velite 0.3.1 is ESM-only, but Next.js compiles `next.config.ts` to CJS, converting `import()` to `require()`
- **Fix:** Used `Function` constructor pattern in `next.config.ts` to prevent static analysis from converting the dynamic import
- File changed: `next.config.ts` (line 15-17)

### VPS Deployment — Full Stack Setup
- **Server:** Hostinger KVM 1, Ubuntu 24.04 LTS, 3.8GB RAM, 48GB disk
- **IP:** 72.62.200.30
- **Domain:** `orcachildinthewild.com` (DNS A record pointed from Wix)
- **HTTPS:** Let's Encrypt SSL via Certbot (expires 2026-05-26, auto-renews)

**Infrastructure installed:**
- Node.js v22.22.0
- pnpm 10.30.2
- PM2 6.0.14 (process manager)
- Nginx 1.24.0 (reverse proxy)
- Certbot 2.9.0 (SSL)

**Deployment details:**
- Repo cloned to `/home/orcachild/ocinw-website/`
- App built (89 static pages)
- PM2 manages Next.js process (`ocinw`)
- Nginx reverse proxies port 80/443 → localhost:3000
- HTTP auto-redirects to HTTPS

### VPS Security Hardening
- SSH root login disabled (`PermitRootLogin no`)
- SSH on non-standard port 2222 (systemd socket override)
- SSH restricted to `orcachild` user only (`AllowUsers orcachild`)
- SSH MaxAuthTries 3
- UFW firewall: deny-by-default, only 80/443/2222 open
- Fail2Ban active monitoring SSH
- Unattended security upgrades enabled
- Nginx security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- Server version hidden (`server_tokens off`)
- Hidden files blocked in Nginx
- Port 3000 blocked externally by UFW

### Security — Remaining Hardening (run as root in web console)
```
echo "PasswordAuthentication no" > /etc/ssh/sshd_config.d/99-security.conf && systemctl restart ssh
usermod -s /usr/sbin/nologin ubuntu
ufw delete allow 22/tcp
```

### Local Codebase Fixes
- Added `ssh.md` to `.gitignore` (SSH private key was in repo directory)
- SSH key moved to `~/.ssh/orcachild_vps` with proper permissions

---

## What Was Completed Last Session (Session #12)

### Phase 9 — Education & Conservation Content (COMPLETE)
See Completed.md for full details.

---

## What Should Be Done Next

### Option A: Commit Phase 9 + Velite Fix + Push to GitHub
Phase 9 code and the `next.config.ts` Velite fix are ready for commit.

### Option B: Phase 10 — Events System
Events listing, detail pages, event registration, calendar view.

### Option C: Run Remaining Security Hardening
3 root commands in the web console (see above).

### Option D: PM2 Startup on Boot
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
| Velite import fix | Function constructor | Prevents CJS compilation from converting ESM import() | #13 |
| Hosting | Hostinger VPS (not Vercel) | User already has VPS, more control, $0 additional cost | #13 |
| SSH port | 2222 | Port 443 needed for HTTPS, 22 was the old default | #13 |
| Domain DNS | Wix A record → VPS IP | Simplest approach, keeps domain at Wix for now | #13 |
| Process manager | PM2 | Industry standard, auto-restart, easy deployment | #13 |
| Reverse proxy | Nginx | Handles SSL, security headers, static caching | #13 |

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
