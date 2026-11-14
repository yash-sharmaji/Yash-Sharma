import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check, Play, FileCode, Shield, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const InteractiveTerminal = () => {
  const [activeTab, setActiveTab] = useState('config');
  const [copied, setCopied] = useState(false);
  const [runOutput, setRunOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const snippets = {
    config: {
      fileName: "yash.config.ts",
      language: "typescript",
      code: `const yash: DeveloperProfile = {
  name: "Yash Sharma",
  education: "Computer Science Undergraduate",
  focus: "Full-stack web development, real-time distributed systems",
  awards: [
    "🥈 1st Runner-Up @ Code Conqueror India 2026 (ShareX)",
    "🌐 Hacktoberfest 2026 Core Contributor",
    "🎓 NSoC Contributor & Community Tooling Architect"
  ],
  stack: {
    primary: ["TypeScript", "Node.js", "Express", "React", "MongoDB", "Redis"],
    algorithmic: ["Modern C++ (C++20)", "Data Structures", "Algorithms"]
  },
  approach: "Make it correct first, make it fast, and ship things that create genuine value."
};

export default yash;`
    },
    locks: {
      fileName: "atomic-lock.lua",
      language: "lua",
      code: `-- ShareX Atomic Redis Mutex Lock Release
-- Ensures a worker only releases the lock if it still holds ownership
-- KEYS[1]: resource_lock_key
-- ARGV[1]: worker_uuid_token

if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end`
    },
    philosophy: {
      fileName: "engineering-rules.md",
      language: "markdown",
      code: `### 🛠️ Yash's Engineering Principles

1. **Zero Race Conditions**:
   When multiple users request the same equipment, optimistic UI is never enough.
   Guarantee consistency with atomic distributed locks.

2. **Actionable Errors**:
   Never tell a user "Request Failed". Give them a 12-rule resolution checklist.

3. **Sub-50ms Network Overhead**:
   Throttle redundant Socket.IO payloads (60/s -> 20/s) without perceptual degradation.`
    }
  };

  const currentSnippet = snippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateRun = () => {
    setIsRunning(true);
    setRunOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      if (activeTab === 'config') {
        setRunOutput([
          "[OK] Validating Developer Profile schema...",
          "[SUCCESS] Found 18+ verified open-source PRs across 10 repos",
          "[SUCCESS] Redis distributed lock engine online (SET NX PX)",
          "[READY] Open to SDE Internships. Ready to ship production code."
        ]);
      } else if (activeTab === 'locks') {
        setRunOutput([
          "[LUA EVAL] redis.call('get', 'resource:lab_gpu_01')",
          "[MATCH] Worker UUID matches token 'usr_yash_8502'",
          "[DEL] Lock successfully freed atomically. Return 1 (OK)."
        ]);
      } else {
        setRunOutput([
          "[DOCS COMPILED] 3 core engineering principles loaded.",
          "[STATUS] Production standards active across all repositories."
        ]);
      }
    }, 600);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#ede8df] border-b-2 border-[#1a1a1a]" data-tour="interactive-terminal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#c0392b] uppercase tracking-wider mb-2">
              <Terminal className="w-4 h-4" />
              <span>Interactive Developer Environment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#183d2d] tracking-tight">
              &gt;_ Under the Hood
            </h2>
          </div>
          <p className="text-sm text-[#575753] font-mono max-w-md">
            Click through the tabs below to inspect my configuration, distributed lock implementation, or run the simulator.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="brutal-card bg-[#1d1d1b] text-[#f5f0e8] overflow-hidden border-2 border-[#1a1a1a]">
          
          {/* Terminal Titlebar & Tabs */}
          <div className="bg-[#141413] border-b-2 border-[#1a1a1a] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
            
            {/* Window Dots & Tabs */}
            <div className="flex items-center gap-4 overflow-x-auto">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#c0392b] inline-block border border-black/50"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block border border-black/50"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block border border-black/50"></span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 font-mono text-xs">
                {Object.keys(snippets).map((key) => {
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveTab(key);
                        setRunOutput(null);
                      }}
                      className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#2a2a28] text-[#f5f0e8] border border-[#575753] font-bold"
                          : "text-[#a0a09a] hover:text-[#f5f0e8] hover:bg-[#20201e]"
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>{snippets[key].fileName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Buttons: Run & Copy */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={handleSimulateRun}
                disabled={isRunning}
                className="px-3 py-1.5 rounded bg-[#183d2d] text-[#f5f0e8] hover:bg-[#245741] border border-emerald-700 flex items-center gap-1.5 cursor-pointer font-bold transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? "Executing..." : "Run Snippet"}</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-1.5 rounded bg-[#2a2a28] hover:bg-[#383835] text-[#f5f0e8] border border-[#575753] transition-all cursor-pointer"
                title="Copy code"
                aria-label="Copy code to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

          {/* Terminal Code Display */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed bg-[#1d1d1b]">
            <pre className="text-[#ede8df]">
              <code>{currentSnippet.code}</code>
            </pre>
          </div>

          {/* Simulated Execution Drawer */}
          <AnimatePresence>
            {runOutput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#121211] border-t-2 border-[#1a1a1a] p-4 font-mono text-xs text-emerald-400"
              >
                <div className="flex items-center gap-2 text-[#a0a09a] mb-2 font-bold uppercase text-[10px]">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Execution Output (Simulated Node.js & Redis REPL)</span>
                </div>
                <div className="space-y-1 pl-2 border-l-2 border-emerald-500/40">
                  {runOutput.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#a0a09a] select-none">&gt;</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};

