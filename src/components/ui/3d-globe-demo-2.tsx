"use client";
import dynamic from "next/dynamic";
import { GlobeMarker } from "@/components/ui/3d-globe";

const Globe3D = dynamic(() => import("@/components/ui/3d-globe").then(mod => mod.Globe3D), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-[#724e99]">Loading Globe...</div>
});

const sampleMarkers: GlobeMarker[] = [
    { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/1.webp", label: "New York" },
    { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/2.webp", label: "London" },
    { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/3.webp", label: "Tokyo" },
    { lat: -33.8688, lng: 151.2093, src: "https://assets.aceternity.com/avatars/4.webp", label: "Sydney" },
    { lat: 48.8566, lng: 2.3522, src: "https://assets.aceternity.com/avatars/5.webp", label: "Paris" },
    { lat: 28.6139, lng: 77.209, src: "https://assets.aceternity.com/avatars/6.webp", label: "New Delhi" },
    { lat: 55.7558, lng: 37.6173, src: "https://assets.aceternity.com/avatars/7.webp", label: "Moscow" },
    { lat: -22.9068, lng: -43.1729, src: "https://assets.aceternity.com/avatars/8.webp", label: "Rio de Janeiro" },
    { lat: 31.2304, lng: 121.4737, src: "https://assets.aceternity.com/avatars/9.webp", label: "Shanghai" },
    { lat: 25.2048, lng: 55.2708, src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai" },
    { lat: -34.6037, lng: -58.3816, src: "https://assets.aceternity.com/avatars/11.webp", label: "Buenos Aires" },
    { lat: 1.3521, lng: 103.8198, src: "https://assets.aceternity.com/avatars/12.webp", label: "Singapore" },
    { lat: 37.5665, lng: 126.978, src: "https://assets.aceternity.com/avatars/13.webp", label: "Seoul" },
];

export default function Globe3DDemoSecond() {
    return (
        <div className="flex flex-col items-center justify-center w-full bg-transparent px-4 py-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight text-center mb-4">
                All over the world
            </h2>

            <p className="text-lg text-[#724e99] mt-2 mb-8 max-w-xl text-center opacity-80">
                Meet our distributed team of experts working across 6 continents.
            </p>

            <div className="relative w-full max-w-4xl aspect-square bg-transparent overflow-hidden flex items-center justify-center">
                <Globe3D
                    markers={sampleMarkers}
                    className="w-full h-full"
                    config={{
                        radius: 4.5,
                        autoRotateSpeed: 0.5,
                        ambientIntensity: 6.0,
                        pointLightIntensity: 12.0,
                        globeColor: "#ffffff"
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
    );
}
