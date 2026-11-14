import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, CheckCircle, ShieldCheck } from 'lucide-react';

export const ProfileCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [img1Error, setImg1Error] = useState(false);
  const [img2Error, setImg2Error] = useState(false);

  // We check for common extensions: if user puts profile-original.png/jpg/webp or profile-animated.png/jpg/gif
  // it gracefully loads, falling back to our high-res bespoke SVG avatars.
  const photo1 = img1Error ? '/profile-original.svg' : '/profile-original.png';
  const photo2 = img2Error ? '/profile-animated.svg' : '/profile-animated.png';

  return (
    <div 
      className="relative w-full max-w-md mx-auto group cursor-pointer select-none"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(prev => !prev)}
    >
      {/* 3D Flip Card Container */}
      <motion.div
        className="w-full relative h-[440px] sm:h-[480px]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ================= FRONT FACE (Original Photo) ================= */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl border-2 border-[#1a1a1a] bg-white shadow-[6px_6px_0px_#1a1a1a] overflow-hidden flex flex-col"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Card Frame Header */}
          <div className="bg-[#ede8df] px-4 py-2.5 border-b-2 border-[#1a1a1a] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c0392b] border border-black/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-black/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black/40"></span>
              <span className="font-mono text-xs font-bold text-[#183d2d] ml-1.5">
                yash.portrait.original
              </span>
            </div>
          </div>

          {/* Photo Container - Nudged down by 3-4 pixels */}
          <div className="flex-1 relative bg-[#f5f0e8] overflow-hidden flex items-center justify-center p-2 pt-3">
            <img 
              src={photo1} 
              alt="Yash Sharma - Original Photo" 
              onError={() => setImg1Error(true)}
              className="w-full h-full object-cover rounded-xl border border-[#1a1a1a]/20 translate-y-[4px] transition-transform duration-300 group-hover:scale-[1.02]"
            />

            {/* Bottom Status Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] flex items-center justify-between">
              <div>
                <div className="font-extrabold text-sm text-[#183d2d]">Yash Sharma</div>
                <div className="font-mono text-[11px] text-[#575753]">Full-Stack Web Developer</div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-100 border border-emerald-300 font-mono text-[10px] font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>AVAILABLE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BACK FACE (Slightly Animated Photo - Consistent with Front Face) ================= */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl border-2 border-[#1a1a1a] bg-white shadow-[6px_6px_0px_#1a1a1a] overflow-hidden flex flex-col"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          {/* Card Frame Header */}
          <div className="bg-[#ede8df] px-4 py-2.5 border-b-2 border-[#1a1a1a] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c0392b] border border-black/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-black/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black/40"></span>
              <span className="font-mono text-xs font-bold text-[#183d2d] ml-1.5">
                yash.portrait.animated
              </span>
            </div>
          </div>

          {/* Animated Photo Container */}
          <div className="flex-1 relative bg-[#f5f0e8] overflow-hidden flex items-center justify-center p-2 pt-3">
            <img 
              src={photo2} 
              alt="Yash Sharma - Animated Vibe" 
              onError={() => setImg2Error(true)}
              className="w-full h-full object-cover rounded-xl border border-[#1a1a1a]/20 translate-y-[4px] transition-transform duration-300 group-hover:scale-[1.02]"
            />

            {/* Bottom Status Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] flex items-center justify-between">
              <div>
                <div className="font-extrabold text-sm text-[#183d2d] flex items-center gap-1.5">
                  <span>Yash Sharma</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="font-mono text-[11px] text-[#575753]">Full-Stack Web Developer</div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-100 border border-emerald-300 font-mono text-[10px] font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>AVAILABLE</span>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
