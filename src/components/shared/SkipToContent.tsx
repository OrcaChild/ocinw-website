"use client";

import { useTranslations } from "next-intl";

export function SkipToContent() {
  const t = useTranslations("nav");

  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      {t("skipToContent")}
    </a>
  );
}
