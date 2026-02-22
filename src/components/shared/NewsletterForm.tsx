"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/app/actions/newsletter";

type FormStatus = "idle" | "submitting" | "success" | "error" | "duplicate";

export function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations("footer");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");

    const result = await subscribeNewsletter(formData);

    setStatus(result.status === "success" ? "success" : result.status === "duplicate" ? "duplicate" : "error");

    if (result.status === "success") {
      formRef.current?.reset();
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-green-600 dark:text-green-400" role="alert">
        {t("newsletterSuccess")}
      </p>
    );
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {t("newsletterPlaceholder")}
        </label>
        <Input
          id="newsletter-email"
          type="email"
          name="email"
          placeholder={t("newsletterPlaceholder")}
          required
          className="h-9 flex-1"
          disabled={status === "submitting"}
          aria-describedby={
            status === "error"
              ? "newsletter-error"
              : status === "duplicate"
                ? "newsletter-duplicate"
                : undefined
          }
        />
        <Button
          type="submit"
          size="sm"
          disabled={status === "submitting"}
          className="h-9"
        >
          <Send className="size-4" />
          <span className="sr-only sm:not-sr-only">{t("newsletterSubmit")}</span>
        </Button>
      </div>
      {status === "error" ? (
        <p
          id="newsletter-error"
          className="text-sm text-destructive"
          role="alert"
        >
          {t("newsletterError")}
        </p>
      ) : null}
      {status === "duplicate" ? (
        <p
          id="newsletter-duplicate"
          className="text-sm text-muted-foreground"
          role="alert"
        >
          {t("newsletterDuplicate")}
        </p>
      ) : null}
    </form>
  );
}
