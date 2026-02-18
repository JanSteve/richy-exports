import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
    {
        id: 1,
        name: 'Heinrich Weber',
        title: 'Procurement Director',
        company: 'NaturaForce GmbH, Germany',
        text: 'RICHY EXPORTS has been our primary turmeric and ashwagandha supplier for 6 years. The consistency of their curcumin content across batches is remarkable — we\'ve never had to reject a single shipment.',
    },
    {
        id: 2,
        name: 'Sarah Mitchell',
        title: 'VP Supply Chain',
        company: 'Pure Botanics Inc., USA',
        text: 'What sets RICHY apart is their documentation. Every COA, MSDS, and phytosanitary certificate arrives before the container does. Their pre-shipment samples match the bulk delivery perfectly.',
    },
    {
        id: 3,
        name: 'Takeshi Nakamura',
        title: 'Raw Materials Manager',
        company: 'Kampo Pharma, Japan',
        text: 'Japanese pharmaceutical standards are among the strictest. RICHY consistently meets our JP-grade requirements for senna and fenugreek with zero non-conformance reports in 4 years of partnership.',
    },
    {
        id: 4,
        name: 'Fatima Al-Rashid',
        title: 'Head of Procurement',
        company: 'Gulf Natural Foods, UAE',
        text: 'The Halal certification process was seamless. RICHY\'s team coordinated directly with our auditors and had all documentation ready within two weeks. Their moringa and neem oil quality is exceptional.',
    },
    {
        id: 5,
        name: 'David Okonkwo',
        title: 'Managing Director',
        company: 'AfriHerb Trading, Nigeria',
        text: 'Flexible MOQs were critical for our growing business. RICHY started with 500kg trial orders and scaled to full container loads as our market expanded. True partners in every sense.',
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, []);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    }, []);

    const goTo = useCallback((index) => {
        setCurrent(index);
    }, []);

    // Auto-play
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [isPaused, next]);

    const testimonial = TESTIMONIALS[current];

    return (
        <section
            className="bg-bg-mid relative"
            role="region"
            aria-label="Testimonials"
        >
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
                        Client Voices
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl text-cream">
                        Trusted <span className="text-gold italic">Worldwide</span>
                    </h2>
                </motion.div>

                {/* Carousel */}
                <div
                    className="relative max-w-3xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Arrows */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-gold)] text-muted hover:text-gold hover:border-gold transition-all duration-300"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-gold)] text-muted hover:text-gold hover:border-gold transition-all duration-300"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Slide */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={testimonial.id}
                            className="bg-bg-card border border-[var(--border-gold)] rounded-2xl p-8 md:p-12 text-center"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <div className="mb-6">
                                <span className="font-display text-6xl text-gold/30">"</span>
                            </div>
                            <p className="font-quote text-lg md:text-xl text-cream/90 italic leading-relaxed mb-8">
                                {testimonial.text}
                            </p>
                            <div>
                                <p className="font-display text-xl text-gold">{testimonial.name}</p>
                                <p className="font-body text-muted text-sm mt-1">{testimonial.title}</p>
                                <p className="font-body text-dim text-xs mt-1">{testimonial.company}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current
                                        ? 'bg-gold w-8'
                                        : 'bg-muted/40 hover:bg-muted'
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
