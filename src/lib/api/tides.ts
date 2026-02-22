// =============================================================================
// NOAA CO-OPS Tides & Currents API Client
// Fetches tide predictions for Southern California stations.
// Free, no API key required. Authoritative US government data.
// =============================================================================

import type {
  TideData,
  TidePrediction,
  TideStation,
  NoaaTidesResponse,
  CurrentTideStatus,
} from "@/lib/types/tides";
import { TIDE_STATIONS } from "@/lib/data/socal-beaches";
import { findNearestStation } from "@/lib/utils/geo";

const NOAA_BASE_URL = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";
const API_TIMEOUT_MS = 10_000;

// ---------------------------------------------------------------------------
// Cache — 6 hours for tide predictions (they're stable)
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const tideCache = new Map<string, TideData>();

function getCachedTides(stationId: string): TideData | null {
  const cached = tideCache.get(stationId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached;
  }
  tideCache.delete(stationId);
  return null;
}

// ---------------------------------------------------------------------------
// Date formatting for NOAA API (YYYYMMDD)
// ---------------------------------------------------------------------------

function formatNoaaDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

// ---------------------------------------------------------------------------
// Fetch with timeout
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

// ---------------------------------------------------------------------------
// Fetch tide predictions (high/low)
// ---------------------------------------------------------------------------

async function fetchTidePredictions(stationId: string): Promise<TidePrediction[]> {
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 7);

  const params = new URLSearchParams({
    station: stationId,
    product: "predictions",
    datum: "MLLW",
    time_zone: "lst_ldt",
    units: "english",
    interval: "hilo",
    format: "json",
    begin_date: formatNoaaDate(now),
    end_date: formatNoaaDate(end),
    application: "OrcaChildInTheWild",
  });

  const response = await fetchWithTimeout(`${NOAA_BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`NOAA API error: ${response.status}`);
  }

  const data = (await response.json()) as NoaaTidesResponse;

  if (data.error) {
    throw new Error(`NOAA API error: ${data.error.message}`);
  }

  if (!data.predictions || data.predictions.length === 0) {
    throw new Error("No tide predictions returned from NOAA");
  }

  return data.predictions.map((p) => ({
    time: noaaTimeToIso(p.t),
    height: parseFloat(p.v),
    type: p.type === "H" ? "H" as const : "L" as const,
  }));
}

// ---------------------------------------------------------------------------
// Fetch hourly tide data (for smooth chart rendering)
// ---------------------------------------------------------------------------

export async function fetchHourlyTides(stationId: string): Promise<Array<{ time: string; height: number }>> {
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 2); // 2 days of hourly data

  const params = new URLSearchParams({
    station: stationId,
    product: "predictions",
    datum: "MLLW",
    time_zone: "lst_ldt",
    units: "english",
    interval: "h",
    format: "json",
    begin_date: formatNoaaDate(now),
    end_date: formatNoaaDate(end),
    application: "OrcaChildInTheWild",
  });

  const response = await fetchWithTimeout(`${NOAA_BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`NOAA API error: ${response.status}`);
  }

  const data = (await response.json()) as NoaaTidesResponse;

  if (data.error) {
    throw new Error(`NOAA API error: ${data.error.message}`);
  }

  return (data.predictions ?? []).map((p) => ({
    time: noaaTimeToIso(p.t),
    height: parseFloat(p.v),
  }));
}

// ---------------------------------------------------------------------------
// Current tide status calculation
// ---------------------------------------------------------------------------

function calculateCurrentTideStatus(predictions: TidePrediction[]): CurrentTideStatus {
  const now = Date.now();

  // Find the previous and next tide events relative to now
  let previousTide: TidePrediction | null = null;
  let nextTide: TidePrediction | null = null;

  for (const p of predictions) {
    const pTime = new Date(p.time).getTime();
    if (pTime <= now) {
      previousTide = p;
    } else if (!nextTide) {
      nextTide = p;
    }
    if (previousTide && nextTide) break;
  }

  // Determine rising/falling based on what comes next
  const status: "rising" | "falling" = nextTide?.type === "H" ? "rising" : "falling";

  // Find next high and next low
  const nextHigh = predictions.find((p) => new Date(p.time).getTime() > now && p.type === "H") ?? null;
  const nextLow = predictions.find((p) => new Date(p.time).getTime() > now && p.type === "L") ?? null;

  // Interpolate current height between previous and next tide events
  let currentEstimatedHeight = 0;
  if (previousTide && nextTide) {
    const prevTime = new Date(previousTide.time).getTime();
    const nextTime = new Date(nextTide.time).getTime();
    const elapsed = now - prevTime;
    const total = nextTime - prevTime;
    const fraction = total > 0 ? elapsed / total : 0;

    // Cosine interpolation for smooth tide curve
    const cosFraction = (1 - Math.cos(fraction * Math.PI)) / 2;
    currentEstimatedHeight =
      previousTide.height + (nextTide.height - previousTide.height) * cosFraction;
  } else if (previousTide) {
    currentEstimatedHeight = previousTide.height;
  } else if (nextTide) {
    currentEstimatedHeight = nextTide.height;
  }

  return { status, nextHigh, nextLow, currentEstimatedHeight };
}

// ---------------------------------------------------------------------------
// NOAA timestamp parsing ("YYYY-MM-DD HH:MM" → ISO)
// ---------------------------------------------------------------------------

function noaaTimeToIso(noaaTime: string): string {
  // NOAA returns "2026-02-22 14:30" in local time — add timezone for ISO
  return noaaTime.replace(" ", "T") + ":00";
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Get tide data for coordinates. Finds nearest station automatically.
 * Returns cached data if available (6-hour TTL).
 */
export async function getTideData(latitude: number, longitude: number): Promise<TideData> {
  const station = findNearestStation(latitude, longitude, TIDE_STATIONS);
  return getTideDataForStation(station);
}

/**
 * Get tide data for a specific station.
 * Returns cached data if available (6-hour TTL).
 */
export async function getTideDataForStation(station: TideStation): Promise<TideData> {
  const cached = getCachedTides(station.id);
  if (cached) return cached;

  const predictions = await fetchTidePredictions(station.id);
  const currentTide = calculateCurrentTideStatus(predictions);

  const data: TideData = {
    station,
    predictions,
    currentTide,
    fetchedAt: Date.now(),
  };

  tideCache.set(station.id, data);
  return data;
}
