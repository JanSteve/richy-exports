import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    Send, 
    CheckCircle2, 
    Globe, 
    ShieldCheck, 
    FileText,
    HeartHandshake,
    Sparkles
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   ANIMATION CONFIGS
   ═══════════════════════════════════════════════ */

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
};

const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
    }
};

const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
    }
};

export default function Contact() {
    const location = useLocation();
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        country: '',
        email: '',
        phone: '',
        productInterest: 'Whole Spices',
        volume: '',
        message: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [mapRef, mapInView] = useInView({ triggerOnce: true, threshold: 0.2 });

    // Handle Query Parameters (e.g. ?subject=Custom%20Blend or ?product=Turmeric)
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const subjectParam = queryParams.get('subject');
        const productParam = queryParams.get('product');
        
        if (subjectParam) {
            setFormData(prev => ({
                ...prev,
                productInterest: 'Custom Blend',
                message: `Hi Trading Desk, I would like to inquire about: ${subjectParam}.`
            }));
        } else if (productParam) {
            setFormData(prev => ({
                ...prev,
                productInterest: 'Custom Blend',
                message: `Hi Trading Desk, I am specifically interested in sourcing: ${productParam}. Please share quotation and specification sheets.`
            }));
        }
    }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
            setFormData({
                name: '',
                company: '',
                country: '',
                email: '',
                phone: '',
                productInterest: 'Whole Spices',
                volume: '',
                message: ''
            });
        }, 4000);
    };

    return (
        <div className="relative min-h-screen bg-[var(--cream)] overflow-hidden">
            {/* Background grain overlay */}
            <div className="absolute inset-0 grain-overlay pointer-events-none z-0" />

            {/* 1. HERO SECTION */}
            <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
                {/* Background Grid Lines & Glows */}
                <div className="absolute inset-0 bg-neutral-950 z-0">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(var(--border-gold) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[var(--gold)]/10 blur-[120px]" />
                </div>
                
                <div className="relative z-10 text-center container-custom">
                    <motion.p 
                        className="font-mono text-xs tracking-[0.35em] uppercase mb-4"
                        style={{ color: 'var(--gold)' }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Export Trade Division
                    </motion.p>

                    <motion.h1 
                        className="font-display font-bold leading-tight mb-4 text-cream"
                        style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        The Trading <span className="italic gold-shimmer" style={{ WebkitTextFillColor: 'transparent' }}>Desk</span>
                    </motion.h1>

                    <motion.p 
                        className="font-body text-sm md:text-base max-w-xl mx-auto leading-relaxed text-neutral-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Establish a direct connection with our import-export specialists in Chennai. 
                        We facilitate bulk quotations, customized shipping specifications, and sample testing operations.
                    </motion.p>
                </div>

                {/* Bottom transition border */}
                <div 
                    className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, var(--cream) 0%, transparent 100%)' }}
                />
            </section>

            {/* 2. SPLIT LAYOUT SECTION */}
            <section className="section-padding relative z-10 pt-8">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        
                        {/* LEFT: INQUIRY FORM (7 cols on large screens) */}
                        <motion.div 
                            className="lg:col-span-7 bg-white/85 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-neutral-200 shadow-xl"
                            variants={fadeLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            <h2 className="font-display text-2xl font-bold text-neutral-800 mb-2 flex items-center gap-2">
                                <FileText className="text-[var(--gold)] w-6 h-6" />
                                B2B Trade Inquiry Form
                            </h2>
                            <p className="font-body text-xs text-neutral-500 mb-8 leading-relaxed">
                                Please specify your volumetric requirements, target shipping ports, and grade constraints. 
                                Fields marked with an asterisk (*) are mandatory.
                            </p>

                            {formSubmitted ? (
                                <motion.div 
                                    className="p-8 rounded-2xl bg-green-50 border border-green-200 flex flex-col items-center text-center text-green-800"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                                    <h3 className="font-display text-xl font-bold mb-2">Trade Request Dispatched</h3>
                                    <p className="font-body text-xs text-green-600 max-w-sm leading-relaxed mb-4">
                                        Your B2B trade file has been recorded successfully. A senior officer from our 
                                        Chennai desk will generate your custom pricing and documentation draft within 12 hours.
                                    </p>
                                    <span className="font-mono text-[10px] tracking-wider uppercase bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                                        Response SLA: 12 Hours Max
                                    </span>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Row 1: Name & Company */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Full Name *</label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="e.g. Richard Miller"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white placeholder-neutral-400 text-neutral-800 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Company / Organization *</label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="e.g. Apex Spice Distributors Inc."
                                                value={formData.company}
                                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white placeholder-neutral-400 text-neutral-800 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Country & Email */}
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Country *</label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="e.g. United Kingdom"
                                                value={formData.country}
                                                onChange={(e) => setFormData({...formData, country: e.target.value})}
                                                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white placeholder-neutral-400 text-neutral-800 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all shadow-sm"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Business Email *</label>
                                            <input 
                                                type="email" 
                                                required
                                                placeholder="buyer@apexspices.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white placeholder-neutral-400 text-neutral-800 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Phone & Product Interest */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Contact Phone / WhatsApp</label>
                                            <input 
                                                type="tel" 
                                                placeholder="e.g. +44 20 7946 0958"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white placeholder-neutral-400 text-neutral-800 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Product Interest *</label>
                                            <select 
                                                value={formData.productInterest}
                                                onChange={(e) => setFormData({...formData, productInterest: e.target.value})}
                                                className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white text-neutral-700 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all shadow-sm"
                                            >
                                                <option value="Whole Spices">Whole Spices (Cardamom, Pepper, Cloves...)</option>
                                                <option value="Ground Spices">Ground Spices (Turmeric, Red Chili, Coriander...)</option>
                                                <option value="Seeds">Seeds (Cumin, Mustard, Fennel, Fenugreek...)</option>
                                                <option value="Blends">Pre-Formulated Blends (Garam Masala, Curry...)</option>
                                                <option value="Custom Blend">Custom Blend & Private Label</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 4: Volume Required */}
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Target Volume (Metric Tonnes / Kg) *</label>
                                        <input 
                                            type="text" 
                                            required
                                            placeholder="e.g. 10 Metric Tonnes (FCL)"
                                            value={formData.volume}
                                            onChange={(e) => setFormData({...formData, volume: e.target.value})}
                                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white placeholder-neutral-400 text-neutral-800 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all shadow-sm"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Trade Specification & Message</label>
                                        <textarea 
                                            rows="5"
                                            placeholder="Specify grade parameters, pesticide residue constraints, mesh size, target discharge port (CIF/FOB), or packaging preferences..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white placeholder-neutral-400 text-neutral-800 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)] transition-all shadow-sm resize-none"
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="w-full py-4 rounded-xl bg-[var(--midnight)] hover:bg-[var(--saffron)] text-white font-body text-xs font-bold tracking-wider uppercase transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-lg border border-neutral-800"
                                    >
                                        Submit Trade Docket <Send className="w-3.5 h-3.5" />
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        {/* RIGHT: CONTACT INFORMATION (5 cols on large screens) */}
                        <motion.div 
                            className="lg:col-span-5 space-y-6"
                            variants={fadeRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            {/* Registered Office Box */}
                            <div className="bg-white/70 rounded-2xl p-6 border border-neutral-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[var(--gold)]/5 blur-xl group-hover:scale-125 transition-transform duration-500" />
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--midnight)] border border-neutral-800 flex-shrink-0">
                                        <MapPin className="text-[var(--gold)] w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-base font-bold text-neutral-800 mb-2">Registered Corporate Office</h3>
                                        <p className="font-body text-xs text-neutral-500 leading-relaxed font-medium">
                                            Richy Exports Pvt. Ltd.<br />
                                            42 Spice Trade Avenue, Nungambakkam,<br />
                                            Chennai 600034, Tamil Nadu, India.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Direct Line Contacts Box */}
                            <div className="bg-white/70 rounded-2xl p-6 border border-neutral-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                                <h3 className="font-display text-base font-bold text-neutral-800 mb-4 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-[var(--gold)]" /> Direct Trading Desk Lines
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100 text-xs">
                                        <span className="font-mono text-neutral-400">Head Office Phone:</span>
                                        <a href="tel:+914428204500" className="font-bold text-neutral-700 hover:text-[var(--saffron)] transition-colors">+91 44 2820 4500</a>
                                    </div>
                                    <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100 text-xs">
                                        <span className="font-mono text-neutral-400">Official WhatsApp:</span>
                                        <a href="https://wa.me/919840012345" target="_blank" rel="noopener noreferrer" className="font-bold text-green-600 hover:text-[var(--saffron)] transition-colors">+91 98400 12345</a>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-mono text-neutral-400">General Trade Email:</span>
                                        <a href="mailto:trade@richyexports.in" className="font-bold text-neutral-700 hover:text-[var(--saffron)] transition-colors">trade@richyexports.in</a>
                                    </div>
                                </div>
                            </div>

                            {/* Specialty Divisions Box */}
                            <div className="bg-white/70 rounded-2xl p-6 border border-neutral-200 shadow-sm">
                                <h3 className="font-display text-base font-bold text-neutral-800 mb-4 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-[var(--gold)]" /> Specialty Divisions Contact
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                                    <div className="p-3 bg-white/40 border border-neutral-100 rounded-xl">
                                        <span className="text-[10px] text-neutral-400 font-bold uppercase block mb-1">Whole Spices</span>
                                        <a href="mailto:whole@richyexports.in" className="font-bold text-neutral-600 hover:text-[var(--saffron)] break-all">whole@richyexports.in</a>
                                    </div>
                                    <div className="p-3 bg-white/40 border border-neutral-100 rounded-xl">
                                        <span className="text-[10px] text-neutral-400 font-bold uppercase block mb-1">Ground Spices</span>
                                        <a href="mailto:ground@richyexports.in" className="font-bold text-neutral-600 hover:text-[var(--saffron)] break-all">ground@richyexports.in</a>
                                    </div>
                                    <div className="p-3 bg-white/40 border border-neutral-100 rounded-xl col-span-2">
                                        <span className="text-[10px] text-neutral-400 font-bold uppercase block mb-1">Export Documentation</span>
                                        <a href="mailto:compliance@richyexports.in" className="font-bold text-neutral-600 hover:text-[var(--saffron)] break-all">compliance@richyexports.in</a>
                                    </div>
                                </div>
                            </div>

                            {/* Trading SLA & Timings Box */}
                            <div className="bg-[var(--midnight)] text-cream rounded-2xl p-6 border border-neutral-800 shadow-md relative overflow-hidden">
                                <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
                                <div className="relative z-10 flex gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-neutral-900 border border-neutral-800 flex-shrink-0">
                                        <Clock className="text-[var(--gold)] w-5 h-5" />
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <h3 className="font-display text-base font-bold text-cream">Trading Desk Hours</h3>
                                            <p className="font-body text-xs text-neutral-400 mt-1 leading-relaxed">
                                                Monday to Saturday · 9:00 AM – 7:00 PM IST (GMT +5:30)<br />
                                                Closed on Sundays & National Indian Holidays.
                                            </p>
                                        </div>
                                        
                                        <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs">
                                            <div className="flex justify-between items-center text-[10px] font-mono tracking-wider uppercase text-neutral-500 font-bold">
                                                <span>Request Type</span>
                                                <span>Response SLA</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-neutral-400">Standard Email Inquiry:</span>
                                                <span className="font-bold text-neutral-200">Within 24 Hours</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-neutral-400">Trade Sample Shipments:</span>
                                                <span className="font-bold text-neutral-200">2-3 Working Days</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-neutral-400">Formal Proforma Invoices:</span>
                                                <span className="font-bold text-[var(--gold)]">3-5 Working Days</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 3. VISIT OUR OFFICE (STYLISH MAP SECTION) */}
            <section 
                ref={mapRef}
                className="section-padding pt-6"
            >
                <div className="container-custom">
                    <motion.div 
                        className="bg-neutral-950 text-white rounded-3xl p-8 border border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px] group"
                        initial={{ opacity: 0, y: 30 }}
                        animate={mapInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
                        
                        {/* Styled Abstract SVG Map Visual */}
                        <div className="absolute inset-0 z-0 opacity-15 flex items-center justify-center select-none pointer-events-none group-hover:scale-105 transition-transform duration-[2000ms] ease-out">
                            <svg className="w-full h-full max-w-4xl" fill="none" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="350" cy="180" r="140" stroke="var(--border-gold)" strokeWidth="0.5" strokeDasharray="3 3" />
                                <circle cx="350" cy="180" r="80" stroke="var(--border-gold)" strokeWidth="0.5" />
                                <path d="M100 200 C300 100, 400 300, 900 200" stroke="var(--gold)" strokeWidth="1" strokeDasharray="5 5" />
                                <path d="M200 300 C350 200, 450 100, 800 300" stroke="var(--saffron)" strokeWidth="1" />
                            </svg>
                        </div>

                        {/* Map Marker Tooltip block */}
                        <div className="relative z-10 max-w-xl space-y-6">
                            <div className="w-14 h-14 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,168,83,0.2)] animate-pulse">
                                <MapPin className="text-[var(--gold)] w-6 h-6" />
                            </div>

                            <div className="space-y-2">
                                <span className="font-mono text-[9px] tracking-wider uppercase bg-[var(--gold)]/10 text-[var(--gold)] px-3 py-1 rounded-full font-bold border border-[var(--gold)]/20">
                                    Our Global Coordinates
                                </span>
                                <h3 className="font-display text-2xl md:text-3xl font-bold text-cream">
                                    Chennai Port Hub Headquarters
                                </h3>
                                <p className="font-body text-xs text-neutral-400 leading-relaxed max-w-md mx-auto">
                                    Ideally situated in Chennai's commercial district, just 40 minutes away 
                                    from the Chennai International Port terminal. We facilitate direct buyer 
                                    visits, warehouse audits, and product sensory panels.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-4">
                                <div className="flex items-center gap-1.5 text-neutral-300">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    <span>HACCP Compliant Facility</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-neutral-300">
                                    <HeartHandshake className="w-4 h-4 text-[var(--gold)]" />
                                    <span>Direct Farmer Cooperative Desk</span>
                                </div>
                            </div>

                            <a 
                                href="https://maps.google.com/?q=Nungambakkam,Chennai,India"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center justify-center gap-1.5 px-8 font-bold text-xs"
                            >
                                Open in Google Maps <Globe className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
