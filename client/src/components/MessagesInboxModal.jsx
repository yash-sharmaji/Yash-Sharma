import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, RefreshCw, Clock, Check, Copy, Inbox, ExternalLink, ShieldCheck } from 'lucide-react';

export const MessagesInboxModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="brutal-card bg-white max-w-2xl w-full my-auto overflow-hidden border-2 border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="bg-[#ede8df] px-4 py-3 border-b-2 border-[#1a1a1a] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-[#183d2d] text-white">
              <Inbox className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#183d2d]">
                Contact Inquiries Inbox
              </h3>
              <p className="text-[10px] font-mono text-[#575753]">
                Direct live feed from Express & MongoDB (/api/contact)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="p-1.5 px-2.5 rounded bg-white border border-[#1a1a1a] text-xs font-mono font-bold hover:bg-[#faf8f5] flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md border border-[#1a1a1a] hover:bg-[#f5f0e8] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 bg-[#faf8f5]">
          {messages.length === 0 ? (
            <div className="text-center py-12 font-mono text-xs text-[#575753] space-y-2">
              <Mail className="w-8 h-8 text-[#183d2d]/40 mx-auto" />
              <p>No messages received yet.</p>
              <p className="text-[11px] text-[#a0a09a]">
                When someone submits the Contact Form on your portfolio, it appears right here in real time!
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const id = msg._id || msg.id || idx;
              const formattedDate = msg.createdAt 
                ? new Date(msg.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                : 'Just now';

              return (
                <div
                  key={id}
                  className="bg-white p-4 rounded-xl border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#1a1a1a]/10 pb-2">
                    <div>
                      <span className="font-extrabold text-sm text-[#183d2d] mr-2">
                        {msg.name}
                      </span>
                      <span className="font-mono text-xs text-[#575753]">
                        &lt;{msg.email}&gt;
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#a0a09a]">
                      <Clock className="w-3 h-3" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  {msg.subject && (
                    <div className="font-mono text-xs font-bold text-[#c0392b]">
                      Subject: {msg.subject}
                    </div>
                  )}

                  <p className="text-xs text-[#1d1d1b] leading-relaxed whitespace-pre-wrap bg-[#f5f0e8] p-3 rounded border border-[#1a1a1a]/15">
                    {msg.message}
                  </p>

                  <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
                    <button
                      onClick={() => handleCopy(msg.email, id)}
                      className="text-[#575753] hover:text-[#183d2d] flex items-center gap-1 cursor-pointer font-bold"
                    >
                      {copiedId === id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === id ? 'Email Copied!' : 'Copy Sender Email'}</span>
                    </button>

                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                      className="text-[#183d2d] hover:underline flex items-center gap-1 font-bold"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info strip */}
        <div className="bg-[#ede8df] px-4 py-2 border-t-2 border-[#1a1a1a] text-center font-mono text-[11px] text-[#575753]">
          Total Inquiries: <strong className="text-[#183d2d]">{messages.length}</strong> • Messages are persisted in your MongoDB collection
        </div>
      </motion.div>
    </div>
  );
};

