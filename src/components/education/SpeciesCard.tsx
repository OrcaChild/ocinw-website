import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ConservationStatusBadge } from "./ConservationStatusBadge";
import type { Species } from "#content";

interface SpeciesCardProps {
  species: Species;
  viewLabel: string;
}

export function SpeciesCard({ species, viewLabel }: SpeciesCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-card">
      {species.featuredImage && (
        <Link href={`/learn/species/${species.slug}`} className="block overflow-hidden">
          <Image
            src={species.featuredImage}
            alt={species.featuredImageAlt ?? ""}
            width={400}
            height={300}
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="p-5">
        <div className="mb-2">
          <ConservationStatusBadge status={species.conservationStatus} />
        </div>
        <h3 className="font-heading text-lg font-bold leading-tight">
          <Link
            href={`/learn/species/${species.slug}`}
            className="hover:text-primary"
          >
            {species.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm italic text-muted-foreground">
          {species.scientificName}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {species.category}
        </p>
        <div className="mt-4">
          <Link
            href={`/learn/species/${species.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {viewLabel} &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
