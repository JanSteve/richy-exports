import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    Search,
    Filter,
    Package,
    MapPin,
    Layers,
    Award,
    ArrowRight,
    ChevronRight,
    Mail,
    Box,
    Truck,
    Tag,
    X,
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const CATEGORIES = [
    { id: 'all', label: 'All Spices' },
    { id: 'whole', label: 'Whole Spices' },
    { id: 'ground', label: 'Ground Spices' },
    { id: 'seeds', label: 'Seeds' },
    { id: 'blends', label: 'Blends' },
    { id: 'herbs', label: 'Herbs' },
];

const PRODUCTS = [
    {
        id: 1,
        name: 'Turmeric',
        origin: 'Erode, Tamil Nadu',
        forms: ['Finger', 'Ground', 'Powder'],
        grade: 'Premium',
        moq: '1 MT',
        category: 'ground',
        color: '#E8A817',
        emoji: '🟡',
        desc: 'High-curcumin Erode turmeric with 3-5% curcuminoid content. Alleppey and Rajapuri grades. Brilliant golden hue, earthy aroma.',
    },
    {
        id: 2,
        name: 'Red Chili',
        origin: 'Guntur, Andhra Pradesh',
        forms: ['Whole', 'Crushed', 'Powder'],
        grade: 'Premium',
        moq: '1 MT',
        category: 'ground',
        color: '#C8501A',
        emoji: '🌶️',
        desc: 'Guntur Sannam S4 and Teja varieties. ASTA color value 80-120. Rich pungency with consistent SHU ratings. Export-grade quality.',
    },
    {
        id: 3,
        name: 'Cumin Seeds',
        origin: 'Gujarat',
        forms: ['Whole Seeds', 'Ground', 'Powder'],
        grade: 'Premium',
        moq: '500 kg',
        category: 'seeds',
        color: '#9A7830',
        emoji: '🫘',
        desc: 'Machine-cleaned, sortex-processed cumin with 99.5% purity. Volatile oil content min 2.5%. Warm, earthy, and intensely aromatic.',
    },
    {
        id: 4,
        name: 'Black Pepper',
        origin: 'Kerala',
        forms: ['Whole', 'Cracked', 'Ground'],
        grade: 'Premium',
        moq: '500 kg',
        category: 'whole',
        color: '#2D2520',
        emoji: '⚫',
        desc: 'Malabar and Tellicherry grades. Bold, pungent berries with high piperine content (4-9%). The "King of Spices" from Kerala\'s Western Ghats.',
    },
    {
        id: 5,
        name: 'Green Cardamom',
        origin: 'Idukki, Kerala',
        forms: ['Whole Pods', 'Seeds', 'Ground'],
        grade: 'Premium',
        moq: '200 kg',
        category: 'whole',
        color: '#1B5E3A',
        emoji: '💚',
        desc: 'Alleppey Green Extra Bold (AGEB) grade. Intensely aromatic with bright green pods. Hand-picked from Kerala\'s cardamom hills.',
    },
    {
        id: 6,
        name: 'Cinnamon',
        origin: 'Kerala',
        forms: ['Quills', 'Sticks', 'Ground'],
        grade: 'Premium',
        moq: '300 kg',
        category: 'whole',
        color: '#8B1A1A',
        emoji: '🟤',
        desc: 'True cinnamon (Cinnamomum verum) quills. C5 and C4 grades with delicate, sweet aroma. Low coumarin content, superior flavor profile.',
    },
    {
        id: 7,
        name: 'Coriander Seeds',
        origin: 'Rajasthan',
        forms: ['Whole Seeds', 'Split', 'Powder'],
        grade: 'Standard',
        moq: '1 MT',
        category: 'ground',
        color: '#6B8E23',
        emoji: '🫛',
        desc: 'Eagle and Badami varieties from Rajasthan. High volatile oil (0.3-1.0%). Citrusy, slightly sweet flavor. Machine-cleaned and moisture-controlled.',
    },
    {
        id: 8,
        name: 'Fenugreek',
        origin: 'Rajasthan',
        forms: ['Whole Seeds', 'Ground', 'Powder'],
        grade: 'Standard',
        moq: '500 kg',
        category: 'seeds',
        color: '#B8860B',
        emoji: '🌿',
        desc: 'High-diosgenin seeds (0.9-1.2%). Bitter-sweet maple-like flavor. Used in curry blends, pharmaceuticals, and nutraceuticals.',
    },
    {
        id: 9,
        name: 'Mustard Seeds',
        origin: 'Gujarat',
        forms: ['Yellow', 'Brown', 'Black'],
        grade: 'Standard',
        moq: '1 MT',
        category: 'seeds',
        color: '#DAA520',
        emoji: '🟡',
        desc: 'All three varieties — yellow (mild), brown (medium), black (pungent). High oil content (28-36%). Sortex-cleaned, export quality.',
    },
    {
        id: 10,
        name: 'Fennel Seeds',
        origin: 'Gujarat',
        forms: ['Whole Seeds', 'Ground', 'Powder'],
        grade: 'Standard',
        moq: '500 kg',
        category: 'seeds',
        color: '#556B2F',
        emoji: '🌱',
        desc: 'Lucknow and Gujarat varieties. Sweet anise-like flavor. Rich in anethole. Used in teas, spice blends, and pharmaceutical applications.',
    },
    {
        id: 11,
        name: 'Star Anise',
        origin: 'Arunachal Pradesh',
        forms: ['Whole', 'Broken', 'Ground'],
        grade: 'Premium',
        moq: '200 kg',
        category: 'whole',
        color: '#8B4513',
        emoji: '⭐',
        desc: 'Beautiful 8-pointed star pods from Arunachal Pradesh. Rich in shikimic acid. Intensely licorice-flavored. Used in garam masala and pho broth.',
    },
    {
        id: 12,
        name: 'Cloves',
        origin: 'Kerala',
        forms: ['Whole', 'Stems', 'Ground'],
        grade: 'Premium',
        moq: '200 kg',
        category: 'whole',
        color: '#4A1C1C',
        emoji: '🫘',
        desc: 'Bold, handpicked Kerala cloves with high eugenol content (80-90%). Intensely aromatic. Used in cuisine, dental products, and traditional medicine.',
    },
    {
        id: 13,
        name: 'Nutmeg',
        origin: 'Kerala',
        forms: ['Whole', 'Ground', 'Butter'],
        grade: 'Premium',
        moq: '150 kg',
        category: 'whole',
        color: '#A0522D',
        emoji: '🥜',
        desc: 'Premium Kerala nutmeg with high myristicin content. Warm, sweet, aromatic profile. Available as whole nuts, ground powder, and nutmeg butter.',
    },
    {
        id: 14,
        name: 'Mace',
        origin: 'Kerala',
        forms: ['Whole Blades', 'Ground', 'Powder'],
        grade: 'Premium',
        moq: '100 kg',
        category: 'herbs',
        color: '#CD853F',
        emoji: '🧡',
        desc: 'Vivid crimson mace blades — the lacy aril of nutmeg. Subtle, warm flavor with notes of cinnamon and pepper. Prized in gourmet cooking and baking.',
    },
    {
        id: 15,
        name: 'Bay Leaves',
        origin: 'Meghalaya',
        forms: ['Whole Leaves', 'Crushed', 'Ground'],
        grade: 'Standard',
        moq: '300 kg',
        category: 'herbs',
        color: '#2E8B57',
        emoji: '🍃',
        desc: 'Indian bay leaves (Tej Patta) from the hills of Meghalaya. Warm cinnamon-clove aroma. Essential in biryanis, curries, and slow-cooked dishes.',
    },
    {
        id: 16,
        name: 'Saffron',
        origin: 'Kashmir',
        forms: ['Threads', 'Powder', 'Extract'],
        grade: 'Premium',
        moq: '5 kg',
        category: 'herbs',
        color: '#FF4500',
        emoji: '🔴',
        desc: 'Mogra and Laccha grade Kashmiri saffron. Crocin content 220+. Hand-harvested from 75,000 flowers per kg. The world\'s most precious spice.',
    },
];

