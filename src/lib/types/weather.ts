/** NOAA tide prediction data */
export type TidePrediction = {
  t: string; // ISO timestamp
  v: string; // Water level in feet
  type: "H" | "L"; // High or Low
};

/** NOAA tide station */
export type TideStation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

/** Open-Meteo hourly weather data */
export type HourlyWeather = {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  weather_code: number[];
};

/** Open-Meteo daily weather data */
export type DailyWeather = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
};

/** Unified weather response */
export type WeatherData = {
  latitude: number;
  longitude: number;
  hourly: HourlyWeather;
  daily: DailyWeather;
};
