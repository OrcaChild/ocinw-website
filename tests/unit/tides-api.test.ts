// =============================================================================
// Tides API Client Tests — 80% coverage target
// Source: src/lib/api/tides.ts
// =============================================================================

import { mockTideStations, mockNoaaResponse, mockNoaaHourlyResponse } from "../fixtures";

// Mock the geo utility and beach data modules
vi.mock("@/lib/utils/geo", () => ({
  findNearestStation: vi.fn(() => mockTideStations[0]),
}));

vi.mock("@/lib/data/socal-beaches", () => ({
  TIDE_STATIONS: mockTideStations,
}));

describe("tides API", () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let getTideData: typeof import("@/lib/api/tides").getTideData;
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let getTideDataForStation: typeof import("@/lib/api/tides").getTideDataForStation;
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let fetchHourlyTides: typeof import("@/lib/api/tides").fetchHourlyTides;
  let fetchMock: ReturnType<typeof vi.fn>;
  let dateNowSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    // Fix time to be between the first two predictions for predictable status
    dateNowSpy = vi.spyOn(Date, "now").mockReturnValue(
      new Date("2026-02-22T06:00:00").getTime(),
    );

    // Re-mock after resetModules
    vi.doMock("@/lib/utils/geo", () => ({
      findNearestStation: vi.fn(() => mockTideStations[0]),
    }));
    vi.doMock("@/lib/data/socal-beaches", () => ({
      TIDE_STATIONS: mockTideStations,
    }));

    const mod = await import("@/lib/api/tides");
    getTideData = mod.getTideData;
    getTideDataForStation = mod.getTideDataForStation;
    fetchHourlyTides = mod.fetchHourlyTides;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function mockNoaaFetch(): void {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockNoaaResponse),
    });
  }

  // -------------------------------------------------------------------------
  // getTideData
  // -------------------------------------------------------------------------

  describe("getTideData", () => {
    it("finds nearest station and fetches predictions", async () => {
      mockNoaaFetch();
      const data = await getTideData(34.02, -118.49);

      expect(data.station.id).toBe("9410840");
      expect(data.predictions.length).toBeGreaterThan(0);
    });

    it("returns TideData with station, predictions, currentTide, fetchedAt", async () => {
      mockNoaaFetch();
      const data = await getTideData(34.02, -118.49);

      expect(data.station).toBeDefined();
      expect(data.predictions).toBeInstanceOf(Array);
      expect(data.currentTide).toBeDefined();
      expect(data.currentTide.status).toMatch(/^(rising|falling)$/);
      expect(data.fetchedAt).toBeGreaterThan(0);
    });
  });

  // -------------------------------------------------------------------------
  // getTideDataForStation
  // -------------------------------------------------------------------------

  describe("getTideDataForStation", () => {
    it("fetches tide predictions for specified station", async () => {
      mockNoaaFetch();
      const station = mockTideStations[0]!;
      const data = await getTideDataForStation(station);

      expect(data.station.id).toBe(station.id);
      expect(data.predictions).toHaveLength(4);
    });

    it("caches data for 6 hours", async () => {
      mockNoaaFetch();
      const station = mockTideStations[0]!;

      const first = await getTideDataForStation(station);
      const second = await getTideDataForStation(station);

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(second).toBe(first);
    });

    it("re-fetches after cache expires", async () => {
      mockNoaaFetch();
      const station = mockTideStations[0]!;
      const first = await getTideDataForStation(station);

      // Advance time past 6-hour TTL
      dateNowSpy.mockReturnValue(first.fetchedAt + 7 * 60 * 60 * 1000);

      mockNoaaFetch();
      await getTideDataForStation(station);

      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("throws on NOAA API HTTP error", async () => {
      fetchMock.mockResolvedValueOnce({ ok: false, status: 503 });
      const station = mockTideStations[0]!;

      await expect(getTideDataForStation(station)).rejects.toThrow(
        "NOAA API error: 503",
      );
    });

    it("throws on NOAA API error response", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ error: { message: "Station not found" } }),
      });
      const station = mockTideStations[0]!;

      await expect(getTideDataForStation(station)).rejects.toThrow(
        "Station not found",
      );
    });

    it("throws when no predictions returned", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ predictions: [] }),
      });
      const station = mockTideStations[0]!;

      await expect(getTideDataForStation(station)).rejects.toThrow(
        "No tide predictions returned",
      );
    });

    it("parses NOAA timestamps to ISO format", async () => {
      mockNoaaFetch();
      const station = mockTideStations[0]!;
      const data = await getTideDataForStation(station);

      // "2026-02-22 03:15" → "2026-02-22T03:15:00"
      expect(data.predictions[0]?.time).toBe("2026-02-22T03:15:00");
    });

    it("determines rising/falling tide status", async () => {
      mockNoaaFetch();
      const station = mockTideStations[0]!;
      const data = await getTideDataForStation(station);

      // Time is 06:00, between H@03:15 and L@09:30, so next is L = falling
      expect(data.currentTide.status).toBe("falling");
    });

    it("interpolates current height between tides", async () => {
      mockNoaaFetch();
      const station = mockTideStations[0]!;
      const data = await getTideDataForStation(station);

      // Current height should be between the previous high (5.2) and next low (0.8)
      expect(data.currentTide.currentEstimatedHeight).toBeGreaterThan(0);
      expect(data.currentTide.currentEstimatedHeight).toBeLessThan(6);
    });
  });

  // -------------------------------------------------------------------------
  // fetchHourlyTides
  // -------------------------------------------------------------------------

  describe("fetchHourlyTides", () => {
    it("fetches hourly interval predictions", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockNoaaHourlyResponse),
      });

      const data = await fetchHourlyTides("9410840");

      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty("time");
      expect(data[0]).toHaveProperty("height");
    });

    it("throws on API error", async () => {
      fetchMock.mockResolvedValueOnce({ ok: false, status: 500 });

      await expect(fetchHourlyTides("9410840")).rejects.toThrow(
        "NOAA API error: 500",
      );
    });

    it("throws on NOAA error response", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ error: { message: "Invalid station" } }),
      });

      await expect(fetchHourlyTides("9999999")).rejects.toThrow(
        "Invalid station",
      );
    });

    it("includes correct API parameters", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockNoaaHourlyResponse),
      });

      await fetchHourlyTides("9410840");

      const url = String(fetchMock.mock.calls[0]?.[0]);
      expect(url).toContain("station=9410840");
      expect(url).toContain("interval=h");
      expect(url).toContain("application=OrcaChildInTheWild");
    });
  });
});
