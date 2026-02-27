import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MapPin, Calendar } from "lucide-react";
import type { Project } from "#content";

const statusColors = {
  planned: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  completed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
} as const;

interface ProjectCardProps {
  project: Project;
  viewLabel: string;
  statusLabel: string;
}

export function ProjectCard({ project, viewLabel, statusLabel }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-card">
      {project.featuredImage && (
        <Link href={`/conservation/projects/${project.slug}`} className="block overflow-hidden">
          <Image
            src={project.featuredImage}
            alt={project.featuredImageAlt ?? ""}
            width={600}
            height={340}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[project.status]}`}>
            {statusLabel}
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {project.type}
          </span>
        </div>
        <h3 className="mt-3 font-heading text-lg font-bold leading-tight">
          <Link
            href={`/conservation/projects/${project.slug}`}
            className="hover:text-primary"
          >
            {project.title}
          </Link>
        </h3>
        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {project.location}
          </p>
          {project.frequency && (
            <p className="flex items-center gap-1">
              <Calendar className="size-3.5 shrink-0" aria-hidden="true" />
              {project.frequency}
            </p>
          )}
        </div>
        {project.impactMetrics && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {project.impactMetrics.volunteersEngaged > 0 && (
              <div className="rounded-lg bg-muted/50 px-2 py-1 text-center">
                <p className="text-lg font-bold text-primary">{project.impactMetrics.volunteersEngaged}</p>
                <p className="text-[10px] text-muted-foreground">volunteers</p>
              </div>
            )}
            {project.impactMetrics.trashCollected > 0 && (
              <div className="rounded-lg bg-muted/50 px-2 py-1 text-center">
                <p className="text-lg font-bold text-primary">{project.impactMetrics.trashCollected.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">lbs collected</p>
              </div>
            )}
          </div>
        )}
        <div className="mt-4">
          <Link
            href={`/conservation/projects/${project.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {viewLabel} &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
