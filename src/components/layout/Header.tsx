"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("common");

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-shadow",
        scrolled && "shadow-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-bold text-primary transition-colors hover:text-primary/80"
          aria-label={t("siteName")}
        >
          <Waves className="size-6 text-primary" aria-hidden="true" />
          <span className="hidden sm:inline">{t("siteName")}</span>
          <span className="sm:hidden">OCINW</span>
        </Link>

        {/* Desktop navigation */}
        <DesktopNav />

        {/* Right side: language toggle + theme toggle (desktop) + mobile hamburger */}
        <div className="flex items-center gap-1">
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
