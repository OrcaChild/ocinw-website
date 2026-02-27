import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const isDev = process.env.NODE_ENV === "development";

function buildCsp(nonce: string): string {
  const directives = [
    "default-src 'self'",
    // Dev: allow HMR eval; prod: nonce-based with strict-dynamic
    // ('unsafe-inline' is ignored by CSP3 browsers when strict-dynamic is present;
    //  kept as CSP2 fallback for maximum compatibility)
    isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.open-meteo.com https://marine-api.open-meteo.com https://api.tidesandcurrents.noaa.gov https://*.supabase.co https://nominatim.openstreetmap.org",
    "frame-src https://www.zeffy.com",
    "font-src 'self'",
  ];
  return directives.join("; ");
}

export default function middleware(request: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  // Run intl middleware for locale routing
  const intlResponse = intlMiddleware(request) as NextResponse;

  // Redirect responses (locale routing): just stamp the CSP, no nonce needed
  if (intlResponse.headers.get("location")) {
    intlResponse.headers.set("Content-Security-Policy", csp);
    return intlResponse;
  }

  // Normal render: create a new response that forwards the nonce to server
  // components via request headers so layout.tsx can read it with headers()
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Preserve intl's set-cookie (locale preference) and any rewrite headers
  const setCookie = intlResponse.headers.get("set-cookie");
  if (setCookie) response.headers.set("set-cookie", setCookie);
  const rewrite = intlResponse.headers.get("x-middleware-rewrite");
  if (rewrite) response.headers.set("x-middleware-rewrite", rewrite);

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
