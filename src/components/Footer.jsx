import { useMemo } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Global Reach', href: '#global-reach' },
    { label: 'Contact', href: '#contact' },
];

const PRODUCTS_LIST = [
    'Turmeric', 'Ashwagandha', 'Moringa', 'Cumin', 'Fenugreek',
    'Holy Basil', 'Ginger', 'Neem', 'Senna',
];

const CERTIFICATIONS_LIST = [
    'ISO 9001:2015', 'FSSAI', 'APEDA', 'GMP', 'USDA Organic', 'Halal',
];

function FooterParticle({ index }) {
    const style = useMemo(() => ({
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
    }), []);

    return (
        <motion.div
            className="absolute rounded-full bg-gold/10 will-change-transform"
            style={style}
            animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: 'easeInOut',
            }}
        />
    );
}

const footerParticles = Array.from({ length: 15 }, (_, i) => i);

export default function Footer() {
    const handleNavClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-bg-dark border-t border-[var(--border-gold)] pt-20 pb-8 overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0" aria-hidden="true">
                {footerParticles.map((i) => (
                    <FooterParticle key={i} index={i} />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* 4-column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    {/* Column 1 — Brand */}
                    <div>
                        <a
                            href="#home"
                            onClick={(e) => handleNavClick(e, '#home')}
                            className="font-display text-2xl text-gold tracking-wider"
                        >
                            RICHY <span className="text-cream font-light">EXPORTS</span>
                        </a>
                        <p className="font-body text-muted text-sm leading-relaxed mt-4">
                            India's trusted exporter of premium herbal products.
                            Farm-to-export traceability across 40+ countries.
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                            <span className="font-body text-dim text-xs tracking-wider">
                                Made in India
                            </span>
                            <span role="img" aria-label="India flag">🇮🇳</span>
                        </div>
                    </div>

                    {/* Column 2 — Quick Links */}
                    <div>
                        <h4 className="font-display text-lg text-cream mb-5">Quick Links</h4>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="gold-link font-body text-sm text-muted hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 — Products */}
                    <div>
                        <h4 className="font-display text-lg text-cream mb-5">Products</h4>
                        <ul className="space-y-3">
                            {PRODUCTS_LIST.map((product) => (
                                <li key={product}>
                                    <a
                                        href="#products"
                                        onClick={(e) => handleNavClick(e, '#products')}
                                        className="font-body text-sm text-muted hover:text-gold transition-colors duration-300"
                                    >
                                        {product}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 — Certifications & Contact */}
                    <div>
                        <h4 className="font-display text-lg text-cream mb-5">Certifications</h4>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {CERTIFICATIONS_LIST.map((cert) => (
                                <span
                                    key={cert}
                                    className="px-3 py-1 text-xs font-body text-gold/70 border border-[var(--border-gold)] rounded-full"
                                >
                                    {cert}
                                </span>
                            ))}
                        </div>

                        <h4 className="font-display text-lg text-cream mb-3">Contact</h4>
                        <div className="space-y-2 font-body text-sm text-muted">
                            <p>exports@richyexports.com</p>
                            <p>+91 96008 52141</p>
                            <p>Chennai, India</p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[var(--border-gold)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-body text-dim text-xs tracking-wider text-center md:text-left">
                        © 2026 RICHY EXPORTS. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="font-body text-dim text-xs hover:text-gold transition-colors duration-300">
                            Privacy Policy
                        </a>
                        <a href="#" className="font-body text-dim text-xs hover:text-gold transition-colors duration-300">
                            Terms of Service
                        </a>
                        <a href="#" className="font-body text-dim text-xs hover:text-gold transition-colors duration-300">
                            Sitemap
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
