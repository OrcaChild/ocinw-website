# OCINW Security Posture Report

> **Date:** February 25, 2026
> **Domain:** orcachildinthewild.com
> **Server:** 72.62.200.30 (Hostinger KVM)
> **Rating:** **A**

---

## 1. Executive Summary

OCINW is a youth-run nonprofit site for ocean conservation education, deployed on Ubuntu 24.04 LTS with Nginx + Node.js + PM2.

**9 vulnerabilities identified. All 9 resolved.**

### All Issues Resolved

| ID | Severity | Fix Applied                         |
|----|----------|--------------------------------------|
| V1 | CRITICAL | Fail2ban port corrected              |
| V2 | MEDIUM   | SSH auth config ordering             |
| V3 | CRITICAL | IP spoofing in rate limits           |
| V4 | HIGH     | HSTS header added                    |
| V5 | HIGH     | PM2 boot persistence                 |
| V6 | CRITICAL | Supabase database wired              |
| V7 | MEDIUM   | CSRF Origin required                 |
| V8 | MEDIUM   | Field max lengths added              |
| V9 | MEDIUM   | Geolocation switched to sessionStorage|

---

## 2. Technology Stack

### App

| What         | Tech                 | Ver     |
|--------------|----------------------|---------|
| Framework    | Next.js (App Router) | 16.1.6  |
| Language     | TypeScript (strict)  | 5.9.3   |
| UI           | React                | 19.2.3  |
| CSS          | Tailwind CSS         | 4.2.0   |
| Components   | shadcn/ui + Radix    | 1.4.3   |
| Validation   | Zod                  | 4.3.6   |
| Content      | Velite (MDX)         | 0.3.1   |
| i18n         | next-intl (EN/ES)    | 4.8.3   |
| Forms        | react-hook-form      | 7.71.2  |

### Visualization

| What    | Tech                 | Ver     |
|---------|----------------------|---------|
| Charts  | Recharts             | 3.7.0   |
| Maps    | Leaflet              | 1.9.4   |
| Icons   | lucide-react         | 0.575.0 |
| Themes  | next-themes          | 0.4.6   |
| Toasts  | Sonner               | 2.0.7   |

### Server

