// =============================================================================
// Weather API Client Tests — 80% coverage target
// Source: src/lib/api/weather.ts
// =============================================================================

import {
  mockForecastResponse,
  mockMarineResponse,
  mockInlandMarineResponse,
} from "../fixtures";

// Use dynamic imports to isolate module-level cache between describe blocks
describe("getWeatherData", () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let getWeatherData: typeof import("@/lib/api/weather").getWeatherData;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const mod = await import("@/lib/api/weather");
    getWeatherData = mod.getWeatherData;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function mockSuccessfulFetch(): void {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockForecastResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockMarineResponse),
      });
  }

  it("fetches forecast and marine data in parallel", async () => {
    mockSuccessfulFetch();

    await getWeatherData(34.01, -118.49);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const urls = fetchMock.mock.calls.map((c: unknown[]) => String(c[0]));
    expect(urls[0]).toContain("api.open-meteo.com");
    expect(urls[1]).toContain("marine-api.open-meteo.com");
  });

  it("returns parsed WeatherData with current, marine, hourly, daily", async () => {
    mockSuccessfulFetch();

    const data = await getWeatherData(34.01, -118.49);

    expect(data.current.temperature).toBe(68);
    expect(data.current.weatherDescription).toBe("Clear sky");
    expect(data.marine).not.toBeNull();
    expect(data.marine?.waveHeight).toBe(1.2);
    expect(data.hourly).toHaveLength(2);
    expect(data.daily).toHaveLength(1);
    expect(data.latitude).toBe(34.01);
    expect(data.longitude).toBe(-118.5);
  });

  it("caches data for 15 minutes (same coords return cached)", async () => {
    mockSuccessfulFetch();

    const first = await getWeatherData(34.01, -118.49);
    const second = await getWeatherData(34.01, -118.49);

    // fetch called only twice (forecast + marine), not four times
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(second).toBe(first);
  });

  it("re-fetches after cache expires (>15 minutes)", async () => {
    mockSuccessfulFetch();
    const first = await getWeatherData(34.01, -118.49);

    // Advance time past 15-minute TTL
    const originalNow = Date.now;
    vi.spyOn(Date, "now").mockReturnValue(first.fetchedAt + 16 * 60 * 1000);

    mockSuccessfulFetch();
    await getWeatherData(34.01, -118.49);

    // Should have fetched again (4 total calls: 2 initial + 2 re-fetch)
    expect(fetchMock).toHaveBeenCalledTimes(4);

    Date.now = originalNow;
  });

  it("rounds coordinates to 2 decimal places for cache key", async () => {
    mockSuccessfulFetch();
    await getWeatherData(34.01234, -118.49876);

    // Same rounded coords should hit cache
    const _second = await getWeatherData(34.01499, -118.49501);
    expect(fetchMock).toHaveBeenCalledTimes(2); // Only initial fetch
  });

  it("throws on forecast API HTTP error", async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(getWeatherData(34.01, -118.49)).rejects.toThrow(
      "Open-Meteo API error: 500",
    );
  });

  it("returns null marine when marine API fails", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockForecastResponse),
      })
      .mockResolvedValueOnce({ ok: false, status: 500 });

    const data = await getWeatherData(34.01, -118.49);
    expect(data.marine).toBeNull();
  });

  it("returns null marine for inland locations (all null values)", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockForecastResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockInlandMarineResponse),
      });

    const data = await getWeatherData(33.67, -117.33);
    expect(data.marine).toBeNull();
  });

  it("throws when current weather data is missing", async () => {
    const noCurrentResponse = { ...mockForecastResponse, current: undefined };
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(noCurrentResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockMarineResponse),
      });

    await expect(getWeatherData(35.0, -119.0)).rejects.toThrow(
      "No current weather data",
    );
  });

  it("returns empty arrays when hourly/daily data is missing", async () => {
    const minimalResponse = {
      ...mockForecastResponse,
      hourly: undefined,
      daily: undefined,
    };
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(minimalResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockMarineResponse),
      });

    const data = await getWeatherData(35.1, -119.1);
    expect(data.hourly).toEqual([]);
    expect(data.daily).toEqual([]);
  });

  it("includes correct API parameters", async () => {
    mockSuccessfulFetch();
    await getWeatherData(34.01, -118.49);

    const forecastUrl = String(fetchMock.mock.calls[0]?.[0]);
    expect(forecastUrl).toContain("temperature_unit=fahrenheit");
    expect(forecastUrl).toContain("wind_speed_unit=mph");
    expect(forecastUrl).toContain("precipitation_unit=inch");
    expect(forecastUrl).toContain("timezone=America%2FLos_Angeles");
  });

  it("returns null marine when marine API throws", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockForecastResponse),
      })
      .mockRejectedValueOnce(new Error("Network error"));

    const data = await getWeatherData(36.0, -120.0);
    expect(data.marine).toBeNull();
  });
});
