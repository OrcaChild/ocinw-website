// =============================================================================
// Open-Meteo Weather API Client
// Fetches current conditions, hourly/daily forecasts, and marine data.
// Free, no API key required, 10K requests/day for non-commercial use.
// =============================================================================

import type {
  WeatherData,
  CurrentWeather,
  MarineConditions,
  HourlyForecastEntry,
  DailyForecastEntry,
  OpenMeteoForecastResponse,
  OpenMeteoMarineResponse,
} from "@/lib/types/weather";
import { getWeatherInfo } from "@/lib/data/weather-codes";

const FORECAST_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const MARINE_BASE_URL = "https://marine-api.open-meteo.com/v1/marine";
const API_TIMEOUT_MS = 10_000;

// ---------------------------------------------------------------------------
// Cache — 15 minutes for weather data
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = 15 * 60 * 1000;
const weatherCache = new Map<string, WeatherData>();

function getCacheKey(lat: number, lon: number): string {
  // Round to 2 decimal places (~1.1 km precision) for cache dedup
  return `${lat.toFixed(2)},${lon.toFixed(2)}`;
}

function getCachedWeather(lat: number, lon: number): WeatherData | null {
  const key = getCacheKey(lat, lon);
  const cached = weatherCache.get(key);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached;
  }
  weatherCache.delete(key);
  return null;
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
// Forecast API
// ---------------------------------------------------------------------------

async function fetchForecast(latitude: number, longitude: number): Promise<OpenMeteoForecastResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "uv_index",
    ].join(","),
    hourly: [
      "temperature_2m",
      "precipitation_probability",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "uv_index",
    ].join(","),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "uv_index_max",
      "weather_code",
    ].join(","),
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
    timezone: "America/Los_Angeles",
    forecast_days: "7",
  });

  const response = await fetchWithTimeout(`${FORECAST_BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`Open-Meteo API error: ${response.status}`);
  }
  return response.json() as Promise<OpenMeteoForecastResponse>;
}

// ---------------------------------------------------------------------------
// Marine API
// ---------------------------------------------------------------------------

async function fetchMarine(latitude: number, longitude: number): Promise<OpenMeteoMarineResponse | null> {
  try {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current: [
        "wave_height",
        "wave_direction",
        "wave_period",
        "wind_wave_height",
        "swell_wave_height",
        "swell_wave_direction",
        "swell_wave_period",
      ].join(","),
    });

    const response = await fetchWithTimeout(`${MARINE_BASE_URL}?${params}`);
    if (!response.ok) return null;
    return response.json() as Promise<OpenMeteoMarineResponse>;
  } catch {
    // Marine data is supplemental — don't fail the entire request
    return null;
  }
}

// ---------------------------------------------------------------------------
// Parse helpers
// ---------------------------------------------------------------------------

function parseCurrent(raw: OpenMeteoForecastResponse): CurrentWeather {
  const c = raw.current;
  if (!c) {
    throw new Error("No current weather data in API response");
  }

  const info = getWeatherInfo(c.weather_code);
  return {
    temperature: c.temperature_2m,
    feelsLike: c.apparent_temperature,
    humidity: c.relative_humidity_2m,
    precipitation: c.precipitation,
    weatherCode: c.weather_code,
    weatherDescription: info.description,
    weatherIcon: info.icon,
    windSpeed: c.wind_speed_10m,
    windDirection: c.wind_direction_10m,
    windGusts: c.wind_gusts_10m,
    uvIndex: c.uv_index,
  };
}

function parseMarine(raw: OpenMeteoMarineResponse | null): MarineConditions | null {
  if (!raw?.current) return null;
  const m = raw.current;
  // Marine API returns null values for inland locations — treat as no data
  if (m.wave_height === null && m.swell_wave_height === null) return null;
  return {
    waveHeight: m.wave_height ?? 0,
    waveDirection: m.wave_direction ?? 0,
    wavePeriod: m.wave_period ?? 0,
    swellHeight: m.swell_wave_height ?? 0,
    swellDirection: m.swell_wave_direction ?? 0,
    swellPeriod: m.swell_wave_period ?? 0,
  };
}

function parseHourly(raw: OpenMeteoForecastResponse): HourlyForecastEntry[] {
  const h = raw.hourly;
  if (!h) return [];

  return h.time.map((time, i) => ({
    time,
    temperature: h.temperature_2m[i] ?? 0,
    precipitationProbability: h.precipitation_probability[i] ?? 0,
    weatherCode: h.weather_code[i] ?? 0,
    windSpeed: h.wind_speed_10m[i] ?? 0,
    windDirection: h.wind_direction_10m[i] ?? 0,
    uvIndex: h.uv_index[i] ?? 0,
  }));
}

function parseDaily(raw: OpenMeteoForecastResponse): DailyForecastEntry[] {
  const d = raw.daily;
  if (!d) return [];

  return d.time.map((date, i) => ({
    date,
    tempMax: d.temperature_2m_max[i] ?? 0,
    tempMin: d.temperature_2m_min[i] ?? 0,
    sunrise: d.sunrise[i] ?? "",
    sunset: d.sunset[i] ?? "",
    precipitationSum: d.precipitation_sum[i] ?? 0,
    precipitationProbability: d.precipitation_probability_max[i] ?? 0,
    windSpeedMax: d.wind_speed_10m_max[i] ?? 0,
    uvIndexMax: d.uv_index_max[i] ?? 0,
    weatherCode: d.weather_code[i] ?? 0,
  }));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch complete weather data for a location.
 * Returns cached data if available (15-minute TTL).
 * Fetches forecast and marine data in parallel.
 */
export async function getWeatherData(
  latitude: number,
  longitude: number,
): Promise<WeatherData> {
  const cached = getCachedWeather(latitude, longitude);
  if (cached) return cached;

  const [forecastRaw, marineRaw] = await Promise.all([
    fetchForecast(latitude, longitude),
    fetchMarine(latitude, longitude),
  ]);

  const data: WeatherData = {
    current: parseCurrent(forecastRaw),
    marine: parseMarine(marineRaw),
    hourly: parseHourly(forecastRaw),
    daily: parseDaily(forecastRaw),
    latitude: forecastRaw.latitude,
    longitude: forecastRaw.longitude,
    fetchedAt: Date.now(),
  };

  weatherCache.set(getCacheKey(latitude, longitude), data);
  return data;
}
