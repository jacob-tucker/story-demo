import Image from "next/image";
import { RemixStream, DemoState } from "./types";
import { useState, useEffect } from "react";
import { Icon } from "./Icon";

interface RemixStreamCardProps {
  example: RemixStream;
  isSelected: boolean;
  uploadedImage: string | null;
  onClick: () => void;
  demoState?: DemoState;
}

export function RemixStreamCard({
  example,
  isSelected,
  uploadedImage,
  onClick,
  demoState,
}: RemixStreamCardProps) {
  // Animation state
  const [currentCount, setCurrentCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate count up when earning
  useEffect(() => {
    if (demoState === "earning" || demoState === "selling") {
      setIsAnimating(true);

      // Start from 0 and count up
      setCurrentCount(0);

      const duration = 2500; // 2.5 seconds
      const steps = 50; // 50 steps for smooth animation
      const countStep = example.count / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;

        if (currentStep <= steps) {
          setCurrentCount(Math.floor(countStep * currentStep));
        } else {
          setCurrentCount(example.count);
          clearInterval(interval);
          setTimeout(() => setIsAnimating(false), 1000);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    } else if (
      demoState === "claiming" ||
      demoState === "claimed" ||
      demoState === "completed"
    ) {
      // Show final amounts when claiming or after completion
      setCurrentCount(example.count);
      setIsAnimating(false);
    } else {
      // For other states before earning, show 0
      setCurrentCount(0);
      setIsAnimating(false);
    }
  }, [demoState, example.count]);

  return (
    <div
      className={`rounded-lg border transition-all cursor-pointer relative overflow-hidden ${
        isSelected
          ? "border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-900/20"
          : "border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 hover:bg-gray-100/50 dark:hover:bg-gray-800/40"
      } ${isAnimating ? "shadow-lg border-blue-300 dark:border-blue-700" : ""}`}
      onClick={onClick}
    >
      {/* Magical sparkle effects during animation */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
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
              <span className="text-blue-400 text-xs">🎨</span>
            </div>
          ))}

          {/* Remix flow effect */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`remix-${i}`}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.6 + Math.random() * 0.3}s`,
              }}
            >
              <span className="text-pink-500 text-xs">🔥</span>
            </div>
          ))}

          {/* Subtle glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-500/10 animate-pulse"></div>
        </div>
      )}

      <div className="p-3 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${example.color}15` }}
            >
              <Icon
                name={example.icon}
                className="w-4 h-4"
                style={{ color: example.color }}
              />
            </div>
            <div>
              <h4 className="font-medium text-sm">{example.title}</h4>
              <p className="text-xs text-gray-500">{example.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div
              className={`font-semibold text-sm ${
                isAnimating ? "animate-pulse" : ""
              }`}
              style={{ color: example.color }}
            >
              {currentCount.toLocaleString()}
            </div>
            {isAnimating && (
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                +{Math.floor(currentCount / 30)}/min
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isSelected && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white/50 dark:bg-gray-900/50">
          <div className="flex gap-4">
            {/* Visual Preview - Left Side */}
            {uploadedImage && (
              <div className="flex-shrink-0">
                {example.id === "memes" && (
                  <div className="relative w-32 h-32">
                    {/* Meme template background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-white/90 rounded-sm flex items-center justify-center overflow-hidden shadow-md border border-gray-200">
                          <Image
                            src={uploadedImage}
                            alt="IP in meme"
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                          MEME TEXT
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {example.id === "collaboration" && (
                  <div className="relative w-32 h-32">
                    {/* Collaboration canvas */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-2 p-2">
                        <div className="w-12 h-12 bg-white/90 rounded-sm flex items-center justify-center overflow-hidden shadow-sm border border-gray-200">
                          <Image
                            src={uploadedImage}
                            alt="Original IP"
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-700 rounded-sm flex items-center justify-center">
                          <span className="text-xs">+</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-200 to-orange-200 dark:from-yellow-800 dark:to-orange-800 rounded-sm flex items-center justify-center">
                          <span className="text-xs">🎨</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-teal-200 dark:from-green-800 dark:to-teal-800 rounded-sm flex items-center justify-center">
                          <span className="text-xs">✨</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Details - Right Side */}
            <div className="flex-1 space-y-3">
              {/* License Terms */}
              <div>
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enabled by License Terms:
                </h5>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Derivatives: <span className="font-medium">Allowed</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Attribution: <span className="font-medium">Required</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Remix Count */}
              <div>
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Remixes Created:
                </h5>
                <div
                  className={`flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded ${
                    isAnimating
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      : ""
                  } transition-all duration-300`}
                >
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Created on {example.platform.name}
                  </div>
                  <div
                    className={`font-semibold text-sm ${
                      isAnimating ? "animate-pulse" : ""
                    }`}
                    style={{ color: example.color }}
                  >
                    {currentCount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Platform Button */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={example.platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                  style={{ backgroundColor: example.color }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Try on {example.platform.name}</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
