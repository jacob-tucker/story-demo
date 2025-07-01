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
      <div className="flex items-center justify-between p-3 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="text-base">✨</span>
          <span className="text-sm font-medium">Story Demo</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Last updated: 30m ago</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Introduction */}
        <div className="mb-6">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Register your IP on Story and set up license terms in just two
            steps. Others can then use your work under your specified
            conditions.
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
