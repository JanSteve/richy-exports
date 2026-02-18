import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Beaker, Leaf, Award, Package } from 'lucide-react';

const PRODUCTS = [
    {
        id: 1,
        name: "Turmeric",
        latin: "Curcuma longa",
        image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=400&fit=crop&q=80",
        gradient: "from-yellow-900/60 to-amber-700/60",
        description: "High-curcumin varieties (3-5% curcuminoids). Alleppey and Rajapuri grades available. COA, heavy metal testing reports provided with every batch.",
        tags: ["Finger", "Powder", "Extract", "Alleppey Grade"],
        specs: ["Curcumin: min 3%", "Moisture: max 10%", "Mesh size: 40-60"],
        intro: "Turmeric, known as the 'Golden Spice of India', has been used for over 4,000 years in cooking and traditional Ayurvedic medicine. India produces nearly 80% of the world's turmeric supply. Curcumin, its primary bioactive compound, is renowned for its powerful anti-inflammatory and antioxidant properties. Our turmeric is sourced from the finest farms in Erode and Sangli — India's turmeric heartlands — ensuring the highest curcuminoid concentration available on the global market.",
        origin: "Erode & Sangli, India",
        shelfLife: "24 months",
        packaging: "25kg PP bags, 50kg jute bags, Custom",
        minOrder: "500 kg",
    },
    {
        id: 2,
        name: "Ashwagandha",
        latin: "Withania somnifera",
        image: "https://images.unsplash.com/photo-1667553840528-16e983319a21?w=600&h=400&fit=crop&q=80",
        gradient: "from-stone-900/60 to-stone-700/60",
        description: "KSM-66® and regular root powder grades. Withanolide content tested batch-by-batch. EU Novel Food compliant documentation available.",
        tags: ["Root Powder", "5% Extract", "KSM-66®", "Capsule Grade"],
        specs: ["Withanolides: 5% min", "Moisture: max 8%", "Heavy metals: <10ppm"],
        intro: "Ashwagandha, often called 'Indian Ginseng', is one of the most important herbs in Ayurveda. It is classified as a Rasayana (rejuvenator) and has been used for over 3,000 years to relieve stress, increase energy levels, and improve concentration. Modern research validates its adaptogenic properties — helping the body manage stress and anxiety. Our Ashwagandha is cultivated in the arid regions of Rajasthan and Madhya Pradesh, where the climate produces roots with superior withanolide content.",
        origin: "Rajasthan & Madhya Pradesh, India",
        shelfLife: "24 months",
        packaging: "25kg fiber drums, Bulk bags",
        minOrder: "250 kg",
    },
    {
        id: 3,
        name: "Moringa",
        latin: "Moringa oleifera",
        image: "https://images.unsplash.com/photo-1638606979069-e0c8d735ca3f?w=600&h=400&fit=crop&q=80",
        gradient: "from-green-950/60 to-green-800/60",
        description: "USDA Organic certified leaf powder from Tamil Nadu. Spray-dried and air-dried options. Rich in iron, calcium, and antioxidants.",
        tags: ["Leaf Powder", "Seed Oil", "Organic", "Spray-Dried"],
        specs: ["Protein: min 25%", "Moisture: max 8%", "Iron: min 28mg/100g"],
        intro: "Moringa oleifera, known as the 'Miracle Tree' or 'Drumstick Tree', is native to the Indian subcontinent. Every part of this extraordinary plant — leaves, pods, seeds, bark, and roots — has nutritional and medicinal value. Moringa leaves contain 7x more Vitamin C than oranges, 4x more calcium than milk, and 2x more protein than yogurt. Our USDA Organic certified moringa is cultivated in Tamil Nadu's fertile red soil, ensuring maximum nutrient density and purity.",
        origin: "Tamil Nadu, India",
        shelfLife: "18 months",
        packaging: "5kg, 10kg, 25kg vacuum-sealed bags",
        minOrder: "200 kg",
    },
    {
        id: 4,
        name: "Cumin",
        latin: "Cuminum cyminum",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop&q=80",
        gradient: "from-amber-950/60 to-amber-800/60",
        description: "Rajasthan-origin cumin, machine-cleaned and sortex processed. Available as whole seeds, ground powder, and oleoresin extract.",
        tags: ["Whole Seeds", "Ground Powder", "Oleoresin", "Sortex Grade"],
        specs: ["Volatile oil: min 2.5%", "Moisture: max 9%", "Extraneous matter: nil"],
        intro: "Cumin is one of the world's most popular spices, second only to black pepper. India is the largest producer and consumer of cumin globally, with Rajasthan and Gujarat accounting for over 80% of India's production. Prized for its warm, earthy flavor and digestive benefits, cumin is essential in cuisines spanning Mexican, Indian, Middle Eastern, and North African traditions. Our premium Rajasthan-origin cumin undergoes machine-cleaning and sortex processing to ensure 99.5% purity and uniform seed quality.",
        origin: "Rajasthan & Gujarat, India",
        shelfLife: "24 months",
        packaging: "25kg PP bags, 50kg jute bags",
        minOrder: "1 MT",
    },
    {
        id: 5,
        name: "Fenugreek",
        latin: "Trigonella foenum-graecum",
        image: "https://images.unsplash.com/photo-1613544899464-5bb93212a36e?w=600&h=400&fit=crop&q=80",
        gradient: "from-yellow-950/60 to-amber-900/60",
        description: "High-diosgenin seeds (0.9-1.2%) from Gujarat. EU/US pesticide residue compliant. Used in nutraceuticals, food, and pharmaceutical applications.",
        tags: ["Seeds", "Powder", "4-HO Extract", "Pharma Grade"],
        specs: ["Diosgenin: 0.9-1.2%", "Moisture: max 9%", "Aflatoxin: negative"],
        intro: "Fenugreek is a versatile herb with a rich history dating back to ancient Egypt where it was used in embalming and as a culinary spice. In India, both the leaves (methi) and seeds are culinary staples. Medicinally, fenugreek is valued for its ability to help regulate blood sugar levels, boost testosterone, and aid digestion. Its high diosgenin content makes it crucial in pharmaceutical synthesis. Our fenugreek from Gujarat's fertile plains meets the most stringent EU/US pesticide residue limits.",
        origin: "Gujarat, India",
        shelfLife: "24 months",
        packaging: "25kg multi-wall paper bags, PP bags",
        minOrder: "500 kg",
    },
    {
        id: 6,
        name: "Holy Basil (Tulsi)",
        latin: "Ocimum tenuiflorum",
        image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=600&h=400&fit=crop&q=80",
        gradient: "from-green-900/60 to-teal-900/60",
        description: "Certified organic Rama Tulsi from Madhya Pradesh. Available as dry leaf, encapsulation-grade powder, and standardized ethanolic extract.",
        tags: ["Dry Leaf", "Powder", "Extract", "Essential Oil"],
        specs: ["Eugenol: min 0.5%", "Moisture: max 10%", "Certifications: USDA Organic"],
        intro: "Tulsi, or Holy Basil, is revered in India as the 'Queen of Herbs' and holds sacred status in Hindu culture, where it is worshipped as an incarnation of the goddess Lakshmi. Beyond its spiritual significance, Tulsi is a powerful adaptogen with documented anti-microbial, anti-inflammatory, and immunomodulatory properties. Modern research highlights its potential to combat stress, lower cortisol, and support respiratory health. Our Rama Tulsi variety, grown organically in Madhya Pradesh, delivers optimal eugenol content.",
        origin: "Madhya Pradesh, India",
        shelfLife: "18 months",
        packaging: "10kg, 25kg vacuum-sealed bags",
        minOrder: "200 kg",
    },
    {
        id: 7,
        name: "Ginger",
        latin: "Zingiber officinale",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=400&fit=crop&q=80",
        gradient: "from-orange-950/60 to-amber-950/60",
        description: "Kerala Cochin finger ginger — world's finest grade. Available fresh, dried slices, powder, oleoresin, and supercritical CO2 extract.",
        tags: ["Dried", "Powder", "Oleoresin", "CO2 Extract"],
        specs: ["Gingerols: min 5%", "Volatile oil: min 1.5%", "Moisture: max 12%"],
        intro: "Ginger has been traded as a spice for over 5,000 years and was one of the first spices exported from Asia to Europe. Kerala's Cochin ginger is globally recognized as the gold standard — prized for its high essential oil content, robust flavor, and superior gingerol concentration. It is integral to cuisines worldwide and has proven medicinal applications including anti-nausea, anti-inflammatory, and digestive support. Our Cochin finger ginger undergoes careful drying and processing to preserve its volatile oil profile.",
        origin: "Kerala, India",
        shelfLife: "24 months",
        packaging: "25kg, 50kg multi-wall bags, Drums",
        minOrder: "500 kg",
    },
    {
        id: 8,
        name: "Neem",
        latin: "Azadirachta indica",
        image: "https://images.unsplash.com/photo-1586779367558-fe55c78c9bda?w=600&h=400&fit=crop&q=80",
        gradient: "from-lime-950/60 to-emerald-950/60",
        description: "Cold-pressed neem seed oil (Azadirachtin >1000ppm), leaf powder, and bark aqueous extract. Used in agriculture, pharma, and cosmetics industries.",
        tags: ["Seed Oil", "Leaf Powder", "Bark Extract", "Azadirachtin"],
        specs: ["Azadirachtin: >1000ppm", "Free fatty acids: <1%", "Moisture: max 7%"],
        intro: "Neem, called the 'Village Pharmacy' in India, is one of the most versatile trees on earth. Every part — leaves, bark, seeds, oil, and flowers — has applications in agriculture, pharmaceuticals, and cosmetics. Neem's azadirachtin compound is a powerful natural insecticide, while its antiseptic and antifungal properties make it invaluable in skincare and oral care products. Our cold-pressed neem oil retains maximum azadirachtin potency, sourced from mature trees cultivated using sustainable agroforestry practices across Southern India.",
        origin: "Tamil Nadu & Karnataka, India",
        shelfLife: "12 months (oil), 24 months (powder)",
        packaging: "HDPE drums, PP bags",
        minOrder: "250 kg",
    },
    {
        id: 9,
        name: "Senna",
        latin: "Senna alexandrina",
        image: "https://images.unsplash.com/photo-1585090272812-005fb3dce7cb?w=600&h=400&fit=crop&q=80",
        gradient: "from-yellow-950/60 to-green-950/60",
        description: "Tinnevelly-origin senna, IP/BP/USP grade leaves and pods. Sennoside content certified 13-20%. Widely used in pharmaceutical laxative formulations.",
        tags: ["Leaves", "Pods", "Sennoside Extract", "USP Grade"],
        specs: ["Sennosides: 13-20%", "Moisture: max 10%", "Foreign matter: max 0.5%"],
        intro: "Senna, native to tropical regions, has been used as a natural laxative since the 9th century by Arab physicians. Tinnevelly Senna from Tamil Nadu is considered the world's finest grade — pharmaceutical companies across 60+ countries rely on it for laxative formulations. The plant's sennosides stimulate intestinal peristalsis and are listed in the pharmacopoeias of every major country (IP, BP, USP, EP). Our Tinnevelly senna is cultivated in the dry tracts of Tirunelveli district, hand-harvested, and shade-dried to preserve sennoside content.",
        origin: "Tirunelveli, Tamil Nadu, India",
        shelfLife: "36 months",
        packaging: "25kg bales, PP bags, Fiber drums",
        minOrder: "500 kg",
    },
];

