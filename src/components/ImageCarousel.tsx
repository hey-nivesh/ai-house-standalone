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

    const topRowImages = [
        '/workshop/20250928_105809.jpg',
        '/new_event_images/DSC_0598.jpg',
        '/open_Claw_event/WhatsApp Image 2026-03-01 at 00.43.02.jpeg',
        '/cohort-workshop/DSC01976.JPG',
        '/ai-house/20251219_183535.jpg',
        '/workshop/DSC01978.png',
        '/new_event_images/DSC_0600.jpg',
        '/open_Claw_event/WhatsApp Image 2026-03-01 at 00.43.03 (1).jpeg',
        '/cohort-workshop/DSC01981.JPG',
        '/ai-house/20251219_185847.jpg',
        '/workshop/DSC_0313.JPG',
        '/new_event_images/DSC_0604.jpg',
        '/open_Claw_event/WhatsApp Image 2026-03-01 at 00.43.03.jpeg',
        '/cohort-workshop/DSC01998.JPG',
        '/ai-house/20251219_190451.jpg',
        '/workshop/DSC_0333.JPG',
        '/new_event_images/DSC_0606.jpg',
        '/open_Claw_event/WhatsApp Image 2026-03-01 at 00.43.04 (1).jpeg',
        '/ai-house/20251219_191055.jpg',
    ];

    const bottomRowImages = [
        '/workshop/IMG-20241119-WA0005.jpeg',
        '/new_event_images/DSC_0608.jpg',
        '/open_Claw_event/WhatsApp Image 2026-03-01 at 00.43.04.jpeg',
        '/cohort-workshop/IMG20250523122224_01.jpg',
        '/ai-house/20251219_191527.jpg',
        '/new_event_images/DSC_0609.jpg',
        '/open_Claw_event/WhatsApp Image 2026-03-01 at 00.43.05.jpeg',
        '/cohort-workshop/IMG_20241111_100744.jpg',
        '/ai-house/20251219_192623.jpg',
        '/new_event_images/DSC_0615.jpg',
        '/open_Claw_event/WhatsApp Image 2026-03-01 at 00.43.03.jpeg',
        '/cohort-workshop/IMG_20241114_144015.jpg',
        '/ai-house/20251219_193000.jpg',
        '/workshop/IMG20241115143037.png',
        '/new_event_images/DSC_0624.jpg',
        '/open_Claw_event/WhatsApp Image 2026-03-01 at 00.43.02.jpeg',
        '/cohort-workshop/IMG_3787.jpg',
        '/ai-house/20251219_195134.jpg',
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
                <div className="container mx-auto px-4 mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-[#1a1a1a] mb-4 leading-tight">
                        Powered by{" "}
                        <br className="md:hidden" />
                        <span className="bg-gradient-to-r from-[#724e99] to-[#e3d3f2] bg-clip-text text-transparent">
                            Organic Engagement
                        </span>
                    </h2>
                    <p className="text-center text-[#666666] text-base md:text-lg max-w-2xl mx-auto">
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
                                duration: 80,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...topRowImages, ...topRowImages].map((img, index) => (
                            <div
                                key={`top-${index}`}
                                className="relative flex-shrink-0 w-[150px] h-[100px] md:w-[300px] md:h-[200px] lg:w-[400px] lg:h-[260px] mx-1 md:mx-3 rounded-xl overflow-hidden group"
                            >
                                <Image
                                    src={img}
                                    alt={`Community event ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                                    sizes="(max-width: 768px) 150px, (max-width: 1024px) 300px, 400px"
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
                                duration: 80,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...bottomRowImages, ...bottomRowImages].map((img, index) => (
                            <div
                                key={`bottom-${index}`}
                                className="relative flex-shrink-0 w-[150px] h-[100px] md:w-[300px] md:h-[200px] lg:w-[400px] lg:h-[260px] mx-1 md:mx-3 rounded-xl overflow-hidden group"
                            >
                                <Image
                                    src={img}
                                    alt={`Community event ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                                    sizes="(max-width: 768px) 150px, (max-width: 1024px) 300px, 400px"
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