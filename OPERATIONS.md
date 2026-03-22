# OCINW Operations Guide

> **Orca Child in the Wild — Master Command Reference**
> For use outside VS Code. Print this, bookmark it, keep it handy.
> Last updated: 2026-03-09

---

## Quick Reference

| What | Command |
|------|---------|
| Start dev server | `pnpm dev --webpack` |
| Production build | `pnpm build` |
| Run all tests | `pnpm test` |
| Lint check | `pnpm lint` |
| Lint fix | `pnpm lint:fix` |
| Type check | `pnpm type-check` |
| Format code | `pnpm format` |
| E2E tests | `pnpm test:e2e` |
| Accessibility tests | `pnpm test:a11y` |
| Security audit | `pnpm audit` |

---

## Local Development

### Prerequisites
- Node.js 20+ | pnpm 10+ | Git
- Working directory: `C:\OrcaChild`

### Start Dev Server
```bash
cd C:\OrcaChild
pnpm dev --webpack
```
> **Note:** Turbopack crashes on this machine. Always use `--webpack`.
> Dev server runs at http://localhost:3000

### Quality Gates (run before every commit)
```bash
pnpm lint          # Zero errors, zero warnings
pnpm type-check    # Zero TypeScript errors
pnpm test          # All 238+ tests pass
pnpm build         # Production build succeeds
pnpm audit         # No critical vulnerabilities
```

### Kill All Node Processes (Windows)
```bash
taskkill //F //IM node.exe
```

---

## Git Workflow

### Commit Convention
```
<type>: <short description>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`

### Push to GitHub
```bash
git add <files>
git commit -m "type: description"
git push origin main
```

### GitHub Account
- **Org:** OrcaChild
- **Repo:** ocinw-website
- **URL:** https://github.com/OrcaChild/ocinw-website
- Credentials stored per-repo in `.git/.git-credentials`
- If token expires: `gh auth switch --user OrcaChild && gh auth token` then update `.git/.git-credentials`

---

## VPS — Server Management

### Connection
```bash
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30
```

| Detail | Value |
|--------|-------|
| Host | 72.62.200.30 |
| SSH Port | 2222 |
| SSH Key | `~/.ssh/orcachild_vps` |
| User | `orcachild` (app) / `root` (via Hostinger web console) |
| App Path | `/home/orcachild/ocinw-website/` |
| Domain | `www.orcachildinthewild.com` |
| SSL Expiry | 2026-05-26 (auto-renews via Certbot) |

### Deploy (one-liner from local machine)
```bash
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30 \
  "cd ~/ocinw-website && git pull && pnpm install --frozen-lockfile && pnpm build && pm2 restart ocinw"
```

### Deploy (from VPS as orcachild)
```bash
cd ~/ocinw-website
git pull
pnpm install --frozen-lockfile
pnpm build
pm2 restart ocinw
```

### Deploy (from VPS as root)
```bash
su - orcachild -c "cd ~/ocinw-website && git pull && pnpm install --frozen-lockfile && pnpm build && pm2 restart ocinw"
```

---

## VPS — PM2 Process Management

> **IMPORTANT:** Each app runs under its own Linux user's PM2 instance.
> OCINW runs under `orcachild`. Other apps: colourparlor, builtbybas, figaro, umamiapp each have their own user.

### OCINW PM2 Commands (as orcachild or via su)
```bash
su - orcachild -c "pm2 list"              # Check status
su - orcachild -c "pm2 restart ocinw"     # Restart app
su - orcachild -c "pm2 stop ocinw"        # Stop app
su - orcachild -c "pm2 logs ocinw"        # View logs
su - orcachild -c "pm2 logs ocinw --lines 50"  # Last 50 lines
su - orcachild -c "pm2 monit"             # Real-time monitoring
su - orcachild -c "pm2 save"              # Save process list for auto-restart
```

### Root PM2 Commands (other sites)
```bash
pm2 list                    # All root-managed apps
pm2 restart colourparlor    # Restart specific app
pm2 restart all             # Restart all root apps
pm2 logs <name>             # View logs
pm2 save                    # Save for auto-restart
```

### Port Map
| App | Port | PM2 User | Memory Cap |
|-----|------|----------|------------|
| ocinw | 3000 | orcachild | — |
| colourparlor | 3001 | colourparlor | 250MB |
| builtbybas | 3002 | builtbybas | — |
| figaro | 3004 | figaro | — |
| umami | 3003 | umamiapp | — |

### Auto-Start on Reboot
Both PM2 instances have systemd startup hooks:
- `pm2-orcachild.service` — starts OCINW
- Root PM2 — starts other sites

If you need to re-enable:
```bash
# For orcachild user (run as root):
pm2 startup systemd -u orcachild --hp /home/orcachild
su - orcachild -c "pm2 save"

# For root:
pm2 startup systemd
pm2 save
```

---

## VPS — Nginx

### Config Location
```
/etc/nginx/sites-enabled/ocinw           # OCINW config
/etc/nginx/sites-enabled/colourparlor    # Colour Parlor config
/etc/nginx/sites-enabled/builtbybas      # BuiltByBas config
/etc/nginx/sites-enabled/analytics       # Umami analytics config
```

### Common Commands
```bash
nginx -t                    # Test config (always run before reload!)
systemctl reload nginx      # Apply config changes
systemctl restart nginx     # Full restart
systemctl status nginx      # Check status
```

