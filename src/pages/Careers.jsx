import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  TrendingUp,
  Lightbulb,
  Heart,
  MapPin,
  Clock,
  ChevronDown,
  ShieldCheck,
  BookOpen,
  Plane,
  Timer,
  Award,
  Users,
  Mail,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

/* ─── Data ──────────────────────────────────────── */

const VALUES = [
  {
    icon: Globe,
    title: 'Global Exposure',
    description:
      'Work with international clients across 45+ countries. Gain hands-on experience navigating diverse trade regulations, cultural nuances, and global supply chains.',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description:
      'Accelerate your career with mentorship from industry veterans, cross-functional projects, and a clear promotion path backed by measurable milestones.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Pioneer next-generation spice processing, AI-powered quality control, and sustainable sourcing models that are redefining the global spice trade.',
  },
  {
    icon: Heart,
    title: 'Impact',
    description:
      'Every shipment supports 2,000+ farming families across India. Your work directly improves livelihoods and brings India\'s finest flavours to the world.',
  },
];

const POSITIONS = [
  {
    id: 'export-mgr',
    title: 'Senior Export Manager',
    location: 'Chennai',
    type: 'Full-time',
    department: 'Trade Operations',
    description:
      'Lead end-to-end export operations for key accounts across Europe, Middle East, and Africa. Drive revenue growth, negotiate contracts, and ensure seamless logistics for high-volume spice consignments.',
    requirements: [
      '8+ years in international trade or FMCG exports',
      'Proven track record managing $5M+ annual trade portfolios',
      'Deep understanding of Incoterms, L/C documentation, and EXIM policy',
      'Fluency in English; Arabic, French, or German is a strong plus',
      'Willingness to travel internationally 20-30% of the time',
    ],
  },
  {
    id: 'qa-lead',
    title: 'Quality Assurance Lead',
    location: 'Chennai',
    type: 'Full-time',
    department: 'Quality & Compliance',
    description:
      'Oversee quality standards across our entire product line — from incoming raw material testing to final export packaging. Maintain ISO 22000 and FSSAI compliance, and interface directly with third-party audit bodies.',
    requirements: [
      '6+ years in food quality assurance or food technology',
      'ISO 22000 / HACCP Lead Auditor certification',
      'Hands-on experience with HPLC, GC-MS, and microbial testing',
      'Knowledge of EU, FDA, and CODEX food safety standards',
      'Strong documentation and SOP development skills',
    ],
  },
  {
    id: 'biz-dev',
    title: 'Business Development Executive',
    location: 'Mumbai',
    type: 'Full-time',
    department: 'Sales & Strategy',
    description:
      'Identify and cultivate new market opportunities across Southeast Asia and Latin America. Build a pipeline of importers, distributors, and retail partners through trade shows, digital outreach, and strategic networking.',
    requirements: [
      '3-5 years in B2B sales, commodity trading, or business development',
      'Experience in FMCG, agro-commodities, or food export industries',
      'Exceptional communication and presentation skills',
      'CRM proficiency (Salesforce, HubSpot, or equivalent)',
      'MBA or equivalent business qualification preferred',
    ],
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Coordinator',
    location: 'Chennai',
    type: 'Full-time',
    department: 'Logistics',
    description:
      'Coordinate procurement from farming clusters across 8 Indian states, manage warehouse inventory at our 50,000 sq ft facility, and optimise freight forwarding for FCL and LCL shipments to global ports.',
    requirements: [
      '4+ years in supply chain management or logistics',
      'Proficiency in ERP systems (SAP, Oracle, or Tally)',
      'Knowledge of customs procedures, CHA coordination, and port operations',
      'Strong analytical skills with advanced Excel and data tools',
      'APICS or CSCMP certification is a plus',
    ],
  },
  {
    id: 'digital-mktg',
    title: 'Digital Marketing Specialist',
    location: 'Remote',
    type: 'Full-time',
    department: 'Marketing',
    description:
      'Own our digital presence across web, social, and trade platforms. Create compelling content that positions Richy Exports as a premium spice brand, drive inbound leads through SEO/SEM, and manage trade-directory listings on Alibaba, IndiaMART, and TradeIndia.',
    requirements: [
      '3+ years in B2B digital marketing or export marketing',
      'Expertise in SEO, Google Ads, LinkedIn Ads, and content marketing',
      'Experience with marketing automation tools (Mailchimp, HubSpot)',
      'Portfolio demonstrating strong copywriting and visual storytelling',
      'Familiarity with the FMCG or agri-export industry landscape',
    ],
  },
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Health Insurance',
    description: 'Comprehensive family coverage with dental, vision, and wellness programs for you and your dependents.',
  },
  {
    icon: BookOpen,
    title: 'Learning Budget',
    description: '₹1,00,000 annual learning allowance for certifications, conferences, courses, and professional development.',
  },
  {
    icon: Plane,
    title: 'International Travel',
    description: 'Attend global trade fairs — Gulfood, Anuga, SIAL — and visit clients in 45+ countries on company-sponsored trips.',
  },
  {
    icon: Timer,
    title: 'Flexible Hours',
    description: 'Core hours 10 AM–4 PM with flexibility around your schedule. Remote work options available for eligible roles.',
  },
  {
    icon: Award,
    title: 'Performance Bonus',
    description: 'Quarterly performance bonuses up to 30% of base pay, plus annual profit-sharing for senior roles.',
  },
  {
    icon: Users,
    title: 'Team Events',
    description: 'Monthly team outings, annual off-sites, festival celebrations, and spice-tasting experiences that bring the team together.',
  },
];

