'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import MagazineHero from '@/components/Magazine/MagazineHero';
import MagazineFooter from '@/components/Magazine/MagazineFooter';
import ViewportNotice from '@/components/Magazine/ViewportNotice';

const MagazineViewer = dynamic(
  () => import('@/components/Magazine/MagazineViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-screen bg-white text-[#888] font-light tracking-[0.4em] uppercase text-xs">
        Loading HiDevs Newsletter...
      </div>
    ),
  }
);

export default function NewsletterPage() {
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const isAtStart = useRef(true);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && showHero) {
        setShowHero(false);
      } else if (e.deltaY < 0 && !showHero && isAtStart.current) {
        setShowHero(true);
      }
    };
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = e.changedTouches[0].clientY - touchStartY;
      if (diff < -20 && showHero) setShowHero(false);
      else if (diff > 20 && !showHero && isAtStart.current) setShowHero(true);
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [showHero]);

  const handleAtStart = useCallback((atStart: boolean) => {
    isAtStart.current = atStart;
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <ViewportNotice />

      <motion.div
        initial={false}
        animate={{ height: showHero ? '100vh' : 0, opacity: showHero ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: showHero ? 'auto' : 'none' }}
        className="overflow-hidden"
      >
        <MagazineHero />
      </motion.div>

      <div className="relative z-10">
        <MagazineViewer onAtStart={handleAtStart} onAtEnd={setIsAtEnd} heroVisible={showHero} />
      </div>

      <motion.div
        initial={false}
        animate={{ height: isAtEnd ? 'auto' : 0, opacity: isAtEnd ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: isAtEnd ? 'auto' : 'none' }}
        className="relative z-0 overflow-hidden"
      >
        <MagazineFooter />
      </motion.div>
    </main>
  );
}
