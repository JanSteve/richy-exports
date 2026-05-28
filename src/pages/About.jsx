import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    Award,
    Shield,
    Lightbulb,
    Leaf,
    Users,
    Building2,
    Factory,
    MapPin,
    Calendar,
    ChevronRight,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const MILESTONES = [
    {
        year: '2004',
        title: 'Company Founded',
        desc: 'Richy Exports established in Chennai as a small cumin and turmeric trading house, driven by a vision to bring India\'s finest spices to the global market.',
    },
    {
        year: '2008',
        title: 'First International Export',
        desc: 'Shipped our first container of premium turmeric to the Middle East, marking the beginning of our international journey.',
    },
    {
        year: '2012',
        title: 'ISO 9001 Certification',
        desc: 'Achieved ISO 9001:2008 certification, establishing rigorous quality management systems across all operations.',
    },
    {
        year: '2016',
        title: '25+ Countries Reached',
        desc: 'Expanded our distribution network to over 25 countries across Asia, Africa, Europe, and the Americas.',
    },
    {
        year: '2019',
        title: 'New Processing Facility',
        desc: 'Inaugurated a state-of-the-art 50,000 sq ft processing and packaging facility with automated sortex lines.',
    },
    {
        year: '2022',
        title: '45+ Countries Served',
        desc: 'Reached the milestone of exporting to 45+ countries with over 500 product SKUs in our portfolio.',
    },
    {
        year: '2024',
        title: 'Digital Transformation',
        desc: 'Launched integrated digital supply chain management, real-time quality tracking, and B2B e-commerce platform.',
    },
];

const LEADERSHIP = [
    {
        initials: 'RS',
        name: 'Rajesh Sundaram',
        title: 'Managing Director',
        bio: 'With 25+ years in the spice industry, Rajesh founded Richy Exports with a mission to deliver world-class Indian spices. His deep network across India\'s spice-growing regions ensures unmatched sourcing capabilities.',
        color: 'var(--saffron)',
    },
    {
        initials: 'PK',
        name: 'Priya Krishnan',
        title: 'Operations Director',
        bio: 'Priya oversees end-to-end operations — from procurement to logistics. Her expertise in supply chain optimization has reduced lead times by 40% while maintaining zero-defect quality standards.',
        color: 'var(--gold)',
    },
    {
        initials: 'AV',
        name: 'Dr. Arun Venkatesh',
        title: 'Head of Quality',
        bio: 'A food science PhD from CFTRI Mysore, Dr. Arun leads our 12-member quality team. He has implemented HACCP protocols and ensures every batch meets international food safety standards.',
        color: 'var(--cardamom)',
    },
];

const VALUES = [
    {
        icon: Award,
        title: 'Quality',
        desc: 'Every batch undergoes 27-point quality checks — from moisture and curcumin content to heavy metal and pesticide residue testing. We reject anything below our exacting standards.',
    },
    {
        icon: Shield,
        title: 'Integrity',
        desc: 'Transparent pricing, honest grading, and full traceability from farm to port. We believe trust is built one shipment at a time, and we\'ve never compromised on our word.',
    },
    {
        icon: Lightbulb,
        title: 'Innovation',
        desc: 'From automated color-sortex processing to AI-powered demand forecasting, we invest in technology that elevates quality, efficiency, and the customer experience.',
    },
    {
        icon: Leaf,
        title: 'Sustainability',
        desc: 'We partner with 2,000+ farmers practicing sustainable agriculture. Solar-powered facilities, biodegradable packaging, and fair-trade sourcing define our commitment to the planet.',
    },
];

const INFRA_STATS = [
    { value: '50,000', unit: 'sq ft', label: 'Processing Facility' },
    { value: '3', unit: 'Units', label: 'Processing Lines' },
    { value: '200+', unit: 'MT', label: 'Monthly Capacity' },
    { value: '24/7', unit: '', label: 'Quality Monitoring' },
];

