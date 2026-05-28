import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Newspaper,
  Terminal,
  Anchor,
  TrendingUp,
  Globe,
  Hourglass
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   UPDATES & INTELLIGENCE DATA
   ═══════════════════════════════════════════════ */

const NEWS_ITEMS = [
  {
    id: 'news-1',
    category: 'Market Insights',
    date: 'OCT 14, 2026',
    title: "Vanilla Supply Resilience: Evaluating Madagascar's 2026 Harvest.",
    excerpt: "Current yield reports indicate a 12% increase in A-grade organic vanilla bean production, stabilizing global luxury confectionery chains and pricing volatility.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAczXK5RNkk8tZMa1UAgQnvbSt2wp3nDDX_D6CIu1ZV81aYt7rs2tQ7_i7FrrUogy6BFLoheH6w1texzHA9UL7_dWa1bts9of3IRRM_D2I9RMO9oQ1NEIIflj4n4am0fOutrntbp0U0eBjNRd-OeSb0sWc6oB6FQbsnzcgAYYq0k0WF3lE_ijvuQpkpl30npHHZkyYP7HPfaCm3csliRM3-IAB5w0gW4w_kjEG9SMTkZy_3hG7MLU-IsQNQlwgLUg8Q1q_pqnnBVWI",
    btnLabel: "Read Analysis"
  },
  {
    id: 'news-2',
    category: 'Sustainability Milestones',
    date: 'OCT 11, 2026',
    title: "SpiceRoute Zero: Achieving 100% Carbon Neutrality in Sea Freight.",
    excerpt: "Our primary spice routes between Cochin and Hamburg are now fully offset through our proprietary mangrove reforestation and restoration project in Kerala coastal zones.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfyMo4CgJAOOtjMLX24QriULgAMlIkSuEUQ2thnGiP1JT18gXXQzC173vwzubqOAa2TTgcFEuSzezN0_10tj1lA4jY_u5S1tXKFetXIz2UYu4Sdlu-4t-EQMUlhfdaGEGf67d69tc_qjDifvTJE2T4apVmaQcjKndkaX8NZC7DtFw6m-bJZ-eI22J1T_2PzfDW6s4k5Zyq1rzy9GtnDy7X5OtmYguHTBZk1X8pO3Dg_s7A53dlOs_UwmWkrqocMUCAR3mJPZilRfw",
    btnLabel: "View Roadmap"
  },
  {
    id: 'news-3',
    category: 'Company Announcements',
    date: 'OCT 08, 2026',
    title: "Expansion: New Regional Logistics Hub in Singapore Now Operational.",
    excerpt: "The 50,000 sq. ft. high-precision temperature-controlled facility will halve lead times and guarantee volatile oil preservation for Asia-Pacific institutional partners.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBjA3T8i5n8ZG364PUsO4bgpz1sSarPZufKssbRXP_MSR4Mj49XaFafasov4VPkdZjI3Ks0vUbCEN5tlsA1-pnzJO1URi30DnMPmPrLCqOABnsvThlf3rkChtOnos_u9vSAOTPDVI28eGw10QarqWLRemEM8OJOazD-xctHLGl9pAdxpvTFMqwHeSfvhp2Dkf_uzxIdKoiZGD0JsHubF83K-Wv75_-Do73US0wbOUWgCjHURywW370yRCQFGoX4XDNLS-RrrsWBYM",
    btnLabel: "Explore Hub"
  },
  {
    id: 'news-4',
    category: 'Market Insights',
    date: 'SEP 30, 2026',
    title: "Cassia vs. Ceylon: Predictive Demand Shifts in the North American Market.",
    excerpt: "A technical deep dive into the regulatory changes and organic consumer health trends driving a 20% shift toward premium Ceylon cinnamon varieties across retail networks.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSKYsOLBwQrVBwXAr3O-XJ05lY9ZoW9bxy8E9ShmhOA6mgteWDNabEx8_CidJhS4xDC-wr-7XDT1ICpMOvgHlZrjfxYHbCuaZ4vuYiIKatabmmM2lPiov68UDDqd8LNBWg3KCPxL5uWDWmrjUQ63zBwQAGrB97g_t2G69OAlq9aSwXqTK_FAohG9hYhQpPGN5378dJwJKujxhXVMaqeCYqHw26bC70rQDxqKhMWpFH-_dYkBr2w2SYHMIST0lFkWUCyyIw-hloJY8",
    btnLabel: "Full Analysis",
    span: "md:col-span-2 flex flex-col md:flex-row gap-8 pb-10"
  },
  {
    id: 'news-5',
    category: 'Logistics Reports',
    date: 'SEP 24, 2026',
    title: '"Efficiency is the silent ingredient in every spice we deliver."',
    excerpt: "Streamlined customs clearance procedures implemented at Port of Rotterdam. Digital dockets are now pre-processed during high-sea transit.",
    isQuote: true,
    author: "Logistics Desk",
    btnLabel: "Port Stats"
  }
];

