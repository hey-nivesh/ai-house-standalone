"use client";
import React from "react";
import dynamic from "next/dynamic";
import { GlobeMarker } from "@/components/ui/3d-globe";
import { worldMapStyles } from './styles/WorldMapSection.styles';

const Globe3D = dynamic(() => import("@/components/ui/3d-globe").then(mod => mod.Globe3D), {
    ssr: false,
});

const sampleMarkers: GlobeMarker[] = [
    { lat: 37.7749, lng: -122.4194, src: "https://assets.aceternity.com/avatars/1.webp" }, // San Francisco
    { lat: 12.9716, lng: 77.5946, src: "https://assets.aceternity.com/avatars/2.webp" }, // Karnataka (Bangalore)
    { lat: 17.3850, lng: 78.4867, src: "https://assets.aceternity.com/avatars/3.webp" }, // Telangana (Hyderabad)
    { lat: 23.2599, lng: 77.4126, src: "https://assets.aceternity.com/avatars/4.webp" }, // Madhya Pradesh
    { lat: 28.6139, lng: 77.2090, src: "https://assets.aceternity.com/avatars/5.webp" }, // Delhi
    { lat: 22.5726, lng: 88.3639, src: "https://assets.aceternity.com/avatars/6.webp" }, // Kolkata
];

export default function WorldMapSection() {
    return (
        <section className={worldMapStyles.section}>
            <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4">
                <div className={worldMapStyles.textContainer}>
                    <h2 className={worldMapStyles.title}>
                        Accross the <span className={worldMapStyles.highlight}>Nation</span>
                    </h2>
                    <p className="text-lg text-[#724e99] mt-4 mb-8 max-w-xl text-center opacity-80">
                        We're available in San Francisco, Karnataka, Telangana, Madhya Pradesh, Delhi, and Kolkata.
                    </p>
                </div>

                <div className="relative w-full max-w-5xl aspect-square bg-transparent overflow-hidden flex items-center justify-center">
                    <Globe3D
                        markers={sampleMarkers}
                        className="w-full h-full"   
                        config={{
                            radius: 4.5, // Increased to fill the square
                            autoRotateSpeed: 0.5,
                            ambientIntensity: 6.0,
                            pointLightIntensity: 12.0,
                            globeColor: "#ffffff",
                        }}
                        onMarkerClick={(marker) => {
                            console.log("Clicked marker:", marker.label);
                        }}
                        onMarkerHover={(marker) => {
                            if (marker) {
                                console.log("Hovering:", marker.label);
                            }
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

