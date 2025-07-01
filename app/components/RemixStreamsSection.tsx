import { RemixStreamCard } from "./RemixStreamCard";
import { RemixStream, DemoState } from "./types";

interface RemixStreamsSectionProps {
  demoState: DemoState;
  remixExamples: RemixStream[];
  selectedExample: RemixStream | null;
  uploadedImage: string | null;
  onSelectExample: (example: RemixStream | null) => void;
}

export function RemixStreamsSection({
  demoState,
  remixExamples,
  selectedExample,
  uploadedImage,
  onSelectExample,
}: RemixStreamsSectionProps) {
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
          <h3 className="text-base font-semibold">Remix Streams</h3>
          <div className="text-xs text-gray-500">
            {demoState === "using" && "Active Remixing"}
            {demoState === "selling" && "Creating Remixes"}
            {demoState === "earning" && "Remix Activity"}
            {demoState === "claiming" && "Remix Analytics"}
          </div>
        </div>

        <div className="space-y-3">
          {remixExamples.map((example) => (
            <RemixStreamCard
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
