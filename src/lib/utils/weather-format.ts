// =============================================================================
// Weather & Tides Formatting Utilities
// =============================================================================

/**
 * Format temperature for display (rounds to nearest integer).
 * Open-Meteo returns Fahrenheit when units=fahrenheit is set.
 */
export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°F`;
}

/** Format wind speed in mph */
export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed)} mph`;
}

/** Format wind direction as cardinal (e.g. 225° → "SW") */
export function formatWindDirection(degrees: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index] ?? "N";
}

/** Format tide height in feet with 1 decimal place */
export function formatTideHeight(feet: number): string {
  return `${feet.toFixed(1)} ft`;
}

/** Format UV index with risk label */
export function formatUvIndex(uv: number): { value: string; level: string; levelEs: string } {
  if (uv <= 2) return { value: String(Math.round(uv)), level: "Low", levelEs: "Bajo" };
  if (uv <= 5) return { value: String(Math.round(uv)), level: "Moderate", levelEs: "Moderado" };
  if (uv <= 7) return { value: String(Math.round(uv)), level: "High", levelEs: "Alto" };
  if (uv <= 10) return { value: String(Math.round(uv)), level: "Very High", levelEs: "Muy alto" };
  return { value: String(Math.round(uv)), level: "Extreme", levelEs: "Extremo" };
}

/** Format precipitation as percentage */
export function formatPrecipitation(probability: number): string {
  return `${Math.round(probability)}%`;
}

/** Format wave height in feet */
export function formatWaveHeight(meters: number): string {
  // Open-Meteo Marine API returns meters; convert to feet
  const feet = meters * 3.28084;
  return `${feet.toFixed(1)} ft`;
}

/** Format wave period in seconds */
export function formatWavePeriod(seconds: number): string {
  return `${seconds.toFixed(1)}s`;
}

/**
 * Format time from ISO string for display (e.g. "3:00 PM").
 * Uses the user's locale settings.
 */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format date from ISO string for display (e.g. "Mon, Feb 22").
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format relative time (e.g. "in 2h 15m" or "45m ago").
 */
export function formatRelativeTime(targetTime: string): string {
  const now = Date.now();
  const target = new Date(targetTime).getTime();
  const diffMs = target - now;
  const absDiff = Math.abs(diffMs);

  const hours = Math.floor(absDiff / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

  let timeStr: string;
  if (hours > 0) {
    timeStr = `${hours}h ${minutes}m`;
  } else {
    timeStr = `${minutes}m`;
  }

  return diffMs > 0 ? `in ${timeStr}` : `${timeStr} ago`;
}
