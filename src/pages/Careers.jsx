import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, 
  MapPin, 
  ArrowRightLeft, 
  Sparkles, 
  Award, 
  Globe, 
  Building2, 
  ShieldCheck, 
  BrainCircuit, 
  ChevronRight,
  UploadCloud,
  FileCheck,
  X
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   CAREERS DATA
   ═══════════════════════════════════════════════ */

const POSITIONS = [
  {
    id: 'supply-chain-arch',
    code: 'SR-2024-081',
    title: 'Supply Chain Architect',
    department: 'Logistics',
    location: 'Rotterdam, Netherlands (Hybrid)',
    type: 'Full-Time',
    desc: 'Redefine maritime trade routes and terminal routing programs to minimize fuel, maximize speed, and ensure absolute temperature integrity for organic cargo shipments.',
    requirements: ['8+ years in global maritime logistics or bulk container fleet operations', 'Deep expertise in route optimization tools and marine scheduling software', 'Masters degree in Logistics Management or Maritime Systems']
  },
  {
    id: 'blockchain-eng',
    code: 'SR-2024-112',
    title: 'Lead Blockchain Engineer',
    department: 'Tech',
    location: 'Remote / Singapore',
    type: 'Full-Time',
    desc: 'Pioneer our cryptographic ledger supply chain pipeline. Guarantee 100% immutable origin-to-port traceability for high-value organic botanical consignments.',
    requirements: ['5+ years writing production-grade smart contracts and ledger pipelines', 'Deep understanding of Solidity, Rust, and distributed ledger systems', 'Prior history building trade-finance or tracking supply contracts']
  },
  {
    id: 'grade-auditor',
    code: 'SR-2024-045',
    title: 'Spice Grade Auditor',
    department: 'Quality Control',
    location: 'Cochin, India',
    type: 'Onsite',
    desc: 'Supervise 27-point biochemical sensory panel checks at our Indian processing units. Oversee ASTA colorimetry, moisture profiling, and pesticide compliance checks.',
    requirements: ['Degree in Food Science, Biochemistry, or Organic Chemistry', 'Certified experience in ISO 22000 and HACCP laboratory auditing protocols', 'Exceptional sensory acuity and deep understanding of dry botanical grading']
  },
  {
    id: 'risk-analyst',
    code: 'SR-2024-099',
    title: 'Commodity Risk Analyst',
    department: 'Trade',
    location: 'London, UK (Hybrid)',
    type: 'Full-Time',
    desc: 'Forecast global spice commodity pricing shifts, climate disruptions, and currency volatility. Protect corporate margins and design risk frameworks for wholesale import groups.',
    requirements: ['5+ years analyzing agricultural derivatives or soft commodities trade desk data', 'Strong mathematical modelling capabilities and statistical toolkit (R/Python)', 'Excellent presentation skills for briefing corporate buyers and boards']
  }
];

const DEPARTMENTS = ['All Roles', 'Logistics', 'Trade', 'Quality Control', 'Tech'];

