import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Waves } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground transition-colors hover:text-foreground"
      aria-label={label}
    >
      <span className="text-sm">{label.replace(/^Follow us on |^Subscribe on /, "")}</span>
    </a>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="mb-3 flex items-center gap-2 font-heading text-lg font-bold text-primary"
            >
              <Waves className="size-5" aria-hidden="true" />
              {tCommon("siteName")}
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              {tCommon("tagline")}
            </p>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="mb-3 font-heading text-sm font-semibold">
              {t("exploreHeading")}
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/about">{tNav("about")}</FooterLink>
              <FooterLink href="/weather">{tNav("weather")}</FooterLink>
              <FooterLink href="/learn/articles">{tNav("educationArticles")}</FooterLink>
              <FooterLink href="/learn/species">{tNav("educationSpecies")}</FooterLink>
            </ul>
          </div>

          {/* Get Involved links */}
          <div>
            <h3 className="mb-3 font-heading text-sm font-semibold">
              {t("getInvolvedHeading")}
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/volunteer">{tNav("volunteer")}</FooterLink>
              <FooterLink href="/donate">{tNav("donate")}</FooterLink>
              <FooterLink href="/conservation/events">{tNav("conservationEvents")}</FooterLink>
              <FooterLink href="/contact">{tNav("contact")}</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-3 font-heading text-sm font-semibold">
              {t("newsletterHeading")}
            </h3>
            <p className="mb-3 text-sm text-muted-foreground">
              {t("newsletterDescription")}
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Social links */}
        <div className="mt-8 flex flex-wrap gap-4">
          <SocialLink href="https://instagram.com" label={t("socialInstagram")} />
          <SocialLink href="https://tiktok.com" label={t("socialTikTok")} />
          <SocialLink href="https://youtube.com" label={t("socialYouTube")} />
          <SocialLink href="https://facebook.com" label={t("socialFacebook")} />
          <SocialLink href="https://x.com" label={t("socialX")} />
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {t("copyright", { year: currentYear })}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("foundedBy")} &middot; {t("nonprofit")}
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
