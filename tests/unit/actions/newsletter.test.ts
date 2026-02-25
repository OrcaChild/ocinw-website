// =============================================================================
// Newsletter Server Action Tests — 90% coverage target
// Source: src/app/actions/newsletter.ts
// =============================================================================

export {};

function createMockHeaders(entries: Record<string, string>) {
  return {
    get: (key: string) => entries[key] ?? null,
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  } as unknown as Awaited<ReturnType<typeof import("next/headers").headers>>;
}

function createFormData(data: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(data)) {
    fd.set(key, value);
  }
  return fd;
}

describe("subscribeNewsletter", () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let subscribeNewsletter: typeof import("@/app/actions/newsletter").subscribeNewsletter;

  beforeEach(async () => {
    vi.resetModules();

    vi.doMock("next/headers", () => ({
      headers: vi.fn(),
    }));
    vi.doMock("@/lib/utils/rate-limit", () => ({
      checkRateLimit: vi.fn(),
    }));

    const mod = await import("@/app/actions/newsletter");
    subscribeNewsletter = mod.subscribeNewsletter;

    const headersModule = await import("next/headers");
    const rateLimitModule = await import("@/lib/utils/rate-limit");

    vi.mocked(headersModule.headers).mockResolvedValue(
      createMockHeaders({
        origin: "http://localhost:3000",
        "x-forwarded-for": "192.168.1.1",
      }),
    );
    vi.mocked(rateLimitModule.checkRateLimit).mockReturnValue({ allowed: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns success for valid email", async () => {
    const fd = createFormData({ email: "test@example.com" });
    const result = await subscribeNewsletter(fd);
    expect(result).toEqual({ status: "success" });
  });

  it("returns error for CSRF mismatch", async () => {
    const headersModule = await import("next/headers");
    vi.mocked(headersModule.headers).mockResolvedValue(
      createMockHeaders({
        origin: "https://evil-site.com",
        "x-forwarded-for": "10.0.0.1",
      }),
    );

    const fd = createFormData({ email: "test@example.com" });
    const result = await subscribeNewsletter(fd);
    expect(result).toEqual({
      status: "error",
      message: "Invalid request origin.",
    });
  });

  it("returns rate_limited when limit exceeded", async () => {
    const rateLimitModule = await import("@/lib/utils/rate-limit");
    vi.mocked(rateLimitModule.checkRateLimit).mockReturnValue({
      allowed: false,
      retryAfterMs: 5000,
    });

    const fd = createFormData({ email: "test@example.com" });
    const result = await subscribeNewsletter(fd);
    expect(result.status).toBe("rate_limited");
  });

  it("returns error for invalid email", async () => {
    const fd = createFormData({ email: "not-an-email" });
    const result = await subscribeNewsletter(fd);
    expect(result).toEqual({
      status: "error",
      message: "Please enter a valid email address.",
    });
  });

  it("returns duplicate for already-subscribed email", async () => {
    const fd1 = createFormData({ email: "subscriber@example.com" });
    const result1 = await subscribeNewsletter(fd1);
    expect(result1.status).toBe("success");

    const fd2 = createFormData({ email: "subscriber@example.com" });
    const result2 = await subscribeNewsletter(fd2);
    expect(result2).toEqual({ status: "duplicate" });
  });

  it("normalizes email to lowercase for duplicate check", async () => {
    const fd1 = createFormData({ email: "Test@Example.COM" });
    await subscribeNewsletter(fd1);

    const fd2 = createFormData({ email: "test@example.com" });
    const result = await subscribeNewsletter(fd2);
    expect(result).toEqual({ status: "duplicate" });
  });

  it("handles optional firstName field", async () => {
    const fd = createFormData({
      email: "withname@example.com",
      firstName: "Alex",
    });
    const result = await subscribeNewsletter(fd);
    expect(result).toEqual({ status: "success" });
  });

  it("rejects request when origin header is absent", async () => {
    const headersModule = await import("next/headers");
    vi.mocked(headersModule.headers).mockResolvedValue(
      createMockHeaders({ "x-forwarded-for": "192.168.1.1" }),
    );

    const fd = createFormData({ email: "noorigin@example.com" });
    const result = await subscribeNewsletter(fd);
    expect(result).toEqual({ status: "error", message: "Invalid request origin." });
  });
});
