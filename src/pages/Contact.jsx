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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
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
        message: `Hi Trading Desk, I am specifically interested in sourcing: ${productParam}. Please share B2B quotation and specification sheets.`
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
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(var(--border-gold) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[var(--gold)]/10 blur-[120px]" />
        </div>
        
        <div className="relative z-10 text-center container-custom space-y-4">
          <span 
            className="font-mono text-xs tracking-[0.3em] text-[var(--gold-light)] block uppercase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            B2B TRADING DIVISION
          </span>
          <h1 
            className="font-display font-semibold text-white tracking-tight leading-tight"
            style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            The Trading <span className="italic font-normal gold-shimmer">Desk</span>
          </h1>
          <p 
            className="font-body text-xs md:text-sm max-w-xl text-neutral-400 mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Establish a direct connection with our B2B trade specialists in Chennai. We facilitate bulk quotations, customized shipping specifications, and sample testing operations.
          </p>
        </div>

        {/* Bottom border fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--cream) 0%, transparent 100%)' }} />
      </section>

      {/* 2. SPLIT LAYOUT SECTION */}
      <section className="section-padding relative z-10 pt-8">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT: INQUIRY FORM (Strict Sharp Outline) */}
            <motion.div 
              className="lg:col-span-7 bg-white rounded-none p-8 md:p-10 border border-neutral-300 shadow-sm"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <h2 className="font-display text-2xl font-bold text-neutral-800 mb-2 flex items-center gap-2">
                <FileText className="text-[var(--gold)] w-5 h-5" />
                B2B Trade Inquiry Form
              </h2>
              <p className="font-body text-xs text-neutral-500 mb-8 leading-relaxed font-light">
                Please specify your volumetric requirements, target shipping ports, and grade constraints. Markings with an asterisk (*) are mandatory.
              </p>

              {formSubmitted ? (
                <motion.div 
                  className="p-8 rounded-none bg-green-50 border border-green-200 flex flex-col items-center text-center text-green-800"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                  <h3 className="font-display text-xl font-bold mb-2">Trade Docket Recorded</h3>
                  <p className="font-body text-xs text-green-600 max-w-sm leading-relaxed mb-4">
                    Your B2B trade file has been logged successfully. A senior officer from our Chennai desk will generate your custom pricing and documentation draft within 12 hours.
                  </p>
                  <span className="font-mono text-[9px] tracking-wider uppercase bg-green-100 text-green-700 px-3.5 py-1.5 rounded-none font-bold">
                    Response SLA: 12 Hours Max
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name & Company */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Richard Miller"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3.5 border border-neutral-300 bg-white placeholder-neutral-300 text-neutral-800 text-xs focus:outline-none focus:border-[var(--gold)] transition-colors shadow-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Company / Organization *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Apex Spice Distributors Inc."
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3.5 border border-neutral-300 bg-white placeholder-neutral-300 text-neutral-800 text-xs focus:outline-none focus:border-[var(--gold)] transition-colors shadow-sm font-mono"
                      />
                    </div>
                  </div>

                  {/* Row 2: Country & Email */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Country *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. United Kingdom"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full px-4 py-3.5 border border-neutral-300 bg-white placeholder-neutral-300 text-neutral-800 text-xs focus:outline-none focus:border-[var(--gold)] transition-colors shadow-sm font-mono"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Business Email *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="buyer@apexspices.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3.5 border border-neutral-300 bg-white placeholder-neutral-300 text-neutral-800 text-xs focus:outline-none focus:border-[var(--gold)] transition-colors shadow-sm font-mono"
                      />
                    </div>
                  </div>

                  {/* Row 3: Phone & Product Interest */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Contact Phone / WhatsApp</label>
                      <input 
                        type="tel" 
                        placeholder="e.g. +44 20 7946 0958"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3.5 border border-neutral-300 bg-white placeholder-neutral-300 text-neutral-800 text-xs focus:outline-none focus:border-[var(--gold)] transition-colors shadow-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Product Interest *</label>
                      <select 
                        value={formData.productInterest}
                        onChange={(e) => setFormData({...formData, productInterest: e.target.value})}
                        className="w-full px-4 py-3.5 border border-neutral-300 bg-white text-neutral-700 text-xs focus:outline-none focus:border-[var(--gold)] transition-colors shadow-sm font-mono"
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
                    <label className="block text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Target Volume Required *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 10 Metric Tonnes (FCL)"
                      value={formData.volume}
                      onChange={(e) => setFormData({...formData, volume: e.target.value})}
                      className="w-full px-4 py-3.5 border border-neutral-300 bg-white placeholder-neutral-300 text-neutral-800 text-xs focus:outline-none focus:border-[var(--gold)] transition-colors shadow-sm font-mono"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">Trade Specification Message</label>
                    <textarea 
                      rows="5"
                      placeholder="Specify chemical parameters, pesticide residue constraints, mesh size, target discharge port (CIF/FOB), or sample dispatch timelines..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3.5 border border-neutral-300 bg-white placeholder-neutral-300 text-neutral-800 text-xs focus:outline-none focus:border-[var(--gold)] transition-colors shadow-sm resize-none font-mono"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-[var(--midnight)] hover:bg-[var(--gold)] text-white font-mono text-[11px] font-bold tracking-wider uppercase transition-colors duration-300 shadow-sm border border-neutral-850"
                  >
                    SUBMIT TRADE DOCKET <Send className="w-3.5 h-3.5 inline ml-1.5" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT: DIRECTORY INFO */}
            <motion.div 
              className="lg:col-span-5 space-y-6 text-xs"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* Registered Office Box */}
              <div className="bg-white rounded-none p-6 border border-neutral-300 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[var(--midnight)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[var(--gold)] w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-neutral-850 mb-1.5">Registered Corporate Office</h3>
                    <p className="font-body text-neutral-500 leading-relaxed font-light">
                      RICHY EXPORTS<br />
                      42 Spice Trade Avenue, Nungambakkam,<br />
                      Chennai 600034, Tamil Nadu, India.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Lines Box */}
              <div className="bg-white rounded-none p-6 border border-neutral-300 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <h3 className="font-display text-base font-bold text-neutral-850 mb-4 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[var(--gold)]" /> Direct Trading Desk Lines
                </h3>
                <div className="space-y-4 font-mono text-[11px]">
                  <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                    <span className="text-neutral-400">Head Office Phone:</span>
                    <a href="tel:+919600852141" className="font-bold text-neutral-700 hover:text-[var(--saffron)] transition-colors">+91 96008 52141</a>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                    <span className="text-neutral-400">Official WhatsApp:</span>
                    <a href="https://wa.me/919600852141" target="_blank" rel="noopener noreferrer" className="font-bold text-green-600 hover:text-[var(--saffron)] transition-colors">+91 96008 52141</a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">General Trade Email:</span>
                    <a href="mailto:trade@richyexports.in" className="font-bold text-neutral-700 hover:text-[var(--saffron)] transition-colors">trade@richyexports.in</a>
                  </div>
                </div>
              </div>

              {/* Special Divisions Box */}
              <div className="bg-white rounded-none p-6 border border-neutral-300 shadow-sm">
                <h3 className="font-display text-base font-bold text-neutral-850 mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--gold)]" /> Specialty Divisions Contact
                </h3>
                <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
                  <div className="p-3 bg-[#f5f3ee] border border-neutral-100 rounded-none">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase block mb-1">Whole Spices</span>
                    <a href="mailto:whole@richyexports.in" className="font-bold text-neutral-600 hover:text-[var(--saffron)] break-all">whole@richyexports.in</a>
                  </div>
                  <div className="p-3 bg-[#f5f3ee] border border-neutral-100 rounded-none">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase block mb-1">Ground Spices</span>
                    <a href="mailto:ground@richyexports.in" className="font-bold text-neutral-600 hover:text-[var(--saffron)] break-all">ground@richyexports.in</a>
                  </div>
                  <div className="p-3 bg-[#f5f3ee] border border-neutral-100 rounded-none col-span-2">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase block mb-1">Export Compliance</span>
                    <a href="mailto:compliance@richyexports.in" className="font-bold text-neutral-600 hover:text-[var(--saffron)] break-all">compliance@richyexports.in</a>
                  </div>
                </div>
              </div>

              {/* Trading SLA timinings */}
              <div className="bg-[var(--midnight)] text-cream rounded-none p-6 border border-neutral-800 shadow-md relative overflow-hidden">
                <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
                <div className="relative z-10 flex gap-4">
                  <div className="w-10 h-10 bg-neutral-900 border border-neutral-850 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-[var(--gold)] w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="font-display text-base font-bold text-cream">Trading Desk Hours</h3>
                      <p className="font-body text-xs text-neutral-400 mt-1 leading-relaxed font-light">
                        Monday to Saturday · 9:00 AM – 7:00 PM IST (GMT +5:30)<br />
                        Closed on Sundays & National Indian Holidays.
                      </p>
                    </div>
                    
                    <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs font-mono">
                      <div className="flex justify-between items-center text-[9px] tracking-wider uppercase text-neutral-500 font-bold">
                        <span>Docket SLA Type</span>
                        <span>Response SLA</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-neutral-400">Email Sourcing Inquiry:</span>
                        <span className="font-bold text-neutral-200">Within 24 Hours</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-neutral-400">Sample Dispatches:</span>
                        <span className="font-bold text-neutral-200">2-3 Working Days</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-neutral-400">Proforma Invoices:</span>
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
            className="bg-neutral-950 text-white rounded-none p-8 border border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px] group"
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
            
            {/* Abstract SVG Map Visual */}
            <div className="absolute inset-0 z-0 opacity-15 flex items-center justify-center select-none pointer-events-none group-hover:scale-105 transition-transform duration-[2000ms] ease-out">
              <svg className="w-full h-full max-w-4xl" fill="none" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
                <circle cx="350" cy="180" r="140" stroke="var(--border-gold)" strokeWidth="0.5" strokeDasharray="3 3" />
                <circle cx="350" cy="180" r="80" stroke="var(--border-gold)" strokeWidth="0.5" />
                <path d="M100 200 C300 100, 400 300, 900 200" stroke="var(--gold)" strokeWidth="1" strokeDasharray="5 5" />
                <path d="M200 300 C350 200, 450 100, 800 300" stroke="var(--saffron)" strokeWidth="1" />
              </svg>
            </div>

            {/* Coordinates tooltip */}
            <div className="relative z-10 max-w-xl space-y-6">
              <div className="w-14 h-14 bg-neutral-900 border border-[var(--gold)]/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,168,83,0.15)] animate-pulse">
                <MapPin className="text-[var(--gold)] w-5 h-5" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[9px] tracking-wider uppercase bg-[var(--gold)]/10 text-[var(--gold)] px-3 py-1 font-bold border border-[var(--gold)]/20">
                  OUR MARITIME COORDINATES
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-cream">
                  Chennai Port Hub Headquarters
                </h3>
                <p className="font-body text-xs text-neutral-400 leading-relaxed max-w-md mx-auto font-light">
                  Ideally situated in Chennais commercial district, just 40 minutes away from the Chennai International Port terminal. We facilitate direct B2B buyer visits, warehouse quality audits, and sensory panels.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-2">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>HACCP & ISO 22000 Facility</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <HeartHandshake className="w-4 h-4 text-[var(--gold)]" />
                  <span>Direct Sourcing Co-op Desk</span>
                </div>
              </div>

              <a 
                href="https://maps.google.com/?q=Nungambakkam,Chennai,India"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-[var(--gold)] text-white hover:bg-white hover:text-black border-transparent font-mono text-[11px] inline-flex items-center justify-center gap-2"
              >
                OPEN MAP COORDINATES <Globe className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
