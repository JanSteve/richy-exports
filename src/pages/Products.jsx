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
   PRODUCTS DATABASE
   ═══════════════════════════════════════════════ */

const PRODUCTS = [
  {
    id: 'turmeric',
    sku: 'RY-TUM-ERD',
    name: 'Premium Turmeric',
    category: 'Ground Spices',
    origin: 'Erode, Tamil Nadu',
    grade: 'Curcumin 5.0%+',
    forms: ['Powder', 'Polished Bulbs', 'Double Polished Fingers'],
    moq: '5 Tonnes',
    desc: 'Deep golden-yellow turmeric, celebrated worldwide for its high curcumin content, warm earthy aroma, and potent quality. Sourced from the cooperative fields of Erode.',
    useCase: 'Food manufacturers, wholesale distributors, culinary blends, pharmaceuticals.',
    color: 'rgba(121, 89, 33, 0.08)',
    borderColor: 'rgba(121, 89, 33, 0.25)',
    textColor: 'var(--gold)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0la8QCOTGkClDn5xzUHtfqYjk7OETOTkpojEdMhGSkhIRkQJl6YJq8Npqx3SR6Xq3l58lCutg8CT5hnZc46zd0QclR7KZe9DYlNlT0KR1jlnr0syA1Whi8AIdDj8kuKNVuL6GopURqYnm_mqjHQWAnyyK-A8-VHMMa-JYeNCG82hUq6zHbsryLCDSc_fRq0BdT-vOH38hzk8hT9S7Zpy03Xj-N0pTViOKQXRGrvE1xjophULyN7xyGF32HCQL5G3jGoouia0i_oQ'
  },
  {
    id: 'saffron',
    sku: 'RY-SAF-PMP',
    name: 'Kashmiri Mongra Saffron',
    category: 'Whole Spices',
    origin: 'Pampore, Kashmir',
    grade: 'Grade A1+++ ISO 3632',
    forms: ['100% Pure Saffron Threads'],
    moq: '10 Kilograms',
    desc: 'The gold standard of Kashmiri saffron. Hand-harvested crimson crocus stigmas offering highly intense safranal aroma and colouring strength.',
    useCase: 'Luxury gourmet packaging, retail food chains, wellness brands.',
    color: 'rgba(139, 77, 66, 0.08)',
    borderColor: 'rgba(139, 77, 66, 0.25)',
    textColor: 'var(--saffron)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMu83a2wYjV9JMUdAFONhwxKMT_kyEQ3rUmo8_1zHlQOS8tg3Eg2COrKoU7MPZ-AHc_hzBcBTvB-1iPUybQwQ3SCZZQsiOZr3SPKJu28RDI7Nuh8bsJxoh_UqDIdXtKJGPgG2FAW_f-9ibwtbNgYx7xrmeYR0w4ZSuG-7d7qfA1Qsd9CV67UDDSm96_Z2oX5NSSgqxh09AU4dG6ZMv-H0lLpSoImEgInUQf-il3EQxlGLwB2m-OYTaVbutRUGOaDqTDHWZO8IgP2Q'
  },
  {
    id: 'merino-blankets',
    sku: 'RY-TEX-BHB',
    name: 'Premium Merino Blankets',
    category: 'Textiles',
    origin: 'Western Ghats Cooperative',
    grade: 'Double-Ply Thermal / Relief',
    forms: ['100% Organic Merino Wool', 'Industrial Relief Blend'],
    moq: '500 Units',
    desc: 'Heavyweight thermal blankets designed for institutional B2B contracts. Manufactured with zero-defect double-ply stitching. Famously supplied in our landmark Being Human contract.',
    useCase: 'Hospitality groups, relief desks, B2B wholesale distribution, private labels.',
    color: 'rgba(121, 89, 33, 0.06)',
    borderColor: 'rgba(121, 89, 33, 0.2)',
    textColor: 'var(--gold)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6znqPp4TI9SzfHCPWp3v-stN1hfKAxjGOWifIskNeYnyjAEmhbjUVLlAY6dYYl6hqzSbMolAbxb5zV0absAo4j6QdsxkMOhWVGjeSP9OlLNLQ-r4SMoucj_8SsSjvinWNr62VTm8v0pl_0K91o4FqRgeCrxSdZTteBgPiTEGfVBxWh8vbfLZMMTb-NB1lHccOMUU8TPBY1joCPSC48-q5xCPQnud4sbD6Ozk3vc08TTTmPyRgAuRAZu0EL_WhBC_tDzoYfoWcEA'
  },
  {
    id: 'silk-carpet',
    sku: 'RY-TEX-ISF',
    name: 'Artisanal Silk Carpet',
    category: 'Textiles',
    origin: 'Isfahan Looms',
    grade: '1.2 Million Knots/SQM',
    forms: ['Pure Silk Pile', 'Silk & Wool Blend'],
    moq: '1 Unit (Bespoke)',
    desc: 'Intricately hand-woven traditional Persian silk carpets with high knot density, organic herbal dye finishes, and extreme structural durability.',
    useCase: 'Luxury architectural projects, high-end interior galleries, private collectors.',
    color: 'rgba(139, 77, 66, 0.08)',
    borderColor: 'rgba(139, 77, 66, 0.25)',
    textColor: 'var(--saffron)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKintNBEfb9q6qaEKxamcbv1I7ksApJ2R6tlKFa7NnWkFhO4HWuFptOZ2Ysq6dt0REpJt0QEVaKOMQSc_JMug3vCdLStwSAGTflRQnLQTtqmInKp34jc74RXg49ximfeqZIW77I7cm8fHXWe1DIuIfezBQeBxv4mvlvZ2bfpfjFnA6ifpBpnuczbdXkUR8IJg9mPat0qkiLMejxI1PB3ldO0UVmzsjlQ_ascFq6a2abt9_XB9bvLcj5BvJb4ItmHox9qguCXhF3YM'
  },
  {
    id: 'black-pepper',
    sku: 'RY-PEP-WYD',
    name: 'Tellicherry Black Pepper',
    category: 'Whole Spices',
    origin: 'Western Ghats, Kerala',
    grade: 'MG-1 / Extra Bold 550 G/L',
    forms: ['Whole Berries', 'Cracked Pepper', 'Coarse Powder'],
    moq: '3 Tonnes',
    desc: 'The historic "Black Gold" of India. Sun-dried bold garbled black pepper berries offering a complex heat with high volatile oil metrics.',
    useCase: 'Seasoning producers, meat processors, fine dining groups, bulk packers.',
    color: 'rgba(27, 28, 25, 0.08)',
    borderColor: 'rgba(27, 28, 25, 0.2)',
    textColor: 'var(--midnight)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcMCWs4Obq7cLTV9nZdigEkpyhX-6OJnoP17ZI7sHam5sZPECK8jDpk42Ei5Y4WE0CCpg5eKSKPeftrgQr-5CTMyCvzSmPRgW_jGNy5Zb2LP-KlhtVNTvbCHBmRpKMROdUEIVzQY62F6HtYdTS9nWk7wqK5VudlgYb6l3mEcb9Wk3CMq5dN7K1FhwhS8wz_YbAQjql1Nr06IryKL26vU1jH7pVxgRJiMPRhzqeaPvrK3u7wTgPA9yIT5dfsSzIzUasta-QKDcw_7s'
  },
  {
    id: 'green-cardamom',
    sku: 'RY-CAR-IDK',
    name: 'Idukki Green Cardamom',
    category: 'Whole Spices',
    origin: 'Idukki, Kerala',
    grade: 'MNC Extra Bold 8mm+',
    forms: ['Whole Pods', 'Decorticated Seeds'],
    moq: '1 Tonne',
    desc: ' Plump, deep-green cardamom pods packed with sweet, highly fragrant essential oils. Color sorted and sifted at harvest.',
    useCase: 'Beverage blenders, high-end confectionery, luxury teas, perfumeries.',
    color: 'rgba(70, 101, 87, 0.08)',
    borderColor: 'rgba(70, 101, 87, 0.25)',
    textColor: '#466557',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVGxIkPELWv7BgvO6tckuhn0lg2WyBLWgBIeXP5lVG_juWLqzaeB-pwjlLz4GPqZEt6SnbRt4IOaXXPgIhsxvXqLfr-ZHtXy_7AtczFJ638iDGMHL-QrhKroF4p9UvnofjYstfgJvSl88iQjI67zEbtZj_QoQlz87uuuIsz3hQKdquQfV6_2KXIw9Nl4X-n48zgldnkVAWLVjRfjBsECdpBC9Tro1vMIkAq7vpWBcUIuhylJ5SvQwKQXH35VqPzX1DsfzoEioSTWg'
  },
  {
    id: 'red-chili',
    sku: 'RY-CHL-GUN',
    name: 'Guntur S17 Red Chili',
    category: 'Ground Spices',
    origin: 'Guntur, Andhra Pradesh',
    grade: 'ASTA 120+ / Premium Stemless',
    forms: ['Whole Stemless', 'Crushed Flakes', 'Fine Ground'],
    moq: '5 Tonnes',
    desc: 'Renowned globally for its intense pungency, vibrant red color, and sharp hot profile. Perfect for global food processors.',
    useCase: 'Supermarket packaging, industrial seasoning, bulk food brands.',
    color: 'rgba(139, 77, 66, 0.08)',
    borderColor: 'rgba(139, 77, 66, 0.25)',
    textColor: 'var(--saffron)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpg-K8YmVBVA4KAJ8KXPwx2OenomSGkLwObQbD4aF0qRpF9v2YJsIEUvHJiqwBwjXcisGkiSJRIJpFSySMrSiFed__Ksp41dMJDN3vyEHokNMgTxdwNLT2qhiJb9BFhP-HHfBbTITtm_61JDttbYuWn7jpD49QIlj4NAuqPYiT1vcBE4j6EF2fEtyQMMCeaRb1s7tigMRs_uLd3Ypr4M2b2iA-LOuE3eog0sl1BATpEBZBgVn44-de-DmSnmL3D-SRjCakNcVlLx4'
  },
  {
    id: 'relief-blankets',
    sku: 'RY-TEX-ORB',
    name: 'Organic Relief Blankets',
    category: 'Textiles',
    origin: 'Rajasthan Weaving Clusters',
    grade: 'Ultra-Comfort Eco Wool',
    forms: ['Recycled Wool Blend', 'Standard relief dimensions'],
    moq: '1,000 Units',
    desc: 'Sustainable, warm, breathable blankets manufactured for B2B institutional contracts, trade relief desks, and global disaster recovery networks.',
    useCase: 'Non-profit organizations, institutional procurement desks, relief agencies.',
    color: 'rgba(27, 28, 25, 0.08)',
    borderColor: 'rgba(27, 28, 25, 0.2)',
    textColor: 'var(--midnight)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyZlG_lEhOZ3ETyCY0rERkUoY0yP-ip9UvO8I2vFZACwaelwF7b0y-hsCvZ18Cchy9QPmZT4MImoaf8IWaW5jhM14GsKUIB7f_iWbw038CWKc6-370O_YgsPiefpBtO9ggPxJuPlyyCooYp9rEdaYBvDaUIjVfGqc4bdsDmI7TMV5FIZAq1Et5ywpRaXRpv_qHIBU2OnYdYKH2xmp3d6pW305GidYlzA5JdXTUy8G2GSSczLkxWoOcxS9qAuPqNizWN1QfI0-CkmA'
  },
  {
    id: 'cumin-seeds',
    sku: 'RY-CUM-GUJ',
    name: 'Jeera (Cumin Seeds)',
    category: 'Seeds',
    origin: 'Gujarat & Rajasthan',
    grade: 'Singapore 99% / Extra Bold',
    forms: ['Whole Seeds', 'Ground Powder'],
    moq: '10 Tonnes',
    desc: 'Highly aromatic cumin seeds with warm, earthy flavor profiles. Color-sorted and sifted to guarantee absolute purity.',
    useCase: 'SnackBar processing, custom baking mixes, wholesale distribution.',
    color: 'rgba(121, 89, 33, 0.05)',
    borderColor: 'rgba(121, 89, 33, 0.2)',
    textColor: '#825500',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6mGr5cW8NuV9U3HJtuiMidaz-T9MMqjBHT5TS-ES1vQGXvv_TTgmDJqyVo8_XhQvhe_tutqyjqSXs0NC2x6reK6BryfC7GauF39m8x7tHx8zTjW8Cl2cjTxuUo1SFUfgjQzkynpDZD7VN1OnL1uWxS_sSKOJ8L8CwtE-naB5bhsd_jGfhGXTyWzJRfGUMcnjZ2jPmB9FyxO6kI0zDLeY3nMGVAaRE9iMqLKAysRHszFkycRwuTIYX2gLjmhg4P58TB3GWA4_-Mks'
  }
];

