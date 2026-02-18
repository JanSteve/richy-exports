import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const REGIONS = [
    { name: 'All', filter: 'all' },
    { name: 'Americas', filter: 'americas' },
    { name: 'Europe', filter: 'europe' },
    { name: 'Asia-Pacific', filter: 'asia' },
    { name: 'Middle East', filter: 'middleeast' },
    { name: 'Africa', filter: 'africa' },
];

const DOTS = [
    // Americas
    { cx: 95, cy: 130, label: 'United States', region: 'americas' },
    { cx: 70, cy: 120, label: 'Canada', region: 'americas' },
    { cx: 110, cy: 210, label: 'Brazil', region: 'americas' },
    { cx: 85, cy: 185, label: 'Mexico', region: 'americas' },
    // Europe
    { cx: 250, cy: 85, label: 'United Kingdom', region: 'europe' },
    { cx: 265, cy: 95, label: 'Germany', region: 'europe' },
    { cx: 255, cy: 100, label: 'France', region: 'europe' },
    { cx: 260, cy: 110, label: 'Italy', region: 'europe' },
    { cx: 270, cy: 100, label: 'Netherlands', region: 'europe' },
    { cx: 258, cy: 105, label: 'Spain', region: 'europe' },
    // Asia-Pacific
    { cx: 370, cy: 125, label: 'Japan', region: 'asia' },
    { cx: 355, cy: 140, label: 'South Korea', region: 'asia' },
    { cx: 345, cy: 170, label: 'Singapore', region: 'asia' },
    { cx: 340, cy: 160, label: 'Malaysia', region: 'asia' },
    { cx: 400, cy: 210, label: 'Australia', region: 'asia' },
    // Middle East
    { cx: 295, cy: 140, label: 'UAE', region: 'middleeast' },
    { cx: 290, cy: 130, label: 'Saudi Arabia', region: 'middleeast' },
    // Africa
    { cx: 270, cy: 190, label: 'South Africa', region: 'africa' },
    { cx: 265, cy: 160, label: 'Kenya', region: 'africa' },
    { cx: 255, cy: 155, label: 'Nigeria', region: 'africa' },
];

export default function GlobalReach() {
    const [activeRegion, setActiveRegion] = useState('all');

    const handleFilter = useCallback((filter) => {
        setActiveRegion(filter);
    }, []);

    const filteredDots = activeRegion === 'all'
        ? DOTS
        : DOTS.filter(d => d.region === activeRegion);

    return (
        <section id="global-reach" className="bg-bg-dark relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-body text-lime text-sm tracking-[0.3em] uppercase mb-4">
                        Worldwide Distribution
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl text-cream">
                        Our <span className="text-gold italic">Global</span> Reach
                    </h2>
                    <p className="font-body text-muted text-base max-w-xl mx-auto mt-6">
                        Delivering premium herbal products to partners across 6 continents,
                        with dedicated logistics support and localized documentation.
                    </p>
                </motion.div>

                {/* Region Filter Pills */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {REGIONS.map((region) => (
                        <button
                            key={region.filter}
                            onClick={() => handleFilter(region.filter)}
                            className={`px-5 py-2 font-body text-sm tracking-wider rounded-full border transition-all duration-300 ${activeRegion === region.filter
                                ? 'bg-gold/20 border-gold text-gold'
                                : 'bg-transparent border-[var(--border-gold)] text-muted hover:text-gold hover:border-gold/40'
                                }`}
                            aria-label={`Filter by ${region.name}`}
                        >
                            {region.name}
                        </button>
                    ))}
                </motion.div>

                {/* SVG Map */}
                <motion.div
                    className="relative max-w-4xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8 }}
                >
                    <svg
                        viewBox="0 0 500 300"
                        className="w-full h-auto"
                        aria-hidden="true"
                    >
                        {/* Simplified world map outline */}
                        <path
                            d="M60,100 Q70,80 90,85 Q110,70 130,80 Q120,100 110,105 Q100,120 85,130 Q95,150 100,170 Q110,190 115,210 Q120,230 110,240 Q100,230 95,215 Q85,200 80,180 Q70,160 65,140 Q60,120 60,100Z"
                            fill="none"
                            stroke="var(--border-gold)"
                            strokeWidth="0.5"
                            opacity="0.4"
                        />
                        {/* North America */}
                        <path
                            d="M50,65 Q60,55 75,60 Q90,50 110,55 Q120,60 115,75 Q110,85 100,90 L95,100 Q80,110 70,105 Q60,95 55,85 Z"
                            fill="none"
                            stroke="var(--border-gold)"
                            strokeWidth="0.5"
                            opacity="0.4"
                        />
                        {/* Europe */}
                        <path
                            d="M235,60 Q245,55 260,58 Q275,55 285,65 Q280,80 275,90 Q268,100 260,105 Q250,110 240,105 Q232,95 230,80 Q232,70 235,60Z"
                            fill="none"
                            stroke="var(--border-gold)"
                            strokeWidth="0.5"
                            opacity="0.4"
                        />
                        {/* Africa */}
                        <path
                            d="M240,115 Q255,110 270,115 Q280,130 285,150 Q280,175 270,195 Q260,210 250,205 Q240,190 238,170 Q235,150 238,130Z"
                            fill="none"
                            stroke="var(--border-gold)"
                            strokeWidth="0.5"
                            opacity="0.4"
                        />
                        {/* Asia */}
                        <path
                            d="M290,65 Q310,55 340,60 Q365,65 380,80 Q370,100 355,115 Q340,130 325,140 Q310,145 295,135 Q285,120 280,100 Q282,80 290,65Z"
                            fill="none"
                            stroke="var(--border-gold)"
                            strokeWidth="0.5"
                            opacity="0.4"
                        />
                        {/* India highlight */}
                        <path
                            d="M310,125 Q320,115 330,120 Q335,135 330,150 Q325,160 315,160 Q308,150 305,140 Q305,130 310,125Z"
                            fill="rgba(45,90,39,0.2)"
                            stroke="#C8A96E"
                            strokeWidth="0.8"
                            opacity="0.6"
                        />
                        {/* Australia */}
                        <path
                            d="M380,195 Q395,185 410,190 Q420,200 415,215 Q405,225 390,220 Q378,210 380,195Z"
                            fill="none"
                            stroke="var(--border-gold)"
                            strokeWidth="0.5"
                            opacity="0.4"
                        />

                        {/* India marker (home base) */}
                        <circle cx="320" cy="140" r="4" fill="#C8A96E" opacity="0.8" />
                        <motion.circle
                            cx="320" cy="140" r="4"
                            fill="none"
                            stroke="#C8A96E"
                            strokeWidth="1"
                            animate={{ r: [4, 12, 4], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Destination dots */}
                        {filteredDots.map((dot, i) => (
                            <g key={dot.label}>
                                <circle
                                    cx={dot.cx}
                                    cy={dot.cy}
                                    r="3"
                                    fill="#C8A96E"
                                    opacity="0.7"
                                />
                                <motion.circle
                                    cx={dot.cx}
                                    cy={dot.cy}
                                    r="3"
                                    fill="none"
                                    stroke="#C8A96E"
                                    strokeWidth="0.8"
                                    animate={{
                                        r: [3, 8, 3],
                                        opacity: [0.5, 0, 0.5],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                    }}
                                />
                            </g>
                        ))}
                    </svg>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gold" />
                            <span className="font-body text-muted text-xs">HQ — Chennai, India</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gold/70" />
                            <span className="font-body text-muted text-xs">Export Destinations</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
