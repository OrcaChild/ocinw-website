// @vitest-environment happy-dom
// =============================================================================
// useWeather Hook Tests — 80% coverage target
// Source: src/lib/hooks/useWeather.ts
// =============================================================================

import { renderHook, waitFor, act } from "@testing-library/react";
import { mockWeatherData } from "../../fixtures";

vi.mock("@/lib/api/weather", () => ({
  getWeatherData: vi.fn(),
}));

import { getWeatherData } from "@/lib/api/weather";
import { useWeather } from "@/lib/hooks/useWeather";

const mockGetWeatherData = vi.mocked(getWeatherData);

describe("useWeather", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts in idle state when no coordinates provided", () => {
    const { result } = renderHook(() => useWeather(null, null));
    expect(result.current.status).toBe("idle");
  });

  it("does not fetch when latitude or longitude is null", () => {
    renderHook(() => useWeather(null, null));
    expect(mockGetWeatherData).not.toHaveBeenCalled();
  });

  it("transitions to loading then success when coordinates are set", async () => {
    mockGetWeatherData.mockResolvedValueOnce(mockWeatherData);

    const { result } = renderHook(() => useWeather(34.01, -118.49));

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    if (result.current.status === "success") {
      expect(result.current.data.current.temperature).toBe(68);
    }
  });

  it("transitions to error state on API failure", async () => {
    mockGetWeatherData.mockRejectedValueOnce(new Error("API down"));

    const { result } = renderHook(() => useWeather(34.01, -118.49));

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    if (result.current.status === "error") {
      expect(result.current.message).toBe("API down");
    }
  });

  it("handles non-Error rejection", async () => {
    mockGetWeatherData.mockRejectedValueOnce("string error");

    const { result } = renderHook(() => useWeather(34.01, -118.49));

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    if (result.current.status === "error") {
      expect(result.current.message).toBe("Failed to load weather data");
    }
  });

  it("refetch triggers a new fetch", async () => {
    mockGetWeatherData.mockResolvedValue(mockWeatherData);

    const { result } = renderHook(() => useWeather(34.01, -118.49));

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockGetWeatherData).toHaveBeenCalledTimes(2);
    });
  });

  it("returns idle when coordinates become null", () => {
    const { result, rerender } = renderHook(
      ({ lat, lon }) => useWeather(lat, lon),
      { initialProps: { lat: null as number | null, lon: null as number | null } },
    );

    expect(result.current.status).toBe("idle");

    // Even if internal state changed, null coords should return idle
    rerender({ lat: null, lon: null });
    expect(result.current.status).toBe("idle");
  });
});
