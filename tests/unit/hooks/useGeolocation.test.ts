// @vitest-environment happy-dom
// =============================================================================
// useGeolocation Hook Tests — 80% coverage target
// Source: src/lib/hooks/useGeolocation.ts
// =============================================================================

import { renderHook, waitFor, act } from "@testing-library/react";

vi.mock("@/lib/api/geolocation", () => ({
  requestBrowserLocation: vi.fn(),
  reverseGeocode: vi.fn(),
  lookupZipCode: vi.fn(),
  saveLocation: vi.fn(),
  loadSavedLocation: vi.fn(),
  clearSavedLocation: vi.fn(),
}));

import {
  requestBrowserLocation,
  reverseGeocode,
  lookupZipCode,
  saveLocation,
  loadSavedLocation,
  clearSavedLocation,
} from "@/lib/api/geolocation";
import { useGeolocation } from "@/lib/hooks/useGeolocation";

const mockRequestBrowserLocation = vi.mocked(requestBrowserLocation);
const mockReverseGeocode = vi.mocked(reverseGeocode);
const mockLookupZipCode = vi.mocked(lookupZipCode);
const mockLoadSavedLocation = vi.mocked(loadSavedLocation);
const mockClearSavedLocation = vi.mocked(clearSavedLocation);

describe("useGeolocation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoadSavedLocation.mockReturnValue(null);
  });

  it("starts with default state (all null, loading false)", () => {
    const { result } = renderHook(() => useGeolocation());

    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.locationName).toBeNull();
    expect(result.current.source).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hasLocation).toBe(false);
  });

  it("loads saved location from localStorage on mount", async () => {
    mockLoadSavedLocation.mockReturnValue({
      latitude: 34.02,
      longitude: -118.49,
      locationName: "Santa Monica",
      source: "gps",
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useGeolocation());

    await waitFor(() => {
      expect(result.current.latitude).toBe(34.02);
      expect(result.current.locationName).toBe("Santa Monica");
      expect(result.current.hasLocation).toBe(true);
    });
  });

  it("requestLocation sets GPS coordinates on success", async () => {
    mockRequestBrowserLocation.mockResolvedValueOnce({
      latitude: 33.77,
      longitude: -118.19,
    });
    mockReverseGeocode.mockResolvedValueOnce("Long Beach");

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      await result.current.requestLocation();
    });

    expect(result.current.latitude).toBe(33.77);
    expect(result.current.longitude).toBe(-118.19);
    expect(result.current.locationName).toBe("Long Beach");
    expect(result.current.source).toBe("gps");
    expect(result.current.hasLocation).toBe(true);
  });

  it("requestLocation sets error state on failure", async () => {
    mockRequestBrowserLocation.mockRejectedValueOnce(
      new Error("Location access denied."),
    );

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      await result.current.requestLocation();
    });

    expect(result.current.error).toBe("Location access denied.");
    expect(result.current.loading).toBe(false);
  });

  it("setZipCode sets coordinates and name from lookup", async () => {
    mockLookupZipCode.mockReturnValueOnce({
      latitude: 34.02,
      longitude: -118.49,
      name: "Santa Monica",
    });

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.setZipCode("90401");
    });

    expect(result.current.latitude).toBe(34.02);
    expect(result.current.locationName).toBe("Santa Monica");
    expect(result.current.source).toBe("zip");
    expect(result.current.hasLocation).toBe(true);
  });

  it("setZipCode sets error for unknown ZIP", async () => {
    mockLookupZipCode.mockReturnValueOnce(null);

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.setZipCode("10001");
    });

    expect(result.current.error).toContain("ZIP code not found");
  });

  it("setManualLocation sets coordinates, name, and source", () => {
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.setManualLocation(33.72, -118.27, "Long Beach", "manual");
    });

    expect(result.current.latitude).toBe(33.72);
    expect(result.current.longitude).toBe(-118.27);
    expect(result.current.locationName).toBe("Long Beach");
    expect(result.current.source).toBe("manual");
    expect(result.current.hasLocation).toBe(true);
  });

  it("clearLocation resets state and clears localStorage", () => {
    const { result } = renderHook(() => useGeolocation());

    // First set a location
    act(() => {
      result.current.setManualLocation(34.02, -118.49, "Santa Monica", "manual");
    });
    expect(result.current.hasLocation).toBe(true);

    // Then clear it
    act(() => {
      result.current.clearLocation();
    });

    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.hasLocation).toBe(false);
    expect(mockClearSavedLocation).toHaveBeenCalled();
  });

  it("hasLocation is true when both lat/lon are non-null", () => {
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.setManualLocation(34.02, -118.49, "Test", "manual");
    });

    expect(result.current.hasLocation).toBe(true);
  });

  it("hasLocation is false when lat or lon is null", () => {
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.hasLocation).toBe(false);
  });

  it("persists location to localStorage when settled", async () => {
    mockLookupZipCode.mockReturnValueOnce({
      latitude: 34.02,
      longitude: -118.49,
      name: "Santa Monica",
    });

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.setZipCode("90401");
    });

    await waitFor(() => {
      expect(saveLocation).toHaveBeenCalled();
    });
  });
});
