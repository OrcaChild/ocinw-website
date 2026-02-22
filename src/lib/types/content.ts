/** Species profile for conservation pages */
export type Species = {
  id: string;
  commonName: string;
  scientificName: string;
  status: "endangered" | "threatened" | "vulnerable" | "near-threatened" | "least-concern";
  habitat: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  funFacts: string[];
};

/** Ecosystem profile */
export type Ecosystem = {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  species: string[]; // species IDs
  threats: string[];
  conservationEfforts: string[];
};

/** Article/blog post */
export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  imageUrl?: string;
  imageAlt?: string;
};

/** Event listing */
export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  latitude?: number;
  longitude?: number;
  maxParticipants?: number;
  currentParticipants: number;
  requiresWaiver: boolean;
  minAge?: number;
  tags: string[];
};

/** Conservation project */
export type Project = {
  id: string;
  title: string;
  description: string;
  status: "planning" | "active" | "completed";
  startDate: string;
  endDate?: string;
  location: string;
  imageUrl?: string;
  imageAlt?: string;
  volunteerCount: number;
};
