import Image from "next/image";
import { UsageExample, DemoState } from "./types";
import { useState, useEffect } from "react";
import { Icon } from "./Icon";

interface RevenueStreamCardProps {
  example: UsageExample;
  isSelected: boolean;
  uploadedImage: string | null;
  onClick: () => void;
  demoState?: DemoState;
  royaltyRate: number;
  allowAITraining: boolean;
}

export function RevenueStreamCard({
  example,
  isSelected,
  uploadedImage,
  onClick,
  demoState,
  royaltyRate,
  allowAITraining,
}: RevenueStreamCardProps) {
  // Calculate royalty amount - set to 0 for AI training if disabled
  const actualRevenue =
    example.id === "ai-training" && !allowAITraining ? 0 : example.revenue;
  const royaltyAmount = Math.floor(actualRevenue * royaltyRate);

  // Animation state
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [currentRoyalty, setCurrentRoyalty] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate revenue counting up when earning
  useEffect(() => {
    if (demoState === "earning" || demoState === "selling") {
      setIsAnimating(true);

      // Start from 0 and count up
      setCurrentRevenue(0);
      setCurrentRoyalty(0);

      const duration = 6000; // 6 seconds for longer magic moment
      const steps = 60; // More steps for smoother animation
      const revenueStep = actualRevenue / steps;
      const royaltyStep = royaltyAmount / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;

        if (currentStep <= steps) {
          setCurrentRevenue(Math.floor(revenueStep * currentStep));
          setCurrentRoyalty(Math.floor(royaltyStep * currentStep));
        } else {
          setCurrentRevenue(actualRevenue);
          setCurrentRoyalty(royaltyAmount);
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
      setCurrentRevenue(actualRevenue);
      setCurrentRoyalty(royaltyAmount);
      setIsAnimating(false);
    } else {
      // For other states before earning, show $0
      setCurrentRevenue(0);
      setCurrentRoyalty(0);
      setIsAnimating(false);
    }
  }, [demoState, actualRevenue, royaltyAmount]);

  return (
    <div
      className={`rounded-lg border transition-all cursor-pointer relative overflow-hidden ${
        isSelected
          ? "border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-900/20"
          : "border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20 hover:bg-gray-100/50 dark:hover:bg-gray-800/40"
      } ${
        isAnimating
          ? "shadow-lg border-emerald-300 dark:border-emerald-700"
          : ""
      } ${
        example.id === "ai-training" && !allowAITraining
          ? "opacity-60 border-red-200 dark:border-red-800"
          : ""
      }`}
      onClick={onClick}
    >
      {/* Disabled overlay for AI training */}
      {example.id === "ai-training" && !allowAITraining && (
        <div className="absolute inset-0 bg-red-50/80 dark:bg-red-900/20 pointer-events-none z-10 flex items-center justify-center">
          <div className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg border border-red-200 dark:border-red-700 text-center">
            <div className="text-xs font-medium mb-1">DISABLED</div>
            <div className="text-xs opacity-90">You disallowed AI training</div>
          </div>
        </div>
      )}

      {/* Magical sparkle effects during animation */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(8)].map((_, i) => (
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
              <span className="text-yellow-400 text-xs">✨</span>
            </div>
          ))}

          {/* Money flow effect */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`money-${i}`}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.6 + Math.random() * 0.3}s`,
              }}
            >
              <span className="text-green-500 text-xs">💰</span>
            </div>
          ))}

          {/* Subtle glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-emerald-500/10 animate-pulse"></div>
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
              ${currentRevenue.toLocaleString()}
            </div>
            {isAnimating && (
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                +${Math.floor(currentRevenue / 20)}/min
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
                {example.id === "merchandise" && (
                  <div className="relative w-32 h-32">
                    {/* T-shirt SVG background - centered */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div style={{ marginLeft: "-20px" }}>
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 120 120"
                          className="text-gray-700"
                        >
                          <path
                            d="M30 25 L30 15 Q30 10 35 10 L45 10 Q50 5 70 5 Q90 5 95 10 L105 10 Q110 10 110 15 L110 25 L120 35 L120 45 Q120 50 115 50 L110 50 L110 110 Q110 115 105 115 L35 115 Q30 115 30 110 L30 50 L25 50 Q20 50 20 45 L20 35 Z"
                            fill="currentColor"
                            className="drop-shadow-sm"
                          />
                          {/* T-shirt details */}
                          <path
                            d="M45 10 Q50 8 70 8 Q90 8 95 10 L95 15 Q90 20 70 20 Q50 20 45 15 Z"
                            fill="rgba(0,0,0,0.1)"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Print area on t-shirt - properly centered */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-14 h-14 bg-white/90 rounded-sm flex items-center justify-center overflow-hidden shadow-md border border-gray-200"
                        style={{ marginTop: "12px" }}
                      >
                        <Image
                          src={uploadedImage}
                          alt="IP on t-shirt"
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {example.id === "staking" && (
                  <div className="relative w-32 h-32">
                    {/* Central IP */}
                    <div className="absolute inset-10 rounded-full overflow-hidden border-2 border-blue-200 bg-white shadow-sm">
                      <Image
                        src={uploadedImage}
                        alt="Staked IP"
                        width={48}
                        height={48}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    {/* Orbiting IP tokens in circular paths */}
                    {/* Orbit 1 - Outer ring */}
                    <div
                      className="absolute inset-2 animate-spin"
                      style={{
                        animationDuration: "8s",
                        animationDelay: "0s",
                      }}
                    >
                      <Image
                        src="/ip-token.png"
                        alt="IP Token"
                        width={16}
                        height={16}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-sm"
                      />
                      <Image
                        src="/ip-token.png"
                        alt="IP Token"
                        width={16}
                        height={16}
                        className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 drop-shadow-sm"
                      />
                      <Image
                        src="/ip-token.png"
                        alt="IP Token"
                        width={16}
                        height={16}
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 drop-shadow-sm"
                      />
                      <Image
                        src="/ip-token.png"
                        alt="IP Token"
                        width={16}
                        height={16}
                        className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-sm"
                      />
                    </div>

                    {/* Orbit 2 - Middle ring, opposite direction */}
                    <div
                      className="absolute inset-4 animate-spin"
                      style={{
                        animationDuration: "6s",
                        animationDirection: "reverse",
                        animationDelay: "0s",
                      }}
                    >
                      <Image
                        src="/ip-token.png"
                        alt="IP Token"
                        width={14}
                        height={14}
                        className="absolute top-2 right-2 transform translate-x-1/2 -translate-y-1/2 drop-shadow-sm opacity-80"
                      />
                      <Image
                        src="/ip-token.png"
                        alt="IP Token"
                        width={14}
                        height={14}
                        className="absolute bottom-2 right-2 transform translate-x-1/2 translate-y-1/2 drop-shadow-sm opacity-80"
                      />
                      <Image
                        src="/ip-token.png"
                        alt="IP Token"
                        width={14}
                        height={14}
                        className="absolute bottom-2 left-2 transform -translate-x-1/2 translate-y-1/2 drop-shadow-sm opacity-80"
                      />
                      <Image
                        src="/ip-token.png"
                        alt="IP Token"
                        width={14}
                        height={14}
                        className="absolute top-2 left-2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-sm opacity-80"
                      />
                    </div>

                    {/* Orbit 3 - Inner ring, faster */}
                    <div
                      className="absolute inset-6 animate-spin"
                      style={{
                        animationDuration: "4s",
                        animationDelay: "0s",
                      }}
                    >
                      <Image
                        src="/ip-token.png"
                        alt="IP Token"
                        width={12}
                        height={12}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-sm opacity-60"
                      />
                      <Image
                        src="/ip-token.png"
                        alt="IP Token"
                        width={12}
                        height={12}
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 drop-shadow-sm opacity-60"
                      />
                    </div>
                  </div>
                )}

                {example.id === "remix" && (
                  <div className="w-32">
                    <div className="text-xs text-gray-500 mb-2 text-center">
                      Original → Remixes
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {/* Original */}
                      <div className="w-14 h-14 rounded border overflow-hidden">
                        <Image
                          src={uploadedImage}
                          alt="Original IP"
                          width={56}
                          height={56}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      {/* Remixed versions with color overlays */}
                      <div className="w-14 h-14 rounded border overflow-hidden relative">
                        <Image
                          src={uploadedImage}
                          alt="Remix 1"
                          width={56}
                          height={56}
                          className="object-contain w-full h-full"
                        />
                        <div className="absolute inset-0 bg-red-500 mix-blend-multiply opacity-40"></div>
                      </div>
                      <div className="w-14 h-14 rounded border overflow-hidden relative">
                        <Image
                          src={uploadedImage}
                          alt="Remix 2"
                          width={56}
                          height={56}
                          className="object-contain w-full h-full"
                        />
                        <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-40"></div>
                      </div>
                      <div className="w-14 h-14 rounded border overflow-hidden relative">
                        <Image
                          src={uploadedImage}
                          alt="Remix 3"
                          width={56}
                          height={56}
                          className="object-contain w-full h-full"
                        />
                        <div className="absolute inset-0 bg-green-500 mix-blend-multiply opacity-40"></div>
                      </div>
                    </div>
                  </div>
                )}

                {example.id === "ai-training" && (
                  <div className="w-32 h-32">
                    <div className="flex items-center justify-center h-full">
                      {/* Brain container with pulsing effect */}
                      <div
                        className={`relative w-16 h-16 rounded-full border-2 ${
                          allowAITraining
                            ? "border-blue-300 bg-blue-100 dark:bg-blue-900/30 dark:border-blue-700"
                            : "border-red-300 bg-red-100 dark:bg-red-900/30 dark:border-red-700"
                        } flex items-center justify-center ${
                          allowAITraining ? "animate-pulse" : ""
                        }`}
                      >
                        {/* Brain icon */}
                        <i
                          className={`fas fa-brain ${
                            allowAITraining
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-red-600 dark:text-red-400"
                          } text-lg`}
                        ></i>

                        {/* Your IP image inside the brain */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50 shadow-sm">
                            <Image
                              src={uploadedImage}
                              alt="Your IP"
                              width={32}
                              height={32}
                              className={`object-contain w-full h-full ${
                                allowAITraining
                                  ? "opacity-80"
                                  : "opacity-40 grayscale"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Pulsing rings around the brain - only when enabled */}
                        {allowAITraining && (
                          <>
                            <div className="absolute inset-0 rounded-full border border-blue-400 opacity-30 animate-ping"></div>
                            <div
                              className="absolute inset-0 rounded-full border border-blue-500 opacity-20 animate-ping"
                              style={{ animationDelay: "0.5s" }}
                            ></div>
                          </>
                        )}

                        {/* Disabled X overlay */}
                        {!allowAITraining && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                              <span className="text-red-600 dark:text-red-400 text-xl font-bold">
                                ×
                              </span>
                            </div>
                          </div>
                        )}
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
                  {example.id === "merchandise" && (
                    <>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Commercial Use:{" "}
                          <span className="font-medium">Enabled</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Physical Products:{" "}
                          <span className="font-medium">Allowed</span>
                        </span>
                      </div>
                    </>
                  )}
                  {example.id === "staking" && (
                    <>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Staking Rights:{" "}
                          <span className="font-medium">Granted</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Commercial Use:{" "}
                          <span className="font-medium">Enabled</span>
                        </span>
                      </div>
                    </>
                  )}
                  {example.id === "remix" && (
                    <>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Derivatives:{" "}
                          <span className="font-medium">Allowed</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Attribution:{" "}
                          <span className="font-medium">Required</span>
                        </span>
                      </div>
                    </>
                  )}
                  {example.id === "ai-training" && (
                    <>
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={`w-1.5 h-1.5 ${
                            allowAITraining ? "bg-green-500" : "bg-red-500"
                          } rounded-full`}
                        ></div>
                        <span className="text-gray-600 dark:text-gray-400">
                          AI Training:{" "}
                          <span className="font-medium">
                            {allowAITraining ? "Permitted" : "Disabled"}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={`w-1.5 h-1.5 ${
                            allowAITraining ? "bg-green-500" : "bg-red-500"
                          } rounded-full`}
                        ></div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Data Usage:{" "}
                          <span className="font-medium">
                            {allowAITraining ? "Commercial" : "Restricted"}
                          </span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Royalty Breakdown */}
              <div>
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Royalty Earnings:
                </h5>
                <div
                  className={`flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded ${
                    isAnimating
                      ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                      : ""
                  } transition-all duration-300`}
                >
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {(royaltyRate * 100).toFixed(0)}% of $
                    {currentRevenue.toLocaleString()} total revenue
                  </div>
                  <div
                    className={`font-semibold text-sm ${
                      isAnimating ? "animate-pulse" : ""
                    }`}
                    style={{ color: example.color }}
                  >
                    ${currentRoyalty.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Platform Link */}
              {example.platform && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={example.platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    style={{ backgroundColor: example.color }}
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
