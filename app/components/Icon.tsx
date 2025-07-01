interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, className = "w-4 h-4", style }: IconProps) {
  const getIconPath = (iconName: string) => {
    switch (iconName) {
      case "shirt":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7l-1-4H9L8 7l-6 2v11h16V9l-2-2z"
          />
        );
      case "gem":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2l3.09 6.26L22 9l-5.91 1.74L12 17l-4.09-6.26L2 9l6.91-1.74L12 2z"
          />
        );
      case "palette":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7.5 21c.83 0 1.5-.67 1.5-1.5 0-.83-.67-1.5-1.5-1.5S6 18.67 6 19.5 6.67 21 7.5 21zM2.5 14.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM8.5 12c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM14.5 10.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM17.5 16c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2-.81 2-2 0-.83-.67-1.5-1.5-1.5-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5c2.21 0 4-1.79 4-4 0-5.52-4.48-10-10-10z"
          />
        );
      case "lock-open":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
          />
        );
      case "book":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 014 17V4a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2H6.5a2.5 2.5 0 01-2.5-2.5z"
          />
        );
      case "dollar":
        return (
          <>
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 6v12M9.5 9a2.5 2.5 0 015 0c0 .5-.5 1-1 1h-3c-.5 0-1 .5-1 1s.5 1 1 1h3c.5 0 1 .5 1 1a2.5 2.5 0 01-5 0"
            />
          </>
        );
      case "sparkles":
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
            />
          </>
        );
      case "money":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        );
      default:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
    }
  };

  return (
    <svg
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {getIconPath(name)}
    </svg>
  );
}
