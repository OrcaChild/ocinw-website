import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Clock, User } from "lucide-react";
import type { Article } from "#content";

interface ArticleCardProps {
  article: Article;
  readingTimeLabel: string;
  readArticleLabel: string;
}

export function ArticleCard({ article, readingTimeLabel, readArticleLabel }: ArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-card">
      {article.featuredImage && (
        <Link href={`/learn/articles/${article.slug}`} className="block overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt ?? ""}
            width={600}
            height={340}
            className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" aria-hidden="true" />
            {readingTimeLabel}
          </span>
        </div>
        <h3 className="mt-3 font-heading text-lg font-bold leading-tight">
          <Link
            href={`/learn/articles/${article.slug}`}
            className="hover:text-primary"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="size-3" aria-hidden="true" />
            {article.author}
          </span>
          <Link
            href={`/learn/articles/${article.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {readArticleLabel} &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
