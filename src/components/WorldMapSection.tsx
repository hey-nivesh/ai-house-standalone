"use client";
import React, { useRef } from 'react';
import { WorldMap } from "@/components/ui/world-map";
import { motion, useScroll, useTransform } from "framer-motion";
import { zoomInOut, viewportOptionsFast } from "@/lib/animations";
import { worldMapStyles } from './styles/WorldMapSection.styles';

export default function WorldMapSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Scroll-based zoom animation with optimized performance
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

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
            }}
        >
            <motion.div
                style={{ 
                    scale, 
                    opacity,
                    willChange: 'transform, opacity',
                }}
                className={worldMapStyles.container}
            >
                <div className={worldMapStyles.textContainer}>
                    <p className={worldMapStyles.title}>
                        HiDevs AI House is where AI builders
                        <span className={worldMapStyles.highlight}> stop learning in isolation </span>
                        and start building in the real world.
                    </p>
                </div>

                <WorldMap
                    lineColor="#724e99"
                    dots={[
                        {
                            start: {
                                lat: 64.2008,
                                lng: -149.4937,
                            }, // Alaska (Fairbanks)
                            end: {
                                lat: 34.0522,
                                lng: -118.2437,
                            }, // Los Angeles
                        },
                        {
                            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                        },
                        {
                            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                        },
                        {
                            start: { lat: 51.5074, lng: -0.1278 }, // London
                            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                        },
                    ]}
                />
            </motion.div>
        </motion.div>
    );
}