| What       | Tech                   | Ver            |
|------------|------------------------|----------------|
| OS         | Ubuntu                 | 24.04 LTS      |
| Web Server | Nginx                  | 1.24.0         |
| Runtime    | Node.js                | 22.22.0        |
| Packages   | pnpm                   | 10.30.2        |
| Process    | PM2                    | 6.0.14         |
| SSL        | Certbot (Let's Encrypt)| 2.9.0          |
| Firewall   | UFW                    | --             |
| IPS        | Fail2ban               | --             |

### External APIs

| Service      | Purpose       | Key? |
|--------------|---------------|------|
| Open-Meteo   | Weather       | No   |
| NOAA CO-OPS  | Tides         | No   |
| Nominatim    | Geocoding     | No   |
| Supabase     | DB (active)   | Yes  |
| Resend       | Email (planned)| Yes |
| Zeffy        | Donations     | No   |

---

## 3. Infrastructure

### Network Diagram

```
 INTERNET
    |
 Wix DNS (A -> 72.62.200.30)
    |
 Hostinger Firewall
 [Accept: 80, 443, 2222]
 [Drop: all other]
    |
 Ubuntu 24.04 + UFW
 [Allow: 80, 443, 2222]
 [Deny: all other]
    |
    +--- Nginx :443 (HTTPS)
    |    TLS 1.2/1.3, HSTS
    |    CSP, security headers
    |    |
    |    +--- Next.js :3000
    |         PM2 managed
    |         89 static pages
    |         3 server actions
    |
    +--- Nginx :80 (HTTP)
    |    301 redirect to HTTPS
    |
    +--- SSH :2222
         Key-only auth
         Fail2ban protected
```

### Open Ports

| Port | Service | External | Protection        |
|------|---------|----------|-------------------|
| 80   | HTTP    | Yes      | 301 redirect only |
| 443  | HTTPS   | Yes      | TLS + HSTS + CSP  |
| 2222 | SSH     | Yes      | Key + Fail2ban    |
| 3000 | Next.js | No       | UFW blocks it     |

### Server Resources

| Resource | Used     | Total  | Status  |
|----------|----------|--------|---------|
| RAM      | 809 MB   | 3.8 GB | 79% free|
| Disk     | 4.8 GB   | 48 GB  | 90% free|
| CPU      | 1 vCPU   | --     | OK      |
| App mem  | ~103 MB  | --     | Normal  |

---

## 4. VPS Security

### SSH Hardening

| Control           | Value                  |
|-------------------|------------------------|
| Root login        | Disabled               |
| Port              | 2222                   |
| Allowed users     | `orcachild` only       |
| Max auth tries    | 3                      |
| Key auth          | Required (Ed25519)     |
| Password auth     | Disabled               |
| X11 forwarding    | Disabled               |
| Ubuntu user       | Shell: /usr/sbin/nologin|

### Firewall (Layer 1 — Hostinger)

| Rule    | Ports    | Action |
|---------|----------|--------|
| Web     | 80, 443  | Accept |
| SSH     | 2222     | Accept |
| Default | All      | Drop   |

### Firewall (Layer 2 — UFW)

| Direction | Policy |
|-----------|--------|
| Incoming  | Deny   |
| Outgoing  | Allow  |
| Routed    | Deny   |

### Fail2ban

| Setting    | Value        |
|------------|--------------|
| Port       | 2222         |
| Max retry  | 5            |
| Ban time   | 1 hour       |
| Find time  | 10 minutes   |

### SSL/TLS

| Setting       | Value                          |
|---------------|--------------------------------|
| Certificate   | Let's Encrypt (Certbot)        |
| Expires       | 2026-05-26                     |
| Auto-renewal  | Yes (systemd timer)            |
| Protocols     | TLS 1.2 + 1.3                 |
| HSTS          | 1 year, includeSubDomains      |
| DH params     | Custom                         |
| Session cache | Shared, 10 MB                  |

**Cipher suites:** ECDHE-AES-GCM, ECDHE-CHACHA20, DHE-AES-GCM (all strong, modern).

### Nginx

| Control              | Status |
|----------------------|--------|
| Version hidden       | Yes    |
| Hidden files blocked | Yes    |
| HTTP to HTTPS        | Yes    |
| HSTS header          | Yes    |
| Static caching       | Yes    |
| WebSocket proxy      | Yes    |
| X-Real-IP header     | Yes    |

### Auto-Maintenance

| What                  | How                 |
|-----------------------|---------------------|
| Security patches      | unattended-upgrades |
| SSL renewal           | Certbot timer (60d) |
| App crash recovery    | PM2 auto-restart    |
| App boot recovery     | pm2-orcachild.service|
| Rate limit cleanup    | In-memory timer (60s)|

---

## 5. Application Security

### Security Headers

| Header                    | Value                    |
|---------------------------|--------------------------|
| Content-Security-Policy   | See CSP below            |
| X-Frame-Options           | DENY                     |
| X-Content-Type-Options    | nosniff                  |
| Referrer-Policy           | strict-origin-when-cross |
| Permissions-Policy        | camera=() mic=() geo=(self)|
| Strict-Transport-Security | 1yr, includeSubDomains   |

### CSP Directives

| Directive   | Value                   |
|-------------|-------------------------|
| default-src | `'self'`                |
| script-src  | `'self' 'unsafe-inline'`|
| style-src   | `'self' 'unsafe-inline'`|
| img-src     | `'self' data: https:`   |
| connect-src | `'self'` + 5 API hosts  |
| frame-src   | `https://www.zeffy.com` |
| font-src    | `'self'`                |

> `unsafe-eval` is NOT allowed. MDX renders server-side.

### Input Validation — Contact Form

| Field   | Min | Max  | Format |
|---------|-----|------|--------|
| name    | 2   | 100  | --     |
| email   | --  | --   | Email  |
| subject | 5   | 200  | --     |
| message | 10  | 2000 | --     |

### Input Validation — Volunteer Form

| Field         | Min | Max  | Format          |
|---------------|-----|------|-----------------|
| firstName     | 2   | 100  | --              |
| lastName      | 2   | 100  | --              |
| email         | --  | --   | Email           |
| phone         | --  | --   | 10 digits / "" |
| ageRange      | --  | --   | Enum (6 opts)   |
| zipCode       | --  | --   | 5 digits        |
| interests     | 1   | --   | Enum (13 opts)  |
| availability  | 1   | --   | Enum (6 opts)   |
| howHeard      | --  | --   | Enum (7 opts)   |
| skills        | --  | 500  | Optional        |
| message       | --  | 1000 | Optional        |

Parent fields required if age < 18.

### Input Validation — Newsletter

| Field     | Min | Max | Format   |
|-----------|-----|-----|----------|
| email     | --  | --  | Email    |
| firstName | --  | 100 | Optional |

### CSRF Protection

```
 Request arrives
    |
    +-- Origin header present?
    |   NO -> REJECT
    |
    +-- Origin matches SITE_URL?
    |   NO -> REJECT
    |
    +-- Next.js CSRF token valid?
        NO -> REJECT
        YES -> proceed
```

### Rate Limiting

| Form       | Limit | Window | Keyed by  |
|------------|-------|--------|-----------|
| Contact    | 3/hr  | 1 hour | X-Real-IP |
| Newsletter | 5/hr  | 1 hour | X-Real-IP |
| Volunteer  | 10/min| 1 min  | X-Real-IP |

IP source: `X-Real-IP` (set by Nginx, not spoofable).

### Error Handling

| Situation          | User Sees                |
|--------------------|--------------------------|
| Page crash         | "Something Went Wrong"   |
| Validation fail    | First field error only   |
| API timeout        | "Data unavailable"       |
| 404                | Custom page + nav links  |

No stack traces or DB errors ever reach the client.

---

## 6. Vulnerability Details

### V1 — Fail2ban Wrong Port — RESOLVED

Fail2ban monitored port 443 instead of 2222. SSH had zero brute force protection. Fixed by updating `jail.local` to `port = 2222`.

### V2 — SSH Auth Config Order — RESOLVED

`50-cloud-init.conf` loaded before `99-security.conf` (first-match-wins). Renamed to `00-security.conf` so `PasswordAuthentication no` loads first.

### V3 — IP Spoofing in Rate Limits — RESOLVED

Server actions used first IP from `X-Forwarded-For` (spoofable). Changed to `X-Real-IP` set by Nginx from `$remote_addr`. Commit `2fb97c3`.

### V4 — Missing HSTS — RESOLVED

No `Strict-Transport-Security` header allowed SSL stripping on first visit. Added to Nginx config with 1-year max-age.

### V5 — PM2 Not Boot-Persistent — RESOLVED

VPS reboot killed the site with no auto-recovery. Created `pm2-orcachild.service` via `pm2 startup systemd`.

### V6 — No Database (Data Loss) — RESOLVED

Forms were validating but silently discarding data. Created Supabase project (`ocinw-website`, West US), deployed 8-table schema with RLS, and wired all 3 server actions (newsletter, contact, volunteer) to INSERT into Supabase. Handles duplicate constraint (`23505`). Commit `cb7f65b`.

### V7 — CSRF Too Lenient — RESOLVED

Origin header was optional. Changed to required — requests without `Origin` are now rejected. Commit `2fb97c3`.

### V8 — No Field Max Lengths — RESOLVED

Text fields had no upper bounds. Added `.max()` to all fields, regex to phone fields, enum validation to howHeard. Commit `2fb97c3`.

### V9 — Geolocation in localStorage — RESOLVED

GPS coords and city name were persisting in `localStorage` across sessions. Switched all 3 storage functions (`save`, `load`, `clear`) to `sessionStorage` so data is cleared when the browser tab closes. Commit `cb7f65b`.

---

## 7. Risk Register

### Resolved Risks

| Risk                | Was       | Mitigation Applied      |
|---------------------|-----------|-------------------------|
| SSH brute force     | CRITICAL  | Fail2ban on 2222        |
| Rate limit bypass   | CRITICAL  | X-Real-IP extraction    |
| SSL stripping       | HIGH      | HSTS header             |
| Reboot outage       | HIGH      | PM2 systemd service     |
| Password brute force| MEDIUM    | Config file ordering    |
| Large payloads      | MEDIUM    | Field max lengths       |
| Missing Origin CSRF | MEDIUM    | Origin now required     |
| User data loss      | CRITICAL  | Supabase database wired |
| Location PII        | MEDIUM    | sessionStorage swap     |

### Open Risks

| Risk               | Likelihood | Impact   | Fix Needed        |
|--------------------|------------|----------|--------------------|
| COPPA violation    | MEDIUM     | CRITICAL | Consent workflow   |

### Auto-Mitigated

| Risk               | Mechanism               |
|--------------------|--------------------------|
| SSL cert expiry    | Certbot auto-renewal     |
| OS vulnerabilities | unattended-upgrades      |
| Dep vulnerabilities| pnpm audit before deploy |

---

## 8. Compliance

### COPPA

| Requirement           | Status          |
|-----------------------|-----------------|
| Age-gating            | Done            |
| Parental consent      | **Not done**    |
| Minimal collection    | Done            |
| No PII in logs        | Done            |
| Data deletion         | Designed        |

**Rating: NON-COMPLIANT** until parental consent workflow exists.

### CCPA

| Requirement        | Status       |
|--------------------|--------------|
| Privacy policy     | Done (draft) |
| Data deletion      | Designed     |
| Do Not Sell        | N/A          |
| Data access export | Not done     |

### WCAG 2.1 AA

| Requirement        | Status |
|--------------------|--------|
| Skip-to-content    | Done   |
| Color contrast     | Done   |
| Keyboard nav       | Done   |
| ARIA labels        | Done   |
| Form labels        | Done   |
| Error announcements| Done   |
| axe-core testing   | Done   |

**Rating: AA COMPLIANT** (automated — manual audit recommended).

---

> Operations, maintenance schedules, incident response, and deploy procedures are in `SecurityScope.md`.

*Generated 2026-02-25. All vulnerabilities resolved same day.*
*9 of 9 vulnerabilities resolved. Next review: May 2026.*
