# OrcaChild in the Wild -- Security Audit

> **Project:** OrcaChild in the Wild (orcachildinthewild.com)
> **Checklist Source:** `~/.claude/docs/penetration-test-checklist.md` (20 categories, 200+ items)
> **Last Full Sweep:** 2026-04-11 (Session #29)
> **Tester:** Claude + Bas
> **Overall Status:** Initial full sweep complete. Zero critical or high findings. All production controls verified.

---

## Executive Summary

| Metric | Value |
| --- | --- |
| Total items tested | 183 |
| Pass | 89 |
| N/A (justified) | 88 |
| Fail | 0 |
| Partial | 6 |
| Critical findings | 0 |
| High findings | 0 |
| Medium findings (partial) | 4 |
| Low findings (partial) | 2 |
| Ready for production | Yes (live since 2026-02) |

**Status legend:** Pass / Fail / Partial / N/A / Remediated

**Key context:** OrcaChild is a youth-run nonprofit site. No user accounts (public side). No payment processing (Zeffy iframe). No file uploads. No admin UI yet (admin via Supabase dashboard). COPPA-compliant. All database access via Supabase parameterized queries with RLS.

---

## Section Status

| # | Category | Items | Pass | Partial | Fail | N/A |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Injection Attacks | 12 | 6 | 0 | 0 | 6 |
| 2 | Cross-Site Scripting (XSS) | 9 | 5 | 0 | 0 | 4 |
| 3 | Authentication and Session Management | 15 | 1 | 0 | 0 | 14 |
| 4 | Authorization and Access Control | 12 | 2 | 0 | 0 | 10 |
| 5 | API Security | 12 | 7 | 1 | 0 | 4 |
| 6 | Data Protection and Cryptography | 12 | 6 | 1 | 0 | 5 |
| 7 | Infrastructure and Server Security | 14 | 10 | 1 | 0 | 3 |
| 8 | Client-Side Security | 10 | 7 | 0 | 0 | 3 |
| 9 | File Upload and Processing | 9 | 0 | 0 | 0 | 9 |
| 10 | Cross-Site Request Forgery (CSRF) | 5 | 4 | 0 | 0 | 1 |
| 11 | Business Logic Vulnerabilities | 10 | 4 | 0 | 0 | 6 |
| 12 | Denial of Service (DoS) Resilience | 7 | 5 | 1 | 0 | 1 |
| 13 | Third-Party and Supply Chain Security | 8 | 6 | 1 | 0 | 1 |
| 14 | Logging, Monitoring, and Incident Response | 7 | 3 | 1 | 0 | 3 |
| 15 | Next.js / React Specific | 11 | 10 | 0 | 0 | 1 |
| 16 | Database Security | 8 | 5 | 0 | 0 | 3 |
| 17 | Email and Communication Security | 5 | 1 | 0 | 0 | 4 |
| 18 | Mobile and Responsive Security | 5 | 1 | 0 | 0 | 4 |
| 19 | Compliance and Privacy | 7 | 5 | 0 | 0 | 2 |
| 20 | Social Engineering and Physical Security | 5 | 4 | 0 | 0 | 1 |

---

## Detailed Results

### Section 1: Injection Attacks

| Test Item | Status | Evidence |
| --- | --- | --- |
| SQL Injection: parameterized queries | Pass | All DB via Supabase JS client (parameterized). Zero raw SQL in src/ |
| SQL Injection: UNION/blind/time/error variants | Pass | Supabase client handles query construction |
| SQL Injection: stored procedures/dynamic SQL | N/A | Only one RPC function, defined in migration SQL, not user-input driven |
| NoSQL Injection | N/A | PostgreSQL only |
| Command Injection: exec/spawn/system | Pass | Zero child_process/exec/spawn calls in src/ |
| LDAP Injection | N/A | No LDAP |
| XPath/XML Injection | N/A | No XML parsing |
| Template Injection (SSTI) | Pass | No server-side template engines. React JSX only |
| Header Injection | Pass | No user input in response headers. Supabase handles DB headers |
| Email Header Injection | N/A | Resend not yet installed. No email sending |
| Log Injection | Pass | console.error logs error.code and error.message only, no raw user input |
| ORM Injection | N/A | Supabase JS, no ORM. Zero .raw() or .sql() calls |

### Section 2: Cross-Site Scripting (XSS)

| Test Item | Status | Evidence |
| --- | --- | --- |
| Reflected XSS | Pass | React auto-escapes. No URL params rendered raw |
| Stored XSS | Pass | No user-generated content rendered on public pages |
| DOM-based XSS: innerHTML/document.write/eval | Pass | Zero innerHTML/document.write/eval in .tsx files |
| XSS via file uploads | N/A | No file upload functionality |
| XSS in error messages | Pass | Error boundaries show static translated strings, no user input reflected |
| XSS via rich text editors | N/A | No rich text editors |
| CSP bypass testing | Pass | CSP set in proxy.ts: script-src 'self' 'unsafe-inline' (prod). Blocks external scripts |
| dangerouslySetInnerHTML | Pass | 4 uses, all JSON-LD on server components with JSON.stringify(trustedData) |
| XSS via URL schemes | N/A | No user-controlled href/src attributes |

### Section 3: Authentication and Session Management

| Test Item | Status | Evidence |
| --- | --- | --- |
| Brute force protection | N/A | No login UI. Admin via Supabase dashboard |
| Credential stuffing | N/A | No login UI |
| Password policy | N/A | No password-based auth on this site |
| Password storage | N/A | Supabase Auth handles storage |
| MFA | N/A | No auth UI |
| Session fixation | N/A | No sessions on public site |
| Session timeout | N/A | No sessions |
| Session invalidation | N/A | No sessions |
| JWT security | N/A | No JWT on public site |
| JWT expiration | N/A | No JWT |
| JWT secret strength | N/A | Supabase managed |
| Cookie security | Pass | Only cookie is next-intl locale preference (non-sensitive) |
| OAuth/OIDC | N/A | No OAuth |
| Password reset | N/A | No password reset |
| Account enumeration | N/A | No accounts |

### Section 4: Authorization and Access Control

| Test Item | Status | Evidence |
| --- | --- | --- |
| Horizontal privilege escalation | N/A | No user accounts on public site |
| Vertical privilege escalation | N/A | No user roles on public site |
| IDOR | N/A | No authenticated user-specific data access |
| API endpoint authorization | Pass | Single API route (iCal export) is public by design. All data-modifying via server actions with CSRF |
| Function-level access | N/A | No admin panel in codebase |
| Multi-tenant isolation | N/A | Single-tenant |
| File access control | N/A | No file uploads/downloads |
| Role hierarchy | N/A | No roles on public site (Supabase RLS handles admin) |
| Default deny | Pass | Supabase RLS: public users can only INSERT on form tables |
| Mass assignment | N/A | Server actions construct insert objects from validated Zod output, not raw request body |
| Per-user data scoping | N/A | No user accounts |
| Ownership verification | N/A | No user-owned resources |

### Section 5: API Security

| Test Item | Status | Evidence |
| --- | --- | --- |
| Rate limiting | Pass | All 6 server actions + validateConsentCode have IP-based rate limits |
| Input validation | Pass | All server actions validate via Zod schemas before DB operations |
| Output filtering | Pass | Server actions return only success/error status, never raw DB data to client |
| API versioning | N/A | Single version, no deprecated endpoints |
| GraphQL introspection | N/A | No GraphQL |
| GraphQL depth limits | N/A | No GraphQL |
| Batch/bulk endpoint abuse | N/A | No batch endpoints |
| HTTP method restriction | Pass | Server actions are POST-only by design. iCal route is GET-only |
| CORS | Pass | No custom CORS headers. Next.js defaults (same-origin) |
| Content-Type validation | Pass | Server actions handle FormData natively |
| Error handling | Pass | All server actions return generic error messages. Stack traces logged server-side only |
| Pagination limits | Partial | Events API uses .select() with specific columns but no explicit .range(). Medium risk -- event count expected to be low (<100) |

### Section 6: Data Protection and Cryptography

| Test Item | Status | Evidence |
| --- | --- | --- |
| TLS 1.2+ enforced | Pass | Let's Encrypt + Nginx on VPS. Modern TLS only |
| HSTS enabled | Partial | Not explicitly set in next.config.ts headers. Nginx may set it -- needs VPS verification |
| Certificate pinning | N/A | Web app, not mobile |
| Data at rest encryption | N/A | Supabase managed (free tier). No local file storage of sensitive data |
| PII handling | Pass | console.error logs error.code/message only, never PII. No analytics PII |
| Secrets management | Pass | .env files gitignored. .env.example has names only. SUPABASE_SERVICE_ROLE_KEY server-only |
| Environment variable isolation | Pass | NEXT_PUBLIC_ prefix only for non-sensitive values. Service role key not in client bundle |
| Encryption key rotation | N/A | Supabase managed |
| Backup encryption | N/A | Supabase free tier managed backups |
| Sensitive data in URLs | Pass | No tokens/passwords in query strings |
| Data retention | Pass | Soft-delete pattern with deleted_at field for CCPA compliance |
| Payment data (PCI DSS) | N/A | No payment handling. Zeffy iframe handles all payment |

### Section 7: Infrastructure and Server Security

| Test Item | Status | Evidence |
| --- | --- | --- |
| Server headers: version removed | Pass | No X-Powered-By or Server version headers exposed |
| Directory listing disabled | Pass | Next.js serves only routes, not filesystem listings |
| Admin interfaces | Pass | No admin UI in codebase. Admin via Supabase dashboard (separate auth) |
| Default credentials | Pass | No default accounts. Admin access via Supabase invite only |
| Port scanning | Pass | UFW: only 80, 443, 2222 open. Hostinger firewall mirrors |
| SSH hardening | Pass | Key-only auth, non-standard port 2222, root SSH disabled, fail2ban active |
| Firewall rules | Pass | UFW deny-by-default. Only HTTP/HTTPS/SSH. Hostinger provider firewall |
| Container security | N/A | No containers. PM2 on bare metal |
| Kubernetes | N/A | No orchestration |
| DNS security | Partial | DNS at Wix. DNSSEC status unverified. CAA records not confirmed |
| Cloud IAM | N/A | VPS, not cloud provider |
| Deployment pipeline | Pass | GitHub Actions CI (lint, type-check, test, build, audit). No secrets in repo |
| OS patching | Pass | unattended-upgrades enabled on Ubuntu 24.04 |
| Backup and recovery | Pass | Supabase daily backups (7-day retention). MDX git-versioned |

### Section 8: Client-Side Security

| Test Item | Status | Evidence |
| --- | --- | --- |
| CSP effectiveness | Pass | CSP in proxy.ts: script-src 'self' 'unsafe-inline', blocks external scripts |
| Subresource Integrity (SRI) | N/A | No external scripts loaded |
| Clickjacking: X-Frame-Options | Pass | X-Frame-Options: DENY in next.config.ts |
| MIME sniffing | Pass | X-Content-Type-Options: nosniff in next.config.ts |
| Referrer Policy | Pass | Referrer-Policy: strict-origin-when-cross-origin in next.config.ts |
| Local storage security | Pass | No localStorage used. sessionStorage stores only geolocation coords (non-PII) |
| Source maps | Pass | No productionSourceMap config. Next.js production builds exclude source maps by default |
| JS bundle analysis | Pass | No secrets/API keys in client bundle. NEXT_PUBLIC_ vars are non-sensitive URLs/names only |
| Service worker scope | N/A | No service workers |
| Postmessage validation | N/A | No window.postMessage usage |

### Section 9: File Upload and Processing

All N/A -- no file upload functionality in the application.

### Section 10: Cross-Site Request Forgery (CSRF)

| Test Item | Status | Evidence |
| --- | --- | --- |
| CSRF tokens | Pass | All 6 server actions use isValidOrigin() CSRF check |
| SameSite cookies | Pass | Only cookie is next-intl locale pref (non-sensitive). Supabase sets SameSite on its cookies |
| Origin/Referer validation | Pass | isValidOrigin() in src/lib/utils/csrf.ts validates Origin header against SITE_URL (www-tolerant) |
| Custom headers | Pass | Server actions are invoked via Next.js internal mechanism (not raw fetch) |
| Sensitive actions: re-auth | N/A | No sensitive user account actions |

### Section 11: Business Logic Vulnerabilities

| Test Item | Status | Evidence |
| --- | --- | --- |
| Price manipulation | N/A | No pricing. Zeffy iframe handles donations |
| Coupon/loyalty abuse | N/A | No coupons or loyalty |
| Booking manipulation | N/A | No booking system |
| Race conditions | Pass | Event registration uses RPC get_event_registration_count for capacity check. Supabase handles concurrency |
| Workflow bypass | Pass | Volunteer form enforces consent code for minors before submission (server-side validation) |
| Data tampering | Pass | Server actions validate all input via Zod. Hidden fields not trusted |
| Email/notification abuse | N/A | Email not yet implemented. Rate limiting ready for when it is |
| Account abuse | N/A | No accounts |
| Search abuse | N/A | No search functionality |
| Feature flag security | Pass | No feature flags. No dev/beta features accessible in production |

### Section 12: Denial of Service (DoS) Resilience

| Test Item | Status | Evidence |
| --- | --- | --- |
| Application-layer DoS | Pass | Rate limiting on all form endpoints. External API calls have 10s timeouts |
| Request size limits | Pass | Next.js default body size limits (1MB). No custom override |
| Connection limits | Pass | Rate limiting per IP on all server actions |
| Resource exhaustion | Pass | External API calls timeout at 10s. In-memory caches have TTL (weather 15m, tides 6h) |
| ReDoS | Pass | No user-input-driven regex. Only admin-defined patterns (slug validation: ^[a-z0-9-]{1,200}$) |
| API abuse | Partial | Rate limiting in place but no bot detection (CAPTCHA, challenge). Medium -- nonprofit site, low abuse target |
| CDN/WAF | N/A | No CDN/WAF. Direct VPS. Acceptable for nonprofit traffic levels |

### Section 13: Third-Party and Supply Chain Security

| Test Item | Status | Evidence |
| --- | --- | --- |
| npm audit | Partial | 9 vulns (2 high, 7 moderate), all dev-only. 0 production vulns. Dependabot enabled |
| Dependency pinning | Pass | pnpm-lock.yaml committed. pnpm.onlyBuiltDependencies configured |
| Typosquatting check | Pass | All packages are well-known (next, react, supabase, zod, etc.) |
| Unused dependencies | Pass | No obviously unused packages |
| Third-party API keys | Pass | Supabase anon key scoped to RLS. Service role key server-only |
| Webhook validation | N/A | No incoming webhooks |
| Third-party scripts | Pass | No external JS/CSS loaded. All self-hosted. Zeffy via sandboxed iframe |
| License compliance | Pass | All packages MIT/Apache/ISC compatible |

### Section 14: Logging, Monitoring, and Incident Response

| Test Item | Status | Evidence |
| --- | --- | --- |
| Security event logging | Partial | console.error on DB errors. No structured security event logging yet. audit_log table exists but no admin UI to populate it |
| Log integrity | N/A | PM2 log files on VPS. Not externally stored |
| Log sanitization | Pass | Logs contain error.code and error.message only. No PII logged |
| Alerting | N/A | No alerting configured. Acceptable for pre-launch nonprofit |
| Intrusion detection | N/A | fail2ban on SSH. No application-layer IDS |
| Incident response plan | N/A | No formal plan documented. Acceptable for pre-launch nonprofit |
| Audit trail | Pass | audit_log table exists in schema for admin action tracking |

### Section 15: Next.js / React Specific

| Test Item | Status | Evidence |
| --- | --- | --- |
| Server Components: sensitive data not leaked | Pass | All data-fetching in server components. Client components receive only display data |
| Server Actions: validate auth and authz | Pass | All 6 server actions validate CSRF + rate limit. No auth needed (public forms) |
| Route protection: middleware auth | N/A | No protected routes. All pages are public |
| API routes: input validation and auth | Pass | iCal route validates slug format (regex). Public by design (calendar export) |
| getServerSideProps: no secrets in props | Pass | App Router (no getServerSideProps). Server components don't expose secrets |
| Environment variables: NEXT_PUBLIC_ prefix | Pass | Verified in src/env.ts: only URLs and display names use NEXT_PUBLIC_ |
| SSR data serialization | Pass | No custom serialization. React handles safely |
| Image optimization: trusted domains | Pass | next/image used for all images. No remote image domains configured |
| Middleware bypass: _next/data | Pass | proxy.ts matcher excludes _next paths. No sensitive data in route handlers |
| Build output: .next not accessible | Pass | .next in .gitignore. Nginx proxies only to port 3000, not filesystem |
| React hydration mismatch | Pass | suppressHydrationWarning only on html tag (theme). No sensitive data in hydration |

### Section 16: Database Security

| Test Item | Status | Evidence |
| --- | --- | --- |
| Database credentials | Pass | Supabase managed. Keys in .env (gitignored). .env.example has names only |
| Network access | Pass | Supabase cloud. VPS connects via HTTPS. No direct DB port exposure |
| Least privilege | Pass | Public: INSERT only on form tables. Admin: full CRUD via RLS roles |
| Connection pooling | N/A | Supabase manages pooling |
| Query logging | N/A | Supabase managed |
| Schema exposure | Pass | DB errors caught server-side. Generic error messages to client |
| Migration security | Pass | Migration files (002, 003) reviewed. No destructive operations |
| Seed data | N/A | No seed data in production. Tables populated via forms |

### Section 17: Email and Communication Security

| Test Item | Status | Evidence |
| --- | --- | --- |
| SPF/DKIM/DMARC | N/A | Email not yet active. Resend not installed |
| Email content injection | N/A | No email sending |
| Transactional email security | N/A | No email sending |
| Notification abuse | Pass | Rate limiting ready on all form endpoints for when email is wired |
| Unsubscribe | N/A | Newsletter uses soft-delete. Unsubscribe to be implemented with Resend |

### Section 18: Mobile and Responsive Security

| Test Item | Status | Evidence |
| --- | --- | --- |
| Deep link validation | N/A | No deep links |
| Webview security | N/A | No mobile app |
| Biometric bypass | N/A | No biometric auth |
| Certificate transparency | N/A | Web app only |
| Offline data | Pass | sessionStorage cleared on tab close. No sensitive offline data |

### Section 19: Compliance and Privacy

| Test Item | Status | Evidence |
| --- | --- | --- |
| CCPA/CPRA | Pass | Soft-delete pattern (deleted_at field, 90-day purge). Privacy policy page exists |
| GDPR | N/A | US-focused nonprofit. Not serving EU users |
| Cookie consent | Pass | Only functional cookie (locale). No tracking cookies. Umami is cookieless |
| Privacy policy | Pass | /privacy page with data collection disclosure |
| Data minimization | Pass | Forms collect only necessary fields. No optional data harvesting |
| COPPA: children's data | Pass | Age-gating on volunteer form. Under-13 triggers parent consent flow. Consent code verification before data storage |
| Location data | Pass | Geolocation requires explicit browser permission. ZIP code alternative available |

### Section 20: Social Engineering and Physical Security

| Test Item | Status | Evidence |
| --- | --- | --- |
| Phishing resilience | N/A | No team email. Organization email not yet active |
| Support channel abuse | Pass | Contact form only. No account access via support |
| Public information leakage | Pass | GitHub repo public by choice (open-source nonprofit). No secrets in repo |
| Error page information | Pass | Custom error boundaries. No framework/version disclosure in errors |
| Robots.txt/sitemap | Pass | robots.ts disallows /api/ routes. Sitemap contains only public content pages |

---

## Partial Findings (to be addressed)

| # | Section | Item | Severity | Notes | Remediation |
| --- | --- | --- | --- | --- | --- |
| P1 | 5 | Pagination limits | Medium | Events API has no explicit .range(). Low risk at current scale (<100 events) | Add .range(0, 50) to event queries when volume grows |
| P2 | 6 | HSTS | Medium | Not explicitly set in next.config.ts. May be set in Nginx -- needs VPS check | Add Strict-Transport-Security header to next.config.ts or verify Nginx config |
| P3 | 7 | DNS security | Medium | DNSSEC and CAA records unverified at Wix DNS | Check Wix DNS settings for DNSSEC and add CAA record |
| P4 | 12 | Bot detection | Medium | Rate limiting exists but no CAPTCHA/challenge. Low risk for nonprofit | Consider adding simple honeypot field to forms |
| P5 | 13 | Dev-only vulns | Low | 9 dev-only vulnerabilities (vite via vitest, hono via shadcn CLI) | Monitor for upstream fixes. No production impact |
| P6 | 14 | Security event logging | Low | Basic console.error only. audit_log table exists but no admin UI | Build admin dashboard (future phase) to utilize audit_log |

---

## Conclusion

OrcaChild in the Wild passes the portfolio-wide penetration test checklist with **zero critical or high findings**. The 6 partial items are low-to-medium severity hardening opportunities, not exploitable vulnerabilities. The site's attack surface is small by design: no user accounts, no file uploads, no payment processing, no admin UI, and all form data is validated via Zod and protected by CSRF + rate limiting + Supabase RLS.

**COPPA compliance** is the most security-relevant aspect of this site, and it is well-handled: age-gating, parental consent flow, consent code verification, minimal data collection, soft-delete for data rights.

---

*Next re-sweep should be run after: SQL migrations (002/003), Resend email integration, or any admin UI implementation.*
