import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Award, 
  ShieldCheck, 
  Compass, 
  Boxes, 
  MapPin, 
  Anchor
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   ABOUT DATA
   ═══════════════════════════════════════════════ */

const MILESTONES = [
  {
    year: '2019',
    title: 'The Foundation',
    desc: 'Richy Exports is incorporated by Founder Major A Richard Devadoss and MD & CEO J Sweety, establishing direct sourcing pipelines for premium agricultural and textile materials.',
  },
  {
    year: '2021',
    title: 'Being Human Collaboration',
    desc: 'Successfully executed the landmark Being Human (Salman Khan) contract, supplying premium spices and custom trade/relief blankets under tight SLAs.',
  },
  {
    year: '2023',
    title: 'Milling & Sifting Expansion',
    desc: 'Inauguration of our state-of-the-art Sortex milling and packaging hub in Chennai, scaling high-capacity B2B operations to European markets.',
  },
  {
    year: '2026 & Beyond',
    title: 'Future Global Projects',
    desc: 'With numerous key contracts completed, we are now actively expanding our trade pipelines, hoping to secure additional international B2B distribution projects.',
  }
];

const LEADERSHIP = [
  {
    initials: 'RD',
    name: 'Major A Richard Devadoss',
    title: 'Founder',
    bio: 'Major A Richard Devadoss founded RICHY EXPORTS in 2019, steering the enterprise with strategic discipline, standard operational procedures, and a global supply chain vision.',
    color: 'var(--gold)'
  },
  {
    initials: 'JS',
    name: 'J Sweety',
    title: 'MD and CEO',
    bio: 'Commanding corporate growth and strategic directions, J Sweety directs our wholesale networks, key client accounts, trade compliance, and global logistics corridors.',
    color: 'var(--saffron)'
  }
];

const VALUES = [
  {
    icon: Compass,
    title: 'Precise Sourcing',
    desc: 'We map raw botanical quality coordinates directly at farm levels. Every single batch is tracked back to its original cooperative cluster.'
  },
  {
    icon: ShieldCheck,
    title: 'Absolute Compliance',
    desc: 'Zero compromises. Our dry spices and textiles exceed rigid international heavy metal, pesticide, and weaving density parameters.'
  },
  {
    icon: Boxes,
    title: 'Logistical Rigor',
    desc: 'Employing proprietary multilayer packaging and high-sea temperature logs to guarantee volatile oils and fabric integrity are 100% preserved.'
  },
  {
    icon: Anchor,
    title: 'Maritime Heritage',
    desc: 'Bridging ancient merchant trading routes with modern high-performance logistical power from Chennai Port.'
  }
];

