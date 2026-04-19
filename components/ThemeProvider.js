"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Patch to suppress the React 19 / Next.js 16 false-positive hydration warning 
 * regarding script tags injected by next-themes for theme initialization.
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" && 
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
