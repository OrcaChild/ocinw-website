"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
      <Link href={href}>{children}</Link>
    </NavigationMenuLink>
  );
}

function DropdownLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {description ? (
            <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          ) : null}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function DesktopNav() {
  const t = useTranslations("nav");

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {/* About dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("about")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[280px] gap-1 p-2">
              <DropdownLink href="/about" title={t("about")} />
              <DropdownLink href="/about/mission" title={t("aboutMission")} />
              <DropdownLink href="/about/team" title={t("aboutTeam")} />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Weather & Tides - single link */}
        <NavigationMenuItem>
          <NavLink href="/weather">{t("weather")}</NavLink>
        </NavigationMenuItem>

        {/* Learn dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("education")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[280px] gap-1 p-2">
              <DropdownLink
                href="/learn/articles"
                title={t("educationArticles")}
              />
              <DropdownLink
                href="/learn/species"
                title={t("educationSpecies")}
              />
              <DropdownLink
                href="/learn/ecosystems"
                title={t("educationEcosystems")}
              />
              <DropdownLink
                href="/learn/resources"
                title={t("educationResources")}
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Conservation dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("conservation")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[280px] gap-1 p-2">
              <DropdownLink
                href="/conservation/events"
                title={t("conservationEvents")}
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Volunteer - single link */}
        <NavigationMenuItem>
          <NavLink href="/volunteer">{t("volunteer")}</NavLink>
        </NavigationMenuItem>

        {/* Donate CTA */}
        <NavigationMenuItem>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/donate">
              <Heart className="size-4" aria-hidden="true" />
              {t("donate")}
            </Link>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
