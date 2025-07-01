import { DemoState } from "./types";

interface SummaryStatsProps {
  demoState: DemoState;
  demoRevenue: number;
  demoRoyalties: number;
}

export function SummaryStats({
  demoState,
  demoRevenue,
  demoRoyalties,
}: SummaryStatsProps) {
  // Hide the summary stats boxes
  return null;
}
