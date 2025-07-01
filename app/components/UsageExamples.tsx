import Image from "next/image";
import { UsageExample } from "./types";

interface UsageExamplesProps {
  usages: UsageExample[];
  uploadedImage: string | null;
  remixColors: string[];
  onSelectUsage: (usage: UsageExample) => void;
}

export function UsageExamples({
  usages,
  uploadedImage,
  remixColors,
  onSelectUsage,
}: UsageExamplesProps) {
  if (!usages.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {usages.map((usage) => (
        <button
          key={usage.type}
          onClick={() => onSelectUsage(usage)}
          className="relative group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
        >
          {/* Visualization */}
          <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
            {usage.type === "merchandise" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-4/5 h-4/5">
                  <div className="absolute inset-0">
                    {/* T-shirt body */}
                    <div className="absolute inset-x-[15%] top-[10%] bottom-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-inner">
                      {/* Collar */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[30%] h-8">
                        <div
                          className="absolute inset-0 bg-gray-200 dark:bg-gray-600"
                          style={{
                            clipPath:
                              "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                          }}
                        />
                      </div>

                      {/* Sleeves */}
                      <div className="absolute top-[5%] -left-4 w-[30%] h-[40%]">
                        <div
                          className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800"
                          style={{
                            clipPath:
                              "polygon(100% 0%, 100% 90%, 0% 100%, 20% 0%)",
                          }}
                        />
                      </div>
                      <div className="absolute top-[5%] -right-4 w-[30%] h-[40%]">
                        <div
                          className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800"
                          style={{
                            clipPath:
                              "polygon(0% 0%, 0% 90%, 100% 100%, 80% 0%)",
                          }}
                        />
                      </div>

                      {/* Wrinkles */}
                      <div
                        className="absolute inset-0 opacity-10 dark:opacity-20"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)",
                        }}
                      />
                    </div>

                    {/* IP placement */}
                    {uploadedImage && (
                      <div className="absolute inset-x-[25%] top-[30%] bottom-[30%] flex items-center justify-center">
                        <div className="relative w-full h-full transform perspective-1000 rotateY-5">
                          <Image
                            src={uploadedImage}
                            alt="IP on T-shirt"
                            fill
                            className="object-contain drop-shadow-lg"
                            style={{
                              filter: "contrast(1.1) saturate(1.2)",
                              transform: "perspective(1000px) rotateY(5deg)",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {usage.type === "stake" && (
              <div className="absolute inset-0 flex items-center justify-center">
                {uploadedImage && (
                  <>
                    {/* Central IP */}
                    <div className="relative w-32 h-32">
                      <Image
                        src={uploadedImage}
                        alt="Staked IP"
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Orbiting IP Tokens */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-12 h-12"
                        style={{
                          animation: `orbit ${
                            4 + i * 0.5
                          }s cubic-bezier(0.4, 0.0, 0.2, 1) infinite`,
                          left: "50%",
                          top: "50%",
                          marginLeft: "-24px",
                          marginTop: "-24px",
                          transformOrigin: "50% 50%",
                        }}
                      >
                        <Image
                          src="/ip-token.png"
                          alt="IP Token"
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}

                    {/* Glowing effect */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500/20 dark:bg-indigo-400/20 rounded-full blur-xl" />
                    </div>
                  </>
                )}
              </div>
            )}

            {usage.type === "remix" && (
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-2">
                {uploadedImage &&
                  remixColors.map((color, i) => (
                    <div
                      key={i}
                      className="relative rounded-md overflow-hidden"
                    >
                      <Image
                        src={uploadedImage}
                        alt={`Remix ${i + 1}`}
                        fill
                        className="object-cover"
                        style={{
                          filter: `hue-rotate(${i * 90}deg) saturate(150%)`,
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-medium">{usage.title}</h3>
              <div className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                ${usage.revenue.toLocaleString()}
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {usage.details}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
