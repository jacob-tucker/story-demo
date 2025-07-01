"use client";

import { useState, useEffect } from "react";
import { StepsModal } from "./components/StepsModal";
import { IPPreviewSection } from "./components/IPPreviewSection";
import { RevenueStreamsSection } from "./components/RevenueStreamsSection";
import { SummaryStats } from "./components/SummaryStats";
import { UsageExample, DemoState } from "./components/types";
import { usageExamples } from "./components/usageExamples";

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
  const [demoState, setDemoState] = useState<DemoState>("initial");
  const [activeUsages, setActiveUsages] = useState<UsageExample[]>([]);
  const [remixColors] = useState(["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]);
  const [selectedExample, setSelectedExample] = useState<UsageExample | null>(
    usageExamples.find((example) => example.id === "merchandise") || null
  );

  // Calculate totals from usage examples
  const totalRevenue = usageExamples.reduce(
    (sum, example) => sum + example.revenue,
    0
  );
  const totalRoyalties = Math.floor(totalRevenue * 0.15); // 15% royalty rate

  // Handle the automated demo flow
  useEffect(() => {
    if (activeStep === 3) {
      const runDemo = async () => {
        // Protection animation
        setDemoState("protecting");
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Protected state (brief pause)
        setDemoState("protected");
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Show revenue streams and start earning immediately
        setDemoState("earning");
        for (const example of usageExamples) {
          setActiveUsages((prev) => [...prev, example]);
          await new Promise((resolve) => setTimeout(resolve, 800));
        }

        // Brief pause then show claim prompt
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setDemoState("claiming");
      };

      runDemo();
    }
  }, [activeStep]);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setTimeout(() => setActiveStep(2), 500);
    };
    reader.readAsDataURL(file);
  };

  const handleProtect = () => {
    setActiveStep(3);
  };

  const handleClaim = () => {
    setDemoState("claimed");
  };

  const handleReset = () => {
    setDemoState("initial");
    setActiveStep(1);
    setUploadedImage(null);
    setSelectedLicense(null);
    setActiveUsages([]);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex items-start gap-8 lg:gap-12 relative">
        {/* Left Side - Journey Modal */}
        <StepsModal
          activeStep={activeStep}
          selectedLicense={selectedLicense}
          demoState={demoState}
          demoRevenue={totalRevenue}
          demoRoyalties={totalRoyalties}
          onUpload={handleFileUpload}
          onImageUpload={setUploadedImage}
          onSelectLicense={setSelectedLicense}
          onProtect={handleProtect}
          onClaim={handleClaim}
          onReset={handleReset}
        />

        {/* Right Side - Dynamic Preview */}
        <div className="flex-1 min-h-[600px]">
          <div className="max-w-[600px] mx-auto">
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <IPPreviewSection
                uploadedImage={uploadedImage}
                demoState={demoState}
                selectedLicense={selectedLicense}
              />

              <RevenueStreamsSection
                demoState={demoState}
                usageExamples={usageExamples}
                selectedExample={selectedExample}
                uploadedImage={uploadedImage}
                onSelectExample={setSelectedExample}
              />

              <SummaryStats
                demoState={demoState}
                demoRevenue={totalRevenue}
                demoRoyalties={totalRoyalties}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
