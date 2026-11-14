import React from 'react';
import { Award, GitPullRequest, Flame, Terminal, Star, Sparkles } from 'lucide-react';

export const MarqueeTicker = () => {
  const items = [
    { text: "🥈 1ST RUNNER-UP @ CODE CONQUEROR INDIA 2026", highlight: true },
    { text: "⚡ ARCHITECT OF SHAREX: REDIS DISTRIBUTED LOCKS & LUA VALIDATION", highlight: false },
    { text: "🌐 18+ OPEN SOURCE PRS ACROSS 10+ REPOSITORIES", highlight: true },
    { text: "🔥 HACKTOBERFEST 2026 CONTRIBUTOR: GITHUB OAUTH & LUA RUNTIME", highlight: false },
    { text: "🧠 100+ LEETCODE ALGORITHMIC PROBLEMS IN MODERN C++", highlight: false },
    { text: "🚀 OPEN TO SDE INTERNSHIPS & PRODUCTION COLLABORATIONS", highlight: true }
  ];

  return (
    <div className="bg-[#183d2d] text-[#f5f0e8] border-b-2 border-[#1a1a1a] py-2 overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap font-mono text-xs font-bold tracking-wider">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className={item.highlight ? "text-[#f59e0b] flex items-center gap-1.5" : "text-[#f5f0e8]"}>
              {item.highlight && <Sparkles className="w-3.5 h-3.5 inline text-[#f59e0b]" />}
              {item.text}
            </span>
            <span className="text-[#ede8df]/40 font-black">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

