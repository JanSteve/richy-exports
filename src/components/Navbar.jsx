import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Our Heritage' },
  { path: '/about', label: 'History & Story' },
  { path: '/products', label: 'Products Catalog' },
  { path: '/careers', label: 'Voyage Careers' },
  { path: '/updates', label: 'Market Updates' },
  { path: '/contact', label: 'Trading Desk' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [.215, .61, .355, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9000] h-[80px] flex items-center px-6 md:px-10 transition-all duration-300 ${
          scrolled
            ? 'bg-[#fbf9f4]/95 shadow-sm backdrop-blur-[16px] border-b border-neutral-200/50'
            : 'bg-[#fbf9f4]/80 backdrop-blur-[12px] border-b border-transparent'
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-[1360px] mx-auto">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--midnight)] flex items-center justify-center border border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors duration-300">
              <span className="font-display font-semibold text-xl text-[var(--gold)]">R</span>
            </div>
            <div>
              <h2 className="font-display font-semibold text-[20px] text-[var(--text-dark)] leading-none tracking-tight">RICHY EXPORTS</h2>
              <span className="text-[9px] text-[var(--text-muted)] tracking-[.22em] font-mono uppercase block mt-1">EST. 2019 • CHENNAI PORT</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-mono text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 pb-1 group ${
                  location.pathname === link.path ? 'text-[var(--gold)]' : 'text-[var(--text-muted)] hover:text-[var(--text-dark)]'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[var(--gold)] transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center gap-2 bg-[var(--gold)] text-white hover:bg-[var(--midnight)] px-6 py-3 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 shadow-sm"
          >
            TRADE DESK
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center z-[9999] text-[var(--text-dark)] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[8999] bg-[var(--midnight)] flex flex-col items-center justify-center gap-6 p-6"
          >
            <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
            
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`font-display font-semibold text-3xl transition-colors ${
                    location.pathname === link.path ? 'text-[var(--gold)]' : 'text-[var(--cream)] hover:text-[var(--gold)]'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-6 btn-primary bg-[var(--gold)] text-white hover:bg-[var(--cream)] hover:text-[var(--midnight)] px-10 py-4 font-mono text-[12px]"
              >
                TRADE DESK
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