const PACKAGING_OPTIONS = [
    {
        icon: Box,
        title: '25 kg Bags',
        desc: 'Multi-wall paper bags with LDPE liner. Ideal for wholesale distributors and food processors. Food-grade certified.',
        features: ['LDPE Liner', 'Moisture Barrier', 'Custom Print'],
    },
    {
        icon: Package,
        title: '50 kg Bags',
        desc: 'Heavy-duty PP woven bags or jute bags. Perfect for bulk industrial buyers. Fumigation-ready for sea freight.',
        features: ['PP/Jute Options', 'Sea-Freight Ready', 'Palletized'],
    },
    {
        icon: Tag,
        title: 'Custom Retail Packs',
        desc: 'Private label packaging from 50g to 5kg. Custom branding, artwork, and packaging design support available.',
        features: ['Private Label', '50g–5kg Range', 'Design Support'],
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
        transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 0.61, 0.36, 1] },
    }),
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: { duration: 0.3 },
    },
};

/* ═══════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════ */

function HeroSection() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

    return (
        <section
            ref={heroRef}
            className="relative h-[75vh] min-h-[550px] flex items-center justify-center overflow-hidden"
            style={{ background: 'var(--midnight)' }}
        >
            {/* Background Image */}
            <motion.div className="absolute inset-0 w-full h-[125%]" style={{ y: imgY }}>
                <img
                    src="/images/spice-products.png"
                    alt="Premium Indian spices collection at Richy Exports"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.45 }}
                />
            </motion.div>

            {/* Overlays */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(12,10,8,0.7) 0%, rgba(12,10,8,0.4) 40%, rgba(12,10,8,0.9) 100%)',
                }}
            />
            <div className="absolute inset-0 grain-overlay pointer-events-none" />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center container-custom"
                style={{ y: textY }}
            >
                <motion.p
                    className="font-mono text-xs tracking-[0.35em] uppercase mb-5"
                    style={{ color: 'var(--gold)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    500+ SKUs · 50+ Varieties · Export Quality
                </motion.p>

                <motion.h1
                    className="font-display font-bold leading-[1.08] mb-6"
                    style={{
                        fontSize: 'clamp(40px, 6.5vw, 82px)',
                        color: 'var(--cream)',
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                >
                    Our Spice{' '}
                    <span
                        className="italic gold-shimmer"
                        style={{ WebkitTextFillColor: 'transparent' }}
                    >
                        Collection
                    </span>
                </motion.h1>

                <motion.p
                    className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    style={{ color: 'rgba(251,247,240,0.6)' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    Sourced from India's finest growing regions. Processed to international
                    standards. Exported worldwide.
                </motion.p>
            </motion.div>

            {/* Bottom fade */}
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
   2. FILTER TABS
   ═══════════════════════════════════════════════ */

function FilterTabs({ active, onChange }) {
    return (
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {CATEGORIES.map((cat) => {
                const isActive = active === cat.id;
                return (
                    <motion.button
                        key={cat.id}
                        onClick={() => onChange(cat.id)}
                        className="relative px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300"
                        style={{
                            color: isActive ? 'var(--midnight)' : 'var(--text-mid)',
                            background: isActive ? 'var(--gold)' : 'rgba(212,168,83,0.08)',
                            border: isActive
                                ? '1.5px solid var(--gold)'
                                : '1.5px solid var(--border-gold)',
                            boxShadow: isActive ? 'var(--shadow-gold)' : 'none',
                        }}
                        whileHover={{
                            scale: 1.05,
                            borderColor: 'rgba(212,168,83,0.6)',
                        }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {cat.label}
                    </motion.button>
                );
            })}
        </div>
    );
}

/* ═══════════════════════════════════════════════
   3. PRODUCT CARD
   ═══════════════════════════════════════════════ */

function ProductCard({ product, index }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="group relative rounded-2xl overflow-hidden cursor-pointer"
            style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border)',
            }}
            variants={cardVariants}
            layout
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
                y: -8,
                boxShadow: '0 20px 60px rgba(26,20,16,0.15)',
                borderColor: 'rgba(212,168,83,0.4)',
            }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        >
            {/* Image Area */}
            <div
                className="relative h-44 overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${product.color}15, ${product.color}30)`,
                }}
            >
                {/* Spice emoji placeholder — scales on hover */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: isHovered ? 1.15 : 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-7xl select-none" role="img" aria-label={product.name}>
                        {product.emoji}
                    </span>
                </motion.div>

                {/* Category label */}
                <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full"
                    style={{
                        background: 'rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid var(--border)',
                    }}
                >
                    <span
                        className="font-mono text-[10px] tracking-wider uppercase"
                        style={{ color: 'var(--text-mid)' }}
                    >
                        {product.category === 'whole'
                            ? 'Whole Spice'
                            : product.category === 'ground'
                            ? 'Ground Spice'
                            : product.category === 'seeds'
                            ? 'Seeds'
                            : product.category === 'herbs'
                            ? 'Herb'
                            : 'Blend'}
                    </span>
                </div>

                {/* Grade badge */}
                <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full"
                    style={{
                        background:
                            product.grade === 'Premium'
                                ? 'linear-gradient(135deg, var(--gold), var(--saffron))'
                                : 'rgba(30,26,22,0.7)',
                    }}
                >
                    <span
                        className="font-mono text-[10px] tracking-wider uppercase font-bold"
                        style={{
                            color: product.grade === 'Premium' ? 'white' : 'var(--gold)',
                        }}
                    >
                        {product.grade}
                    </span>
                </div>

                {/* Inquire button on hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{ background: `${product.color}22` }}
                            />
                            <motion.a
                                href="#inquiry-cta"
                                className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold"
                                style={{
                                    background: 'var(--gold)',
                                    color: 'var(--midnight)',
                                }}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}
                                transition={{ delay: 0.05, duration: 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Inquire Now <ArrowRight size={14} />
                            </motion.a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3
                    className="font-display text-xl font-bold mb-1 group-hover:text-[var(--saffron)] transition-colors duration-300"
                    style={{ color: 'var(--text-dark)' }}
                >
                    {product.name}
                </h3>

                <div className="flex items-center gap-1.5 mb-3">
                    <MapPin size={12} style={{ color: 'var(--text-muted)' }} />
                    <span
                        className="font-body text-xs"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {product.origin}
                    </span>
                </div>

                <p
                    className="font-body text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--text-mid)' }}
                >
                    {product.desc}
                </p>

                {/* Forms */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.forms.map((form) => (
                        <span
                            key={form}
                            className="px-2.5 py-1 rounded-md font-body text-[11px]"
                            style={{
                                background: 'rgba(212,168,83,0.08)',
                                color: 'var(--text-mid)',
                                border: '1px solid var(--border-gold)',
                            }}
                        >
                            {form}
                        </span>
                    ))}
                </div>

                {/* MOQ */}
                <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: '1px solid var(--border)' }}
                >
                    <div className="flex items-center gap-1.5">
                        <Truck size={12} style={{ color: 'var(--gold)' }} />
                        <span
                            className="font-mono text-[10px] tracking-wider uppercase"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            MOQ
                        </span>
                    </div>
                    <span
                        className="font-body text-sm font-semibold"
                        style={{ color: 'var(--text-dark)' }}
                    >
                        {product.moq}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════
   4. PRODUCT GRID
   ═══════════════════════════════════════════════ */

function ProductGrid() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 });

    const categoryMap = useMemo(
        () => ({
            whole: ['Black Pepper', 'Green Cardamom', 'Cinnamon', 'Star Anise', 'Cloves', 'Nutmeg', 'Bay Leaves'],
            ground: ['Turmeric', 'Red Chili', 'Coriander Seeds'],
            seeds: ['Cumin Seeds', 'Fenugreek', 'Mustard Seeds', 'Fennel Seeds'],
            blends: [],
            herbs: ['Bay Leaves', 'Mace', 'Saffron'],
        }),
        []
    );

    const filteredProducts = useMemo(() => {
        if (activeFilter === 'all') return PRODUCTS;
        const names = categoryMap[activeFilter] || [];
        return PRODUCTS.filter((p) => names.includes(p.name));
    }, [activeFilter, categoryMap]);

    return (
        <section className="section-padding" style={{ background: 'var(--cream)' }}>
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    className="section-header"
                    variants={fadeUp}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                >
                    <p className="section-label">Our Catalogue</p>
                    <h2 className="section-title">
                        Premium Indian{' '}
                        <span style={{ color: 'var(--saffron)' }}>Spices</span>
                    </h2>
                    <p className="section-subtitle">
                        Explore our complete range of export-grade spices sourced from India's finest
                        growing regions.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <FilterTabs active={activeFilter} onChange={setActiveFilter} />

                {/* Count */}
                <motion.p
                    className="text-center font-body text-sm mb-8"
                    style={{ color: 'var(--text-muted)' }}
                    key={activeFilter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Showing{' '}
                    <span style={{ color: 'var(--saffron)', fontWeight: 600 }}>
                        {filteredProducts.length}
                    </span>{' '}
                    {filteredProducts.length === 1 ? 'product' : 'products'}
                </motion.p>

                {/* Grid */}
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    key={activeFilter}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Package size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
                        <p className="font-display text-xl" style={{ color: 'var(--text-mid)' }}>
                            No products in this category yet.
                        </p>
                        <p className="font-body text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                            We're constantly expanding our catalogue. Contact us for custom blends.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════
   5. PACKAGING INFO
   ═══════════════════════════════════════════════ */

function PackagingSection() {
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
                    <p className="section-label">Packaging</p>
                    <h2 className="section-title">
                        Flexible{' '}
                        <span
                            className="gold-shimmer"
                            style={{ WebkitTextFillColor: 'transparent' }}
                        >
                            Packaging
                        </span>{' '}
                        Options
                    </h2>
                    <p className="section-subtitle">
                        From bulk industrial shipments to private-label retail packs — we package to
                        your exact specifications.
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {PACKAGING_OPTIONS.map((pkg, i) => {
                        const Icon = pkg.icon;
                        return (
                            <motion.div
                                key={pkg.title}
                                className="dark-card p-8 text-center group"
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ y: -6, borderColor: 'rgba(212,168,83,0.4)' }}
                            >
                                <div
                                    className="w-16 h-16 mx-auto mb-5 rounded-xl flex items-center justify-center"
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
                                    {pkg.title}
                                </h3>
                                <p
                                    className="font-body text-sm leading-relaxed mb-5"
                                    style={{ color: 'rgba(251,247,240,0.55)' }}
                                >
                                    {pkg.desc}
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {pkg.features.map((f) => (
                                        <span
                                            key={f}
                                            className="px-3 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase"
                                            style={{
                                                background: 'rgba(212,168,83,0.06)',
                                                border: '1px solid rgba(212,168,83,0.2)',
                                                color: 'var(--gold)',
                                            }}
                                        >
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════
   6. CTA — Custom Quote
   ═══════════════════════════════════════════════ */

function InquiryCTA() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <section
            id="inquiry-cta"
            className="section-padding"
            style={{ background: 'var(--cream-dark)' }}
        >
            <div className="container-custom">
                <motion.div
                    ref={ref}
                    className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center"
                    style={{
                        background: 'linear-gradient(135deg, var(--charcoal), var(--midnight))',
                        border: '1px solid rgba(212,168,83,0.2)',
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    {/* Decorative glow */}
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-[120px] opacity-20"
                        style={{ background: 'var(--gold)' }}
                    />

                    <div className="relative z-10">
                        <motion.div
                            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                            style={{
                                background: 'rgba(212,168,83,0.1)',
                                border: '2px solid rgba(212,168,83,0.3)',
                            }}
                            animate={{
                                boxShadow: [
                                    '0 0 0 0 rgba(212,168,83,0.3)',
                                    '0 0 0 12px rgba(212,168,83,0)',
                                    '0 0 0 0 rgba(212,168,83,0.3)',
                                ],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            <Mail size={28} style={{ color: 'var(--gold)' }} />
                        </motion.div>

                        <h2
                            className="font-display font-bold mb-4"
                            style={{
                                fontSize: 'clamp(28px, 4vw, 48px)',
                                color: 'var(--cream)',
                            }}
                        >
                            Need a{' '}
                            <span style={{ color: 'var(--gold)' }}>Custom Quote</span>?
                        </h2>
                        <p
                            className="font-body text-lg max-w-xl mx-auto mb-8 leading-relaxed"
                            style={{ color: 'rgba(251,247,240,0.6)' }}
                        >
                            Tell us your requirements — spice type, grade, quantity, destination
                            country — and our export team will prepare a competitive quote within
                            24 hours.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="#contact" className="btn-primary">
                                Request a Quote <ArrowRight size={16} />
                            </a>
                            <a
                                href={`https://wa.me/919600852141?text=Hi, I'd like to request a quote for spice exports. Please share your product catalogue and pricing.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-4 rounded font-body text-sm font-medium transition-all duration-300"
                                style={{
                                    color: '#22c55e',
                                    border: '1.5px solid rgba(34,197,94,0.3)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(34,197,94,0.08)';
                                    e.currentTarget.style.borderColor = 'rgba(34,197,94,0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)';
                                }}
                            >
                                WhatsApp Us <ChevronRight size={14} />
                            </a>
                        </div>

                        <p
                            className="font-body text-xs mt-6"
                            style={{ color: 'rgba(251,247,240,0.35)' }}
                        >
                            Average response time: under 4 hours during business hours (IST)
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════
   MAIN PRODUCTS PAGE
   ═══════════════════════════════════════════════ */

export default function Products() {
    return (
        <div>
            <HeroSection />
            <ProductGrid />
            <PackagingSection />
            <InquiryCTA />
        </div>
    );
}