const CATEGORIES = ['All', 'Whole Spices', 'Ground Spices', 'Seeds', 'Textiles'];

const PACKAGING_OPTIONS = [
  {
    icon: Package,
    title: 'Multi-layer Kraft Paper Bags',
    capacity: '15 Kg / 25 Kg',
    desc: 'Equipped with food-grade inner poly-liners to prevent moisture absorption and retain volatile oils during high-sea shipping.',
    badge: 'Recommended for Spices'
  },
  {
    icon: Weight,
    title: 'PP/Burlap Jute Sacks',
    capacity: '25 Kg / 50 Kg',
    desc: 'Heavy-duty, highly breathable jute sacks. Perfect for whole seeds, pods, and dry chilies requiring air ventilation.',
    badge: 'Classic Agri-Trade'
  },
  {
    icon: Layers,
    title: 'Custom B2B Bale Wrapping',
    capacity: 'Bespoke Balings',
    desc: 'Waterproof protective compressed canvas baling with custom security bands, ensuring textile cargo arrives 100% dust-free.',
    badge: 'Recommended for Textiles & Blankets'
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

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  
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
    }, 3500);
  };

  return (
    <div className="relative min-h-screen bg-[#fbf9f4] overflow-hidden pt-[120px]">
      <div className="absolute inset-0 grain-overlay pointer-events-none z-0 opacity-5" />

      {/* 1. SECTION HEADER */}
      <section 
        ref={headerRef}
        className="px-6 max-w-7xl mx-auto mb-16 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8 space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--gold)] font-bold block uppercase">
              EXPORT REGISTRY
            </span>
            <h1 className="font-display font-semibold text-[var(--text-dark)] leading-tight text-4xl md:text-6xl tracking-tight">
              Spices & Custom Textiles
            </h1>
          </div>
          <div className="md:col-span-4 pb-1">
            <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed font-light">
              Supplying certified food safety spice grades and heavy-capacity loom textiles to institutional B2B procurement desks globally.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FILTERS & SEARCH PANEL */}
      <section className="px-6 max-w-7xl mx-auto mb-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center border-b border-neutral-200 pb-6">
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
              placeholder="Search catalog..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs focus:ring-0 w-full placeholder:text-neutral-400 outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 hover:text-[var(--saffron)]">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID */}
      <section className="px-6 max-w-7xl mx-auto mb-24 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((prod, i) => (
                <motion.article
                  key={prod.id}
                  variants={fadeUp}
                  custom={i}
                  layoutId={prod.id}
                  className="bg-white border border-neutral-300 hover:border-[var(--gold)] hover:shadow-xl transition-all duration-500 flex flex-col h-full group"
                >
                  {/* Photo area */}
                  <div className="overflow-hidden aspect-[4/3] bg-neutral-100 relative border-b border-neutral-200">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 border border-[var(--border-gold)] px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[var(--gold)]">
                      {prod.category}
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                        <span>SKU: {prod.sku}</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={10} className="text-red-500" /> {prod.origin}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-neutral-850 group-hover:text-[var(--gold)] transition-colors">
                        {prod.name}
                      </h3>
                      <p className="font-body text-xs text-[var(--text-body)] leading-relaxed font-light line-clamp-3">
                        {prod.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-xs font-mono">
                      <div>
                        <span className="text-[9px] text-neutral-400 uppercase tracking-widest block mb-0.5">GRADE SPEC</span>
                        <span className="font-bold text-neutral-800">{prod.grade}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedProduct(prod)}
                        className="btn-primary bg-neutral-900 border-neutral-900 text-white hover:bg-[var(--gold)] hover:border-[var(--gold)] px-5 py-2.5 text-[10px] tracking-wider"
                      >
                        B2B ENQUIRY
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-24 border border-dashed border-neutral-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Info className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="font-display text-xl font-bold">No Products Found</h3>
              <p className="text-xs text-neutral-500 mt-2 font-light">Modify your query or clear filters to view specifications.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. PACKAGING SPECIFICATIONS */}
      <section 
        ref={packRef}
        className="section-padding bg-[#f5f3ee] border-t border-neutral-200 relative z-10"
      >
        <div className="container-custom">
          <div className="section-header text-center mx-auto mb-16 max-w-xl">
            <span className="section-label">MNC COMPLIANCE PACKAGING</span>
            <h2 className="section-title">Trade Preservation</h2>
            <p className="section-subtitle mx-auto">
              Our triple-tier security packaging system guarantees that volatile spice oils and textiles are protected under long high-sea voyages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGING_OPTIONS.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <motion.div
                  key={opt.title}
                  className="bg-white border border-neutral-300 p-8 flex flex-col justify-between group hover:border-[var(--gold)] transition-colors duration-300"
                  initial="hidden"
                  animate={packInView ? 'visible' : 'hidden'}
                  variants={fadeUp}
                  custom={i}
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 bg-[var(--midnight)] flex items-center justify-center text-white">
                      <Icon className="w-4.5 h-4.5 text-[var(--gold-light)]" />
                    </div>
                    <span className="inline-block bg-[var(--gold)]/10 text-[var(--gold)] text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 font-bold">
                      {opt.badge}
                    </span>
                    <h3 className="font-display text-lg font-bold text-neutral-850">{opt.title}</h3>
                    <p className="font-body text-xs text-[var(--text-muted)] leading-relaxed font-light">{opt.desc}</p>
                  </div>
                  <div className="border-t border-neutral-100 pt-4 mt-6 text-[10px] font-mono">
                    <span className="text-neutral-400 block mb-0.5">CAPACITY PROFILE</span>
                    <span className="font-bold text-neutral-850">{opt.capacity}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE B2B INQUIRY DRAWER / MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="relative bg-white border border-[var(--border-gold)] w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 grid grid-cols-1 md:grid-cols-2 rounded-none shadow-2xl custom-scrollbar"
            >
              {/* Left Photo & Specs info */}
              <div className="p-8 md:p-12 bg-neutral-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
                <div className="space-y-6">
                  <div className="overflow-hidden aspect-video border border-neutral-300 bg-neutral-200 shadow-inner">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-[var(--gold)] uppercase tracking-wider font-bold block">
                      PRODUCT TECHNICAL DOSSIER
                    </span>
                    <h2 className="font-display text-3xl font-semibold text-neutral-850">
                      {selectedProduct.name}
                    </h2>
                  </div>
                  
                  <p className="font-body text-xs text-[var(--text-body)] leading-relaxed font-light">
                    {selectedProduct.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4 font-mono text-[10px] bg-white p-4 border border-neutral-200">
                    <div>
                      <span className="text-neutral-400 block mb-0.5">GRADE STANDARD</span>
                      <span className="font-bold text-neutral-800">{selectedProduct.grade}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block mb-0.5">MOQ REQUIRED</span>
                      <span className="font-bold text-neutral-800">{selectedProduct.moq}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex items-center gap-2.5 font-mono text-[9px] text-neutral-400">
                  <FileCheck size={12} className="text-green-500" />
                  <span>SGS/Phytosanitary Certification Available</span>
                </div>
              </div>

              {/* Right Inquiry Form */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                >
                  <X size={18} />
                </button>

                {inquirySubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4"
                  >
                    <CheckCircle2 size={48} className="text-green-600 mx-auto animate-pulse" />
                    <h3 className="font-display text-2xl font-bold text-neutral-850">Enquiry Logged</h3>
                    <p className="font-body text-xs text-neutral-500 leading-relaxed font-light px-4">
                      Your procurement ticket for **{selectedProduct.name}** has been registered on the RICHY EXPORTS trade desk. Our logistics lead will dispatch a proforma quotation within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-5 text-xs">
                    <h3 className="font-display text-xl font-bold text-neutral-850 border-b border-neutral-100 pb-3 italic mb-4">
                      B2B Sourcing Enquiry
                    </h3>
                    
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Lead Buyer" 
                        className="w-full bg-transparent border-0 border-b border-neutral-300 py-2 outline-none focus:border-[var(--gold)] text-neutral-800 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">Organization</label>
                      <input 
                        type="text" 
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Global Procurement Ltd." 
                        className="w-full bg-transparent border-0 border-b border-neutral-300 py-2 outline-none focus:border-[var(--gold)] text-neutral-800 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="buyer@organization.com" 
                        className="w-full bg-transparent border-0 border-b border-neutral-300 py-2 outline-none focus:border-[var(--gold)] text-neutral-800 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">Country</label>
                        <input 
                          type="text" 
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          placeholder="Germany" 
                          className="w-full bg-transparent border-0 border-b border-neutral-300 py-2 outline-none focus:border-[var(--gold)] text-neutral-800 transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">Est. Volume (Kg/Units)</label>
                        <input 
                          type="text" 
                          required
                          value={formData.volume}
                          onChange={(e) => setFormData({...formData, volume: e.target.value})}
                          placeholder="e.g., 5 MT / 1000 Units" 
                          className="w-full bg-transparent border-0 border-b border-neutral-300 py-2 outline-none focus:border-[var(--gold)] text-neutral-800 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase font-bold">Specifications Required</label>
                      <textarea 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Detail shipping schedules, custom packaging, testing parameters..." 
                        rows={3}
                        className="w-full bg-transparent border-0 border-b border-neutral-300 py-2 outline-none focus:border-[var(--gold)] text-neutral-800 transition-colors resize-none text-[11px]"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4.5 bg-[var(--gold)] text-white hover:bg-neutral-900 font-mono text-[10px] uppercase tracking-widest font-bold transition-all duration-300 mt-4"
                    >
                      REQUEST TECHNICAL DOSSIER
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