/* ── Product Detail Modal ─────────────────────── */
function ProductModal({ product, onClose }) {
    if (!product) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
                className="relative z-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-bg-dark border border-gold/30 rounded-3xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--gold) transparent' }}
            >
                {/* Hero Image */}
                <div className="relative h-56 md:h-72 overflow-hidden rounded-t-3xl">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent`} />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/70 transition-all duration-300"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-6 left-8">
                        <p className="font-quote text-sm text-gold/80 italic mb-1">{product.latin}</p>
                        <h3 className="font-display text-3xl md:text-4xl text-cream">{product.name}</h3>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    {/* Introduction */}
                    <div>
                        <h4 className="font-display text-xl text-gold mb-3 flex items-center gap-2">
                            <Leaf size={18} /> About this Product
                        </h4>
                        <p className="font-body text-muted leading-relaxed text-sm">
                            {product.intro}
                        </p>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Origin', value: product.origin, icon: '🌍' },
                            { label: 'Shelf Life', value: product.shelfLife, icon: '📅' },
                            { label: 'Packaging', value: product.packaging, icon: '📦' },
                            { label: 'Min. Order', value: product.minOrder, icon: '⚖️' },
                        ].map((info) => (
                            <div key={info.label} className="bg-bg-card border border-[var(--border-gold)] rounded-xl p-3 text-center">
                                <span className="text-lg">{info.icon}</span>
                                <p className="font-body text-xs text-muted mt-1">{info.label}</p>
                                <p className="font-body text-sm text-cream font-medium mt-0.5">{info.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Available Forms */}
                    <div>
                        <h4 className="font-display text-lg text-cream mb-3 flex items-center gap-2">
                            <Package size={16} className="text-gold" /> Available Forms
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-1.5 text-xs font-body text-gold border border-gold/30 rounded-full bg-gold/5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Quality Specs */}
                    <div>
                        <h4 className="font-display text-lg text-cream mb-3 flex items-center gap-2">
                            <Beaker size={16} className="text-gold" /> Quality Specifications
                        </h4>
                        <div className="bg-bg-card border border-[var(--border-gold)] rounded-xl p-4">
                            {product.specs.map((spec, idx) => (
                                <div
                                    key={spec}
                                    className={`flex items-center gap-3 py-2 ${idx < product.specs.length - 1 ? 'border-b border-[var(--border-gold)]' : ''}`}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                                    <p className="font-body text-sm text-muted">{spec}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                setTimeout(() => {
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                }, 300);
                            }}
                            className="shimmer flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-bg-dark font-body font-semibold text-sm tracking-wider rounded-full hover:bg-gold-light transition-colors duration-300"
                        >
                            Request Quote for {product.name} <ExternalLink size={16} />
                        </a>
                        <a
                            href={`https://wa.me/919600852141?text=Hi, I'm interested in ${product.name} (${product.latin}). Please share pricing and availability.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border border-green-700/50 text-green-400 font-body font-medium text-sm tracking-wider rounded-full hover:bg-green-900/20 transition-all duration-300"
                        >
                            WhatsApp Inquiry
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── Products Section ─────────────────────────── */
export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <>
            <section id="products" className="bg-bg-dark relative">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="font-body text-lime text-sm tracking-[0.3em] uppercase mb-4">
                            Our Portfolio
                        </p>
                        <h2 className="font-display text-4xl md:text-6xl text-cream">
                            Premium Herbal <span className="text-gold italic">Exports</span>
                        </h2>
                        <p className="font-body text-muted text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
                            Every product is sourced from certified farms, processed in our GMP facility,
                            and tested to meet international pharmacopoeia standards.
                            <span className="text-gold/60 block mt-2 text-sm">Click any product to learn more →</span>
                        </p>
                    </motion.div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PRODUCTS.map((product, i) => (
                            <motion.div
                                key={product.id}
                                className="group relative bg-bg-card border border-[var(--border-gold)] rounded-2xl overflow-hidden hover:border-[var(--border-hover)] transition-all duration-300 cursor-pointer"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: i * 0.08, duration: 0.6 }}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: '0 0 30px rgba(200,169,110,0.25)',
                                }}
                                onClick={() => setSelectedProduct(product)}
                            >
                                {/* Image Header */}
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient}`} />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                                    {/* Click indicator */}
                                    <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ExternalLink size={14} className="text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <h3 className="font-display text-2xl text-cream group-hover:text-gold transition-colors duration-300">
                                            {product.name}
                                        </h3>
                                        <span className="font-quote text-sm text-muted italic">
                                            {product.latin}
                                        </span>
                                    </div>

                                    <p className="font-body text-muted text-sm leading-relaxed mb-4">
                                        {product.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs font-body text-gold/80 border border-[var(--border-gold)] rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Specs */}
                                    <div className="space-y-1 pt-3 border-t border-[var(--border-gold)]">
                                        {product.specs.map((spec) => (
                                            <p key={spec} className="font-body text-xs text-dim">
                                                • {spec}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
