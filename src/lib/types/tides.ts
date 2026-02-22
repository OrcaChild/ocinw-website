/** NOAA Tides & Currents API response */
export type NoaaTidesResponse = {
  predictions: Array<{
    t: string; // Timestamp (YYYY-MM-DD HH:MM)
    v: string; // Value (water level in feet)
    type?: "H" | "L"; // High or Low (only in hilo product)
  }>;
};

/** Processed tide data for display */
export type TideEntry = {
  time: Date;
  level: number;
  type: "high" | "low" | "measured";
};

/** Washington state NOAA stations relevant to OCINW */
export type NoaaStation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

/** NOAA API parameters */
export type NoaaQueryParams = {
  station: string;
  begin_date: string;
  end_date: string;
  product: "predictions" | "water_level";
  datum: "MLLW" | "MSL" | "NAVD";
  units: "english" | "metric";
  time_zone: "lst_ldt" | "gmt";
  format: "json";
  interval?: "hilo" | "h" | "6";
};