const CERTIFICATIONS = [
    {
        name: 'ISO 9001:2015',
        body: 'International Organization for Standardization',
        desc: 'Quality Management System certified, ensuring consistent product quality and continuous improvement.',
    },
    {
        name: 'FSSAI',
        body: 'Food Safety & Standards Authority of India',
        desc: 'Licensed food business operator compliant with all Indian food safety regulations and standards.',
    },
    {
        name: 'APEDA',
        body: 'Agricultural & Processed Food Products Export',
        desc: 'Registered exporter under APEDA for agricultural commodities, enabling seamless international trade.',
    },
    {
        name: 'Spices Board',
        body: 'Spices Board India',
        desc: 'Registered with the Spices Board of India for quality certification and export promotion of Indian spices.',
    },
    {
        name: 'IEC',
        body: 'Importer-Exporter Code',
        desc: 'Government-issued import-export code enabling authorized international trade operations from India.',
    },
];

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════ */

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 0.61, 0.36, 1] },
    }),
};

const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
    },
};

const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

/* ═══════════════════════════════════════════════
   SECTION DIVIDER
   ═══════════════════════════════════════════════ */

function SectionDivider() {
    return (
        <div className="diamond-rule my-0 mx-auto" style={{ maxWidth: 200 }}>
            <div className="diamond" />
        </div>
    );
}

/* ═══════════════════════════════════════════════
   1. HERO — Parallax
   ═══════════════════════════════════════════════ */

