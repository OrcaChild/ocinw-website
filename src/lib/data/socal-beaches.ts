import type { BeachLocation } from "@/lib/types/geolocation";
import type { TideStation } from "@/lib/types/tides";

// =============================================================================
// Southern California NOAA Tide Stations (north to south)
// =============================================================================

export const TIDE_STATIONS: TideStation[] = [
  { id: "9410840", name: "Santa Monica", latitude: 34.0083, longitude: -118.5000 },
  { id: "9410660", name: "Los Angeles", latitude: 33.7200, longitude: -118.2720 },
  { id: "9410680", name: "Long Beach", latitude: 33.7517, longitude: -118.2267 },
  { id: "9410580", name: "Newport Bay", latitude: 33.6031, longitude: -117.8831 },
  { id: "9410230", name: "La Jolla", latitude: 32.8669, longitude: -117.2571 },
  { id: "9410170", name: "San Diego", latitude: 32.7142, longitude: -117.1736 },
  { id: "9410120", name: "Imperial Beach", latitude: 32.5792, longitude: -117.1347 },
];

// =============================================================================
// Popular Beach Locations for Quick-Select
// =============================================================================

export const POPULAR_BEACHES: BeachLocation[] = [
  { name: "Santa Monica Beach", nameEs: "Playa de Santa Mónica", latitude: 34.0095, longitude: -118.4970, nearestTideStation: "9410840" },
  { name: "Venice Beach", nameEs: "Playa Venice", latitude: 33.9850, longitude: -118.4695, nearestTideStation: "9410840" },
  { name: "Manhattan Beach", nameEs: "Playa Manhattan", latitude: 33.8847, longitude: -118.4109, nearestTideStation: "9410840" },
  { name: "Redondo Beach", nameEs: "Playa Redondo", latitude: 33.8492, longitude: -118.3884, nearestTideStation: "9410660" },
  { name: "Long Beach", nameEs: "Playa Long Beach", latitude: 33.7601, longitude: -118.1590, nearestTideStation: "9410680" },
  { name: "Huntington Beach", nameEs: "Playa Huntington", latitude: 33.6595, longitude: -117.9988, nearestTideStation: "9410580" },
  { name: "Newport Beach", nameEs: "Playa Newport", latitude: 33.6189, longitude: -117.9289, nearestTideStation: "9410580" },
  { name: "Laguna Beach", nameEs: "Playa Laguna", latitude: 33.5427, longitude: -117.7854, nearestTideStation: "9410580" },
  { name: "Dana Point", nameEs: "Dana Point", latitude: 33.4672, longitude: -117.6981, nearestTideStation: "9410580" },
  { name: "Oceanside", nameEs: "Playa Oceanside", latitude: 33.1959, longitude: -117.3795, nearestTideStation: "9410230" },
  { name: "Carlsbad", nameEs: "Playa Carlsbad", latitude: 33.1581, longitude: -117.3506, nearestTideStation: "9410230" },
  { name: "Encinitas", nameEs: "Playa Encinitas", latitude: 33.0369, longitude: -117.2920, nearestTideStation: "9410230" },
  { name: "Del Mar", nameEs: "Playa Del Mar", latitude: 32.9595, longitude: -117.2653, nearestTideStation: "9410230" },
  { name: "La Jolla", nameEs: "La Jolla", latitude: 32.8328, longitude: -117.2713, nearestTideStation: "9410230" },
  { name: "Mission Beach", nameEs: "Playa Mission", latitude: 32.7710, longitude: -117.2526, nearestTideStation: "9410170" },
  { name: "Ocean Beach", nameEs: "Playa Ocean", latitude: 32.7489, longitude: -117.2494, nearestTideStation: "9410170" },
  { name: "Coronado", nameEs: "Playa Coronado", latitude: 32.6801, longitude: -117.1796, nearestTideStation: "9410170" },
  { name: "Imperial Beach", nameEs: "Playa Imperial", latitude: 32.5837, longitude: -117.1342, nearestTideStation: "9410120" },
];

// =============================================================================
// ZIP Code to Coordinates Lookup (SoCal: 90xxx–92xxx)
// Representative ZIP codes — covers major areas from LA to San Diego
// =============================================================================

