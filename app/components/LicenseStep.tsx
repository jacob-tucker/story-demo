import { LicenseOption } from "./types";
import { licenseOptions } from "./LicenseOptions";

interface LicenseStepProps {
  isActive: boolean;
  isCompleted: boolean;
  selectedLicense: string | null;
  demoState: string;
  onSelectLicense: (licenseId: string) => void;
  onProtect: () => void;
  onLicenseSelect: (license: string) => void;
}

export function LicenseStep({
  isActive,
  isCompleted,
  selectedLicense,
  demoState,
  onSelectLicense,
  onProtect,
}: LicenseStepProps) {
  const getIcon = (optionId: string) => {
    switch (optionId) {
      case "open-use":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-12">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
      case "non-commercial":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-12">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
              />
            </svg>
          </div>
        );
      case "commercial":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-12">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
        );
      case "commercial-remix":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-12">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`rounded-xl border ${
        isCompleted
          ? "border-green-200 dark:border-green-800"
          : isActive
          ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/5"
          : "border-black/5 dark:border-white/5"
      } p-4 mt-4`}
    >
      <div className="flex items-center gap-1.5">
        {isCompleted ? (
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">✓</span>
          </div>
        ) : (
          <span className="text-xs font-medium">2</span>
        )}
        <span className="text-sm font-medium">Choose License Terms</span>
      </div>

      {isActive && (
        <div className="space-y-2 mt-3">
          {licenseOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectLicense(option.id)}
              className={`
                group relative w-full p-3 rounded-lg border text-left transition-all duration-200 transform hover:scale-105 hover:shadow-lg
                ${
                  selectedLicense === option.id
                    ? `${option.colors.border} ${option.colors.bg} shadow-md scale-105`
                    : "border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 hover:bg-gray-50/50 dark:hover:bg-white/5"
                }
              `}
            >
              <div className="flex items-center gap-3">
                {getIcon(option.id)}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{option.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {option.tag}
                  </p>
                </div>
              </div>

              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </button>
          ))}

          {selectedLicense && (
            <button
              onClick={onProtect}
              className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg mt-1"
            >
              Protect My IP ✨
            </button>
          )}
        </div>
      )}
    </div>
  );
}
