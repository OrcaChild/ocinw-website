// =============================================================================
// Geolocation API Tests — 80% coverage target
// Source: src/lib/api/geolocation.ts
// =============================================================================

import {
  requestBrowserLocation,
  reverseGeocode,
  lookupZipCode,
  isValidSoCalZip,
  saveLocation,
  loadSavedLocation,
  clearSavedLocation,
} from "@/lib/api/geolocation";
import { mockLocationState, mockNominatimResponse } from "../fixtures";

// ---------------------------------------------------------------------------
// requestBrowserLocation
// ---------------------------------------------------------------------------

describe("requestBrowserLocation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("resolves with coordinates on success", async () => {
    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: (success: PositionCallback) => {
          success({
            coords: { latitude: 34.02, longitude: -118.49 },
          } as GeolocationPosition);
        },
      },
    });

    const result = await requestBrowserLocation();
    expect(result).toEqual({ latitude: 34.02, longitude: -118.49 });
  });

  it("rejects when geolocation is not supported", async () => {
    vi.stubGlobal("navigator", {});

    await expect(requestBrowserLocation()).rejects.toThrow(
      "not supported",
    );
  });

  it("rejects with denied message on PERMISSION_DENIED", async () => {
    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: (_: unknown, error: PositionErrorCallback) => {
          error({
            code: 1,
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
            message: "denied",
          } as GeolocationPositionError);
        },
      },
    });

    await expect(requestBrowserLocation()).rejects.toThrow("denied");
  });

  it("rejects with unavailable message on POSITION_UNAVAILABLE", async () => {
    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: (_: unknown, error: PositionErrorCallback) => {
          error({
            code: 2,
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
            message: "unavailable",
          } as GeolocationPositionError);
        },
      },
    });

    await expect(requestBrowserLocation()).rejects.toThrow("unavailable");
  });

  it("rejects with timeout message on TIMEOUT", async () => {
    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: (_: unknown, error: PositionErrorCallback) => {
          error({
            code: 3,
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
            message: "timeout",
          } as GeolocationPositionError);
        },
      },
    });

    await expect(requestBrowserLocation()).rejects.toThrow("timed out");
  });
});

// ---------------------------------------------------------------------------
// reverseGeocode
// ---------------------------------------------------------------------------

describe("reverseGeocode", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("returns city name from Nominatim response", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockNominatimResponse),
    });

    const result = await reverseGeocode(34.02, -118.49);
    expect(result).toBe("Santa Monica");
  });

  it("falls back to town when city is not available", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          address: { town: "Malibu", county: "Los Angeles County" },
        }),
    });

    const result = await reverseGeocode(34.03, -118.68);
    expect(result).toBe("Malibu");
  });

  it("returns county as last resort", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          address: { county: "San Diego County" },
        }),
    });

    const result = await reverseGeocode(32.72, -117.17);
    expect(result).toBe("San Diego County");
  });

  it("returns null on fetch failure", async () => {
    fetchMock.mockRejectedValueOnce(new Error("Network error"));

    const result = await reverseGeocode(34.02, -118.49);
    expect(result).toBeNull();
  });

  it("returns null on non-ok response", async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500 });

    const result = await reverseGeocode(34.02, -118.49);
    expect(result).toBeNull();
  });

  it("returns null when address is missing", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const result = await reverseGeocode(34.02, -118.49);
    expect(result).toBeNull();
  });

  it("returns null on invalid JSON (Zod safeParse fails)", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ address: "not-an-object" }),
    });

    const result = await reverseGeocode(34.02, -118.49);
    expect(result).toBeNull();
  });

  it("includes User-Agent header", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockNominatimResponse),
    });

    await reverseGeocode(34.02, -118.49);

    const callArgs = fetchMock.mock.calls[0];
    expect(callArgs?.[1]?.headers?.["User-Agent"]).toBe(
      "OrcaChildInTheWild/1.0",
    );
  });
});

// ---------------------------------------------------------------------------
// lookupZipCode
// ---------------------------------------------------------------------------

describe("lookupZipCode", () => {
  it("returns coordinates for valid SoCal ZIP", () => {
    const result = lookupZipCode("90401");
    expect(result).not.toBeNull();
    expect(result?.latitude).toBeDefined();
    expect(result?.longitude).toBeDefined();
    expect(result?.name).toBeDefined();
  });

  it("returns null for unknown ZIP", () => {
    expect(lookupZipCode("10001")).toBeNull(); // New York
  });

  it("returns null for non-5-digit string", () => {
    expect(lookupZipCode("9040")).toBeNull();
    expect(lookupZipCode("904010")).toBeNull();
    expect(lookupZipCode("abcde")).toBeNull();
  });

  it("trims whitespace before lookup", () => {
    const result = lookupZipCode("  90401  ");
    expect(result).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// isValidSoCalZip
// ---------------------------------------------------------------------------

describe("isValidSoCalZip", () => {
  it("returns true for SoCal ZIP codes (90xxx-92xxx)", () => {
    expect(isValidSoCalZip("90210")).toBe(true);
    expect(isValidSoCalZip("91001")).toBe(true);
    expect(isValidSoCalZip("92101")).toBe(true);
  });

  it("returns false for non-SoCal ZIP codes", () => {
    expect(isValidSoCalZip("10001")).toBe(false); // NYC
    expect(isValidSoCalZip("94102")).toBe(false); // SF
    expect(isValidSoCalZip("85001")).toBe(false); // Phoenix
  });

  it("returns false for non-5-digit strings", () => {
    expect(isValidSoCalZip("9021")).toBe(false);
    expect(isValidSoCalZip("")).toBe(false);
  });

  it("returns false for non-numeric strings", () => {
    expect(isValidSoCalZip("abcde")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// localStorage persistence
// ---------------------------------------------------------------------------

describe("saveLocation / loadSavedLocation / clearSavedLocation", () => {
  let storage: Record<string, string>;

  beforeEach(() => {
    storage = {};
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => {
        storage[key] = value;
      },
      removeItem: (key: string) => {
        delete storage[key];
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("saves and loads location from localStorage", () => {
    saveLocation(mockLocationState);
    const loaded = loadSavedLocation();
    expect(loaded).toEqual(mockLocationState);
  });

  it("returns null when nothing saved", () => {
    expect(loadSavedLocation()).toBeNull();
  });

  it("clears saved location", () => {
    saveLocation(mockLocationState);
    clearSavedLocation();
    expect(loadSavedLocation()).toBeNull();
  });

  it("handles localStorage errors gracefully on save", () => {
    vi.stubGlobal("localStorage", {
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
      getItem: () => null,
      removeItem: () => {},
    });

    // Should not throw
    expect(() => saveLocation(mockLocationState)).not.toThrow();
  });

  it("handles localStorage errors gracefully on load", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("SecurityError");
      },
      setItem: () => {},
      removeItem: () => {},
    });

    expect(loadSavedLocation()).toBeNull();
  });
});
