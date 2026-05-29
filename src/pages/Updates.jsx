import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Calendar, 
  Download, 
  BarChart, 
  Activity, 
  Compass, 
  FileCheck 
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   UPDATES & INTELLIGENCE DATA
   ═══════════════════════════════════════════════ */

const REPORTS = [
  {
    id: 'report-1',
    category: 'Strategic Expansion',
    date: 'MAY 2026',
    title: 'Expanding into the European Luxury Market',
    excerpt: 'Establishing new distribution representative hubs in Milan and Paris to bring our artisanal textiles and premium spices directly to the heart of European design capitals.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACWGmuXEI33SdtyALNAQbWEcWxgR4SYDjOFFT-WIbVGmtdBlwL2JCGgcnccwnLfFxnzdw-vqfaSqQhTwlnB0rMDfUAPNVBsltYzAfjxZE5n-Vgu9N1ty3DqKPhNfYp-ikHDbCfIkBGmtCiDo1FUbICMiT2dDpXL1Q3Sr5NRIZuFcuCHcj9z3kxiDJQAFD90Gt64DWtne39J0yfqKMEV2hLeK-L6eHcnKxIKZVll08yhcWCfqw7VE-pjbTIyhbkcyaciQEX5Y_UNH0'
  },
  {
    id: 'report-2',
    category: 'Sustainability',
    date: 'APRIL 2026',
    title: 'New Sustainable Sourcing Initiative for Textiles & Carpets',
    excerpt: 'Collaborating directly with organic merino wool family clusters in Rajasthan to introduce certified eco-friendly, carbon-offset balings for global trade relief desks.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrIXmobi_B7kbYPeViidzUhUGVP1nZMRfLAvMkg3_ca4iZwTQu4mGCzCaP_ZHSSq104Tk67uIfZaP22VfelB6H1MG-BYzdAv2cIdirerqyDlMWyHuSZhLVYDjHXU1Bv7sl2WXu1TIThFmlTgEhLmaX4_HusjEWqp1QPHIH_9Fl3jHqGtL9M2o22LYgBkRMRZ5sbJOUQrFes9qf8EgoLGoAFoDG9ep_xC3x4EuLUimAzu2vykT00xRnCDKtCqxiar1aobwYKrp-Nl8'
  },
  {
    id: 'report-3',
    category: 'Corporate Growth',
    date: 'MARCH 2026',
    title: 'Q3 Export Growth Report: Saffron & Blanket Pipelines',
    excerpt: 'An authoritative review of our record-breaking performance in Asian and Middle Eastern sectors this quarter. Supply chains maintained 100% SLA adherence.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAklTeZcWDqRyLI3rfi7QO0CzzHsX1ge0fxbQI2dFO7dKp05AYoXo_NkebP4rDV0cHSKXFQmW6jARvqfxXYuRLYs7ohKJpz9Y_gp4HKtb5gp3CxmS0iK9OxI4IYjPrbA5VIMm3WCBWB9G756Mtg3jHEWy5orvN8sw_3DOcHKjGfTPR8qPOTm2Sml6EFEuPKVEoYEQ9EkF0LLPb01VkBThPvdrlYs9FRbJvuXS-8e_Jdq0o9EWCb8Oa8gns2u7pCCqcNGFX_DFdfYnI',
    downloadable: true,
    fileSize: '4.2 MB'
  },
  {
    id: 'report-4',
    category: 'Logistics Desk',
    date: 'JANUARY 2026',
    title: 'Visualizing Our Global Logistics Shipping Corridors',
    excerpt: 'How RICHY EXPORTS delivers traditional agricultural grains and luxury custom textiles to 45+ partner countries through seamless sea clearances and digital dockets.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU20AGb8m6oZ-3Osrq_xzEWmmGtHi27FcgjbEqZsVu1yYef1Q5tPiVeb45HB4uwW7igvjqqTc---afWRM9jUbRJnbtmjB0y2wr2zD_uRPQ-LTP7wBiwQPAWUVRSmTFp64s-zJY73yOFI5G5KB846rCXRQMX588tNxuMLwgPp2gjv2Kgo2iOL9L3KOEKs1UwEcg1tY8OmbiatqDpYXc9t4BrpX_IjUixCOEdNtSFBRAseiWjPjgm255aJ1gigIsSRBstiYyrH_IxUM'
  }
];

