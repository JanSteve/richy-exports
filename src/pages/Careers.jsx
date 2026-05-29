import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Heart, 
  Plane, 
  GraduationCap, 
  TrendingUp, 
  X, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   CAREERS DATA
   ═══════════════════════════════════════════════ */

const OPEN_POSITIONS = [
  {
    id: 'supply-chain',
    title: 'Global Supply Chain Manager',
    dept: 'Operations & Sourcing',
    location: 'London, UK (Mayfair)',
    type: 'Full-Time · MNC Grade',
    desc: 'Command the B2B maritime supply chain and sifting log coordination between South Asia and European distribution centers. Ensure 100% SLA adherence and cost-optimal scheduling.',
    reqs: [
      '6+ years in bulk food, raw commodity, or luxury textile maritime shipping.',
      'Rigid expertise in trade compliance, customs clearance, and global port operations.',
      'Strong B2B relationship skills with global freight networks.'
    ]
  },
  {
    id: 'textile-designer',
    title: 'Luxury Textile & Rug Designer',
    dept: 'Product & Design',
    location: 'Milan, Italy',
    type: 'Full-Time / Contract',
    desc: 'Lead the visual design and pattern curation of our bespoke hand-knotted silk carpet collections and merino blankets. Bridge traditional Indian weaving archival art with contemporary European high-end architectures.',
    reqs: [
      'Degree in Textile Design or fine arts with a focus on woven materials.',
      'Detailed portfolio in luxury interior carpet layouts and artisanal materials.',
      'Expertise in traditional weaving grids and organic dye chemistry.'
    ]
  },
  {
    id: 'spice-sourcing',
    title: 'Regional Spice Sourcing Head',
    dept: 'Sourcing & Quality',
    location: 'Chennai Port HQ, India',
    type: 'Full-Time · Corporate Desk',
    desc: 'Direct collaborative sourcing networks across agricultural co-ops in 8 Indian states. Enforce 27-point laboratory quality controls (ASTA values, pesticide metrics, volatile oil levels) directly at harvest levels.',
    reqs: [
      'Degree in Food Science, Agronomy, or similar B2B agricultural logistics.',
      '4+ years establishing direct-to-farm supply chain loops in South India.',
      'Rigid understanding of ISO 22000, HACCP, and phytosanitary regulatory dockets.'
    ]
  }
];

