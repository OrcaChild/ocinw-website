import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  Sun,
  type LucideProps,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudLightning,
};

type WeatherIconProps = LucideProps & {
  iconName: string;
};

/**
 * Renders the appropriate Lucide icon for a WMO weather code icon name.
 */
export function WeatherIcon({ iconName, ...props }: WeatherIconProps) {
  const Icon = ICON_MAP[iconName] ?? Cloud;
  return <Icon {...props} />;
}
