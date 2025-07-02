"use client";

import { useState, useEffect } from "react";
import { StepsModal } from "./components/StepsModal";
import { IPPreviewSection } from "./components/IPPreviewSection";
import { RevenueStreamsSection } from "./components/RevenueStreamsSection";
import { RemixStreamsSection } from "./components/RemixStreamsSection";
import { StatsSection } from "./components/StatsSection";
import { EventBubble } from "./components/EventBubble";
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

  // New state for staged reveals and event bubbles
  const [showStats, setShowStats] = useState(false);
  const [showRevenueStreams, setShowRevenueStreams] = useState(false);
  const [showRemixStreams, setShowRemixStreams] = useState(false);
  const [currentEvents, setCurrentEvents] = useState<
    Array<{
      id: string;
      message: string;
      icon: string;
      color: string;
      delay: number;
      position: "center" | "stats" | "revenue" | "remix";
    }>
  >([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Prevent body scroll during auto-scroll
  useEffect(() => {
    if (isAutoScrolling) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAutoScrolling]);

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

  // Determine which sections to show based on license type (base conditions)
  const canShowRevenueStreams =
    selectedLicense === "commercial" || selectedLicense === "commercial-remix";
  const canShowRemixStreams = selectedLicense !== null; // All license types show remix streams
  const canShowStats = selectedLicense !== null;

  // Handle the automated demo flow with staged reveals and event bubbles
  useEffect(() => {
    if (activeStep === 3) {
      const runDemo = async () => {
        // Reset all show states
        setShowStats(false);
        setShowRevenueStreams(false);
        setShowRemixStreams(false);
        setCurrentEvents([]);

        // Protection animation
        setDemoState("protecting");
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Protected state (brief pause)
        setDemoState("protected");
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Start the magic moment - 12 second experience
        setDemoState("earning");

        // Define sequential event timeline that matches what's happening on screen
        let events: Array<{
          id: string;
          message: string;
          icon: string;
          color: string;
          delay: number;
          position: "center" | "stats" | "revenue" | "remix";
        }> = [
          {
            id: "viewed",
            message: "Your IP was viewed!",
            icon: "👀",
            color: "#3b82f6",
            delay: 500,
            position: "center" as const,
          },
          {
            id: "licensed",
            message: "Your IP was licensed!",
            icon: "📄",
            color: "#10b981",
            delay: 2500, // When stats appear
            position: "stats" as const,
          },
        ];

        // Add license-specific events that follow the visual flow (top to bottom)
        if (selectedLicense === "commercial") {
          events.push(
            {
              id: "merch",
              message: "Your IP was put on merch!",
              icon: "👕",
              color: "#f59e0b",
              delay: 5500, // When revenue section appears
              position: "revenue" as const,
            },
            {
              id: "passive-yield",
              message: "Your IP is earning passive yield!",
              icon: "💎",
              color: "#8b5cf6",
              delay: 7000,
              position: "revenue" as const,
            },
            {
              id: "ai-training",
              message: "AI is training on your IP!",
              icon: "🤖",
              color: "#3b82f6",
              delay: 8500, // When remix section appears (AI training relates to remix/community)
              position: "remix" as const,
            },
            {
              id: "viral",
              message: "Your IP is going viral!",
              icon: "🔥",
              color: "#ef4444",
              delay: 10000,
              position: "center" as const,
            },
            {
              id: "meme",
              message: "Someone made a meme with your IP!",
              icon: "😂",
              color: "#ec4899",
              delay: 11500,
              position: "remix" as const,
            }
          );
        } else if (selectedLicense === "commercial-remix") {
          events.push(
            {
              id: "merch",
              message: "Your IP was put on merch!",
              icon: "👕",
              color: "#f59e0b",
              delay: 5500, // When revenue section appears
              position: "revenue" as const,
            },
            {
              id: "remix-community",
              message: "Artists are remixing your work!",
              icon: "🎨",
              color: "#ec4899",
              delay: 8500, // When remix section appears
              position: "remix" as const,
            },
            {
              id: "ai-training",
              message: "AI is training on your IP!",
              icon: "🤖",
              color: "#3b82f6",
              delay: 10000,
              position: "remix" as const,
            },
            {
              id: "viral",
              message: "Your IP is going viral!",
              icon: "🔥",
              color: "#ef4444",
              delay: 11500,
              position: "center" as const,
            },
            {
              id: "meme",
              message: "Someone made a meme with your IP!",
              icon: "😂",
              color: "#ec4899",
              delay: 13000,
              position: "remix" as const,
            }
          );
        } else if (selectedLicense === "non-commercial") {
          events.push(
            {
              id: "remix-community",
              message: "Artists are remixing your work!",
              icon: "🎨",
              color: "#ec4899",
              delay: 4000, // Earlier since no revenue section
              position: "remix" as const,
            },
            {
              id: "community-love",
              message: "Community loves your work!",
              icon: "❤️",
              color: "#dc2626",
              delay: 6000,
              position: "remix" as const,
            },
            {
              id: "trending",
              message: "Trending on social media!",
              icon: "📱",
              color: "#7c3aed",
              delay: 8000,
              position: "center" as const,
            },
            {
              id: "meme",
              message: "Someone made a meme with your IP!",
              icon: "😂",
              color: "#ec4899",
              delay: 10000,
              position: "remix" as const,
            }
          );
        } else if (selectedLicense === "open-use") {
          events.push(
            {
              id: "remix-community",
              message: "Community is using your work!",
              icon: "👥",
              color: "#ec4899",
              delay: 4000, // Earlier since no revenue section
              position: "remix" as const,
            },
            {
              id: "sharing",
              message: "Your IP is being shared everywhere!",
              icon: "🔄",
              color: "#f59e0b",
              delay: 6000,
              position: "center" as const,
            },
            {
              id: "attribution",
              message: "Getting proper attribution!",
              icon: "✨",
              color: "#8b5cf6",
              delay: 8000,
              position: "center" as const,
            },
            {
              id: "impact",
              message: "Used in 50+ creative projects!",
              icon: "🌟",
              color: "#059669",
              delay: 10000,
              position: "center" as const,
            }
          );
        }

        // Set all events to trigger
        setCurrentEvents(events);

        // Enable auto-scroll mode
        setIsAutoScrolling(true);

        // Prevent body scroll on mobile during animation
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          document.body.style.overflow = "hidden";
        }

        // Helper function to scroll to section (mobile-friendly)
        const scrollToSection = (sectionClass: string, delay = 300) => {
          setTimeout(() => {
            const section = document.querySelector(sectionClass) as HTMLElement;
            if (section) {
              // Check if we're on mobile
              const isMobile = window.innerWidth < 768;

              if (isMobile) {
                // On mobile, scroll the entire window to the section
                const sectionTop =
                  section.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({
                  top: sectionTop,
                  behavior: "smooth",
                });
              } else {
                // On desktop, scroll within the right panel
                const rightPanel = document.querySelector(".right-panel");
                if (rightPanel) {
                  const sectionTop = section.offsetTop - 50;
                  rightPanel.scrollTo({
                    top: sectionTop,
                    behavior: "smooth",
                  });
                }
              }
            }
          }, delay);
        };

        // Stage 1: Show Stats section (2 seconds in)
        setTimeout(() => {
          if (canShowStats) {
            setShowStats(true);
            scrollToSection(".stats-section");
          }
        }, 2000);

        // Stage 2: Show Revenue Streams (5 seconds in)
        setTimeout(() => {
          if (canShowRevenueStreams) {
            setShowRevenueStreams(true);
            scrollToSection(".revenue-section");
          }
        }, 5000);

        // Stage 3: Show Remix Streams (8 seconds for commercial, 4 seconds for non-commercial)
        const remixDelay =
          selectedLicense === "commercial" ||
          selectedLicense === "commercial-remix"
            ? 8000
            : 4000;
        setTimeout(() => {
          if (canShowRemixStreams) {
            setShowRemixStreams(true);
            scrollToSection(".remix-section");
          }
        }, remixDelay);

        // Determine total duration based on license type
        const totalDuration =
          selectedLicense === "commercial" ||
          selectedLicense === "commercial-remix"
            ? 13000
            : 11000;
        const viralEventTime =
          selectedLicense === "commercial" ||
          selectedLicense === "commercial-remix"
            ? 10000
            : 8000;
        const memeEventTime =
          selectedLicense === "commercial" ||
          selectedLicense === "commercial-remix"
            ? 11500
            : 10000;

        // Final scroll when trending/viral events happen
        setTimeout(() => {
          if (canShowRemixStreams) {
            scrollToSection(".remix-section", 0); // No delay for immediate scroll
          }
        }, viralEventTime);

        // Extra scroll for final event (meme/impact)
        setTimeout(() => {
          if (canShowRemixStreams) {
            scrollToSection(".remix-section", 0); // Ensure remix section is visible
          }
        }, memeEventTime);

        // Disable auto-scroll after animation completes
        setTimeout(() => {
          setIsAutoScrolling(false);
          // Restore body scroll on mobile
          if (isMobile) {
            document.body.style.overflow = "";
          }
        }, totalDuration);

        // For non-commercial licenses, skip to completed state after full experience
        if (
          selectedLicense === "open-use" ||
          selectedLicense === "non-commercial"
        ) {
          await new Promise((resolve) => setTimeout(resolve, totalDuration));
          setDemoState("completed");
        } else {
          // For commercial licenses, show claim prompt after full experience
          await new Promise((resolve) => setTimeout(resolve, totalDuration));
          setDemoState("claiming");
        }
      };

      runDemo();
    }
  }, [
    activeStep,
    selectedLicense,
    canShowStats,
    canShowRevenueStreams,
    canShowRemixStreams,
  ]);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setTimeout(() => setActiveStep(2), 500);
    };
    reader.readAsDataURL(file);
  };

  const handleExampleImageUpload = (image: string | null) => {
    if (image) {
      setUploadedImage(image);
      setActiveStep(2);
    }
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
    // Reset staged reveal states
    setShowStats(false);
    setShowRevenueStreams(false);
    setShowRemixStreams(false);
    setCurrentEvents([]);
    setIsAutoScrolling(false);
  };

  return (
    <div className="bg-background md:overflow-hidden md:h-[calc(100vh-4rem)]">
      {/* Event Bubbles */}
      {currentEvents.map((event) => (
        <EventBubble
          key={event.id}
          message={event.message}
          icon={event.icon}
          color={event.color}
          delay={event.delay}
          duration={4000}
          position={event.position}
        />
      ))}

      <div className="md:max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-4 sm:gap-8 md:gap-12 relative md:h-full px-4 sm:px-8 py-4 sm:py-8 box-border">
        {/* Left Side - Journey Modal */}
        <StepsModal
          activeStep={activeStep}
          selectedLicense={selectedLicense}
          customRevShare={customRevShare}
          demoState={demoState}
          demoRevenue={totalRevenue}
          demoRoyalties={totalRoyalties}
          onUpload={handleFileUpload}
          onImageUpload={handleExampleImageUpload}
          onSelectLicense={setSelectedLicense}
          onCustomRevShareChange={setCustomRevShare}
          onProtect={handleProtect}
          onClaim={handleClaim}
          onReset={handleReset}
        />

        {/* Right Side - Dynamic Preview */}
        <div
          className={`w-full flex-1 md:h-[calc(100vh-6rem)] right-panel ${
            isAutoScrolling ? "md:overflow-hidden" : "md:overflow-y-auto"
          }`}
          style={{
            scrollBehavior: isAutoScrolling ? "smooth" : "auto",
          }}
        >
          <div className="md:max-w-[600px] mx-auto pb-8">
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <IPPreviewSection
                uploadedImage={uploadedImage}
                demoState={demoState}
                selectedLicense={selectedLicense}
                customRevShare={customRevShare}
              />

              {canShowStats && showStats && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 stats-section">
                  <StatsSection
                    demoState={demoState}
                    statsData={statsData}
                    selectedLicense={selectedLicense}
                  />
                </div>
              )}

              {canShowRevenueStreams && showRevenueStreams && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 revenue-section">
                  <RevenueStreamsSection
                    demoState={demoState}
                    usageExamples={usageExamples}
                    selectedExample={selectedExample}
                    uploadedImage={uploadedImage}
                    royaltyRate={royaltyRate}
                    onSelectExample={setSelectedExample}
                  />
                </div>
              )}

              {canShowRemixStreams && showRemixStreams && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 remix-section">
                  <RemixStreamsSection
                    demoState={demoState}
                    remixExamples={remixExamples}
                    selectedExample={selectedRemixExample}
                    uploadedImage={uploadedImage}
                    onSelectExample={setSelectedRemixExample}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
