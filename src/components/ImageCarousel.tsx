"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const ImageCarousel = () => {
    const sectionRef = useRef<HTMLElement>(null);

    // Track scroll progress of the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Create zoom animation based on scroll (matching PartneredWith.tsx)
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Images from public/lbl (max 8)
    const topRowImages = [
        '/lbl/DSC_0116.JPG',
        '/lbl/DSC_0117.JPG',
        '/lbl/DSC_0118.JPG',
        '/lbl/DSC_0123.JPG',
        '/lbl/DSC_0124.JPG',
        '/lbl/DSC_0125.JPG',
        '/lbl/DSC_0126.JPG',
        '/lbl/DSC_0151.JPG',
    ];

    // Images from public/ai-house (max 8)
    const bottomRowImages = [
        '/ai-house/DSC_0031.jpg',
        '/ai-house/DSC_0042.jpg',
        '/ai-house/DSC_0044.jpg',
        '/ai-house/DSC_0061.jpg',
        '/ai-house/DSC_0062.jpg',
        '/ai-house/IMG_0405.jpg',
        '/ai-house/IMG_0406.jpg',
        '/ai-house/IMG_9036.jpg',
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-16 md:py-24 bg-white overflow-hidden"
        >
            <motion.div
                style={{
                    scale,
                    opacity,
                }}
                className="w-full"
            >
                <div className="container mx-auto px-4 mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1a1a1a] mb-4">
                        Powered by{' '}
                        <span className="bg-gradient-to-r from-[#724e99] to-[#e3d3f2] bg-clip-text text-transparent">
                            Organic Engagement
                        </span>
                    </h2>
                    <p className="text-center text-[#666666] text-lg max-w-2xl mx-auto">
                        Join a thriving community of developers, mentors, and innovators
                    </p>
                </div>

                {/* Top Row - Left to Right */}
                <div className="relative mb-4 md:mb-6 w-full overflow-hidden">
                    <motion.div
                        className="flex w-max"
                        animate={{
                            x: ["-50%", "0%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...topRowImages, ...topRowImages].map((img, index) => (
                            <div
                                key={`top-${index}`}
                                className="relative flex-shrink-0 w-[200px] h-[140px] md:w-[300px] md:h-[200px] lg:w-[400px] lg:h-[260px] mx-2 md:mx-3 rounded-xl overflow-hidden group"
                            >
                                <Image
                                    src={img}
                                    alt={`Community event ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                                    sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#724e99]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Row - Right to Left */}
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        className="flex w-max"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...bottomRowImages, ...bottomRowImages].map((img, index) => (
                            <div
                                key={`bottom-${index}`}
                                className="relative flex-shrink-0 w-[200px] h-[140px] md:w-[300px] md:h-[200px] lg:w-[400px] lg:h-[260px] mx-2 md:mx-3 rounded-xl overflow-hidden group"
                            >
                                <Image
                                    src={img}
                                    alt={`Community event ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                                    sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#724e99]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Gradient overlays for smooth edges - Adapted for Light Theme */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />
        </section>
    );
};

export default ImageCarousel;
