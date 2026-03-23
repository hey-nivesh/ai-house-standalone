'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MagazineHero() {
  const [show, setShow] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(false);
    window.addEventListener('wheel', onScroll, { passive: true });
    return () => window.removeEventListener('wheel', onScroll);
  }, []);

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0a0514 0%, #1a0a2e 50%, #0d0d1a 100%)' }}
    >
      {/* Video */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero_bg_poster.jpg"
          onPlaying={() => setVideoReady(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        >
          <source src="/hero_bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Loading overlay — on top of video, removed once playing */}
      <AnimatePresence>
        {!videoReady && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              pointerEvents: 'none',
              isolation: 'isolate',
              background: 'linear-gradient(135deg, #0a0514 0%, #1a0a2e 50%, #0d0d1a 100%)',
            }}
          >
            {/* Blurred orbs */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '20%', left: '15%',
                  width: 400, height: 400,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(114,78,153,0.25) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.12, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '20%', right: '10%',
                  width: 350, height: 350,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(80,40,160,0.2) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
            </div>

            {/* Centered loading content — isolated from blur */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              isolation: 'isolate',
            }}>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.75)',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Loading HiDevs Newsletter
              </motion.p>

              <div style={{
                width: 180, height: 2, borderRadius: 2,
                background: 'rgba(255,255,255,0.08)',
                overflow: 'hidden', position: 'relative',
              }}>
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '60%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(160,100,220,0.9), transparent)',
                    borderRadius: 2,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                    style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'rgba(160, 100, 220, 0.85)',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll down hint */}
      <AnimatePresence>
        {show && videoReady && (
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
              bottom: '4rem',
              left: 0, right: 0,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 30,
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
