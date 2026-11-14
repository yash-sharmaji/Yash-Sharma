import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, Star, GitCommit, GitBranch, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export const GithubStats = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#ede8df] border-b-2 border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#183d2d] uppercase tracking-wider mb-2">
              <Activity className="w-4 h-4 text-[#c0392b]" />
              <span>Real-Time Git Activity & Benchmarks</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#183d2d] tracking-tight">
              GitHub Insights
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href={portfolioData.personal.github} 
              target="_blank" 
              rel="noreferrer"
              className="brutal-btn-primary px-4 py-2 text-xs"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Follow @{portfolioData.personal.handle}</span>
            </a>
          </div>
        </div>

        {/* Live Badges Counter Strip */}
        <div className="flex flex-wrap items-center gap-4 mb-8 font-mono text-xs">
          <div className="bg-white px-3.5 py-2 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-[#183d2d]">Daily Committer</span>
          </div>
          <div className="bg-white px-3.5 py-2 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#c0392b]" />
            <span className="font-bold text-[#1d1d1b]">Active Streak Tracker</span>
          </div>
          <div className="bg-white px-3.5 py-2 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-[#1d1d1b]">100% Verified Commits</span>
          </div>
        </div>

        {/* Visualized Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Streak */}
          <div className="brutal-card bg-[#1d1d1b] p-4 flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full flex items-center justify-between text-[#a0a09a] font-mono text-xs border-b border-[#333] pb-2 mb-3">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Flame className="w-4 h-4" /> Streak Tracker
              </span>
              <span>TokyoNight</span>
            </div>
            <img 
              src="https://streak-stats.demolab.com/?user=yash-sharmaji&theme=tokyonight&hide_border=true&border_radius=8" 
              alt="Yash's GitHub streak" 
              className="w-full h-auto rounded-lg max-h-48 object-contain"
              loading="lazy"
            />
          </div>

          {/* Card 2: Overview Stats */}
          <div className="brutal-card bg-[#1d1d1b] p-4 flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full flex items-center justify-between text-[#a0a09a] font-mono text-xs border-b border-[#333] pb-2 mb-3">
              <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                <Activity className="w-4 h-4" /> Lifetime Statistics
              </span>
              <span>TokyoNight</span>
            </div>
            <img 
              src="https://github-readme-stats-seven-topaz.vercel.app/api?username=yash-sharmaji&show_icons=true&include_all_commits=true&theme=tokyonight&hide_border=true&border_radius=8" 
              alt="Yash's GitHub stats" 
              className="w-full h-auto rounded-lg max-h-48 object-contain"
              loading="lazy"
            />
          </div>

          {/* Card 3: Top Languages */}
          <div className="brutal-card bg-[#1d1d1b] p-4 flex flex-col items-center justify-center overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="w-full flex items-center justify-between text-[#a0a09a] font-mono text-xs border-b border-[#333] pb-2 mb-3">
              <span className="flex items-center gap-1.5 text-purple-400 font-bold">
                <Star className="w-4 h-4" /> Top Languages Breakdown
              </span>
              <span>TokyoNight</span>
            </div>
            <img 
              src="https://github-readme-stats-seven-topaz.vercel.app/api/top-langs?username=yash-sharmaji&layout=compact&langs_count=8&theme=tokyonight&hide_border=true&border_radius=8" 
              alt="Top Languages" 
              className="w-full h-auto rounded-lg max-h-48 object-contain"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
