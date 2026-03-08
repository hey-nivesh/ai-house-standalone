"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { zoomInOut, viewportOptionsFast } from "@/lib/animations";
import { worldMapStyles } from './styles/WorldMapSection.styles';
import Image from 'next/image';
import styled from 'styled-components';

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 0 1rem;
    max-width: 100%;
  }
`;

const MapImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Cleaned up unused styles

export default function WorldMapSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

    return (
        <motion.div
            ref={sectionRef}
            className={worldMapStyles.section}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptionsFast}
            variants={zoomInOut}
            style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                paddingBottom: '4rem'
            }}
        >
            <motion.div
                style={{
                    scale,
                    opacity,
                    willChange: 'transform, opacity',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div className={worldMapStyles.textContainer}>
                    <p className={worldMapStyles.title}>
                        HiDevs AI House is where AI builders
                        <span className={worldMapStyles.highlight}> stop learning in isolation </span>
                        and start building in the real world.
                    </p>
                </div>

                <MapWrapper>
                    <MapImageContainer>
                        <Image
                            src="/indian_map.png"
                            alt="India Map"
                            width={1200}
                            height={800}
                            priority
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                zIndex: 1,
                            }}
                        />
                    </MapImageContainer>
                </MapWrapper>
            </motion.div>
        </motion.div>
    );
}