/* ─── Animation Variants ────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Job Card Component ────────────────────────── */

function JobCard({ job, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden border transition-all duration-400"
      style={{
        background: isOpen ? 'var(--charcoal)' : 'rgba(255,255,255,.7)',
        backdropFilter: 'blur(20px)',
        borderColor: isOpen
          ? 'rgba(212,168,83,.3)'
          : 'rgba(255,255,255,.5)',
      }}
      variants={itemVariants}
      whileHover={{ y: -3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 md:p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-xl"
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="font-mono text-[11px] tracking-[.15em] uppercase px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(200,80,26,.12)',
                  color: 'var(--saffron)',
                }}
              >
                {job.department}
              </span>
            </div>
            <h3
              className="font-display text-xl md:text-2xl font-bold mb-3 transition-colors duration-300"
              style={{ color: isOpen ? 'var(--gold)' : 'var(--text-dark)' }}
            >
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span
                className="flex items-center gap-1.5"
                style={{ color: isOpen ? 'rgba(255,255,255,.6)' : 'var(--text-mid)' }}
              >
                <MapPin size={14} />
                {job.location}
              </span>
              <span
                className="flex items-center gap-1.5"
                style={{ color: isOpen ? 'rgba(255,255,255,.6)' : 'var(--text-mid)' }}
              >
                <Clock size={14} />
                {job.type}
              </span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1 flex-shrink-0"
          >
            <ChevronDown
              size={22}
              style={{ color: isOpen ? 'var(--gold)' : 'var(--text-mid)' }}
            />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 md:px-8 md:pb-8">
              <div
                className="h-px mb-6"
                style={{
                  background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                }}
              />
              <p
                className="text-[15px] leading-relaxed mb-6"
                style={{ color: 'rgba(255,255,255,.7)', fontFamily: "'Inter', sans-serif" }}
              >
                {job.description}
              </p>
              <div>
                <h4
                  className="font-display text-lg font-semibold mb-4"
                  style={{ color: 'var(--cream)' }}
                >
                  Requirements
                </h4>
                <ul className="space-y-2.5">
                  {job.requirements.map((req, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.15 }}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: 'rgba(255,255,255,.6)', fontFamily: "'Inter', sans-serif" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'var(--gold)' }}
                      />
                      {req}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.a
                href={`mailto:careers@richyexports.in?subject=Application: ${job.title}`}
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded text-sm font-semibold tracking-wider transition-all duration-300"
                style={{
                  background: 'var(--gold)',
                  color: 'var(--midnight)',
                  fontFamily: "'Inter', sans-serif",
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 40px rgba(212,168,83,.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                Apply for this role
                <ArrowRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Careers Component ────────────────────── */

export default function Careers() {
  return (
    <main className="overflow-x-hidden" style={{ background: 'var(--cream)' }}>
      {/* ── Hero ──────────────────────────────────── */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden grain-overlay"
        style={{
          background: 'linear-gradient(135deg, var(--midnight) 0%, var(--charcoal) 40%, var(--saffron) 100%)',
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[.08]"
          style={{ background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full opacity-[.06]"
          style={{ background: 'radial-gradient(circle, var(--saffron-bright) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(212,168,83,.12)',
              border: '1px solid rgba(212,168,83,.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Briefcase size={14} style={{ color: 'var(--gold)' }} />
            <span
              className="font-mono text-[11px] tracking-[.2em] uppercase"
              style={{ color: 'var(--gold)' }}
            >
              Careers at Richy Exports
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl xl:text-[88px] font-bold leading-[1.05] mb-6"
            style={{ color: 'var(--cream)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Join the{' '}
            <span className="gold-shimmer">Spice Trade</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,.65)', fontFamily: "'Inter', sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            Be part of India's global spice legacy. Build your career at a company
            that bridges continents through the world's finest flavours.
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            <a
              href="#open-positions"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Open Positions
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Culture Section ──────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container-custom">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Our Culture</p>
            <h2 className="section-title">
              Why{' '}
              <span style={{ color: 'var(--saffron)', fontStyle: 'italic' }}>
                Richy Exports
              </span>
              ?
            </h2>
            <p className="section-subtitle">
              Two decades of building India's most trusted spice export brand —
              and we're just getting started.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  className="glass-card p-8 text-center group"
                  variants={itemVariants}
                  whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)' }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(200,80,26,.1), rgba(212,168,83,.15))',
                      border: '1px solid rgba(212,168,83,.2)',
                    }}
                  >
                    <Icon
                      size={28}
                      className="transition-colors duration-300"
                      style={{ color: 'var(--saffron)' }}
                    />
                  </div>
                  <h3
                    className="font-display text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-[var(--saffron)]"
                    style={{ color: 'var(--text-dark)' }}
                  >
                    {val.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-mid)', fontFamily: "'Inter', sans-serif" }}
                  >
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Open Positions ───────────────────────── */}
      <section
        id="open-positions"
        className="section-padding"
        style={{ background: 'var(--cream-dark)' }}
      >
        <div className="container-custom">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Opportunities</p>
            <h2 className="section-title">Open Positions</h2>
            <p className="section-subtitle">
              Find your perfect role and become part of a team that's reshaping
              global spice commerce.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {POSITIONS.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Benefits Grid ────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container-custom">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Perks & Benefits</p>
            <h2 className="section-title">
              We Take Care of{' '}
              <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Our Own</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  className="group relative rounded-xl p-8 transition-all duration-400 overflow-hidden"
                  style={{
                    background: 'var(--charcoal)',
                    border: '1px solid rgba(212,168,83,.12)',
                  }}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    borderColor: 'rgba(212,168,83,.35)',
                    boxShadow: '0 0 60px rgba(212,168,83,.12)',
                  }}
                >
                  {/* Glow accent on hover */}
                  <div
                    className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background: 'linear-gradient(90deg, var(--saffron), var(--gold), var(--saffron))',
                    }}
                  />
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(212,168,83,.1)',
                      border: '1px solid rgba(212,168,83,.2)',
                    }}
                  >
                    <Icon size={24} style={{ color: 'var(--gold)' }} />
                  </div>
                  <h3
                    className="font-display text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--gold)]"
                    style={{ color: 'var(--cream)' }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,.55)', fontFamily: "'Inter', sans-serif" }}
                  >
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Application CTA ──────────────────────── */}
      <section
        className="section-padding relative overflow-hidden grain-overlay"
        style={{
          background: 'linear-gradient(135deg, var(--midnight) 0%, var(--charcoal) 60%, rgba(200,80,26,.25) 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage:
              'radial-gradient(var(--gold) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-display text-4xl md:text-6xl font-bold mb-6"
              style={{ color: 'var(--cream)' }}
            >
              Don't see your role?
            </h2>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
              style={{ color: 'rgba(255,255,255,.6)', fontFamily: "'Inter', sans-serif" }}
            >
              We're always looking for passionate people who share our vision of
              taking Indian spices to every corner of the globe. Send us your CV and
              let's start a conversation.
            </p>

            <div className="diamond-rule max-w-xs mx-auto my-8">
              <span className="diamond" />
            </div>

            <motion.p
              className="text-base mb-8"
              style={{ color: 'rgba(255,255,255,.5)', fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Send your CV to
            </motion.p>

            <motion.a
              href="mailto:careers@richyexports.in"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-lg text-lg font-semibold tracking-wide transition-all duration-300"
              style={{
                background: 'var(--gold)',
                color: 'var(--midnight)',
                fontFamily: "'Inter', sans-serif",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 12px 50px rgba(212,168,83,.35)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={20} />
              careers@richyexports.in
            </motion.a>

            <motion.p
              className="mt-6 text-sm"
              style={{ color: 'rgba(255,255,255,.35)', fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              We review every application within 5 business days.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
