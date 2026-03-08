"use client";
import React from "react";
import Image from "next/image";
import { worldMapStyles } from './styles/WorldMapSection.styles';

export default function WorldMapSection() {
    return (
        <section className={worldMapStyles.section}>
            <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 text-center">
                <div className={worldMapStyles.textContainer}>
                    <h2 className={worldMapStyles.title}>
                        Across the <span className={worldMapStyles.highlight}>Nation</span>
                    </h2>
                </div>

                <div className="relative w-full max-w-4xl flex items-center justify-center">
                    <Image
                        src="/aiHouse_locations.png"
                        alt="HiDevs AI House Locations"
                        width={1200}
                        height={600}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}

