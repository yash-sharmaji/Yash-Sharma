import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  Zap, 
  Award, 
  Heart, 
  Activity, 
  CheckCircle,
  Layers,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { RedisLockVisualizer } from './RedisLockVisualizer';

export const Projects = () => {
  const [selectedSimulator, setSelectedSimulator] = useState(false);
  const [reactions, setReactions] = useState({
    sharex: 42,
    civicai: 29,
    leetcode: 51
  });
  const [reactedList, setReactedList] = useState({});

  useEffect(() => {
    fetch('/api/reactions')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setReactions(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  const handleReaction = (id) => {
    if (reactedList[id]) return;
    setReactedList(prev => ({ ...prev, [id]: true }));
    setReactions(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    fetch(`/api/reactions/${id}`, { method: 'POST' }).catch(() => {});
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-b-2 border-[#1a1a1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#183d2d] uppercase tracking-wider mb-2">
              <FolderGit2 className="w-4 h-4 text-[#c0392b]" />
              <span>Production Systems & Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#183d2d] tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-sm font-mono text-[#575753] max-w-lg">
            High-concurrency systems, algorithmic solutions, and production applications built to withstand load.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {portfolioData.projects.map((proj, idx) => {
            const isShareX = proj.id === 'sharex';
            // ShareX spans full width (12 cols) as featured project, others span 6 cols each
            const colSpanClass = isShareX ? "lg:col-span-12" : "lg:col-span-6";

            return (
              <motion.div
                key={proj.id}
                data-tour={isShareX ? "featured-sharex" : undefined}
                className={`brutal-card bg-white p-6 sm:p-8 flex flex-col justify-between relative group ${colSpanClass}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-extrabold px-3 py-1 rounded-md bg-[#183d2d] text-[#f5f0e8] border border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        {proj.award}
                      </span>
                      {isShareX && (
                        <span className="hidden sm:inline-flex items-center gap-1 font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#c0392b] text-white border border-[#1a1a1a]">
                          <Sparkles className="w-3 h-3" /> FLAGSHIP
                        </span>
                      )}
                    </div>

                    {/* Reaction Counter Button */}
                    <button
                      onClick={() => handleReaction(proj.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#1a1a1a] text-xs font-mono font-bold transition-all cursor-pointer ${
                        reactedList[proj.id]
                          ? 'bg-[#c0392b] text-white shadow-[1px_1px_0px_#1a1a1a]'
                          : 'bg-[#faf8f5] text-[#575753] hover:text-[#c0392b] shadow-[2px_2px_0px_#1a1a1a]'
                      }`}
                      title="React to this project"
                    >
                      <Heart className={`w-3.5 h-3.5 ${reactedList[proj.id] ? 'fill-current text-white' : ''}`} />
                      <span>{reactions[proj.id] || 0}</span>
                    </button>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#183d2d] tracking-tight group-hover:text-[#c0392b] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="font-mono text-xs font-semibold text-[#575753] mt-1 mb-4">
                    {proj.tagline}
                  </p>

                  {/* Metric Chips */}
                  <div className={`grid gap-2 bg-[#ede8df] p-3 rounded-lg border border-[#1a1a1a] mb-5 font-mono ${
                    isShareX ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-3'
                  }`}>
                    {Object.entries(proj.stats).map(([k, v]) => (
                      <div key={k} className="text-center">
                        <div className="text-[10px] uppercase font-bold text-[#575753] truncate">{k}</div>
                        <div className="text-xs sm:text-sm font-extrabold text-[#183d2d] truncate">{v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 mb-6 text-xs sm:text-sm text-[#1d1d1b] leading-relaxed">
                    {proj.bulletPoints.map((bp, bidx) => (
                      <li key={bidx} className="flex items-start gap-2">
                        <span className="text-[#c0392b] font-bold mt-0.5">✦</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tags.map((tag, tidx) => (
                      <span
                        key={tidx}
                        className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded bg-[#faf8f5] border border-[#1a1a1a] text-[#1d1d1b]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 border-t-2 border-[#1a1a1a] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="brutal-btn-secondary px-3.5 py-2 text-xs cursor-pointer"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="brutal-btn-primary px-3.5 py-2 text-xs cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                      </a>
                    )}
                  </div>

                  {proj.hasSimulator && (
                    <button
                      onClick={() => setSelectedSimulator(true)}
                      className="px-3.5 py-2 rounded-md bg-amber-400 text-[#1a1a1a] font-mono text-xs font-bold border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1a1a1a] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current text-[#1a1a1a]" />
                      <span>Simulate Redis Lock</span>
                    </button>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ShareX Mutex Lock Simulation Modal */}
      <RedisLockVisualizer 
        isOpen={selectedSimulator} 
        onClose={() => setSelectedSimulator(false)} 
      />
    </section>
  );
};
