import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Search, 
  Layers, 
  MapPin, 
  Award, 
  Package, 
  Info, 
  ArrowRight,
  X,
  CheckCircle2,
  FileCheck,
  Weight,
  Sparkles
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   PRODUCT DATA
   ═══════════════════════════════════════════════ */

const PRODUCTS = [
  {
    id: 'turmeric',
    sku: 'SR-TUM-ERD',
    name: 'Premium Turmeric',
    category: 'Ground Spices',
    origin: 'Erode, Tamil Nadu',
    grade: 'Curcumin 5.0%+',
    forms: ['Powder', 'Polished Bulbs', 'Finger Double Polished'],
    moq: '5 Tonnes',
    desc: 'Deep golden-yellow turmeric, celebrated worldwide for its high curcumin content, warm earthy aroma, and potent therapeutic properties. Sourced from the volcanic soils of Erode.',
    useCase: 'Food manufacturers, wellness brands, culinary blends, pharmaceutical extractions.',
    color: 'rgba(130, 85, 0, 0.08)',
    borderColor: 'rgba(130, 85, 0, 0.25)',
    textColor: 'var(--gold)',
  },
  {
    id: 'red-chili',
    sku: 'SR-CHL-GUN',
    name: 'Guntur S17 Red Chili',
    category: 'Ground Spices',
    origin: 'Guntur, Andhra Pradesh',
    grade: 'ASTA 120+ / Premium',
    forms: ['Whole Stemless', 'Whole With Stem', 'Crushed Flakes', 'Fine Powder'],
    moq: '5 Tonnes',
    desc: 'Renowned globally for its intense pungency, vibrant red color, and sharp aroma. Guntur S17 is the gold standard for global spice importers looking for authentic heat.',
    useCase: 'Hot sauces, curry powders, bulk food manufacturing, meat processing.',
    color: 'rgba(200, 80, 26, 0.08)',
    borderColor: 'rgba(200, 80, 26, 0.25)',
    textColor: 'var(--saffron)',
  },
  {
    id: 'cumin-seeds',
    sku: 'SR-CUM-GUJ',
    name: 'Jeera (Cumin Seeds)',
    category: 'Seeds',
    origin: 'Gujarat & Rajasthan',
    grade: 'Singapore 99% / Extra Bold',
    forms: ['Whole Seeds', 'Ground Powder'],
    moq: '10 Tonnes',
    desc: 'Highly aromatic seeds with a rich, warm, and slightly bitter flavor profile. Cleaned through advanced multi-stage color sortex processing to ensure absolute purity.',
    useCase: 'Bakery products, savory snack manufacture, spice mix blending, essential oil distillation.',
    color: 'rgba(130, 85, 0, 0.05)',
    borderColor: 'rgba(130, 85, 0, 0.2)',
    textColor: '#825500',
  },
  {
    id: 'black-pepper',
    sku: 'SR-PEP-WYD',
    name: 'Tellicherry Black Pepper',
    category: 'Whole Spices',
    origin: 'Wayanad, Kerala',
    grade: 'MG-1 / Bold 550 G/L',
    forms: ['Whole Berries', 'Cracked Pepper', 'Coarse/Fine Ground'],
    moq: '3 Tonnes',
    desc: 'The historic "Black Gold" of India. Hand-harvested from the pristine hills of Wayanad, these dried berries offer a powerful, complex heat with citrus and pine undertones.',
    useCase: 'Fine dining chains, premium food seasoning, meat preservation, global retailers.',
    color: 'rgba(27, 28, 25, 0.08)',
    borderColor: 'rgba(27, 28, 25, 0.2)',
    textColor: 'var(--midnight)',
  },
  {
    id: 'green-cardamom',
    sku: 'SR-CAR-IDK',
    name: 'Exotic Green Cardamom',
    category: 'Whole Spices',
    origin: 'Idukki, Kerala',
    grade: 'MNC Bold 8mm+',
    forms: ['Whole Green Pods', 'Decorticated Seeds', 'Ground Powder'],
    moq: '1 Tonne',
    desc: 'The Queen of Spices. Exceptionally plump, emerald-green pods loaded with highly fragrant essential oils. Offers a sweet, eucalyptus-like aroma and warm spice taste.',
    useCase: 'Luxury confectionery, gourmet teas, premium bakery, perfume industry.',
    color: 'rgba(70, 101, 87, 0.08)',
    borderColor: 'rgba(70, 101, 87, 0.25)',
    textColor: 'var(--cardamom)',
  },
  {
    id: 'cinnamon',
    sku: 'SR-CIN-KAN',
    name: 'True Ceylon Cinnamon',
    category: 'Whole Spices',
    origin: 'Kannur, Kerala',
    grade: 'Grade-A Quills',
    forms: ['Whole Quills', 'Scraped Quills', 'Ground Powder'],
    moq: '2 Tonnes',
    desc: 'Authentic sweet cinnamon with multilayered quills, offering a sweet-woody aroma and delicate spicy flavor. Sun-dried and carefully sorted for length and uniformity.',
    useCase: 'Bakery formulas, spice mixes, beverage distillation, premium retail packs.',
    color: 'rgba(139, 26, 26, 0.08)',
    borderColor: 'rgba(139, 26, 26, 0.25)',
    textColor: '#8B1A1A',
  },
  {
    id: 'coriander-seeds',
    sku: 'SR-COR-KOT',
    name: 'Premium Coriander Seeds',
    category: 'Seeds',
    origin: 'Kota, Rajasthan',
    grade: 'Eagle Quality / Double Parrot',
    forms: ['Whole Seeds', 'Split Seeds', 'Ground Powder'],
    moq: '5 Tonnes',
    desc: 'Bright golden-green seeds with a fragrant citrusy, floral, and slightly sweet flavor. Highly prized for their outstanding aroma and oil content.',
    useCase: 'Curry base powders, sausage seasoning, pickling blends, brewing industries.',
    color: 'rgba(130, 85, 0, 0.05)',
    borderColor: 'rgba(130, 85, 0, 0.2)',
    textColor: '#825500',
  },
  {
    id: 'saffron',
    sku: 'SR-SAF-PMP',
    name: 'Kashmiri Mongra Saffron',
    category: 'Herbs',
    origin: 'Pampore, Kashmir',
    grade: 'Grade A1+++ ISO 3632',
    forms: ['100% Pure Threads'],
    moq: '10 Kg',
    desc: 'The most expensive and premium spice in the world. Hand-harvested stigmas from purple crocuses in Pampore. Offers an intense aroma, golden dye power, and deep crimson threads.',
    useCase: 'Luxury confectioneries, pharmaceutical research, premium restaurant groups, royal blends.',
    color: 'rgba(200, 80, 26, 0.08)',
    borderColor: 'rgba(200, 80, 26, 0.25)',
    textColor: 'var(--saffron)',
  },
  {
    id: 'garam-masala',
    sku: 'SR-BLN-GRM',
    name: 'Royal Garam Masala Blend',
    category: 'Blends',
    origin: 'Artisan Crafted (Chennai)',
    grade: '100% Pure Custom Blend',
    forms: ['Fine Powder'],
    moq: '2 Tonnes',
    desc: 'A closely-guarded corporate recipe blending 15 exotic spices. Free from artificial fillers, colors, or MSG. Delivers the ultimate aromatic balance for premium cooking.',
    useCase: 'FMCG retail distributors, gourmet food packaging, high-end curry manufacturing.',
    color: 'rgba(130, 85, 0, 0.08)',
    borderColor: 'rgba(130, 85, 0, 0.25)',
    textColor: 'var(--gold)',
  },
  {
    id: 'curry-powder',
    sku: 'SR-BLN-MDR',
    name: 'Madras Curry Powder',
    category: 'Blends',
    origin: 'Authentic Southern Recipe',
    grade: 'Export Grade Premium',
    forms: ['Fine Powder'],
    moq: '5 Tonnes',
    desc: 'An internationally celebrated Southern Indian style curry powder, balancing mild chili heat with coriander, turmeric, black pepper, and fenugreek. Superbly aromatic.',
    useCase: 'Global food importers, European supermarkets, bulk sauce processing.',
    color: 'rgba(200, 80, 26, 0.08)',
    borderColor: 'rgba(200, 80, 26, 0.25)',
    textColor: 'var(--saffron)',
  }
];

