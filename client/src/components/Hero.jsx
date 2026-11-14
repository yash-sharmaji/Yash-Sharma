import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Compass, 
  Award, 
  GitPullRequest, 
  Cpu, 
  Mail, 
  CheckCircle2,
  FileText,
  Download
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ProfileCard } from './ProfileCard';

export const Hero = ({ onStartTour, onOpenThemedResume }) => {
  const roles = portfolioData.personal.roles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-10 pb-16 sm:pt-14 sm:pb-24 overflow-hidden border-b-2 border-[#1a1a1a]">
      {/* Subtle Grid Accent Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1a1a1a 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Roles & CTAs */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Live Status Pill */}
            <div 
              data-tour="hero-status"
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs font-bold text-[#183d2d] uppercase tracking-wide">
                {portfolioData.personal.status}
              </span>
            </div>

            {/* Name with Clean Red Straight Line Accent */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#183d2d] leading-[1.12] mb-5">
              Hi, I'm{' '}
              <span className="relative inline-block pb-2">
                <span className="relative z-10">{portfolioData.personal.name}</span>
                {/* Clean Red Straight Accent Line */}
                <span className="absolute left-0 bottom-0.5 w-full h-[5px] bg-[#c0392b] rounded-full"></span>
              </span>
            </h1>

            {/* Dynamic Role Rotator */}
            <div className="h-12 sm:h-14 flex items-center mb-6">
              <span className="font-mono text-lg sm:text-2xl font-bold text-[#1d1d1b] flex items-center gap-2">
                <span className="text-[#c0392b]">&gt;</span>
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#ede8df] px-3 py-1 rounded border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]"
                >
                  {roles[currentRoleIndex]}
                </motion.span>
              </span>
            </div>

            {/* Core Philosophy Paragraph */}
            <p className="text-base sm:text-lg text-[#575753] leading-relaxed max-w-2xl mb-8 font-normal">
              Computer Science undergraduate focused on <strong className="text-[#183d2d] font-semibold">full-stack web development</strong>, <strong className="text-[#183d2d] font-semibold">real-time distributed systems</strong>, and high-concurrency race condition prevention.
              <br />
              <span className="font-mono text-sm text-[#183d2d] font-semibold mt-2 inline-block">
                “{portfolioData.personal.approach}”
              </span>
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-8 w-full sm:w-auto">
              <a 
                href="#projects" 
                className="brutal-btn-primary px-5 py-3 text-sm cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* View Themed Resume Modal */}
              <button
                onClick={onOpenThemedResume}
                className="brutal-btn-secondary px-4 py-3 text-sm cursor-pointer text-[#183d2d]"
                title="View clean themed resume"
              >
                <FileText className="w-4 h-4 text-[#183d2d]" />
                <span>View CV Resume</span>
              </button>

              {/* Download Original PDF */}
              {/* <a
                href="/Resume.pdf"
                download="Yash_Sharma_Resume.pdf"
                className="brutal-btn-secondary px-4 py-3 text-sm cursor-pointer text-[#1d1d1b]"
                title="Download original Resume PDF"
              >
                <Download className="w-4 h-4 text-[#c0392b]" />
                <span>Download CV</span>
              </a> */}

              <button
                onClick={onStartTour}
                className="brutal-btn-secondary px-4 py-3 text-sm cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#183d2d]" />
                <span>Tour</span>
              </button>

              <button
                onClick={copyEmail}
                className="brutal-btn-secondary px-3.5 py-3 text-sm cursor-pointer text-[#575753] hover:text-[#1d1d1b]"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Say Hi</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Badges row */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="font-mono text-xs font-bold text-[#575753] mr-2 uppercase tracking-wider">
                Core Metrics:
              </span>
              <div className="brutal-badge bg-[#faf8f5]">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Runner-Up Code Conqueror</span>
              </div>
              <div className="brutal-badge bg-[#faf8f5]">
                <GitPullRequest className="w-3.5 h-3.5 text-indigo-600" />
                <span>18+ Open Source PRs</span>
              </div>
              <div className="brutal-badge bg-[#faf8f5]">
                <Cpu className="w-3.5 h-3.5 text-[#183d2d]" />
                <span>500+ DSA (LeetCode/CF)</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive 3D Flip Profile Picture Card */}
          <motion.div 
            className="lg:col-span-5 w-full flex justify-center"
            data-tour="profile-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <ProfileCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
