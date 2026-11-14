import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Zap, ShieldAlert, CheckCircle, RefreshCw, X, Play } from 'lucide-react';

export const RedisLockVisualizer = ({ isOpen, onClose }) => {
  const [lockState, setLockState] = useState({
    status: 'unlocked', // 'unlocked' | 'locked'
    holder: null,
    ttl: 0,
    logs: [
      { time: '00:00.000', text: 'Redis key [resource:lab_gpu_01] initialized in state UNLOCKED.' }
    ]
  });

  const [activeRequest, setActiveRequest] = useState(null);

  const addLog = (msg) => {
    const time = new Date().toISOString().substring(14, 23);
    setLockState(prev => ({
      ...prev,
      logs: [{ time, text: msg }, ...prev.logs.slice(0, 7)]
    }));
  };

  const handleAcquire = (studentName) => {
    setActiveRequest(studentName);

    setTimeout(() => {
      if (lockState.status === 'locked') {
        addLog(`❌ [CONFLICT 409] ${studentName} attempted SET NX PX. Mutex held by ${lockState.holder}. Request queued in FIFO waitlist.`);
      } else {
        setLockState(prev => ({
          ...prev,
          status: 'locked',
          holder: studentName,
          ttl: 5000
        }));
        addLog(`✅ [ACQUIRED 200] ${studentName} executed: SET resource:lab_gpu_01 ${studentName}_TOKEN NX PX 5000. Lock acquired.`);
      }
      setActiveRequest(null);
    }, 300);
  };

  const handleRelease = (studentName) => {
    if (lockState.status !== 'locked') {
      addLog(`⚠️ Cannot release: lock is already idle.`);
      return;
    }

    if (lockState.holder !== studentName) {
      addLog(`⛔ [LUA ABORT] ${studentName} tried to release lock held by ${lockState.holder}! Lua token verification check failed (ARGV[1] mismatch). Lock preserved.`);
      return;
    }

    setLockState(prev => ({
      ...prev,
      status: 'unlocked',
      holder: null,
      ttl: 0
    }));
    addLog(`🔓 [LUA SUCCESS] ${studentName} released lock via Lua compare-and-delete. Resource:lab_gpu_01 is now free.`);
  };

  const handleReset = () => {
    setLockState({
      status: 'unlocked',
      holder: null,
      ttl: 0,
      logs: [{ time: new Date().toISOString().substring(14, 23), text: 'Simulator reset. Lock key freed.' }]
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="brutal-card bg-white max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#1a1a1a] pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#183d2d] text-white">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#183d2d]">
                ShareX Distributed Redis Lock Simulator
              </h3>
              <p className="text-xs text-[#575753] font-mono">
                Real-Time Race Condition Prevention via Atomic Lua Mutex
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-md border-2 border-[#1a1a1a] hover:bg-[#ede8df] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lock Visual State Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-xl border-2 border-[#1a1a1a] transition-all ${
            lockState.status === 'locked' 
              ? 'bg-[#c0392b]/10 border-[#c0392b]' 
              : 'bg-emerald-50 border-emerald-700'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold uppercase text-[#575753]">
                Resource Mutex Status
              </span>
              {lockState.status === 'locked' ? (
                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#c0392b] text-white">
                  <Lock className="w-3 h-3" /> LOCKED
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                  <Unlock className="w-3 h-3" /> AVAILABLE
                </span>
              )}
            </div>
            <div className="text-sm font-mono font-bold text-[#1d1d1b]">
              Target: <span className="text-[#183d2d]">resource:lab_gpu_01</span>
            </div>
            <div className="text-xs text-[#575753] mt-1">
              Current Holder: <strong className="text-[#1d1d1b]">{lockState.holder || 'None (Free for grabs)'}</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 border-[#1a1a1a] bg-[#ede8df] flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold uppercase text-[#575753] block mb-1">
                Algorithm Specifications
              </span>
              <p className="text-xs font-mono text-[#183d2d] leading-relaxed">
                • <code>SET NX PX</code> creates lease<br />
                • <code>Lua compare-del</code> guarantees safety<br />
                • Prevents double bookings 100%
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-3 text-xs font-mono font-bold text-[#575753] hover:text-[#1d1d1b] flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </div>

        {/* Interactive Actors: Student A & Student B */}
        <div className="space-y-4 mb-6">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#575753]">
            Simulate Concurrent Requests
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student A Actor */}
            <div className="p-4 rounded-xl border-2 border-[#1a1a1a] bg-[#faf8f5]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-[#183d2d]">Student A (Aryan)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 border border-blue-300 rounded font-bold text-blue-900">
                  Client 1
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAcquire('Student A')}
                  disabled={activeRequest !== null}
                  className="flex-1 brutal-btn-primary py-1.5 text-xs cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" /> Book GPU
                </button>
                <button
                  onClick={() => handleRelease('Student A')}
                  disabled={activeRequest !== null}
                  className="flex-1 brutal-btn-secondary py-1.5 text-xs cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" /> Release
                </button>
              </div>
            </div>

            {/* Student B Actor */}
            <div className="p-4 rounded-xl border-2 border-[#1a1a1a] bg-[#faf8f5]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-[#c0392b]">Student B (Rohan)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-100 border border-amber-300 rounded font-bold text-amber-900">
                  Client 2
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAcquire('Student B')}
                  disabled={activeRequest !== null}
                  className="flex-1 brutal-btn-primary py-1.5 text-xs cursor-pointer bg-[#c0392b] hover:bg-[#a93226]"
                >
                  <Lock className="w-3.5 h-3.5" /> Book GPU
                </button>
                <button
                  onClick={() => handleRelease('Student B')}
                  disabled={activeRequest !== null}
                  className="flex-1 brutal-btn-secondary py-1.5 text-xs cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" /> Release
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Redis & Lua Audit Log */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold uppercase text-[#575753]">
              Live Redis Mutex Audit Log
            </span>
            <span className="text-[10px] font-mono text-[#575753]">
              Atomic Operations
            </span>
          </div>
          <div className="bg-[#1d1d1b] rounded-lg p-3 font-mono text-xs text-[#ede8df] max-h-36 overflow-y-auto space-y-1.5 border border-[#1a1a1a]">
            {lockState.logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] leading-tight">
                <span className="text-[#a0a09a] select-none">[{log.time}]</span>
                <span className={log.text.includes('❌') ? 'text-red-400' : log.text.includes('✅') ? 'text-emerald-400' : log.text.includes('🔓') ? 'text-blue-300' : 'text-[#ede8df]'}>
                  {log.text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};

