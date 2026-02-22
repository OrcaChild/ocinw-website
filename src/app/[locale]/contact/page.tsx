import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactForm } from "@/components/shared/ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const faqKeys = [1, 2, 3, 4, 5] as const;

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        {/* Contact form — 2/3 width */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 font-heading text-2xl font-bold">
            {t("formHeading")}
          </h2>
          <ContactForm />
        </div>

        {/* Sidebar — 1/3 width */}
        <div>
          <h2 className="mb-6 font-heading text-2xl font-bold">
            {t("infoHeading")}
          </h2>
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{t("infoEmailLabel")}</p>
                  <a
                    href={`mailto:${t("infoEmail")}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {t("infoEmail")}
                  </a>
                </div>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">{t("infoSocial")}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-16" />

      {/* FAQ */}
      <section>
        <h2 className="mb-8 font-heading text-2xl font-bold">
          {t("faqHeading")}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqKeys.map((num) => (
            <AccordionItem key={num} value={`faq-${num}`}>
              <AccordionTrigger className="text-left">
                {t(`faq${num}Question`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t(`faq${num}Answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
