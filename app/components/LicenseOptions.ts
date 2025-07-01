import { LicenseOption } from "./types";

export const licenseOptions: LicenseOption[] = [
  {
    id: "open-use",
    title: "Open Use",
    tag: "Least restrictive",
    description: "For free distribution and remixing without restriction",
    icon: "lock-open",
    colors: {
      border: "border-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      text: "text-indigo-700 dark:text-indigo-400",
      iconColor: "#6366f1",
    },
    revShare: 0,
  },
  {
    id: "non-commercial",
    title: "Non-Commercial",
    tag: "Get credit for your work",
    description: "Anyone can use your work for non-commercial projects",
    icon: "book",
    colors: {
      border: "border-purple-500",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      text: "text-purple-700 dark:text-purple-400",
      iconColor: "#8b5cf6",
    },
    revShare: 0,
  },
  {
    id: "commercial",
    title: "Commercial Use",
    tag: "Get paid for your work!",
    description: "Allow others to use your work at your terms",
    icon: "dollar",
    colors: {
      border: "border-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      text: "text-emerald-700 dark:text-emerald-400",
      iconColor: "#10b981",
    },
    revShare: 5,
  },
  {
    id: "commercial-remix",
    title: "Commercial Remix",
    tag: "Get paid & get credit!",
    description: "Let others remix your work while you get paid",
    icon: "sparkles",
    colors: {
      border: "border-violet-500",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      text: "text-violet-700 dark:text-violet-400",
      iconColor: "#7c3aed",
    },
    revShare: 10,
  },
];
