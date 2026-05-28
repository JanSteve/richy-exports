import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Newspaper,
  Pin,
  ArrowRight,
  Calendar,
  Send,
  CheckCircle,
  Filter,
  Globe,
  Award,
  Handshake,
  Megaphone,
} from 'lucide-react';

/* ─── Data ──────────────────────────────────────── */

const CATEGORIES = ['All', 'Trade Shows', 'Press', 'Certifications', 'Partnerships'];

const CATEGORY_ICONS = {
  'Trade Shows': Globe,
  Press: Megaphone,
  Certifications: Award,
  Partnerships: Handshake,
};

const CATEGORY_COLORS = {
  'Trade Shows': { bg: 'rgba(200,80,26,.12)', text: 'var(--saffron)' },
  Press: { bg: 'rgba(212,168,83,.12)', text: 'var(--gold)' },
  Certifications: { bg: 'rgba(27,94,58,.15)', text: 'var(--cardamom)' },
  Partnerships: { bg: 'rgba(139,26,26,.12)', text: 'var(--cinnamon)' },
};

const FEATURED = {
  category: 'Partnerships',
  date: 'May 2026',
  title: 'Richy Exports Expands to 5 New Markets in Africa',
  excerpt:
    'In a landmark move, Richy Exports has established direct trading partnerships in Nigeria, Kenya, Ghana, Tanzania, and Ethiopia — bringing India\'s finest whole and ground spices to rapidly growing African markets. This expansion increases our global presence to 50+ countries and reinforces our commitment to becoming the world\'s most trusted spice trading house.',
  isPinned: true,
};

const NEWS_ITEMS = [
  {
    id: 'news-1',
    category: 'Trade Shows',
    date: 'Mar 2026',
    title: 'Participation in Gulfood 2026, Dubai',
    excerpt:
      'Richy Exports showcased its premium spice portfolio at Gulfood 2026, the world\'s largest food trade show in Dubai. Our booth featured live spice blending demonstrations and attracted over 200 qualified B2B leads from across the GCC region.',
  },
  {
    id: 'news-2',
    category: 'Certifications',
    date: 'Feb 2026',
    title: 'New FSSAI Compliance Standards Achieved',
    excerpt:
      'Our processing facility in Chennai has achieved full compliance with the latest FSSAI 2026 standards, including enhanced traceability requirements and updated heavy-metal testing protocols for all export-grade products.',
  },
  {
    id: 'news-3',
    category: 'Partnerships',
    date: 'Jan 2026',
    title: 'Partnership with European Spice Distributors Network',
    excerpt:
      'Richy Exports has joined the European Spice Distributors Network (ESDN), gaining preferred supplier status across 12 EU member nations. This partnership streamlines customs, reduces transit times, and unlocks exclusive retail opportunities.',
  },
  {
    id: 'news-4',
    category: 'Press',
    date: 'Dec 2025',
    title: 'Richy Exports Featured in Business Today',
    excerpt:
      'Business Today profiled Richy Exports in their "Champions of Indian Commerce" series, highlighting our 20-year journey from a Chennai-based trader to a globally recognized spice export powerhouse shipping 5,000+ tonnes annually.',
  },
  {
    id: 'news-5',
    category: 'Certifications',
    date: 'Nov 2025',
    title: 'ISO 22000 Food Safety Certification',
    excerpt:
      'Our facility has been awarded the prestigious ISO 22000:2018 certification for Food Safety Management Systems, joining an elite group of Indian spice exporters who meet the most stringent international food safety benchmarks.',
  },
  {
    id: 'news-6',
    category: 'Trade Shows',
    date: 'Oct 2025',
    title: 'India International Trade Fair 2025 Showcase',
    excerpt:
      'At IITF 2025, Richy Exports presented our sustainability initiatives including solar-powered processing and biodegradable packaging. The showcase earned the "Best Export Display" award from the India Trade Promotion Organisation.',
  },
  {
    id: 'news-7',
    category: 'Partnerships',
    date: 'Sep 2025',
    title: 'Strategic Alliance with South American Importers',
    excerpt:
      'We\'ve established strategic alliances with three leading spice importers in Brazil, Argentina, and Colombia. This partnership enables direct container shipments via dedicated sea routes, reducing delivery times by 40%.',
  },
  {
    id: 'news-8',
    category: 'Press',
    date: 'Aug 2025',
    title: 'Annual Export Volume Crosses 5000 Tonnes',
    excerpt:
      'Richy Exports has crossed a historic milestone — 5,000 tonnes of spices exported in a single fiscal year. This achievement reflects growing global demand for premium Indian spices and our capacity to scale without compromising quality.',
  },
];

