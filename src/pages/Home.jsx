import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight,
  Download,
  Globe,
  FlaskConical,
  PackageCheck,
  Ship,
  Wheat,
  ShieldCheck,
  ChevronDown,
  Quote,
  Sparkles,
  Award,
  CheckCircle2,
  MapPin,
  Star,
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   ANIMATED COUNTER HOOK
   ═══════════════════════════════════════════════ */
function useAnimatedCounter(end, duration = 2000, startOnView = false, inView = true) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (startOnView && !inView) return;
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, startOnView, inView]);

  return count;
}

/* ═══════════════════════════════════════════════
   STAT COUNTER COMPONENT
   ═══════════════════════════════════════════════ */
function StatCounter({ value, suffix, label, inView }) {
  const count = useAnimatedCounter(value, 2200, true, inView);

  return (
    <div className="text-center px-4 md:px-8">
      <p
        className="font-display text-3xl md:text-5xl font-bold"
        style={{ color: 'var(--gold)' }}
      >
        {count}
        <span className="text-2xl md:text-4xl">{suffix}</span>
      </p>
      <p
        className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase mt-2"
        style={{ color: 'rgba(251,247,240,0.5)' }}
      >
        {label}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FLOATING PARTICLE
   ═══════════════════════════════════════════════ */
function Particle() {
  const style = useMemo(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${Math.random() * 4 + 2}px`,
    height: `${Math.random() * 4 + 2}px`,
  }), []);

  return (
    <motion.div
      className="absolute rounded-full will-change-transform"
      style={{ ...style, background: 'var(--gold)' }}
      animate={{
        y: [0, -(Math.random() * 40 + 20), 0],
        x: [0, (Math.random() - 0.5) * 30, 0],
        opacity: [0.15, 0.5, 0.15],
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

const particles = Array.from({ length: 30 }, (_, i) => i);

/* ═══════════════════════════════════════════════
   DIAMOND RULE COMPONENT
   ═══════════════════════════════════════════════ */
function DiamondRule() {
  return (
    <div className="diamond-rule my-6">
      <div className="diamond" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION HEADER COMPONENT
   ═══════════════════════════════════════════════ */
function SectionHeader({ label, title, subtitle, dark = false }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`section-header ${dark ? 'dark-section' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <p className="section-label">{label}</p>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="max-w-[200px] mx-auto mt-6">
        <DiamondRule />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════ */
function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 250]);
  const contentY = useTransform(scrollY, [0, 600], [0, -100]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.55, 0.9]);

  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.5 });

  const stats = [
    { value: 45, suffix: '+', label: 'Countries' },
    { value: 500, suffix: '+', label: 'Products' },
    { value: 20, suffix: '+', label: 'Years' },
    { value: 5000, suffix: '+', label: 'Tonnes / Year' },
  ];

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.4 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--midnight)' }}
    >
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src="/images/hero-spices.png"
          alt=""
          className="w-full h-[130%] object-cover"
          aria-hidden="true"
        />
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ opacity: overlayOpacity, background: 'var(--midnight)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,10,8,0.92) 0%, rgba(12,10,8,0.5) 35%, rgba(12,10,8,0.6) 65%, rgba(12,10,8,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Radial Gold Glow */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(212,168,83,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Particles */}
      <div className="absolute inset-0 z-[3]" aria-hidden="true">
        {particles.map((i) => (
          <Particle key={i} />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 text-center pt-32 pb-40"
        style={{ y: contentY }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs md:text-sm tracking-[0.35em] uppercase mb-8"
          style={{ color: 'var(--gold)' }}
        >
          Since 2004 · Chennai, India
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display leading-[0.9] mb-6"
          style={{ fontSize: 'clamp(56px, 12vw, 140px)' }}
        >
          <span className="gold-shimmer block font-bold">RICHY</span>
          <span
            className="block font-light"
            style={{ color: 'var(--cream)', letterSpacing: '0.08em' }}
          >
            EXPORTS
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-display text-xl md:text-3xl italic mb-4"
          style={{ color: 'var(--cream)' }}
        >
          India's Finest Spices, Delivered Worldwide
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          variants={fadeUp}
          className="font-body text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(251,247,240,0.55)' }}
        >
          Trusted by food manufacturers, retailers &amp; hotel chains across 45+
          countries
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#products" className="btn-primary">
            Explore Our Spices <ArrowRight size={18} />
          </a>
          <a
            href="#catalogue"
            className="btn-secondary"
            style={{ color: 'var(--cream)', borderColor: 'rgba(212,168,83,0.35)' }}
          >
            <Download size={16} /> Download Catalogue
          </a>
        </motion.div>
      </motion.div>

      {/* Stat Counters Bar */}
      <div
        ref={statsRef}
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(12,10,8,0.9) 30%, rgba(12,10,8,0.95) 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x"
            style={{ borderColor: 'rgba(212,168,83,0.15)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} inView={statsInView} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(251,247,240,0.3)' }}
        >
          Scroll
        </span>
        <ChevronDown size={18} style={{ color: 'rgba(251,247,240,0.3)' }} />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   2. MARQUEE SECTION
   ═══════════════════════════════════════════════ */
const SPICE_NAMES = [
  '✦ TURMERIC',
  '✦ RED CHILI',
  '✦ CUMIN',
  '✦ BLACK PEPPER',
  '✦ CARDAMOM',
  '✦ CINNAMON',
  '✦ CORIANDER',
  '✦ FENNEL',
  '✦ FENUGREEK',
  '✦ CLOVES',
  '✦ MUSTARD',
  '✦ NUTMEG',
  '✦ STAR ANISE',
  '✦ BAY LEAF',
  '✦ MACE',
  '✦ GINGER',
];

function MarqueeSection() {
  const items = [...SPICE_NAMES, ...SPICE_NAMES];

  return (
    <div
      className="relative py-5 overflow-hidden"
      style={{
        background: 'var(--charcoal)',
        borderTop: '1px solid rgba(212,168,83,0.15)',
        borderBottom: '1px solid rgba(212,168,83,0.15)',
      }}
    >
      <div className="marquee-track">
        {items.map((spice, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-8 font-mono text-xs tracking-[0.3em] whitespace-nowrap"
            style={{ color: 'var(--gold)' }}
          >
            {spice}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   3. ABOUT PREVIEW SECTION
   ═══════════════════════════════════════════════ */
function AboutPreviewSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding" style={{ background: 'var(--cream)' }}>
      <div className="container-custom">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* Est. Badge */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  border: '2px solid var(--gold)',
                  background: 'rgba(212,168,83,0.06)',
                }}
              >
                <span
                  className="font-display text-xs font-bold"
                  style={{ color: 'var(--gold)' }}
                >
                  EST.
                  <br />
                  2004
                </span>
              </div>
              <div>
                <p className="section-label mb-0">Our Story</p>
              </div>
            </div>

            <DiamondRule />

            <h2
              className="font-display font-bold leading-tight mt-6 mb-6"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: 'var(--text-dark)',
              }}
            >
              India's Leading
              <br />
              <span style={{ color: 'var(--saffron)' }}>Spice Exporter</span>
            </h2>

            <p
              className="font-body text-base leading-relaxed mb-6"
              style={{ color: 'var(--text-body)' }}
            >
              For over two decades, Richy Exports has been at the forefront of
              India's spice trade — sourcing the finest turmeric from Erode,
              chili from Guntur, pepper from Wayanad, and cardamom from the
              Western Ghats. Our vertically integrated supply chain ensures
              unmatched quality from farm gate to shipping port.
            </p>
            <p
              className="font-body text-base leading-relaxed mb-8"
              style={{ color: 'var(--text-mid)' }}
            >
              Headquartered in Chennai with processing facilities across
              South India, we serve over 200 active importers across the
              Middle East, Europe, Americas, and Southeast Asia. Every
              shipment is backed by ISO 9001:2015 certified processes and
              complete traceability documentation.
            </p>

            <DiamondRule />

            <div className="flex items-center gap-6 mt-6">
              <div>
                <p
                  className="font-display text-3xl font-bold"
                  style={{ color: 'var(--saffron)' }}
                >
                  200+
                </p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase"
                   style={{ color: 'var(--text-muted)' }}>
                  Active Buyers
                </p>
              </div>
              <div
                style={{
                  width: '1px',
                  height: '40px',
                  background: 'var(--border)',
                }}
              />
              <div>
                <p
                  className="font-display text-3xl font-bold"
                  style={{ color: 'var(--saffron)' }}
                >
                  4
                </p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase"
                   style={{ color: 'var(--text-muted)' }}>
                  Processing Units
                </p>
              </div>
              <div
                style={{
                  width: '1px',
                  height: '40px',
                  background: 'var(--border)',
                }}
              />
              <div>
                <p
                  className="font-display text-3xl font-bold"
                  style={{ color: 'var(--saffron)' }}
                >
                  100%
                </p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase"
                   style={{ color: 'var(--text-muted)' }}>
                  Traceable
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="relative rounded-lg overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/warehouse.png"
                alt="Richy Exports warehouse and processing facility"
                className="w-full h-[400px] md:h-[520px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 50%, rgba(12,10,8,0.4) 100%)',
                }}
              />
            </div>
            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 p-5 rounded-lg"
              style={{
                background: 'var(--midnight)',
                border: '1px solid rgba(212,168,83,0.25)',
                boxShadow: 'var(--shadow-gold)',
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="font-display text-2xl font-bold" style={{ color: 'var(--gold)' }}>
                20+
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase"
                 style={{ color: 'rgba(251,247,240,0.5)' }}>
                Years of
                <br />
                Excellence
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   4. FEATURED SPICES SECTION
   ═══════════════════════════════════════════════ */
const FEATURED_SPICES = [
  {
    emoji: '🌿',
    name: 'Turmeric',
    origin: 'Erode, Tamil Nadu',
    grade: 'Alleppey Grade',
    desc: 'High-curcumin finger turmeric with 3-5% curcuminoid content, prized globally for its vibrant color and potency.',
  },
  {
    emoji: '🌶️',
    name: 'Red Chili',
    origin: 'Guntur, Andhra Pradesh',
    grade: 'Teja S17',
    desc: 'Premium Guntur chili varieties with SHU ratings from 15,000 to 100,000, available whole, crushed, and powdered.',
  },
  {
    emoji: '🫘',
    name: 'Cumin',
    origin: 'Rajasthan & Gujarat',
    grade: 'Singapore Quality',
    desc: 'Machine-cleaned and sortex-processed cumin seeds with 99.5% purity, rich in volatile oils and earthy aroma.',
  },
  {
    emoji: '⚫',
    name: 'Black Pepper',
    origin: 'Wayanad, Kerala',
    grade: 'Malabar Grade 1',
    desc: 'The "King of Spices" — premium Malabar black pepper with bold flavor, high piperine content, and ASTA grade.',
  },
  {
    emoji: '💚',
    name: 'Cardamom',
    origin: 'Idukki, Kerala',
    grade: 'Bold 8mm+',
    desc: 'Exquisite green cardamom from the Western Ghats — aromatic, bold, and sorted by size for premium markets.',
  },
  {
    emoji: '🟤',
    name: 'Cinnamon',
    origin: 'Tamil Nadu & Kerala',
    grade: 'C5 Special',
    desc: 'True Ceylon-type cinnamon bark — low coumarin, hand-rolled quills, ideal for gourmet and pharmaceutical use.',
  },
];

function FeaturedSpicesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding" style={{ background: 'var(--cream-dark)' }}>
      <div className="container-custom">
        <SectionHeader
          label="Our Portfolio"
          title="Our Premium Collection"
          subtitle="Sourced from India's finest growing regions, processed to international standards, and exported with complete traceability."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_SPICES.map((spice, i) => (
            <motion.div
              key={spice.name}
              className="glass-card p-7 group cursor-pointer relative overflow-hidden"
              style={{
                border: '1px solid var(--border)',
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 60px rgba(212,168,83,0.15)',
                borderColor: 'var(--gold)',
              }}
            >
              {/* Gold glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(212,168,83,0.06) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10">
                {/* Emoji + Grade */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{spice.emoji}</span>
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(212,168,83,0.1)',
                      color: 'var(--gold-dim)',
                      border: '1px solid rgba(212,168,83,0.2)',
                    }}
                  >
                    {spice.grade}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="font-display text-2xl font-bold mb-1 group-hover:text-[var(--saffron)] transition-colors duration-300"
                  style={{ color: 'var(--text-dark)' }}
                >
                  {spice.name}
                </h3>

                {/* Origin */}
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-4 flex items-center gap-1.5"
                   style={{ color: 'var(--text-muted)' }}>
                  <MapPin size={12} /> {spice.origin}
                </p>

                {/* Description */}
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                  {spice.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   5. GLOBAL REACH SECTION
   ═══════════════════════════════════════════════ */
const REGIONS = [
  { name: 'Middle East & GCC', countries: 'UAE, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain' },
  { name: 'Europe', countries: 'UK, Germany, Netherlands, Spain, Italy, France' },
  { name: 'Americas', countries: 'USA, Canada, Brazil, Mexico' },
  { name: 'Southeast Asia', countries: 'Singapore, Malaysia, Vietnam, Indonesia' },
  { name: 'Africa', countries: 'South Africa, Kenya, Nigeria, Tanzania, Egypt' },
  { name: 'CIS & Central Asia', countries: 'Russia, Kazakhstan, Uzbekistan' },
  { name: 'East Asia', countries: 'Japan, South Korea, China' },
  { name: 'Oceania', countries: 'Australia, New Zealand' },
];

function GlobalReachSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const exportVolume = useAnimatedCounter(5000, 2500, true, inView);

  return (
    <section
      className="section-padding-lg dark-section grain-overlay relative"
      style={{ background: 'var(--midnight)' }}
    >
      <div className="container-custom relative z-10">
        <SectionHeader
          label="Global Presence"
          title="Exporting to the World"
          subtitle="Our spices reach dinner tables, restaurant kitchens, and factory floors across every continent."
          dark
        />

        <div ref={ref}>
          {/* Volume Counter */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display font-bold" style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--gold)' }}>
              {exportVolume.toLocaleString()}+
            </p>
            <p className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(251,247,240,0.4)' }}>
              Metric Tonnes Exported Annually
            </p>
          </motion.div>

          {/* Region Pills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REGIONS.map((region, i) => (
              <motion.div
                key={region.name}
                className="dark-card p-5"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={16} style={{ color: 'var(--gold)' }} />
                  <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--cream)' }}>
                    {region.name}
                  </h3>
                </div>
                <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(251,247,240,0.4)' }}>
                  {region.countries}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   6. PROCESS TIMELINE SECTION
   ═══════════════════════════════════════════════ */
const PROCESS_STEPS = [
  {
    icon: Wheat,
    title: 'Sourcing',
    desc: 'Direct procurement from verified farms across India\'s premium spice-growing regions — Erode, Guntur, Wayanad, and more.',
  },
  {
    icon: FlaskConical,
    title: 'Quality Testing',
    desc: 'In-house and NABL-accredited lab testing for moisture, ash, curcumin content, pesticide residues, and heavy metals.',
  },
  {
    icon: Sparkles,
    title: 'Processing',
    desc: 'State-of-the-art cleaning, grinding, blending, and sterilization in our ISO-certified processing facilities.',
  },
  {
    icon: PackageCheck,
    title: 'Packaging',
    desc: 'Vacuum-sealed, nitrogen-flushed packaging in food-grade materials. Custom private-label packaging available.',
  },
  {
    icon: Ship,
    title: 'Shipping',
    desc: 'Full-container and LCL shipments via Chennai, Tuticorin, and Kochi ports. End-to-end logistics management.',
  },
];

function ProcessTimelineSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding" style={{ background: 'var(--cream)' }}>
      <div className="container-custom">
        <SectionHeader
          label="Our Process"
          title="Farm to Port"
          subtitle="A meticulous 5-stage journey ensuring every grain of spice meets the highest international standards."
        />

        <div ref={ref}>
          {/* Desktop Timeline (horizontal) */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Line */}
              <motion.div
                className="absolute top-8 left-0 right-0 h-[2px]"
                style={{ background: 'rgba(212,168,83,0.2)' }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.22, 0.61, 0.36, 1] }}
              />

              <div className="grid grid-cols-5 gap-6">
                {PROCESS_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      className="text-center"
                      initial={{ opacity: 0, y: 40 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                    >
                      {/* Node */}
                      <motion.div
                        className="w-16 h-16 rounded-full mx-auto flex items-center justify-center relative z-10 mb-6"
                        style={{
                          background: 'var(--cream)',
                          border: '3px solid var(--gold)',
                          boxShadow: 'var(--shadow-gold)',
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon size={24} style={{ color: 'var(--saffron)' }} />
                      </motion.div>

                      {/* Step Number */}
                      <p
                        className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2"
                        style={{ color: 'var(--gold)' }}
                      >
                        Step {String(i + 1).padStart(2, '0')}
                      </p>

                      {/* Title */}
                      <h3
                        className="font-display text-xl font-bold mb-3"
                        style={{ color: 'var(--text-dark)' }}
                      >
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                        {step.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Timeline (vertical) */}
          <div className="lg:hidden">
            <div className="relative pl-10">
              {/* Vertical Line */}
              <motion.div
                className="absolute left-4 top-0 bottom-0 w-[2px]"
                style={{ background: 'rgba(212,168,83,0.2)' }}
                initial={{ scaleY: 0, transformOrigin: 'top' }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.22, 0.61, 0.36, 1] }}
              />

              <div className="space-y-10">
                {PROCESS_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      className="relative"
                      initial={{ opacity: 0, x: -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: i * 0.12 }}
                    >
                      {/* Node */}
                      <div
                        className="absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: 'var(--cream)',
                          border: '2px solid var(--gold)',
                        }}
                      >
                        <Icon size={14} style={{ color: 'var(--saffron)' }} />
                      </div>

                      {/* Content */}
                      <div>
                        <p
                          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1"
                          style={{ color: 'var(--gold)' }}
                        >
                          Step {String(i + 1).padStart(2, '0')}
                        </p>
                        <h3
                          className="font-display text-xl font-bold mb-2"
                          style={{ color: 'var(--text-dark)' }}
                        >
                          {step.title}
                        </h3>
                        <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   7. CERTIFICATIONS SECTION
   ═══════════════════════════════════════════════ */
const CERTIFICATIONS = [
  {
    icon: ShieldCheck,
    title: 'ISO 9001:2015',
    issuer: 'Bureau Veritas',
    desc: 'Internationally recognized quality management system certification ensuring consistent processes, customer satisfaction, and continuous improvement across all operations.',
  },
  {
    icon: CheckCircle2,
    title: 'FSSAI',
    issuer: 'Food Safety & Standards Authority of India',
    desc: 'Mandatory food safety certification for Indian food businesses, guaranteeing that our products meet the highest standards of hygiene, safety, and quality.',
  },
  {
    icon: Award,
    title: 'APEDA Registered',
    issuer: 'Agricultural & Processed Food Products Export Development Authority',
    desc: 'Government-registered exporter with APEDA — the apex body for promotion and development of agricultural exports from India.',
  },
  {
    icon: Star,
    title: 'Spices Board India',
    issuer: 'Ministry of Commerce & Industry',
    desc: 'Registered exporter under the Spices Board of India, the flagship organization for development and worldwide promotion of Indian spices.',
  },
];

function CertificationsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      className="section-padding dark-section grain-overlay relative"
      style={{ background: 'var(--charcoal)' }}
    >
      <div className="container-custom relative z-10">
        <SectionHeader
          label="Trust & Compliance"
          title="Certified Excellence"
          subtitle="Every product we export is backed by rigorous certifications and regulatory compliance."
          dark
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                className="dark-card p-6 text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(212,168,83,0.08)',
                    border: '1px solid rgba(212,168,83,0.2)',
                  }}
                >
                  <Icon size={24} style={{ color: 'var(--gold)' }} />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--cream)' }}>
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p
                  className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4"
                  style={{ color: 'var(--gold)' }}
                >
                  {cert.issuer}
                </p>

                {/* Description */}
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(251,247,240,0.45)' }}>
                  {cert.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   8. TESTIMONIALS SECTION
   ═══════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote:
      'Richy Exports has been our most reliable Indian spice supplier for over 8 years. Their turmeric quality is exceptional — consistent curcumin levels, minimal moisture, and always delivered on time. We switched our entire supply chain to them.',
    name: 'Ahmed Al-Rashid',
    title: 'Procurement Director',
    company: 'Al-Baraka Foods',
    country: 'UAE',
  },
  {
    quote:
      'What sets Richy apart is their documentation and compliance. Every shipment comes with full COA, pesticide residue reports, and phytosanitary certificates. For EU imports, this level of documentation is non-negotiable, and they deliver every time.',
    name: 'Heinrich Müller',
    title: 'Head of Sourcing',
    company: 'Gewürz International GmbH',
    country: 'Germany',
  },
  {
    quote:
      'We started with a trial container of their Teja chili and were blown away by the color and heat consistency. Three years later, we import 50+ containers annually. Their team is responsive, professional, and truly understands the export business.',
    name: 'Maria Santos',
    title: 'Supply Chain Manager',
    company: 'Sabor Latino Inc.',
    country: 'USA',
  },
];

function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="section-padding" style={{ background: 'var(--cream)' }}>
      <div className="container-custom">
        <SectionHeader
          label="Client Voices"
          title="Trusted Worldwide"
          subtitle="Hear from importers and food businesses who rely on Richy Exports for their spice sourcing needs."
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              className="glass-card p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              {/* Large Quote Mark */}
              <div
                className="absolute top-4 right-6 font-display text-[120px] leading-none select-none"
                style={{ color: 'rgba(212,168,83,0.08)' }}
                aria-hidden="true"
              >
                "
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      fill="var(--gold)"
                      style={{ color: 'var(--gold)' }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="font-body text-sm leading-relaxed mb-8 italic"
                  style={{ color: 'var(--text-body)' }}
                >
                  "{testimonial.quote}"
                </p>

                {/* Divider */}
                <div
                  className="w-12 h-[1px] mb-4"
                  style={{ background: 'var(--gold)' }}
                />

                {/* Client Info */}
                <p
                  className="font-display text-base font-bold"
                  style={{ color: 'var(--text-dark)' }}
                >
                  {testimonial.name}
                </p>
                <p className="font-body text-xs" style={{ color: 'var(--text-mid)' }}>
                  {testimonial.title}
                </p>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-1"
                   style={{ color: 'var(--gold)' }}>
                  {testimonial.company} · {testimonial.country}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   9. CTA BAND SECTION
   ═══════════════════════════════════════════════ */
function CTABandSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--midnight)' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,168,83,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="container-custom relative z-10 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p
            className="font-mono text-xs tracking-[0.35em] uppercase mb-6"
            style={{ color: 'var(--gold)' }}
          >
            Start a Partnership
          </p>

          <h2
            className="font-display font-bold leading-tight mb-6"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              color: 'var(--cream)',
            }}
          >
            Ready to Source
            <br />
            <span style={{ color: 'var(--gold)' }}>Premium Indian Spices?</span>
          </h2>

          <p
            className="font-body text-base max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(251,247,240,0.5)' }}
          >
            Whether you need a trial shipment or full container loads, our trade
            team is ready to assist with pricing, documentation, and logistics.
          </p>

          <motion.a
            href="#contact"
            className="btn-primary inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Request a Trade Sample <ArrowRight size={18} />
          </motion.a>

          <div className="max-w-[200px] mx-auto mt-10">
            <DiamondRule />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE — COMPOSED
   ═══════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutPreviewSection />
      <FeaturedSpicesSection />
      <GlobalReachSection />
      <ProcessTimelineSection />
      <CertificationsSection />
      <TestimonialsSection />
      <CTABandSection />
    </>
  );
}
