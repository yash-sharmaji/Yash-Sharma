import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Volume2, VolumeX, Flame, Smile, Shuffle } from 'lucide-react';
import { triggerConfettiCelebration } from '../utils/tour';

export const VibingCorner = () => {
  const [isVibing, setIsVibing] = useState(true);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const developerQuotes = [
    "“Code. Learn. Build. Repeat.” — Yash Sharma",
    "“There is no place like 127.0.0.1, but production is where the fun begins.”",
    "“A distributed lock a day keeps the race conditions away.”",
    "“Throttling WebSocket events from 60 to 20 msgs/s saved my bandwidth and sanity.”",
    "“Life is short. Ship things that solve real human friction.”"
  ];

  const handleNextQuote = () => {
    setCurrentQuoteIndex(prev => (prev + 1) % developerQuotes.length);
  };

  return (
    <section id="vibing" className="py-16 sm:py-24 border-b-2 border-[#1a1a1a] relative" data-tour="vibing-corner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#c0392b] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Good Energy Zone & Easter Eggs</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#183d2d] tracking-tight">
              🐧 🦝 Vibing Corner
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVibing(!isVibing)}
              className="brutal-btn-secondary px-3.5 py-2 text-xs cursor-pointer"
            >
              {isVibing ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-[#575753]" />}
              <span>{isVibing ? "Beats: ACTIVE" : "Beats: MUTED"}</span>
            </button>

            <button
              onClick={triggerConfettiCelebration}
              className="brutal-btn-primary px-3.5 py-2 text-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Throw Confetti 🎉</span>
            </button>
          </div>
        </div>

        {/* Vibing Stage Box */}
        <div className="brutal-card bg-white p-6 sm:p-10 text-center relative overflow-hidden">
          
          {/* Animated Beat Bars Background */}
          {isVibing && (
            <div className="flex items-end justify-center gap-1.5 h-12 mb-6">
              {[40, 70, 95, 60, 80, 50, 90, 65, 85, 45, 75, 100, 60, 80, 55].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-[#183d2d] rounded-t"
                  animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6 + (i % 5) * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* Dancing Characters */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 my-4">
            
            {/* Club Penguin Character */}
            <motion.div 
              className="flex flex-col items-center"
              animate={isVibing ? { y: [0, -10, 0], rotate: [-2, 2, -2] } : {}}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            >
              <div className="w-36 h-36 rounded-2xl border-2 border-[#1a1a1a] bg-[#ede8df] shadow-[4px_4px_0px_#1a1a1a] flex items-center justify-center p-2 overflow-hidden relative">
                {/* Fallback SVG / GIF */}
                <img 
                  src="https://media.giphy.com/media/o7R0zMBuzMgAU/giphy.gif" 
                  alt="Club Penguin Dancing"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://media.tenor.com/Fw5Z1Jt1iK4AAAAM/penguin-dance.gif";
                  }}
                />
              </div>
              <span className="font-mono text-xs font-black text-[#183d2d] mt-2.5 px-2.5 py-0.5 rounded bg-[#faf8f5] border border-[#1a1a1a]">
                🐧 Club Penguin
              </span>
            </motion.div>

            {/* Pedro Raccoon Character */}
            <motion.div 
              className="flex flex-col items-center"
              animate={isVibing ? { y: [0, -12, 0], rotate: [2, -2, 2] } : {}}
              transition={{ repeat: Infinity, duration: 0.7, delay: 0.1, ease: "easeInOut" }}
            >
              <div className="w-36 h-36 rounded-2xl border-2 border-[#1a1a1a] bg-[#ede8df] shadow-[4px_4px_0px_#1a1a1a] flex items-center justify-center p-2 overflow-hidden relative">
                <img 
                  src="https://media.giphy.com/media/DGZVi7pqVq7rq/giphy.gif" 
                  alt="Pedro Pedro Pedro Raccoon"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://media.tenor.com/L1Z66Wz6E7gAAAAM/raccoon-pedro.gif";
                  }}
                />
              </div>
              <span className="font-mono text-xs font-black text-[#c0392b] mt-2.5 px-2.5 py-0.5 rounded bg-[#faf8f5] border border-[#1a1a1a]">
                🦝 Pedro Pedro Pedro
              </span>
            </motion.div>

          </div>

          {/* Interactive Quote Machine */}
          <div className="max-w-xl mx-auto mt-8 p-4 rounded-xl border-2 border-[#1a1a1a] bg-[#ede8df] shadow-[3px_3px_0px_#1a1a1a]">
            <p className="font-mono text-xs sm:text-sm font-bold text-[#183d2d] italic mb-3">
              {developerQuotes[currentQuoteIndex]}
            </p>
            <button
              onClick={handleNextQuote}
              className="text-xs font-mono font-bold text-[#575753] hover:text-[#1d1d1b] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Next Dev Quote</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

