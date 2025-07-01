import { UploadStep } from "./UploadStep";
import { LicenseStep } from "./LicenseStep";
import { RoyaltyStep } from "./RoyaltyStep";
import { DemoState } from "./types";

interface StepsModalProps {
  activeStep: number;
  selectedLicense: string | null;
  demoState: DemoState;
  demoRevenue: number;
  demoRoyalties: number;
  onUpload: (file: File) => void;
  onImageUpload: (image: string | null) => void;
  onSelectLicense: (license: string | null) => void;
  onProtect: () => void;
  onClaim: () => void;
  onReset?: () => void;
}

export function StepsModal({
  activeStep,
  selectedLicense,
  demoState,
  demoRevenue,
  demoRoyalties,
  onUpload,
  onImageUpload,
  onSelectLicense,
  onProtect,
  onClaim,
  onReset,
}: StepsModalProps) {
  // Determine completion states
  const step1Completed = activeStep > 1;
  const step2Completed = activeStep > 2;
  const step3Completed = demoState === "claimed"; // Only completed after claiming

  return (
    <div className="sticky top-8 w-full max-w-[400px] bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-black/5 dark:border-white/5 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-black/5 dark:border-white/5">
        <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Welcome to Story's Demo
        </h2>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Introduction */}
        <div className="mb-6">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            This demo walks you through registering your intellectual property
            on Story Protocol. You'll upload your work, set license terms, and
            see how you can earn royalties when others use your IP commercially.
            The entire process takes just a few steps.
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
            demoState={demoState}
            onSelectLicense={onSelectLicense}
            onProtect={onProtect}
            onLicenseSelect={onSelectLicense}
          />
          <RoyaltyStep
            isActive={activeStep === 3}
            isCompleted={step3Completed}
            demoState={demoState}
            demoRevenue={demoRevenue}
            demoRoyalties={demoRoyalties}
            onClaim={onClaim}
            onReset={onReset}
          />
        </div>
      </div>
    </div>
  );
}
