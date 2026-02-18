import { motion } from 'framer-motion';
import { Sprout, FlaskConical, ClipboardCheck, Container, Ship } from 'lucide-react';

const STEPS = [
    {
        icon: Sprout,
        step: '01',
        title: 'Sourcing',
        description: 'Direct partnerships with certified farms across 8 Indian states. Seasonal procurement planning ensures consistent supply.',
    },
    {
        icon: FlaskConical,
        step: '02',
        title: 'Processing',
        description: 'GMP-certified facility with automated cleaning, drying, grinding, and extraction lines. Temperature and humidity controlled.',
    },
    {
        icon: ClipboardCheck,
        step: '03',
        title: 'Testing',
        description: 'In-house NABL lab tests every batch for actives, heavy metals, pesticide residue, microbiology, and aflatoxins.',
    },
    {
        icon: Container,
        step: '04',
        title: 'Packaging',
        description: 'Pharma-grade and food-grade packaging. Multi-layer barrier pouches, HDPE drums, or fiber drums per buyer spec.',
    },
    {
        icon: Ship,
        step: '05',
        title: 'Shipping',
        description: 'Competitive freight from JNPT, Mundra, and Chennai ports. Full container loads or LCL consolidation available.',
    },
];

export default function Process() {
    return (
        <section className="bg-bg-dark relative overflow-hidden">
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
                        Our Workflow
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl text-cream">
                        Farm to <span className="text-gold italic">Ship</span>
                    </h2>
                </motion.div>

                {/* Desktop: Horizontal Timeline */}
                <div className="hidden lg:block relative">
                    {/* Connecting line */}
                    <motion.div
                        className="absolute top-12 left-0 right-0 h-px bg-[var(--border-gold)]"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'left' }}
                    />

                    <div className="grid grid-cols-5 gap-6 relative">
                        {STEPS.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.step}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ delay: i * 0.15, duration: 0.6 }}
                                >
                                    {/* Node */}
                                    <div className="relative w-24 h-24 mx-auto mb-6">
                                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-bg-card border-2 border-[var(--border-gold)] z-10">
                                            <Icon className="w-8 h-8 text-gold" />
                                        </div>
                                    </div>

                                    <span className="font-body text-gold/50 text-xs tracking-[0.3em] uppercase block mb-2">
                                        Step {step.step}
                                    </span>
                                    <h3 className="font-display text-xl text-cream mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="font-body text-muted text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile: Vertical Timeline */}
                <div className="lg:hidden relative pl-10">
                    {/* Vertical line */}
                    <motion.div
                        className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border-gold)]"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'top' }}
                    />

                    <div className="space-y-12">
                        {STEPS.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.step}
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                >
                                    {/* Node dot */}
                                    <div className="absolute -left-10 top-0 w-8 h-8 flex items-center justify-center rounded-full bg-bg-card border border-gold z-10">
                                        <Icon className="w-4 h-4 text-gold" />
                                    </div>

                                    <span className="font-body text-gold/50 text-xs tracking-[0.3em] uppercase block mb-2">
                                        Step {step.step}
                                    </span>
                                    <h3 className="font-display text-xl text-cream mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="font-body text-muted text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