function HeroSection() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <section
            ref={heroRef}
            className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden"
        >
            {/* Parallax Background Image */}
            <motion.div className="absolute inset-0 w-full h-[130%]" style={{ y: imgY }}>
                <img
                    src="/images/team-office.png"
                    alt="Richy Exports team at our Chennai headquarters"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Gradient Overlay */}
            <motion.div
                className="absolute inset-0"
                style={{
                    opacity: overlayOpacity,
                    background:
                        'linear-gradient(180deg, rgba(12,10,8,0.8) 0%, rgba(12,10,8,0.5) 40%, rgba(12,10,8,0.85) 100%)',
                }}
            />

            {/* Grain */}
            <div className="absolute inset-0 grain-overlay pointer-events-none" />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center container-custom"
                style={{ y: textY }}
            >
                <motion.p
                    className="font-mono text-xs tracking-[0.35em] uppercase mb-6"
                    style={{ color: 'var(--gold)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Since 2004 · Chennai, India
                </motion.p>

                <motion.h1
                    className="font-display font-bold leading-[1.05] mb-6"
                    style={{
                        fontSize: 'clamp(44px, 7vw, 88px)',
                        color: 'var(--cream)',
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                >
                    Our{' '}
                    <span
                        className="italic gold-shimmer"
                        style={{
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Story
                    </span>
                </motion.h1>

                <motion.p
                    className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    style={{ color: 'rgba(251,247,240,0.65)' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    Two decades of passion, precision, and partnership — delivering India's
                    finest spices to kitchens and industries across 45+ countries.
                </motion.p>

                <motion.div
                    className="mt-10 flex items-center justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <a href="#company-story" className="btn-primary">
                        Discover Our Journey <ArrowRight size={16} />
                    </a>
                </motion.div>
            </motion.div>

            {/* Bottom Gradient Fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32"
                style={{
                    background: 'linear-gradient(to top, var(--cream), transparent)',
                }}
            />
        </section>
    );
}

/* ═══════════════════════════════════════════════
   2. COMPANY STORY — Split Layout
   ═══════════════════════════════════════════════ */

function CompanyStory() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section
            id="company-story"
            className="section-padding"
            style={{ background: 'var(--cream)' }}
        >
            <div className="container-custom">
                <div ref={ref} className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left — Image */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        className="relative"
                    >
                        <div
                            className="relative rounded-2xl overflow-hidden"
                            style={{ border: '1px solid var(--border-gold)' }}
                        >
                            <img
                                src="/images/team-office.png"
                                alt="Our founding team at Richy Exports"
                                className="w-full aspect-[4/3] object-cover"
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(135deg, rgba(200,80,26,0.15), transparent 60%)',
                                }}
                            />
                        </div>
                        {/* Floating badge */}
                        <motion.div
                            className="absolute -bottom-6 -right-4 md:-right-8 rounded-xl p-5 shadow-lg"
                            style={{
                                background: 'var(--midnight)',
                                border: '1px solid rgba(212,168,83,0.25)',
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <p
                                className="font-display text-3xl font-bold"
                                style={{ color: 'var(--gold)' }}
                            >
                                20+
                            </p>
                            <p
                                className="font-mono text-xs tracking-wider uppercase"
                                style={{ color: 'rgba(251,247,240,0.6)' }}
                            >
                                Years of Trust
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right — Narrative */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        className="space-y-6"
                    >
                        <p
                            className="font-mono text-xs tracking-[0.3em] uppercase"
                            style={{ color: 'var(--gold)' }}
                        >
                            Our Heritage
                        </p>
                        <h2
                            className="font-display font-bold leading-tight"
                            style={{
                                fontSize: 'clamp(30px, 4vw, 48px)',
                                color: 'var(--text-dark)',
                            }}
                        >
                            From a Small Trading House{' '}
                            <span style={{ color: 'var(--saffron)' }}>to a Global Force</span>
                        </h2>

                        <p
                            className="font-body leading-relaxed"
                            style={{ color: 'var(--text-body)', fontSize: 16 }}
                        >
                            Richy Exports was founded in 2004 in the vibrant port city of Chennai,
                            India — a gateway to international trade for centuries. What began as a
                            modest cumin and turmeric trading operation, run by a passionate team of
                            three, has grown into one of South India's most respected spice export
                            companies.
                        </p>
                        <p
                            className="font-body leading-relaxed"
                            style={{ color: 'var(--text-body)', fontSize: 16 }}
                        >
                            Our founder, driven by a vision to share India's rich spice heritage with
                            the world, built relationships with farmers across Kerala, Gujarat,
                            Rajasthan, and Andhra Pradesh. Today, we source over 50 varieties of
                            premium spices from India's finest growing regions and export to buyers in
                            45+ countries across six continents.
                        </p>
                        <p
                            className="font-body leading-relaxed"
                            style={{ color: 'var(--text-mid)', fontSize: 15 }}
                        >
                            Every spice we trade carries the soul of Indian agriculture — the crimson
                            chili fields of Guntur, the golden turmeric farms of Erode, the aromatic
                            cardamom hills of Idukki, and the saffron meadows of Kashmir. We don't just
                            export spices; we export a 5,000-year-old culinary legacy.
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <div
                                className="h-px flex-1"
                                style={{
                                    background:
                                        'linear-gradient(90deg, var(--gold), transparent)',
                                }}
                            />
                            <MapPin size={14} style={{ color: 'var(--gold)' }} />
                            <span
                                className="font-mono text-xs tracking-wider uppercase"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                Chennai, Tamil Nadu
                            </span>
                            <div
                                className="h-px flex-1"
                                style={{
                                    background:
                                        'linear-gradient(90deg, transparent, var(--gold))',
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════
   3. MILESTONES TIMELINE
   ═══════════════════════════════════════════════ */

function TimelineItem({ milestone, index, isLast }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const isLeft = index % 2 === 0;

    return (
        <div ref={ref} className="relative flex items-start md:items-center group">
            {/* Desktop: alternating left/right */}
            <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] w-full items-center">
                {/* Left content */}
                <motion.div
                    className={`${isLeft ? 'text-right pr-8' : ''}`}
                    variants={isLeft ? fadeLeft : {}}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {isLeft && (
                        <div
                            className="rounded-xl p-6 inline-block text-left ml-auto"
                            style={{
                                background: 'rgba(255,255,255,0.7)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid var(--border)',
                                maxWidth: 420,
                            }}
                        >
                            <p
                                className="font-mono text-xs tracking-wider uppercase mb-2"
                                style={{ color: 'var(--saffron)' }}
                            >
                                {milestone.year}
                            </p>
                            <h3
                                className="font-display text-xl font-bold mb-2"
                                style={{ color: 'var(--text-dark)' }}
                            >
                                {milestone.title}
                            </h3>
                            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                                {milestone.desc}
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* Center dot + line */}
                <div className="flex flex-col items-center relative">
                    <motion.div
                        className="w-14 h-14 rounded-full flex items-center justify-center z-10"
                        style={{
                            background: 'var(--midnight)',
                            border: '3px solid var(--gold)',
                            boxShadow: '0 0 20px rgba(212,168,83,0.3)',
                        }}
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                    >
                        <span
                            className="font-mono text-xs font-bold"
                            style={{ color: 'var(--gold)' }}
                        >
                            {milestone.year.slice(-2)}
                        </span>
                    </motion.div>
                    {!isLast && (
                        <div
                            className="w-px flex-1 min-h-[60px]"
                            style={{
                                background:
                                    'linear-gradient(180deg, var(--gold), rgba(212,168,83,0.15))',
                            }}
                        />
                    )}
                </div>

                {/* Right content */}
                <motion.div
                    className={`${!isLeft ? 'pl-8' : ''}`}
                    variants={!isLeft ? fadeRight : {}}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {!isLeft && (
                        <div
                            className="rounded-xl p-6 inline-block"
                            style={{
                                background: 'rgba(255,255,255,0.7)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid var(--border)',
                                maxWidth: 420,
                            }}
                        >
                            <p
                                className="font-mono text-xs tracking-wider uppercase mb-2"
                                style={{ color: 'var(--saffron)' }}
                            >
                                {milestone.year}
                            </p>
                            <h3
                                className="font-display text-xl font-bold mb-2"
                                style={{ color: 'var(--text-dark)' }}
                            >
                                {milestone.title}
                            </h3>
                            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                                {milestone.desc}
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Mobile: single column */}
            <div className="flex md:hidden gap-4 w-full">
                {/* Line + dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                    <motion.div
                        className="w-10 h-10 rounded-full flex items-center justify-center z-10"
                        style={{
                            background: 'var(--midnight)',
                            border: '2px solid var(--gold)',
                        }}
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                    >
                        <Calendar size={14} style={{ color: 'var(--gold)' }} />
                    </motion.div>
                    {!isLast && (
                        <div
                            className="w-px flex-1 min-h-[20px]"
                            style={{ background: 'rgba(212,168,83,0.25)' }}
                        />
                    )}
                </div>

                {/* Content */}
                <motion.div
                    className="pb-8"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    <p
                        className="font-mono text-xs tracking-wider uppercase mb-1"
                        style={{ color: 'var(--saffron)' }}
                    >
                        {milestone.year}
                    </p>
                    <h3
                        className="font-display text-lg font-bold mb-1"
                        style={{ color: 'var(--text-dark)' }}
                    >
                        {milestone.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                        {milestone.desc}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

function MilestonesTimeline() {
    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <section
            className="section-padding-lg"
            style={{ background: 'var(--cream-dark)' }}
        >
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    className="section-header"
                    variants={fadeUp}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                >
                    <p className="section-label">Our Journey</p>
                    <h2 className="section-title">
                        Two Decades of{' '}
                        <span style={{ color: 'var(--saffron)' }}>Milestones</span>
                    </h2>
                    <p className="section-subtitle">
                        From humble beginnings to a globally recognized name in Indian spice exports.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto">
                    {MILESTONES.map((milestone, i) => (
                        <TimelineItem
                            key={milestone.year}
                            milestone={milestone}
                            index={i}
                            isLast={i === MILESTONES.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════
   4. LEADERSHIP
   ═══════════════════════════════════════════════ */

function Leadership() {
    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <section className="section-padding" style={{ background: 'var(--cream)' }}>
            <div className="container-custom">
                <motion.div
                    ref={headerRef}
                    className="section-header"
                    variants={fadeUp}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                >
                    <p className="section-label">Leadership</p>
                    <h2 className="section-title">
                        The People Behind{' '}
                        <span style={{ color: 'var(--saffron)' }}>Richy Exports</span>
                    </h2>
                    <p className="section-subtitle">
                        A team of industry veterans committed to quality, innovation, and building
                        lasting partnerships.
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {LEADERSHIP.map((person, i) => (
                        <motion.div
                            key={person.name}
                            className="glass-card p-8 text-center group"
                            variants={fadeUp}
                            custom={i}
                        >
                            {/* Avatar */}
                            <div className="relative mx-auto mb-6" style={{ width: 96, height: 96 }}>
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        border: `2px solid ${person.color}`,
                                        opacity: 0.3,
                                    }}
                                    animate={{
                                        scale: [1, 1.15, 1],
                                        opacity: [0.3, 0, 0.3],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        delay: i * 0.4,
                                    }}
                                />
                                <div
                                    className="absolute inset-0 rounded-full flex items-center justify-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${person.color}22, ${person.color}44)`,
                                        border: `2px solid ${person.color}66`,
                                    }}
                                >
                                    <span
                                        className="font-display text-2xl font-bold"
                                        style={{ color: person.color }}
                                    >
                                        {person.initials}
                                    </span>
                                </div>
                            </div>

                            <h3
                                className="font-display text-xl font-bold mb-1 transition-colors duration-300"
                                style={{ color: 'var(--text-dark)' }}
                            >
                                {person.name}
                            </h3>
                            <p
                                className="font-mono text-xs tracking-wider uppercase mb-4"
                                style={{ color: person.color }}
                            >
                                {person.title}
                            </p>
                            <p
                                className="font-body text-sm leading-relaxed"
                                style={{ color: 'var(--text-mid)' }}
                            >
                                {person.bio}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════
   5. CORE VALUES
   ═══════════════════════════════════════════════ */

function CoreValues() {
    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <section
            className="section-padding dark-section grain-overlay relative overflow-hidden"
            style={{ background: 'var(--midnight)' }}
        >
            <div className="container-custom relative z-10">
                <motion.div
                    ref={headerRef}
                    className="section-header"
                    variants={fadeUp}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                >
                    <p className="section-label">What Drives Us</p>
                    <h2 className="section-title">
                        Our Core{' '}
                        <span className="gold-shimmer" style={{ WebkitTextFillColor: 'transparent' }}>
                            Values
                        </span>
                    </h2>
                    <p className="section-subtitle">
                        The principles that guide every decision we make — from sourcing to shipment.
                    </p>
                </motion.div>

                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {VALUES.map((value, i) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={value.title}
                                className="dark-card p-8 text-center group"
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ y: -8, borderColor: 'rgba(212,168,83,0.4)' }}
                            >
                                <div
                                    className="w-16 h-16 mx-auto mb-5 rounded-xl flex items-center justify-center transition-all duration-300"
                                    style={{
                                        background: 'rgba(212,168,83,0.08)',
                                        border: '1px solid rgba(212,168,83,0.15)',
                                    }}
                                >
                                    <Icon
                                        size={28}
                                        style={{ color: 'var(--gold)' }}
                                        className="group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <h3
                                    className="font-display text-xl font-bold mb-3"
                                    style={{ color: 'var(--cream)' }}
                                >
                                    {value.title}
                                </h3>
                                <p
                                    className="font-body text-sm leading-relaxed"
                                    style={{ color: 'rgba(251,247,240,0.55)' }}
                                >
                                    {value.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════
   6. INFRASTRUCTURE
   ═══════════════════════════════════════════════ */

function Infrastructure() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section className="section-padding" style={{ background: 'var(--cream)' }}>
            <div className="container-custom">
                <div ref={ref} className="relative rounded-2xl overflow-hidden">
                    {/* Background Image */}
                    <img
                        src="/images/warehouse.png"
                        alt="Richy Exports state-of-the-art processing facility and warehouse"
                        className="w-full aspect-[21/9] md:aspect-[21/8] object-cover"
                    />

                    {/* Overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(135deg, rgba(12,10,8,0.88) 0%, rgba(12,10,8,0.65) 50%, rgba(12,10,8,0.85) 100%)',
                        }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16">
                        <motion.div
                            className="text-center mb-10"
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                        >
                            <p
                                className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
                                style={{ color: 'var(--gold)' }}
                            >
                                Our Infrastructure
                            </p>
                            <h2
                                className="font-display font-bold"
                                style={{
                                    fontSize: 'clamp(28px, 4vw, 48px)',
                                    color: 'var(--cream)',
                                }}
                            >
                                World-Class{' '}
                                <span style={{ color: 'var(--gold)' }}>Facility</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl"
                            variants={staggerContainer}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                        >
                            {INFRA_STATS.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center p-4 md:p-6 rounded-xl"
                                    style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(212,168,83,0.2)',
                                    }}
                                    variants={fadeUp}
                                    custom={i}
                                    whileHover={{
                                        borderColor: 'rgba(212,168,83,0.5)',
                                        background: 'rgba(255,255,255,0.1)',
                                    }}
                                >
                                    <p className="font-display text-2xl md:text-4xl font-bold" style={{ color: 'var(--gold)' }}>
                                        {stat.value}
                                    </p>
                                    {stat.unit && (
                                        <p
                                            className="font-mono text-xs tracking-wider uppercase"
                                            style={{ color: 'rgba(251,247,240,0.5)' }}
                                        >
                                            {stat.unit}
                                        </p>
                                    )}
                                    <p
                                        className="font-body text-xs md:text-sm mt-1"
                                        style={{ color: 'rgba(251,247,240,0.7)' }}
                                    >
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6"
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            custom={5}
                        >
                            {[
                                'Automated Sortex Lines',
                                'Cold Storage Rooms',
                                'In-House Lab Testing',
                                'Fumigation Chamber',
                            ].map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                                    style={{
                                        background: 'rgba(212,168,83,0.08)',
                                        border: '1px solid rgba(212,168,83,0.2)',
                                    }}
                                >
                                    <CheckCircle2 size={14} style={{ color: 'var(--gold)' }} />
                                    <span
                                        className="font-body text-xs"
                                        style={{ color: 'rgba(251,247,240,0.8)' }}
                                    >
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════
   7. CERTIFICATIONS GRID
   ═══════════════════════════════════════════════ */

function CertificationsGrid() {
    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <section className="section-padding" style={{ background: 'var(--cream-dark)' }}>
            <div className="container-custom">
                <motion.div
                    ref={headerRef}
                    className="section-header"
                    variants={fadeUp}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                >
                    <p className="section-label">Quality Assured</p>
                    <h2 className="section-title">
                        Certifications &{' '}
                        <span style={{ color: 'var(--saffron)' }}>Registrations</span>
                    </h2>
                    <p className="section-subtitle">
                        Our certifications reflect our unwavering commitment to quality, food safety,
                        and international compliance standards.
                    </p>
                </motion.div>

                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {CERTIFICATIONS.map((cert, i) => (
                        <motion.div
                            key={cert.name}
                            className="glass-card p-7 group"
                            variants={fadeUp}
                            custom={i}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-lg"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--gold), var(--saffron))',
                                    }}
                                >
                                    <Award size={22} style={{ color: 'white' }} />
                                </div>
                                <div>
                                    <h3
                                        className="font-display text-lg font-bold mb-0.5 group-hover:text-[var(--saffron)] transition-colors duration-300"
                                        style={{ color: 'var(--text-dark)' }}
                                    >
                                        {cert.name}
                                    </h3>
                                    <p
                                        className="font-mono text-[10px] tracking-wider uppercase mb-2"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {cert.body}
                                    </p>
                                    <p
                                        className="font-body text-sm leading-relaxed"
                                        style={{ color: 'var(--text-mid)' }}
                                    >
                                        {cert.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Extra card — CTA */}
                    <motion.div
                        className="glass-card p-7 flex flex-col items-center justify-center text-center"
                        variants={fadeUp}
                        custom={CERTIFICATIONS.length}
                        style={{
                            background: 'linear-gradient(135deg, rgba(200,80,26,0.06), rgba(212,168,83,0.08))',
                            border: '1px dashed var(--gold)',
                        }}
                    >
                        <Building2 size={32} style={{ color: 'var(--gold)', marginBottom: 12 }} />
                        <p
                            className="font-display text-lg font-bold mb-1"
                            style={{ color: 'var(--text-dark)' }}
                        >
                            Need Documentation?
                        </p>
                        <p
                            className="font-body text-sm mb-4"
                            style={{ color: 'var(--text-mid)' }}
                        >
                            We provide all necessary export compliance documents upon request.
                        </p>
                        <a href="#contact" className="btn-secondary text-sm">
                            Contact Us <ChevronRight size={14} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════
   MAIN ABOUT PAGE
   ═══════════════════════════════════════════════ */

export default function About() {
    return (
        <div>
            <HeroSection />
            <CompanyStory />
            <div className="section-padding" style={{ background: 'var(--cream)', paddingTop: 0, paddingBottom: 0 }}>
                <div className="container-custom"><SectionDivider /></div>
            </div>
            <MilestonesTimeline />
            <Leadership />
            <CoreValues />
            <Infrastructure />
            <CertificationsGrid />
        </div>
    );
}
