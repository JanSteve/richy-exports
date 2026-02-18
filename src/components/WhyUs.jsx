import { motion } from 'framer-motion';
import { Shield, Truck, Leaf, BadgeCheck } from 'lucide-react';

const FEATURES = [
    {
        icon: Leaf,
        title: 'Farm-to-Export Traceability',
        description: 'Every batch is traceable from our partner farms across 8 Indian states through our GMP-certified processing facility to your warehouse. Complete documentation at every stage.',
    },
    {
        icon: Shield,
        title: 'Regulatory Compliance',
        description: 'We handle all export documentation — COA, MSDS, phytosanitary certificates, and country-specific regulatory paperwork. EU Novel Food, FDA GRAS, and APEDA compliant.',
    },
    {
        icon: Truck,
        title: 'Reliable Supply Chain',
        description: 'Consistent supply year-round with strategic inventory reserves. Flexible MOQs from 100kg samples to 20-ton container loads with competitive freight partnerships.',
    },
    {
        icon: BadgeCheck,
        title: 'Quality Guaranteed',
        description: 'In-house NABL-accredited laboratory for microbiology, heavy metals, pesticide residue, and active compound testing. Every shipment includes third-party verified certificates.',
    },
];

export default function WhyUs() {
    return (
        <section className="bg-bg-mid relative">
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
                        The RICHY Advantage
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl text-cream">
                        Why <span className="text-gold italic">Partner</span> With Us
                    </h2>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                className="group relative bg-bg-card border border-[var(--border-gold)] rounded-2xl p-8 hover:border-[var(--border-hover)] transition-all duration-300"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="flex items-start gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-brand-green/20 border border-brand-green/30 group-hover:border-gold/40 group-hover:bg-gold/10 transition-all duration-300">
                                        <Icon className="w-6 h-6 text-lime group-hover:text-gold transition-colors duration-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl md:text-2xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="font-body text-muted text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