const CATEGORIES = ['All', 'Whole Spices', 'Ground Spices', 'Seeds', 'Blends', 'Herbs'];

const PACKAGING_OPTIONS = [
  {
    icon: Package,
    title: 'Multi-layer Kraft Paper Bags',
    capacity: '15 Kg / 25 Kg',
    desc: 'Equipped with food-grade inner poly-liners to prevent moisture absorption and retain critical volatile oil aromas during sea shipping.',
    badge: 'Recommended for Powders'
  },
  {
    icon: Weight,
    title: 'PP/Burlap Jute Sacks',
    capacity: '25 Kg / 50 Kg',
    desc: 'Heavy-duty weave, highly breathable and durable jute sacks. Perfect for whole seeds, pods, and dry chilies requiring ventilation.',
    badge: 'Classic Trade Standard'
  },
  {
    icon: Layers,
    title: 'Custom Retail Packaging',
    capacity: '50g to 1Kg Pouches',
    desc: 'Pre-labeled custom packaging options including vacuum-sealed standing pouches, glass jars, and cardboard containers for direct retail.',
    badge: 'Private Label Ready'
  }
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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 }
  }
};

/* ═══════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════ */

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  
  // Quick Inquiry Form State inside Drawer
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    volume: '',
    message: ''
  });

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [packRef, packInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prod.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prod.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setSelectedProduct(null);
      setFormData({ name: '', company: '', country: '', email: '', volume: '', message: '' });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#fbf9f4] overflow-hidden pt-[80px]">
      <div className="absolute inset-0 grain-overlay pointer-events-none z-0" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/images/spice-products.png" 
            alt="SpiceRoute Global Spice Collection" 
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(27,28,25,0.85) 0%, rgba(27,28,25,0.65) 50%, rgba(27,28,25,0.9) 100%)'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center container-custom space-y-4">
          <motion.span 
            className="font-mono text-xs tracking-[0.3em] text-[var(--gold-light)] block uppercase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            THE VAULT OF ORIGIN
          </motion.span>
          <motion.h1 
            className="font-display font-semibold text-white tracking-tight leading-tight"
            style={{ fontSize: 'clamp(38px, 6vw, 76px)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Spice <span className="italic font-normal gold-shimmer">Catalog</span>
          </motion.h1>
          <motion.p 
            className="font-body text-sm md:text-base max-w-xl text-neutral-300 mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Explore our curated selection of high-value raw agricultural materials. Structured grades, fully traceable nodes, and zero-defect quality parameters.
          </motion.p>
        </div>

        {/* Bottom border fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--cream) 0%, transparent 100%)' }} />
      </section>

      {/* 2. CATALOG CONTROLS SECTION */}
      <section className="section-padding pt-12 relative z-10">
        <div className="container-custom">
          
          {/* Controls Bar */}
          <motion.div 
            ref={headerRef}
            className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Search Input Bar (Strict Sharp Outline) */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4.5 h-4.5" />
              <input 
                type="text"
                placeholder="Search by catalog name, SKU, origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-neutral-300 bg-white placeholder-neutral-400 text-neutral-800 focus:outline-none focus:ring-0 focus:border-[var(--gold)] transition-colors text-xs font-mono"
              />
            </div>

            <div className="flex items-center gap-2">
              <Award className="text-[var(--gold)] w-4.5 h-4.5 animate-pulse" />
              <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-500 font-bold">
                {filteredProducts.length} Specifications Loaded
              </span>
            </div>
          </motion.div>

          {/* Filter Category Tabs (Strict Sharp Outline) */}
          <motion.div 
            className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 font-mono text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 focus:outline-none ${
                  selectedCategory === cat
                    ? 'bg-[var(--midnight)] text-white border border-neutral-800'
                    : 'bg-white hover:bg-neutral-100 text-neutral-500 border border-neutral-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Catalog Grid */}
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod, i) => (
                <motion.div
                  layout
                  key={prod.id}
                  variants={fadeUp}
                  custom={i}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-none p-6 border border-neutral-300/80 hover:border-[var(--gold)] hover:shadow-lg transition-all duration-400 ease-out group flex flex-col justify-between"
                >
                  <div>
                    {/* Category & SKU */}
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="px-2.5 py-1 font-mono text-[9px] font-bold tracking-wider uppercase border"
                        style={{ 
                          backgroundColor: prod.color, 
                          borderColor: prod.borderColor,
                          color: prod.textColor
                        }}
                      >
                        {prod.category}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400 font-bold">{prod.sku}</span>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-display text-xl font-bold text-neutral-800 mb-2 group-hover:text-[var(--saffron)] transition-colors duration-300">
                      {prod.name}
                    </h3>

                    {/* Product Short Desc */}
                    <p className="font-body text-xs text-neutral-500 leading-relaxed mb-4 line-clamp-3">
                      {prod.desc}
                    </p>
                  </div>

                  <div>
                    {/* Technical details list */}
                    <div className="border-t border-neutral-200 pt-4 mb-4 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">GRADE:</span>
                        <span className="font-bold text-neutral-700">{prod.grade}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">MOQ:</span>
                        <span className="font-bold text-[var(--saffron)]">{prod.moq}</span>
                      </div>
                    </div>

                    {/* Explore button */}
                    <button 
                      onClick={() => setSelectedProduct(prod)}
                      className="w-full py-3 bg-[var(--midnight)] text-white hover:bg-[var(--gold)] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 shadow-sm"
                    >
                      EXPLORE SPECIFICATIONS
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div 
              className="text-center py-16 bg-white/40 border border-neutral-300 max-w-md mx-auto mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Info className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-neutral-700 mb-1">No Catalogues Found</h3>
              <p className="font-body text-xs text-neutral-500 px-6 leading-relaxed">
                We couldn't find any specifications matching "{searchQuery}". Try modifying your filter tabs or search terms.
              </p>
            </motion.div>
          )}

        </div>
      </section>

      {/* 3. LOGISTICS PACKAGING SPECIFICATIONS */}
      <section 
        ref={packRef}
        className="section-padding bg-[#f5f3ee] border-t border-neutral-200"
      >
        <div className="container-custom">
          {/* Header */}
          <div className="section-header text-center mx-auto mb-16 max-w-xl">
            <span className="section-label">LOGISTICAL PROTOCOLS</span>
            <h2 className="section-title">Export Packaging Standard</h2>
            <p className="section-subtitle mx-auto">
              Preserving high-value volatile oils and organic purity from tropical drying yards to overseas delivery centers.
            </p>
          </div>

          {/* Packaging Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {PACKAGING_OPTIONS.map((pack, i) => {
              const IconComponent = pack.icon;
              return (
                <motion.div
                  key={pack.title}
                  className="bg-white border border-neutral-300 p-8 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 30 }}
                  animate={packInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <div>
                    <div className="w-12 h-12 bg-[var(--midnight)] flex items-center justify-center mb-6 border border-neutral-800">
                      <IconComponent className="text-[var(--gold-light)] w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] tracking-wider uppercase bg-[var(--gold)]/10 text-[var(--gold)] px-2.5 py-1 inline-block font-bold mb-4">
                      {pack.badge}
                    </span>
                    <h3 className="font-display text-xl font-bold text-neutral-800 mb-1">
                      {pack.title}
                    </h3>
                    <span className="font-mono text-[10px] text-neutral-400 block mb-4 uppercase">CAPACITY: {pack.capacity}</span>
                    <p className="font-body text-xs text-neutral-500 leading-relaxed font-light">
                      {pack.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRIVATE LABEL CTA */}
      <section className="section-padding bg-[var(--midnight)] text-white relative overflow-hidden border-t border-neutral-800">
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
        
        <div className="container-custom relative z-10 text-center max-w-3xl space-y-6">
          <Sparkles className="text-[var(--gold)] w-8 h-8 mx-auto mb-2 animate-pulse" />
          <h2 className="font-display text-3xl md:text-5xl font-medium text-white leading-tight">
            Custom Blends & <span className="italic font-normal gold-shimmer">Private Labeling</span>
          </h2>
          <p className="font-body text-xs md:text-sm text-neutral-400 leading-relaxed max-w-xl mx-auto font-light">
            Our Chennai milling plants provide tailor-made pulverization mesh parameters, customized multi-commodity formulations, and private retail-ready packing schedules for global franchises.
          </p>
          <div className="pt-4">
            <a 
              href="/contact?subject=Custom Blending Request"
              className="btn-primary bg-[var(--gold)] text-white hover:bg-white hover:text-black border-transparent font-mono text-[11px]"
            >
              INQUIRE SPECIFIC RECIPE <ArrowRight size={12} className="inline ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. SLIDING B2B TRADE INQUIRY DRAWER MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[99999] flex justify-end">
            
            {/* Backdrop overlay */}
            <motion.div 
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
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
                onClick={() => setSelectedProduct(null)}
                className="self-end mb-8 flex items-center gap-1.5 text-neutral-400 hover:text-[var(--text-dark)] focus:outline-none font-mono text-[10px] tracking-wider uppercase font-bold group"
              >
                <span>CLOSE</span>
                <X size={14} className="group-hover:text-[var(--gold)] transition-colors" />
              </button>

              <div className="flex-1 overflow-y-auto pr-2 scrollbar-none space-y-8">
                
                {/* Product Headers */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span 
                      className="px-2 py-0.5 font-mono text-[8px] font-bold tracking-wider uppercase border"
                      style={{ 
                        backgroundColor: selectedProduct.color, 
                        borderColor: selectedProduct.borderColor,
                        color: selectedProduct.textColor
                      }}
                    >
                      {selectedProduct.category}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">{selectedProduct.sku}</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-dark)] mb-4">
                    {selectedProduct.name}
                  </h3>
                  
                  <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed">
                    {selectedProduct.desc}
                  </p>
                </div>

                {/* Tech specifications monospaced */}
                <div className="border border-neutral-300 p-6 bg-[var(--cream-dark)] space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <span className="text-neutral-400 uppercase font-bold">origin node:</span>
                    <span className="font-bold text-neutral-700">{selectedProduct.origin}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <span className="text-neutral-400 uppercase font-bold">quality grade:</span>
                    <span className="font-bold text-neutral-700">{selectedProduct.grade}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <span className="text-neutral-400 uppercase font-bold">minimum order:</span>
                    <span className="font-bold text-[var(--saffron)]">{selectedProduct.moq}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 uppercase font-bold">available forms:</span>
                    <span className="font-bold text-neutral-700">{selectedProduct.forms.join(', ')}</span>
                  </div>
                </div>

                {/* Applications Usecases */}
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] tracking-wider text-neutral-400 font-bold uppercase">Standard B2B Applications</h4>
                  <p className="font-body text-xs text-neutral-600 leading-relaxed font-light">{selectedProduct.useCase}</p>
                </div>

                {/* Trade Inquiry Form */}
                <div className="border-t border-neutral-200 pt-8">
                  <h4 className="font-mono text-[10px] tracking-wider text-[var(--gold)] font-bold uppercase mb-6">Request trade sample / price quota</h4>

                  {inquirySubmitted ? (
                    <motion.div 
                      className="p-6 bg-green-50 border border-green-200 text-green-800 flex items-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FileCheck className="w-8 h-8 text-green-500 flex-shrink-0" />
                      <div>
                        <h5 className="font-bold text-xs font-mono uppercase">Trade Inquiry Logged</h5>
                        <p className="text-[10px] text-green-600/80 mt-0.5 leading-relaxed">
                          Your quote request for {selectedProduct.name} has been filed. A logistics officer 
                          will contact your trade email with schedules within 12 hours.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-6">
                      
                      {/* Name & Company */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="font-mono text-[9px] tracking-wider text-neutral-400 font-bold uppercase block mb-1">Your Name *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Richard Hend"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-transparent border-0 border-b border-neutral-300 py-2.5 focus:ring-0 focus:border-[var(--gold)] placeholder-neutral-300 text-xs focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <label className="font-mono text-[9px] tracking-wider text-neutral-400 font-bold uppercase block mb-1">Company *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. EuroFoods GmbH"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            className="w-full bg-transparent border-0 border-b border-neutral-300 py-2.5 focus:ring-0 focus:border-[var(--gold)] placeholder-neutral-300 text-xs focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email & Volume */}
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 relative">
                          <label className="font-mono text-[9px] tracking-wider text-neutral-400 font-bold uppercase block mb-1">Business Email *</label>
                          <input 
                            type="email" 
                            required
                            placeholder="buyer@eurofoods.de"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-transparent border-0 border-b border-neutral-300 py-2.5 focus:ring-0 focus:border-[var(--gold)] placeholder-neutral-300 text-xs focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <label className="font-mono text-[9px] tracking-wider text-neutral-400 font-bold uppercase block mb-1">Target Volume *</label>
                          <input 
                            type="text" 
                            required
                            placeholder={`Min: ${selectedProduct.moq}`}
                            value={formData.volume}
                            onChange={(e) => setFormData({...formData, volume: e.target.value})}
                            className="w-full bg-transparent border-0 border-b border-neutral-300 py-2.5 focus:ring-0 focus:border-[var(--gold)] placeholder-neutral-300 text-xs focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="relative">
                        <label className="font-mono text-[9px] tracking-wider text-neutral-400 block mb-1 uppercase font-bold">Specification Notes & Message</label>
                        <textarea 
                          rows="3"
                          placeholder="Describe your mesh size, pesticide compliance, shipping timelines, or sample dispatch requests..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-transparent border-0 border-b border-neutral-300 py-2.5 focus:ring-0 focus:border-[var(--gold)] placeholder-neutral-300 text-xs focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <button 
                        type="submit"
                        className="w-full py-4 bg-[var(--gold)] text-white hover:bg-[var(--midnight)] font-mono text-[11px] font-bold tracking-wider uppercase transition-colors duration-300"
                      >
                        SUBMIT INQUIRY DOCKET
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
