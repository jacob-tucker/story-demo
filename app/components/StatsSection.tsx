import { StatsData, DemoState } from "./types";
import { useState, useEffect } from "react";
import { Icon } from "./Icon";

interface StatsSectionProps {
  demoState: DemoState;
  statsData: StatsData;
  selectedLicense?: string | null;
}

export function StatsSection({
  demoState,
  statsData,
  selectedLicense,
}: StatsSectionProps) {
  const [animatedStats, setAnimatedStats] = useState<StatsData>({
    views: 0,
    licenses: 0,
    remixes: 0,
    earnings: 0,
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate stats counting up
  useEffect(() => {
    if (demoState === "earning") {
      setIsAnimating(true);

      const duration = 2000; // 2 seconds
      const steps = 40; // 40 steps for smooth animation

      const viewsStep = statsData.views / steps;
      const licensesStep = statsData.licenses / steps;
      const remixesStep = statsData.remixes / steps;
      const earningsStep = statsData.earnings / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;

        if (currentStep <= steps) {
          setAnimatedStats({
            views: Math.floor(viewsStep * currentStep),
            licenses: Math.floor(licensesStep * currentStep),
            remixes: Math.floor(remixesStep * currentStep),
            earnings: Math.floor(earningsStep * currentStep),
          });
        } else {
          setAnimatedStats(statsData);
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    } else if (
      demoState === "claiming" ||
      demoState === "claimed" ||
      demoState === "completed"
    ) {
      setAnimatedStats(statsData);
      setIsAnimating(false);
    } else if (demoState === "initial") {
      // Reset everything when demo is restarted
      setAnimatedStats({
        views: 0,
        licenses: 0,
        remixes: 0,
        earnings: 0,
      });
      setIsAnimating(false);
    }
    // During protection states, keep current stats (don't reset)
  }, [
    demoState,
    statsData.views,
    statsData.licenses,
    statsData.remixes,
    statsData.earnings,
  ]);

  // Only show stats during active demo states
  if (
    demoState === "initial" ||
    demoState === "protecting" ||
    demoState === "protected"
  ) {
    return null;
  }

  // Determine if this is a commercial license (shows earnings)
  const isCommercialLicense =
    selectedLicense === "commercial" || selectedLicense === "commercial-remix";

  const statItems = [
    {
      label: "Views",
      value: animatedStats.views,
      icon: "fas fa-eye",
      color: "#3b82f6",
      suffix: "",
    },
    {
      label: "Licenses",
      value: animatedStats.licenses,
      icon: "fas fa-certificate",
      color: "#10b981",
      suffix: "",
    },
    {
      label: "Remixes",
      value: animatedStats.remixes,
      icon: "fas fa-palette",
      color: "#f59e0b",
      suffix: "",
    },
    ...(isCommercialLicense
      ? [
          {
            label: "Earnings",
            value: animatedStats.earnings,
            icon: "fas fa-dollar-sign",
            color: "#8b5cf6",
            suffix: "",
            isMonetary: true,
          },
        ]
      : []),
  ];

  return (
    <div className="border-b border-gray-100 dark:border-gray-800">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">Stats</h3>
          <div className="text-xs text-gray-500">
            {demoState === "earning" && "Performance Data"}
            {demoState === "claiming" && "Total Overview"}
            {(demoState === "claimed" || demoState === "completed") &&
              "Final Statistics"}
          </div>
        </div>

        <div
          className={`grid gap-3 ${
            isCommercialLicense ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {statItems.map((stat) => (
            <div
              key={stat.label}
              className={`p-3 rounded-lg border transition-all ${
                isAnimating
                  ? "border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20 shadow-md"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="p-1.5 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon
                    name={stat.icon}
                    className="w-3 h-3"
                    style={{ color: stat.color }}
                  />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {stat.label}
                </span>
              </div>
              <div
                className={`text-lg font-semibold ${
                  isAnimating ? "animate-pulse" : ""
                }`}
                style={{ color: stat.color }}
              >
                {stat.isMonetary ? "$" : ""}
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>
              {isAnimating && (
                <div className="text-xs text-gray-500 mt-1">
                  +{Math.floor(stat.value / 50)}/min
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sparkle effects during animation */}
        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${0.8 + Math.random() * 0.4}s`,
                }}
              >
                <span className="text-blue-400 text-xs">📈</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
