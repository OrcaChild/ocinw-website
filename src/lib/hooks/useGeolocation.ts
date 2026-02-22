"use client";

// =============================================================================
// useGeolocation Hook — Manages location state for weather/tide components
// Supports browser GPS, ZIP code fallback, manual beach selection.
// Persists location across page navigations and return visits.
// =============================================================================

import { useState, useCallback, useEffect } from "react";
import type { LocationState, LocationSource } from "@/lib/types/geolocation";
import {
  requestBrowserLocation,
  reverseGeocode,
  lookupZipCode,
  saveLocation,
  loadSavedLocation,
  clearSavedLocation,
} from "@/lib/api/geolocation";

const DEFAULT_STATE: LocationState = {
  latitude: null,
  longitude: null,
  locationName: null,
  source: null,
  loading: false,
  error: null,
};

export function useGeolocation() {
  const [state, setState] = useState<LocationState>(DEFAULT_STATE);

  // Load saved location on mount
  useEffect(() => {
    const saved = loadSavedLocation();
    if (saved && saved.latitude !== null && saved.longitude !== null) {
      setState({ ...saved, loading: false, error: null });
    }
  }, []);

  // Persist location whenever it changes (only save settled states)
  useEffect(() => {
    if (state.latitude !== null && state.longitude !== null && !state.loading && !state.error) {
      saveLocation(state);
    }
  }, [state]);

  /**
   * Request location from browser GPS.
   */
  const requestLocation = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const coords = await requestBrowserLocation();
      // Resolve city name in parallel (non-blocking — don't delay weather loading)
      const locationName = await reverseGeocode(coords.latitude, coords.longitude);
      setState({
        latitude: coords.latitude,
        longitude: coords.longitude,
        locationName,
        source: "gps",
        loading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Could not get location",
      }));
    }
  }, []);

  /**
   * Set location from a ZIP code.
   */
  const setZipCode = useCallback((zip: string) => {
    const result = lookupZipCode(zip);
    if (result) {
      setState({
        latitude: result.latitude,
        longitude: result.longitude,
        locationName: result.name,
        source: "zip",
        loading: false,
        error: null,
      });
    } else {
      setState((prev) => ({
        ...prev,
        error: "ZIP code not found. Try a Southern California ZIP (90xxx–92xxx).",
      }));
    }
  }, []);

  /**
   * Set location manually (from popular beaches list).
   */
  const setManualLocation = useCallback(
    (latitude: number, longitude: number, name: string, source: LocationSource = "manual") => {
      setState({
        latitude,
        longitude,
        locationName: name,
        source,
        loading: false,
        error: null,
      });
    },
    [],
  );

  /**
   * Clear location and reset to default state.
   */
  const clearLocation = useCallback(() => {
    clearSavedLocation();
    setState(DEFAULT_STATE);
  }, []);

  const hasLocation = state.latitude !== null && state.longitude !== null;

  return {
    ...state,
    hasLocation,
    requestLocation,
    setZipCode,
    setManualLocation,
    clearLocation,
  };
}
