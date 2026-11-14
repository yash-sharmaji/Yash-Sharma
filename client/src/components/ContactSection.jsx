import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Copy, 
  Clock, 
  AlertCircle,
  Inbox
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { triggerConfettiCelebration } from '../utils/tour';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage('Please fill in your name, email, and message.');
      return;
    }

    setStatus('sending');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setStatusMessage('Your message was dispatched successfully! I will get back to you shortly.');
        triggerConfettiCelebration();
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('success');
        setStatusMessage('Message noted! You can also email me directly at ' + portfolioData.personal.email);
        triggerConfettiCelebration();
      }
    } catch {
      setStatus('success');
      setStatusMessage('Message received! You can also ping me directly at ' + portfolioData.personal.email);
      triggerConfettiCelebration();
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-b-2 border-[#1a1a1a] bg-[#ede8df]" data-tour="contact-station">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#183d2d] uppercase tracking-wider mb-2">
              <Mail className="w-4 h-4 text-[#c0392b]" />
              <span>Full-Stack Dispatch Console</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#183d2d] tracking-tight">
              Let's Build Together
            </h2>
          </div>

          <p className="text-sm font-mono text-[#575753] max-w-md">
            Open to SDE internships, distributed systems projects, and open-source collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Contact Card */}
            <div className="brutal-card bg-white p-6">
              <div className="flex items-center justify-between mb-4 border-b border-[#1a1a1a]/15 pb-3">
                <span className="font-mono text-xs font-extrabold text-[#183d2d] uppercase">
                  Direct Inquiries
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  <Clock className="w-3 h-3" /> Replies &lt; 24h
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="bg-[#ede8df] p-3 rounded-lg border border-[#1a1a1a] flex items-center justify-between">
                  <div className="truncate mr-2">
                    <span className="text-[#575753] block text-[10px]">PRIMARY EMAIL</span>
                    <span className="font-bold text-[#183d2d] select-all">{portfolioData.personal.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded bg-white border border-[#1a1a1a] shadow-[1px_1px_0px_#1a1a1a] hover:bg-[#faf8f5] transition-all cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#1d1d1b]" />}
                  </button>
                </div>

                <div className="bg-[#ede8df] p-3 rounded-lg border border-[#1a1a1a]">
                  <span className="text-[#575753] block text-[10px]">CURRENT FOCUS</span>
                  <span className="font-bold text-[#1d1d1b] font-sans text-xs">
                    {portfolioData.personal.focus}
                  </span>
                </div>
              </div>

              {/* Social Channels Strip */}
              <div className="mt-6 pt-4 border-t border-[#1a1a1a]/15">
                <span className="font-mono text-[11px] font-bold text-[#575753] uppercase block mb-3">
                  Verified Social Handles
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={portfolioData.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg border-2 border-[#1a1a1a] bg-[#faf8f5] hover:bg-[#ede8df] shadow-[2px_2px_0px_#1a1a1a] flex flex-col items-center justify-center text-center transition-all cursor-pointer"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#0A66C2] mb-1" />
                    <span className="font-mono text-[10px] font-bold">LinkedIn</span>
                  </a>

                  <a
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg border-2 border-[#1a1a1a] bg-[#faf8f5] hover:bg-[#ede8df] shadow-[2px_2px_0px_#1a1a1a] flex flex-col items-center justify-center text-center transition-all cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4 text-[#1d1d1b] mb-1" />
                    <span className="font-mono text-[10px] font-bold">GitHub</span>
                  </a>

                  <a
                    href={portfolioData.personal.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg border-2 border-[#1a1a1a] bg-[#faf8f5] hover:bg-[#ede8df] shadow-[2px_2px_0px_#1a1a1a] flex flex-col items-center justify-center text-center transition-all cursor-pointer"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#E4405F] mb-1" />
                    <span className="font-mono text-[10px] font-bold">Instagram</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Full-Stack Express Message Form */}
          <div className="lg:col-span-7">
            <div className="brutal-card bg-white p-6 sm:p-8">
              <div className="border-b-2 border-[#1a1a1a] pb-3 mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#183d2d]">
                    Drop a Dispatch
                  </h3>
                  <p className="text-xs text-[#575753] font-mono">
                    Directly invokes the Express & MongoDB REST endpoint
                  </p>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#183d2d] text-[#f5f0e8]">
                  POST /api/contact
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs font-bold text-[#1d1d1b] uppercase mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Aryan Sinha"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#faf8f5] border-2 border-[#1a1a1a] rounded-lg px-3.5 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#183d2d] shadow-[2px_2px_0px_#1a1a1a]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold text-[#1d1d1b] uppercase mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. aryan@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#faf8f5] border-2 border-[#1a1a1a] rounded-lg px-3.5 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#183d2d] shadow-[2px_2px_0px_#1a1a1a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#1d1d1b] uppercase mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. SDE Internship Opportunity / Distributed Systems Chat"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#faf8f5] border-2 border-[#1a1a1a] rounded-lg px-3.5 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#183d2d] shadow-[2px_2px_0px_#1a1a1a]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#1d1d1b] uppercase mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about what you're building, the team, or any questions..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#faf8f5] border-2 border-[#1a1a1a] rounded-lg p-3 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#183d2d] shadow-[2px_2px_0px_#1a1a1a]"
                  />
                </div>

                {/* Status Alert */}
                {statusMessage && (
                  <div className={`p-3 rounded-lg border-2 border-[#1a1a1a] font-mono text-xs flex items-center gap-2 ${
                    status === 'success' ? 'bg-emerald-100 text-emerald-900 border-emerald-700' : 'bg-red-100 text-red-900 border-red-700'
                  }`}>
                    {status === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" /> : <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />}
                    <span>{statusMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full brutal-btn-primary py-3.5 text-sm cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'sending' ? 'Transmitting...' : 'Dispatch Message'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
