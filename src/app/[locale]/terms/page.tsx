import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { FileWarning } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("termsTitle"),
    description: t("termsDescription"),
  };
}

const sections = [
  { heading: "termsIntroHeading" as const, text: "termsIntroText" as const },
  { heading: "termsUseHeading" as const, text: "termsUseText" as const },
  { heading: "termsContentHeading" as const, text: "termsContentText" as const },
  { heading: "termsDonationsHeading" as const, text: "termsDonationsText" as const },
  { heading: "termsLiabilityHeading" as const, text: "termsLiabilityText" as const },
  { heading: "termsGoverningHeading" as const, text: "termsGoverningText" as const },
  { heading: "termsContactHeading" as const, text: "termsContactText" as const },
];

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations("legal");
  const tCommon = useTranslations("common");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Alert className="mb-8">
        <FileWarning className="size-4" />
        <AlertDescription>{t("termsDraftNotice")}</AlertDescription>
      </Alert>

      <h1 className="font-heading text-4xl font-bold tracking-tight">
        {t("termsTitle")}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {tCommon("lastUpdated", { date: "February 2026" })}
      </p>
      <p className="mt-4 text-muted-foreground">{t("termsDescription")}</p>

      {sections.map((section, index) => (
        <section key={section.heading}>
          {index > 0 && <Separator className="my-8" />}
          <h2 className="mt-8 font-heading text-xl font-bold">
            {t(section.heading)}
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {t(section.text)}
          </p>
        </section>
      ))}
    </div>
  );
}
