"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isIframe = pathname.startsWith("/iframe");

  // Function to determine initial theme
  const getInitialTheme = (): Theme => {
    // First priority: Query parameter (for iframe or any other use case)
    const themeParam = searchParams.get("theme");
    if (themeParam === "dark" || themeParam === "light") {
      console.log(`Using theme from query parameter: ${themeParam}`);
      return themeParam;
    }

    // Second priority: Saved theme preference (non-iframe only)
    if (!isIframe) {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        return savedTheme;
      }

      // Third priority: System preference (non-iframe only)
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }

    // Default: light
    return "light";
  };

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      console.log("Applied dark theme");
    } else {
      root.classList.remove("dark");
      console.log("Applied light theme");
    }

    // Only save theme preference if not in iframe mode
    if (!isIframe) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, isIframe]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
