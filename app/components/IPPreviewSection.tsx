import Image from "next/image";
import { DemoState } from "./types";
import { licenseOptions } from "./LicenseOptions";
import { Icon } from "./Icon";

interface IPPreviewSectionProps {
  uploadedImage: string | null;
  demoState: DemoState;
  selectedLicense: string | null;
  customRevShare?: number;
}

export function IPPreviewSection({
  uploadedImage,
  demoState,
  selectedLicense,
  customRevShare,
}: IPPreviewSectionProps) {
  const selectedLicenseOption = selectedLicense
    ? licenseOptions.find((option) => option.id === selectedLicense)
    : null;

  const isProtected = demoState !== "initial" && demoState !== "protecting";

  return (
    <div className="relative border-b border-gray-100 dark:border-gray-800">
      {/* Blurred background image */}
      {uploadedImage && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={uploadedImage}
            alt="Background"
            fill
            className="object-cover scale-110 blur-3xl opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/80"></div>
        </div>
      )}

      <div className="relative p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">Your IP Asset</h3>
          {isProtected && (
            <a
              href="/pil.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors cursor-pointer"
              title="View Programmable IP License (PIL)"
            >
              <Icon name="fas fa-certificate" className="w-2.5 h-2.5" />
              <span className="font-medium">Legally Protected</span>
            </a>
          )}
        </div>

        <div className="relative h-64 rounded-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Blurred background image filling the container */}
          {uploadedImage && (
            <div className="absolute inset-0">
              <Image
                src={uploadedImage}
                alt="Blurred background"
                fill
                className="object-cover blur-xl opacity-70 dark:opacity-60 scale-110"
              />
              <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/30"></div>
            </div>
          )}

          {/* Fallback background when no image */}
          {!uploadedImage && (
            <>
              <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"></div>
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
            </>
          )}

          <div className="relative h-full flex items-center justify-center p-4 backdrop-blur-sm">
            {uploadedImage ? (
              <div className="relative h-full w-full max-w-sm">
                <Image
                  src={uploadedImage}
                  alt="Uploaded IP"
                  fill
                  className={`object-contain transition-all duration-500 rounded-lg shadow-lg ${
                    demoState === "protecting"
                      ? "scale-95 opacity-70"
                      : "scale-100"
                  }`}
                />
                {demoState === "protecting" && (
                  <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center backdrop-blur-sm rounded-lg">
                    <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg px-4 py-3 shadow-lg border backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Applying legal protection...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Image
                    src="/file.svg"
                    alt="Upload"
                    width={24}
                    height={24}
                    className="opacity-50"
                  />
                </div>
                <p className="text-sm text-gray-500">Upload your IP to begin</p>
              </div>
            )}
          </div>
        </div>

        {/* License Details */}
        {isProtected && selectedLicenseOption && (
          <div className="mt-4 p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: selectedLicenseOption.colors.iconColor,
                }}
              >
                <Icon
                  name={selectedLicenseOption.icon}
                  className="w-4 h-4 text-white"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold">
                  {selectedLicenseOption.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedLicenseOption.tag}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {selectedLicenseOption.description}
            </p>
            <div className="flex items-center justify-between">
              {selectedLicense === "open-use" ||
              selectedLicense === "non-commercial" ? (
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Commercial Use: Disabled
                </span>
              ) : (
                <>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Revenue Share
                  </span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {(selectedLicense === "commercial" ||
                      selectedLicense === "commercial-remix") &&
                    customRevShare
                      ? customRevShare
                      : selectedLicenseOption.revShare}
                    %
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
