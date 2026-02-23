// =============================================================================
// Geographic Utilities — Haversine distance, nearest station lookup
// =============================================================================

import type { TideStation } from "@/lib/types/tides";

const EARTH_RADIUS_KM = 6371;

/**
 * Calculate the Haversine distance between two coordinates (in km).
 * Used to find the nearest NOAA tide station to the user's location.
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/**
 * Find the nearest NOAA tide station to given coordinates.
 */
export function findNearestStation(
  latitude: number,
  longitude: number,
  stations: TideStation[],
): TideStation {
  let nearest: TideStation | undefined;
  let minDist = Infinity;

  for (const station of stations) {
    const dist = haversineDistance(latitude, longitude, station.latitude, station.longitude);
    if (dist < minDist) {
      minDist = dist;
      nearest = station;
    }
  }

  if (!nearest) {
    throw new Error("No tide stations available");
  }

  return nearest;
}
