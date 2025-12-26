import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                border: "hsl(214.3 31.8% 91.4%)",
                primary: "#6b21aa",
                "purple-light": "#f5f3ff",
                "purple-medium": "#9333ea",
            },
            animation: {
                "slide-down": "slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1)",
                "slide-up": "slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1)",
                "slide-in-left": "slide-in-left 0.6s ease-out forwards",
                "slide-in-right": "slide-in-right 0.6s ease-out forwards",
                "fade-up": "fade-up 0.8s ease-out forwards",
                "scale-in": "scale-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                "scroll-left": "scroll-left 40s linear infinite",
                "scroll-right": "scroll-right 40s linear infinite",
            },
            keyframes: {
                "scroll-left": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "scroll-right": {
                    "0%": { transform: "translateX(-50%)" },
                    "100%": { transform: "translateX(0)" },
                },
                "slide-down": {
                    from: { height: "0px" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "slide-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0px" },
                },
                "slide-in-left": {
                    "0%": { transform: "translateX(-30px)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                "slide-in-right": {
                    "0%": { transform: "translateX(30px)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                "fade-up": {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "scale-in": {
                    "0%": { transform: "scale(0.8)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
            },
            boxShadow: {
                "purple-hover": "0 10px 25px -5px rgba(107, 33, 170, 0.1), 0 8px 10px -6px rgba(107, 33, 170, 0.1)",
                "purple-glow": "0 0 20px rgba(107, 33, 170, 0.3)",
            },
        },
    },
    plugins: [],
} satisfies Config;
