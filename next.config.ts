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
      type VeliteExports = { build: (opts?: { watch?: boolean; clean?: boolean }) => Promise<void> };
      const { build } = await (Function('return import("velite")')() as Promise<VeliteExports>);
      await build({ watch: dev, clean: !dev });
    });
  }
}

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
  async headers() {
    // NOTE: Content-Security-Policy is set per-request in proxy.ts (middleware)
    // so that a unique nonce can be embedded in the CSP for each response.
    // Static headers here cover everything except CSP.
    return [
      {
        source: "/(.*)",
        headers: [
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
