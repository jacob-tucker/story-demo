"use client";

import { useState, useEffect } from "react";
import { StepsModal } from "./components/StepsModal";
import { IPPreviewSection } from "./components/IPPreviewSection";
import { RevenueStreamsSection } from "./components/RevenueStreamsSection";
import { RemixStreamsSection } from "./components/RemixStreamsSection";
import { StatsSection } from "./components/StatsSection";
import {
  UsageExample,
  DemoState,
  RemixStream,
  StatsData,
} from "./components/types";
import { usageExamples } from "./components/usageExamples";
import { remixExamples } from "./components/remixExamples";

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
  const [customRevShare, setCustomRevShare] = useState<number>(15);
  const [demoState, setDemoState] = useState<DemoState>("initial");
  const [selectedExample, setSelectedExample] = useState<UsageExample | null>(
    usageExamples?.find((example) => example.id === "merchandise") || null
  );
  const [selectedRemixExample, setSelectedRemixExample] =
    useState<RemixStream | null>(
      remixExamples?.find((example) => example.id === "memes") || null
    );

  // Calculate totals from usage examples
  const totalRevenue =
    usageExamples?.reduce((sum, example) => sum + example.revenue, 0) || 0;

  // Use custom revenue share for commercial licenses, otherwise use default
  const isCommercialLicense =
    selectedLicense === "commercial" || selectedLicense === "commercial-remix";
  const royaltyRate = isCommercialLicense ? customRevShare / 100 : 0.15;
  const totalRoyalties = Math.floor(totalRevenue * royaltyRate);

  // Calculate stats data
  const totalRemixes =
    remixExamples?.reduce((sum, example) => sum + example.count, 0) || 0;
  const statsData: StatsData = {
    views: 12847,
    licenses: 342,
    remixes: totalRemixes,
    earnings: totalRoyalties,
  };

  // Determine which sections to show based on license type
  const showRevenueStreams =
    selectedLicense === "commercial" || selectedLicense === "commercial-remix";
  const showRemixStreams = selectedLicense !== null; // All license types show remix streams
  const showStats = selectedLicense !== null;

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

        // Brief pause then show claim prompt
        await new Promise((resolve) => setTimeout(resolve, 3000));
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
    setCustomRevShare(15);
  };

  return (
    <div
      className="bg-background overflow-hidden"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="max-w-7xl mx-auto flex items-start gap-4 sm:gap-8 lg:gap-12 relative h-full px-4 sm:px-8 py-4 sm:py-8 box-border">
        {/* Left Side - Journey Modal */}
        <StepsModal
          activeStep={activeStep}
          selectedLicense={selectedLicense}
          customRevShare={customRevShare}
          demoState={demoState}
          demoRevenue={totalRevenue}
          demoRoyalties={totalRoyalties}
          onUpload={handleFileUpload}
          onImageUpload={setUploadedImage}
          onSelectLicense={setSelectedLicense}
          onCustomRevShareChange={setCustomRevShare}
          onProtect={handleProtect}
          onClaim={handleClaim}
          onReset={handleReset}
        />

        {/* Right Side - Dynamic Preview */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ height: "calc(100vh - 6rem)" }}
        >
          <div className="max-w-[600px] mx-auto pb-8">
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <IPPreviewSection
                uploadedImage={uploadedImage}
                demoState={demoState}
                selectedLicense={selectedLicense}
                customRevShare={customRevShare}
              />

              {showStats && (
                <StatsSection
                  demoState={demoState}
                  statsData={statsData}
                  selectedLicense={selectedLicense}
                />
              )}

              {showRevenueStreams && (
                <RevenueStreamsSection
                  demoState={demoState}
                  usageExamples={usageExamples}
                  selectedExample={selectedExample}
                  uploadedImage={uploadedImage}
                  royaltyRate={royaltyRate}
                  onSelectExample={setSelectedExample}
                />
              )}

              {showRemixStreams && (
                <RemixStreamsSection
                  demoState={demoState}
                  remixExamples={remixExamples}
                  selectedExample={selectedRemixExample}
                  uploadedImage={uploadedImage}
                  onSelectExample={setSelectedRemixExample}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
