import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function Loader({ onComplete }) {
    useEffect(() => {
        const t = setTimeout(onComplete, 2800);
        return () => clearTimeout(t);
    }, [onComplete]);

    const letters = "RICHY EXPORTS".split("");

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-dark"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
        >
            {/* Animated leaf SVG */}
            <motion.svg
                width="64" height="64" viewBox="0 0 64 64" fill="none"
                className="mb-8"
                aria-hidden="true"
            >
                <motion.path
                    d="M32 4 C50 4 60 20 60 32 C60 50 44 60 32 60 C20 60 4 50 4 32 C4 14 16 4 32 4 Z M32 4 L32 60 M4 32 L60 32"
                    stroke="#C8A96E" strokeWidth="1.5" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </motion.svg>

            {/* Letter-by-letter reveal */}
            <div className="flex gap-[2px]">
                {letters.map((char, i) => (
                    <motion.span
                        key={i}
                        className="font-display text-3xl tracking-[0.2em]"
                        style={{ color: char === ' ' ? 'transparent' : '#C8A96E' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </div>

            {/* Gold progress bar */}
            <motion.div
                className="mt-10 h-[2px] bg-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 220 }}
                transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
            />
        </motion.div>
    );
}
