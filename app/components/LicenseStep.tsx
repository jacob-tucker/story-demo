import { useState, useEffect } from "react";
import { licenseOptions } from "./LicenseOptions";
import { Icon } from "./Icon";

interface LicenseStepProps {
  isActive: boolean;
  isCompleted: boolean;
  selectedLicense: string | null;
  customRevShare: number;
  demoState: string;
  onSelectLicense: (licenseId: string) => void;
  onCustomRevShareChange: (revShare: number) => void;
  onProtect: () => void;
  onLicenseSelect: (license: string) => void;
}

export function LicenseStep({
  isActive,
  isCompleted,
  selectedLicense,
  customRevShare,
  onSelectLicense,
  onCustomRevShareChange,
  onProtect,
}: LicenseStepProps) {
  const [inputValue, setInputValue] = useState(customRevShare.toString());

  // Sync input value when customRevShare changes from parent
  useEffect(() => {
    setInputValue(customRevShare.toString());
  }, [customRevShare]);
  const getIconBackground = (optionId: string) => {
    switch (optionId) {
      case "open-use":
        return "bg-gradient-to-br from-indigo-400 to-indigo-600";
      case "non-commercial":
        return "bg-gradient-to-br from-blue-400 to-blue-600";
      case "commercial":
        return "bg-gradient-to-br from-emerald-400 to-emerald-600";
      case "commercial-remix":
        return "bg-gradient-to-br from-violet-400 to-violet-600";
      default:
        return "bg-gradient-to-br from-gray-400 to-gray-600";
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
                <div
                  className={`w-8 h-8 rounded-full ${getIconBackground(
                    option.id
                  )} flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-12`}
                >
                  <Icon name={option.icon} className="w-4 h-4 text-white" />
                </div>
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

          {selectedLicense &&
            (selectedLicense === "commercial" ||
              selectedLicense === "commercial-remix") && (
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Revenue Share Percentage
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={inputValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      setInputValue(value);

                      // Only update parent state if value is valid
                      if (value !== "" && value !== "0") {
                        const numValue = Number(value);
                        if (numValue >= 1 && numValue <= 100) {
                          onCustomRevShareChange(numValue);
                        }
                      }
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      const numValue = Number(value);

                      // Ensure minimum value of 1 on blur
                      if (value === "" || numValue < 1) {
                        setInputValue("1");
                        onCustomRevShareChange(1);
                      } else if (numValue > 100) {
                        setInputValue("100");
                        onCustomRevShareChange(100);
                      }
                    }}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    %
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Set the percentage of revenue you&apos;ll earn when others use
                  your IP commercially
                </p>
              </div>
            )}

          {selectedLicense && (
            <>
              {/* Legal License Information */}
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon
                      name="fas fa-certificate"
                      className="w-2.5 h-2.5 text-white"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Legal IP Protection
                    </h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                      Your IP will be protected by the{" "}
                      <strong>Programmable IP License (PIL)</strong> - a real
                      legal license based on US copyright law.
                    </p>
                    <a
                      href="/pil.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium underline"
                    >
                      <Icon name="fas fa-file-pdf" className="w-3 h-3" />
                      View Legal License (PDF)
                    </a>
                  </div>
                </div>
              </div>

              <button
                onClick={onProtect}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg mt-1"
              >
                <span className="flex items-center justify-center gap-2">
                  <Icon name="fas fa-shield-alt" className="w-3 h-3" />
                  Protect with Legal License
                </span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
