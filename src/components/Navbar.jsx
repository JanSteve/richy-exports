import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/products', label: 'Products' },
  { path: '/careers', label: 'Careers' },
  { path: '/updates', label: 'Updates' },
  { path: '/contact', label: 'Contact' },
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
        transition={{ duration: 0.6, ease: [.22,.61,.36,1] }}
        className={`fixed top-0 left-0 right-0 z-[9000] h-[76px] flex items-center px-6 md:px-10 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(251,247,240,.95)] shadow-[0_2px_24px_rgba(26,20,16,.07)] backdrop-blur-[20px]'
            : 'bg-[rgba(251,247,240,.8)] backdrop-blur-[16px]'
        }`}
        style={{ borderBottom: '1px solid rgba(26,20,16,.06)' }}
      >
        <div className="flex items-center justify-between w-full max-w-[1360px] mx-auto">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--midnight)] rounded-lg flex items-center justify-center group-hover:shadow-[var(--shadow-gold)] transition-shadow duration-300">
              <span className="font-display font-black text-xl text-[var(--gold)]">R</span>
            </div>
            <div>
              <h2 className="font-display font-bold text-[17px] text-[var(--text-dark)] leading-none tracking-tight">RICHY EXPORTS</h2>
              <span className="text-[11px] text-[var(--text-muted)] tracking-[.08em] font-light">Premium Spice Trading · Since 2004</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-[13px] font-medium tracking-[.06em] uppercase transition-colors duration-300 group ${
                  location.pathname === link.path ? 'text-[var(--gold)]' : 'text-[var(--text-mid)] hover:text-[var(--text-dark)]'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[var(--gold)] transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--midnight)] px-6 py-2.5 text-[12px] font-semibold tracking-[.12em] uppercase rounded hover:bg-[var(--gold-bright)] hover:shadow-[var(--shadow-gold)] transition-all duration-300"
          >
            GET A QUOTE
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center z-[9999]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[8999] bg-[var(--midnight)] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`font-display font-bold text-4xl transition-colors ${
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
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 btn-primary"
              >
                GET A QUOTE
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
