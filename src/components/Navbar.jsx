import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Global Reach', href: '#global-reach' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 80);
    });

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${scrolled
                    ? 'bg-bg-dark/80 backdrop-blur-xl border-b border-[var(--border-gold)]'
                    : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="font-display text-2xl md:text-3xl text-gold tracking-wider"
                >
                    RICHY <span className="text-cream font-light">EXPORTS</span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="gold-link text-sm tracking-wider uppercase font-body text-cream/80 hover:text-gold transition-colors duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="shimmer ml-2 px-6 py-2.5 bg-gold/10 border border-gold/40 text-gold text-sm font-body font-medium tracking-wider rounded-full hover:bg-gold/20 hover:border-gold/70 transition-all duration-300"
                    >
                        Request a Quote
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-cream z-[1001]"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    className="md:hidden fixed inset-0 z-[1000] bg-bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {NAV_LINKS.map((link, i) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="font-display text-3xl text-cream hover:text-gold transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                    <motion.a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="shimmer mt-4 px-8 py-3 bg-gold/10 border border-gold/40 text-gold font-body font-medium tracking-wider rounded-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Request a Quote
                    </motion.a>
                </motion.div>
            )}
        </motion.nav>
    );
}
