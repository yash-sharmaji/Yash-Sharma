import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitPullRequest, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  Terminal, 
  Layout, 
  FileText,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const OpenSource = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Security & Auth',
    'Runtime Engines',
    'UI & Tooling',
    'Tooling & Workflow',
    'i18n & Docs'
  ];

  const filteredPRs = portfolioData.openSourcePRs.filter(pr => {
    const matchesCategory = selectedCategory === 'All' || pr.category.includes(selectedCategory) || (selectedCategory === 'i18n & Docs' && (pr.category.includes('Docs') || pr.category.includes('i18n') || pr.category.includes('Education')));
    const matchesSearch = pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pr.repo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pr.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pr.prNumber.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="opensource" className="py-16 sm:py-24 bg-[#ede8df] border-b-2 border-[#1a1a1a]" data-tour="open-source-matrix">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#c0392b] uppercase tracking-wider mb-2">
              <GitPullRequest className="w-4 h-4" />
              <span>Public Contributions & Community Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#183d2d] tracking-tight">
              Open Source Matrix
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] font-mono text-xs font-bold text-[#183d2d]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>18+ Merged Pull Requests Across 10+ Repos</span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#183d2d] text-[#f5f0e8] border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]'
                    : 'bg-white text-[#1d1d1b] border-[#1a1a1a] hover:bg-[#faf8f5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#575753]" />
            <input
              type="text"
              placeholder="Filter by repo or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-[#1a1a1a] rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono placeholder:text-[#a0a09a] focus:outline-none focus:ring-2 focus:ring-[#183d2d] shadow-[2px_2px_0px_#1a1a1a]"
            />
          </div>
        </div>

        {/* PR Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPRs.map((pr, idx) => (
              <motion.div
                key={pr.prNumber + pr.repo}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="brutal-card bg-white p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-3 border-b border-[#1a1a1a]/15 pb-2">
                    <span className="font-mono text-xs font-bold text-[#575753] truncate">
                      {pr.repo}
                    </span>
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
                      {pr.prNumber}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-black text-base text-[#183d2d] mb-2 leading-snug">
                    {pr.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-[#575753] font-normal leading-relaxed mb-4">
                    {pr.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-[#1a1a1a]/15 flex items-center justify-between font-mono text-xs">
                  <span className="text-[11px] font-semibold text-[#183d2d] bg-[#183d2d]/10 px-2 py-0.5 rounded">
                    {pr.category}
                  </span>
                  <a
                    href={pr.prUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#c0392b] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect PR</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPRs.length === 0 && (
          <div className="text-center py-12 font-mono text-sm text-[#575753]">
            No pull requests matched your filter. Try clearing the search query.
          </div>
        )}

      </div>
    </section>
  );
};

