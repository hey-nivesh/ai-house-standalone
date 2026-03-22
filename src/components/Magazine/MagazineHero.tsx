'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MagazineHero() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const onScroll = () => setShow(false);
    window.addEventListener('wheel', onScroll, { passive: true });
    return () => window.removeEventListener('wheel', onScroll);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        >
          <source src="/hero_bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Scroll down hint */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            exit={{ opacity: 0, y: 8 }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              borderRadius: '0.5rem',
              background: 'rgba(10, 5, 20, 0.82)',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.78rem' }}>↓</span>
              <p style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.04em',
                margin: 0,
                whiteSpace: 'nowrap',
              }}>
                Scroll down to read the magazine
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
