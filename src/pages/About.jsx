import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Award, 
  ShieldCheck, 
  Compass, 
  Boxes, 
  MapPin, 
  Calendar, 
  ArrowRight,
  Anchor
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   ABOUT DATA
   ═══════════════════════════════════════════════ */

const MILESTONES = [
  {
    year: '1642',
    title: 'The Original Charter',
    desc: 'The original SpiceRoute merchant vessel sets sail from the Madras port, charting trade pathways between the Coromandel coast and Europe.',
  },
  {
    year: '2004',
    title: 'Modern Sourcing Co-op',
    desc: 'Founded as Richy Exports Pvt. Ltd. in Chennai, establishing directly audited networks with farmer groups in Erode, Gujarat, and Rajasthan.',
  },
  {
    year: '2012',
    title: 'ISO Quality Standardization',
    desc: 'Achieved ISO 9001:2008 credentials, launching our dedicated microbiological and ASTA grading labs in Chennai.',
  },
  {
    year: '2019',
    title: 'Automated Processing',
    desc: 'Inauguration of a state-of-the-art 50,000 sq ft Sortex processing facility with multi-stage gravity separating nodes.',
  },
  {
    year: '2022',
    title: '50+ Global Markets',
    desc: 'Reached bulk logistics capacity delivering whole and ground spices to food manufacturers across 50 countries.',
  },
  {
    year: '2026',
    title: 'SpiceRoute Global Merger',
    desc: 'Complete digital and architectural rebrand to SpiceRoute Global, integrating real-time ledger tracking and high-precision maritime fleet logistics.',
  }
];

const LEADERSHIP = [
  {
    initials: 'RS',
    name: 'Rajesh Sundaram',
    title: 'Managing Director',
    bio: 'With 25+ years in the agricultural commodities markets, Rajesh oversees our global cooperative agreements and strategic partnerships.',
    color: 'var(--gold)'
  },
  {
    initials: 'PK',
    name: 'Priya Krishnan',
    title: 'Operations Director',
    bio: 'Priya commands our global supply chain pipeline — from Guntur harvest hubs to the container terminals at Rotterdam and Singapore.',
    color: 'var(--saffron)'
  },
  {
    initials: 'AV',
    name: 'Dr. Arun Venkatesh',
    title: 'Head of Quality Assurance',
    bio: 'A food science PhD, Dr. Arun supervises our 27-point laboratory inspection panels, ensuring absolute food-grade safety compliance.',
    color: 'var(--cardamom)'
  }
];

const VALUES = [
  {
    icon: Compass,
    title: 'Precise Sourcing',
    desc: 'We map raw botanical quality coordinates directly at farm levels. Every single batch is tracked back to its original agricultural cluster.'
  },
  {
    icon: ShieldCheck,
    title: 'Absolute Compliance',
    desc: 'Zero compromises. Our dry spices exceed rigid EU and North American pesticide, heavy metal, and microbiological standards.'
  },
  {
    icon: Boxes,
    title: 'Logistical Rigor',
    desc: 'Employing proprietary packaging and high-sea cargo processing to guarantee volatile oils and intense spice aromas are 100% preserved.'
  },
  {
    icon: Anchor,
    title: 'Maritime Heritage',
    desc: 'Acknowledge and honor centuries of mercantile trade. We bridge ancient botanical wisdom with modern logistical power.'
  }
];

