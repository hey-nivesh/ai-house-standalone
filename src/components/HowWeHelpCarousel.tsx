"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { zoomInOut, viewportOptionsFast } from '@/lib/animations';

interface CarouselItem {
    id: string;
    title: string;
    description: string;
    image: string;
}

const items: CarouselItem[] = [
    {
        id: 'ai-ml-engineers',
        title: 'AI & ML Engineers',
        description: 'Engineers who want:\n• Real project exposure\n• Feedback on system design & models\n• Strong portfolios instead of certificates',
        image: '/ai-house/20251219_183535.jpg'
    },
    {
        id: 'venture-fund',
        title: 'Early-Stage AI Founders',
        description: 'Builders who need:\n• A focused AI-first workspace\n• Technical + product mentorship\n• Access to talent, pilots, and go-to-market guidance',
        image: '/ai-house/20251219_185847.jpg'
    },
    {
        id: 'research-labs',
        title: 'Students & Career Transitioners',
        description: 'People who are:\n• Serious about entering AI\n• Willing to build, fail, iterate\n• Done with random tutorials and copied projects',
        image: '/ai-house/20251219_190451.jpg'
    },
    {
        id: 'applied-ai-leaders',
        title: 'Applied AI Leaders & Product Builders',
        description: 'Professionals who are:\n• Leading or shaping AI adoption inside startups or enterprises\n• Responsible for turning models into deployable, scalable systems\n• Looking for peer-level discussions on architecture, MLOps, and real-world constraints',
        image: '/ai-house/20251219_191055.jpg'
    }
];

const HowWeHelpCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [resetEpoch, setResetEpoch] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const autoScrollIntervalRef = useRef<any>(null);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 } // 50% visibility to trigger auto-scroll
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Auto-scroll on mobile only
    useEffect(() => {
        if (!isMobile || !carouselRef.current || !isVisible) {
            if (autoScrollIntervalRef.current) {
                clearInterval(autoScrollIntervalRef.current);
            }
            return;
        }

        const scrollToCard = (index: number) => {
            const container = carouselRef.current;
            if (!container) return;

            const cards = container.querySelectorAll('[data-card-index]');
            const targetCard = cards[index] as HTMLElement;
            if (targetCard) {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        };

        const startAutoScroll = () => {
            if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
            autoScrollIntervalRef.current = setInterval(() => {
                setActiveIndex((prev) => {
                    const next = (prev + 1) % items.length;
                    scrollToCard(next);
                    return next;
                });
            }, 4000);
        };

        startAutoScroll();

        return () => {
            if (autoScrollIntervalRef.current) {
                clearInterval(autoScrollIntervalRef.current);
            }
        };
    }, [isMobile, isVisible, resetEpoch]);

    const handleCardClick = (index: number) => {
        setActiveIndex(index);

        // Scroll to card on mobile
        if (isMobile && carouselRef.current) {
            const container = carouselRef.current;
            const cards = container.querySelectorAll('[data-card-index]');
            const targetCard = cards[index] as HTMLElement;
            if (targetCard) {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }

        // Reset auto-scroll timer on mobile by triggering the effect
        setResetEpoch(Date.now());
    };

    const getCardStyle = (index: number) => {
        if (index === activeIndex) {
            // Decreased width on mobile: 65vw, reduced height
            return 'w-[65vw] sm:w-[400px] md:w-[460px] opacity-100';
        }
        // Slightly wider collapsed cards on mobile for better target
        return 'w-[45px] sm:w-[120px] md:w-[240px] opacity-60 hover:opacity-80';
    };

    return (
        <>
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <motion.div 
                ref={containerRef} 
                className="min-h-fit bg-white py-4 sm:py-10 md:py-16 px-2 sm:px-4"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptionsFast}
                variants={zoomInOut}
                style={{
                    willChange: "transform, opacity",
                    transform: "translateZ(0)",
                }}
            >
                <div className="max-w-[1400px] mx-auto">
                    {/* Header */}
                    <motion.div 
                        className="text-center mb-6 sm:mb-8 md:mb-16"
                        variants={zoomInOut}
                    >
                        <p className="text-[#724e99] text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2 md:mb-4 tracking-wide font-semibold">Fueling Your Growth</p>
                        <h1 className="text-[#1a1a1a] text-2xl sm:text-3xl md:text-6xl font-bold leading-tight">Who HiDevs AI House Is For</h1>
                    </motion.div>

                    {/* Carousel */}
                    <div
                        ref={carouselRef}
                        className="flex gap-2 sm:gap-4 justify-start sm:justify-center items-stretch overflow-x-auto pb-8 scrollbar-hide"
                        style={{
                            scrollSnapType: isMobile ? 'x mandatory' : 'none',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                data-card-index={index}
                                onClick={() => handleCardClick(index)}
                                className={`${getCardStyle(index)} flex-shrink-0 rounded-2xl sm:rounded-2xl md:rounded-3xl h-[300px] sm:h-[450px] md:h-[600px] overflow-hidden cursor-pointer transition-all duration-500 ease-out transform hover:scale-[1.01] shadow-lg relative`}
                                style={{
                                    scrollSnapAlign: isMobile ? 'center' : 'none',
                                }}
                            >
                                <div className="relative h-full w-full">
                                    {/* Background Image */}
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 460px"
                                    />


                                    {/* Content */}
                                    <div className={`absolute inset-0 flex flex-col justify-end p-3 sm:p-5 md:p-8 z-10 ${index === activeIndex ? 'bg-gradient-to-t from-black/60 via-black/30 to-transparent' : 'bg-black/30 hover:bg-black/40'}`}>
                                        {index === activeIndex ? (
                                            // Expanded View
                                            <div className="animate-fadeIn">
                                                <h3 className="text-white text-base sm:text-xl md:text-3xl font-bold mb-1.5 sm:mb-2 md:mb-4">{item.title}</h3>
                                                <div className="text-[#eadff5] text-[12px] sm:text-xs md:text-base font-medium leading-[1.5] whitespace-pre-line">
                                                    {item.description}
                                                </div>
                                            </div>
                                        ) : (
                                            // Collapsed View
                                            <h3
                                                className="text-white text-xs sm:text-base md:text-2xl font-bold transform origin-bottom-left pb-2 sm:pb-4 md:pb-0"
                                                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                                            >
                                                {item.title}
                                            </h3>
                                        )}
                                    </div>

                                    {/* Hover Effect Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleCardClick(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'w-8 bg-[#724e99]'
                                    : 'w-2 bg-[#724e99]/30 hover:bg-[#724e99]/50'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default HowWeHelpCarousel;
