import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("teamTitle"),
    description: t("teamDescription"),
  };
}

type TeamMember = {
  name: string;
  title: string;
  bio: string;
};

const boardMembers: TeamMember[] = [
  {
    name: "Jordyn Rosario",
    title: "Founder & Executive Director",
    bio: "Passionate about ocean conservation since childhood, Jordyn founded OCINW to empower young people to protect aquatic ecosystems.",
  },
];

const youthCouncil: TeamMember[] = [
  {
    name: "Youth Member 1",
    title: "Youth Advisory Council",
    bio: "Placeholder — real profiles coming soon.",
  },
  {
    name: "Youth Member 2",
    title: "Youth Advisory Council",
    bio: "Placeholder — real profiles coming soon.",
  },
];

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <Card>
      <CardContent className="flex items-start gap-4 p-6">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ocean-50 dark:bg-ocean-950/30">
          <User className="size-7 text-ocean-600 dark:text-ocean-400" />
        </div>
        <div>
          <h3 className="font-heading font-semibold">{member.name}</h3>
          <p className="text-sm text-primary">{member.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <TeamContent />;
}

function TeamContent() {
  const t = useTranslations("about");

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Sub-navigation */}
      <nav className="mb-8 flex gap-4 text-sm" aria-label="About section navigation">
        <Link href="/about" className="text-muted-foreground hover:text-foreground">
          {t("subNavAbout")}
        </Link>
        <Link href="/about/mission" className="text-muted-foreground hover:text-foreground">
          {t("subNavMission")}
        </Link>
        <span className="font-semibold text-foreground">{t("subNavTeam")}</span>
      </nav>

      <h1 className="font-heading text-4xl font-bold tracking-tight">
        {t("teamTitle")}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("teamDescription")}</p>

      {/* Board of Directors */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">
          {t("teamBoardHeading")}
        </h2>
        <div className="mt-6 space-y-4">
          {boardMembers.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Youth Advisory Council */}
      <section>
        <h2 className="font-heading text-2xl font-bold">
          {t("teamYouthHeading")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {youthCouncil.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Join CTA */}
      <section className="text-center">
        <h2 className="font-heading text-2xl font-bold">{t("teamJoinCta")}</h2>
        <p className="mt-3 text-muted-foreground">{t("teamJoinDescription")}</p>
        <Button asChild className="mt-6">
          <Link href="/volunteer">{t("teamJoinCta")}</Link>
        </Button>
      </section>
    </div>
  );
}
