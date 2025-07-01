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
  | "claimed";

interface LicenseTerm {
  term: string;
  description: string;
}

export interface UsageExample {
  id: string;
  title: string;
  description: string;
  icon: string;
  revenue: number;
  volume: string;
  color: string;
}
