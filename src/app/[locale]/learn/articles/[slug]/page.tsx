import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Clock, User, ArrowLeft, Tag } from "lucide-react";
import { getArticleBySlug, getArticles } from "@/lib/content";
import { articles as allArticles } from "#content";
import { MDXContent } from "@/components/shared/MDXContent";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return allArticles
    .filter((a) => a.published)
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "learn" });
  const relatedArticles = getArticles(locale as "en" | "es")
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  return (
    <article className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/learn/articles"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("backToArticles")}
        </Link>

        {/* Header */}
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-0.5 font-medium text-primary">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              {t("readingTime", { minutes: article.readingTime })}
            </span>
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="size-4" aria-hidden="true" />
              {t("byAuthor", { author: article.author })}
            </span>
            <span>
              {t("publishedOn", {
                date: new Date(article.date).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
              })}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mt-8 overflow-hidden rounded-2xl">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt ?? ""}
              width={800}
              height={450}
              priority
              sizes="(max-width: 672px) 100vw, 672px"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        {/* MDX Body */}
        <div className="prose prose-lg mt-10 max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary">
          <MDXContent code={article.body} />
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-10 border-t pt-6">
            <div className="flex items-center gap-2">
              <Tag className="size-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-sm font-medium text-muted-foreground">
                {t("tagsLabel")}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 border-t pt-8">
            <h2 className="font-heading text-2xl font-bold">
              {t("relatedArticles")}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/learn/articles/${related.slug}`}
                  className="rounded-xl border border-border/50 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-xs text-muted-foreground">{related.category}</p>
                  <p className="mt-1 font-medium leading-tight hover:text-primary">
                    {related.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
