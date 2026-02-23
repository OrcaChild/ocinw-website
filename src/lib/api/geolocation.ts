// =============================================================================
// Geolocation API — Browser GPS + ZIP code fallback
// Provides location data for weather and tide lookups.
// =============================================================================

import { z } from "zod/v4";
import type { LocationState } from "@/lib/types/geolocation";
import { ZIP_COORDINATES } from "@/lib/data/socal-beaches";

const STORAGE_KEY = "ocinw-location";
const GEO_TIMEOUT_MS = 10_000;

// ---------------------------------------------------------------------------
// Browser Geolocation
// ---------------------------------------------------------------------------

/**
 * Request the user's location via the browser Geolocation API.
 * Returns coordinates or throws on denial/timeout/unavailability.
 */
export function requestBrowserLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Location access denied. Please use ZIP code instead."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location unavailable. Please enter a ZIP code."));
            break;
          case error.TIMEOUT:
            reject(new Error("Location request timed out. Please enter a ZIP code."));
            break;
          default:
            reject(new Error("Could not determine location. Please enter a ZIP code."));
        }
      },
      {
        enableHighAccuracy: false, // City-level is sufficient for weather
        timeout: GEO_TIMEOUT_MS,
        maximumAge: 5 * 60 * 1000, // Accept cached positions up to 5 minutes old
      },
    );
  });
}

// ---------------------------------------------------------------------------
// Reverse Geocoding — Resolve GPS coordinates to a city/area name
// Uses Nominatim (OpenStreetMap), free with no API key.
// ---------------------------------------------------------------------------

const REVERSE_GEO_TIMEOUT_MS = 5_000;

/** Zod schema for Nominatim reverse geocoding response */
const nominatimResponseSchema = z.object({
  address: z.object({
    city: z.string().optional(),
    town: z.string().optional(),
    village: z.string().optional(),
    suburb: z.string().optional(),
    county: z.string().optional(),
  }).optional(),
});

/**
 * Reverse-geocode coordinates to a human-readable location name.
 * Returns the city/town name, or null on failure (non-critical).
 */
export async function reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REVERSE_GEO_TIMEOUT_MS);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
      {
        signal: controller.signal,
        headers: { "User-Agent": "OrcaChildInTheWild/1.0" },
      },
    );
    clearTimeout(timeout);

    if (!response.ok) return null;

    const json: unknown = await response.json();
    const parsed = nominatimResponseSchema.safeParse(json);
    if (!parsed.success) return null;

    const addr = parsed.data.address;
    if (!addr) return null;

    // Prefer city > town > village > suburb > county
    return addr.city ?? addr.town ?? addr.village ?? addr.suburb ?? addr.county ?? null;
  } catch {
    // Reverse geocoding is non-critical — fall back gracefully
    return null;
  }
}

// ---------------------------------------------------------------------------
// ZIP Code Lookup
// ---------------------------------------------------------------------------

/**
 * Convert a 5-digit US ZIP code to coordinates.
 * Returns null if the ZIP code is not in our SoCal lookup table.
 */
export function lookupZipCode(zip: string): { latitude: number; longitude: number; name: string } | null {
  const trimmed = zip.trim();
  if (!/^\d{5}$/.test(trimmed)) return null;

  const entry = ZIP_COORDINATES[trimmed];
  return entry ?? null;
}

/**
 * Validate ZIP code format (5 digits, starts with 90-92 for SoCal).
 */
export function isValidSoCalZip(zip: string): boolean {
  if (!/^\d{5}$/.test(zip)) return false;
  const prefix = parseInt(zip.substring(0, 2), 10);
  return prefix >= 90 && prefix <= 92;
}

// ---------------------------------------------------------------------------
// Location Persistence (localStorage)
// ---------------------------------------------------------------------------

/**
 * Save location to localStorage for return visits.
 */
export function saveLocation(location: LocationState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
  } catch {
    // localStorage may be unavailable (incognito, full storage, etc.)
  }
}

/**
 * Load previously saved location from localStorage.
 */
export function loadSavedLocation(): LocationState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as LocationState;
  } catch {
    return null;
  }
}

/**
 * Clear saved location.
 */
export function clearSavedLocation(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
