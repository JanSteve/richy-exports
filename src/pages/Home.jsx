import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Globe, 
  Anchor, 
  TrendingUp, 
  MapPin, 
  Award, 
  ShieldCheck, 
  ArrowDown, 
  Sparkles,
  ChevronRight,
  Route
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   ANIMATION CONFIGS
   ═══════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

/* ═══════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════ */

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.85]);

  const [opsRef, opsInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [bentoRef, bentoInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [heritageRef, heritageInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="relative min-h-screen bg-[#fbf9f4] overflow-hidden">
      {/* Organic Grain noise overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none z-[1]" />

      {/* 1. HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative h-screen min-h-[700px] flex items-center overflow-hidden"
      >
        {/* Cinematic Parallax Background */}
        <motion.div className="absolute inset-0 w-full h-[130%] z-0" style={{ y: imgY }}>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFeESTz28iQ_YWYADeEUEBqQvr_0jzF5SpCpfy7XoJgVD6HXK6JY7orhfR0E2xtCc_XZeoTIBn1bhJn8wOfUvcFzQzDnBOfaIlj489Tnkc7kdhPpmA-Q8ohTzd2XiQINvJsgVg-vLHoZPUxao_AcTPdl0NntxVmWxIC_dwbCFhVKWg7L_vXrAT5SGOzEm9LnCHhc2PahOkLH23uYW9KH-cE2um11shGbYtShTQ3-4YrucJC8JWjgf6_5CqAQYjcvHbvwpNkkvVD-k" 
            alt="Cinematic macro photography of premium Indian spices" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Spice Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 z-[1]"
          style={{
            opacity: overlayOpacity,
            background: 'linear-gradient(180deg, rgba(27,28,25,0.4) 0%, rgba(27,28,25,0.7) 60%, rgba(27,28,25,0.95) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          <div className="max-w-4xl space-y-6">
            <motion.span 
              className="font-mono text-xs tracking-[0.35em] text-[var(--gold-light)] block uppercase"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              ESTABLISHED 1642 • REIMAGINED 2026
            </motion.span>
            
            <motion.h1 
              className="font-display font-semibold text-white tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(44px, 7.5vw, 88px)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Sourcing the World's <br className="hidden md:inline" />
              <span className="italic font-normal gold-shimmer">Finest Spices</span>
            </motion.h1>

            <motion.p
              className="font-body text-base md:text-lg max-w-2xl text-neutral-300 leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Redefining the global trade of high-value raw materials. SpiceRoute Global combines centuries-old wisdom with cutting-edge logistical intelligence.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              <Link to="/products" className="btn-primary bg-[var(--gold)] text-white hover:bg-white hover:text-black border-transparent">
                EXPLORE COLLECTIONS
              </Link>
              <Link to="/contact" className="btn-secondary border border-white text-white hover:bg-white hover:text-black hover:border-white">
                TRADING DESK
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ArrowDown className="text-white w-6 h-6 font-light" />
        </div>
      </section>

      {/* 2. SPICE NAMES MARQUEE */}
      <div className="w-full bg-[var(--midnight)] py-5 border-y border-neutral-800/80 relative z-10">
        <div className="overflow-hidden flex">
          <div className="marquee-track font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-semibold flex gap-16">
            <span>🌶️ Erode Turmeric (Grade-A)</span>
            <span>🌿 Idukki Cardamom (8mm Bold)</span>
            <span>⭐ Guntur Chili (S17 Stemless)</span>
            <span>🍂 Malabar Black Pepper</span>
            <span>🍂 Ceylon Cinnamon Quills</span>
            <span>🌱 Rajasthan Cumin Seeds</span>
            <span>⭐ Kashmiri Mongra Saffron</span>
            <span>🌿 Erode Turmeric (Grade-A)</span>
            <span>🌿 Idukki Cardamom (8mm Bold)</span>
            <span>⭐ Guntur Chili (S17 Stemless)</span>
            <span>🍂 Malabar Black Pepper</span>
            <span>🍂 Ceylon Cinnamon Quills</span>
            <span>🌱 Rajasthan Cumin Seeds</span>
            <span>⭐ Kashmiri Mongra Saffron</span>
          </div>
        </div>
      </div>

      {/* 3. GLOBAL OPERATIONS (MNC Logistics) */}
      <section 
        ref={opsRef}
        className="section-padding bg-[#fbf9f4] relative z-10"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-5 space-y-6"
              initial="hidden"
              animate={opsInView ? 'visible' : 'hidden'}
              variants={fadeUp}
            >
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-bold">
                GLOBAL OPERATIONS
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-[var(--text-dark)] leading-tight">
                Unmatched Logistics, <br />
                <span className="italic font-normal text-[var(--cardamom)]">Seamless Scale.</span>
              </h2>
              <p className="font-body text-base text-[var(--text-muted)] leading-relaxed font-light">
                Leveraging our proprietary MNC fleet and real-time tracking, we bridge the gap between remote harvest nodes and global industrial centers. Our supply chain is a testament to precision and reliability.
              </p>
              
              {/* Split Stats */}
              <div className="grid grid-cols-2 gap-8 border-t border-neutral-300 pt-8">
                <div>
                  <div className="font-mono text-[32px] text-[var(--gold)] font-semibold mb-1">124+</div>
                  <div className="font-mono text-[9px] tracking-wider uppercase text-neutral-500 font-bold">Port Destinations</div>
                </div>
                <div>
                  <div className="font-mono text-[32px] text-[var(--gold)] font-semibold mb-1">850K</div>
                  <div className="font-mono text-[9px] tracking-wider uppercase text-neutral-500 font-bold">Tons Exported Annually</div>
                </div>
              </div>
            </motion.div>

            {/* Right Image (Curtain Reveal) */}
            <div className="lg:col-span-7">
              <div className={`curtain-reveal aspect-video border border-neutral-300 shadow-sm relative overflow-hidden group ${opsInView ? 'active' : ''}`}>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFwCqGgBGHmrlK61p0inrCzMb8iMJOGWcygz2g77B0vnZrNo0msaFzkcXUzjYefvegZ2SS6YetBZSc8L6-pMrtGYmUnGNytm5-2lkRWmjdMcyPBKIxfWLPpLkreURdV3pzWbBnhpbbRPUJmQAcl2dVjXFi1gY5HjcrcnXWdZIYlPztt31Otyzzcq296z3LxmvPGUDSs-kAnujZfb3w-da-5M3kRhi8SdReYWLBUIjkxNyMpLbS8_X7KB9pm-wEDQoJVpehwcOkoDE" 
                  alt="Maritime spice cargo ship at sunset logistics" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. THE VAULT OF ORIGIN (Bento Preview) */}
      <section 
        ref={bentoRef}
        className="section-padding bg-[var(--midnight)] text-white relative z-10"
      >
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
        
        <div className="container-custom">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--gold-light)] font-bold mb-3 block">
                CATALOG PREVIEW
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-white leading-tight">
                The Vault of <span className="italic font-normal">Origin</span>
              </h2>
            </div>
            <Link 
              to="/products" 
              className="font-mono text-xs tracking-wider uppercase border-b border-[var(--gold-light)] text-[var(--gold-light)] pb-1 hover:text-white hover:border-white transition-colors duration-300 inline-block"
            >
              View Full Catalog
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Bento 1: Saffron (2 Columns) */}
            <div className="md:col-span-2 group relative overflow-hidden h-[450px] border border-neutral-800">
              <img 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMWfK3FX4AXgPfz03q7KAlk-n7VATnNS1Huh3rijvLOQ05josfOFqGU7Ojsgr5MeP_Il5rUzN8F6S6lq-ePqnV4Ygg_8c48orB78vAq82gXyFjMJ4yIkhgTmVRo8LfpED9W3hgMkUOcgX2zE9Rneh51hBX3MYjMjLLVOSiD7m8G1TQPJso0d1jEWyXNLVTn8xd5_g_nGjozQdEbpLPpOXZxqxXvLaOQxdnq251vI-x6MrLFJrJfhxEOQTODLphZllrjTPD9J93Un0"
                alt="Kashmiri Mongra Saffron"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-8 flex flex-col justify-end">
                <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--gold-light)] font-bold mb-1">HERITAGE GRADE</span>
                <h3 className="font-display text-2xl font-semibold text-white mb-2">Kashmiri Saffron</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
                  The world's highest grade mongra threads, hand-picked in Pampore fields.
                </p>
              </div>
            </div>

            {/* Bento 2: Pepper (1 Column) */}
            <div className="group relative overflow-hidden h-[450px] border border-neutral-800">
              <img 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpg-K8YmVBVA4KAJ8KXPwx2OenomSGkLwObQbD4aF0qRpF9v2YJsIEUvHJiqwBwjXcisGkiSJRIJpFSySMrSiFed__Ksp41dMJDN3vyEHokNMgTxdwNLT2qhiJb9BFhP-HHfBbTITtm_61JDttbYuWn7jpD49QIlj4NAuqPYiT1vcBE4j6EF2fEtyQMMCeaRb1s7tigMRs_uLd3Ypr4M2b2iA-LOuE3eog0sl1BATpEBZBgVn44-de-DmSnmL3D-SRjCakNcVlLx4"
                alt="Tellicherry Black Pepper"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-8 flex flex-col justify-end">
                <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--gold-light)] font-bold mb-1">TELLICHERRY</span>
                <h3 className="font-display text-2xl font-semibold text-white mb-2">Black Gold</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Sun-dried bold garbled black pepper berries from Western Ghats.
                </p>
              </div>
            </div>

            {/* Bento 3: Cinnamon (1 Column) */}
            <div className="group relative overflow-hidden h-[450px] border border-neutral-800">
              <img 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6mGr5cW8NuV9U3HJtuiMidaz-T9MMqjBHT5TS-ES1vQGXvv_TTgmDJqyVo8_XhQvhe_tutqyjqSXs0NC2x6reK6BryfC7GauF39m8x7tHx8zTjW8Cl2cjTxuUo1SFUfgjQzkynpDZD7VN1OnL1uWxS_sSKOJ8L8CwtE-naB5bhsd_jGfhGXTyWzJRfGUMcnjZ2jPmB9FyxO6kI0zDLeY3nMGVAaRE9iMqLKAysRHszFkycRwuTIYX2gLjmhg4P58TB3GWA4_-Mks"
                alt="Ceylon Cinnamon"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-8 flex flex-col justify-end">
                <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--gold-light)] font-bold mb-1">CEYLON</span>
                <h3 className="font-display text-2xl font-semibold text-white mb-2">True Cinnamon</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Highly fragrant, sweet-woody layered quills hand-peeled in Kerala.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PROCESS TIMELINE ("Farm to Port" — high-end editorial) */}
      <section 
        ref={timelineRef}
        className="section-padding bg-[#fbf9f4] relative z-10"
      >
        <div className="container-custom">
          {/* Header */}
          <div className="section-header text-center mx-auto max-w-2xl mb-16">
            <span className="section-label">THE HIGH-PRECISION TRADITION</span>
            <h2 className="section-title">Farm to Port Corridor</h2>
            <p className="section-subtitle mx-auto">
              Our 5-stage B2B chain guarantees absolute quality, traceability, and streamlined sea logistics.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="grid md:grid-cols-5 gap-8 items-start relative">
            {/* Desktop connector line */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1.5px] bg-neutral-200 z-0" />

            {/* Steps */}
            {[
              { num: '01', title: 'Direct Sourcing', icon: Globe, desc: 'Partnering directly with 2,000+ certified family farms across India.' },
              { num: '02', title: 'Grade Auditing', icon: Award, desc: '27-point laboratory checks including ASTA color, moisture levels, and purity.' },
              { num: '03', title: 'Sortex Processing', icon: ShieldCheck, desc: 'Advanced multi-stage color sortex, cleaning, and mesh sorting.' },
              { num: '04', title: 'Kraft Packaging', icon: Anchor, desc: 'Multi-layer food-grade kraft bags with inner poly-liners preserving aroma.' },
              { num: '05', title: 'SLA Port Dispatch', icon: Route, desc: 'Custom clearance and sea shipping to 45+ ports within 12 hours of packing.' }
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  className="flex flex-col items-center text-center relative z-10 group"
                  initial="hidden"
                  animate={timelineInView ? 'visible' : 'hidden'}
                  variants={fadeUp}
                  custom={i}
                >
                  {/* Circle Node */}
                  <div className="w-14 h-14 bg-white border-2 border-neutral-200 group-hover:border-[var(--gold)] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 mb-6">
                    <Icon className="w-5 h-5 text-neutral-400 group-hover:text-[var(--gold)] transition-colors duration-300" />
                  </div>
                  
                  <span className="font-mono text-xs text-[var(--gold)] tracking-widest block mb-2">{step.num} / {step.title}</span>
                  <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed px-4">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HERITAGE STORY ("A Legacy Carved in Silt and Sea") */}
      <section 
        ref={heritageRef}
        className="section-padding bg-[#f5f3ee] overflow-hidden relative z-10"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Box */}
            <motion.div 
              className="w-full"
              initial="hidden"
              animate={heritageInView ? 'visible' : 'hidden'}
              variants={fadeUp}
            >
              <div className="p-8 md:p-12 bg-white border border-neutral-300/60 shadow-sm relative">
                <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--gold)] font-bold block mb-4">THE VOYAGE LEGACY</span>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-[var(--text-dark)] leading-tight mb-6">
                  A Legacy Carved in <br />
                  <span className="italic font-normal text-[var(--saffron)]">Silt and Sea.</span>
                </h2>
                <p className="font-body text-base text-[var(--text-muted)] leading-relaxed mb-6 font-light">
                  Before the algorithms and automated ports, there were the winds. SpiceRoute Global honors the ancient navigators who mapped the first connections between East and West.
                </p>
                <p className="font-display text-lg italic text-[var(--text-dark)] leading-relaxed border-l-2 border-[var(--gold)] pl-4 py-1 mb-8">
                  "We do not just trade commodities; we curate the sensory map of human history."
                </p>
                <Link to="/about" className="btn-secondary border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white px-8 py-3.5">
                  OUR HISTORY
                </Link>
              </div>
            </motion.div>

            {/* Right Map Image */}
            <motion.div 
              className="w-full relative"
              initial={{ opacity: 0, x: 50 }}
              animate={heritageInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[3/4] overflow-hidden border border-neutral-300 shadow-sm">
                <img 
                  className="w-full h-full object-cover grayscale-[0.1] hover:scale-105 transition-transform duration-[2s]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAXnoZGQEPNAU6VyNjwZqHUN7Jl0dJ6fgkoWL5IX78gc0JsAUYb3nKYoR1iLzsmDMjby8GcP1hX_fb0aUVTpD2v8CLWFwUmF4QvaneXNQy2rBlNKHEVmdYJCgJfc7Din0FPAVAqnFX6nzo_UJMCXR3mWgO70AujDZ9c22etA-AeKw1Yp590kcE2WqU-akkE39ENNyojz-fgjQppzN07HZg0XJIzqPppWJsgfAZOT-CsZ2BfkdDyRzX7Xs7mjEv1GRVpQ93aLGgWWM"
                  alt="Vintage Maritime charts and spice route routes"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER CTA BAND */}
      <section className="py-20 bg-[var(--midnight)] text-white text-center relative z-10 border-t border-neutral-800">
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
        <div className="container-custom max-w-4xl space-y-6 relative z-10">
          <Sparkles className="text-[var(--gold)] w-8 h-8 mx-auto mb-2 animate-pulse" />
          <h2 className="font-display text-3xl md:text-5xl font-medium text-white leading-tight">
            Secure Your <span className="italic font-normal gold-shimmer">B2B Trade Docket</span>
          </h2>
          <p className="font-body text-xs md:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Gain immediate access to our real-time trade volumes, customizable private label options, and direct port dispatch schedules. Formulate your requirements with our Chennai specialists.
          </p>
          <div className="pt-4">
            <Link to="/contact" className="btn-primary bg-[var(--gold)] text-white hover:bg-white hover:text-black border-transparent">
              CONNECT TO TRADING DESK <ChevronRight className="w-4 h-4 inline ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