const FILTERS = [
  'All Intelligence',
  'Market Insights',
  'Sustainability Milestones',
  'Company Announcements',
  'Logistics Reports'
];

/* ═══════════════════════════════════════════════
   ANIMATION CONFIGS
   ═══════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
};

/* ═══════════════════════════════════════════════
   UPDATES PAGE
   ═══════════════════════════════════════════════ */

export default function Updates() {
  const [selectedFilter, setSelectedFilter] = useState('All Intelligence');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [reportRef, reportInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Filtering news
  const filteredNews = useMemo(() => {
    if (selectedFilter === 'All Intelligence') return NEWS_ITEMS;
    return NEWS_ITEMS.filter(item => item.category.toLowerCase() === selectedFilter.toLowerCase());
  }, [selectedFilter]);

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail('');
    }, 3500);
  };

  return (
    <div className="relative min-h-screen bg-[#fbf9f4] overflow-hidden pt-[140px]">
      <div className="absolute inset-0 grain-overlay pointer-events-none z-0" />

      {/* 1. HERO TITLE SECTION */}
      <section 
        ref={headerRef}
        className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16 md:mb-20 relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--gold)] font-bold block uppercase">
              INTELLIGENCE & LOG
            </span>
            <h1 className="font-display font-semibold text-[var(--text-dark)] leading-tight text-4xl md:text-6xl tracking-tight">
              Global Updates & Announcements
            </h1>
          </div>
          <div className="max-w-md pb-1">
            <p className="font-body text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-light">
              Real-time market volatility analysis, milestone achievements, and the evolution of the modern spice route.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FEATURED EDITORIAL CARD */}
      <section 
        ref={reportRef}
        className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-24 relative z-10"
      >
        <motion.div 
          className="relative group overflow-hidden bg-[var(--midnight)] text-white flex flex-col md:flex-row h-auto md:h-[550px] border border-neutral-800"
          initial={{ opacity: 0, y: 30 }}
          animate={reportInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Inner content */}
          <div className="flex-1 p-10 md:p-14 flex flex-col justify-between z-10 relative">
            <div className="space-y-6">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[var(--gold-light)] border border-[var(--gold-light)]/30 px-3.5 py-1.5 inline-block uppercase font-bold">
                Quarterly Highlight
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-medium text-cream leading-tight max-w-lg">
                2026 Global Trade Report: Navigating the New Corridors of the Indo-Pacific.
              </h2>
              <p className="font-body text-xs md:text-sm text-neutral-400 leading-relaxed max-w-md font-light">
                An in-depth analysis of maritime logistics shifts and the rising demand for high-grade organic cardamom and turmeric in European markets.
              </p>
            </div>
            
            <div className="pt-8">
              <a 
                href="/products" 
                className="inline-flex items-center gap-3 group/btn font-mono text-[10px] tracking-wider uppercase text-[var(--gold-light)] hover:text-white transition-colors border-b border-[var(--gold-light)] pb-1 w-fit"
              >
                <span>Download Full Report</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative overflow-hidden h-[300px] md:h-auto border-t md:border-t-0 md:border-l border-neutral-800">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB76r3w6jP3xt2HqT-dRDUYkCF2i3RpT-5C9vKtD29qWwDFJxO6t-4TsjlTVHNSvd4n025Ct6annY2Wj0nksKdFSuoSFOY4vTqm84OAo0DiqbtLnxPqzuYR4Cw7RVhbBJB9sZa-urPGKpucKSWYu0Fr5A6WOVLQVpYEQC0qMyPJpe3u2SGGAcVBx-zqFpf5lep7PHPzeC2IrTh-iMhvNUm-HqaAfWvtI-npAPv-pNHueQaOBymAfwSN9L9F9PbB_RCYt20iTv8BpIE" 
              alt="Saffron and peppercorns on bone-white stone surface" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </motion.div>
      </section>

      {/* 3. CATEGORY FILTERS */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-10 relative z-10">
        <div className="flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-200 pb-5 overflow-x-auto scrollbar-none">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`font-mono text-[10px] font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 pb-1.5 focus:outline-none ${
                selectedFilter === filter
                  ? 'text-[var(--gold)] border-b-2 border-[var(--gold)]'
                  : 'text-neutral-500 hover:text-[var(--text-dark)] border-b-2 border-transparent'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* 4. NEWS ARTICLES GRID */}
      <section 
        ref={gridRef}
        className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-24 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8" id="news-grid">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item, i) => {
              if (item.span) {
                return (
                  <motion.article 
                    layout
                    key={item.id}
                    variants={fadeUp}
                    initial="hidden"
                    animate={gridInView ? 'visible' : 'hidden'}
                    custom={i}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`${item.span} border-b border-neutral-200 pb-8 group`}
                  >
                    {/* Left image of bento */}
                    <div className="flex-1 overflow-hidden aspect-video bg-[var(--cream-dark)] border border-neutral-300">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {/* Right text of bento */}
                    <div className="flex-1 flex flex-col justify-center space-y-4 mt-6 md:mt-0">
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-wider text-[var(--gold)]">
                        <span>TECHNICAL ANALYSIS</span>
                        <span className="text-neutral-400 font-normal">{item.date}</span>
                      </div>
                      <h3 className="font-display text-2xl font-semibold leading-tight text-[var(--text-dark)] group-hover:text-[var(--gold)] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed">
                        {item.excerpt}
                      </p>
                      <div className="pt-2">
                        <a 
                          href="/products" 
                          className="font-mono text-[10px] tracking-wider uppercase text-[var(--gold)] hover:text-[var(--text-dark)] transition-colors border-b border-[var(--gold)] pb-0.5 inline-flex items-center gap-1.5 group/link"
                        >
                          <span>{item.btnLabel}</span>
                          <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              }

              if (item.isQuote) {
                return (
                  <motion.article 
                    layout
                    key={item.id}
                    variants={fadeUp}
                    initial="hidden"
                    animate={gridInView ? 'visible' : 'hidden'}
                    custom={i}
                    exit={{ opacity: 0 }}
                    className="group flex flex-col h-full border-b border-neutral-200 pb-8"
                  >
                    <div className="flex-grow flex flex-col justify-center bg-[var(--cream-dark)] p-8 border border-neutral-300/50">
                      <span className="font-mono text-[8px] font-bold tracking-widest text-[var(--gold)] uppercase block mb-4">LOGISTICS DIVISION</span>
                      <h3 className="font-display text-lg italic text-[var(--text-dark)] leading-relaxed mb-4 group-hover:text-[var(--gold)] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed mb-3">
                        {item.excerpt}
                      </p>
                      <span className="font-mono text-[9px] text-neutral-400 block">— {item.author}</span>
                    </div>
                    <div className="mt-6">
                      <a 
                        href="/contact" 
                        className="font-mono text-[10px] tracking-wider uppercase text-[var(--text-dark)] hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1.5 group/link"
                      >
                        <span>{item.btnLabel}</span>
                        <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.article>
                );
              }

              return (
                <motion.article 
                  layout
                  key={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate={gridInView ? 'visible' : 'hidden'}
                  custom={i}
                  exit={{ opacity: 0 }}
                  className="group flex flex-col h-full border-b border-neutral-200 pb-8"
                >
                  <div className="overflow-hidden aspect-[4/3] mb-6 bg-[var(--cream-dark)] border border-neutral-200">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-grow space-y-3">
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider text-[var(--gold)]">
                      <span>{item.category}</span>
                      <span className="text-neutral-400 font-normal">{item.date}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold leading-snug text-[var(--text-dark)] group-hover:text-[var(--gold)] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="mt-6">
                    <a 
                      href="/products" 
                      className="font-mono text-[10px] tracking-wider uppercase text-[var(--text-dark)] hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1.5 group/link"
                    >
                      <span>{item.btnLabel}</span>
                      <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. NEWSLETTER SUBSCRIPTION (The Trade Registry) */}
      <section className="bg-[var(--midnight)] py-24 overflow-hidden relative z-10 border-t border-neutral-800">
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
        
        {/* Background text decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden flex items-end justify-center select-none z-0">
          <div className="font-display font-semibold text-[18vw] text-white uppercase leading-none translate-y-12">SPICEROUTE</div>
        </div>

        <div className="container-custom relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 space-y-6">
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--gold-light)] uppercase font-bold block">
              THE TRADE REGISTRY
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-cream leading-tight">
              Weekly Market Intelligence. <br />Delivered to your terminal.
            </h2>
            <p className="font-body text-xs md:text-sm text-neutral-400 max-w-md leading-relaxed font-light">
              Join 12,000+ B2B institutional spice buyers and supply chain executives receiving our proprietary market analysis and logistics intelligence.
            </p>
          </div>

          <div className="flex-1 w-full max-w-lg">
            {newsletterSubmitted ? (
              <motion.div 
                className="p-6 bg-neutral-800 border border-[var(--gold-light)]/30 text-[var(--gold-light)] flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 className="w-8 h-8 flex-shrink-0 text-green-400 animate-pulse" />
                <div>
                  <h4 className="font-mono text-xs font-bold text-white uppercase">Subscription Registered</h4>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Terminal connected. Weekly market intelligence updates will deploy to your email folder.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribeSubmit} className="space-y-12">
                <div className="relative">
                  <label className="font-mono text-[9px] tracking-wider text-neutral-500 uppercase block mb-1 font-bold">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="trade@organization.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-neutral-700 text-white py-3.5 focus:border-[var(--gold-light)] focus:ring-0 placeholder:text-neutral-700 outline-none transition-colors text-xs"
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      required
                      className="w-4 h-4 bg-transparent border-neutral-700 text-[var(--gold)] focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="font-body text-xs text-neutral-400 group-hover:text-white transition-colors">
                      I agree to receive weekly market volatility logs and maritime logistics reports.
                    </span>
                  </label>
                  <button 
                    type="submit"
                    className="w-full py-4.5 bg-[var(--gold-light)] hover:bg-[var(--gold)] text-[var(--midnight)] font-mono text-[11px] font-bold tracking-wider uppercase transition-all duration-300"
                  >
                    SUBSCRIBE TO INTELLIGENCE
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 6. DATA STATS FOOTER ACCENT (Monospaced live statistics indicators) */}
      <section 
        ref={statsRef}
        className="border-y border-neutral-200 py-10 bg-[#f5f3ee] relative z-10"
      >
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Live Shipments', value: '1,402' },
            { label: 'Market Stability', value: '+2.4%' },
            { label: 'Ports Operational', value: '48' },
            { label: 'Active Trade Desk', value: '24/7' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center md:text-left space-y-1"
              initial="hidden"
              animate={statsInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i}
            >
              <span className="font-mono text-[9px] tracking-wider uppercase text-neutral-500 font-bold block">{stat.label}</span>
              <span className="font-mono text-2xl md:text-3xl text-[var(--gold)] font-bold block">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
