"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Trash2, Clock, MapPin, GraduationCap } from "lucide-react";

const impactStats = [
  { key: "impactTrash" as const, value: 2500, icon: Trash2, suffix: "+" },
  { key: "impactHours" as const, value: 1200, icon: Clock, suffix: "+" },
  { key: "impactCoastline" as const, value: 45, icon: MapPin, suffix: "" },
  { key: "impactYouth" as const, value: 350, icon: GraduationCap, suffix: "+" },
];

function useCountUp(target: number, isVisible: boolean, duration: number = 2000): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrame: number;

    if (prefersReducedMotion) {
      // Schedule via rAF to avoid synchronous setState in effect
      animationFrame = requestAnimationFrame(() => setCount(target));
      return () => cancelAnimationFrame(animationFrame);
    }

    let startTime: number | null = null;

    function animate(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out curve for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target, duration]);

  return count;
}

function StatCard({
  statKey,
  value,
  icon: Icon,
  suffix,
  isVisible,
}: {
  statKey: "impactTrash" | "impactHours" | "impactCoastline" | "impactYouth";
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  suffix: string;
  isVisible: boolean;
}) {
  const t = useTranslations("home");
  const count = useCountUp(value, isVisible);

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/60 p-6 text-center shadow-sm backdrop-blur-sm dark:bg-white/5">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
        <Icon className="size-6 text-primary" aria-hidden="true" />
      </div>
      <span className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-sm text-muted-foreground">{t(statKey)}</span>
    </div>
  );
}

export function ImpactCounter() {
  const t = useTranslations("home");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-sand-50 px-4 py-20 dark:bg-muted/30 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t("impactHeading")}
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {impactStats.map((stat) => (
            <StatCard
              key={stat.key}
              statKey={stat.key}
              value={stat.value}
              icon={stat.icon}
              suffix={stat.suffix}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
