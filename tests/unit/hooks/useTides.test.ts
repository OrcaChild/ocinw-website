// @vitest-environment happy-dom
// =============================================================================
// useTides Hook Tests — 80% coverage target
// Source: src/lib/hooks/useTides.ts
// =============================================================================

import { renderHook, waitFor, act } from "@testing-library/react";
import { mockTideData } from "../../fixtures";

vi.mock("@/lib/api/tides", () => ({
  getTideData: vi.fn(),
  getTideDataForStation: vi.fn(),
}));

vi.mock("@/lib/data/socal-beaches", () => ({
  TIDE_STATIONS: [
    { id: "9410840", name: "Santa Monica", latitude: 34.0083, longitude: -118.5 },
    { id: "9410660", name: "Los Angeles", latitude: 33.72, longitude: -118.272 },
    { id: "9410170", name: "San Diego", latitude: 32.7142, longitude: -117.1736 },
  ],
}));

import { getTideData, getTideDataForStation } from "@/lib/api/tides";
import { useTides } from "@/lib/hooks/useTides";

const mockGetTideData = vi.mocked(getTideData);
const mockGetTideDataForStation = vi.mocked(getTideDataForStation);

describe("useTides", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts in idle state when no coordinates", () => {
    const { result } = renderHook(() => useTides(null, null));
    expect(result.current.status).toBe("idle");
  });

  it("transitions to success with tide data", async () => {
    mockGetTideData.mockResolvedValueOnce(mockTideData);

    const { result } = renderHook(() => useTides(34.01, -118.49));

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    if (result.current.status === "success") {
      expect(result.current.data.station.id).toBe("9410840");
    }
  });

  it("transitions to error on API failure", async () => {
    mockGetTideData.mockRejectedValueOnce(new Error("NOAA down"));

    const { result } = renderHook(() => useTides(34.01, -118.49));

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    if (result.current.status === "error") {
      expect(result.current.message).toBe("NOAA down");
    }
  });

  it("uses getTideData when no stationId provided", async () => {
    mockGetTideData.mockResolvedValueOnce(mockTideData);

    renderHook(() => useTides(34.01, -118.49));

    await waitFor(() => {
      expect(mockGetTideData).toHaveBeenCalledWith(34.01, -118.49);
    });
    expect(mockGetTideDataForStation).not.toHaveBeenCalled();
  });

  it("uses getTideDataForStation when stationId provided", async () => {
    mockGetTideDataForStation.mockResolvedValueOnce(mockTideData);

    renderHook(() => useTides(34.01, -118.49, "9410840"));

    await waitFor(() => {
      expect(mockGetTideDataForStation).toHaveBeenCalled();
    });
    expect(mockGetTideData).not.toHaveBeenCalled();
  });

  it("refetch triggers new fetch", async () => {
    mockGetTideData.mockResolvedValue(mockTideData);

    const { result } = renderHook(() => useTides(34.01, -118.49));

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockGetTideData).toHaveBeenCalledTimes(2);
    });
  });

  it("returns idle when coordinates are null", () => {
    const { result } = renderHook(() => useTides(null, null));
    expect(result.current.status).toBe("idle");
    expect(mockGetTideData).not.toHaveBeenCalled();
  });

  it("handles non-Error rejection", async () => {
    mockGetTideData.mockRejectedValueOnce("string error");

    const { result } = renderHook(() => useTides(34.01, -118.49));

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    if (result.current.status === "error") {
      expect(result.current.message).toBe("Failed to load tide data");
    }
  });
});
