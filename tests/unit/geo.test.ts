// =============================================================================
// Geographic Utility Tests — 90% coverage target
// Source: src/lib/utils/geo.ts
// =============================================================================

import { haversineDistance, findNearestStation } from "@/lib/utils/geo";
import { mockTideStations } from "../fixtures";

// ---------------------------------------------------------------------------
// haversineDistance
// ---------------------------------------------------------------------------

describe("haversineDistance", () => {
  it("returns 0 for same coordinates", () => {
    expect(haversineDistance(34.01, -118.49, 34.01, -118.49)).toBe(0);
  });

  it("returns correct distance between LA and San Diego (~178km)", () => {
    // Los Angeles: 34.0522, -118.2437
    // San Diego: 32.7157, -117.1611
    const dist = haversineDistance(34.0522, -118.2437, 32.7157, -117.1611);
    expect(dist).toBeCloseTo(178, -1); // within 10km
  });

  it("returns correct distance between Santa Monica and Long Beach (~38km)", () => {
    const dist = haversineDistance(34.0195, -118.4912, 33.7701, -118.1937);
    expect(dist).toBeCloseTo(38, -1);
  });

  it("is commutative (A→B equals B→A)", () => {
    const ab = haversineDistance(34.01, -118.49, 32.71, -117.17);
    const ba = haversineDistance(32.71, -117.17, 34.01, -118.49);
    expect(ab).toBeCloseTo(ba, 10);
  });

  it("handles negative longitudes correctly", () => {
    // Both in Western hemisphere (SoCal)
    const dist = haversineDistance(34.01, -118.49, 33.72, -118.27);
    expect(dist).toBeGreaterThan(0);
    expect(dist).toBeLessThan(100); // Should be within SoCal
  });
});

// ---------------------------------------------------------------------------
// findNearestStation
// ---------------------------------------------------------------------------

describe("findNearestStation", () => {
  it("returns the closest station from a list", () => {
    // Santa Monica coordinates → should find Santa Monica station
    const nearest = findNearestStation(34.0195, -118.4912, mockTideStations);
    expect(nearest.id).toBe("9410840"); // Santa Monica
  });

  it("returns San Diego station for San Diego coordinates", () => {
    const nearest = findNearestStation(32.72, -117.17, mockTideStations);
    expect(nearest.id).toBe("9410170"); // San Diego
  });

  it("returns the only station when list has one entry", () => {
    const single = [mockTideStations[0]!];
    const nearest = findNearestStation(32.72, -117.17, single);
    expect(nearest.id).toBe("9410840");
  });

  it("throws for empty stations array", () => {
    expect(() => findNearestStation(34.01, -118.49, [])).toThrow(
      "No tide stations available",
    );
  });
});
