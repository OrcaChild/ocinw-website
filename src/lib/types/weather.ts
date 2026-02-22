// =============================================================================
// Weather Types — Open-Meteo API + Marine API
// =============================================================================

/** Current weather conditions (parsed from Open-Meteo response) */
export type CurrentWeather = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  weatherDescription: string;
  weatherIcon: string;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  uvIndex: number;
};

/** Marine/ocean conditions (parsed from Open-Meteo Marine API) */
export type MarineConditions = {
  waveHeight: number;
  waveDirection: number;
  wavePeriod: number;
  swellHeight: number;
  swellDirection: number;
  swellPeriod: number;
};

/** Single hour in the hourly forecast */
export type HourlyForecastEntry = {
  time: string;
  temperature: number;
  precipitationProbability: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
};

/** Single day in the daily forecast */
export type DailyForecastEntry = {
  date: string;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
  precipitationSum: number;
  precipitationProbability: number;
  windSpeedMax: number;
  uvIndexMax: number;
  weatherCode: number;
};

/** Complete weather data for a location */
export type WeatherData = {
  current: CurrentWeather;
  marine: MarineConditions | null;
  hourly: HourlyForecastEntry[];
  daily: DailyForecastEntry[];
  latitude: number;
  longitude: number;
  fetchedAt: number; // Unix timestamp for cache invalidation
};

// ---------------------------------------------------------------------------
// Open-Meteo raw API response shapes (for parsing)
// ---------------------------------------------------------------------------

/** Raw Open-Meteo forecast response */
export type OpenMeteoForecastResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  current?: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    uv_index: number;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    uv_index: number[];
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    uv_index_max: number[];
    weather_code: number[];
  };
};

/** Raw Open-Meteo marine response (values are null for inland locations) */
export type OpenMeteoMarineResponse = {
  latitude: number;
  longitude: number;
  current?: {
    time: string;
    wave_height: number | null;
    wave_direction: number | null;
    wave_period: number | null;
    wind_wave_height: number | null;
    swell_wave_height: number | null;
    swell_wave_direction: number | null;
    swell_wave_period: number | null;
  };
};

/** Weather code mapping entry */
export type WeatherCodeInfo = {
  description: string;
  descriptionEs: string;
  icon: string;
};