export const ZIP_COORDINATES: Record<string, { latitude: number; longitude: number; name: string }> = {
  // Los Angeles County coast
  "90245": { latitude: 33.9164, longitude: -118.3959, name: "El Segundo" },
  "90254": { latitude: 33.8617, longitude: -118.3987, name: "Hermosa Beach" },
  "90266": { latitude: 33.8847, longitude: -118.4109, name: "Manhattan Beach" },
  "90277": { latitude: 33.8339, longitude: -118.3886, name: "Redondo Beach" },
  "90291": { latitude: 33.9925, longitude: -118.4654, name: "Venice" },
  "90292": { latitude: 33.9731, longitude: -118.4510, name: "Marina del Rey" },
  "90401": { latitude: 34.0195, longitude: -118.4912, name: "Santa Monica" },
  "90402": { latitude: 34.0348, longitude: -118.5064, name: "Santa Monica" },
  "90405": { latitude: 34.0049, longitude: -118.4808, name: "Santa Monica" },
  "90744": { latitude: 33.7886, longitude: -118.2649, name: "Wilmington" },
  "90802": { latitude: 33.7687, longitude: -118.1896, name: "Long Beach" },
  "90803": { latitude: 33.7589, longitude: -118.1416, name: "Long Beach" },
  "90813": { latitude: 33.7855, longitude: -118.1838, name: "Long Beach" },
  "90740": { latitude: 33.7596, longitude: -118.0753, name: "Seal Beach" },

  // Orange County coast
  "92646": { latitude: 33.6595, longitude: -117.9988, name: "Huntington Beach" },
  "92647": { latitude: 33.7270, longitude: -118.0015, name: "Huntington Beach" },
  "92648": { latitude: 33.6543, longitude: -118.0013, name: "Huntington Beach" },
  "92660": { latitude: 33.6226, longitude: -117.8781, name: "Newport Beach" },
  "92661": { latitude: 33.6060, longitude: -117.8861, name: "Newport Beach" },
  "92651": { latitude: 33.5427, longitude: -117.7854, name: "Laguna Beach" },
  "92624": { latitude: 33.4603, longitude: -117.6681, name: "Dana Point" },
  "92672": { latitude: 33.4275, longitude: -117.6198, name: "San Clemente" },

  // North San Diego County coast
  "92054": { latitude: 33.1959, longitude: -117.3795, name: "Oceanside" },
  "92008": { latitude: 33.1581, longitude: -117.3506, name: "Carlsbad" },
  "92024": { latitude: 33.0369, longitude: -117.2920, name: "Encinitas" },
  "92075": { latitude: 33.0028, longitude: -117.2706, name: "Solana Beach" },
  "92014": { latitude: 32.9595, longitude: -117.2653, name: "Del Mar" },

  // San Diego County coast
  "92037": { latitude: 32.8328, longitude: -117.2713, name: "La Jolla" },
  "92109": { latitude: 32.7866, longitude: -117.2453, name: "Pacific Beach" },
  "92107": { latitude: 32.7489, longitude: -117.2494, name: "Ocean Beach" },
  "92118": { latitude: 32.6801, longitude: -117.1796, name: "Coronado" },
  "92154": { latitude: 32.5659, longitude: -117.0719, name: "San Ysidro" },
  "91932": { latitude: 32.5837, longitude: -117.1131, name: "Imperial Beach" },

  // Inland major cities (for users checking from home)
  "90001": { latitude: 33.9425, longitude: -118.2551, name: "Los Angeles" },
  "90012": { latitude: 34.0614, longitude: -118.2395, name: "Downtown LA" },
  "90028": { latitude: 34.0983, longitude: -118.3264, name: "Hollywood" },
  "90210": { latitude: 34.0901, longitude: -118.4065, name: "Beverly Hills" },
  "91101": { latitude: 34.1478, longitude: -118.1445, name: "Pasadena" },
  "92101": { latitude: 32.7195, longitude: -117.1628, name: "Downtown San Diego" },
  "92103": { latitude: 32.7468, longitude: -117.1697, name: "Hillcrest" },
  "92071": { latitude: 32.8389, longitude: -116.9683, name: "Santee" },
  "92126": { latitude: 32.9113, longitude: -117.1434, name: "Mira Mesa" },
  "92801": { latitude: 33.8353, longitude: -117.9145, name: "Anaheim" },
  "92602": { latitude: 33.7322, longitude: -117.7954, name: "Irvine" },

  // Inland Empire
  "92530": { latitude: 33.6681, longitude: -117.3273, name: "Lake Elsinore" },
  "92532": { latitude: 33.6826, longitude: -117.2870, name: "Lake Elsinore" },
  "92562": { latitude: 33.5539, longitude: -117.1886, name: "Murrieta" },
  "92590": { latitude: 33.4936, longitude: -117.1484, name: "Temecula" },
  "92592": { latitude: 33.4758, longitude: -117.0869, name: "Temecula" },
  "92879": { latitude: 33.8616, longitude: -117.5649, name: "Corona" },
  "92882": { latitude: 33.8753, longitude: -117.6089, name: "Corona" },
  "92570": { latitude: 33.7781, longitude: -117.2264, name: "Perris" },
  "92553": { latitude: 33.9175, longitude: -117.2533, name: "Moreno Valley" },
  "92501": { latitude: 33.9806, longitude: -117.3755, name: "Riverside" },
  "92503": { latitude: 33.9256, longitude: -117.4463, name: "Riverside" },
  "91730": { latitude: 34.1064, longitude: -117.5931, name: "Rancho Cucamonga" },
  "92336": { latitude: 34.1454, longitude: -117.4502, name: "Fontana" },
  "92408": { latitude: 34.1083, longitude: -117.2898, name: "San Bernardino" },
};
