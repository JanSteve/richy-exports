import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';

const PRODUCT_OPTIONS = [
    'Turmeric',
    'Ashwagandha',
    'Moringa',
    'Cumin',
    'Fenugreek',
    'Holy Basil (Tulsi)',
    'Ginger',
    'Neem',
    'Senna',
    'Multiple Products',
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        country: '',
        product: '',
        quantity: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919600852141';

    return (
        <section id="contact" className="bg-bg-mid relative">
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
                        Get Started
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl text-cream">
                        Request a <span className="text-gold italic">Quote</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        {submitted ? (
                            <motion.div
                                className="bg-bg-card border border-gold/30 rounded-2xl p-12 text-center"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
                                <h3 className="font-display text-3xl text-gold mb-4">
                                    Thank You!
                                </h3>
                                <p className="font-body text-muted leading-relaxed">
                                    Your inquiry has been received. Our export team will get back to you
                                    within 24 business hours with a detailed quotation.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="font-body text-sm text-muted mb-2 block">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Smith"
                                        className="w-full px-5 py-3.5 bg-bg-card border border-[var(--border-gold)] rounded-xl focus:border-gold transition-colors duration-300"
                                    />
                                </div>

                                {/* Company */}
                                <div>
                                    <label htmlFor="company" className="font-body text-sm text-muted mb-2 block">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        placeholder="NaturaForce GmbH"
                                        className="w-full px-5 py-3.5 bg-bg-card border border-[var(--border-gold)] rounded-xl focus:border-gold transition-colors duration-300"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label htmlFor="country" className="font-body text-sm text-muted mb-2 block">
                                        Country *
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        placeholder="Germany"
                                        className="w-full px-5 py-3.5 bg-bg-card border border-[var(--border-gold)] rounded-xl focus:border-gold transition-colors duration-300"
                                    />
                                </div>

                                {/* Product */}
                                <div>
                                    <label htmlFor="product" className="font-body text-sm text-muted mb-2 block">
                                        Product of Interest *
                                    </label>
                                    <select
                                        id="product"
                                        name="product"
                                        value={formData.product}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-3.5 bg-bg-card border border-[var(--border-gold)] rounded-xl focus:border-gold transition-colors duration-300 appearance-none"
                                    >
                                        <option value="" disabled>Select a product</option>
                                        {PRODUCT_OPTIONS.map((p) => (
                                            <option key={p} value={p} className="bg-bg-dark text-cream">{p}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label htmlFor="quantity" className="font-body text-sm text-muted mb-2 block">
                                        Estimated Quantity (kg)
                                    </label>
                                    <input
                                        type="text"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="e.g., 500kg, 1 MT, 20ft FCL"
                                        className="w-full px-5 py-3.5 bg-bg-card border border-[var(--border-gold)] rounded-xl focus:border-gold transition-colors duration-300"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="font-body text-sm text-muted mb-2 block">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Tell us about your requirements, quality standards, packaging preferences..."
                                        className="w-full px-5 py-3.5 bg-bg-card border border-[var(--border-gold)] rounded-xl focus:border-gold transition-colors duration-300 resize-none"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="shimmer w-full flex items-center justify-center gap-2 px-8 py-4 bg-gold text-bg-dark font-body font-semibold text-sm tracking-wider rounded-full hover:bg-gold-light transition-colors duration-300"
                                >
                                    Send Inquiry <Send size={18} />
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-bg-card border border-[var(--border-gold)] rounded-2xl p-8">
                            <h3 className="font-display text-2xl text-cream mb-6">
                                Direct Contact
                            </h3>
                            <div className="space-y-5">
                                <a
                                    href="mailto:trade@richyexports.in"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                                        <Mail className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm text-muted">Email</p>
                                        <p className="font-body text-cream group-hover:text-gold transition-colors duration-300">
                                            trade@richyexports.in
                                        </p>
                                    </div>
                                </a>

                                <a
                                    href="tel:+919600852141"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                                        <Phone className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm text-muted">Phone</p>
                                        <p className="font-body text-cream group-hover:text-gold transition-colors duration-300">
                                            +91 96008 52141
                                        </p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 border border-gold/20">
                                        <MapPin className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm text-muted">Headquarters</p>
                                        <p className="font-body text-cream">
                                            Chennai, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 bg-bg-card border border-green-800/50 rounded-2xl p-6 hover:border-green-600/50 transition-all duration-300"
                        >
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-900/30 border border-green-700/30 group-hover:bg-green-800/40 transition-all duration-300">
                                <MessageCircle className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="font-display text-xl text-cream group-hover:text-green-400 transition-colors duration-300">
                                    Chat on WhatsApp
                                </p>
                                <p className="font-body text-muted text-sm">
                                    Quick responses · Available Mon-Sat, 9am-7pm IST
                                </p>
                            </div>
                        </a>

                        {/* Business Hours */}
                        <div className="bg-bg-card border border-[var(--border-gold)] rounded-2xl p-8">
                            <h3 className="font-display text-xl text-cream mb-4">
                                Business Hours
                            </h3>
                            <div className="space-y-2 font-body text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted">Monday – Friday</span>
                                    <span className="text-cream">9:00 AM – 7:00 PM IST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Saturday</span>
                                    <span className="text-cream">10:00 AM – 4:00 PM IST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Sunday</span>
                                    <span className="text-dim">Closed</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
