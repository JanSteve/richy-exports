import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Globe, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer ref={ref} className="bg-[var(--midnight)] relative overflow-hidden pt-1">
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
      
      {/* Top CTA Band */}
      <div className="border-b border-neutral-800/60 relative z-10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display font-medium text-2xl md:text-3xl text-[var(--cream)] mb-2">
              Ready to Source the World's Finest Spices?
            </h3>
            <p className="text-neutral-400 text-xs font-mono tracking-wider uppercase">
              Connecting Ancient Sourcing Wisdom with 21st-Century Supply Chains.
            </p>
          </div>
          <Link to="/contact" className="btn-primary whitespace-nowrap bg-[var(--gold)] text-white hover:bg-[var(--cream)] hover:text-[var(--midnight)] hover:border-[var(--cream)] shadow-sm">
            REQUEST TRADE SAMPLE
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <span className="font-display font-semibold text-xl text-[var(--gold)]">S</span>
              </div>
              <div>
                <h4 className="font-display font-semibold text-[17px] text-[var(--cream)]">SpiceRoute Global</h4>
                <span className="text-[9px] text-neutral-400 tracking-[0.2em] font-mono uppercase">MNC LOGISTICS HUB</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Pioneering the next era of high-precision spice logistics, sustainable farm sourcing, and global B2B trade of premium raw materials. Since 1642.
            </p>
            
            {/* Certifications Block */}
            <div className="flex gap-3 items-center opacity-70">
              <ShieldCheck className="w-8 h-8 text-[var(--gold)] flex-shrink-0" />
              <span className="font-mono text-[9px] text-neutral-300 leading-snug">
                ISO 22000 & HACCP CERTIFIED<br />
                APEDA & SPICES BOARD REG.
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h5 className="font-mono text-[10px] text-[var(--gold)] tracking-[0.25em] mb-6 uppercase font-bold">OPERATIONS</h5>
            <ul className="space-y-3 font-mono text-[11px] tracking-wider uppercase">
              {[
                { to: '/', label: 'Our Heritage' },
                { to: '/about', label: 'History & Story' },
                { to: '/products', label: 'Spice Catalog' },
                { to: '/careers', label: 'Voyage Careers' },
                { to: '/updates', label: 'Market Updates' },
                { to: '/contact', label: 'Trading Desk' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-neutral-400 hover:text-[var(--gold)] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h5 className="font-mono text-[10px] text-[var(--gold)] tracking-[0.25em] mb-6 uppercase font-bold">SPICE REGIONS</h5>
            <ul className="space-y-3 font-mono text-[11px] tracking-wider uppercase">
              {[
                'Kashmir Saffron',
                'Erode Turmeric',
                'Guntur Red Chili',
                'Tellicherry Black Pepper',
                'Idukki Cardamom',
                'Kerala Cinnamon',
                'Gujarat Cumin Seeds',
                'Kottayam Mace & Cloves'
              ].map((spice) => (
                <li key={spice}>
                  <Link to="/products" className="text-neutral-400 hover:text-[var(--gold)] transition-colors duration-300">
                    {spice}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h5 className="font-mono text-[10px] text-[var(--gold)] tracking-[0.25em] mb-6 uppercase font-bold">TRADING DESK</h5>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[var(--gold)] mt-1 flex-shrink-0" />
                <p className="text-neutral-400 leading-relaxed">
                  SpiceRoute Global Hub,<br />
                  42 Spice Trade Avenue, Nungambakkam,<br />
                  Chennai 600034, Tamil Nadu, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[var(--gold)] flex-shrink-0" />
                <a href="tel:+914428204500" className="text-neutral-400 hover:text-[var(--gold)] transition-colors">
                  +91 44 2820 4500
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[var(--gold)] flex-shrink-0" />
                <a href="mailto:trade@richyexports.in" className="text-neutral-400 hover:text-[var(--gold)] transition-colors break-all">
                  trade@spicerouteglobal.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={14} className="text-[var(--gold)] flex-shrink-0" />
                <span className="text-neutral-400">
                  www.spicerouteglobal.com
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-900/60 relative z-10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[9px] text-neutral-500 tracking-[0.12em]">
            © {new Date().getFullYear()} SPICEROUTE GLOBAL MNC. ALL RIGHTS RESERVED. EXPORTS CO-OP DESK.
          </span>
          <div className="flex items-center gap-6 font-mono text-[9px] text-neutral-500 tracking-[0.15em]">
            <span className="hover:text-[var(--gold)] cursor-pointer uppercase">Terms of Trade</span>
            <span className="hover:text-[var(--gold)] cursor-pointer uppercase">Privacy Policy</span>
            <span className="hover:text-[var(--gold)] cursor-pointer uppercase">mangrove Offset</span>
          </div>
        </div>

        {/* Dynamic Diamond Line rule */}
        <div className="text-center pb-12">
          <div className="diamond-rule max-w-[200px] mx-auto mb-3 opacity-30">
            <div className="diamond" />
          </div>
          <p className="font-mono text-[9px] text-[var(--gold)] tracking-[0.3em] uppercase">
            connecting remote harvest nodes to global industrial markets
          </p>
        </div>
      </div>
    </footer>
  );
}
