import type { EventStatus, CapacityStatus } from "@/lib/types/events";

const statusColors: Record<EventStatus, string> = {
  upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  completed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const capacityColors: Record<CapacityStatus["type"], string> = {
  unlimited: "text-green-700 dark:text-green-400",
  available: "text-green-700 dark:text-green-400",
  almost_full: "text-amber-700 dark:text-amber-400",
  waitlist: "text-red-700 dark:text-red-400",
};

interface EventStatusBadgeProps {
  status: EventStatus;
  statusLabel: string;
}

export function EventStatusBadge({ status, statusLabel }: EventStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[status]}`}
    >
      {statusLabel}
    </span>
  );
}

interface EventCapacityBadgeProps {
  capacityStatus: CapacityStatus;
  labels: {
    spotsRemaining: (count: number) => string;
    almostFull: (count: number) => string;
    waitlistOpen: string;
    unlimitedSpots: string;
  };
}

export function EventCapacityBadge({ capacityStatus, labels }: EventCapacityBadgeProps) {
  const color = capacityColors[capacityStatus.type];

  function getText(): string {
    switch (capacityStatus.type) {
      case "unlimited":
        return labels.unlimitedSpots;
      case "available":
        return labels.spotsRemaining(capacityStatus.remaining);
      case "almost_full":
        return labels.almostFull(capacityStatus.remaining);
      case "waitlist":
        return labels.waitlistOpen;
    }
  }

  return (
    <span className={`text-xs font-medium ${color}`}>
      {getText()}
    </span>
  );
}
