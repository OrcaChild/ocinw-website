// =============================================================================
// Volunteer Server Action Tests — consent-code claim atomicity (sweep C8)
// Source: src/app/actions/volunteer.ts
// The single-use guarantee must live in ONE conditional UPDATE (used_at IS
// NULL) executed BEFORE the volunteer insert, so two concurrent submissions
// can never both claim the same code.
// =============================================================================

export {};

function createMockHeaders(entries: Record<string, string>) {
  return {
    get: (key: string) => entries[key] ?? null,
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  } as unknown as Awaited<ReturnType<typeof import("next/headers").headers>>;
}

function minorFormData(): FormData {
  const fd = new FormData();
  fd.set("firstName", "Testy");
  fd.set("lastName", "Minor");
  fd.set("email", "minor@example.com");
  fd.set("ageRange", "13-17");
  fd.set("zipCode", "92592");
  fd.append("interests", "events");
  fd.append("availability", "weekends");
  fd.set("parentGuardianName", "Parent Person");
  fd.set("parentGuardianEmail", "parent@example.com");
  fd.set("parentGuardianPhone", "9515551234");
  fd.set("agreeToCodeOfConduct", "true");
  fd.set("agreeToPrivacy", "true");
  fd.set("consentCode", "ABC123XYZ");
  return fd;
}

// Chainable Supabase mock: every builder method returns the chain, the chain
// is thenable, and a shared sequence log records table.method call order.
const seq: string[] = [];
const CHAIN_METHODS = ["select", "update", "insert", "eq", "is", "gt", "single"] as const;

function makeChain(table: string, getResult: () => unknown) {
  const chain = {} as Record<(typeof CHAIN_METHODS)[number], ReturnType<typeof vi.fn>> & {
    then: (resolve: (v: unknown) => void) => void;
  };
  for (const m of CHAIN_METHODS) {
    chain[m] = vi.fn(() => {
      seq.push(`${table}.${m}`);
      return chain;
    });
  }
  chain.then = (resolve: (v: unknown) => void) => resolve(getResult());
  return chain;
}

let consentResult: unknown;
let volunteerResult: unknown;
const consentChain = makeChain("consent_codes", () => consentResult);
const volunteerChain = makeChain("volunteers", () => volunteerResult);
const mockFrom = vi.fn((table: string) =>
  table === "consent_codes" ? consentChain : volunteerChain,
);

describe("submitVolunteerForm consent-code claim (C8)", () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let submitVolunteerForm: typeof import("@/app/actions/volunteer").submitVolunteerForm;

  beforeEach(async () => {
    vi.resetModules();
    seq.length = 0;
    for (const chain of [consentChain, volunteerChain]) {
      for (const m of CHAIN_METHODS) chain[m].mockClear();
    }
    consentResult = { data: [{ id: "code-1" }], error: null };
    volunteerResult = { data: { id: "vol-1" }, error: null };

    vi.doMock("next/headers", () => ({
      headers: vi.fn(),
    }));
    vi.doMock("@/lib/utils/rate-limit", () => ({
      checkRateLimit: vi.fn(),
    }));
    vi.doMock("@/lib/api/supabase-server", () => ({
      createClient: vi.fn().mockResolvedValue({ from: mockFrom }),
    }));

    const mod = await import("@/app/actions/volunteer");
    submitVolunteerForm = mod.submitVolunteerForm;

    const headersModule = await import("next/headers");
    const rateLimitModule = await import("@/lib/utils/rate-limit");

    vi.mocked(headersModule.headers).mockResolvedValue(
      createMockHeaders({
        origin: "http://localhost:3000",
        "x-real-ip": "192.168.1.9",
      }),
    );
    vi.mocked(rateLimitModule.checkRateLimit).mockReturnValue({ allowed: true });
  });

  it("claims the code with a used_at IS NULL condition before inserting the volunteer", async () => {
    const result = await submitVolunteerForm(minorFormData());

    // The claim must be conditional on the code being unused...
    expect(consentChain.is.mock.calls).toContainEqual(["used_at", null]);
    // ...and must happen before the volunteer row exists.
    const claimIndex = seq.indexOf("consent_codes.update");
    const insertIndex = seq.indexOf("volunteers.insert");
    expect(claimIndex).toBeGreaterThanOrEqual(0);
    expect(insertIndex).toBeGreaterThan(claimIndex);
    expect(result.status).toBe("success");
  });

  it("rejects without inserting a volunteer when the claim matches no row", async () => {
    consentResult = { data: [], error: null };

    const result = await submitVolunteerForm(minorFormData());

    expect(result.status).toBe("invalid_code");
    expect(volunteerChain.insert).not.toHaveBeenCalled();
  });

  it("releases the claim when the volunteer insert fails", async () => {
    volunteerResult = { data: null, error: { code: "23505" } };

    const result = await submitVolunteerForm(minorFormData());

    expect(result.status).toBe("duplicate");
    // The release resets used_at only while no volunteer is linked.
    expect(consentChain.update.mock.calls).toContainEqual([{ used_at: null }]);
    expect(consentChain.is.mock.calls).toContainEqual(["used_by_volunteer_id", null]);
  });
});