/* ═══════════════════════════════════════════════
   ANIMATION CONFIGS
   ═══════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.85]);

  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [leadRef, leadInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div className="relative min-h-screen bg-[#fbf9f4] overflow-hidden pt-[80px]">
      <div className="absolute inset-0 grain-overlay pointer-events-none z-0 opacity-5" />

      {/* 1. PARALLAX HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0 w-full h-[130%] z-0" style={{ y: imgY }}>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNg68OtShC3Ibm_Yib0yUoXPcMq4cuuRSA-DnJu6uuJCo1r_41Ep-rsfygwnCNbq5cNlD_1pq0sxb1rbQ150MR48iVxa_Pys40eMBL4UFaN36GrzGLeMJQbw_TxesOf923O-tTcCCW196QdLQGoq8plnsjcgkzEkmH4-vJ3KvGSLSrYfptDlxJvEeVaQs5mJFBzpTIfPQpNmzkYmShOLBnGPgd2P6nvgn8J8Urog9Phx5-2Oy9v5-gBSD-PSDXyLKJlA6-RNGM2D0" 
            alt="RICHY EXPORTS B2B trade boardroom" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </motion.div>

        <motion.div 
          className="absolute inset-0 z-[1]"
          style={{
            opacity: overlayOpacity,
            background: 'linear-gradient(180deg, rgba(27,28,25,0.7) 0%, rgba(27,28,25,0.4) 50%, rgba(27,28,25,0.9) 100%)'
          }}
        />

        <div className="relative z-10 text-center container-custom space-y-4 text-white">
          <span className="font-mono text-xs tracking-[0.3em] text-[var(--gold-light)] block uppercase">
            MERCANTILE REGISTRY • CHENNAI PORT
          </span>
          <h1 
            className="font-display font-bold tracking-tight leading-tight"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            History & <span className="italic font-normal gold-shimmer">Story</span>
          </h1>
          <p className="font-body text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light text-neutral-300">
            Mapping premium global spice corridors and custom textile looms since 2019.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, #fbf9f4 0%, transparent 100%)' }} />
      </section>

      {/* 2. CORPORATE LEGACY STORY */}
      <section 
        ref={storyRef}
        className="section-padding bg-[#fbf9f4]"
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Warehouse visual */}
            <div className="lg:col-span-5 relative">
              <div className={`curtain-reveal aspect-[4/5] border border-neutral-300 overflow-hidden group ${storyInView ? 'active' : ''}`}>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB76r3w6jP3xt2HqT-dRDUYkCF2i3RpT-5C9vKtD29qWwDFJxO6t-4TsjlTVHNSvd4n025Ct6annY2Wj0nksKdFSuoSFOY4vTqm84OAo0DiqbtLnxPqzuYR4Cw7RVhbBJB9sZa-urPGKpucKSWYu0Fr5A6WOVLQVpYEQC0qMyPJpe3u2SGGAcVBx-zqFpf5lep7PHPzeC2IrTh-iMhvNUm-HqaAfWvtI-npAPv-pNHueQaOBymAfwSN9L9F9PbB_RCYt20iTv8BpIE" 
                  alt="RICHY EXPORTS bulk sifting and processing hub" 
                  className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[var(--midnight)] text-white p-6 border border-neutral-800 shadow-md">
                <span className="font-mono text-[9px] tracking-wider text-neutral-400 block mb-1">AUDITED CAPACITY</span>
                <span className="font-mono text-xl text-[var(--gold)] font-bold block">50K SQ FT</span>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial="hidden"
              animate={storyInView ? 'visible' : 'hidden'}
              variants={fadeRight}
            >
              <span className="font-mono text-xs tracking-[0.25em] text-[var(--gold)] font-bold block uppercase">
                THE SENSORY ARCHIVE
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-[var(--text-dark)] leading-tight">
                Pioneering B2B Quality <br />
                <span className="italic font-normal text-[var(--saffron)]">Standardization since 2019.</span>
              </h2>
              <p className="font-body text-sm md:text-base text-[var(--text-body)] leading-relaxed font-light">
                Originally incorporated as RICHY EXPORTS in 2019 by Founder Major A Richard Devadoss and MD & CEO J Sweety, our corporate journey is characterized by structural discipline, absolute botanical sifting, and specialty B2B trade integration. We successfully bridge high-grade spice routing and custom textile sourcing with rigid international wholesale standards.
              </p>
              <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed font-light">
                Our completed works include executing the prestigious Being Human (Salman Khan) contract, supplying premium spices and custom trade blankets. Having completed many key contracts, we are now actively expanding our reach, hoping to secure additional B2B distribution projects.
              </p>

              <div className="pt-4 flex items-center gap-4 text-xs font-mono text-neutral-400 border-t border-neutral-200">
                <MapPin className="w-4.5 h-4.5 text-red-500" />
                <span>Chennai Port Hub Headquarters</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. TIMELINE OF MILESTONES */}
      <section 
        ref={timelineRef}
        className="section-padding bg-[#f5f3ee] border-y border-neutral-200"
      >
        <div className="container-custom">
          <div className="section-header text-center mx-auto mb-16 max-w-xl">
            <span className="section-label">THE CHRONOLOGY</span>
            <h2 className="section-title">Milestones of Scale</h2>
            <p className="section-subtitle mx-auto">
              Charting our evolution from regional Chennai dispatches to a premium global spices and textiles exporter.
            </p>
          </div>

          {/* Milestones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {MILESTONES.map((stone, i) => (
              <motion.div
                key={stone.year}
                className="bg-white border border-neutral-300 p-8 flex flex-col justify-between group hover:border-[var(--gold)] transition-colors duration-300"
                initial="hidden"
                animate={timelineInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i}
              >
                <div>
                  <span className="font-mono text-xs text-[var(--gold)] font-bold block mb-4 tracking-wider">
                    {stone.year} • STAGE {i+1}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[var(--text-dark)] group-hover:text-[var(--saffron)] transition-colors mb-2">
                    {stone.title}
                  </h3>
                  <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed font-light">
                    {stone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE PRINCIPLES */}
      <section 
        ref={valuesRef}
        className="section-padding bg-[#fbf9f4]"
      >
        <div className="container-custom">
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
                    <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed font-light">{val.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CENTERED 2-COLUMN B2B GOVERNANCE */}
      <section 
        ref={leadRef}
        className="section-padding bg-[var(--midnight)] text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="section-header text-center mx-auto max-w-xl mb-16 text-white">
            <span className="font-mono text-xs tracking-[0.25em] text-[var(--gold-light)] font-bold uppercase block mb-3">
              GOVERNANCE
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-cream">
              The Trade Directors
            </h2>
            <p className="font-body text-xs text-neutral-400 mt-2 font-light">
              Disciplined command combining operational rigor and high-capacity global trade.
            </p>
          </div>

          {/* Leadership Cards Grid - Balanced 2-Column */}
          <div className="grid md:grid-cols-2 max-w-4xl mx-auto gap-8">
            {LEADERSHIP.map((person, i) => (
              <motion.div
                key={person.name}
                className="bg-neutral-900 border border-neutral-800 p-8 md:p-10 flex flex-col justify-between group hover:border-[var(--gold)] transition-colors duration-300"
                initial="hidden"
                animate={leadInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i}
              >
                <div>
                  <div className="w-16 h-16 border border-neutral-700 bg-neutral-800 flex items-center justify-center mb-6 group-hover:border-[var(--gold)] transition-colors duration-300">
                    <span className="font-mono text-lg font-bold text-[var(--gold)]">{person.initials}</span>
                  </div>
                  
                  <h3 className="font-display text-2xl font-semibold text-cream mb-1">{person.name}</h3>
                  <span className="font-mono text-[9px] tracking-wider text-[var(--gold-light)] block mb-4 uppercase font-bold">
                    {person.title}
                  </span>
                  
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
