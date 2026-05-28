import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer ref={ref} className="bg-[var(--midnight)] relative overflow-hidden">
      {/* Top CTA Band */}
      <div className="border-b border-[rgba(212,168,83,.1)]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--cream)] mb-2">
              Ready to Source Premium Spices?
            </h3>
            <p className="text-[rgba(255,255,255,.5)] text-sm">
              Get a custom quote tailored to your requirements within 24 hours.
            </p>
          </div>
          <Link to="/contact" className="btn-primary whitespace-nowrap">
            REQUEST A QUOTE
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[var(--charcoal)] border border-[rgba(212,168,83,.2)] rounded-lg flex items-center justify-center">
                <span className="font-display font-black text-xl text-[var(--gold)]">R</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-[15px] text-[var(--cream)]">RICHY EXPORTS</h4>
                <span className="text-[10px] text-[var(--stone)] tracking-[.1em]">PREMIUM SPICE TRADING</span>
              </div>
            </div>
            <p className="text-sm text-[rgba(255,255,255,.45)] leading-relaxed mb-4 font-light">
              India's trusted spice trading and export company since 2004. Delivering premium quality spices to food manufacturers, retailers, and hospitality chains worldwide.
            </p>
            <div className="font-mono text-[10px] text-[var(--stone)] tracking-[.15em] space-y-1">
              <div>IEC: 0404XXXXXX</div>
              <div>GST: 33AXXXX1234X1Z5</div>
              <div>FSSAI: 10020XXXXXXX</div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h5 className="font-mono text-[11px] text-[var(--gold)] tracking-[.2em] mb-5 uppercase">Navigation</h5>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/products', label: 'Our Spices' },
                { to: '/careers', label: 'Careers' },
                { to: '/updates', label: 'News & Updates' },
                { to: '/contact', label: 'Contact / Trading Desk' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-[rgba(255,255,255,.5)] hover:text-[var(--gold)] transition-colors duration-300">
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
            <h5 className="font-mono text-[11px] text-[var(--gold)] tracking-[.2em] mb-5 uppercase">Our Spices</h5>
            <ul className="space-y-3">
              {['Turmeric', 'Red Chili', 'Cumin Seeds', 'Black Pepper', 'Cardamom', 'Cinnamon', 'Coriander', 'Fenugreek'].map((spice) => (
                <li key={spice}>
                  <Link to="/products" className="text-sm text-[rgba(255,255,255,.5)] hover:text-[var(--gold)] transition-colors duration-300">
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
            <h5 className="font-mono text-[11px] text-[var(--gold)] tracking-[.2em] mb-5 uppercase">Contact</h5>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[var(--gold)] mt-1 flex-shrink-0" />
                <p className="text-sm text-[rgba(255,255,255,.5)] leading-relaxed">
                  42 Spice Trade Avenue,<br />
                  Nungambakkam, Chennai 600034,<br />
                  Tamil Nadu, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[var(--gold)] flex-shrink-0" />
                <a href="tel:+914428204500" className="text-sm text-[rgba(255,255,255,.5)] hover:text-[var(--gold)] transition-colors">
                  +91 44 2820 4500
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[var(--gold)] flex-shrink-0" />
                <a href="mailto:trade@richyexports.in" className="text-sm text-[rgba(255,255,255,.5)] hover:text-[var(--gold)] transition-colors">
                  trade@richyexports.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={14} className="text-[var(--gold)] flex-shrink-0" />
                <span className="text-sm text-[rgba(255,255,255,.5)]">
                  www.richyexports.in
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(212,168,83,.08)]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[11px] text-[var(--stone)] tracking-[.05em]">
            © {new Date().getFullYear()} RICHY EXPORTS PVT. LTD. · ALL RIGHTS RESERVED
          </span>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] text-[var(--stone)] tracking-[.1em]">PRIVACY</span>
            <span className="font-mono text-[10px] text-[var(--stone)] tracking-[.1em]">TERMS</span>
            <span className="font-mono text-[10px] text-[var(--stone)] tracking-[.1em]">SITEMAP</span>
          </div>
        </div>

        {/* Sign-off */}
        <div className="text-center pb-8">
          <div className="diamond-rule max-w-[200px] mx-auto mb-3">
            <div className="diamond" />
          </div>
          <p className="text-[12px] text-[var(--gold)] tracking-[.2em] font-light opacity-60">
            RICHY EXPORTS · SINCE 2004 · CHENNAI, INDIA 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
