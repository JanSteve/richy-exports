import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Globe, Package, Award } from 'lucide-react';

function useCountUp(target, duration = 2000, inView = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = null;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, target, duration]);
    return count;
}

const STATS = [
    { icon: TrendingUp, target: 5000, suffix: '+', label: 'Metric Tons Exported', format: true },
    { icon: Globe, target: 40, suffix: '+', label: 'Countries Served' },
    { icon: Package, target: 120, suffix: '+', label: 'Product Variants' },
    { icon: Award, target: 7, suffix: '+', label: 'Years of Excellence' },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="about" className="bg-bg-mid relative">
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
                        Who We Are
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl text-cream">
                        Rooted in <span className="text-gold italic">India</span>,
                        <br className="hidden md:block" /> Reaching the World
                    </h2>
                </motion.div>

                {/* Stats Grid */}
                <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {STATS.map((stat, i) => {
                        const count = useCountUp(stat.target, 2000, isInView);
                        const Icon = stat.icon;
                        const formattedCount = stat.format
                            ? count.toLocaleString()
                            : count;

                        return (
                            <motion.div
                                key={stat.label}
                                className="relative bg-bg-card border border-[var(--border-gold)] rounded-2xl p-6 md:p-8 text-center group hover:border-[var(--border-hover)] transition-colors duration-300"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <Icon className="w-8 h-8 mx-auto mb-4 text-lime group-hover:text-gold transition-colors duration-300" />
                                <p className="font-display text-4xl md:text-5xl text-gold mb-2">
                                    {formattedCount}{stat.suffix}
                                </p>
                                <p className="font-body text-muted text-sm tracking-wider">
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Story */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border-gold)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/40 via-bg-card to-bg-dark" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-8xl" role="img" aria-label="herb leaves">🌿</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="font-display text-2xl md:text-3xl text-cream">
                            Half a Decade of Trust in
                            <span className="text-gold"> Premium Botanicals</span>
                        </h3>
                        <p className="font-body text-muted leading-relaxed">
                            Founded in Chennai in 2019, RICHY EXPORTS has grown from a small trading house
                            into one of India's most trusted herbal product exporters. Our vertically
                            integrated supply chain — from farm partnerships across 8 Indian states to our
                            GMP-certified processing facility — ensures every gram meets international
                            quality standards.
                        </p>
                        <p className="font-body text-muted leading-relaxed">
                            We serve pharmaceutical companies, nutraceutical brands, food manufacturers,
                            and cosmetic formulators across 40+ countries with consistent quality,
                            transparent pricing, and regulatory-compliant documentation including COA,
                            MSDS, and country-specific import certifications.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <div className="h-px flex-1 bg-[var(--border-gold)]" />
                            <span className="font-body text-dim text-xs tracking-[0.3em] uppercase">Est. 2019</span>
                            <div className="h-px flex-1 bg-[var(--border-gold)]" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
