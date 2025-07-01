import { useState } from "react";

interface RoyaltyStepProps {
  isActive: boolean;
  isCompleted: boolean;
  demoState: string;
  demoRevenue: number;
  demoRoyalties: number;
  onClaim: () => void;
  onReset?: () => void;
}

export function RoyaltyStep({
  isActive,
  isCompleted,
  demoState,
  demoRevenue,
  demoRoyalties,
  onClaim,
  onReset,
}: RoyaltyStepProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const showStats =
    isActive && (demoState === "earning" || demoState === "claiming");

  const handleClaim = async () => {
    setIsAnimating(true);
    // Wait for animation to complete before calling onClaim
    setTimeout(() => {
      onClaim();
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div
      className={`rounded-xl border ${
        isCompleted
          ? "border-green-200 dark:border-green-800"
          : isActive
          ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/5"
          : "border-black/5 dark:border-white/5"
      } p-4 mt-4 relative overflow-hidden`}
    >
      {/* Magical celebration animation */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Confetti particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.8 + Math.random() * 0.4}s`,
              }}
            >
              <span className="text-lg">
                {["💰", "✨", "🎉", "💎", "🌟"][Math.floor(Math.random() * 5)]}
              </span>
            </div>
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-500/20 animate-pulse"></div>

          {/* Success message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 text-center animate-bounce">
              <div className="text-2xl mb-2">🎉</div>
              <div className="text-sm font-semibold text-emerald-600">
                Royalties Claimed!
              </div>
              <div className="text-xs text-gray-500">
                ${demoRoyalties.toLocaleString()} earned
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1.5">
        {isCompleted ? (
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">✓</span>
          </div>
        ) : (
          <span className="text-xs font-medium">3</span>
        )}
        <span className="text-sm font-medium">Claim Royalties</span>
      </div>

      {showStats && (
        <div className="space-y-3 mt-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Total Revenue</span>
              <span className="text-sm font-medium">
                ${demoRevenue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Your Royalties</span>
              <span className="text-sm font-medium text-emerald-600">
                ${demoRoyalties.toLocaleString()}
              </span>
            </div>
          </div>

          {demoState === "claiming" && (
            <button
              className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleClaim}
              disabled={isAnimating}
            >
              <span className="flex items-center justify-center gap-2">
                {isAnimating ? (
                  "Claiming..."
                ) : (
                  <>
                    <span>Claim Now</span>
                  </>
                )}
              </span>
            </button>
          )}
        </div>
      )}

      {isCompleted && onReset && (
        <div className="mt-3">
          <button
            onClick={onReset}
            className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
