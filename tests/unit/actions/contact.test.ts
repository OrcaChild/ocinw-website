// =============================================================================
// Contact Server Action Tests — 90% coverage target
// Source: src/app/actions/contact.ts
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

// Mock Supabase insert — returns success by default
const mockInsert = vi.fn().mockResolvedValue({ error: null });
const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });

describe("submitContactForm", () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let submitContactForm: typeof import("@/app/actions/contact").submitContactForm;

  beforeEach(async () => {
    vi.resetModules();
    mockInsert.mockResolvedValue({ error: null });

    // Re-apply mocks after resetModules
    vi.doMock("next/headers", () => ({
      headers: vi.fn(),
    }));
    vi.doMock("@/lib/utils/rate-limit", () => ({
      checkRateLimit: vi.fn(),
    }));
    vi.doMock("@/lib/api/supabase-server", () => ({
      createClient: vi.fn().mockResolvedValue({ from: mockFrom }),
    }));

    const mod = await import("@/app/actions/contact");
    submitContactForm = mod.submitContactForm;

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

  it("returns success for valid form data", async () => {
    const fd = createFormData({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Hello there",
      message: "This is a test message for contact.",
    });

    const result = await submitContactForm(fd);
    expect(result).toEqual({ status: "success" });
  });

  it("returns error for CSRF mismatch (wrong origin)", async () => {
    const headersModule = await import("next/headers");
    vi.mocked(headersModule.headers).mockResolvedValue(
      createMockHeaders({
        origin: "https://evil-site.com",
        "x-forwarded-for": "10.0.0.1",
      }),
    );

    const fd = createFormData({
      name: "Jane",
      email: "jane@example.com",
      subject: "Hello",
      message: "Test message text",
    });

    const result = await submitContactForm(fd);
    expect(result).toEqual({
      status: "error",
      message: "Invalid request origin.",
    });
  });

  it("rejects request when origin header is absent", async () => {
    const headersModule = await import("next/headers");
    vi.mocked(headersModule.headers).mockResolvedValue(
      createMockHeaders({ "x-forwarded-for": "192.168.1.1" }),
    );

    const fd = createFormData({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Hello there",
      message: "Valid message for contact.",
    });

    const result = await submitContactForm(fd);
    expect(result).toEqual({ status: "error", message: "Invalid request origin." });
  });

  it("returns rate_limited when checkRateLimit returns allowed: false", async () => {
    const rateLimitModule = await import("@/lib/utils/rate-limit");
    vi.mocked(rateLimitModule.checkRateLimit).mockReturnValue({
      allowed: false,
      retryAfterMs: 3000,
    });

    const fd = createFormData({
      name: "Jane",
      email: "jane@example.com",
      subject: "Hello",
      message: "Test message text",
    });

    const result = await submitContactForm(fd);
    expect(result.status).toBe("rate_limited");
  });

  it("returns error with Zod issue for invalid data", async () => {
    const fd = createFormData({
      name: "J", // too short
      email: "jane@example.com",
      subject: "Hello there",
      message: "Valid message text here",
    });

    const result = await submitContactForm(fd);
    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.message).toContain("2 characters");
    }
  });

  it("returns error for invalid email", async () => {
    const fd = createFormData({
      name: "Jane Doe",
      email: "not-an-email",
      subject: "Hello there",
      message: "Valid message text here",
    });

    const result = await submitContactForm(fd);
    expect(result.status).toBe("error");
  });

  it("prefers x-real-ip over x-forwarded-for for rate limiting", async () => {
    const headersModule = await import("next/headers");
    vi.mocked(headersModule.headers).mockResolvedValue(
      createMockHeaders({
        origin: "http://localhost:3000",
        "x-real-ip": "203.0.113.1",
        "x-forwarded-for": "10.20.30.40, 192.168.1.1",
      }),
    );

    const rateLimitModule = await import("@/lib/utils/rate-limit");

    const fd = createFormData({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Hello there",
      message: "Valid message text here",
    });

    await submitContactForm(fd);

    expect(rateLimitModule.checkRateLimit).toHaveBeenCalledWith(
      "203.0.113.1",
      expect.any(Number),
      expect.any(Number),
    );
  });

  it("falls back to last x-forwarded-for IP when x-real-ip is absent", async () => {
    const headersModule = await import("next/headers");
    vi.mocked(headersModule.headers).mockResolvedValue(
      createMockHeaders({
        origin: "http://localhost:3000",
        "x-forwarded-for": "10.20.30.40, 192.168.1.1",
      }),
    );

    const rateLimitModule = await import("@/lib/utils/rate-limit");

    const fd = createFormData({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Hello there",
      message: "Valid message text here",
    });

    await submitContactForm(fd);

    expect(rateLimitModule.checkRateLimit).toHaveBeenCalledWith(
      "192.168.1.1",
      expect.any(Number),
      expect.any(Number),
    );
  });
});
