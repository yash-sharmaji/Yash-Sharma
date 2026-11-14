import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#183d2d] text-[#f5f0e8] py-12 sm:py-16 border-t-2 border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#f5f0e8]/20">
          
          {/* Brand & Signature */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded bg-[#f5f0e8] text-[#183d2d] font-mono font-black flex items-center justify-center text-sm border border-[#1a1a1a]">
                YS
              </div>
              <span className="font-extrabold text-lg text-[#f5f0e8]">
                {portfolioData.personal.name}
              </span>
            </div>
            <p className="font-mono text-xs text-[#ede8df]/80 max-w-sm">
              Code. Learn. Build. Repeat. • Open to SDE internships & production collaborations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs font-semibold">
            <a href="#projects" className="text-[#f5f0e8] hover:text-amber-300 transition-colors">
              Projects
            </a>
            <span>•</span>
            <a href="#opensource" className="text-[#f5f0e8] hover:text-amber-300 transition-colors">
              Open Source
            </a>
            <span>•</span>
            <a href="#techstack" className="text-[#f5f0e8] hover:text-amber-300 transition-colors">
              Tech Stack
            </a>
            <span>•</span>
            <a href="#contact" className="text-[#f5f0e8] hover:text-amber-300 transition-colors">
              Contact
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-lg bg-[#f5f0e8] text-[#183d2d] hover:bg-white border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer font-mono text-xs font-bold flex items-center gap-2"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#ede8df]/70 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Yash Sharma. Crafted with precision & clean architecture.
          </div>
          <div className="flex items-center gap-2">
            <span>MERN Stack</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
