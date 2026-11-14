import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, ExternalLink, Mail, Phone, Award, BookOpen, Briefcase, Code2, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const ThemedResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="brutal-card bg-white max-w-4xl w-full my-auto overflow-hidden border-2 border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] flex flex-col max-h-[92vh]"
      >
        {/* Top Control Bar */}
        <div className="bg-[#ede8df] px-4 py-3 border-b-2 border-[#1a1a1a] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c0392b] border border-black/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-black/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black/40"></span>
            <span className="font-mono text-xs font-bold text-[#183d2d] ml-2">
              Yash_Sharma_Resume.themed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 px-3 rounded-md bg-white border border-[#1a1a1a] font-mono text-xs font-bold hover:bg-[#faf8f5] flex items-center gap-1.5 cursor-pointer shadow-[1px_1px_0px_#1a1a1a]"
              title="Print Themed Resume"
            >
              <Printer className="w-3.5 h-3.5 text-[#183d2d]" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <a
              href="/Resume.pdf"
              download="Yash_Sharma_Resume.pdf"
              className="p-1.5 px-3 rounded-md bg-[#183d2d] text-white border border-[#1a1a1a] font-mono text-xs font-bold hover:bg-[#245741] flex items-center gap-1.5 cursor-pointer shadow-[1px_1px_0px_#1a1a1a]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md border border-[#1a1a1a] hover:bg-[#f5f0e8] transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto font-sans text-[#1d1d1b] space-y-7 bg-white print:p-0">
          
          {/* Header */}
          <div className="border-b-2 border-[#183d2d] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#183d2d] tracking-tight">
                Yash Sharma
              </h1>
              <p className="font-mono text-xs sm:text-sm font-bold text-[#575753] mt-1">
                Full-Stack Web Developer & Distributed Systems Engineer
              </p>
            </div>

            <div className="font-mono text-xs text-[#575753] space-y-1 sm:text-right">
              <div>
                <a href="mailto:ysharma8502@gmail.com" className="hover:text-[#c0392b] transition-colors">
                  ysharma8502@gmail.com
                </a>{' '}
                • <span>+91-7020248612</span>
              </div>
              <div className="flex sm:justify-end gap-3 text-xs pt-0.5">
                <a href="https://linkedin.com/in/yash-sharmaji" target="_blank" rel="noreferrer" className="text-[#0A66C2] hover:underline flex items-center gap-1">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <span>•</span>
                <a href="https://github.com/yash-sharmaji" target="_blank" rel="noreferrer" className="text-[#1d1d1b] hover:underline flex items-center gap-1">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Education */}
          <section>
            <h2 className="text-xs font-mono font-black uppercase text-[#183d2d] tracking-wider border-b border-[#183d2d]/25 pb-1 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#c0392b]" />
              <span>Education</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <strong className="text-[#183d2d] font-bold">National Institute of Technology, Jamshedpur</strong>
                  <div className="text-xs text-[#575753]">B.Tech, Computer Science and Engineering</div>
                </div>
                <div className="text-xs font-mono sm:text-right text-[#575753] mt-1 sm:mt-0">
                  <span className="font-bold text-[#183d2d]">CGPA: 8.12</span> • Aug 2025 – Present
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1">
                <div>
                  <strong className="text-[#183d2d] font-bold">S. M. Patel Junior College, Gondia</strong>
                  <div className="text-xs text-[#575753]">Class XII (Higher Secondary)</div>
                </div>
                <div className="text-xs font-mono sm:text-right text-[#575753] mt-1 sm:mt-0">
                  <span className="font-bold text-[#183d2d]">Score: 87%</span> • 2025
                </div>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="text-xs font-mono font-black uppercase text-[#183d2d] tracking-wider border-b border-[#183d2d]/25 pb-1 mb-3 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#183d2d]" />
              <span>Technical Skills</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="bg-[#f5f0e8] p-2.5 rounded border border-[#1a1a1a]/15">
                <span className="font-mono font-bold text-[#183d2d] block text-[11px] mb-0.5">LANGUAGES</span>
                <span>C, C++, Java, Python, JavaScript, TypeScript, Bash, HTML/CSS</span>
              </div>
              <div className="bg-[#f5f0e8] p-2.5 rounded border border-[#1a1a1a]/15">
                <span className="font-mono font-bold text-[#183d2d] block text-[11px] mb-0.5">FRONTEND</span>
                <span>React, Next.js, Tailwind CSS v4, Framer Motion, Bootstrap</span>
              </div>
              <div className="bg-[#f5f0e8] p-2.5 rounded border border-[#1a1a1a]/15">
                <span className="font-mono font-bold text-[#183d2d] block text-[11px] mb-0.5">BACKEND & APIS</span>
                <span>Node.js, Express.js, REST APIs, JWT/OAuth, Google Gemini API</span>
              </div>
              <div className="bg-[#f5f0e8] p-2.5 rounded border border-[#1a1a1a]/15">
                <span className="font-mono font-bold text-[#183d2d] block text-[11px] mb-0.5">DATABASES & CLOUD</span>
                <span>PostgreSQL, Supabase, MongoDB, MySQL, Linux, Git, Docker, Vercel</span>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-xs font-mono font-black uppercase text-[#183d2d] tracking-wider border-b border-[#183d2d]/25 pb-1 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>Featured Projects</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* ShareX */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <div className="font-bold text-[#183d2d] text-sm flex items-center gap-2">
                    <span>ShareX – Campus Resource Sharing Platform</span>
                    <span className="font-mono text-[10px] bg-amber-100 text-amber-900 px-2 py-0.2 rounded border border-amber-300">
                      🥈 1st Runner-Up
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#575753]">Oct 2026</span>
                </div>
                <div className="font-mono text-[11px] text-[#575753] mb-1.5">
                  Node.js, Express.js, MongoDB, Redis, Tailwind CSS, Framer Motion, Driver.js
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#1d1d1b] leading-relaxed">
                  <li>Awarded 1st Runner-Up at <strong>Code Conqueror India 2026</strong> national hackathon.</li>
                  <li>Engineered university equipment-lending architecture with atomic distributed Redis mutex locks preventing double-booking race conditions.</li>
                  <li>Developed multi-step booking flows with 12-rule eligibility engine and responsive guided tour interactions.</li>
                </ul>
              </div>

              {/* CivicConnect */}
              <div className="pt-2 border-t border-[#1a1a1a]/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <div className="font-bold text-[#183d2d] text-sm">
                    CivicConnect – AI-Powered Civic Issue Platform
                  </div>
                  <span className="font-mono text-xs text-[#575753]">HackSphere 2026</span>
                </div>
                <div className="font-mono text-[11px] text-[#575753] mb-1.5">
                  Next.js, Node.js, Express.js, Supabase, PostgreSQL, Gemini API, MapTiler
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#1d1d1b] leading-relaxed">
                  <li>Full-stack municipal grievance platform connecting citizens with city authorities across a 6-stage audit lifecycle.</li>
                  <li>Integrated Gemini API to auto-classify unstructured complaints, predict urgency, and eliminate misrouted reports.</li>
                  <li>Secured backend with Supabase Row Level Security (RLS), RBAC permissions, and interactive GPS map issue geotagging.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Open Source Contributions */}
          <section>
            <h2 className="text-xs font-mono font-black uppercase text-[#183d2d] tracking-wider border-b border-[#183d2d]/25 pb-1 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#c0392b]" />
              <span>Open Source Contributions (NSoC & Hacktoberfest)</span>
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#183d2d] shrink-0">• Contribo:</span>
                <span>Architected responsive 6-step Contributor Lifecycle framework and automated PR action toolkit.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#183d2d] shrink-0">• CareerForge:</span>
                <span>Implemented interactive 52-week GitHub-style contribution activity visualizer with 4-level heatmaps.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#183d2d] shrink-0">• Open-Agents:</span>
                <span>Resolved UI streaming race condition in LLM response auto-scroll and scroll-to-bottom toggle.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#183d2d] shrink-0">• Hacktoberfest '26:</span>
                <span>Integrated Sign in with GitHub OAuth, embedded Lua runtime scripting, and brute-force rate-limiting headers.</span>
              </div>
            </div>
          </section>

          {/* Achievements & Responsibilities */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <h2 className="text-xs font-mono font-black uppercase text-[#183d2d] tracking-wider border-b border-[#183d2d]/25 pb-1 mb-2">
                Key Achievements
              </h2>
              <ul className="space-y-1 text-xs text-[#1d1d1b]">
                <li>• <strong>500+ DSA Problems Solved</strong> across LeetCode, CodeChef, and Codeforces.</li>
                <li>• Reached <strong>Pupil on Codeforces</strong> and <strong>2-Star on CodeChef</strong>.</li>
                <li>• Ranked in <strong>Top 50</strong> in Nexus Spring of Code (NSoC) 2026.</li>
                <li>• 1st Runner-Up, Business Simulation Challenge, OJASS.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-mono font-black uppercase text-[#183d2d] tracking-wider border-b border-[#183d2d]/25 pb-1 mb-2">
                Positions of Responsibility
              </h2>
              <ul className="space-y-1 text-xs text-[#1d1d1b]">
                <li>• <strong>Programming Club (PCON), NIT JSR</strong>: Web Team Member</li>
                <li>• <strong>SCSE, NIT Jamshedpur</strong>: Technical Team Member organizing campus coding contests.</li>
              </ul>
            </div>
          </section>

        </div>

      </motion.div>
    </div>
  );
};
