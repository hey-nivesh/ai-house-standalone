'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NoticeType = 'alert' | 'info';

interface Notice {
  message: string;
  type: NoticeType;
}

export default function ViewportNotice() {
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 5000);
    const handleClick = () => setNotice(null);
    window.addEventListener('click', handleClick);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleClick);
    };
  }, [notice]);

  useEffect(() => {
    const w = window.innerWidth;
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || w < 768;
    const isMaximizedOrFullscreen = window.outerWidth >= screen.width - 10;
    const isSmallDesktop = !isMobile && !isMaximizedOrFullscreen;

    if (isMobile) {
      setNotice({
        type: 'alert',
        message: "This magazine is crafted for a full desktop experience. For the best reading quality, rich layouts, and immersive spreads — please open this on a laptop or desktop.",
      });
    } else if (isSmallDesktop) {
      setNotice({
        type: 'alert',
        message: "Your window is a bit small for this experience. Press F11 (or use your browser's fullscreen) to unlock the full magazine layout as it was designed to be seen.",
      });
    } else {
      setNotice({
        type: 'info',
        message: "For the most immersive reading experience, we recommend viewing this magazine in fullscreen mode.",
      });
    }
  }, []);

  if (!notice) return null;

  // Subtle info toast — no blur, no overlay
  if (notice.type === 'info') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-6 right-6 z-[9999] max-w-xs pointer-events-none"
        >
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg"
            style={{
              background: 'rgba(74, 40, 128, 0.92)',
              border: '1px solid rgba(114, 78, 153, 0.6)',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginTop: '1px' }}>ℹ</span>
            <p
              className="text-xs leading-relaxed"
              style={{ fontFamily: 'system-ui, sans-serif', color: 'rgba(255,255,255,0.9)' }}
            >
              {notice.message}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Alert toast — with blur backdrop
  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9998] backdrop-blur-sm pointer-events-none"
          style={{ background: 'rgba(74, 40, 128, 0.15)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-6 right-6 z-[9999] max-w-sm w-[90vw] pointer-events-none"
        >
          <div
            className="text-white text-center px-7 py-6 rounded-2xl shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #4a2880 0%, #724e99 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <p
              className="mb-3 text-[10px] tracking-[0.35em] uppercase"
              style={{ fontFamily: "'Oswald', sans-serif", color: 'rgba(255,255,255,0.55)' }}
            >
              HiDevs Newsletter
            </p>
            <p
              className="text-sm leading-relaxed font-light"
              style={{ fontFamily: 'system-ui, sans-serif', color: 'rgba(255,255,255,0.92)', letterSpacing: '0.01em' }}
            >
              {notice.message}
            </p>
            <div className="mt-4 mx-auto w-10 h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
