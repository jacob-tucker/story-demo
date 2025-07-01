import { UsageExample } from "./types";

export const usageExamples: UsageExample[] = [
  {
    id: "merchandise",
    title: "Merchandise Sales",
    description: "Licensed merchandise using your IP",
    icon: "shirt",
    revenue: 12500,
    volume: "2.5K",
    color: "#22c55e",
    platform: {
      name: "Ablo",
      url: "https://ablo.ai/",
    },
  },
  {
    id: "staking",
    title: "IP Staking",
    description: "Earn rewards by staking your IP",
    icon: "gem",
    revenue: 8750,
    volume: "1.2K",
    color: "#3b82f6",
    platform: {
      name: "Verio",
      url: "https://www.verio.network/",
    },
  },
  {
    id: "remix",
    title: "Remix Licensing",
    description: "Others creating derivatives of your work",
    icon: "palette",
    revenue: 6250,
    volume: "850",
    color: "#f59e0b",
    platform: {
      name: "Magma",
      url: "https://magma.com/",
    },
  },
];
