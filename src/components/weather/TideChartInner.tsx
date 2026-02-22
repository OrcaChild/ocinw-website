"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { formatTideHeight, formatTime } from "@/lib/utils/weather-format";

export type ChartDataPoint = {
  time: string;
  timeLabel: string;
  height: number;
};

type TideChartInnerProps = {
  chartData: ChartDataPoint[];
  nowLabel: string;
};

export default function TideChartInner({ chartData, nowLabel }: TideChartInnerProps) {
  const currentTimeLabel = formatTime(new Date().toISOString());

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 10, bottom: 0, left: -10 }}
      >
        <defs>
          <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis
          dataKey="timeLabel"
          tick={{ fontSize: 11 }}
          interval="preserveStartEnd"
          tickCount={8}
        />
        <YAxis
          tick={{ fontSize: 11 }}
          tickFormatter={(v: number) => `${v}ft`}
          domain={["dataMin - 0.5", "dataMax + 0.5"]}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.[0]) return null;
            const point = payload[0].payload as ChartDataPoint;
            return (
              <div className="rounded-md border bg-popover p-2 text-sm shadow-md">
                <p className="font-medium">{point.timeLabel}</p>
                <p className="text-muted-foreground">
                  {formatTideHeight(point.height)}
                </p>
              </div>
            );
          }}
        />
        <ReferenceLine
          x={currentTimeLabel}
          stroke="hsl(0, 70%, 50%)"
          strokeDasharray="4 4"
          label={{ value: nowLabel, position: "top", fontSize: 11 }}
        />
        <Area
          type="monotone"
          dataKey="height"
          stroke="hsl(200, 80%, 50%)"
          strokeWidth={2}
          fill="url(#tideGradient)"
          dot={false}
          activeDot={{ r: 4, fill: "hsl(200, 80%, 50%)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
