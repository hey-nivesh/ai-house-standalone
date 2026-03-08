"use client";
import React, { useState, useEffect } from "react";
import {
    Briefcase, Plane, Flag, GraduationCap, Cloud, Gift, TrendingUp,
    Award, Users, Building2, Rocket, Presentation, Code2, Globe, MapPin,
    ChevronLeft, ChevronRight
} from "lucide-react";

// No static imports for images - using public paths for reliability

interface TimelineEvent {
    year: string;
    date: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    image: any;
}

const events: TimelineEvent[] = [
    {
        year: "2024", date: "23 August 2024", title: "Founder Takes the Leap",
        description: "Deepak Chawla leaves his job to pursue a bold vision — making GenAI learning practical and accessible for everyone.",
        icon: <Briefcase size={18} />, image: "/assets/tl-leap.png",
    },
    {
        year: "2024", date: "August 2024", title: "First Bay Area Trip",
        description: "First US trip to San Francisco. The Bay Area ecosystem sparks the idea that would become HiDevs.",
        icon: <Plane size={18} />, image: "/assets/tl-sf-trip.png",
    },
    {
        year: "2024", date: "September 2024", title: "HiDevs Founded",
        description: "HiDevs is officially founded with a mission: GenAI upskilling for everyone. Core team formed across US, India & Belgium.",
        icon: <Flag size={18} />, image: "/assets/tl-founded.png",
    },
    {
        year: "2024", date: "7 October 2024", title: "First GenAI Cohort",
        description: "Launched the first GenAI cohort — hands-on, practical, and community-driven learning goes live.",
        icon: <GraduationCap size={18} />, image: "/assets/tl-cohort.png",
    },
    {
        year: "2024", date: "20 November 2024", title: "Google Cloud Partnership",
        description: "First major external validation — Google Cloud partnership secured, opening doors for scale.",
        icon: <Cloud size={18} />, image: "/assets/tl-gcloud.png",
    },
    {
        year: "2024", date: "25 December 2024", title: "Christmas Product Launch",
        description: "Full-flash product launch on Christmas Day. 100+ engineers graduate from the cohort. MoU with academic partners signed.",
        icon: <Gift size={18} />, image: "/assets/tl-xmas.png",
    },
    {
        year: "2025", date: "January 2025", title: "Early Traction & Growth",
        description: "15+ workshops, 0→850+ users, 4 active MOUs, 50+ webinars, and 210+ interviews conducted in a single month.",
        icon: <TrendingUp size={18} />, image: "/assets/tl-traction.png",
    },
    {
        year: "2025", date: "20 March 2025", title: "Perplexity AI Fellow",
        description: "Deepak recognized as Perplexity AI Business Fellow & Qdrant Community Star. Named youngest jury member at Smart India Hackathon 2024.",
        icon: <Award size={18} />, image: "/assets/tl-fellowship.png",
    },
    {
        year: "2025", date: "15 April 2025", title: "2,000+ Learners Reached",
        description: "Crossed the 2,000 learners milestone. Online + offline workshops running at 2x pace with exponential growth.",
        icon: <Users size={18} />, image: "/assets/tl-2k.png",
    },
    {
        year: "2025", date: "May 2025", title: "B2B & Community Expansion",
        description: "Expansion into communities, clubs and B2B. 2+ offline events, 15-workshop pipeline, and 7 MOUs in progress.",
        icon: <Building2 size={18} />, image: "/assets/tl-b2b.png",
    },
    {
        year: "2025", date: "14 June 2025", title: "Product Hunt Global Launch",
        description: "HiDevs launches on Product Hunt — 5th product release milestone. EchoDeepak AI clone answering 10K+ user queries.",
        icon: <Rocket size={18} />, image: "/assets/tl-producthunt.png",
    },
    {
        year: "2025", date: "June–July 2025", title: "SF Fundraising & Pitches",
        description: "Back to San Francisco for networking, pitch days, and investor meetings. The fundraising push begins.",
        icon: <Presentation size={18} />, image: "/assets/tl-pitch.png",
    },
    {
        year: "2025", date: "July 2025", title: "Skillathon Event",
        description: "Large-scale community upskilling event. 200+ GenAI POCs completed. 5K+ learners upskilled to date.",
        icon: <Code2 size={18} />, image: "/assets/tl-skillathon.png",
    },
    {
        year: "2025", date: "September 2025", title: "One Year — Next Chapter",
        description: "One year in: 5K+ learners, 200+ POCs, 50+ workshops, 10K+ learning hours. International expansion across US, Europe & Asia. The journey continues.",
        icon: <Globe size={18} />, image: "/assets/tl-future.png",
    },
];

