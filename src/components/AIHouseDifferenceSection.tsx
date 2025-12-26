"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { zoomInOut, viewportOptionsFast, staggerContainer, staggerItem } from '@/lib/animations';
import { differenceStyles } from './styles/AIHouseDifferenceSection.styles';

interface DifferenceItem {
    primary: string;
    secondary: string;
}

const AIHouseDifferenceSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Scroll-based zoom animation - optimized
    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const differences: DifferenceItem[] = [
        { primary: 'Execution', secondary: 'Education' },
        { primary: 'Proof of work', secondary: 'Certificates' },
        { primary: 'Feedback', secondary: 'One-time learning' },
        { primary: 'Builders', secondary: 'Audience' },
        { primary: 'Launch-ready skills', secondary: 'Theoretical knowledge' }
    ];

    return (
        <motion.div 
            ref={sectionRef} 
            className={differenceStyles.section}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptionsFast}
            variants={zoomInOut}
            style={{ willChange: "transform, opacity" }}
        >
            <div className={differenceStyles.container}>
                <div className={differenceStyles.grid}>
                    {/* Left Side - Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOptionsFast}
                    >
                        <p className={differenceStyles.subtitle}>
                            The HiDevs Difference
                        </p>
                        <h2 className={differenceStyles.title}>
                            What Makes HiDevs AI House Different
                        </h2>

                        {/* Differences List */}
                        <div className={differenceStyles.differencesList}>
                            {differences.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={differenceStyles.differenceItem}
                                    variants={staggerItem}
                                >
                                    {/* Primary (emphasized) */}
                                    <div className={differenceStyles.primary}>
                                        {item.primary}
                                    </div>

                                    {/* Greater than symbol */}
                                    <div className={differenceStyles.greaterThan}>
                                        &gt;
                                    </div>

                                    {/* Secondary (de-emphasized) */}
                                    <div className={differenceStyles.secondary}>
                                        {item.secondary}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom Message */}
                        <motion.div
                            className={differenceStyles.messageBox}
                            variants={staggerItem}
                        >
                            <p className={differenceStyles.messageText}>
                                This is not a place to <span className={differenceStyles.strikethrough}>"learn AI someday."</span>
                                <br />
                                This is a place to <span className={differenceStyles.highlight}>become useful in AI now.</span>
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Image with Zoom Animation */}
                    <motion.div
                        ref={imageRef}
                        className={differenceStyles.imageContainer}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={viewportOptionsFast}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            style={{ scale, opacity, willChange: "transform, opacity" }}
                            className={differenceStyles.imageWrapper}
                        >
                            <Image
                                src="/ai-house/DSC_0062.jpg"
                                alt="AI House Workspace"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="lazy"
                            />
                            <div className={differenceStyles.imageOverlay} />
                        </motion.div>

                        {/* Decorative accent */}
                        <div className={differenceStyles.accent1} />
                        <div className={differenceStyles.accent2} />
                    </motion.div>

                </div>
            </div>
        </motion.div>
    );
};

export default AIHouseDifferenceSection;
