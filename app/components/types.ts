export interface LicenseOption {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: string;
  colors: {
    border: string;
    bg: string;
    text: string;
    iconColor: string;
  };
  revShare: number;
}

export type DemoState =
  | "initial"
  | "protecting"
  | "protected"
  | "using"
  | "selling"
  | "earning"
  | "claiming"
  | "claimed"
  | "completed";

export interface UsageExample {
  id: string;
  title: string;
  description: string;
  icon: string;
  revenue: number;
  volume: string;
  color: string;
  platform?: {
    name: string;
    url: string;
  };
}

export interface RemixStream {
  id: string;
  title: string;
  description: string;
  icon: string;
  count: number;
  volume: string;
  color: string;
  platform: {
    name: string;
    url: string;
  };
}

export interface StatsData {
  views: number;
  licenses: number;
  remixes: number;
  earnings: number;
}
