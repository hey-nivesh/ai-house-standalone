'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Spread1Left, Spread1Right,
  Spread2Left, Spread2Right,
  Spread3Left, Spread3Right,
  Spread4Left, Spread4Right,
  Spread5Left, Spread5Right,
} from './MagazineContent';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PageProps {
  number: number;
  children: React.ReactNode;
  isCover?: boolean;
  side?: 'left' | 'right';
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(({ number, children, isCover, side }, ref) => {
  return (
    <div className="page" ref={ref} data-density="soft">
      <div className="page-content relative w-full h-full bg-[#FFFFFF] group overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.02)]" data-density="soft">
        {/* Page Content */}
        <div className="w-full h-full relative z-10" data-density="soft">
          {children}

          {/* Subtle Paper Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.03] pointer-events-none" />

          {/* Subtle Spine / Crease Shadow - refined and proportional */}
          <div className={cn(
            "absolute top-0 w-32 h-full pointer-events-none opacity-20 z-20 transition-opacity duration-700",
            side === 'right' ? "left-0 bg-gradient-to-r from-black/30 to-transparent" : "right-0 bg-gradient-to-l from-black/30 to-transparent"
          )} />
        </div>

        {/* Page Numbering - Light Theme Elegant */}
        {!isCover && (
          <div className={cn(
            "absolute bottom-8 text-[10px] tracking-[0.4em] text-black/20 font-light uppercase z-30 font-serif italic",
            side === 'right' ? "right-12" : "left-12"
          )}>
            — {number} —
          </div>
        )}

        {/* Dynamic Shadow on flip-trigger */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] to-transparent pointer-events-none z-[15]" />
      </div>
    </div>
  );
});

Page.displayName = 'Page';

const MAGAZINE_PAGE_COMPONENTS = [
  Spread1Left,   // Spread 1 Left  — Strategic Pivot
  Spread1Right,  // Spread 1 Right
  Spread2Left,   // Spread 2 Left  — Ecosystem
  Spread2Right,  // Spread 2 Right
  Spread3Left,   // Spread 3 Left  — Platform Innovation
  Spread3Right,  // Spread 3 Right
  Spread4Left,   // Spread 4 Left  — Challenges
  Spread4Right,  // Spread 4 Right
  Spread5Left,   // Spread 5 Left  — Vision 2030
  Spread5Right,  // Spread 5 Right
];

interface MagazineViewerProps {
  onAtStart?: (atStart: boolean) => void;
  onAtEnd?: (atEnd: boolean) => void;
}

export default function MagazineViewer({ onAtStart, onAtEnd }: MagazineViewerProps) {
  const flipBook = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const currentPageRef = useRef(0);
  const totalPageRef = useRef(0);
  const isFlipping = useRef(false);
  const lastFlipTime = useRef(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 1000, portrait: false });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isPortrait = w < 768;
      setDimensions({
        width: isPortrait ? w : Math.floor(w / 2),
        height: isPortrait ? Math.floor(w * 1.4) : h,
        portrait: isPortrait,
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 4000);
    return () => clearTimeout(timer);
  }, [showControls]);

  const onInit = useCallback((e: any) => {
    const count = e.object.getPageCount();
    setTotalPage(count);
    totalPageRef.current = count;
  }, []);

  const onChangeState = useCallback((e: any) => {
    if (e.data === 'read') {
      isFlipping.current = false;
    }
  }, []);

  const onFlip = useCallback((e: any) => {
    const newPage = e.data;
    setCurrentPage(newPage);
    currentPageRef.current = newPage;
    const total = totalPageRef.current;

    if (onAtStart) onAtStart(newPage === 0);
    if (onAtEnd && total > 0) onAtEnd(newPage >= total - 2);
  }, [onAtStart, onAtEnd]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const COOLDOWN = 1100; // ms — matches flippingTime + buffer

    const handleWheelNative = (e: WheelEvent) => {
      const delta = e.deltaY;
      const threshold = 30;
      if (Math.abs(delta) <= threshold) return;

      const now = Date.now();
      const page = currentPageRef.current;
      const total = totalPageRef.current;

      const canFlip = now - lastFlipTime.current > COOLDOWN;
      if (!canFlip) return; // don't preventDefault either — let it feel natural

      if (delta > 0) {
        if (page < total - 2) {
          e.preventDefault();
          lastFlipTime.current = now;
          isFlipping.current = true;
          flipBook.current?.pageFlip()?.flipNext('bottom');
        }
      } else {
        if (page > 0) {
          e.preventDefault();
          lastFlipTime.current = now;
          isFlipping.current = true;
          flipBook.current?.pageFlip()?.flipPrev('bottom');
        }
      }
    };

    el.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => el.removeEventListener('wheel', handleWheelNative);
  }, []); // register once — reads live values via refs

  return (
    <div
      ref={containerRef}
      className="magazine-container relative w-full bg-white overflow-hidden"
      style={{ height: dimensions.portrait ? `${dimensions.height + 80}px` : '100vh' }}
      onMouseMove={() => setShowControls(true)}
    >
      {/* Magazine Engine - Fully adaptive to screen */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full flex items-center justify-center p-0"
        >
          <HTMLFlipBook
            width={dimensions.width}
            height={dimensions.height}
            size="stretch"
            minWidth={100}
            maxWidth={4000}
            minHeight={100}
            maxHeight={4000}
            drawShadow={false}
            flippingTime={1000}
            showCover={false}
            usePortrait={dimensions.portrait}
            startPage={0}
            useMouseEvents={false}
            swipeDistance={30}
            showPageCorners={false}
            disableFlipByClick={false}
            onFlip={onFlip}
            onChangeState={onChangeState}
            onInit={onInit}
            className="magazine-book shadow-none"
            style={{
              width: '100%',
              height: '100%',
              margin: '0'
            }}
            ref={flipBook}
          >
            {MAGAZINE_PAGE_COMPONENTS.map((SpreadComponent, index) => {
              const side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';

              return (
                <Page
                  key={index}
                  number={index + 1}
                  isCover={false}
                  side={side}
                >
                  <SpreadComponent />
                </Page>
              );
            })}
          </HTMLFlipBook>
        </motion.div>
      </div>
    </div>
  );
}
