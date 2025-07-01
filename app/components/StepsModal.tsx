import { UploadStep } from "./UploadStep";
import { LicenseStep } from "./LicenseStep";
import { RoyaltyStep } from "./RoyaltyStep";
import { DemoState } from "./types";

interface StepsModalProps {
  activeStep: number;
  selectedLicense: string | null;
  customRevShare: number;
  demoState: DemoState;
  demoRevenue: number;
  demoRoyalties: number;
  onUpload: (file: File) => void;
  onImageUpload: (image: string | null) => void;
  onSelectLicense: (license: string | null) => void;
  onCustomRevShareChange: (revShare: number) => void;
  onProtect: () => void;
  onClaim: () => void;
  onReset?: () => void;
}

export function StepsModal({
  activeStep,
  selectedLicense,
  customRevShare,
  demoState,
  demoRevenue,
  demoRoyalties,
  onUpload,
  onImageUpload,
  onSelectLicense,
  onCustomRevShareChange,
  onProtect,
  onClaim,
  onReset,
}: StepsModalProps) {
  // Determine completion states
  const step1Completed = activeStep > 1;
  const step2Completed = activeStep > 2;
  const step3Completed = demoState === "claimed" || demoState === "completed"; // Completed after claiming OR for non-commercial licenses

  return (
    <div className="md:sticky md:top-8 w-full md:max-w-[400px] bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-black/5 dark:border-white/5 overflow-hidden flex flex-col md:max-h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 flex-shrink-0">
        <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Welcome to Story&apos;s Demo
        </h2>
      </div>

      {/* Main Content */}
      <div className="p-4 md:overflow-y-auto md:flex-1">
        {/* Introduction */}
        <div className="mb-6">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            This demo walks you through registering your intellectual property
            on Story Protocol. You&apos;ll upload your work, set license terms,
            and see how you can earn royalties when others use your IP
            commercially. The entire process takes just a few steps.
          </p>
        </div>

        {/* Steps Section */}
        <div className="space-y-4">
          <UploadStep
            isActive={activeStep === 1}
            isCompleted={step1Completed}
            onUpload={onUpload}
            onImageUpload={onImageUpload}
          />
          <LicenseStep
            isActive={activeStep === 2}
            isCompleted={step2Completed}
            selectedLicense={selectedLicense}
            customRevShare={customRevShare}
            demoState={demoState}
            onSelectLicense={onSelectLicense}
            onCustomRevShareChange={onCustomRevShareChange}
            onProtect={onProtect}
            onLicenseSelect={onSelectLicense}
          />
          <RoyaltyStep
            isActive={activeStep === 3}
            isCompleted={step3Completed}
            selectedLicense={selectedLicense}
            demoState={demoState}
            demoRevenue={demoRevenue}
            demoRoyalties={demoRoyalties}
            onClaim={onClaim}
          />
        </div>

        {/* Reset Demo Button - shown when demo is completed */}
        {step3Completed && onReset && (
          <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5">
            <button
              onClick={onReset}
              className="w-full py-3 px-4 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Reset Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
