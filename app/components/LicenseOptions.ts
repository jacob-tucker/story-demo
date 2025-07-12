import { LicenseOption } from "./types";

export const licenseOptions: LicenseOption[] = [
  {
    id: "open-use",
    title: "Open Use",
    tag: "Least restrictive",
    description: "For free distribution and remixing without restriction",
    icon: "fas fa-unlock",
    colors: {
      border: "border-orange-500",
      bg: "bg-orange-50 dark:bg-orange-500/10",
      text: "text-orange-700 dark:text-orange-400",
      iconColor: "#f97316",
    },
    revShare: 0,
    allowAITraining: true,
  },
  {
    id: "non-commercial",
    title: "Non-Commercial",
    tag: "Get credit for your work",
    description: "Anyone can use your work for non-commercial projects",
    icon: "fas fa-book",
    colors: {
      border: "border-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      text: "text-blue-700 dark:text-blue-400",
      iconColor: "#8b5cf6",
    },
    revShare: 0,
    allowAITraining: true,
  },
  {
    id: "commercial",
    title: "Commercial Use",
    tag: "Get paid for your work!",
    description: "Allow others to use your work at your terms",
    icon: "fas fa-dollar-sign",
    colors: {
      border: "border-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      text: "text-emerald-700 dark:text-emerald-400",
      iconColor: "#10b981",
    },
    revShare: 5,
    allowAITraining: true,
  },
  {
    id: "commercial-remix",
    title: "Commercial Remix",
    tag: "Get paid & get credit!",
    description: "Let others remix your work while you get paid",
    icon: "fas fa-magic",
    colors: {
      border: "border-violet-500",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      text: "text-violet-700 dark:text-violet-400",
      iconColor: "#7c3aed",
    },
    revShare: 10,
    allowAITraining: true,
  },
];