const BentoItems = [
  {
    id: 'bento-1',
    icon: Globe,
    title: 'Global Mobility',
    desc: 'Positions available across our primary hubs in Singapore, Rotterdam, Cochin, and Chennai.',
    span: 'md:col-span-2 md:row-span-1'
  },
  {
    id: 'bento-3',
    label: '03 / BENEFITS',
    title: 'Equity & Scale',
    desc: 'Stakeholder equity participation models for all long-term trade and operations associates.',
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'bento-4',
    icon: BrainCircuit,
    title: 'Mastery Fund',
    desc: 'Generous annual stipend covering advanced professional certification, customs certifications, and trade education.',
    span: 'md:col-span-1 md:row-span-1'
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

/* ═══════════════════════════════════════════════
   CAREERS PAGE
   ═══════════════════════════════════════════════ */

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState('All Roles');
  const [selectedJob, setSelectedJob] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    notes: ''
  });

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [bentoRef, bentoInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [listRef, listInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  // Filtering positions
  const filteredPositions = useMemo(() => {
    if (selectedDept === 'All Roles') return POSITIONS;
    return POSITIONS.filter(job => job.department.toLowerCase() === selectedDept.toLowerCase());
  }, [selectedDept]);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setSelectedJob(null);
      setFormData({ name: '', email: '', linkedin: '', notes: '' });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#fbf9f4] overflow-hidden pt-[80px]">
      <div className="absolute inset-0 grain-overlay pointer-events-none z-0" />

      {/* 1. HERO SECTION */}
      <header 
        ref={headerRef}
        className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24 min-h-[600px] flex flex-col justify-center z-10"
      >
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="md:col-span-7 space-y-6">
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--gold)] font-bold block uppercase">
              JOIN THE MODERN VOYAGE
            </span>
            <h1 
              className="font-display font-semibold text-[var(--text-dark)] leading-[1.08] tracking-tight"
              style={{ fontSize: 'clamp(38px, 6vw, 68px)' }}
            >
              Join the Modern <br />
              <span className="italic font-normal text-[var(--saffron)]">Spice Route.</span>
            </h1>
            <p className="font-body text-base md:text-lg text-[var(--text-muted)] max-w-xl leading-relaxed font-light">
              We are redefining the global trade of high-value raw materials. SpiceRoute Global combines centuries-old wisdom with cutting-edge logistical intelligence.
            </p>
            <div className="pt-4">
              <a 
                href="#positions" 
                className="btn-primary bg-[var(--gold)] text-white hover:bg-[var(--midnight)] flex items-center gap-3 border-transparent"
              >
                VIEW OPPORTUNITIES <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:col-span-5 relative">
            <div className="curtain-reveal aspect-[4/5] border border-neutral-300 shadow-sm overflow-hidden group active">
              <img 
                className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx2q4YCvxZrUzRNZz_eg3aNygw9ljD0Gluf-44px3FJ2efQx6vxfEMmce3xnfEX9YoxqX639auMZlJ_yPQPD6KsDw7UQBbJ0j6lAML2QR9N2DBmBOgS1zHn9Z0tHW1VMpZxYOsGXf_u94jj0U9MjXo6-mylRXvfxAy4P41j0aIueM9Lju_7GBzasY1ewpwb-RJAlohjoUjE3lVLSFs7xygtzijt0rNMjfHtNt1oCbUIvbtZSYsRtqOCIfRsg5KIgDib-W7RpMuAQg"
                alt="Turmeric and whole cinnamon sticks in sharp geometric composition"
              />
            </div>
            
            {/* Direct Tech Stat block */}
            <div className="absolute -bottom-6 -left-6 bg-[var(--midnight)] text-white p-6 border border-neutral-800 shadow-lg hidden md:block">
              <span className="font-mono text-[9px] tracking-wider text-neutral-400 block mb-1">NETWORK LATENCY</span>
              <span className="font-mono text-xl text-[var(--gold)] font-bold block">0.42ms</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. GLOBAL CULTURE BENTO GRID */}
      <section 
        ref={bentoRef}
        className="section-padding border-t border-neutral-200"
      >
        <div className="container-custom">
          <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
            <span className="font-mono text-xs tracking-[0.25em] text-[var(--gold)] font-bold uppercase">CORPORATE ETHOS</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[var(--text-dark)] leading-tight">
              A Culture of Precision & Heritage
            </h2>
            <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
              Beyond the trade, we are a global collective of specialists, engineers, and visionaries dedicated to the art of the supply chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[750px]">
            {/* Bento 1: Global Mobility */}
            <div className="md:col-span-2 md:row-span-1 bg-[var(--cream-dark)] border border-neutral-300/60 p-10 flex flex-col justify-end group hover:bg-[var(--midnight)] hover:text-white transition-all duration-500">
              <Globe className="w-10 h-10 text-[var(--gold)] group-hover:text-white mb-6 transition-colors duration-500" />
              <h3 className="font-display text-2xl font-bold mb-3">Global Mobility</h3>
              <p className="font-body text-xs text-[var(--text-muted)] group-hover:text-neutral-400 transition-colors leading-relaxed">
                Positions available across our major logistical hubs in Singapore, Rotterdam, Cochin, and Chennai.
              </p>
            </div>

            {/* Bento 2: Image Box (2 columns, 2 rows) */}
            <div className="md:col-span-2 md:row-span-2 relative overflow-hidden border border-neutral-300">
              <img 
                className="w-full h-full object-cover grayscale-[0.1] hover:scale-105 transition-transform duration-[2s]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_nWRxdwBo9SjtykjLiKc3UitfAmdlDWZmgITo1T5grCxGiIKEzAZ1K8GeNi1HilInHB6m75ZqWDdrcPg0X2P8EWn0gGAMtGj8eZUD-vj1_pUnCzv_nKBKHsg419Axayxaw-lmKJ1NbwXOeGw-I_1OxqPT9KPDYCjpuRamEfjTmdLuP6gPLM890N9rod1eXc5wD-caqsD4yC9ViY84nS_EIQimDKdIINC7h11vrBjURy_DioTTSlJoiN0aHX3IJUB-SGyvPMZQta4"
                alt="SpiceRoute Global corporate office workspace design"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight)]/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-1">
                <span className="font-mono text-[9px] tracking-wider text-neutral-400 block font-bold">OUR ENVIRONMENT</span>
                <h4 className="font-display text-2xl italic font-normal text-cream">Designed for absolute focus.</h4>
              </div>
            </div>

            {/* Bento 3: Equity */}
            <div className="md:col-span-1 md:row-span-1 border border-neutral-300/60 p-10 flex flex-col justify-between hover:border-[var(--gold)] transition-colors duration-300">
              <span className="font-mono text-[10px] tracking-wider text-[var(--gold)] font-bold">03 / BENEFITS</span>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-[var(--text-dark)]">Equity & Scale</h3>
                <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed">
                  Stakeholder capital participation for all long-term trade and operations associates.
                </p>
              </div>
            </div>

            {/* Bento 4: Mastery Fund */}
            <div className="md:col-span-1 md:row-span-1 bg-[var(--midnight)] border border-neutral-800 text-white p-10 flex flex-col justify-between hover:border-[var(--gold)] transition-all duration-300">
              <BrainCircuit className="w-10 h-10 text-[var(--gold)]" />
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-cream">Mastery Fund</h3>
                <p className="font-body text-xs text-neutral-400 leading-relaxed">
                  Annual stipend covering advanced certifications, logistics courses, and trade education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPEN POSITIONS LIST */}
      <section 
        id="positions"
        ref={listRef}
        className="section-padding bg-[var(--cream-dark)] border-t border-neutral-200"
      >
        <div className="container-custom">
          {/* Header & Filter Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl space-y-3">
              <span className="font-mono text-xs tracking-[0.25em] text-[var(--gold)] font-bold uppercase">CAREER ROLES</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-[var(--text-dark)]">Open Positions</h2>
              <p className="font-body text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                We are looking for individuals who balance technical rigor with a deep appreciation for the physical commodities market.
              </p>
            </div>

            {/* Monospaced Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-5 py-2.5 font-mono text-[10px] font-bold tracking-wider uppercase transition-colors duration-200 focus:outline-none ${
                    selectedDept === dept
                      ? 'border-b-2 border-[var(--gold)] text-[var(--gold)]'
                      : 'border-b-2 border-transparent text-neutral-500 hover:border-neutral-300 hover:text-[var(--text-dark)]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Careers List Rows */}
          <div className="border-t border-neutral-300">
            {filteredPositions.map((job) => (
              <div 
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="group border-b border-neutral-300/80 hover:bg-white transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center py-9 px-4 md:px-6 group-hover:px-8 transition-all">
                  
                  {/* Department & SKU Code */}
                  <div className="md:w-1/4 mb-3 md:mb-0">
                    <span className="font-mono text-[9px] tracking-wider text-[var(--gold)] font-bold block mb-1 uppercase">
                      {job.department}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400">{job.code}</span>
                  </div>

                  {/* Title & Location */}
                  <div className="md:w-2/4">
                    <h3 className="font-display text-xl font-semibold text-[var(--text-dark)] group-hover:text-[var(--gold)] transition-colors duration-300">
                      {job.title}
                    </h3>
                    <p className="font-body text-xs text-neutral-500 mt-1">{job.location}</p>
                  </div>

                  {/* Apply Meta & Arrow */}
                  <div className="md:w-1/4 mt-4 md:mt-0 flex md:justify-end items-center gap-4">
                    <span className="font-mono text-[9px] tracking-wider text-neutral-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {job.type}
                    </span>
                    <span className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center bg-white group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                      <ChevronRight size={14} />
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPositions.length === 0 && (
            <div className="text-center py-16 bg-white/40 border border-dashed border-neutral-300 max-w-md mx-auto mt-6">
              <p className="font-display text-lg font-bold text-neutral-700">No Roles Open</p>
              <p className="font-body text-xs text-neutral-500 mt-1">Currently no vacancies in this division. Check our other roles.</p>
            </div>
          )}

          {/* General Application Callout */}
          <div className="mt-16 text-center space-y-4">
            <p className="font-body text-xs text-[var(--text-muted)]">Don't see a role that aligns with your trade specialization?</p>
            <button 
              onClick={() => setSelectedJob({ id: 'open-app', title: 'Open Trade Application', code: 'SR-OPEN', department: 'Global Trade Operations' })}
              className="btn-secondary border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-mono text-[11px]"
            >
              SEND AN OPEN APPLICATION
            </button>
          </div>
        </div>
      </section>

      {/* 4. SLIDING APPLICATION DRAWER MODAL (JS / React driven) */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[99999] flex justify-end">
            
            {/* Backdrop overlay */}
            <motion.div 
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
            />

            {/* Sidebar drawer */}
            <motion.div 
              className="relative w-full md:w-[600px] bg-white h-full shadow-2xl z-10 flex flex-col p-8 md:p-12"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <div className="absolute inset-0 grain-overlay opacity-[0.02] pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setSelectedJob(null)}
                className="self-end mb-8 flex items-center gap-1.5 text-neutral-400 hover:text-[var(--text-dark)] focus:outline-none font-mono text-[10px] tracking-wider uppercase font-bold group"
              >
                <span>CLOSE</span>
                <X size={14} className="group-hover:text-[var(--gold)] transition-colors" />
              </button>

              <div className="flex-1 overflow-y-auto pr-2 scrollbar-none space-y-8">
                
                {/* Job Title & Division Info */}
                <div>
                  <span className="font-mono text-[9px] tracking-wider text-[var(--gold)] font-bold block uppercase mb-1">
                    {selectedJob.code} / {selectedJob.department}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-dark)] mb-4">
                    {selectedJob.title}
                  </h3>
                  
                  {selectedJob.desc && (
                    <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed">
                      {selectedJob.desc}
                    </p>
                  )}
                </div>

                {/* Requirements */}
                {selectedJob.requirements && (
                  <div className="space-y-3">
                    <h4 className="font-mono text-[10px] tracking-wider text-neutral-400 font-bold uppercase">Target Profile & Requirements</h4>
                    <ul className="space-y-2 text-xs text-neutral-600 list-disc pl-4 leading-relaxed font-body">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Application Form */}
                <div className="border-t border-neutral-200 pt-8">
                  <h4 className="font-mono text-[10px] tracking-wider text-[var(--gold)] font-bold uppercase mb-6">SUBMIT DOCKET & RESUME</h4>

                  {formSubmitted ? (
                    <motion.div 
                      className="p-6 bg-green-50 border border-green-200 text-green-800 flex items-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FileCheck className="w-8 h-8 text-green-500 flex-shrink-0" />
                      <div>
                        <h5 className="font-bold text-xs">Application Received Successfully</h5>
                        <p className="text-[10px] text-green-600/80 mt-0.5">
                          Your profile has been logged on the SpiceRoute Trade registry. Our logistics lead 
                          will contact you for standard video screening.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleApplySubmit} className="space-y-6">
                      
                      {/* Name */}
                      <div className="relative">
                        <label className="font-mono text-[9px] tracking-wider text-neutral-400 font-bold uppercase block mb-1">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Richard Hendricks"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-transparent border-0 border-b border-neutral-300 py-2.5 focus:ring-0 focus:border-[var(--gold)] placeholder-neutral-300 text-xs focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <label className="font-mono text-[9px] tracking-wider text-neutral-400 font-bold uppercase block mb-1">Business Email *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="e.g. richard@piedpiper.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-transparent border-0 border-b border-neutral-300 py-2.5 focus:ring-0 focus:border-[var(--gold)] placeholder-neutral-300 text-xs focus:outline-none transition-colors"
                        />
                      </div>

                      {/* LinkedIn */}
                      <div className="relative">
                        <label className="font-mono text-[9px] tracking-wider text-neutral-400 block mb-1 uppercase font-bold">LinkedIn or Portfolio URL</label>
                        <input 
                          type="url" 
                          placeholder="e.g. https://linkedin.com/in/richard"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                          className="w-full bg-transparent border-0 border-b border-neutral-300 py-2.5 focus:ring-0 focus:border-[var(--gold)] placeholder-neutral-300 text-xs focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Cover Notes */}
                      <div className="relative">
                        <label className="font-mono text-[9px] tracking-wider text-neutral-400 block mb-1 uppercase font-bold">Cover Notes / Trade Experience Summary</label>
                        <textarea 
                          rows="3"
                          placeholder="Tell us about your soft commodities trading or supply chain architectural experience..."
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          className="w-full bg-transparent border-0 border-b border-neutral-300 py-2.5 focus:ring-0 focus:border-[var(--gold)] placeholder-neutral-300 text-xs focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* File Upload mock */}
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] tracking-wider text-neutral-400 block uppercase font-bold">Curriculum Vitae / Resume *</label>
                        <div className="border border-dashed border-neutral-300 p-6 text-center hover:border-[var(--gold)] transition-colors cursor-pointer group flex flex-col items-center justify-center">
                          <UploadCloud className="w-8 h-8 text-neutral-300 group-hover:text-[var(--gold)] transition-colors mb-2" />
                          <p className="text-[11px] text-neutral-500 font-body">Drag and drop your file or <span className="text-[var(--gold)] font-bold underline">browse files</span></p>
                          <span className="text-[9px] text-neutral-400 mt-1 uppercase font-mono">PDF, DOCX formats (Max 5MB)</span>
                        </div>
                      </div>

                      {/* Submit */}
                      <button 
                        type="submit"
                        className="w-full py-4 bg-[var(--gold)] text-white hover:bg-[var(--midnight)] font-mono text-[11px] font-bold tracking-wider uppercase transition-colors duration-300"
                      >
                        SUBMIT APPLICATION
                      </button>

                    </form>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
