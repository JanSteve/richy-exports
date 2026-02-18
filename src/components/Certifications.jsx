import { motion } from 'framer-motion';

const CERTIFICATIONS = [
    { name: 'ISO 9001:2015', icon: '🏅', description: 'Quality Management System' },
    { name: 'FSSAI', icon: '🔬', description: 'Food Safety & Standards Authority' },
    { name: 'APEDA', icon: '📦', description: 'Agricultural Products Export' },
    { name: 'GMP Certified', icon: '🏭', description: 'Good Manufacturing Practice' },
    { name: 'USDA Organic', icon: '🌿', description: 'Organic Processing Standard' },
    { name: 'Halal Certified', icon: '☪️', description: 'Islamic Food Compliance' },
];

export default function Certifications() {
    return (
        <section id="certifications" className="bg-bg-lift relative">
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
                        Quality Assured
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl text-cream">
                        Our <span className="text-gold italic">Certifications</span>
                    </h2>
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {CERTIFICATIONS.map((cert, i) => (
                        <motion.div
                            key={cert.name}
                            className="group relative bg-bg-card border border-[var(--border-gold)] rounded-2xl p-6 md:p-8 text-center hover:border-[var(--border-hover)] transition-all duration-300"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -4 }}
                        >
                            {/* Pulsing ring */}
                            <div className="relative w-20 h-20 mx-auto mb-4">
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-gold/30"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.4, 0, 0.4],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-bg-dark border border-[var(--border-gold)]">
                                    <span className="text-3xl" role="img" aria-label={cert.name}>
                                        {cert.icon}
                                    </span>
                                </div>
                            </div>

                            <h3 className="font-display text-lg md:text-xl text-cream mb-1 group-hover:text-gold transition-colors duration-300">
                                {cert.name}
                            </h3>
                            <p className="font-body text-muted text-xs tracking-wider">
                                {cert.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
