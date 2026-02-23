// Import jest-dom matchers only when running in a DOM environment (jsdom/happy-dom).
// Node environment tests (schemas, utils, API clients, server actions) don't need DOM matchers.
if (typeof document !== "undefined") {
  await import("@testing-library/jest-dom/vitest");
}

export {};
