// =============================================================================
// Geolocation Types — Browser API + ZIP code fallback
// =============================================================================

/** Location source tracking */
export type LocationSource = "gps" | "zip" | "manual" | null;

/** Geolocation state shared across weather/tide components */
export type LocationState = {
  latitude: number | null;
  longitude: number | null;
  locationName: string | null;
  source: LocationSource;
  loading: boolean;
  error: string | null;
};

/** Popular beach location for quick-select */
export type BeachLocation = {
  name: string;
  nameEs: string;
  latitude: number;
  longitude: number;
  nearestTideStation: string; // NOAA station ID
};