/* ═══════════════════════════════════════════════
   ANIMATION CONFIGS
   ═══════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

/* ═══════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════ */

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [leadRef, leadInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div className="relative min-h-screen bg-[#fbf9f4] overflow-hidden pt-[80px]">
      <div className="absolute inset-0 grain-overlay pointer-events-none z-0" />

      {/* 1. HERO PARALLAX SECTION */}
      <section 
        ref={heroRef}
        className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0 w-full h-[130%] z-0" style={{ y: imgY }}>
          <img 
            src="/images/team-office.png" 
            alt="SpiceRoute Global trade headquarters" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          className="absolute inset-0 z-[1]"
          style={{
            opacity: overlayOpacity,
            background: 'linear-gradient(180deg, rgba(27,28,25,0.7) 0%, rgba(27,28,25,0.5) 50%, rgba(27,28,25,0.9) 100%)'
          }}
        />

        <div className="relative z-10 text-center container-custom space-y-4">
          <motion.span 
            className="font-mono text-xs tracking-[0.3em] text-[var(--gold-light)] block uppercase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            MERCANTILE RECORD • CHENNAI PORT
          </motion.span>
          <motion.h1 
            className="font-display font-semibold text-white tracking-tight leading-tight"
            style={{ fontSize: 'clamp(38px, 6.5vw, 76px)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            History & <span className="italic font-normal gold-shimmer">Story</span>
          </motion.h1>
          <motion.p
            className="font-body text-sm md:text-base max-w-xl text-neutral-300 mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Mapping corporate excellence across Soft Commodity pathways for over two decades.
          </motion.p>
        </div>

        {/* Bottom border fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--cream) 0%, transparent 100%)' }} />
      </section>

      {/* 2. OUR HERITAGE NARRATIVE */}
      <section 
        ref={storyRef}
        className="section-padding bg-[#fbf9f4]"
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Image curtain reveal */}
            <div className="lg:col-span-5 relative">
              <div className={`curtain-reveal aspect-[4/5] border border-neutral-300 overflow-hidden group ${storyInView ? 'active' : ''}`}>
                <img 
                  src="/images/warehouse.png" 
                  alt="SpiceRoute Global processing hub Chennai" 
                  className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[var(--midnight)] text-white p-6 border border-neutral-800 shadow-md">
                <span className="font-mono text-[9px] tracking-wider text-neutral-400 block mb-1">AUDITED CAPACITY</span>
                <span className="font-mono text-xl text-[var(--gold)] font-bold block">50K SQ FT</span>
              </div>
            </div>

            {/* Right Narrative */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial="hidden"
              animate={storyInView ? 'visible' : 'hidden'}
              variants={fadeRight}
            >
              <span className="font-mono text-xs tracking-[0.25em] text-[var(--gold)] font-bold block uppercase">
                THE SENSORY ARCHIVE
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-medium text-[var(--text-dark)] leading-tight">
                Pioneering B2B Spice <br />
                <span className="italic font-normal text-[var(--cardamom)]">Standardization since 2004.</span>
              </h2>
              <p className="font-body text-sm md:text-base text-[var(--text-body)] leading-relaxed font-light">
                Originally incorporated as Richy Exports Pvt. Ltd., our corporate journey is characterized by structural discipline and absolute agricultural integration. Over two decades, we have bridged farm-level sifting with international wholesale specifications, establishing verified pipelines for food processors and gourmet channels in 50 countries.
              </p>
              <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed font-light">
                In 2026, we entered our global era through the launch of SpiceRoute Global — integrating next-generation distributed supply ledgers, automated sensor-controlled packaging, and streamlined maritime operations. We guarantee 100% origin-to-port traceability.
              </p>

              {/* Minimal Line divider */}
              <div className="pt-4 flex items-center gap-4 text-xs font-mono text-neutral-400">
                <div className="h-px bg-neutral-300 flex-1" />
                <MapPin className="w-4.5 h-4.5 text-red-500" />
                <span>Chennai Port Hub Headquarters</span>
                <div className="h-px bg-neutral-300 flex-1" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. MILESTONES TIMELINE */}
      <section 
        ref={timelineRef}
        className="section-padding bg-[#f5f3ee] border-y border-neutral-200"
      >
        <div className="container-custom">
          {/* Header */}
          <div className="section-header text-center mx-auto mb-16 max-w-xl">
            <span className="section-label">THE CHRONOLOGY</span>
            <h2 className="section-title">Milestones of Scale</h2>
            <p className="section-subtitle mx-auto">
              Charting the evolution of our B2B spice network from a regional co-op to a global MNC infrastructure.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {MILESTONES.map((stone, i) => (
              <motion.div
                key={stone.year}
                className="bg-white border border-neutral-300 p-8 flex flex-col justify-between group"
                initial="hidden"
                animate={timelineInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i}
              >
                <div>
                  <span className="font-mono text-xs text-[var(--gold)] font-bold block mb-4 tracking-wider">{stone.year} • STAGE {i+1}</span>
                  <h3 className="font-display text-xl font-semibold text-[var(--text-dark)] group-hover:text-[var(--saffron)] transition-colors mb-2">
                    {stone.title}
                  </h3>
                  <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed">
                    {stone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section 
        ref={valuesRef}
        className="section-padding bg-[#fbf9f4]"
      >
        <div className="container-custom">
          {/* Header */}
          <div className="section-header text-center mx-auto mb-16 max-w-xl">
            <span className="section-label">OUR DISCIPLINE</span>
            <h2 className="section-title">Core Principles</h2>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  className="bg-[#f0eee9] border border-neutral-200 p-8 flex flex-col justify-between"
                  initial="hidden"
                  animate={valuesInView ? 'visible' : 'hidden'}
                  variants={fadeUp}
                  custom={i}
                >
                  <div className="w-10 h-10 bg-[var(--midnight)] flex items-center justify-center mb-6">
                    <Icon className="w-4.5 h-4.5 text-[var(--gold-light)]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-[var(--text-dark)]">{val.title}</h3>
                    <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed">{val.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP SECTION */}
      <section 
        ref={leadRef}
        className="section-padding bg-[var(--midnight)] text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
        
        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="section-header text-center mx-auto max-w-xl mb-16 text-white">
            <span className="font-mono text-xs tracking-[0.25em] text-[var(--gold-light)] font-bold uppercase block mb-3">GOVERNANCE</span>
            <h2 className="font-display text-3xl md:text-5xl font-medium text-white">The Trade Directors</h2>
            <p className="font-body text-xs text-neutral-400 mt-2">
              Combining trade veterans and food sciences heads to command global operations.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {LEADERSHIP.map((person, i) => (
              <motion.div
                key={person.name}
                className="bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between group hover:border-[var(--gold)] transition-colors duration-300"
                initial="hidden"
                animate={leadInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i}
              >
                <div>
                  {/* Initials avatar sharp */}
                  <div className="w-16 h-16 border border-neutral-700 bg-neutral-800 flex items-center justify-center mb-6 group-hover:border-[var(--gold)] transition-colors duration-300">
                    <span className="font-mono text-lg font-bold text-[var(--gold)]">{person.initials}</span>
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold text-cream mb-1">{person.name}</h3>
                  <span className="font-mono text-[10px] tracking-wider text-neutral-400 block mb-4 uppercase">{person.title}</span>
                  
                  <p className="font-body text-xs text-neutral-400 leading-relaxed font-light">
                    {person.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
