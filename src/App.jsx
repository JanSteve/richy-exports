import { useState, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';

// Lazy-loaded below-fold components
const About = lazy(() => import('./components/About'));
const Products = lazy(() => import('./components/Products'));
const WhyUs = lazy(() => import('./components/WhyUs'));
const Certifications = lazy(() => import('./components/Certifications'));
const GlobalReach = lazy(() => import('./components/GlobalReach'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Process = lazy(() => import('./components/Process'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadComplete = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            {/* Skip to content link */}
            <a href="#main-content" className="skip-to-content">
                Skip to main content
            </a>

            <AnimatePresence mode="wait">
                {isLoading && <Loader key="loader" onComplete={handleLoadComplete} />}
            </AnimatePresence>

            {!isLoading && (
                <>
                    <Navbar />
                    <main id="main-content">
                        <Hero />
                        <Marquee />
                        <Suspense fallback={<div />}>
                            <About />
                            <Products />
                            <WhyUs />
                            <Certifications />
                            <GlobalReach />
                            <Testimonials />
                            <Process />
                            <Contact />
                        </Suspense>
                    </main>
                    <Suspense fallback={<div />}>
                        <Footer />
                    </Suspense>
                </>
            )}
        </>
    );
}