### View Logs
```bash
tail -f /var/log/nginx/ocinw.access.log     # Live access log
tail -f /var/log/nginx/ocinw.error.log      # Live error log
tail -100 /var/log/nginx/ocinw.error.log    # Last 100 error lines
```

---

## VPS — SSL Certificates

Managed by Certbot (Let's Encrypt). Auto-renews.

```bash
certbot certificates                   # View all certs + expiry dates
certbot renew --dry-run                # Test renewal
certbot renew                          # Force renewal
```

OCINW cert: `/etc/letsencrypt/live/orcachildinthewild.com/`

---

## VPS — System Maintenance

### Health Check
```bash
uptime                     # Server uptime + load average
free -h                    # Memory usage
df -h /                    # Disk usage
pm2 list                   # Root apps status
su - orcachild -c "pm2 list"  # OCINW status
```

### Security Updates
```bash
sudo apt update                        # Refresh package list
sudo apt list --upgradable             # See available updates
sudo unattended-upgrades               # Apply security patches only
sudo apt upgrade -y                    # Apply ALL updates
```

After Node.js updates:
```bash
pm2 restart all                              # Root apps
su - orcachild -c "pm2 restart ocinw"        # OCINW
```

### Check if Reboot Needed
```bash
[ -f /var/run/reboot-required ] && echo "Reboot needed" || echo "No reboot needed"
```

### Log Rotation
PM2 log rotation is installed for both users:
```bash
# Check settings:
pm2 conf pm2-logrotate
su - orcachild -c "pm2 conf pm2-logrotate"

# Defaults: 10MB max, 7 files retained
```

### Firewall
```bash
ufw status                  # View rules
# Allowed: 80 (HTTP), 443 (HTTPS), 2222 (SSH)
```

---

## Supabase — Database

| Detail | Value |
|--------|-------|
| Project | ocinw-website |
| Region | West US (North California) |
| Dashboard | https://supabase.com/dashboard/project/eepwfuxxiftyedyvfgyv |
| URL | `https://eepwfuxxiftyedyvfgyv.supabase.co` |

### Tables (8 live)
| Table | Purpose |
|-------|---------|
| volunteers | Signup data, parent info, consent |
| contact_submissions | Contact form entries |
| newsletter_subscribers | Email list (soft-delete) |
| events | Conservation events |
| event_registrations | Event signups, waivers |
| donations | Donation records (Zeffy) |
| admin_users | RBAC roles |
| audit_log | Admin action tracking |

### Pending Migrations (run in SQL Editor)
1. `supabase/migrations/002_events_phase10.sql` — Events tables
2. `supabase/migrations/003_parental_consent.sql` — Consent tables

### Backup
- Supabase free tier: daily backups, 7-day retention
- Manual: `pg_dump` export weekly

---

## Environment Variables

### Local (`.env.local` — never committed)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

### VPS (`.env` in `/home/orcachild/ocinw-website/`)
Same variables. Edit with:
```bash
su - orcachild
nano ~/ocinw-website/.env
```

After changing env vars, rebuild and restart:
```bash
pnpm build && pm2 restart ocinw
```

---

## Troubleshooting

### Site is down
1. Check if process is running: `su - orcachild -c "pm2 list"`
2. Check if port is listening: `ss -tlnp | grep 3000`
3. Check Nginx: `systemctl status nginx`
4. Check logs: `su - orcachild -c "pm2 logs ocinw --lines 50"`
5. Restart: `su - orcachild -c "pm2 restart ocinw"`

### Build fails on VPS
1. Check Node version: `node -v` (should be 22.x)
2. Check disk space: `df -h /`
3. Check memory: `free -h`
4. Try clean install: `rm -rf node_modules && pnpm install`
5. Check logs: `pnpm build 2>&1 | tail -50`

### SSL certificate expired
```bash
certbot renew
systemctl reload nginx
```

### Memory issues
```bash
free -h                           # Check overall memory
pm2 list                          # Check per-app memory
su - orcachild -c "pm2 list"     # Check OCINW memory
pm2 restart <app-name>           # Restart leaky app
```

### Can't SSH in
- Verify key: `ssh -i ~/.ssh/orcachild_vps -p 2222 -v orcachild@72.62.200.30`
- Use Hostinger web console as fallback (logs in as root)
- Check fail2ban: `fail2ban-client status sshd` (from web console)

### DNS issues
- DNS managed at Wix
- A record: `orcachildinthewild.com` → `72.62.200.30`
- CNAME: `www` → `orcachildinthewild.com`

---

## Weekly Maintenance Checklist

- [ ] Check PM2 status (both root and orcachild)
- [ ] Check memory usage (`free -h`)
- [ ] Check disk usage (`df -h /`)
- [ ] Review Nginx error logs
- [ ] Apply security updates (`sudo unattended-upgrades`)
- [ ] Check SSL cert expiry (`certbot certificates`)
- [ ] Check colourparlor memory (known leak — should auto-restart at 250MB)

---

## Monthly Maintenance

- [ ] Run `pnpm audit` locally and address any new vulnerabilities
- [ ] Review and update dependencies (`pnpm update`)
- [ ] Check Supabase dashboard for usage/limits
- [ ] Review server access logs for anomalies
- [ ] Full `sudo apt upgrade -y` + `pm2 restart all`
