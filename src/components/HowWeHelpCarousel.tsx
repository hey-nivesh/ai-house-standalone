"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        image: '/DSC_0615.jpg'
    }
];

const MobileContainer = styled.div`
  display: none;
  position: relative;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileSlider = styled(motion.div)`
  display: flex;
  width: 100%;
`;

const MobileCardWrapper = styled.div`
  flex: 0 0 100%;
  padding: 0 12.5%;
`;

const DesktopView = styled.div`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const IconButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #f3ebfa;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #724e99;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #724e99;
    color: white;
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${props => props.$active ? "1.5rem" : "0.5rem"};
  height: 0.5rem;
  border-radius: 1rem;
  background: ${props => props.$active ? "#724e99" : "#e3d3f2"};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const HowWeHelpCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handlePrevious = () => {
        setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        if (isMounted) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [isMounted]);

    if (!isMounted) return null;

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
            <div className="min-h-fit bg-white pb-2 sm:pb-4 md:pb-6 pt-0 px-2 sm:px-4">
                <div className="max-w-[1400px] mx-auto">
                    {/* Header */}
                    <div className="text-center mb-4 sm:mb-6 md:mb-8">
                        <p className="text-[#724e99] text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2 md:mb-4 tracking-wide font-semibold">Fueling Your Growth</p>
                        <h1 className="text-[#1a1a1a] text-2xl sm:text-3xl md:text-6xl font-bold leading-tight">Who HiDevs AI House Is For</h1>
                    </div>

                    {/* Mobile Slider View */}
                    <MobileContainer>
                        <MobileSlider
                            animate={{ x: `-${activeIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {items.map((item, index) => (
                                <MobileCardWrapper key={`mobile-${index}`}>
                                    <div className="w-full rounded-2xl h-[450px] overflow-hidden shadow-lg relative">
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                sizes="90vw"
                                                priority={index === 0}
                                            />
                                            <div className="absolute inset-0 flex flex-col justify-end p-5 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-left">
                                                <div className="animate-fadeIn">
                                                    <h3 className="text-white text-xl font-bold mb-3">{item.title}</h3>
                                                    <div className="text-[#eadff5] text-sm font-medium leading-relaxed whitespace-pre-line">
                                                        {item.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </MobileCardWrapper>
                            ))}
                        </MobileSlider>

                        <Controls>
                            <IconButton onClick={handlePrevious} aria-label="Previous">
                                <ChevronLeft size={20} />
                            </IconButton>
                            <Dots>
                                {items.map((_, i) => (
                                    <Dot
                                        key={`dot-${i}`}
                                        $active={i === activeIndex}
                                        onClick={() => setActiveIndex(i)}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </Dots>
                            <IconButton onClick={handleNext} aria-label="Next">
                                <ChevronRight size={20} />
                            </IconButton>
                        </Controls>
                    </MobileContainer>

                    {/* Desktop Carousel */}
                    <DesktopView>
                        <div className="flex justify-center items-center">
                            <div className="flex gap-4 items-stretch">
                                {items.map((item, index) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setActiveIndex(index)}
                                        className={`${getCardStyle(index)} flex-shrink-0 rounded-2xl md:rounded-3xl h-[450px] md:h-[600px] overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-lg relative`}
                                    >
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                sizes="460px"
                                            />
                                            <div className={`absolute inset-0 flex flex-col justify-end p-5 md:p-8 z-10 ${index === activeIndex ? 'bg-gradient-to-t from-black/70 via-black/30 to-transparent' : 'bg-black/40'}`}>
                                                {index === activeIndex ? (
                                                    <div className="animate-fadeIn">
                                                        <h3 className="text-white text-xl md:text-3xl font-bold mb-2 md:mb-4">{item.title}</h3>
                                                        <div className="text-[#eadff5] text-xs md:text-base font-medium leading-relaxed whitespace-pre-line text-left">
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <h3
                                                        className="text-white font-bold text-base md:text-2xl transform origin-bottom-left pb-4 md:pb-0"
                                                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                                                    >
                                                        {item.title}
                                                    </h3>
                                                )}
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Dots for Desktop */}
                        <div className="flex justify-center gap-2 mt-8">
                            {items.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                        ? 'w-8 bg-[#724e99]'
                                        : 'w-2 bg-[#724e99]/30 hover:bg-[#724e99]/50'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </DesktopView>
                </div>
            </div>
        </>
    );
};

export default HowWeHelpCarousel;