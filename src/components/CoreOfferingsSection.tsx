"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { zoomInOut, viewportOptionsFast, staggerContainer, staggerItem } from '@/lib/animations';
import { coreOfferingsStyles } from './styles/CoreOfferingsSection.styles';

interface OfferingItem {
    number: string;
    title: string;
    subtitle: string;
    description: string;
}

const CoreOfferingsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const offerings: OfferingItem[] = [
        {
            number: '01',
            title: 'For Founders & Startup Builders',
            subtitle: 'Turn your vision into reality.',
            description: '• Free Workspace: A productive home.\n• Comprehensive Support: Help with strategy, product feedback & investor connections.\n• Rich Experiences: Exclusive access to:\n  - Founder-only events & roundtables\n  - Technical workshops\n  - Demo Days for investors\n  - Curated networking'
        },
        {
            number: '02',
            title: 'For Campus Communities & Clubs',
            subtitle: "Amplify your club's impact.",
            description: '• Event Space: Host hackathons & workshops.\n• Expanded Network: Pan-India builder community.\n• Full Event Support: Logistical & promotional backing.\n• Expert Workshops: Like our 3-Day GenAI masterclass.'
        },
        {
            number: '03',
            title: 'For Engineers & Student Builders',
            subtitle: 'Level up your skills & career.',
            description: '• Hands-On Learning: Build real AI projects.\n• Event Participation: Hackathons & workshops.\n• Career Gateway: Curated internships & jobs.\n• Community Collaboration: Learn with peers & seniors.'
        }
    ];

    return (
        <motion.div 
            ref={sectionRef} 
            className={coreOfferingsStyles.section}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptionsFast}
            variants={zoomInOut}
            style={{ willChange: "transform, opacity" }}
        >
            <div className={coreOfferingsStyles.container}>
                <div className={coreOfferingsStyles.grid}>
                    {/* Left Side - Images */}
                    <motion.div
                        className={coreOfferingsStyles.imageContainer}
                        variants={staggerItem}
                    >
                        {/* Large Circle - Top Left */}
                        <motion.div
                            className={coreOfferingsStyles.circleLarge}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={viewportOptionsFast}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Image
                                src="/ai-house/DSC_0031.jpg"
                                alt="AI Workspace"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 192px, 320px"
                                loading="lazy"
                            />
                            <div className={coreOfferingsStyles.overlay} />
                        </motion.div>

                        {/* Medium Circle - Top Right */}
                        <motion.div
                            className={coreOfferingsStyles.circleMedium}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={viewportOptionsFast}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Image
                                src="/ai-house/DSC_0042.jpg"
                                alt="Team Collaboration"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 128px, 224px"
                                loading="lazy"
                            />
                            <div className={coreOfferingsStyles.overlay} />
                        </motion.div>

                        {/* Medium Circle - Bottom Center */}
                        <motion.div
                            className={coreOfferingsStyles.circleBottom}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={viewportOptionsFast}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Image
                                src="/ai-house/DSC_0044.jpg"
                                alt="Builder Community"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 160px, 256px"
                                loading="lazy"
                            />
                            <div className={coreOfferingsStyles.overlay} />
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className={coreOfferingsStyles.dot1} />
                        <div className={coreOfferingsStyles.dot2} />
                        <div className={coreOfferingsStyles.dot3} />
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOptionsFast}
                    >
                        <p className={coreOfferingsStyles.subtitle}>
                            Discover Their Journey: From Idea to Scale
                        </p>
                        <h2 className={coreOfferingsStyles.title}>
                            Core Offerings
                        </h2>

                        {/* Offerings List */}
                        <div className={coreOfferingsStyles.offeringsList}>
                            {offerings.map((offering, index) => (
                                <motion.div
                                    key={offering.number}
                                    className={coreOfferingsStyles.offeringItem}
                                    variants={staggerItem}
                                >
                                    {/* Number Badge */}
                                    <div className="flex-shrink-0">
                                        <div className={coreOfferingsStyles.numberBadge}>
                                            <span className={coreOfferingsStyles.numberText}>{offering.number}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pt-1">
                                        <h3 className={coreOfferingsStyles.contentTitle}>
                                            {offering.title}
                                        </h3>
                                        <p className={coreOfferingsStyles.contentSubtitle}>
                                            {offering.subtitle}
                                        </p>
                                        <p className={coreOfferingsStyles.contentDescription}>
                                            {offering.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default CoreOfferingsSection;