/* ─── Animation Variants ────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

/* ─── News Card Component ───────────────────────── */

function NewsCard({ item }) {
  const colors = CATEGORY_COLORS[item.category] || { bg: 'rgba(212,168,83,.12)', text: 'var(--gold)' };
  const CategoryIcon = CATEGORY_ICONS[item.category] || Newspaper;

  return (
    <motion.article
      className="group glass-card flex flex-col h-full overflow-hidden"
      variants={cardVariants}
      layout
      whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
    >
      {/* Top accent line */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${colors.text}, transparent)`,
          opacity: 0.5,
        }}
      />

      <div className="flex flex-col flex-1 p-6 md:p-7">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] tracking-[.12em] uppercase"
            style={{ background: colors.bg, color: colors.text }}
          >
            <CategoryIcon size={12} />
            {item.category}
          </span>
          <span
            className="flex items-center gap-1.5 text-xs"
            style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace" }}
          >
            <Calendar size={12} />
            {item.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display text-lg md:text-xl font-bold leading-snug mb-3 transition-colors duration-300 group-hover:text-[var(--saffron)]"
          style={{ color: 'var(--text-dark)' }}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        <p
          className="text-sm leading-relaxed flex-1 mb-5"
          style={{ color: 'var(--text-mid)', fontFamily: "'Inter', sans-serif" }}
        >
          {item.excerpt}
        </p>

        {/* Read More */}
        <div className="mt-auto">
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer transition-all duration-300 group-hover:gap-3"
            style={{ color: 'var(--saffron)', fontFamily: "'Inter', sans-serif" }}
          >
            Read More
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main Updates Component ────────────────────── */

export default function Updates() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredNews = useMemo(() => {
    if (activeFilter === 'All') return NEWS_ITEMS;
    return NEWS_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const featuredColors = CATEGORY_COLORS[FEATURED.category];
  const FeaturedIcon = CATEGORY_ICONS[FEATURED.category] || Newspaper;

  return (
    <main className="overflow-x-hidden" style={{ background: 'var(--cream)' }}>
      {/* ── Hero ──────────────────────────────────── */}
      <section
        className="relative min-h-[55vh] flex items-center justify-center overflow-hidden grain-overlay"
        style={{
          background: 'linear-gradient(160deg, var(--midnight) 0%, var(--charcoal) 55%, var(--ash) 100%)',
        }}
      >
        {/* Decorative grid dots */}
        <div
          className="absolute inset-0 opacity-[.03]"
          style={{
            backgroundImage: 'radial-gradient(var(--gold) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[.06]"
          style={{ background: 'radial-gradient(circle at top right, var(--gold), transparent 60%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(212,168,83,.1)',
              border: '1px solid rgba(212,168,83,.18)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Newspaper size={14} style={{ color: 'var(--gold)' }} />
            <span className="font-mono text-[11px] tracking-[.2em] uppercase" style={{ color: 'var(--gold)' }}>
              Latest Updates
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl xl:text-[88px] font-bold leading-[1.05] mb-6"
            style={{ color: 'var(--cream)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            News &{' '}
            <span className="gold-shimmer">Updates</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,.6)', fontFamily: "'Inter', sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            Stay updated with the latest from Richy Exports — trade shows,
            certifications, partnerships, and milestones.
          </motion.p>
        </div>
      </section>

      {/* ── Featured Banner ──────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--cream)', paddingBottom: '60px' }}>
        <div className="container-custom">
          <motion.article
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--midnight) 0%, var(--charcoal) 70%, rgba(200,80,26,.2) 100%)',
              border: '1px solid rgba(212,168,83,.2)',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Glow effect */}
            <div
              className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[.08]"
              style={{ background: 'radial-gradient(circle, var(--gold), transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex-1">
                  {/* Pinned badge */}
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] tracking-[.15em] uppercase"
                      style={{
                        background: 'rgba(212,168,83,.15)',
                        color: 'var(--gold)',
                        border: '1px solid rgba(212,168,83,.25)',
                      }}
                    >
                      <Pin size={12} />
                      Pinned
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] tracking-[.12em] uppercase"
                      style={{ background: featuredColors.bg, color: featuredColors.text }}
                    >
                      <FeaturedIcon size={12} />
                      {FEATURED.category}
                    </span>
                  </div>

                  <span
                    className="flex items-center gap-1.5 text-sm mb-3"
                    style={{ color: 'rgba(255,255,255,.45)', fontFamily: "'DM Mono', monospace" }}
                  >
                    <Calendar size={14} />
                    {FEATURED.date}
                  </span>

                  <h2
                    className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-5"
                    style={{ color: 'var(--cream)' }}
                  >
                    {FEATURED.title}
                  </h2>

                  <p
                    className="text-base leading-relaxed max-w-2xl"
                    style={{ color: 'rgba(255,255,255,.6)', fontFamily: "'Inter', sans-serif" }}
                  >
                    {FEATURED.excerpt}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Read Full Story
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ── Filter Tabs + News Grid ──────────────── */}
      <section style={{ background: 'var(--cream-dark)', paddingTop: '80px', paddingBottom: '120px' }}>
        <div className="container-custom">
          {/* Filter Tabs */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mr-2" style={{ color: 'var(--text-muted)' }}>
              <Filter size={16} />
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background:
                    activeFilter === cat
                      ? 'var(--gold)'
                      : 'rgba(255,255,255,.7)',
                  color:
                    activeFilter === cat
                      ? 'var(--midnight)'
                      : 'var(--text-mid)',
                  border:
                    activeFilter === cat
                      ? '1px solid var(--gold)'
                      : '1px solid rgba(26,20,16,.09)',
                  boxShadow:
                    activeFilter === cat
                      ? '0 4px 20px rgba(212,168,83,.25)'
                      : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* News Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredNews.length === 0 && (
            <motion.p
              className="text-center py-16 text-lg"
              style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No updates in this category yet. Check back soon.
            </motion.p>
          )}
        </div>
      </section>

      {/* ── Newsletter Signup ────────────────────── */}
      <section
        className="section-padding relative overflow-hidden grain-overlay"
        style={{
          background: 'linear-gradient(160deg, var(--midnight) 0%, var(--charcoal) 60%, rgba(200,80,26,.15) 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-[.03]"
          style={{
            backgroundImage: 'radial-gradient(var(--gold) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 container-custom text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background: 'rgba(212,168,83,.1)',
                border: '1px solid rgba(212,168,83,.2)',
              }}
            >
              <Send size={24} style={{ color: 'var(--gold)' }} />
            </div>

            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--cream)' }}
            >
              Subscribe to our{' '}
              <span className="gold-shimmer">Updates</span>
            </h2>

            <p
              className="text-base md:text-lg mb-10 leading-relaxed"
              style={{ color: 'rgba(255,255,255,.55)', fontFamily: "'Inter', sans-serif" }}
            >
              Get the latest trade news, event invitations, and company
              milestones delivered straight to your inbox. No spam — just
              the updates that matter.
            </p>

            {subscribed ? (
              <motion.div
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl"
                style={{
                  background: 'rgba(27,94,58,.15)',
                  border: '1px solid rgba(27,94,58,.3)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CheckCircle size={22} style={{ color: 'var(--cardamom)' }} />
                <span
                  className="text-base font-medium"
                  style={{ color: 'var(--cream)', fontFamily: "'Inter', sans-serif" }}
                >
                  You're subscribed! Watch your inbox for our next update.
                </span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
              >
                <div className="relative flex-1 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-5 py-4 rounded-lg text-sm transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,.08)',
                      border: '1px solid rgba(212,168,83,.2)',
                      color: 'var(--cream)',
                      fontFamily: "'Inter', sans-serif",
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--gold)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(212,168,83,.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212,168,83,.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn-primary whitespace-nowrap w-full sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                  <ArrowRight size={16} />
                </motion.button>
              </form>
            )}

            <p
              className="mt-5 text-xs"
              style={{ color: 'rgba(255,255,255,.3)', fontFamily: "'Inter', sans-serif" }}
            >
              We respect your privacy. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
