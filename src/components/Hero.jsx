import { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

/* ── Floating Particle ─────────────────────── */
function Particle({ index }) {
    const style = useMemo(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
    }), []);

    return (
        <motion.div
            className="absolute rounded-full bg-gold/20 will-change-transform"
            style={style}
            animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeInOut',
            }}
        />
    );
}

const particles = Array.from({ length: 20 }, (_, i) => i);

/* ── Word-by-word reveal animation ──────────── */
const headlineVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.6,
        },
    },
};

const wordVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 40 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

/* ── Hero Component ────────────────────────── */
export default function Hero() {
    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 800], [0, 200]);
    const contentY = useTransform(scrollY, [0, 600], [0, -80]);
    const overlayOpacity = useTransform(scrollY, [0, 500], [0.5, 0.85]);

    const handleScroll = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const line1Words = ["From", "India's", "Soil"];
    const line2WordsBefore = ["to", "the"];
    const line2Highlight = ["World's", "Shelf"];

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: bgY }}
            >
                <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&h=1080&fit=crop&q=80&blur=0"
                    alt=""
                    className="w-full h-[120%] object-cover"
                    aria-hidden="true"
                />
            </motion.div>

            {/* Dark Overlays */}
            <motion.div
                className="absolute inset-0 z-[1] bg-bg-dark"
                style={{ opacity: overlayOpacity }}
                aria-hidden="true"
            />
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: 'linear-gradient(180deg, rgba(10,12,10,0.95) 0%, rgba(10,12,10,0.6) 40%, rgba(10,12,10,0.8) 80%, rgba(10,12,10,1) 100%)',
                }}
                aria-hidden="true"
            />

            {/* Particles */}
            <div className="absolute inset-0 z-[2]" aria-hidden="true">
                {particles.map((i) => (
                    <Particle key={i} index={i} />
                ))}
            </div>

            {/* Radial gradient overlay */}
            <div
                className="absolute inset-0 z-[2]"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(45,90,39,0.15) 0%, transparent 70%)',
                }}
                aria-hidden="true"
            />

            {/* Botanical SVG decoration */}
            <motion.svg
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] opacity-[0.06] z-[2]"
                viewBox="0 0 400 600"
                fill="none"
                aria-hidden="true"
            >
                <motion.path
                    d="M200 50 C250 100 350 200 300 350 C270 430 220 500 200 550 C180 500 130 430 100 350 C50 200 150 100 200 50Z"
                    stroke="#C8A96E"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
                />
                <motion.path
                    d="M200 100 L200 500 M150 200 L200 250 L250 200 M130 300 L200 350 L270 300 M140 400 L200 440 L260 400"
                    stroke="#C8A96E"
                    strokeWidth="0.8"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: 'easeInOut', delay: 1 }}
                />
            </motion.svg>

            {/* Content with parallax */}
            <motion.div
                className="relative z-10 max-w-5xl mx-auto px-6 text-center"
                style={{ y: contentY }}
            >
                {/* Eyebrow with character stagger */}
                <motion.p
                    className="font-body text-lime text-sm md:text-base tracking-[0.3em] uppercase mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Since 2019 · Premium Indian Botanicals
                </motion.p>

                {/* Headline with word-by-word reveal */}
                <motion.h1
                    className="font-display text-4xl md:text-7xl xl:text-[88px] leading-[1.1] text-cream mb-8"
                    style={{ perspective: 800 }}
                    variants={headlineVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Line 1: "From India's Soil" */}
                    <span className="inline-block">
                        {line1Words.map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-[0.3em]"
                                variants={wordVariants}
                                style={{ transformOrigin: 'bottom' }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                    {/* Line 2: "to the World's Shelf" */}
                    <span className="block mt-2">
                        {line2WordsBefore.map((word, i) => (
                            <motion.span
                                key={`b${i}`}
                                className="inline-block mr-[0.3em]"
                                variants={wordVariants}
                                style={{ transformOrigin: 'bottom' }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        {line2Highlight.map((word, i) => (
                            <motion.span
                                key={`h${i}`}
                                className="inline-block mr-[0.3em] text-gold italic font-quote"
                                variants={wordVariants}
                                style={{ transformOrigin: 'bottom' }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    className="font-body text-muted text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                >
                    We cultivate, process, and export the finest herbal products —
                    trusted by wholesale partners across 40+ countries for consistent quality,
                    regulatory compliance, and reliable supply chains.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                >
                    <a
                        href="#products"
                        onClick={(e) => handleScroll(e, '#products')}
                        className="shimmer flex items-center gap-2 px-8 py-4 bg-gold text-bg-dark font-body font-semibold text-sm tracking-wider rounded-full hover:bg-gold-light transition-colors duration-300"
                    >
                        Explore Products <ArrowRight size={18} />
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => handleScroll(e, '#contact')}
                        className="flex items-center gap-2 px-8 py-4 border border-gold/30 text-gold font-body font-medium text-sm tracking-wider rounded-full hover:bg-gold/10 hover:border-gold/60 transition-all duration-300"
                    >
                        Request a Quote
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <span className="font-body text-dim text-xs tracking-[0.3em] uppercase">Scroll</span>
                <ChevronDown size={20} className="text-dim" />
            </motion.div>
        </section>
    );
}