const BENEFITS = [
  {
    icon: Heart,
    title: 'Global Health Shield',
    desc: 'Premium international health and wellness coverage for you and your direct dependents.'
  },
  {
    icon: Plane,
    title: 'Heritage Immersion',
    desc: 'Annual travel grants enabling our corporate specialists to visit cooperative farms, sifting hubs, and loom origins.'
  },
  {
    icon: GraduationCap,
    title: 'Executive Learning',
    desc: '100% funded certifications with top-tier logistics and business institutions to foster leadership excellence.'
  },
  {
    icon: TrendingUp,
    title: 'Legacy Planning',
    desc: 'Competitive performance equity programs, robust retirement packages, and trade desk incentives.'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Careers() {
  const [activeJob, setActiveJob] = useState(null);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applyData, setApplyData] = useState({ name: '', email: '', role: '', cv: null, cover: '' });
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [cultureRef, cultureInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [jobsRef, jobsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplySubmitted(true);
    setTimeout(() => {
      setApplySubmitted(false);
      setActiveJob(null);
      setApplyData({ name: '', email: '', role: '', cv: null, cover: '' });
    }, 3500);
  };

  const toggleAccordion = (id) => {
    if (expandedAccordion === id) {
      setExpandedAccordion(null);
    } else {
      setExpandedAccordion(id);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fbf9f4] overflow-hidden pt-[120px]">
      <div className="absolute inset-0 grain-overlay pointer-events-none z-0 opacity-5" />

      {/* 1. HERO HEADER */}
      <section 
        ref={headerRef}
        className="px-6 max-w-7xl mx-auto mb-16 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8 space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--gold)] font-bold block uppercase">
              GLOBAL CAREER PORTAL
            </span>
            <h1 className="font-display font-semibold text-[var(--text-dark)] leading-tight text-4xl md:text-6xl tracking-tight">
              Join the Global Trade Leader
            </h1>
          </div>
          <div className="md:col-span-4 pb-1">
            <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed font-light">
              Forging connections between centuries-old craftsmanship and the modern global marketplace. We seek innovators to lead the future of international trade.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE CULTURE (Bento Grid) */}
      <section 
        ref={cultureRef}
        className="px-6 max-w-7xl mx-auto mb-24 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-8 h-auto md:h-[600px]">
          {/* Item 1: Large Collaboration Banner */}
          <div className="md:col-span-8 md:row-span-1 bg-neutral-900 border border-neutral-800 relative overflow-hidden group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNg68OtShC3Ibm_Yib0yUoXPcMq4cuuRSA-DnJu6uuJCo1r_41Ep-rsfygwnCNbq5cNlD_1pq0sxb1rbQ150MR48iVxa_Pys40eMBL4UFaN36GrzGLeMJQbw_TxesOf923O-tTcCCW196QdLQGoq8plnsjcgkzEkmH4-vJ3KvGSLSrYfptDlxJvEeVaQs5mJFBzpTIfPQpNmzkYmShOLBnGPgd2P6nvgn8J8Urog9Phx5-2Oy9v5-gBSD-PSDXyLKJlA6-RNGM2D0" 
              alt="RICHY EXPORTS diverse collaborative team workspace" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[2.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8 z-10 text-white">
              <h3 className="font-display text-2xl font-bold mb-1 group-hover:text-[var(--gold-light)] transition-colors">Collaborative Spirit</h3>
              <p className="font-body text-xs text-neutral-300 max-w-md font-light">Diversity of thought and rigorous logistical metrics fuel our global expansion corridors.</p>
            </div>
          </div>

          {/* Item 2: Vertical Reach stats */}
          <div className="md:col-span-4 md:row-span-2 bg-[#f0eee9] p-8 md:p-10 border border-neutral-300 flex flex-col justify-between">
            <div className="space-y-6">
              <Globe className="text-[var(--gold)] w-10 h-10" />
              <h3 className="font-display text-2xl font-bold text-neutral-850">Global Expansion</h3>
              <p className="font-body text-xs text-[var(--text-body)] leading-relaxed font-light">
                Operating across 45 countries, we offer high-performance international career paths with developmental rotation programs that span the globe from harvesting cooperatives to global corporate offices.
              </p>
            </div>
            
            <div className="border-t border-neutral-300 pt-6">
              <div className="font-display text-5xl text-[var(--gold)] font-bold mb-1 leading-none">45+</div>
              <div className="font-mono text-[9px] tracking-wider uppercase text-neutral-500 font-bold">Active Hub Nodes</div>
            </div>
          </div>

          {/* Item 3: Heritage Principle */}
          <div className="md:col-span-4 md:row-span-1 bg-white p-8 border border-neutral-300 flex flex-col justify-end space-y-4">
            <Briefcase className="text-[var(--saffron)] w-8 h-8" />
            <h3 className="font-display text-lg font-bold text-neutral-850">Heritage Sourcing</h3>
            <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed font-light">
              We preserve traditional agricultural clusters and loom weavers while executing top-grade shipping.
            </p>
          </div>

          {/* Item 4: Sustainability Banner */}
          <div className="md:col-span-4 md:row-span-1 bg-[var(--midnight)] text-white p-8 border border-neutral-850 flex flex-col justify-end space-y-4">
            <h3 className="font-display text-lg font-bold text-cream">Sourcing Sustainability</h3>
            <p className="font-body text-xs text-neutral-400 leading-relaxed font-light">
              Carbon neutral freight offsets and ethical farm compensation are built into our trade desk dockets.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OPEN POSITIONS BOARD (Accordion Style) */}
      <section 
        ref={jobsRef}
        className="section-padding bg-[#f5f3ee] border-y border-neutral-200 relative z-10"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--gold)] uppercase block mb-3 font-bold">
              OFFERS
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-neutral-850">
              Open Positions
            </h2>
            <div className="h-[1.5px] w-24 bg-[var(--gold)] mx-auto mt-4"></div>
          </div>

          {/* Positions Accordion */}
          <div className="max-w-4xl mx-auto space-y-6">
            {OPEN_POSITIONS.map((job) => (
              <div 
                key={job.id}
                className="bg-white border border-neutral-300 overflow-hidden hover:border-[var(--gold)] transition-all duration-300 shadow-sm"
              >
                {/* Header accordion trigger */}
                <button 
                  onClick={() => toggleAccordion(job.id)}
                  className="w-full p-6 md:p-8 flex justify-between items-center text-left focus:outline-none"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 text-[9px] font-mono font-bold uppercase tracking-wider">
                      <span className="bg-[var(--gold)]/10 text-[var(--gold)] px-2 py-0.5">{job.dept}</span>
                      <span className="bg-neutral-100 text-neutral-500 px-2 py-0.5">{job.location}</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-neutral-850 group-hover:text-[var(--gold)]">
                      {job.title}
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`text-neutral-400 w-5 h-5 transition-transform duration-300 ${
                      expandedAccordion === job.id ? 'rotate-180 text-[var(--gold)]' : ''
                    }`} 
                  />
                </button>

                {/* Expanded container */}
                <AnimatePresence initial={false}>
                  {expandedAccordion === job.id && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="border-t border-neutral-100"
                    >
                      <div className="p-6 md:p-8 space-y-6 text-xs leading-relaxed font-light text-[var(--text-body)]">
                        <div className="space-y-2">
                          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold block">
                            ROLE DESCRIPTION
                          </span>
                          <p>{job.desc}</p>
                        </div>

                        <div className="space-y-3">
                          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold block">
                            REQUIREMENTS
                          </span>
                          <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                            {job.reqs.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 flex justify-between items-center border-t border-neutral-100">
                          <span className="font-mono text-[10px] text-neutral-500 font-bold">{job.type}</span>
                          <button 
                            onClick={() => setActiveJob(job)}
                            className="btn-primary bg-neutral-900 border-neutral-900 text-white hover:bg-[var(--gold)] hover:border-[var(--gold)] px-6 py-2.5 font-mono text-[10px]"
                          >
                            APPLY TO ROLE
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EMPLOYEE BENEFITS */}
      <section 
        ref={benefitsRef}
        className="section-padding bg-[#fbf9f4] overflow-hidden relative z-10"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* List */}
            <div className="space-y-10">
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--gold)] leading-tight">
                Specialty Benefits & Perks
              </h2>
              
              <ul className="space-y-8">
                {BENEFITS.map((perk, i) => {
                  const Icon = perk.icon;
                  return (
                    <motion.li 
                      key={perk.title}
                      className="flex gap-4 group"
                      initial="hidden"
                      animate={benefitsInView ? 'visible' : 'hidden'}
                      variants={fadeUp}
                      custom={i}
                    >
                      <div className="w-12 h-12 bg-[#f0eee9] border border-neutral-300 rounded-none flex items-center justify-center flex-shrink-0 group-hover:border-[var(--gold)] group-hover:scale-105 transition-all duration-300">
                        <Icon className="w-5 h-5 text-[var(--gold)]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display text-lg font-bold text-neutral-850">{perk.title}</h4>
                        <p className="font-body text-xs text-[var(--text-muted)] font-light leading-relaxed">{perk.desc}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Photo Box */}
            <div className="relative">
              <div className="overflow-hidden border-l-4 border-[var(--gold)] h-[550px] shadow-2xl">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0gBVQrkA-HMvWizlWDYDnwxs09dUK3WN8lYfSI6zPoGzcoJPU1VSvliG6XIcP9oeKbPTeLrbPcGeL0J_YZbZnZMK6nDl-OqsMZDvXyB3AuUUN4kb43vpZSs9GysWjASKGHofz6432w5fvCYi13RWTE8O4DYRW9xbZcvi2txKTlcVKNgkqpEybKEyqt_Q4cEysAxvi9MJCa-4nVNogNlmdVh5k0lbOI2O8RCZo4UIBNuCYbd4xtgc9bWpGPnJUf-29M9MaEl0uPjk" 
                  alt="Confident woman logistics professional in high-end B2B office environment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[var(--gold)] text-white p-6 border border-[var(--border-gold)] max-w-sm hidden md:block shadow-lg">
                <p className="italic font-display text-sm">"Growth at RICHY is not just professional; it's cultural and long-term."</p>
                <p className="font-mono text-[9px] uppercase tracking-widest mt-4 opacity-80 font-bold">— Sarah Jenkins, Sourcing & Logistics lead</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. APPLICATION MODAL DRAWER */}
      <AnimatePresence>
        {activeJob && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJob(null)}
              className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
            />

            {/* Form Drawer */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="relative bg-white border border-[var(--border-gold)] w-full max-w-lg p-8 md:p-10 rounded-none shadow-2xl z-10"
            >
              <button 
                onClick={() => setActiveJob(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <X size={18} />
              </button>

              {applySubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4 py-8"
                >
                  <CheckCircle2 size={48} className="text-green-600 mx-auto animate-pulse" />
                  <h3 className="font-display text-2xl font-bold text-neutral-850">Application Logged</h3>
                  <p className="font-body text-xs text-neutral-500 leading-relaxed font-light px-4">
                    Your profile has been logged on the **RICHY EXPORTS** Trade Registry. Our logistics and HR lead will review your coordinates and contact you.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-5 text-xs text-neutral-800">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-[var(--gold)] uppercase tracking-wider font-bold block">
                      JOIN THE VOYAGE
                    </span>
                    <h3 className="font-display text-2xl font-bold italic border-b border-neutral-100 pb-3">
                      Apply to {activeJob.title}
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={applyData.name}
                      onChange={(e) => setApplyData({...applyData, name: e.target.value})}
                      placeholder="Jane Doe" 
                      className="w-full bg-transparent border-0 border-b border-neutral-300 py-2 outline-none focus:border-[var(--gold)] text-neutral-800 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={applyData.email}
                      onChange={(e) => setApplyData({...applyData, email: e.target.value})}
                      placeholder="applicant@domain.com" 
                      className="w-full bg-transparent border-0 border-b border-neutral-300 py-2 outline-none focus:border-[var(--gold)] text-neutral-800 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">Attach CV / Dossier (PDF)</label>
                    <input 
                      type="file" 
                      required
                      onChange={(e) => setApplyData({...applyData, cv: e.target.files[0]})}
                      className="w-full py-2 text-neutral-500 font-mono text-[10px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">Statement of Impact</label>
                    <textarea 
                      value={applyData.cover}
                      onChange={(e) => setApplyData({...applyData, cover: e.target.value})}
                      placeholder="Summarize your credentials and shipping expertise..." 
                      rows={3}
                      className="w-full bg-transparent border-0 border-b border-neutral-300 py-2 outline-none focus:border-[var(--gold)] text-neutral-800 transition-colors resize-none text-[11px]"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4.5 bg-[var(--gold)] text-white hover:bg-neutral-900 font-mono text-[10px] uppercase tracking-widest font-bold transition-all duration-300 mt-4"
                  >
                    SUBMIT APPLICATION DOSSIER
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
