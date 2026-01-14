"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PreloaderContextType {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <PreloaderContext.Provider value={{ scrollProgress, setScrollProgress }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
}
