# OCINW Security Scope — Operations & Maintenance

> **Purpose:** Ongoing security operations, maintenance schedules, incident response, and deploy procedures.
> **Companion to:** `SecurityPosture.md` (current-state snapshot)
> **Last updated:** February 25, 2026

---

## 1. Deploy Checklist

```
 1. pnpm lint        (0 errors)
 2. pnpm type-check  (0 TS errors)
 3. pnpm test        (all tests pass)
 4. pnpm build       (all pages generated)
 5. pnpm audit       (0 critical)
 6. git commit + push
 7. ssh ... "git pull && pnpm build && pm2 restart ocinw"
 8. curl site (expect 200)
```

### One-Liner Deploy

```bash
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30 \
  "cd ~/ocinw-website && git pull && pnpm install --frozen-lockfile && pnpm build && pm2 restart ocinw"
```

---

## 2. Maintenance Schedule

### Weekly

| Task                  | How                           |
|-----------------------|-------------------------------|
| PM2 status + logs     | `pm2 status && pm2 logs`      |
| Disk usage            | `df -h /`                     |
| Fail2ban review       | `fail2ban-client status sshd` |
| SSL cert check        | `certbot certificates`        |

### Monthly

| Task                  | How                           |
|-----------------------|-------------------------------|
| Audit dependencies    | `pnpm audit`                  |
| Update dependencies   | `pnpm update --interactive`   |
| Review UFW logs       | `grep UFW /var/log/syslog`    |
| Check Nginx errors    | `tail /var/log/nginx/error.log`|
| Flush PM2 logs        | `pm2 flush`                   |

### Quarterly

| Task                  | How                           |
|-----------------------|-------------------------------|
| Full security audit   | Re-run SecurityPosture.md     |
| SSL Labs test         | ssllabs.com/ssltest           |
| Lighthouse audit      | Chrome DevTools               |
| COPPA review          | Board review                  |
| Supabase RLS review   | Supabase dashboard            |

---

## 3. Incident Response

### Site Down

```
 1. ssh ... "pm2 status"
 2. If stopped: pm2 restart ocinw
 3. If SSH dead: Hostinger web console
 4. If Nginx dead: nginx -t && systemctl restart nginx
 5. If disk full: pm2 flush
```

### Security Incident

```
 1. fail2ban-client status sshd
 2. tail /var/log/auth.log
 3. tail /var/log/nginx/access.log
 4. ps aux (look for unknown processes)
 5. If compromised: shut down via Hostinger hPanel
```

### SSL Expired

```
 certbot renew --force-renewal
 systemctl reload nginx
```

---

## 4. Performance Targets

| Metric       | Target  |
|-------------|---------|
| LCP         | < 2.5s  |
| FCP         | < 1.8s  |
| FID         | < 100ms |
| CLS         | < 0.1   |
| Lighthouse  | 90+     |
| Accessibility| 100    |
| TTFB        | < 800ms |
| App memory  | < 512MB |

---

## 5. Testing Coverage

| Tool       | Tests | Purpose            |
|------------|-------|--------------------|
| Vitest     | 218   | Unit tests         |
| Playwright | 16    | E2E tests          |
| axe-core   | 16    | Accessibility      |

### Coverage Minimums

| Category           | Minimum |
|--------------------|---------|
| Utility functions  | 90%     |
| API clients        | 80%     |
| Hooks              | 80%     |
| Zod schemas        | 100%    |
| Overall            | 70%     |

---

*Created 2026-02-25. Review quarterly alongside SecurityPosture.md.*
