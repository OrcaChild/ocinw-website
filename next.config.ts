import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Velite integration — runs content build alongside Next.js build
// Uses webpack plugin approach for seamless dev/build experience
class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: { hooks: { beforeCompile: { tapPromise: (name: string, fn: () => Promise<void>) => void } } }) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.constructor.name === "Compiler";
      // Use Function constructor to prevent Next.js CJS compilation
      // from converting dynamic import() to require() — Velite is ESM-only
      const { build } = await (Function('return import("velite")')() as Promise<typeof import("velite")>);
      await build({ watch: dev, clean: !dev });
    });
  }
}

const isDev = process.env.NODE_ENV === "development";

// Development CSP allows unsafe-eval for Next.js HMR
// Production CSP is strict — no unsafe-eval
const cspDirectives = [
  "default-src 'self'",
  isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "connect-src 'self' https://api.open-meteo.com https://marine-api.open-meteo.com https://api.tidesandcurrents.noaa.gov https://*.supabase.co https://nominatim.openstreetmap.org",
  "frame-src https://www.zeffy.com",
  "font-src 'self'",
];

const contentSecurityPolicy = cspDirectives.join("; ");

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
