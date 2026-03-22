'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function MagazineHero() {
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
    </section>
  );
}
