// =============================================================================
// Rate Limiter Tests — 90% coverage target
// Source: src/lib/utils/rate-limit.ts
// =============================================================================

// We use dynamic imports to get a fresh module instance per describe block,
// because the rate limiter uses module-level state (Map + lastCleanup).

describe("checkRateLimit", () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let checkRateLimit: typeof import("@/lib/utils/rate-limit").checkRateLimit;
  let dateNowSpy: ReturnType<typeof vi.spyOn>;
  let currentTime: number;

  beforeEach(async () => {
    vi.resetModules();
    currentTime = 1_000_000_000;
    dateNowSpy = vi.spyOn(Date, "now").mockReturnValue(currentTime);
    const mod = await import("@/lib/utils/rate-limit");
    checkRateLimit = mod.checkRateLimit;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("allows the first request from a new IP", () => {
    const result = checkRateLimit("192.168.1.1", 3, 3600_000);
    expect(result).toEqual({ allowed: true });
  });

  it("allows requests up to the limit", () => {
    checkRateLimit("192.168.1.2", 3, 3600_000);
    checkRateLimit("192.168.1.2", 3, 3600_000);
    const third = checkRateLimit("192.168.1.2", 3, 3600_000);
    expect(third).toEqual({ allowed: true });
  });

  it("blocks request after reaching the limit", () => {
    checkRateLimit("192.168.1.3", 3, 3600_000);
    checkRateLimit("192.168.1.3", 3, 3600_000);
    checkRateLimit("192.168.1.3", 3, 3600_000);
    const fourth = checkRateLimit("192.168.1.3", 3, 3600_000);
    expect(fourth.allowed).toBe(false);
  });

  it("returns retryAfterMs when rate limited", () => {
    const windowMs = 3600_000; // 1 hour
    checkRateLimit("192.168.1.4", 2, windowMs);
    checkRateLimit("192.168.1.4", 2, windowMs);
    const blocked = checkRateLimit("192.168.1.4", 2, windowMs);
    expect(blocked.allowed).toBe(false);
    if (!blocked.allowed) {
      expect(blocked.retryAfterMs).toBeGreaterThan(0);
      expect(blocked.retryAfterMs).toBeLessThanOrEqual(windowMs);
    }
  });

  it("allows requests again after window expires", () => {
    const windowMs = 3600_000;
    checkRateLimit("192.168.1.5", 2, windowMs);
    checkRateLimit("192.168.1.5", 2, windowMs);

    // Advance time past the window
    currentTime += windowMs + 1;
    dateNowSpy.mockReturnValue(currentTime);

    const result = checkRateLimit("192.168.1.5", 2, windowMs);
    expect(result).toEqual({ allowed: true });
  });

  it("tracks different IPs independently", () => {
    checkRateLimit("10.0.0.1", 1, 3600_000);
    const blocked = checkRateLimit("10.0.0.1", 1, 3600_000);
    expect(blocked.allowed).toBe(false);

    // Different IP should still be allowed
    const other = checkRateLimit("10.0.0.2", 1, 3600_000);
    expect(other.allowed).toBe(true);
  });

  it("cleans up stale entries after cleanup interval (60s)", () => {
    const windowMs = 10_000;
    checkRateLimit("cleanup-ip", 1, windowMs);

    // Advance time past window AND cleanup interval (60s)
    currentTime += 61_000;
    dateNowSpy.mockReturnValue(currentTime);

    // This call triggers cleanup — the old timestamp for cleanup-ip should be removed
    const result = checkRateLimit("cleanup-ip", 1, windowMs);
    expect(result).toEqual({ allowed: true });
  });

  it("handles rapid sequential requests correctly", () => {
    const windowMs = 60_000;
    const results: boolean[] = [];
    for (let i = 0; i < 5; i++) {
      const r = checkRateLimit("rapid-ip", 3, windowMs);
      results.push(r.allowed);
    }
    // First 3 allowed, last 2 blocked
    expect(results).toEqual([true, true, true, false, false]);
  });
});
