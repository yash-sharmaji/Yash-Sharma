import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, X, Sparkles } from 'lucide-react';

export const TourToast = ({ onStartTour }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 1.5 seconds if not dismissed previously
    const hasSeenTourPrompt = sessionStorage.getItem('yash_tour_prompt_seen');
    if (!hasSeenTourPrompt) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('yash_tour_prompt_seen', 'true');
  };

  const handleStart = () => {
    handleDismiss();
    onStartTour();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, x: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm w-full px-4 sm:px-0"
        >
          <div className="brutal-card bg-white p-4 flex items-start gap-3 border-2 border-[#1a1a1a] shadow-[5px_5px_0px_#1a1a1a]">
            <div className="p-2 rounded-lg bg-[#183d2d] text-white shrink-0 mt-0.5">
              <Compass className="w-5 h-5 text-amber-300 animate-spin-slow" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-black text-[#183d2d] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  First time here?
                </span>
                <button
                  onClick={handleDismiss}
                  className="text-[#575753] hover:text-[#1d1d1b] p-0.5 cursor-pointer"
                  aria-label="Dismiss tour prompt"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#575753] leading-relaxed mb-3">
                Take a 1-minute guided tour of my full-stack projects, distributed locks, and open-source impact.
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleStart}
                  className="brutal-btn-primary py-1.5 px-3 text-xs cursor-pointer flex-1"
                >
                  Start Tour →
                </button>
                <button
                  onClick={handleDismiss}
                  className="brutal-btn-secondary py-1.5 px-3 text-xs cursor-pointer"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
