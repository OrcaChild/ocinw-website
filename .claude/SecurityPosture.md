# Orca Child in the Wild — Security Posture Report

> **Classification:** Internal — Board & Technical Review
> **Date:** February 25, 2026
> **Prepared by:** Claude Opus 4.6 (AI Security Audit)
> **Domain:** orcachildinthewild.com
> **Server IP:** 72.62.200.30

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technology Stack](#technology-stack)
3. [Infrastructure Architecture](#infrastructure-architecture)
4. [VPS Security Posture](#vps-security-posture)
5. [Application Security Posture](#application-security-posture)
6. [Active Vulnerabilities & Exploits](#active-vulnerabilities--exploits)
7. [Risk Register](#risk-register)
8. [Compliance Status](#compliance-status)
9. [Ongoing Maintenance Plan](#ongoing-maintenance-plan)
10. [Incident Response Procedure](#incident-response-procedure)

---

## 1. Executive Summary

Orca Child in the Wild (OCINW) is a youth-run nonprofit website serving conservation education content, volunteer signups, donations, and live weather/tide data for Southern California. The site is deployed on a Hostinger KVM VPS running Ubuntu 24.04 LTS with Nginx, Node.js, and PM2.

**Overall Security Rating: B+**

The infrastructure has strong perimeter defenses (firewall, SSH hardening, HTTPS, security headers) and the application has solid input validation. However, **5 exploitable vulnerabilities** exist that must be resolved before collecting real user data:

| Severity | Count | Summary |
|----------|-------|---------|
| CRITICAL | 2 | Fail2ban misconfigured; forms don't persist data |
| HIGH | 3 | Rate limit bypass via IP spoofing; HSTS missing; PM2 not boot-persistent |
| MEDIUM | 6 | Password auth may be enabled; field length limits missing; no error logging; CSRF origin check too lenient; geolocation PII in localStorage; no API response validation |
| LOW | 4 | Phone validation missing; Nginx body size not explicit; X11Forwarding duplicate; no Nominatim cache |

---

## 2. Technology Stack

### Application Layer

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | Next.js (App Router) | 16.1.6 | Server-rendered React framework |
| Language | TypeScript | 5.9.3 | Strict mode, type-safe codebase |
| Runtime | React | 19.2.3 | UI component library |
| Styling | Tailwind CSS | 4.2.0 | Utility-first CSS |
| Components | shadcn/ui + Radix UI | 1.4.3 | Accessible UI primitives |
| Validation | Zod | 4.3.6 | Schema validation (client + server) |
| Content | Velite (MDX) | 0.3.1 | Build-time MDX compilation |
| i18n | next-intl | 4.8.3 | English/Spanish translations |
| Forms | react-hook-form | 7.71.2 | Form state management |
| Charts | Recharts | 3.7.0 | Tide chart visualization |
| Maps | Leaflet + react-leaflet | 1.9.4 / 5.0.0 | Interactive maps |
| Icons | lucide-react | 0.575.0 | SVG icon library |
| Toasts | Sonner | 2.0.7 | Notification system |
| Themes | next-themes | 0.4.6 | Light/dark mode |

### Infrastructure Layer

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| OS | Ubuntu | 24.04 LTS | Server operating system |
| Kernel | Linux | 6.8.0-101-generic | Kernel version |
| Web Server | Nginx | 1.24.0 | Reverse proxy + SSL termination |
| Runtime | Node.js | 22.22.0 | JavaScript runtime |
| Package Manager | pnpm | 10.30.2 | Dependency management |
| Process Manager | PM2 | 6.0.14 | App lifecycle management |
| SSL | Certbot (Let's Encrypt) | 2.9.0 | TLS certificate management |
| Firewall | UFW | — | Packet filtering |
| Intrusion Prevention | Fail2ban | — | Brute force protection |

### External Services (All Free Tier, No Keys Required Unless Noted)

| Service | Purpose | Auth Required |
|---------|---------|---------------|
| Open-Meteo | Weather data API | No |
| NOAA CO-OPS | Tide prediction API | No |
| OpenStreetMap Nominatim | Reverse geocoding | No |
| Supabase | Database + Auth (planned) | Yes (API key) |
| Resend | Email delivery (planned) | Yes (API key) |
| Zeffy | Donation processing (planned) | No (iframe embed) |
| GitHub | Source code repository | Yes (deploy key) |

### Testing Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Vitest | 4.0.18 | Unit test runner (217 tests) |
| Playwright | 1.58.2 | E2E browser testing |
| axe-core | 4.11.1 | Accessibility auditing |
| happy-dom | 20.7.0 | DOM environment for hook tests |

---

## 3. Infrastructure Architecture

```
                     ┌─────────────────────┐
                     │   Wix DNS            │
                     │   A: → 72.62.200.30  │
                     │   CNAME: www → apex  │
                     └─────────┬───────────┘
                               │
                     ┌─────────▼───────────┐
                     │  Hostinger Firewall  │
                     │  Accept: 80,443,2222 │
                     │  Drop: everything    │
                     └─────────┬───────────┘
                               │
                     ┌─────────▼───────────┐
                     │  Ubuntu 24.04 LTS   │
                     │  UFW Firewall        │
                     │  Allow: 80,443,2222  │
                     │  Deny: all other     │
                     └────┬────┬────┬──────┘
                          │    │    │
              ┌───────────┘    │    └───────────┐
              │                │                │
    ┌─────────▼──────┐ ┌──────▼──────┐ ┌───────▼──────┐
    │  Nginx :443    │ │  Nginx :80  │ │  SSH :2222   │
    │  SSL terminate │ │  → 301 HTTPS│ │  Key-only    │
    │  Security hdrs │ │             │ │  Fail2ban*   │
    └───────┬────────┘ └─────────────┘ └──────────────┘
            │
    ┌───────▼────────┐
    │  Next.js :3000 │
    │  PM2 managed   │
    │  89 static pgs │
    │  Server actions│
    └────────────────┘
```

*Fail2ban monitoring note: see Vulnerability V1 below.

### Network Exposure

| Port | Service | External Access | Protection |
|------|---------|-----------------|------------|
| 80 | Nginx HTTP | Yes (redirects to HTTPS) | 301 redirect only |
| 443 | Nginx HTTPS | Yes | TLS 1.2/1.3, security headers |
| 2222 | OpenSSH | Yes | Key-only auth, Fail2ban, AllowUsers |
| 3000 | Next.js | **No** (localhost only) | UFW blocks external |

### Server Resources

| Resource | Value | Status |
|----------|-------|--------|
| RAM | 3.8 GB total, 809 MB used | Healthy (79% free) |
| Disk | 48 GB total, 4.8 GB used | Healthy (90% free) |
| CPU | KVM 1 vCPU | Adequate for current load |
| App Memory | 103 MB (PM2 process) | Normal for Next.js |

---

## 4. VPS Security Posture

### 4.1 SSH Hardening

| Control | Status | Detail |
|---------|--------|--------|
| Root login | DISABLED | `PermitRootLogin no` in sshd_config |
| Non-standard port | ENABLED | Port 2222 (systemd socket override) |
| User restriction | ENABLED | `AllowUsers orcachild` — only 1 user |
| Max auth tries | 3 | Limits brute force per connection |
| X11 forwarding | DISABLED | `X11Forwarding no` |
| Key-based auth | REQUIRED | Ed25519 key pair |
| Password auth | **UNCERTAIN** | See Vulnerability V2 |
| Ubuntu default user | DISABLED | Shell set to `/usr/sbin/nologin` |

### 4.2 Firewall (Dual-Layer)

**Layer 1 — Hostinger Network Firewall (hPanel):**

| Rule | Protocol | Ports | Action |
|------|----------|-------|--------|
| Web traffic | TCP | 80, 443 | Accept |
| SSH | TCP | 2222 | Accept |
| Default | ALL | ALL | Drop |

**Layer 2 — UFW (Host Firewall):**

| Direction | Policy |
|-----------|--------|
| Incoming | Deny (default) |
| Outgoing | Allow (default) |
| Routed | Deny (default) |

| Rule | Port | Action |
|------|------|--------|
| HTTP | 80/tcp | Allow |
| HTTPS | 443/tcp | Allow |
| SSH | 2222/tcp | Allow |

### 4.3 Intrusion Prevention (Fail2ban)

| Setting | Value | Issue |
|---------|-------|-------|
| Enabled | Yes | — |
| **Monitored port** | **443** | **WRONG — should be 2222** |
| Max retries | 5 | — |
| Ban time | 3600s (1 hour) | — |
| Find time | 600s (10 min) | — |

### 4.4 SSL/TLS Configuration

| Setting | Value |
|---------|-------|
| Certificate | Let's Encrypt (Certbot managed) |
| Expires | 2026-05-26 |
| Auto-renewal | Yes (systemd timer, next run ~8h) |
| Protocols | TLS 1.2, TLS 1.3 |
| Cipher preference | Client (off = modern default) |
| Session tickets | Disabled |
| Session cache | Shared, 10MB |
| DH parameters | Custom (ssl-dhparams.pem) |

**Cipher suites (strong, modern):**
- ECDHE-ECDSA-AES128-GCM-SHA256
- ECDHE-RSA-AES128-GCM-SHA256
- ECDHE-ECDSA-AES256-GCM-SHA384
- ECDHE-RSA-AES256-GCM-SHA384
- ECDHE-ECDSA-CHACHA20-POLY1305
- ECDHE-RSA-CHACHA20-POLY1305
- DHE-RSA-AES128-GCM-SHA256
- DHE-RSA-AES256-GCM-SHA384

### 4.5 Nginx Security

| Control | Status | Detail |
|---------|--------|--------|
| Server version hidden | YES | `server_tokens off` in site config |
| Hidden files blocked | YES | `location ~ /\.(?!well-known) { deny all; }` |
| HTTP → HTTPS redirect | YES | 301 redirect on port 80 |
| Static asset caching | YES | `/_next/static/` cached 365d, immutable |
| WebSocket support | YES | Upgrade headers proxied |
| Proxy headers | YES | X-Real-IP, X-Forwarded-For, X-Forwarded-Proto |
| HSTS | **MISSING** | See Vulnerability V4 |
| client_max_body_size | Not set | Nginx default 1MB applies |

### 4.6 System Maintenance

| Control | Status | Detail |
|---------|--------|--------|
| Unattended security upgrades | ENABLED | `APT::Periodic::Unattended-Upgrade "1"` |
| Package list auto-update | ENABLED | `APT::Periodic::Update-Package-Lists "1"` |
| PM2 auto-restart on crash | YES | PM2 monitors process |
| PM2 auto-start on boot | **NOT CONFIGURED** | See Vulnerability V5 |

---

## 5. Application Security Posture

### 5.1 HTTP Security Headers

All responses include these headers via `next.config.ts`:

| Header | Value | OWASP |
|--------|-------|-------|
| Content-Security-Policy | See below | A5 |
| X-Frame-Options | DENY | Clickjacking |
| X-Content-Type-Options | nosniff | MIME sniffing |
| Referrer-Policy | strict-origin-when-cross-origin | Info leakage |
| Permissions-Policy | camera=(), microphone=(), geolocation=(self) | Sensor access |

**Production CSP Directives:**

| Directive | Value | Why |
|-----------|-------|-----|
| default-src | 'self' | Block all external resources by default |
| script-src | 'self' 'unsafe-inline' | App scripts + Next.js inline scripts |
| style-src | 'self' 'unsafe-inline' | Tailwind CSS + inline styles |
| img-src | 'self' data: https: | Local images + data URIs + any HTTPS image |
| connect-src | 'self' + 5 APIs | Whitelist: Open-Meteo, NOAA, Supabase, Nominatim |
| frame-src | https://www.zeffy.com | Only Zeffy donation iframe |
| font-src | 'self' | Local fonts only |

**Notable:** `unsafe-eval` is NOT allowed in production. MDX content renders server-side to avoid needing it.

### 5.2 Input Validation (Zod Schemas)

Every form submission is validated with Zod on both client and server side:

**Contact Form:**
| Field | Validation |
|-------|-----------|
| name | string, min 2 chars |
| email | valid email format |
| subject | string, min 5 chars |
| message | string, min 10 chars |

**Newsletter Signup:**
| Field | Validation |
|-------|-----------|
| email | valid email format |
| firstName | optional string |

**Volunteer Signup:**
| Field | Validation |
|-------|-----------|
| firstName | string, min 2 chars |
| lastName | string, min 2 chars |
| email | valid email format |
| phone | optional (no format validation) |
| ageRange | enum: under-13, 13-17, 18-25, 26-40, 41-60, 60+ |
| zipCode | regex: exactly 5 digits |
| interests | array, min 1 item, from 13 valid options |
| availability | array, min 1 item, from 6 valid options |
| parentGuardianName | required if age < 18 |
| parentGuardianEmail | required if age < 18, valid email |
| parentGuardianPhone | required if age < 18 |
| agreeToCodeOfConduct | must be true |
| agreeToPrivacy | must be true |

### 5.3 CSRF Protection

All server actions validate the `Origin` header:

```
Browser sends: Origin: https://orcachildinthewild.com
Server checks: Origin === new URL(NEXT_PUBLIC_SITE_URL).origin
Mismatch → reject with "Invalid request origin"
```

Additionally, Next.js Server Actions include automatic CSRF tokens in the framework layer.

### 5.4 Rate Limiting

| Endpoint | Limit | Window | Per |
|----------|-------|--------|-----|
| Contact form | 3 submissions | 1 hour | IP address |
| Newsletter signup | 5 attempts | 1 hour | IP address |
| Volunteer signup | 10 submissions | 1 minute | IP address |

Implementation: In-memory `Map<string, timestamp[]>` with 60-second auto-cleanup of stale entries.

### 5.5 Error Handling

| Layer | Behavior | Info Leakage |
|-------|----------|--------------|
| Page-level error boundary | Shows translated "Something Went Wrong" + retry button | None — no stack traces |
| Global error boundary | Shows hardcoded HTML (no Tailwind available) | None — generic message |
| Server action validation | Returns first Zod error message only | None — no field dumps |
| API failures (weather/tides) | Component-level fallback UI | None — "data unavailable" |
| 404 | Custom page with helpful navigation links | None |

### 5.6 Environment Variable Security

| Variable | Exposure | Validation |
|----------|----------|------------|
| SUPABASE_SERVICE_ROLE_KEY | Server only | string, min 1 char |
| RESEND_API_KEY | Server only | string, starts with "re_" |
| NEXT_PUBLIC_SUPABASE_URL | Client + server | valid URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Client + server (by design) | string, min 1 char |
| NEXT_PUBLIC_SITE_URL | Client + server | valid URL |

All variables validated at startup via Zod. Missing or invalid variables halt the application immediately.

---

## 6. Active Vulnerabilities & Exploits

### V1 — CRITICAL: Fail2ban Monitors Wrong Port

| Detail | Value |
|--------|-------|
| Severity | **CRITICAL** |
| Exploitable | **YES — RIGHT NOW** |
| File | `/etc/fail2ban/jail.local` |

**Finding:** Fail2ban is configured to monitor SSH on **port 443**, but SSH was moved to **port 2222**. Fail2ban is providing **zero protection** against SSH brute force attacks.

**Exploit scenario:** An attacker can attempt unlimited SSH login attempts against port 2222. Fail2ban will never ban them because it's watching the wrong port.

**Fix (run as root in web console):**
```bash
cat > /etc/fail2ban/jail.local << 'EOF'
[sshd]
enabled = true
port = 2222
maxretry = 5
bantime = 3600
findtime = 600
EOF
systemctl restart fail2ban
```

---

### V2 — MEDIUM: SSH Password Authentication May Be Enabled

| Detail | Value |
|--------|-------|
| Severity | **MEDIUM** |
| Exploitable | Requires valid username |
| Files | `/etc/ssh/sshd_config.d/50-cloud-init.conf`, `99-security.conf` |

**Finding:** The sshd_config.d directory contains:
- `50-cloud-init.conf` (27 bytes) — likely contains `PasswordAuthentication yes`
- `99-security.conf` (26 bytes) — contains `PasswordAuthentication no`

SSH uses **first-match-wins** and loads files alphabetically. `50-cloud-init.conf` loads before `99-security.conf`, meaning password authentication may still be enabled.

**Fix (run as root in web console):**
```bash
echo "PasswordAuthentication no" > /etc/ssh/sshd_config.d/00-security.conf
rm /etc/ssh/sshd_config.d/99-security.conf
systemctl restart ssh
```

---

### V3 — CRITICAL: Rate Limit Bypass via IP Spoofing

| Detail | Value |
|--------|-------|
| Severity | **CRITICAL** |
| Exploitable | **YES** |
| Files | All 3 server actions |

**Finding:** All server actions extract the client IP from:
```typescript
headersList.get("x-forwarded-for")?.split(",")[0]?.trim()
```

This takes the **first** IP in the X-Forwarded-For chain. An attacker can inject a fake IP:
```
X-Forwarded-For: fake-ip-123, real-client-ip
```

The rate limiter would track `fake-ip-123` instead of the real IP. By rotating fake IPs, an attacker can bypass all rate limits entirely.

**Fix:** On this Nginx setup, use `X-Real-IP` (set by Nginx from `$remote_addr`) instead of `X-Forwarded-For`:
```typescript
// BEFORE (vulnerable):
const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim()
  ?? headersList.get("x-real-ip") ?? "unknown";

// AFTER (secure):
const ip = headersList.get("x-real-ip")
  ?? headersList.get("x-forwarded-for")?.split(",").pop()?.trim()
  ?? "unknown";
```

---

### V4 — HIGH: No HSTS Header

| Detail | Value |
|--------|-------|
| Severity | **HIGH** |
| Exploitable | First visit only (SSL stripping) |
| File | `/etc/nginx/sites-available/ocinw` |

**Finding:** The Nginx configuration does not include a `Strict-Transport-Security` header. On a user's first visit, an attacker on the same network could perform an SSL stripping attack (intercept the HTTP → HTTPS redirect and serve the site over plain HTTP).

**Fix (add to Nginx server block for port 443):**
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

---

### V5 — HIGH: PM2 Not Configured for Boot

| Detail | Value |
|--------|-------|
| Severity | **HIGH** |
| Exploitable | Server reboot kills the website |
| Impact | Complete outage until manual restart |

**Finding:** If the VPS reboots (kernel update, Hostinger maintenance, crash), the Next.js application will not automatically restart. The site will be down until someone SSHes in and runs `pm2 start`.

**Fix (run as root in web console):**
```bash
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u orcachild --hp /home/orcachild
# Then as orcachild:
pm2 save
```

---

### V6 — CRITICAL: Form Data Not Persisted (No Database)

| Detail | Value |
|--------|-------|
| Severity | **CRITICAL** (data loss) |
| Files | contact.ts, newsletter.ts, volunteer.ts |

**Finding:** All three server actions validate input correctly but contain `// TODO` comments where database INSERT operations should be. Form submissions return "success" to the user but **data is silently discarded**. The newsletter deduplication uses an in-memory `Set` that resets on every server restart.

**Current state:** No Supabase project has been created yet.

**Impact:** Contact messages, newsletter signups, and volunteer registrations are all lost.

**Fix:** Create Supabase project and implement database operations before collecting real user data.

---

### V7 — MEDIUM: CSRF Origin Check Too Lenient

| Detail | Value |
|--------|-------|
| Severity | **MEDIUM** |
| Files | contact.ts, newsletter.ts, volunteer.ts |

**Finding:** The CSRF check allows requests with **no Origin header**:
```typescript
if (origin && origin !== expectedOrigin) { // Only rejects MISMATCHED origins
```

Some HTTP clients and older browsers may not send the Origin header. A stricter check would require it:
```typescript
if (!origin || origin !== expectedOrigin) { // Rejects missing AND mismatched
```

**Mitigating factor:** Next.js Server Actions have built-in CSRF tokens that provide additional protection.

---

### V8 — MEDIUM: No Max Length on Text Fields

| Detail | Value |
|--------|-------|
| Severity | **MEDIUM** |
| File | `src/lib/types/forms.ts` |

**Finding:** Multiple text fields (name, subject, message, skills, howHeard) have minimum length requirements but **no maximum**. An attacker could submit megabytes of text in a single field.

**Mitigating factor:** Nginx default `client_max_body_size` is 1MB.

**Fix:** Add `.max()` constraints to all text fields (e.g., name: 100, subject: 200, message: 2000, skills: 500).

---

### V9 — MEDIUM: Geolocation PII in localStorage

| Detail | Value |
|--------|-------|
| Severity | **MEDIUM** |
| File | `src/lib/api/geolocation.ts` |

**Finding:** User's GPS coordinates and city name are stored unencrypted in `localStorage`, which persists across sessions and is accessible to any JavaScript running on the same origin.

**Fix:** Use `sessionStorage` (cleared on browser close) or add opt-in consent.

---

## 7. Risk Register

| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|-----------|--------|------------|-------|--------|
| R1 | SSH brute force | HIGH | HIGH | Fix Fail2ban port (V1) | Admin | **OPEN** |
| R2 | Form spam bypass | HIGH | MEDIUM | Fix IP extraction (V3) | Dev | **OPEN** |
| R3 | SSL stripping | LOW | HIGH | Add HSTS header (V4) | Admin | **OPEN** |
| R4 | Server reboot outage | MEDIUM | HIGH | Configure PM2 startup (V5) | Admin | **OPEN** |
| R5 | User data loss | CERTAIN | CRITICAL | Implement Supabase (V6) | Dev | **OPEN** |
| R6 | COPPA violation | MEDIUM | CRITICAL | Implement parental consent | Dev | **OPEN** |
| R7 | DDoS via large payloads | LOW | MEDIUM | Add field max lengths (V8) | Dev | **OPEN** |
| R8 | Password brute force | LOW | HIGH | Fix SSH password auth (V2) | Admin | **OPEN** |
| R9 | Certificate expiry | LOW | HIGH | Certbot auto-renews (verified) | Auto | **MITIGATED** |
| R10 | OS vulnerability | LOW | HIGH | Unattended upgrades enabled | Auto | **MITIGATED** |
| R11 | Dependency vulnerability | MEDIUM | MEDIUM | Run `pnpm audit` before deploys | Dev | **MITIGATED** |

---

## 8. Compliance Status

### COPPA (Children's Online Privacy Protection Act)

| Requirement | Status | Detail |
|-------------|--------|--------|
| Age-gating on forms | IMPLEMENTED | Under-18 triggers parent fields |
| Parental consent verification | **NOT IMPLEMENTED** | No email token workflow yet |
| Minimal data collection | IMPLEMENTED | Only necessary fields required |
| No PII in logs | IMPLEMENTED | Console logging removed in audit |
| Data deletion capability | DESIGNED | Soft-delete pattern with `deleted_at` field (DB not yet created) |

**COPPA Rating: NON-COMPLIANT** — Cannot collect data from minors until parental consent workflow is implemented.

### CCPA (California Consumer Privacy Act)

| Requirement | Status | Detail |
|-------------|--------|--------|
| Privacy policy | IMPLEMENTED | `/privacy` page (marked DRAFT) |
| Data deletion rights | DESIGNED | Soft-delete + 90-day purge planned |
| Do Not Sell | N/A | No data sold |
| Data access requests | NOT IMPLEMENTED | No self-service data export |

### WCAG 2.1 AA Accessibility

| Requirement | Status | Detail |
|-------------|--------|--------|
| Skip-to-content link | IMPLEMENTED | First focusable element |
| Color contrast 4.5:1 | IMPLEMENTED | Tested via design system |
| Keyboard navigation | IMPLEMENTED | All interactive elements |
| ARIA labels | IMPLEMENTED | Decorative icons: aria-hidden |
| Form labels | IMPLEMENTED | All inputs have associated labels |
| Error announcements | IMPLEMENTED | aria-live regions on forms |
| axe-core testing | IMPLEMENTED | 16 test cases (8 pages × 2 viewports) |

**WCAG Rating: AA COMPLIANT** (based on automated testing — manual audit recommended before launch)

---

## 9. Ongoing Maintenance Plan

### Weekly Tasks

| Task | Method | Owner |
|------|--------|-------|
| Check PM2 status and logs | `ssh ... "pm2 status && pm2 logs --lines 20 --nostream"` | Admin |
| Check disk usage | `ssh ... "df -h /"` | Admin |
| Review Fail2ban bans | `ssh ... "sudo fail2ban-client status sshd"` | Admin |
| Check SSL certificate expiry | `ssh ... "certbot certificates"` | Admin |

### Monthly Tasks

| Task | Method | Owner |
|------|--------|-------|
| Run `pnpm audit` | Local dev: `cd /c/OrcaChild && pnpm audit` | Dev |
| Update dependencies | `pnpm update --interactive` | Dev |
| Review UFW logs | `ssh ... "sudo grep UFW /var/log/syslog \| tail -50"` | Admin |
| Check Nginx error logs | `ssh ... "tail -50 /var/log/nginx/error.log"` | Admin |
| Rotate PM2 logs | `ssh ... "pm2 flush && pm2 reloadLogs"` | Admin |

### Quarterly Tasks

| Task | Method | Owner |
|------|--------|-------|
| Full security audit | Re-run this assessment | Dev/AI |
| SSL configuration test | Test via ssllabs.com/ssltest | Admin |
| Lighthouse performance audit | Chrome DevTools → Lighthouse | Dev |
| Dependency major version review | Check for breaking changes | Dev |
| Review and test Supabase RLS policies | Supabase dashboard | Dev |
| COPPA compliance review | Review data collection practices | Board |

### Automated (No Action Required)

| Task | Frequency | Mechanism |
|------|-----------|-----------|
| SSL certificate renewal | Every 60 days | Certbot systemd timer |
| Security package updates | Daily | `unattended-upgrades` |
| App auto-restart on crash | Continuous | PM2 process monitor |
| Rate limit cleanup | Every 60 seconds | In-memory timer |

### Deployment Procedure

Every code update follows this workflow:

```bash
# 1. Local: Verify quality gates
pnpm lint          # Zero errors, zero warnings
pnpm type-check    # Zero TypeScript errors
pnpm test          # All 217 tests pass
pnpm build         # Production build succeeds (89 pages)
pnpm audit         # No critical vulnerabilities

# 2. Local: Commit and push
git add <files>
git commit -m "type: description"
git push origin main

# 3. VPS: Deploy (single command)
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30 \
  "cd ~/ocinw-website && git pull && pnpm install --frozen-lockfile && pnpm build && pm2 restart ocinw"

# 4. Verify: Check the live site
curl -s -o /dev/null -w "%{http_code}" https://orcachildinthewild.com
```

### Performance Monitoring Targets

| Metric | Target | How to Measure |
|--------|--------|----------------|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse |
| FCP (First Contentful Paint) | < 1.8s | Lighthouse |
| FID (First Input Delay) | < 100ms | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| Lighthouse Performance | 90+ | Chrome DevTools |
| Lighthouse Accessibility | 100 | Chrome DevTools |
| Time to First Byte (TTFB) | < 800ms | curl timing |
| Memory usage | < 512 MB | `pm2 monit` |
| Disk usage | < 50% | `df -h /` |

---

## 10. Incident Response Procedure

### If the site goes down:

1. **Check if PM2 process is running:**
   ```bash
   ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30 "pm2 status"
   ```

2. **If PM2 shows "stopped" or "errored":**
   ```bash
   ssh ... "pm2 restart ocinw && pm2 logs ocinw --lines 50 --nostream"
   ```

3. **If SSH is unresponsive:** Use Hostinger hPanel web console (VPS → Terminal)

4. **If Nginx is down:**
   ```bash
   # Via web console as root:
   systemctl status nginx
   systemctl restart nginx
   nginx -t  # Test config before restart
   ```

5. **If disk is full:**
   ```bash
   ssh ... "df -h / && du -sh ~/.pm2/logs/ && pm2 flush"
   ```

### If a security incident is suspected:

1. **Check Fail2ban status:** `sudo fail2ban-client status sshd`
2. **Check auth logs:** `sudo tail -100 /var/log/auth.log`
3. **Check Nginx access logs:** `tail -100 /var/log/nginx/access.log`
4. **Check for unauthorized processes:** `ps aux | grep -v root | grep -v orcachild`
5. **If compromised:** Shut down the VPS immediately via Hostinger hPanel and contact Hostinger support

### If SSL certificate expires:

1. **Renew manually:**
   ```bash
   # Via web console as root:
   certbot renew --force-renewal
   systemctl reload nginx
   ```

---

## Appendix A: Fix Commands (Quick Reference)

Run these as **root** in the Hostinger web console to resolve all CRITICAL and HIGH vulnerabilities:

```bash
# V1: Fix Fail2ban port
cat > /etc/fail2ban/jail.local << 'EOF'
[sshd]
enabled = true
port = 2222
maxretry = 5
bantime = 3600
findtime = 600
EOF
systemctl restart fail2ban

# V2: Fix SSH password authentication
echo "PasswordAuthentication no" > /etc/ssh/sshd_config.d/00-security.conf
rm -f /etc/ssh/sshd_config.d/99-security.conf
systemctl restart ssh

# V4: Add HSTS header to Nginx
sed -i '/server_tokens off;/a\    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;' /etc/nginx/sites-available/ocinw
nginx -t && systemctl reload nginx

# V5: Configure PM2 startup on boot
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u orcachild --hp /home/orcachild
su - orcachild -s /bin/bash -c "pm2 save"
```

---

*Report generated February 25, 2026. Next scheduled review: May 2026 (quarterly).*
