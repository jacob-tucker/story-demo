interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, className = "w-4 h-4", style }: IconProps) {
  // Extract size from className for Font Awesome
  const sizeClass = className.includes("w-4 h-4")
    ? "text-sm"
    : className.includes("w-6 h-6")
    ? "text-lg"
    : className.includes("w-8 h-8")
    ? "text-xl"
    : "text-sm";

  // Preserve any color classes from the original className
  const colorClasses = className.match(/text-\w+/g)?.join(" ") || "";

  return (
    <i
      className={`${name} ${sizeClass} ${colorClasses} flex items-center justify-center`}
      style={style}
    />
  );
}
