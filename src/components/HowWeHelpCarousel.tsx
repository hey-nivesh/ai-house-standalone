"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
            { threshold: 0.5 }
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

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    const handlePrevious = () => {
        const newIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };

    const getCardStyle = (index: number) => {
        // Desktop: expandable cards
        if (index === activeIndex) {
            return 'w-[400px] md:w-[460px] opacity-100';
        }
        return 'w-[120px] md:w-[240px] opacity-60 hover:opacity-80';
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
            <div ref={containerRef} className="min-h-fit bg-white py-4 sm:py-10 md:py-16 px-2 sm:px-4">
                <div className="max-w-[1400px] mx-auto">
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8 md:mb-16">
                        <p className="text-[#724e99] text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2 md:mb-4 tracking-wide font-semibold">Fueling Your Growth</p>
                        <h1 className="text-[#1a1a1a] text-2xl sm:text-3xl md:text-6xl font-bold leading-tight">Who HiDevs AI House Is For</h1>
                    </div>

                    {/* Mobile Single Card View */}
                    {isMobile ? (
                        <div className="flex justify-center items-center px-4">
                            <div className="w-full max-w-[90vw] rounded-2xl h-[450px] overflow-hidden shadow-lg relative">
                                <div className="relative h-full w-full">
                                    {/* Background Image */}
                                    <Image
                                        src={items[activeIndex].image}
                                        alt={items[activeIndex].title}
                                        fill
                                        className="object-cover"
                                        sizes="90vw"
                                        priority
                                    />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-5 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                                        <div className="animate-fadeIn">
                                            <h3 className="text-white text-xl font-bold mb-3">{items[activeIndex].title}</h3>
                                            <div className="text-[#eadff5] text-sm font-medium leading-relaxed whitespace-pre-line">
                                                {items[activeIndex].description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Desktop Carousel
                        <div className="flex justify-center items-center">
                            <div
                                ref={carouselRef}
                                className="flex gap-4 items-stretch"
                            >
                                {items.map((item, index) => (
                                    <div
                                        key={item.id}
                                        data-card-index={index}
                                        onClick={() => handleCardClick(index)}
                                        className={`${getCardStyle(index)} flex-shrink-0 rounded-2xl md:rounded-3xl h-[450px] md:h-[600px] overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-lg relative`}
                                    >
                                        <div className="relative h-full w-full">
                                            {/* Background Image */}
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                sizes="460px"
                                            />

                                            {/* Content */}
                                            <div className={`absolute inset-0 flex flex-col justify-end p-5 md:p-8 z-10 ${index === activeIndex ? 'bg-gradient-to-t from-black/70 via-black/30 to-transparent' : 'bg-black/40'}`}>
                                                {index === activeIndex ? (
                                                    // Expanded View
                                                    <div className="animate-fadeIn">
                                                        <h3 className="text-white text-xl md:text-3xl font-bold mb-2 md:mb-4">{item.title}</h3>
                                                        <div className="text-[#eadff5] text-xs md:text-base font-medium leading-relaxed whitespace-pre-line">
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // Collapsed View - vertical text
                                                    <h3
                                                        className="text-white font-bold text-base md:text-2xl transform origin-bottom-left pb-4 md:pb-0"
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
                        </div>
                    )}

                    {/* Mobile Arrow Navigation */}
                    {isMobile && (
                        <div className="flex justify-center items-center gap-6 mt-6">
                            <button
                                onClick={handlePrevious}
                                className="w-12 h-12 rounded-full bg-[#724e99] text-white flex items-center justify-center shadow-lg hover:bg-[#5c3d7a] transition-colors duration-300 active:scale-95"
                                aria-label="Previous slide"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full bg-[#724e99] text-white flex items-center justify-center shadow-lg hover:bg-[#5c3d7a] transition-colors duration-300 active:scale-95"
                                aria-label="Next slide"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Navigation Dots */}
                    <div className={`flex justify-center gap-2 ${isMobile ? 'mt-4' : 'mt-8'}`}>
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => isMobile ? setActiveIndex(index) : handleCardClick(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'w-8 bg-[#724e99]'
                                    : 'w-2 bg-[#724e99]/30 hover:bg-[#724e99]/50'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HowWeHelpCarousel;