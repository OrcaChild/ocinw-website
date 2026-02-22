"use client";

// =============================================================================
// useTides Hook — Fetches and caches tide data for a location
// Supports station override for the live beach switcher.
// =============================================================================

import { useCallback, useEffect, useReducer, useRef } from "react";
import type { TideData } from "@/lib/types/tides";
import { getTideData, getTideDataForStation } from "@/lib/api/tides";
import { TIDE_STATIONS } from "@/lib/data/socal-beaches";

type TideState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: TideData }
  | { status: "error"; message: string };

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; data: TideData }
  | { type: "FETCH_ERROR"; message: string }
  | { type: "RESET" };

function reducer(_state: TideState, action: Action): TideState {
  switch (action.type) {
    case "FETCH_START":
      return { status: "loading" };
    case "FETCH_SUCCESS":
      return { status: "success", data: action.data };
    case "FETCH_ERROR":
      return { status: "error", message: action.message };
    case "RESET":
      return { status: "idle" };
  }
}

function findStationById(id: string) {
  return TIDE_STATIONS.find((s) => s.id === id);
}

/**
 * Fetch tide data for coordinates, or a specific station override.
 * When stationId is provided, fetches data for that station instead
 * of the nearest one to the coordinates.
 */
export function useTides(
  latitude: number | null,
  longitude: number | null,
  stationId?: string | null,
) {
  const [fetchState, dispatch] = useReducer(reducer, { status: "idle" });
  const fetchIdRef = useRef(0);

  useEffect(() => {
    if (latitude === null || longitude === null) return;

    const id = ++fetchIdRef.current;
    dispatch({ type: "FETCH_START" });

    const station = stationId ? findStationById(stationId) : undefined;
    const fetchPromise = station
      ? getTideDataForStation(station)
      : getTideData(latitude, longitude);

    fetchPromise.then(
      (data) => {
        if (fetchIdRef.current === id) {
          dispatch({ type: "FETCH_SUCCESS", data });
        }
      },
      (err: unknown) => {
        if (fetchIdRef.current === id) {
          dispatch({
            type: "FETCH_ERROR",
            message: err instanceof Error ? err.message : "Failed to load tide data",
          });
        }
      },
    );
  }, [latitude, longitude, stationId]);

  const refetch = useCallback(() => {
    if (latitude === null || longitude === null) return;

    const id = ++fetchIdRef.current;
    dispatch({ type: "FETCH_START" });

    const station = stationId ? findStationById(stationId) : undefined;
    const fetchPromise = station
      ? getTideDataForStation(station)
      : getTideData(latitude, longitude);

    fetchPromise.then(
      (data) => {
        if (fetchIdRef.current === id) {
          dispatch({ type: "FETCH_SUCCESS", data });
        }
      },
      (err: unknown) => {
        if (fetchIdRef.current === id) {
          dispatch({
            type: "FETCH_ERROR",
            message: err instanceof Error ? err.message : "Failed to load tide data",
          });
        }
      },
    );
  }, [latitude, longitude, stationId]);

  const hasCoords = latitude !== null && longitude !== null;
  const state = hasCoords ? fetchState : ({ status: "idle" } as const);

  return { ...state, refetch };
}
