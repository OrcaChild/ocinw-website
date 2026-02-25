import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MapPin } from "lucide-react";
import type { Ecosystem } from "#content";

interface EcosystemCardProps {
  ecosystem: Ecosystem;
  viewLabel: string;
}

export function EcosystemCard({ ecosystem, viewLabel }: EcosystemCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-card">
      {ecosystem.featuredImage && (
        <Link href={`/learn/ecosystems/${ecosystem.slug}`} className="block overflow-hidden">
          <Image
            src={ecosystem.featuredImage}
            alt={ecosystem.featuredImageAlt ?? ""}
            width={600}
            height={340}
            className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="p-5">
        <span className="rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-medium text-teal-700 dark:text-teal-300">
          {ecosystem.type}
        </span>
        <h3 className="mt-3 font-heading text-lg font-bold leading-tight">
          <Link
            href={`/learn/ecosystems/${ecosystem.slug}`}
            className="hover:text-primary"
          >
            {ecosystem.title}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {ecosystem.location}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {ecosystem.keySpecies.slice(0, 4).map((sp) => (
            <span
              key={sp}
              className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {sp}
            </span>
          ))}
          {ecosystem.keySpecies.length > 4 && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              +{ecosystem.keySpecies.length - 4}
            </span>
          )}
        </div>
        <div className="mt-4">
          <Link
            href={`/learn/ecosystems/${ecosystem.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {viewLabel} &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
