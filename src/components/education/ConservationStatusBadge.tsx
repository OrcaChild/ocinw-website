import { cn } from "@/lib/utils";

const statusConfig = {
  "Least Concern": { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-800 dark:text-green-300", label: "LC" },
  "Near Threatened": { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-800 dark:text-yellow-300", label: "NT" },
  "Vulnerable": { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-800 dark:text-orange-300", label: "VU" },
  "Endangered": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-800 dark:text-red-300", label: "EN" },
  "Critically Endangered": { bg: "bg-red-200 dark:bg-red-900/50", text: "text-red-900 dark:text-red-200", label: "CR" },
} as const;

type ConservationStatus = keyof typeof statusConfig;

interface ConservationStatusBadgeProps {
  status: ConservationStatus;
  showLabel?: boolean;
  className?: string;
}

export function ConservationStatusBadge({
  status,
  showLabel = true,
  className,
}: ConservationStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.bg,
        config.text,
        className,
      )}
    >
      <span className="font-bold">{config.label}</span>
      {showLabel && <span>{status}</span>}
    </span>
  );
}
