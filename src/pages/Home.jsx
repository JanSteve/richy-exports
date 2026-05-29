import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Globe, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Anchor,
  Clock,
  Briefcase,
  HeartHandshake
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   ANIMATION VARIANT CONFIGS
   ═══════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Parallax transform for hero assets
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const [opsRef, opsInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [bentoRef, bentoInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [heritageRef, heritageInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [networkRef, networkInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div className="relative min-h-screen bg-[#fbf9f4] overflow-hidden">
      {/* Organic Grain noise overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none z-[1] opacity-5" />

      {/* 1. CINEMATIC SPLIT HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative h-screen min-h-[700px] flex flex-col md:flex-row overflow-hidden pt-[80px]"
      >
        {/* Left Side: Saffron Macro */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group">
          <motion.img 
            style={{ scale: scaleImg }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMu83a2wYjV9JMUdAFONhwxKMT_kyEQ3rUmo8_1zHlQOS8tg3Eg2COrKoU7MPZ-AHc_hzBcBTvB-1iPUybQwQ3SCZZQsiOZr3SPKJu28RDI7Nuh8bsJxoh_UqDIdXtKJGPgG2FAW_f-9ibwtbNgYx7xrmeYR0w4ZSuG-7d7qfA1Qsd9CV67UDDSm96_Z2oX5NSSgqxh09AU4dG6ZMv-H0lLpSoImEgInUQf-il3EQxlGLwB2m-OYTaVbutRUGOaDqTDHWZO8IgP2Q" 
            alt="Macro close-up of high-grade Kashmiri saffron threads" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[var(--gold)]/20 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute bottom-8 left-6 md:left-12 z-10 text-white drop-shadow-lg">
            <span className="inline-block px-3 py-1 bg-[var(--gold)] text-white font-mono text-[9px] uppercase tracking-[0.2em] mb-3">
              GOLDEN HARVEST
            </span>
            <h2 className="font-display text-2xl md:text-3xl italic font-semibold">The World's Purest Spices</h2>
          </div>
        </div>

        {/* Right Side: Luxury Carpet / Textiles */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group">
          <motion.img 
            style={{ scale: scaleImg }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDUKHjnr7sdFUA1At-JRGqMe-73Q-TrAAWvs8yCJFTUMaXSPzz5AhLk3ZRdQT-o-MWJILDphRxxK0B9LZTBI43RpDGss5_V1G46hhQASPqhMWTTyYHLkliB5uTy19yqj-64C1X5hKnTYuV5l-Hiz5G4GIJdFv81OKD81_TXBF_knxYPQ6jLqzjfb3gQWOTTjvIPSEA_2Ol9kiAB-aHmT64OjUHMxXcy8UnoqI0XilvUrkFwGNv-xUPSjwVDcsRBBQYVEye7xcO4rE" 
            alt="Hand-woven traditional textile rug details" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[var(--saffron)]/10 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute top-8 right-6 md:right-12 z-10 text-white text-right drop-shadow-lg">
            <span className="inline-block px-3 py-1 bg-[var(--saffron)] text-white font-mono text-[9px] uppercase tracking-[0.2em] mb-3">
              WOVEN LEGACY
            </span>
            <h2 className="font-display text-2xl md:text-3xl italic font-semibold text-[var(--cream)]">Artisanal Custom Textiles</h2>
          </div>
        </div>

        {/* Floating Centered Card Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl bg-[#fbf9f4]/95 backdrop-blur-xl p-8 md:p-12 border border-[var(--border-gold)] pointer-events-auto shadow-2xl relative"
            style={{ borderRadius: '0px' }}
          >
            <span className="font-mono text-[10px] tracking-[0.35em] text-[var(--gold)] block uppercase mb-4">
              ESTABLISHED 2019 • CHENNAI PORT
            </span>
            <h1 className="font-display text-3xl md:text-5xl text-[var(--text-dark)] mb-6 leading-tight font-bold">
              Heritage Reimagined: <br />
              <span className="italic font-normal gold-shimmer">Global Spices & Custom Textiles</span>
            </h1>
            <p className="font-body text-sm md:text-base text-[var(--text-body)] mb-8 max-w-xl mx-auto leading-relaxed font-light">
              RICHY EXPORTS bridges the gap between historical excellence and modern global trade standards. We supply the world's finest spices, luxury carpets, and custom blankets with corporate excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-primary bg-[var(--gold)] text-white hover:bg-[var(--midnight)] border-transparent px-8 py-3.5 font-mono text-xs">
                EXPLORE CATALOG
              </Link>
              <Link to="/contact" className="btn-secondary border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white px-8 py-3.5 font-mono text-xs">
                TRADING DESK
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SPEC MARQUEE STRIP */}
      <div className="w-full bg-[var(--midnight)] py-5 border-y border-neutral-800/80 relative z-10">
        <div className="overflow-hidden flex">
          <div className="marquee-track font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-semibold flex gap-16">
            <span>🌶️ Erode Turmeric (Grade-A)</span>
            <span>🌿 Idukki Cardamom (8mm Bold)</span>
            <span>🧣 Premium Blankets (Being Human Project)</span>
            <span>⭐ Guntur Chili (S17 Stemless)</span>
            <span>🍂 Malabar Black Pepper</span>
            <span>🧶 Hand-Knotted Silk Carpets</span>
            <span>🍂 Ceylon Cinnamon Quills</span>
            <span>🌱 Rajasthan Cumin Seeds</span>
            <span>⭐ Kashmiri Mongra Saffron</span>
            <span>🧥 Organic Relief Blankets</span>
            <span>🌶️ Erode Turmeric (Grade-A)</span>
            <span>🌿 Idukki Cardamom (8mm Bold)</span>
            <span>🧣 Premium Blankets (Being Human Project)</span>
            <span>⭐ Guntur Chili (S17 Stemless)</span>
            <span>🍂 Malabar Black Pepper</span>
            <span>🧶 Hand-Knotted Silk Carpets</span>
          </div>
        </div>
      </div>

      {/* 3. LEGACY PARALLAX SECTION */}
      <section 
        ref={heritageRef}
        className="section-padding bg-[#fbf9f4] relative z-10"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <motion.div 
              className="space-y-8"
              initial="hidden"
              animate={heritageInView ? 'visible' : 'hidden'}
              variants={fadeUp}
            >
              <div className="flex items-center gap-4">
                <div className="h-[1.5px] w-12 bg-[var(--gold)]"></div>
                <span className="font-mono text-xs text-[var(--gold)] uppercase tracking-[0.3em] font-bold">OUR HERITAGE</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-[var(--text-dark)]">
                Centuries of Silk & Spice, <br />
                <span className="italic font-normal text-[var(--saffron)]">Structured for Modern B2B.</span>
              </h2>
              <p className="font-body text-base text-[var(--text-body)] leading-relaxed font-light">
                Born from a lineage of master traders and weavers, RICHY EXPORTS bridges the gap between historical excellence and modern global trade standards. We source directly from cooperative agricultural clusters and custom looms, ensuring every thread and grain maintains its ancestral integrity.
              </p>
              
              {/* Stats Split Grid */}
              <div className="grid grid-cols-2 gap-8 pt-4 border-t border-neutral-200">
                <div>
                  <div className="font-display text-3xl md:text-4xl text-[var(--gold)] font-bold mb-1">EST. 2019</div>
                  <div className="font-mono text-[9px] tracking-wider uppercase text-neutral-500 font-bold">Chennai Port Hub</div>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl text-[var(--gold)] font-bold mb-1">45+</div>
                  <div className="font-mono text-[9px] tracking-wider uppercase text-neutral-500 font-bold">Partner Countries</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Visual Archive Box */}
            <motion.div 
              className="relative h-[550px] overflow-hidden border border-neutral-300 shadow-xl"
              initial={{ opacity: 0, x: 40 }}
              animate={heritageInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWBDMoPR8oFC_-iITLzo-VbMIzUpqQ3hK8qrzKFYk43F6ZLmAB_VIHTOR_8AntzfLMTvBQdL7xvF6AC7FI8k7zTYf9_Z_s-hxpP3A5RowSFDzJ5ZN0geLivaBnWLVYl1p2HsedtzL-gz9e7uc7bZv501JEr9dRuVkTr1x9yN-54EhZSdqqgoGdl1eF0zGSzyCcRfkMnuAybsm_KvkIsqF7sI2QjbTnwumn4uiu7crWCucKObhlZ36-AI8sZsk2NhHRCyfF4EtU_1Y"
                alt="Vintage archive photograph representing traditional spice route bazaars"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--gold)]/30 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 border border-[var(--border-gold)] shadow-lg backdrop-blur-md">
                <p className="italic font-display text-sm text-[var(--gold)] leading-relaxed">
                  "We do not just execute projects; we build durable, high-quality B2B bridges across the globe."
                </p>
                <p className="font-mono text-[10px] mt-3 text-neutral-500 uppercase tracking-wider font-bold">
                  — Founder's Decree, Major A Richard Devadoss
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. LANDMARK BEING HUMAN PROJECT FEATURE */}
      <section 
        ref={opsRef}
        className="section-padding bg-[#f5f3ee] border-y border-neutral-200 relative z-10"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Side: Cinematic Project Detail Card */}
            <motion.div 
              className="lg:col-span-5 bg-[var(--midnight)] text-white p-8 md:p-12 border border-neutral-850 shadow-2xl relative overflow-hidden"
              initial="hidden"
              animate={opsInView ? 'visible' : 'hidden'}
              variants={fadeUp}
            >
              <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <span className="inline-block px-3.5 py-1.5 border border-[var(--gold-light)]/30 text-[var(--gold-light)] font-mono text-[9px] tracking-widest uppercase font-bold">
                  Landmark Case Study
                </span>
                <h3 className="font-display text-3xl font-semibold leading-tight text-cream">
                  The Being Human <br />
                  <span className="italic font-normal text-[var(--gold-light)]">Sourcing Contract</span>
                </h3>
                <p className="font-body text-xs text-neutral-400 leading-relaxed font-light">
                  A high-capacity, multi-commodity B2B logistics model successfully executed for the prestigious **Being Human (Salman Khan)** foundation and enterprise, supplying zero-defect whole spices and custom trade/relief blankets globally.
                </p>
                
                <div className="space-y-3 font-mono text-[10px] border-t border-neutral-800 pt-6">
                  <div className="flex justify-between border-b border-neutral-850 pb-2">
                    <span className="text-neutral-500">CLIENT:</span>
                    <span className="text-cream font-bold">Being Human Foundation</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-850 pb-2">
                    <span className="text-neutral-500">COMMODITIES:</span>
                    <span className="text-cream font-bold">Spices & Custom Blankets</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">LOGISTICS SLA:</span>
                    <span className="text-[var(--gold-light)] font-bold">100% Purity & SLA Adherence</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Content and Hopes */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={opsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="font-mono text-xs tracking-[0.25em] text-[var(--gold)] font-bold uppercase block">
                MNC LOGISTICS CAPACITY
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-[var(--text-dark)]">
                Scaling Beyond Borders, <br />
                <span className="italic font-normal text-[var(--cardamom)]">With Absolute Compliance.</span>
              </h2>
              <p className="font-body text-base text-[var(--text-body)] leading-relaxed font-light">
                Having successfully navigated massive custom operations like the Being Human contract, RICHY EXPORTS continues to maintain vertically integrated B2B systems. 
              </p>
              <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed font-light">
                Our facilities operate 27-point laboratory testing modules to fulfill bulk enterprise contracts. Today, we are actively expanding our trading pipelines globally, **hoping to secure more high-profile B2B distribution projects** for international clients.
              </p>
              <div className="pt-4 flex flex-wrap gap-6 items-center">
                <Link to="/about" className="btn-secondary border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white px-8 py-3 font-mono text-xs">
                  ABOUT OUR PIPELINE
                </Link>
                <a href="tel:+919600852141" className="font-mono text-xs text-[var(--gold)] font-bold hover:underline">
                  DIRECT DESK CALL: +91 96008 52141
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. THE CURATOR'S SELECTION (Bento Grid) */}
      <section 
        ref={bentoRef}
        className="section-padding px-6 max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-[var(--gold)] uppercase block mb-3 font-bold">
            EXPORTS SHOWCASE
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-on-surface">
            The Curator's <span className="italic font-normal">Selection</span>
          </h2>
          <div className="h-[1.5px] w-24 bg-[var(--border-gold)] mx-auto mt-4"></div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
          
          {/* Bento Item 1: Saffron Large (Col-span 2, Row-span 2) */}
          <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden border border-[var(--border-gold)]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkdxZGLDZRwY__4qsGrVvAZ189ldtP-2TXU5j6D_o8-f8Nzb-79toPAU6LaU0n1PboA4zae4si3NOH7Ov1J65g_Q8YjsmpXdGH5yOvLRuD27Cu8pKbxJFHXfQRiAYtan7xiA_jZP0mAbNZUchXChYHrOKarPTUgrlT67TXN0ch2kX-LQIaSnUi2sCnDmJPDWhVz_fyq7BVUw4kNn3LGQ712lMJU0t2UTLKRTQCpuC-z15tKjvgMc9BpATVAnovnK7GwkW1fl4zkoM" 
              alt="Artisanal spice quality weighing panel" 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-10">
              <span className="text-[var(--gold-light)] font-mono text-[9px] uppercase tracking-widest mb-2 font-bold">
                EXCLUSIVE WHOLESALE IMPORT
              </span>
              <h3 className="text-white font-display text-3xl font-semibold">The Spice Vault</h3>
              <p className="text-neutral-300 font-body text-xs mt-4 leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-all duration-500 max-w-sm">
                Directly sourced Grade A+ saffron, handpicked turmeric, and essential spices packed under rigid inert nitrogen atmospheres to preserve intense aromatic volatile oils.
              </p>
            </div>
          </div>

          {/* Bento Item 2: Textiles & Carpets (Col-span 2) */}
          <div className="md:col-span-2 group relative overflow-hidden border border-[var(--border-gold)]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQzZ6XYj4MEawW_83rsF8DEMezHj-eegUj2fB0_6-PLYYu7p4QGOt6aJuVM8aaf7GsKmn8uF4L5WDBnyz4czyz9dnUXpVVg-cJIfb-qJJdgdNA_5yryuTe83oVtPHC8NnwmpvWxbSmEHv-By8uBZ0wqqu-YWpJWck0ZN2oYiThpGUIr6D9jOvK-B187VpdCc5OlP-LmuFjZ8mpjPpun-Kdr1seJCGxJF1ABNhmmg_MuJiRGraRwRTs9AzMoCAZMs2rt1gRVMMQq5U" 
              alt="Premium living space with luxury handknotted carpets" 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white font-display text-2xl font-semibold italic">The Textile & Loom Series</h3>
              <p className="text-neutral-300 font-body text-xs mt-2 font-light max-w-md">
                Masterpiece hand-woven silk carpets and merino-grade relief blankets crafted by legacy family looms.
              </p>
              <Link to="/products" className="text-[var(--gold-light)] font-mono text-[9px] uppercase tracking-widest mt-4 flex items-center gap-1.5 hover:underline w-fit">
                VIEW EXPORTS <ArrowRight size={10} />
              </Link>
            </div>
          </div>

          {/* Bento Item 3: Global Logistics (Col-span 1) */}
          <div className="group relative overflow-hidden bg-white p-8 border border-[var(--border-gold)] flex flex-col justify-between">
            <div className="space-y-4">
              <Globe className="text-[var(--gold)] w-8 h-8" />
              <h3 className="font-display text-lg font-bold text-neutral-850">Global Supply Chain</h3>
              <p className="font-body text-xs text-[var(--text-body)] leading-relaxed font-light">
                Real-time tracking and environment-controlled maritime logs dispatching to 45+ ports.
              </p>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--gold)] font-bold mt-6">
              MNC GRADE ROUTING
            </span>
          </div>

          {/* Bento Item 4: Dye/Detail Close-up (Col-span 1) */}
          <div className="group relative overflow-hidden border border-[var(--border-gold)]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyZlG_lEhOZ3ETyCY0rERkUoY0yP-ip9UvO8I2vFZACwaelwF7b0y-hsCvZ18Cchy9QPmZT4MImoaf8IWaW5jhM14GsKUIB7f_iWbw038CWKc6-370O_YgsPiefpBtO9ggPxJuPlyyCooYp9rEdaYBvDaUIjVfGqc4bdsDmI7TMV5FIZAq1Et5ywpRaXRpv_qHIBU2OnYdYKH2xmp3d6pW305GidYlzA5JdXTUy8G2GSSczLkxWoOcxS9qAuPqNizWN1QfI0-CkmA" 
              alt="Artisanal fiber copper dyeing processes" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s]"
            />
            <div className="absolute inset-0 bg-[var(--gold)]/20 mix-blend-overlay pointer-events-none"></div>
          </div>

        </div>
      </section>

      {/* 6. THE HERITAGE NETWORK (Global Ports Map) */}
      <section 
        ref={networkRef}
        className="bg-[var(--midnight)] py-24 text-white relative z-10 border-t border-neutral-800"
      >
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
        
        <div className="container-custom flex flex-col items-center">
          <div className="text-center mb-16 max-w-xl">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--gold-light)] uppercase font-bold block mb-3">
              MARITIME HUB MAP
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream">
              The Heritage Network
            </h2>
            <p className="font-body text-xs text-neutral-400 mt-3 leading-relaxed font-light">
              Connecting traditional cooperative harvest clusters and luxury textile looms directly with premier international trade terminals.
            </p>
          </div>

          {/* Styled Map Container */}
          <div className="w-full h-[500px] rounded-none overflow-hidden relative border border-neutral-800 bg-neutral-950">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtISA7nFRdHvlYElghlzgzOspXojtMU7VQdLd7ENgzEzBME6vl1Se95TP3oATgGQlRxXUh6SK6H6f4mojaGvkXwpjwKvCNWE5hDO0Dibev2mbOR4g3XYdFSKSSytS5uf4oHBjbpzdn4KpLHrkf72tm0BZEPC6P8PXJD_eJdRtnJs_oXsxpxQxeUGT5rcfzBUWmivi3M5w5L1dgCeIMZDvJkBMVoRGIx2PhGvs5VXJv-4FJcWhcrKuSaa7uVOt4z1eGGdIZr2fZDuw" 
              alt="Global logistics shipping corridors map visual" 
              className="w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950 pointer-events-none"></div>
            
            {/* Dubai Node */}
            <div className="absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-[var(--gold-light)] border border-white animate-pulse" />
              <div className="mt-2 bg-neutral-900/90 border border-neutral-800 p-2 rounded-none text-[8px] font-mono text-cream uppercase tracking-wider backdrop-blur-md">
                DUBAI HUB
              </div>
            </div>

            {/* London Node */}
            <div className="absolute top-[32%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-[var(--gold-light)] border border-white animate-pulse" />
              <div className="mt-2 bg-neutral-900/90 border border-neutral-800 p-2 rounded-none text-[8px] font-mono text-cream uppercase tracking-wider backdrop-blur-md">
                LONDON REP OFFICE
              </div>
            </div>

            {/* Chennai HQ Node */}
            <div className="absolute top-[58%] left-[68%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-red-600 border-2 border-white animate-ping absolute" />
              <span className="w-4 h-4 rounded-full bg-red-600 border-2 border-white" />
              <div className="mt-2 bg-neutral-900/90 border border-red-900/50 p-2 rounded-none text-[8px] font-mono text-cream uppercase tracking-wider backdrop-blur-md font-bold">
                CHENNAI HQ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER CTA BAND */}
      <section className="py-20 bg-[var(--midnight)] text-white text-center relative z-10 border-t border-neutral-800">
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
        <div className="container-custom max-w-4xl space-y-6 relative z-10">
          <Sparkles className="text-[var(--gold-light)] w-8 h-8 mx-auto mb-2 animate-pulse" />
          <h2 className="font-display text-3xl md:text-5xl font-medium text-white leading-tight">
            Secure Your <span className="italic font-normal gold-shimmer">B2B Trade Docket</span>
          </h2>
          <p className="font-body text-xs md:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
            Formulate your specifications with our trade directors. Gain immediate access to custom packaging pipelines, chemical certifications, and direct sea dispatch slots from Chennai Port.
          </p>
          <div className="pt-4">
            <Link to="/contact" className="btn-primary bg-[var(--gold)] text-white hover:bg-white hover:text-black border-transparent font-mono text-xs">
              CONNECT TO TRADING DESK <ChevronRight className="w-4 h-4 inline ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
