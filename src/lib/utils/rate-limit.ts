// =============================================================================
// In-memory rate limiter for server actions
// Uses a Map of IP → timestamps to enforce per-IP rate limits.
// Entries are cleaned up automatically to prevent memory leaks.
// =============================================================================

type RateLimitEntry = {
  timestamps: number[];
};

const store = new Map<string, RateLimitEntry>();

// Clean up entries older than the max window to prevent memory leaks
const CLEANUP_INTERVAL_MS = 60_000; // 1 minute
let lastCleanup = Date.now();

function cleanupStaleEntries(windowMs: number): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((ts) => now - ts < windowMs);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

/**
 * Check if a request from the given IP is within the rate limit.
 * Returns `{ allowed: true }` if under the limit, or
 * `{ allowed: false, retryAfterMs }` if the limit is exceeded.
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number,
  windowMs: number,
): { allowed: true } | { allowed: false; retryAfterMs: number } {
  const now = Date.now();

  cleanupStaleEntries(windowMs);

  const entry = store.get(ip);
  if (!entry) {
    store.set(ip, { timestamps: [now] });
    return { allowed: true };
  }

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter((ts) => now - ts < windowMs);

  if (entry.timestamps.length >= maxRequests) {
    const oldestInWindow = entry.timestamps[0] ?? now;
    const retryAfterMs = windowMs - (now - oldestInWindow);
    return { allowed: false, retryAfterMs };
  }

  entry.timestamps.push(now);
  return { allowed: true };
}
