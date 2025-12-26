/**
 * Optimized styles for AIHouseDifferenceSection
 * Extracted for better performance
 */

export const differenceStyles = {
    section: "min-h-screen bg-white py-12 md:py-20 px-4 md:px-8 overflow-hidden",
    container: "max-w-[1600px] mx-auto px-4 md:px-8",
    grid: "grid lg:grid-cols-2 gap-12 md:gap-20 lg:gap-24 items-center",
    
    // Content
    subtitle: "text-[#724e99] text-xs md:text-sm mb-3 md:mb-4 tracking-wide font-medium",
    title: "text-[#1a1a1a] text-3xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12",
    differencesList: "space-y-6 md:space-y-8 mb-8 md:mb-12",
    differenceItem: "flex items-center gap-4 md:gap-6",
    primary: "flex-1 text-[#724e99] text-lg md:text-2xl font-bold",
    greaterThan: "text-[#724e99] text-2xl md:text-3xl font-bold",
    secondary: "flex-1 text-[#1a1a1a]/40 text-lg md:text-2xl font-medium line-through",
    
    // Bottom message
    messageBox: "border-l-4 border-[#724e99] pl-4 md:pl-6",
    messageText: "text-[#1a1a1a] text-base md:text-xl font-medium leading-relaxed",
    strikethrough: "line-through text-[#1a1a1a]/40",
    highlight: "text-[#724e99] font-bold",
    
    // Image
    imageContainer: "relative h-[400px] md:h-[600px] w-full",
    imageWrapper: "relative w-full h-full rounded-3xl overflow-hidden shadow-2xl",
    imageOverlay: "absolute inset-0 bg-gradient-to-t from-[#724e99]/20 to-transparent",
    accent1: "absolute -bottom-4 -right-4 w-32 h-32 md:w-48 md:h-48 bg-[#eadff5] rounded-full -z-10 blur-3xl opacity-50",
    accent2: "absolute -top-4 -left-4 w-24 h-24 md:w-36 md:h-36 bg-[#e3d3f2] rounded-full -z-10 blur-2xl opacity-40",
};

