import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Careers = lazy(() => import('./pages/Careers'));
const Updates = lazy(() => import('./pages/Updates'));
const Contact = lazy(() => import('./pages/Contact'));

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [.22,.61,.36,1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  );
}

function Loader() {
  return (
    <div className="fixed inset-0 z-[99999] bg-[var(--midnight)] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-[var(--gold)] to-[var(--saffron)] rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="font-display font-black text-2xl text-white">R</span>
        </div>
        <div className="w-32 h-[2px] bg-[var(--charcoal)] rounded mx-auto overflow-hidden">
          <div className="h-full bg-[var(--gold)] rounded animate-[shimmerBar_1.2s_ease-in-out_infinite]" style={{ width: '40%' }} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
              <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
              <Route path="/updates" element={<PageWrapper><Updates /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
