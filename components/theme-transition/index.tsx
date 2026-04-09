"use client";

import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TransitionContextType {
  startTransition: (callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  startTransition: () => {},
});

export const useThemeTransition = () => useContext(TransitionContext);

/**
 * ThemeTransitionProvider
 * Manages the "Loading Screen" state during theme switches.
 */
export const ThemeTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (callback: () => void) => {
    setIsTransitioning(true);

    // Smooth sequence:
    // 1. Show loading screen
    // 2. Wait for fade-in (400ms)
    // 3. Swap theme variables
    // 4. Wait for visual adjustment
    // 5. Fade out

    setTimeout(() => {
      callback();
    }, 500);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1300);
  };

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-background/60 fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Premium Rotating Indicator */}
              <div className="relative flex size-16 items-center justify-center">
                <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20 blur-xl" />
                <div className="h-full w-full animate-spin rounded-full border-2 border-slate-200 border-t-blue-500 dark:border-white/10 dark:border-t-blue-400" />
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <span className="text-foreground text-[10px] font-black tracking-[0.3em] uppercase opacity-40">
                  Laboratory
                </span>
                <span className="text-foreground text-xs font-bold">Synchronizing Theme...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};