const CATEGORIES = ['All', 'Strategic Expansion', 'Sustainability', 'Corporate Growth', 'Logistics Desk'];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Updates() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribeSubmitted, setSubscribeSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [feedRef, feedInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [transparencyRef, transparencyInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const filteredReports = useMemo(() => {
    return REPORTS.filter(rep => {
      const matchesCategory = selectedCategory === 'All' || rep.category === selectedCategory;
      const matchesSearch = rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rep.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    setSubscribeSubmitted(true);
    setTimeout(() => {
      setSubscribeSubmitted(false);
      setEmail('');
    }, 3500);
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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--gold)]/10 text-[var(--gold)] font-mono text-xs uppercase tracking-[0.2em] mb-4">
              <span className="w-2 h-2 bg-[var(--gold)] rounded-full animate-pulse" />
              Corporate Intelligence
            </div>
            <h1 className="font-display font-semibold text-[var(--text-dark)] leading-tight text-4xl md:text-6xl tracking-tight">
              Defining the Future of <span className="italic text-[var(--gold)]">Global Trade</span>.
            </h1>
          </div>
          <div className="md:col-span-4 pb-1">
            <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed font-light">
              Transparent reporting, logistics updates, and strategic announcements. RICHY EXPORTS continues to bridge historical craftsmanship with modern supply chain excellence.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PINNED MAIN ANNOUNCEMENT GRID */}
      <section 
        ref={feedRef}
        className="px-6 max-w-7xl mx-auto mb-24 relative z-10"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-neutral-200 pb-6 mb-12">
          {/* Categories Tab */}
          <div className="flex gap-6 overflow-x-auto scrollbar-none py-1.5 w-full lg:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs font-bold tracking-wider uppercase whitespace-nowrap pb-2 border-b-2 transition-all duration-200 outline-none ${
                  selectedCategory === cat
                    ? 'text-[var(--gold)] border-[var(--gold)]'
                    : 'text-neutral-500 border-transparent hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80 flex items-center bg-white border border-neutral-300 px-4 py-2.5">
            <Search className="w-4 h-4 text-neutral-400 mr-3 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs focus:ring-0 w-full placeholder:text-neutral-400 outline-none"
            />
          </div>
        </div>

        {/* Reports Grid */}
        <AnimatePresence mode="popLayout">
          {filteredReports.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-12 gap-8 gap-y-16"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredReports.map((rep, i) => {
                const isFeatured = i === 0 && searchQuery === '' && selectedCategory === 'All';
                return (
                  <motion.article
                    key={rep.id}
                    variants={fadeUp}
                    custom={i}
                    className={`group ${
                      isFeatured ? 'md:col-span-12 grid md:grid-cols-2 gap-8 items-center border-b border-neutral-200 pb-12' : 'md:col-span-4 flex flex-col justify-between h-full border-b border-neutral-200 pb-8'
                    }`}
                  >
                    {/* Visual */}
                    <div className={`overflow-hidden border border-neutral-300 relative bg-white ${
                      isFeatured ? 'aspect-[16/9]' : 'aspect-square mb-6'
                    }`}>
                      <img 
                        src={rep.image} 
                        alt={rep.title} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1s] group-hover:scale-103"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[var(--gold)] text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                          {rep.category}
                        </span>
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className={isFeatured ? 'space-y-4' : 'flex-grow flex flex-col justify-between space-y-4'}>
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] text-[var(--saffron)] tracking-[0.25em] font-bold block">
                          {rep.date}
                        </span>
                        <h3 className={`font-display font-semibold text-neutral-850 group-hover:text-[var(--gold)] transition-colors ${
                          isFeatured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl leading-snug'
                        }`}>
                          {rep.title}
                        </h3>
                        <p className="font-body text-xs text-[var(--text-body)] leading-relaxed font-light line-clamp-3">
                          {rep.excerpt}
                        </p>
                      </div>
                      
                      {rep.downloadable && (
                        <div className="pt-4">
                          <button className="inline-flex items-center gap-2 font-mono text-[10px] text-[var(--gold)] border-b border-[var(--gold)] pb-0.5 hover:border-b-2 font-bold uppercase transition-all">
                            <Download size={12} /> DOWNLOAD REPORT PDF ({rep.fileSize})
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-24 border border-dashed border-neutral-300">
              <Info className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="font-display text-xl font-bold">No Intelligence Logged</h3>
              <p className="text-xs text-neutral-500 mt-2 font-light">Refine your search term or select another category tab.</p>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 3. TRANSPARENCY SECTION */}
      <section 
        ref={transparencyRef}
        className="px-6 max-w-7xl mx-auto py-24 relative z-10 border-t border-neutral-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-neutral-850 italic">
              Unwavering Transparency for <span className="not-italic text-[var(--gold)]">Global Partners</span>.
            </h2>
            <p className="font-body text-base text-[var(--text-body)] font-light leading-relaxed">
              Our commitment to B2B enterprise procurement extends far beyond raw commodity purity. We provide direct chemical traceability analysis, certificate files, and sustainable crop compensation transparency.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <div className="font-display text-4xl text-[var(--gold)] font-bold mb-1">100%</div>
                <div className="font-mono text-[9px] tracking-wider uppercase text-neutral-500 font-bold">Sourcing Traceability</div>
              </div>
              <div>
                <div className="font-display text-4xl text-[var(--gold)] font-bold mb-1">SGS</div>
                <div className="font-mono text-[9px] tracking-wider uppercase text-neutral-500 font-bold">Certified Compliance</div>
              </div>
            </div>
          </div>

          <div className="relative pl-0 md:pl-12">
            <div className="p-10 bg-white border border-[var(--border-gold)] rotate-1 shadow-2xl relative">
              <FileCheck className="text-[var(--gold)] mb-4 w-10 h-10" />
              <blockquote className="font-display text-xl italic text-neutral-850 leading-relaxed mb-6">
                "The logistical documentation and predictive cargo tracking supplied by RICHY EXPORTS is exceptional. Their B2B trade desk resolves clearance pre-processing on the high seas."
              </blockquote>
              <div className="flex items-center gap-4 border-t border-neutral-100 pt-4 text-xs">
                <div className="w-10 h-10 bg-neutral-100 border border-neutral-300 rounded-none flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-[var(--gold)]">PL</span>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase font-bold text-neutral-850">Directeur de Sourcing</h4>
                  <p className="text-[var(--text-muted)] text-[10px]">Parisian Luxury Cosmetics Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEWSLETTER BAND */}
      <section className="py-24 bg-[var(--midnight)] text-cream text-center relative z-10 border-t border-neutral-800">
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
        
        <div className="container-custom max-w-xl space-y-6 relative z-10">
          <Activity className="text-[var(--gold-light)] w-8 h-8 mx-auto mb-2" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-white">
            Quarterly Market Intelligence
          </h2>
          <p className="font-body text-xs text-neutral-400 leading-relaxed font-light">
            Join 12,000+ institutional B2B buyers and supply executives receiving our proprietary market logs and maritime SLA schedules.
          </p>

          {subscribeSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-neutral-800 border border-[var(--gold-light)]/20 text-[var(--gold-light)] text-xs font-mono"
            >
              <CheckCircle2 size={24} className="text-green-500 mx-auto mb-2" />
              <span>Subscription Registered. Dossiers will deploy directly to your terminal.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribeSubmit} className="space-y-4 pt-4 text-xs font-mono">
              <div className="flex border-b border-neutral-700 pb-2">
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none text-white focus:ring-0 placeholder:text-neutral-700 outline-none w-full text-xs"
                />
                <button type="submit" className="text-[var(--gold-light)] hover:text-white transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
