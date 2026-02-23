// =============================================================================
// Shared test fixtures for OCINW test suite
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
import type {
  TideStation,
  TidePrediction,
  TideData,
  CurrentTideStatus,
} from "@/lib/types/tides";
import type { LocationState } from "@/lib/types/geolocation";

// ---------------------------------------------------------------------------
// Weather Fixtures
// ---------------------------------------------------------------------------

export const mockCurrentWeather: CurrentWeather = {
  temperature: 68,
  feelsLike: 66,
  humidity: 55,
  precipitation: 0,
  weatherCode: 0,
  weatherDescription: "Clear sky",
  weatherIcon: "Sun",
  windSpeed: 8,
  windDirection: 270,
  windGusts: 15,
  uvIndex: 5,
};

export const mockMarineConditions: MarineConditions = {
  waveHeight: 1.2,
  waveDirection: 250,
  wavePeriod: 8.5,
  swellHeight: 0.8,
  swellDirection: 245,
  swellPeriod: 12.3,
};

export const mockHourlyForecast: HourlyForecastEntry[] = [
  {
    time: "2026-02-22T00:00",
    temperature: 60,
    precipitationProbability: 0,
    weatherCode: 0,
    windSpeed: 5,
    windDirection: 180,
    uvIndex: 0,
  },
  {
    time: "2026-02-22T01:00",
    temperature: 58,
    precipitationProbability: 10,
    weatherCode: 1,
    windSpeed: 6,
    windDirection: 190,
    uvIndex: 0,
  },
];

export const mockDailyForecast: DailyForecastEntry[] = [
  {
    date: "2026-02-22",
    tempMax: 72,
    tempMin: 55,
    sunrise: "2026-02-22T06:30",
    sunset: "2026-02-22T17:45",
    precipitationSum: 0,
    precipitationProbability: 10,
    windSpeedMax: 15,
    uvIndexMax: 6,
    weatherCode: 1,
  },
];

export const mockWeatherData: WeatherData = {
  current: mockCurrentWeather,
  marine: mockMarineConditions,
  hourly: mockHourlyForecast,
  daily: mockDailyForecast,
  latitude: 34.01,
  longitude: -118.49,
  fetchedAt: Date.now(),
};

export const mockForecastResponse: OpenMeteoForecastResponse = {
  latitude: 34.01,
  longitude: -118.5,
  generationtime_ms: 0.5,
  utc_offset_seconds: -28800,
  timezone: "America/Los_Angeles",
  current: {
    time: "2026-02-22T12:00",
    interval: 900,
    temperature_2m: 68,
    relative_humidity_2m: 55,
    apparent_temperature: 66,
    precipitation: 0,
    weather_code: 0,
    wind_speed_10m: 8,
    wind_direction_10m: 270,
    wind_gusts_10m: 15,
    uv_index: 5,
  },
  hourly: {
    time: ["2026-02-22T00:00", "2026-02-22T01:00"],
    temperature_2m: [60, 58],
    precipitation_probability: [0, 10],
    weather_code: [0, 1],
    wind_speed_10m: [5, 6],
    wind_direction_10m: [180, 190],
    uv_index: [0, 0],
  },
  daily: {
    time: ["2026-02-22"],
    temperature_2m_max: [72],
    temperature_2m_min: [55],
    sunrise: ["2026-02-22T06:30"],
    sunset: ["2026-02-22T17:45"],
    precipitation_sum: [0],
    precipitation_probability_max: [10],
    wind_speed_10m_max: [15],
    uv_index_max: [6],
    weather_code: [1],
  },
};

export const mockMarineResponse: OpenMeteoMarineResponse = {
  latitude: 34.01,
  longitude: -118.5,
  current: {
    time: "2026-02-22T12:00",
    wave_height: 1.2,
    wave_direction: 250,
    wave_period: 8.5,
    wind_wave_height: 0.5,
    swell_wave_height: 0.8,
    swell_wave_direction: 245,
    swell_wave_period: 12.3,
  },
};

export const mockInlandMarineResponse: OpenMeteoMarineResponse = {
  latitude: 33.67,
  longitude: -117.33,
  current: {
    time: "2026-02-22T12:00",
    wave_height: null,
    wave_direction: null,
    wave_period: null,
    wind_wave_height: null,
    swell_wave_height: null,
    swell_wave_direction: null,
    swell_wave_period: null,
  },
};

// ---------------------------------------------------------------------------
// Tide Fixtures
// ---------------------------------------------------------------------------

export const mockTideStations: TideStation[] = [
  { id: "9410840", name: "Santa Monica", latitude: 34.0083, longitude: -118.5 },
  {
    id: "9410660",
    name: "Los Angeles",
    latitude: 33.72,
    longitude: -118.272,
  },
  {
    id: "9410170",
    name: "San Diego",
    latitude: 32.7142,
    longitude: -117.1736,
  },
];

export const mockTidePredictions: TidePrediction[] = [
  { time: "2026-02-22T03:15:00", height: 5.2, type: "H" },
  { time: "2026-02-22T09:30:00", height: 0.8, type: "L" },
  { time: "2026-02-22T15:45:00", height: 4.8, type: "H" },
  { time: "2026-02-22T21:00:00", height: 1.2, type: "L" },
];

export const mockCurrentTideStatus: CurrentTideStatus = {
  status: "rising",
  nextHigh: mockTidePredictions[2] ?? null,
  nextLow: mockTidePredictions[1] ?? null,
  currentEstimatedHeight: 3.0,
};

export const mockTideData: TideData = {
  station: mockTideStations[0]!,
  predictions: mockTidePredictions,
  currentTide: mockCurrentTideStatus,
  fetchedAt: Date.now(),
};

export const mockNoaaResponse = {
  predictions: [
    { t: "2026-02-22 03:15", v: "5.2", type: "H" },
    { t: "2026-02-22 09:30", v: "0.8", type: "L" },
    { t: "2026-02-22 15:45", v: "4.8", type: "H" },
    { t: "2026-02-22 21:00", v: "1.2", type: "L" },
  ],
};

export const mockNoaaHourlyResponse = {
  predictions: Array.from({ length: 48 }, (_, i) => ({
    t: `2026-02-22 ${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`,
    v: String((3 + 2 * Math.sin((i * Math.PI) / 12)).toFixed(2)),
  })),
};

// ---------------------------------------------------------------------------
// Geolocation Fixtures
// ---------------------------------------------------------------------------

export const mockLocationState: LocationState = {
  latitude: 34.0195,
  longitude: -118.4912,
  locationName: "Santa Monica",
  source: "gps",
  loading: false,
  error: null,
};

export const mockNominatimResponse = {
  address: {
    city: "Santa Monica",
    county: "Los Angeles County",
    state: "California",
    country: "United States",
  },
};

// ---------------------------------------------------------------------------
// Form Fixtures
// ---------------------------------------------------------------------------

export const validContactForm = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Hello there",
  message: "This is a test message for the contact form.",
};

export const validVolunteerForm = {
  firstName: "Jordan",
  lastName: "Smith",
  email: "jordan@example.com",
  age: 15,
  interests: ["beach-cleanup"],
  availability: ["weekends"],
  agreeToTerms: true as const,
};

export const validNewsletterForm = {
  email: "subscriber@example.com",
  firstName: "Alex",
};

export const validEventRegistration = {
  eventId: "event-001",
  firstName: "Casey",
  lastName: "Johnson",
  email: "casey@example.com",
  age: 14,
  emergencyContact: "Pat Johnson",
  emergencyPhone: "3105551234",
  waiverAccepted: true,
};
