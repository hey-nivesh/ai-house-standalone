"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { zoomInOut, viewportOptionsFast } from "@/lib/animations";

interface LazyLoadWrapperProps {
    children: React.ReactNode;
    minHeight?: string;
    className?: string;
    delay?: number;
    animationVariant?: typeof zoomInOut;
}

/**
 * Optimized wrapper component that loads children one by one on scroll
 * Uses Intersection Observer for efficient lazy loading with zoom animations
 * Components load sequentially with staggered delays for smooth experience
 */
export default function LazyLoadWrapper({
    children,
    minHeight = "400px",
    className = "",
    delay = 0,
    animationVariant = zoomInOut,
}: LazyLoadWrapperProps) {
    const [isInView, setIsInView] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !shouldLoad) {
                        // Start loading immediately when approaching viewport
                        setShouldLoad(true);
                        // Trigger animation after delay for sequential effect
                        const timer = setTimeout(() => {
                            setIsInView(true);
                        }, delay);
                        
                        observer.unobserve(entry.target);
                        
                        return () => clearTimeout(timer);
                    }
                });
            },
            {
                rootMargin: "200px 0px", // Start loading 200px before entering viewport
                threshold: 0.05, // Trigger when 5% is visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [delay, shouldLoad]);

    return (
        <div
            ref={ref}
            className={className}
            style={{ 
                minHeight: shouldLoad ? "auto" : minHeight,
                position: "relative",
            }}
        >
            {shouldLoad ? (
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={animationVariant}
                    viewport={viewportOptionsFast}
                    style={{
                        willChange: "transform, opacity",
                        transform: "translateZ(0)",
                        backfaceVisibility: "hidden",
                        perspective: 1000,
                    }}
                >
                    {children}
                </motion.div>
            ) : (
                <div
                    style={{
                        minHeight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0.2,
                        transition: "opacity 0.3s ease",
                    }}
                />
            )}
        </div>
    );
}

