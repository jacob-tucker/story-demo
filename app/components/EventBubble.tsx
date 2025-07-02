import { useState, useEffect } from "react";

interface EventBubbleProps {
  message: string;
  icon?: string;
  color?: string;
  duration?: number;
  delay?: number;
  position?: "center" | "stats" | "revenue" | "remix";
  onComplete?: () => void;
}

export function EventBubble({
  message,
  icon = "✨",
  color = "#3b82f6",
  duration = 4000,
  delay = 0,
  position = "center",
  onComplete,
}: EventBubbleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      delay: number;
      duration: number;
      emoji: string;
    }>
  >([]);

  useEffect(() => {
    // Generate magical particles
    const particleEmojis = ["✨", "🌟", "💫", "⭐", "🎉", "🎊", "💥"];
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100, // -100 to 100
      y: Math.random() * 200 - 100,
      delay: Math.random() * 1000,
      duration: 2000 + Math.random() * 1000,
      emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
    }));
    setParticles(newParticles);

    // Start animation after delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Start fade out animation
    const hideTimer = setTimeout(() => {
      setIsAnimatingOut(true);
    }, delay + duration - 800);

    // Complete animation and cleanup
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, delay + duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, [delay, duration, onComplete]);

  if (!isVisible) return null;

  // Position the bubble based on where the action is happening
  const getPositionClasses = () => {
    switch (position) {
      case "stats":
        return "top-1/4 left-1/2 -translate-x-1/2";
      case "revenue":
        return "top-1/2 left-1/2 -translate-x-1/2";
      case "remix":
        return "top-3/4 left-1/2 -translate-x-1/2";
      default:
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
    }
  };

  return (
    <div
      className={`fixed z-50 pointer-events-none ${getPositionClasses()}`}
      style={{
        transform: isAnimatingOut
          ? "scale(0) rotate(180deg)"
          : "scale(1) rotate(0deg)",
        transition: "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        opacity: isAnimatingOut ? 0 : 1,
      }}
    >
      {/* Magical particle explosion */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-lg animate-ping"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animationDelay: `${particle.delay}ms`,
            animationDuration: `${particle.duration}ms`,
            animationIterationCount: "1",
            animationFillMode: "forwards",
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Ripple effects */}
      <div className="absolute inset-0 -m-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-2 animate-ping"
            style={{
              borderColor: `${color}40`,
              animationDelay: `${i * 200}ms`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>

      {/* Main bubble with enhanced effects */}
      <div
        className="relative rounded-2xl shadow-2xl border-2 p-3 sm:p-4 max-w-xs sm:max-w-sm backdrop-blur-md bg-white dark:bg-gray-800 mx-2"
        style={{
          borderColor: color,
          boxShadow: `
            0 0 0 4px ${color}20,
            0 0 20px ${color}40,
            0 0 40px ${color}30,
            0 20px 40px rgba(0,0,0,0.1)
          `,
          animation: !isAnimatingOut
            ? "magicalPulse 2s ease-in-out infinite, magicalFloat 3s ease-in-out infinite"
            : "none",
        }}
      >
        {/* Sparkle overlay */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
                backgroundColor: color,
                boxShadow: `0 0 6px ${color}`,
              }}
            />
          ))}
        </div>

        <div className="relative flex items-center gap-3 sm:gap-4">
          {/* Enhanced icon with glow */}
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl relative flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}40)`,
              boxShadow: `
                0 0 20px ${color}60,
                inset 0 0 20px ${color}20
              `,
              animation: "iconSpin 4s linear infinite",
            }}
          >
            {/* Icon glow effect */}
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
              }}
            />
            <span className="relative z-10 filter drop-shadow-lg">{icon}</span>
          </div>

          {/* Message with typewriter effect */}
          <div className="flex-1 min-w-0">
            <p
              className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white relative leading-tight"
              style={{
                textShadow: `0 0 10px ${color}40`,
                animation: "typewriter 1s ease-out",
              }}
            >
              {message}
            </p>

            {/* Underline effect */}
            <div
              className="h-0.5 mt-1 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color}, transparent)`,
                animation: "expandWidth 1s ease-out 0.5s both",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
