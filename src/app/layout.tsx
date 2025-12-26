import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Preload animations early for better performance
import "@/lib/animations";

const inter = Inter({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap", // Optimize font loading
    preload: true,
});

export const metadata: Metadata = {
    title: "AI House Bangalore - Learn | Build | Launch",
    description: "Bangalore's dedicated AI execution hub for engineers and founders.",
    icons: {
        icon: '/logo-white.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Preload critical resources */}
                <link rel="preload" href="/hidevslogo.png" as="image" />
                <link rel="preload" href="/hero-workshop.png" as="image" />
                {/* Prefetch DNS for external resources */}
                <link rel="dns-prefetch" href="https://docs.google.com" />
                <link rel="dns-prefetch" href="https://maps.app.goo.gl" />
                <link rel="dns-prefetch" href="https://www.google.com" />
            </head>
            <body
                className={`${inter.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
