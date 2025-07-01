import { RevenueStreamCard } from "./RevenueStreamCard";
import { UsageExample, DemoState } from "./types";

interface RevenueStreamsSectionProps {
  demoState: DemoState;
  usageExamples: UsageExample[];
  selectedExample: UsageExample | null;
  uploadedImage: string | null;
  onSelectExample: (example: UsageExample | null) => void;
}

export function RevenueStreamsSection({
  demoState,
  usageExamples,
  selectedExample,
  uploadedImage,
  onSelectExample,
}: RevenueStreamsSectionProps) {
  if (
    !(
      demoState === "using" ||
      demoState === "selling" ||
      demoState === "earning" ||
      demoState === "claiming"
    )
  ) {
    return null;
  }

  return (
    <div className="border-b border-gray-100 dark:border-gray-800">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">Revenue Streams</h3>
          <div className="text-xs text-gray-500">
            {demoState === "using" && "Active Usage"}
            {demoState === "selling" && "Generating Sales"}
            {demoState === "earning" && "Earning Revenue"}
            {demoState === "claiming" && "Ready to Claim"}
          </div>
        </div>

        <div className="space-y-3">
          {usageExamples.map((example) => (
            <RevenueStreamCard
              key={example.id}
              example={example}
              isSelected={selectedExample?.id === example.id}
              uploadedImage={uploadedImage}
              demoState={demoState}
              onClick={() =>
                onSelectExample(
                  selectedExample?.id === example.id ? null : example
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
