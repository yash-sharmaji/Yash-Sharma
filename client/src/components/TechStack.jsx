import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  Database, 
  Layout, 
  Wrench, 
  Check, 
  Terminal,
  Code2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const domains = Object.keys(portfolioData.techStack);

  const getDomainIcon = (domain) => {
    switch (domain) {
      case 'Languages': return <Code2 className="w-4 h-4 text-[#c0392b]" />;
      case 'Backend': return <Layers className="w-4 h-4 text-[#183d2d]" />;
      case 'Databases': return <Database className="w-4 h-4 text-emerald-600" />;
      case 'Frontend': return <Layout className="w-4 h-4 text-blue-600" />;
      case 'DevOps': return <Wrench className="w-4 h-4 text-amber-600" />;
      default: return <Cpu className="w-4 h-4 text-[#183d2d]" />;
    }
  };

  const getDisplayedItems = () => {
    if (activeCategory === 'All') {
      return Object.entries(portfolioData.techStack).flatMap(([domain, items]) => 
        items.map(item => ({ ...item, domain }))
      );
    }
    return portfolioData.techStack[activeCategory].map(item => ({ ...item, domain: activeCategory }));
  };

  const items = getDisplayedItems();

  return (
    <section id="techstack" className="py-16 sm:py-24 border-b-2 border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#183d2d] uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4 text-[#183d2d]" />
              <span>Engineered Tooling & Technologies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#183d2d] tracking-tight">
              Tech Arsenal
            </h2>
          </div>
          <p className="text-sm font-mono text-[#575753] max-w-md">
            Production-grade modern stack optimized for type safety, concurrency controls, and algorithmic speed.
          </p>
        </div>

        {/* Domain Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-3.5 py-2 rounded-lg font-bold border-2 border-[#1a1a1a] transition-all cursor-pointer ${
              activeCategory === 'All'
                ? 'bg-[#183d2d] text-[#f5f0e8] shadow-[2px_2px_0px_#1a1a1a]'
                : 'bg-white text-[#1d1d1b] hover:bg-[#ede8df]'
            }`}
          >
            All Disciplines ({Object.values(portfolioData.techStack).flat().length})
          </button>

          {domains.map(dom => (
            <button
              key={dom}
              onClick={() => setActiveCategory(dom)}
              className={`px-3.5 py-2 rounded-lg font-bold border-2 border-[#1a1a1a] transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === dom
                  ? 'bg-[#183d2d] text-[#f5f0e8] shadow-[2px_2px_0px_#1a1a1a]'
                  : 'bg-white text-[#1d1d1b] hover:bg-[#ede8df]'
              }`}
            >
              {getDomainIcon(dom)}
              <span>{dom}</span>
            </button>
          ))}
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((tech, idx) => (
            <motion.div
              key={tech.name + tech.domain}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
              className="brutal-card bg-white p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#575753]">
                    {tech.domain}
                  </span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#ede8df] text-[#183d2d] border border-[#1a1a1a]/20">
                    {tech.level}
                  </span>
                </div>
                <h4 className="font-black text-lg text-[#183d2d] mb-1">
                  {tech.name}
                </h4>
                <p className="text-xs text-[#575753] leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1a1a1a]/10 flex items-center gap-1.5 font-mono text-[11px] text-[#183d2d] font-bold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Production Verified</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

