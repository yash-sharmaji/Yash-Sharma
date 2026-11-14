import React from 'react';
import { Compass, Mail, ExternalLink, Sparkles, Terminal, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export const Header = ({ onStartTour, onOpenThemedResume }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f5f0e8]/90 backdrop-blur-md border-b-2 border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div data-tour="header-brand" className="flex items-center gap-3">
            <a 
              href="#hero" 
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#183d2d] border-2 border-[#1a1a1a] flex items-center justify-center text-[#f5f0e8] font-mono font-black text-lg shadow-[2px_2px_0px_#1a1a1a] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[4px_4px_0px_#1a1a1a] transition-all">
                YS
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight flex items-center gap-1.5 text-[#183d2d]">
                  {portfolioData.personal.name}
                  <span className="text-xs px-2 py-0.5 rounded bg-[#183d2d]/10 border border-[#183d2d]/30 font-mono text-[#183d2d] hidden sm:inline-block">
                    v2026.1
                  </span>
                </span>
                <span className="text-xs text-[#575753] font-mono -mt-1 hidden md:inline">
                  @{portfolioData.personal.handle}
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs font-semibold">
            <a 
              href="#projects" 
              className="px-3 py-1.5 rounded-md hover:bg-[#ede8df] hover:border hover:border-[#1a1a1a] transition-all"
            >
              Projects
            </a>
            <a 
              href="#opensource" 
              className="px-3 py-1.5 rounded-md hover:bg-[#ede8df] hover:border hover:border-[#1a1a1a] transition-all"
            >
              Open Source
            </a>
            <a 
              href="#techstack" 
              className="px-3 py-1.5 rounded-md hover:bg-[#ede8df] hover:border hover:border-[#1a1a1a] transition-all"
            >
              Tech Stack
            </a>
            <button
              onClick={onOpenThemedResume}
              className="px-3 py-1.5 rounded-md hover:bg-[#ede8df] hover:border hover:border-[#1a1a1a] transition-all cursor-pointer font-bold text-[#183d2d] flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
            <a 
              href="#contact" 
              className="px-3 py-1.5 rounded-md hover:bg-[#ede8df] hover:border hover:border-[#1a1a1a] transition-all"
            >
              Contact
            </a>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tour Button */}
            <button
              onClick={onStartTour}
              className="brutal-btn-primary px-3 sm:px-4 py-2 text-xs sm:text-sm cursor-pointer group"
              title="Take a 1-minute guided tour"
              aria-label="Start interactive tour"
            >
              <Compass className="w-4 h-4 animate-spin-slow group-hover:rotate-45 transition-transform" />
              <span>Tour</span>
            </button>

            {/* Social Icons */}
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border-2 border-[#1a1a1a] bg-white shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#ede8df] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1a1a1a] transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4 text-[#1d1d1b]" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border-2 border-[#1a1a1a] bg-white shadow-[2px_2px_0px_#1a1a1a] hover:bg-[#ede8df] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1a1a1a] transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
