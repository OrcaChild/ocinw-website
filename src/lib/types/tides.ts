// =============================================================================
// Tide Types — NOAA CO-OPS Tides & Currents API
// =============================================================================

/** NOAA tide station */
export type TideStation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

/** Single tide prediction (high or low) */
export type TidePrediction = {
  time: string; // ISO 8601
  height: number; // feet above MLLW datum
  type: "H" | "L"; // High or Low
};

/** Current tide status derived from predictions */
export type CurrentTideStatus = {
  status: "rising" | "falling";
  nextHigh: TidePrediction | null;
  nextLow: TidePrediction | null;
  currentEstimatedHeight: number;
};

/** Complete tide data for a location */
export type TideData = {
  station: TideStation;
  predictions: TidePrediction[];
  currentTide: CurrentTideStatus;
  fetchedAt: number; // Unix timestamp for cache invalidation
};

// ---------------------------------------------------------------------------
// NOAA raw API response shapes (for parsing)
// ---------------------------------------------------------------------------

/** Raw NOAA Tides & Currents API response */
export type NoaaTidesResponse = {
  predictions?: Array<{
    t: string; // Timestamp "YYYY-MM-DD HH:MM"
    v: string; // Value (water level in feet)
    type?: "H" | "L"; // High or Low (only in hilo product)
  }>;
  error?: {
    message: string;
  };
};

/** NOAA API query parameters */
export type NoaaQueryParams = {
  station: string;
  begin_date: string; // YYYYMMDD
  end_date: string; // YYYYMMDD
  product: "predictions" | "water_level";
  datum: "MLLW" | "MSL" | "NAVD";
  units: "english" | "metric";
  time_zone: "lst_ldt" | "gmt";
  format: "json";
  interval?: "hilo" | "h" | "6";
  application?: string;
};
