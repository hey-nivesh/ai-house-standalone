/**
 * Optimized styles for CoreOfferingsSection
 * Extracted for better performance and faster loading
 */

export const coreOfferingsStyles = {
    section: "min-h-screen bg-white pt-0 pb-12 md:py-20 px-4 md:px-8 overflow-hidden",
    container: "max-w-[1600px] mx-auto px-4 md:px-8",
    grid: "grid lg:grid-cols-2 gap-12 md:gap-20 lg:gap-24 items-center",
    
    // Image container
    imageContainer: "relative h-[400px] md:h-[600px] w-full",
    circleLarge: "absolute top-0 left-0 md:left-4 w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-2 md:border-4 border-[#eadff5] transition-transform duration-700 hover:scale-105",
    circleMedium: "absolute top-8 md:top-12 right-4 md:right-8 w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl border-2 md:border-4 border-[#e3d3f2] transition-transform duration-700 hover:scale-105",
    circleBottom: "absolute bottom-12 md:bottom-20 left-28 md:left-48 w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl border-2 md:border-4 border-[#eadff5] transition-transform duration-700 hover:scale-105",
    overlay: "absolute inset-0 bg-[#724e99]/10",
    
    // Content
    subtitle: "text-[#724e99] text-xs md:text-sm mb-3 md:mb-4 tracking-wide font-medium",
    title: "text-[#1a1a1a] text-3xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-16",
    offeringsList: "space-y-6 md:space-y-12",
    offeringItem: "flex gap-4 md:gap-6",
    numberBadge: "w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#724e99] to-[#e3d3f2] flex items-center justify-center shadow-lg",
    numberText: "text-white text-lg md:text-xl font-bold",
    contentTitle: "text-[#1a1a1a] text-lg md:text-2xl font-bold mb-1",
    contentSubtitle: "text-[#724e99] text-sm md:text-base font-medium mb-3",
    contentDescription: "text-[#1a1a1a]/70 text-sm md:text-base leading-relaxed whitespace-pre-line",
    
    // Decorative
    dot1: "absolute top-1/2 left-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#724e99] opacity-40 animate-pulse",
    dot2: "absolute top-1/3 right-1/4 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#e3d3f2] opacity-60 animate-pulse",
    dot3: "absolute bottom-1/3 left-1/4 w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#eadff5] opacity-50 animate-pulse",
};

