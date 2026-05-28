import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 md:right-6 z-[10000] w-[calc(100vw-32px)] md:w-[400px] h-[550px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              border: '1px solid rgba(212,168,83,.2)',
              background: 'var(--midnight)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[var(--charcoal)] to-[var(--midnight)]"
              style={{ borderBottom: '1px solid rgba(212,168,83,.15)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--saffron)] flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-[var(--cream)]">Richy Trade Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-[rgba(255,255,255,.5)]">Online · Ready to help</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,.1)] transition-colors"
                aria-label="Close chat"
              >
                <X size={18} className="text-[rgba(255,255,255,.6)]" />
              </button>
            </div>

            {/* Iframe */}
            <iframe
              src="https://lukeaiassitant.netlify.app/"
              title="Richy Exports AI Trade Assistant"
              className="w-full h-[calc(100%-56px)]"
              style={{ border: 'none', background: '#0C0A08' }}
              loading="lazy"
              allow="microphone"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-6 z-[10001] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group"
        style={{
          background: isOpen ? 'var(--charcoal)' : 'linear-gradient(135deg, var(--gold), var(--saffron))',
          border: isOpen ? '1px solid rgba(212,168,83,.3)' : 'none',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open trade assistant'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} className="text-[var(--gold)]" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse indicator */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white animate-pulse" />
        )}
      </motion.button>

      {/* Label tooltip */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="fixed bottom-8 right-[76px] md:right-[80px] z-[10001] hidden md:flex items-center gap-2 bg-[var(--midnight)] text-[var(--cream)] text-xs px-3 py-2 rounded-lg shadow-lg pointer-events-none"
          style={{ border: '1px solid rgba(212,168,83,.2)' }}
        >
          <Sparkles size={12} className="text-[var(--gold)]" />
          Chat with our Trade Assistant
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--midnight)] rotate-45" style={{ borderRight: '1px solid rgba(212,168,83,.2)', borderTop: '1px solid rgba(212,168,83,.2)' }} />
        </motion.div>
      )}
    </>
  );
}
