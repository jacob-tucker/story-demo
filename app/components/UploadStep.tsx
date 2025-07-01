import { useState } from "react";
import { Icon } from "./Icon";

interface UploadStepProps {
  isActive: boolean;
  isCompleted: boolean;
  onUpload: (file: File) => void;
  onImageUpload: (image: string) => void;
}

export function UploadStep({
  isActive,
  isCompleted,
  onUpload,
  onImageUpload,
}: UploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className={`rounded-xl border ${
        isCompleted
          ? "border-green-200 dark:border-green-800"
          : isActive
          ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/5"
          : "border-black/5 dark:border-white/5"
      } p-4`}
    >
      <div className="flex items-center gap-1.5">
        {isCompleted ? (
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">✓</span>
          </div>
        ) : (
          <span className="text-xs font-medium">1</span>
        )}
        <span className="text-sm font-medium">Upload your IP</span>
      </div>

      {isActive && (
        <div
          className={`
            mt-2 border border-dashed rounded-lg p-4 text-center cursor-pointer
            transition-colors duration-200
            ${
              isDragging
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                : "border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
            }
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
          />
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Icon
              name="fas fa-upload"
              className="w-4 h-4 text-gray-600 dark:text-gray-400"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Upload File
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Drop your file here, or click to browse
          </p>
        </div>
      )}
    </div>
  );
}
