import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const isDev = process.env.NODE_ENV === "development";

function buildCsp(): string {
  const directives = [
    "default-src 'self'",
    // Next.js SSG pre-renders HTML at build time, so per-request nonces cannot
    // be embedded in static script tags. 'self' blocks all external-domain
    // scripts (the primary XSS vector); 'unsafe-inline' is required for
    // Next.js hydration chunks and JSON-LD structured data injected at build time.
    // Dev adds 'unsafe-eval' for HMR.
    isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.open-meteo.com https://marine-api.open-meteo.com https://api.tidesandcurrents.noaa.gov https://*.supabase.co https://nominatim.openstreetmap.org",
    "frame-src https://www.zeffy.com",
    "font-src 'self'",
  ];
  return directives.join("; ");
}

export default function middleware(request: NextRequest): NextResponse {
  const csp = buildCsp();

  // Run intl middleware for locale routing
  const intlResponse = intlMiddleware(request) as NextResponse;

  // Redirect responses (locale routing): stamp CSP and return
  if (intlResponse.headers.get("location")) {
    intlResponse.headers.set("Content-Security-Policy", csp);
    return intlResponse;
  }

  const response = NextResponse.next({ request });

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
