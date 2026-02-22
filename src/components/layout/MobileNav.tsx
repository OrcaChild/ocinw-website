"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {children}
    </Link>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label={t("openMenu")}
        className="size-9"
      >
        <Menu className="size-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[300px] overflow-y-auto p-0">
          <SheetHeader className="border-b px-4 py-4">
            <SheetTitle className="text-left font-heading text-lg">
              {t("home")}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {t("openMenu")}
            </SheetDescription>
          </SheetHeader>

          {/* Donate CTA at top */}
          <div className="border-b px-4 py-3">
            <Button
              asChild
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={closeMenu}
            >
              <Link href="/donate">
                <Heart className="size-4" />
                {t("donate")}
              </Link>
            </Button>
          </div>

          <nav className="flex flex-col px-2 py-2" aria-label="Mobile navigation">
            <Accordion type="multiple" className="w-full">
              {/* About */}
              <AccordionItem value="about" className="border-b-0">
                <AccordionTrigger className="px-3 py-2 text-sm font-medium hover:no-underline">
                  {t("about")}
                </AccordionTrigger>
                <AccordionContent className="pb-1 pl-3">
                  <MobileLink href="/about" onClick={closeMenu}>
                    {t("about")}
                  </MobileLink>
                  <MobileLink href="/about/mission" onClick={closeMenu}>
                    {t("aboutMission")}
                  </MobileLink>
                  <MobileLink href="/about/team" onClick={closeMenu}>
                    {t("aboutTeam")}
                  </MobileLink>
                </AccordionContent>
              </AccordionItem>

              {/* Weather & Tides */}
              <div className="px-3 py-2">
                <MobileLink href="/weather" onClick={closeMenu}>
                  {t("weather")}
                </MobileLink>
              </div>

              {/* Learn */}
              <AccordionItem value="learn" className="border-b-0">
                <AccordionTrigger className="px-3 py-2 text-sm font-medium hover:no-underline">
                  {t("education")}
                </AccordionTrigger>
                <AccordionContent className="pb-1 pl-3">
                  <MobileLink href="/learn/articles" onClick={closeMenu}>
                    {t("educationArticles")}
                  </MobileLink>
                  <MobileLink href="/learn/species" onClick={closeMenu}>
                    {t("educationSpecies")}
                  </MobileLink>
                  <MobileLink href="/learn/ecosystems" onClick={closeMenu}>
                    {t("educationEcosystems")}
                  </MobileLink>
                </AccordionContent>
              </AccordionItem>

              {/* Conservation */}
              <AccordionItem value="conservation" className="border-b-0">
                <AccordionTrigger className="px-3 py-2 text-sm font-medium hover:no-underline">
                  {t("conservation")}
                </AccordionTrigger>
                <AccordionContent className="pb-1 pl-3">
                  <MobileLink href="/conservation/projects" onClick={closeMenu}>
                    {t("conservationProjects")}
                  </MobileLink>
                  <MobileLink href="/conservation/events" onClick={closeMenu}>
                    {t("conservationEvents")}
                  </MobileLink>
                  <MobileLink href="/conservation/impact" onClick={closeMenu}>
                    {t("conservationImpact")}
                  </MobileLink>
                </AccordionContent>
              </AccordionItem>

              {/* Volunteer */}
              <div className="px-3 py-2">
                <MobileLink href="/volunteer" onClick={closeMenu}>
                  {t("volunteer")}
                </MobileLink>
              </div>

              {/* Contact */}
              <div className="px-3 py-2">
                <MobileLink href="/contact" onClick={closeMenu}>
                  {t("contact")}
                </MobileLink>
              </div>
            </Accordion>
          </nav>

          {/* Language & Theme toggles */}
          <div className="mt-auto border-t px-4 py-3">
            <div className="flex items-center justify-between">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
