/**
 * Reusable animation variants for smooth, performant animations
 * Loaded early to ensure animations are ready when components mount
 * Optimized for hardware acceleration and smooth scrolling
 */

// Enhanced zoom in/out animation with better easing
export const zoomInOut = {
    hidden: {
        opacity: 0,
        scale: 0.75,
        y: 40,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: [0.34, 1.56, 0.64, 1], // Smooth bounce effect
            opacity: { duration: 0.4 },
            scale: { 
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1]
            },
            y: { 
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1]
            },
            filter: { duration: 0.3 },
        },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: {
            duration: 0.3,
        },
    },
};

// Zoom in animation (for initial load)
export const zoomIn = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.4 },
            scale: { duration: 0.6 },
            filter: { duration: 0.3 },
        },
    },
};

// Zoom out animation (subtle zoom out effect)
export const zoomOut = {
    hidden: {
        opacity: 0,
        scale: 1.15,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.4 },
            scale: { duration: 0.6 },
            filter: { duration: 0.3 },
        },
    },
};

// Fade up with zoom
export const fadeUpZoom = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.9,
        filter: "blur(10px)",
    },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: [0.34, 1.56, 0.64, 1],
            delay,
            opacity: { duration: 0.4, delay },
            scale: { duration: 0.7, delay },
            y: { duration: 0.7, delay },
            filter: { duration: 0.3, delay },
        },
    }),
};

// Fade up (original)
export const fadeUp = {
    hidden: {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
    },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: "easeOut",
            delay,
        },
    }),
};

// Stagger container for child animations
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12, // Reduced for faster sequential loading
            delayChildren: 0.05,
        },
    },
};

// Stagger item for children
export const staggerItem = {
    hidden: {
        opacity: 0,
        scale: 0.85,
        y: 30,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
        },
    },
};

// Slide in from left with zoom
export const slideInFromLeft = {
    hidden: {
        opacity: 0,
        x: -60,
        scale: 0.85,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
        },
    },
};

// Slide in from right with zoom
export const slideInFromRight = {
    hidden: {
        opacity: 0,
        x: 60,
        scale: 0.85,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
        },
    },
};

// Scale animation for cards
export const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.7,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
        },
    },
};

// Viewport options for consistent intersection observer behavior
export const viewportOptions = {
    once: true,
    amount: 0.15, // Trigger when 15% of element is visible (faster trigger)
    margin: "0px 0px -150px 0px", // Start loading 150px before entering viewport
};

// Optimized viewport options for faster loading
export const viewportOptionsFast = {
    once: true,
    amount: 0.1, // Trigger when 10% is visible
    margin: "0px 0px -200px 0px", // Start loading 200px before entering viewport
};
