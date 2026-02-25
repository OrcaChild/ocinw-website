/**
 * CSRF origin validation for server actions.
 *
 * Compares the browser's Origin header against NEXT_PUBLIC_SITE_URL,
 * stripping "www." from both sides so www and non-www both pass.
 * This is a safety net — Nginx should redirect www → non-www,
 * but this prevents breakage if someone reaches www directly.
 */

function stripWww(hostname: string): string {
  return hostname.replace(/^www\./, "");
}

export function isValidOrigin(origin: string | null): boolean {
  if (!origin) return false;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const incomingHost = stripWww(new URL(origin).hostname);
    const expectedHost = stripWww(new URL(siteUrl).hostname);
    const incomingProto = new URL(origin).protocol;
    const expectedProto = new URL(siteUrl).protocol;

    return incomingHost === expectedHost && incomingProto === expectedProto;
  } catch {
    return false;
  }
}
