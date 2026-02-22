import type { WeatherCodeInfo } from "@/lib/types/weather";

// =============================================================================
// WMO Weather Code Mapping
// Open-Meteo uses WMO (World Meteorological Organization) weather codes.
// Maps to human-readable descriptions (EN/ES) and Lucide icon names.
// =============================================================================

export const WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  // Clear
  0:  { description: "Clear sky",             descriptionEs: "Cielo despejado",            icon: "Sun" },
  1:  { description: "Mainly clear",          descriptionEs: "Principalmente despejado",    icon: "Sun" },
  2:  { description: "Partly cloudy",         descriptionEs: "Parcialmente nublado",        icon: "CloudSun" },
  3:  { description: "Overcast",              descriptionEs: "Nublado",                     icon: "Cloud" },

  // Fog
  45: { description: "Fog",                   descriptionEs: "Niebla",                      icon: "CloudFog" },
  48: { description: "Depositing rime fog",   descriptionEs: "Niebla con escarcha",         icon: "CloudFog" },

  // Drizzle
  51: { description: "Light drizzle",         descriptionEs: "Llovizna ligera",             icon: "CloudDrizzle" },
  53: { description: "Moderate drizzle",      descriptionEs: "Llovizna moderada",           icon: "CloudDrizzle" },
  55: { description: "Dense drizzle",         descriptionEs: "Llovizna densa",              icon: "CloudDrizzle" },

  // Freezing drizzle
  56: { description: "Light freezing drizzle", descriptionEs: "Llovizna helada ligera",     icon: "CloudDrizzle" },
  57: { description: "Dense freezing drizzle", descriptionEs: "Llovizna helada densa",      icon: "CloudDrizzle" },

  // Rain
  61: { description: "Slight rain",           descriptionEs: "Lluvia ligera",               icon: "CloudRain" },
  63: { description: "Moderate rain",         descriptionEs: "Lluvia moderada",             icon: "CloudRain" },
  65: { description: "Heavy rain",            descriptionEs: "Lluvia fuerte",               icon: "CloudRainWind" },

  // Freezing rain
  66: { description: "Light freezing rain",   descriptionEs: "Lluvia helada ligera",        icon: "CloudRain" },
  67: { description: "Heavy freezing rain",   descriptionEs: "Lluvia helada fuerte",        icon: "CloudRainWind" },

  // Snow
  71: { description: "Slight snow",           descriptionEs: "Nieve ligera",                icon: "CloudSnow" },
  73: { description: "Moderate snow",         descriptionEs: "Nieve moderada",              icon: "CloudSnow" },
  75: { description: "Heavy snow",            descriptionEs: "Nieve fuerte",                icon: "CloudSnow" },
  77: { description: "Snow grains",           descriptionEs: "Granos de nieve",             icon: "CloudSnow" },

  // Rain showers
  80: { description: "Slight rain showers",   descriptionEs: "Chubascos ligeros",           icon: "CloudRain" },
  81: { description: "Moderate rain showers", descriptionEs: "Chubascos moderados",         icon: "CloudRain" },
  82: { description: "Violent rain showers",  descriptionEs: "Chubascos fuertes",           icon: "CloudRainWind" },

  // Snow showers
  85: { description: "Slight snow showers",   descriptionEs: "Nevadas ligeras",             icon: "CloudSnow" },
  86: { description: "Heavy snow showers",    descriptionEs: "Nevadas fuertes",             icon: "CloudSnow" },

  // Thunderstorms
  95: { description: "Thunderstorm",          descriptionEs: "Tormenta eléctrica",          icon: "CloudLightning" },
  96: { description: "Thunderstorm with slight hail", descriptionEs: "Tormenta con granizo ligero", icon: "CloudLightning" },
  99: { description: "Thunderstorm with heavy hail",  descriptionEs: "Tormenta con granizo fuerte", icon: "CloudLightning" },
};

/**
 * Get weather info for a WMO code.
 * Returns a fallback for unknown codes.
 */
export function getWeatherInfo(code: number): WeatherCodeInfo {
  return WEATHER_CODES[code] ?? {
    description: "Unknown",
    descriptionEs: "Desconocido",
    icon: "Cloud",
  };
}