const Timeline = () => {
    const [page, setPage] = useState(0);
    const perPage = 2;
    const totalPages = Math.ceil(events.length / perPage);
    const currentEvents = events.slice(page * perPage, page * perPage + perPage);

    // Auto-advance logic
    useEffect(() => {
        const interval = setInterval(() => {
            setPage((prev) => (prev + 1) % totalPages);
        }, 5000); // 5 seconds interval
        return () => clearInterval(interval);
    }, [totalPages]);

    return (
        <section className="min-h-[500px] md:min-h-screen py-8 md:py-12 flex flex-col bg-background overflow-hidden transition-all duration-500">
            {/* Header */}
            <div className="max-w-5xl mx-auto text-center pt-4 md:pt-6 pb-4 md:pb-6 px-4 flex-shrink-0">
                <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2 md:mb-3">
                    Our Journey
                </h1>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    From a single Bay Area trip to a global GenAI upskilling brand — see how HiDevs
                    grew under Deepak Chawla from Sep 2024 to Sep 2025, one milestone at a time.
                </p>
            </div>

            {/* Horizontal Timeline Bar - Hidden on mobile */}
            <div className="hidden md:block flex-shrink-0 px-4 md:px-16 mb-12">
                <div className="relative max-w-6xl mx-auto">
                    {/* Line — spans full width, vertically centered on the dots */}
                    <div className="absolute left-0 right-0 top-[16px] h-px bg-timeline-line opacity-20" />

                    {/* Icons row — one per event, evenly spread */}
                    <div className="relative flex items-start justify-between">
                        {events.map((ev, idx) => {
                            const isActive = idx >= page * perPage && idx < page * perPage + perPage;
                            // Show year label only on the first event of each year
                            const showYear = idx === 0 || events[idx - 1].year !== ev.year;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setPage(Math.floor(idx / perPage))}
                                    className="flex flex-col items-center gap-1 cursor-pointer group"
                                >
                                    {/* Icon */}
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 text-white ${isActive
                                            ? "bg-primary scale-125 shadow-lg shadow-primary/30 z-10"
                                            : "bg-black group-hover:bg-primary/50"
                                            }`}
                                    >
                                        <div className="scale-75">{ev.icon}</div>
                                    </div>
                                    {/* Year label */}
                                    <span className={`text-[10px] font-medium transition-colors leading-none h-4 ${isActive ? "text-primary font-semibold" : "text-muted-foreground"
                                        }`}>
                                        {showYear ? ev.year : ""}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Carousel Content */}
            <div className="flex-1 flex items-center max-w-6xl mx-auto w-full px-4 min-h-0">
                {/* Left Arrow - Hidden on mobile */}
                <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full border border-border items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed mr-4 md:mr-8"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Cards */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 min-h-0 items-center">
                    {currentEvents.map((event, i) => (
                        <div key={page * perPage + i} className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start text-center md:text-left animate-in fade-in slide-in-from-bottom-2 duration-700">
                            {/* Image - Improved container and handling */}
                            <div className="flex-shrink-0 w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-2xl bg-muted/30 p-2 flex items-center justify-center overflow-hidden border border-border/50 shadow-sm relative">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        // Fallback to placeholder if image fails to load
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Milestone';
                                    }}
                                />
                            </div>
                            {/* Text */}
                            <div className="flex flex-col justify-center min-w-0 flex-1">
                                <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                                        {event.date}
                                    </span>
                                </div>
                                <h3 className="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2 leading-tight">{event.title}</h3>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-4">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Arrow - Hidden on mobile */}
                <button
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={page === totalPages - 1}
                    className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full border border-border items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed ml-4 md:mr-8"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Page dots */}
            <div className="flex justify-center gap-2 md:gap-3 py-6 md:py-10 flex-shrink-0">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`rounded-full transition-all duration-300 ${i === page ? "w-6 md:w-8 h-1.5 md:h-2 bg-primary" : "w-1.5 md:w-2 h-1.5 md:h-2 bg-border hover:bg-muted-foreground/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Timeline;
