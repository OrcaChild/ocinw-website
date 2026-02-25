import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { getArticles } from "@/lib/content";
import { ArticleCard } from "@/components/education/ArticleCard";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "learn" });
  return {
    title: t("articlesHeading"),
    description: t("articlesPageDescription"),
  };
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ArticlesContent locale={locale as "en" | "es"} />;
}

function ArticlesContent({ locale }: { locale: "en" | "es" }) {
  const t = useTranslations("learn");
  const articles = getArticles(locale);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("articlesHeading")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t("articlesPageDescription")}
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            {t("noArticles")}
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                readingTimeLabel={t("readingTime", { minutes: article.readingTime })}
                readArticleLabel={t("readArticle")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
