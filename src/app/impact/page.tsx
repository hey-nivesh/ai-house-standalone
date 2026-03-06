"use client";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowLeft, Calendar, Users, MapPin, Trophy, Clock, ChevronLeft, ChevronRight, GraduationCap, Code2, Briefcase, Rocket, Quote, Globe, UserPlus, BookOpen, Award, Check } from "lucide-react";

/* ─── Data ─── */
const featuredEvents = [
    { img: "/linkedin_post_images/10.png", title: "GenAI Summit 2025", date: "Mar 15, 2025", location: "Bangalore", attendees: 2400, type: "Conference", desc: "The largest generative AI conference in South Asia. 3 days of talks, workshops, and networking.", active: true },
    { img: "/workshop/IMG20241115143037.png", title: "LLM Hackathon", date: "Jan 22, 2025", location: "Mumbai", attendees: 350, type: "Hackathon", desc: "48-hour hackathon building production-ready LLM applications. $50K in prizes.", active: false },
    { img: "/linkedin_post_images/4.png", title: "AI Founders Meetup", date: "Feb 8, 2025", location: "Delhi", attendees: 180, type: "Meetup", desc: "Monthly mixer for AI startup founders. Pitch practice, investor introductions, co-founder matching.", active: true },
    { img: "/workshop/IMG_7301.png", title: "RAG Workshop Series", date: "Dec 5, 2024", location: "Hyderabad", attendees: 120, type: "Workshop", desc: "Hands-on workshop on building retrieval-augmented generation pipelines with real-world data.", active: false },
    { img: "/workshop/DSC_0313.JPG", title: "AI in Production", date: "Nov 18, 2024", location: "Pune", attendees: 800, type: "Conference", desc: "Lessons from deploying AI at scale. Case studies from top Indian tech companies.", active: false },
    { img: "/workshop/IMG_6004.JPG", title: "Maker Weekend", date: "Oct 10, 2024", location: "Chennai", attendees: 200, type: "Workshop", desc: "Build robots, IoT devices, and edge AI projects in a weekend-long maker festival.", active: false },
];

const galleryImages = [
    { img: "/workshop/IMG20241115143037.png", caption: "Hackathon Night, Mumbai" },
    { img: "/linkedin_post_images/10.png", caption: "Main Stage, GenAI Summit" },
    { img: "/workshop/IMG_7301.png", caption: "Networking Hour, Delhi" },
    { img: "/linkedin_post_images/4.png", caption: "Winners Circle" },
    { img: "/workshop/DSC_0313.JPG", caption: "Keynote, AI in Production" },
    { img: "/workshop/IMG_6004.JPG", caption: "Maker Lab, Chennai" },
];

const chartData = [
    { year: "2022", attendees: 1200 },
    { year: "2023", attendees: 5400 },
    { year: "2024", attendees: 9800 },
    { year: "2025", attendees: 15200 },
];

const stats = [
    { icon: Calendar, value: "100+", label: "Events" },
    { icon: Users, value: "15K+", label: "Community" },
    { icon: MapPin, value: "8", label: "Cities" },
    { icon: Trophy, value: "50+", label: "Hackathons" },
];

const personas = [
    { title: "Student", icon: GraduationCap, goal: "Upskilling & Placement", metric: "85% placed" },
    { title: "Developer", icon: Code2, goal: "Building Production AI", metric: "200+ shipped" },
    { title: "Professional", icon: Briefcase, goal: "Career Pivot to AI", metric: "3× salary" },
    { title: "Founder", icon: Rocket, goal: "Launching & Fundraising", metric: "$2M+ raised" },
];

const goals = [
    { label: "LLM Apps", percent: 40 },
    { label: "RAG Systems", percent: 30 },
    { label: "AI Agents", percent: 20 },
    { label: "Other", percent: 10 },
];

const testimonials = [
    { text: "AI House changed the trajectory of my career. The mentorship and community support are unparalleled.", author: "Priya S.", role: "ML Engineer", avatar: "P" },
    { text: "I built my first RAG app at a hackathon here. Now it serves 10k users daily.", author: "Arjun M.", role: "Founder, DataLens", avatar: "A" },
    { text: "The community energy at every hackathon is unmatched. I found my co-founder here.", author: "Sara K.", role: "CS Student", avatar: "S" },
    { text: "From zero AI knowledge to leading an ML team—AI House workshops made it possible.", author: "Rahul D.", role: "Tech Lead", avatar: "R" },
];

const cityData = [
    { name: "Bangalore", value: 4280, color: "hsl(270, 34%, 45%)" },
    { name: "Pune", value: 3650, color: "hsl(270, 50%, 70%)" },
    { name: "Mumbai", value: 2840, color: "hsl(200, 60%, 50%)" },
    { name: "Hyderabad", value: 1950, color: "hsl(150, 50%, 45%)" },
    { name: "Delhi NCR", value: 1520, color: "hsl(35, 85%, 55%)" },
    { name: "Chennai", value: 1100, color: "hsl(340, 60%, 50%)" },
];

const demographicData = [
    { name: "Engineering", value: 38, color: "hsl(270, 34%, 45%)" },
    { name: "Product", value: 22, color: "hsl(270, 50%, 70%)" },
    { name: "Design", value: 16, color: "hsl(200, 60%, 50%)" },
    { name: "Data Science", value: 14, color: "hsl(150, 50%, 45%)" },
    { name: "Other", value: 10, color: "hsl(35, 85%, 55%)" },
];

const journeySteps = [
    {
        icon: UserPlus,
        title: "New Lead",
        count: 2480,
        description: "Registered via referral or organic",
        color: "hsl(35, 85%, 55%)",
        percentage: 100,
    },
    {
        icon: BookOpen,
        title: "Onboarding",
        count: 1860,
        description: "Completed profile & first module",
        color: "hsl(200, 60%, 50%)",
        percentage: 75,
    },
    {
        icon: Users,
        title: "Active Member",
        count: 1340,
        description: "Regular participation & contributions",
        color: "hsl(270, 50%, 70%)",
        percentage: 54,
    },
    {
        icon: Award,
        title: "Active Mentor",
        count: 520,
        description: "Guiding new members & leading sessions",
        color: "hsl(270, 34%, 45%)",
        percentage: 21,
    },
];

/* ─── Reusable scroll-reveal wrapper ─── */
/* ─── Animation variants ─── */
type RevealVariant = "fade-up" | "zoom-in" | "flip-y" | "scale-up" | "slide-left" | "slide-right";

const variantClasses: Record<RevealVariant, { hidden: string; visible: string }> = {
    "fade-up": { hidden: "translate-y-8 opacity-0", visible: "translate-y-0 opacity-100" },
    "zoom-in": { hidden: "scale-75 opacity-0", visible: "scale-100 opacity-100" },
    "flip-y": { hidden: "rotateY-90 opacity-0 [transform:perspective(600px)_rotateY(90deg)]", visible: "opacity-100 [transform:perspective(600px)_rotateY(0deg)]" },
    "scale-up": { hidden: "scale-90 opacity-0", visible: "scale-100 opacity-100" },
    "slide-left": { hidden: "translate-x-12 opacity-0", visible: "translate-x-0 opacity-100" },
    "slide-right": { hidden: "-translate-x-12 opacity-0", visible: "translate-x-0 opacity-100" },
};

const Reveal = ({ children, className = "", delay = 0, variant = "fade-up" }: { children: React.ReactNode; className?: string; delay?: number; variant?: RevealVariant }) => {
    const { ref, isVisible } = useScrollReveal(0.12);
    const v = variantClasses[variant];
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${isVisible ? v.visible : v.hidden} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

/* ─── Horizontal Scroll Helper ─── */
const HScrollSection = ({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: number) => {
        scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
    };

    return (
        <div>
            <Reveal>
                <div className="mb-4 flex items-end justify-between px-5 md:px-0">
                    <div>
                        <h2 className="text-xl font-bold text-primary sm:text-2xl">{title}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                    </div>
                    <div className="flex gap-1.5">
                        <button onClick={() => scroll(-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-primary">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button onClick={() => scroll(1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-primary">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </Reveal>
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto px-5 pb-6 scrollbar-hide md:px-0" style={{ scrollSnapType: "x mandatory" }}>
                {children}
            </div>
        </div>
    );
};

/* ─── Event Post Card ─── */
const EventCard = ({ event, index }: { event: (typeof featuredEvents)[0]; index: number }) => {
    const router = useRouter();
    return (
        <Reveal delay={index * 100} variant="zoom-in">
            <article
                onClick={() => event.active && router.push("https://luma.com/ai_house?k=c")}
                className={`w-[300px] flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg sm:w-[320px] ${event.active ? "cursor-pointer hover:-translate-y-1" : ""}`}
                style={{ scrollSnapAlign: "start" }}
            >
                <div className="group relative">
                    <img src={event.img} alt={event.title} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">{event.type}</span>
                    {event.active ? (
                        <>
                            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-[11px] font-semibold text-white">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                                Open
                            </span>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                                <span className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
                                    Register Now →
                                </span>
                            </div>
                        </>
                    ) : (
                        <span className="absolute right-3 top-3 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">Past</span>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-base font-bold text-foreground">{event.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{event.desc}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{event.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{event.attendees}</span>
                    </div>
                </div>
            </article>
        </Reveal>
    );
};

const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg bg-card px-3 py-2 shadow-md border border-border">
                <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
                <p className="text-xs text-muted-foreground">{payload[0].value.toLocaleString()} members</p>
            </div>
        );
    }
    return null;
};

const CommunityReach = () => {
    return (
        <div className="rounded-xl bg-card p-4 shadow-sm border border-border h-full sm:p-6">
            <div className="mb-4 flex items-center gap-2 sm:mb-6">
                <Globe className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                <h2 className="font-display text-[14px] font-semibold text-foreground sm:text-lg text-center">Community Reach</h2>
            </div>

            {/* Google Maps Embed */}
            <div className="relative mb-4 rounded-lg overflow-hidden border border-border">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31027963.202162217!2d82.19728435440777!3d18.320204181971857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1771068923539!5m2!1sen!2sin"
                    width="100%"
                    height="160"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="India Community Map"
                    className="w-full sm:h-[180px]"
                />
                <div className="mt-2 px-1 flex flex-wrap justify-center gap-x-3 gap-y-1 pb-1 sm:mt-3 sm:gap-x-4">
                    {cityData.map((c) => (
                        <span key={c.name} className="inline-flex items-center gap-1 text-[9px] text-muted-foreground sm:text-[11px]">
                            <MapPin className="h-2 w-2 sm:h-2.5 sm:w-2.5" style={{ color: c.color }} />
                            {c.name}: {c.value.toLocaleString()}
                        </span>
                    ))}
                </div>
            </div>

            {/* Donut Chart */}
            <div className="flex flex-col items-center">
                <h3 className="mb-1 text-[12px] font-medium text-primary sm:text-sm">Industry Demographics</h3>
                <div className="flex w-full flex-col items-center gap-2">
                    <div className="h-40 w-full sm:h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={demographicData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={75}
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {demographicData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<PieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 transition-all">
                        {demographicData.map((d) => (
                            <div key={d.name} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                                <span className="text-[10px] text-muted-foreground sm:text-xs whitespace-nowrap">{d.name}</span>
                                <span className="text-[10px] font-medium text-foreground sm:text-xs">{d.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const EngagementJourney = () => {
    return (
        <div className="rounded-xl bg-card p-3 shadow-sm border border-border h-full sm:p-6">
            <div className="mb-4 flex items-center gap-1.5 sm:mb-6 sm:gap-2">
                <ChevronRight className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                <h2 className="font-display text-[13px] font-semibold text-foreground sm:text-lg">Journey</h2>
            </div>

            <div className="relative flex flex-col gap-1">
                {journeySteps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isLast = index === journeySteps.length - 1;

                    return (
                        <div key={step.title} className="group relative flex gap-2 sm:gap-3">
                            {/* Vertical connector line */}
                            {!isLast && (
                                <div className="absolute left-3.5 top-6 h-full w-0.5 bg-border sm:left-5 sm:top-10" />
                            )}

                            {/* Icon circle */}
                            <div
                                className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-200 group-hover:scale-110 sm:h-10 sm:w-10"
                                style={{ borderColor: step.color, backgroundColor: `${step.color}15` }}
                            >
                                <StepIcon className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: step.color }} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-8 sm:pb-12">
                                <div className="flex items-baseline justify-between gap-1">
                                    <h3 className="text-[11px] font-semibold text-foreground sm:text-sm">{step.title}</h3>
                                    <span className="font-display text-[13px] font-bold text-foreground sm:text-lg">
                                        {step.count.toLocaleString()}
                                    </span>
                                </div>
                                <p className="mt-0.5 text-[9px] leading-tight text-muted-foreground sm:text-xs">{step.description}</p>

                                {/* Progress bar */}
                                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary sm:h-1.5">
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{
                                            width: `${step.percentage}%`,
                                            backgroundColor: step.color,
                                        }}
                                    />
                                </div>
                                <div className="mt-1 flex items-center gap-1">
                                    <Check className="h-2 w-2 text-muted-foreground sm:h-3 sm:w-3" />
                                    <span className="text-[8px] text-muted-foreground sm:text-[10px]">
                                        {step.percentage}% conversion
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ─── Gallery Scroll Card ─── */
const GalleryCard = ({ item, index }: { item: (typeof galleryImages)[0]; index: number }) => (
    <Reveal delay={index * 80} variant="flip-y">
        <div className="group relative w-[260px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl sm:w-[300px]" style={{ scrollSnapAlign: "start" }}>
            <img src={item.img} alt={item.caption} className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <p className="absolute bottom-0 left-0 w-full p-4 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">{item.caption}</p>
        </div>
    </Reveal>
);

/* ─── Goal Bar (extracted to avoid hooks-in-loop) ─── */
const GoalBar = ({ label, percent, index }: { label: string; percent: number; index: number }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div ref={ref}>
            <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-medium text-foreground">{label}</span>
                <span className="font-semibold text-primary">{percent}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                <div
                    className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? `${percent}%` : "0%", transitionDelay: `${index * 120}ms` }}
                />
            </div>
        </div>
    );
};

/* ════════════════════════════════════════════════════════════
   ─── MAIN PAGE ───
   ════════════════════════════════════════════════════════════ */
const Impact = () => {
    const router = useRouter();
    const { ref: chartRef, isVisible: chartVisible } = useScrollReveal();

    return (
        <div className="min-h-screen bg-background">
            {/* Sticky Nav */}
            <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
                    <button onClick={() => router.push("/")} className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        <ArrowLeft className="h-4 w-4" />Back
                    </button>
                    <span className="text-sm font-bold text-primary">AI House Impact</span>
                    <div className="w-16" />
                </div>
            </nav>

            {/* ══ HERO with dark background image + chart on right ══ */}
            <section className="relative overflow-hidden pb-8 pt-6 md:pb-14 md:pt-10">
                {/* Background Image with Edge Fade (Vignette) */}
                <div className="absolute inset-0 z-0">
                    <img src="/impact.png" className="h-full w-full object-cover" alt="" />
                    {/* Darkening overlays for "Edge Fade" effect */}
                    <div className="absolute inset-0 bg-[#0f0720]/10" />
                    {/* Radial Vignette with large clear center */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#0f0720_100%)] opacity-95" />
                    {/* Four-way edge fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0720] via-transparent to-[#0f0720] opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f0720] via-transparent to-[#0f0720] opacity-30" />
                </div>

                {/* Decorative blobs */}
                <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-5 md:flex-row md:items-center md:gap-16">
                    {/* Left — text + stats */}
                    <div className="flex-1">
                        <Reveal>
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                                The Pulse of<br />
                                <span className="text-primary-foreground opacity-90">AI House.</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={120}>
                            <p className="mt-4 max-w-md text-base text-white/70 sm:text-lg">
                                Tracking 100+ events and the brilliant minds behind them. A living gallery of community, code, and impact.
                            </p>
                        </Reveal>
                        <Reveal delay={250}>
                            <div className="mt-6 flex flex-wrap gap-6 sm:gap-10">
                                {stats.map((s, i) => {
                                    const Icon = s.icon;
                                    return (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                                                <Icon className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-white sm:text-xl">{s.value}</p>
                                                <p className="text-xs font-medium text-white/50">{s.label}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right — Growth Chart */}
                    <Reveal delay={200} className="w-full md:w-[420px] lg:w-[480px]">
                        <div ref={chartRef} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm">
                            <h3 className="mb-0.5 text-sm font-bold text-white">Attendee Growth</h3>
                            <p className="mb-6 text-xs text-white/50">Community members across all events</p>
                            <div className="h-44 w-full sm:h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#d8b4fe" stopOpacity={0.3} />
                                                <stop offset="100%" stopColor="#d8b4fe" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: 16,
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                background: "#1e1b4b",
                                                color: "#fff",
                                                fontSize: 13
                                            }}
                                        />
                                        <Area type="monotone" dataKey="attendees" stroke="#d8b4fe" strokeWidth={3} fill="url(#purpleGrad)" isAnimationActive={chartVisible} animationDuration={1800} animationEasing="ease-out" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══ Featured Events (Horizontal Scroll) ══ */}
            <section className="mx-auto max-w-6xl py-4 md:py-6">
                <HScrollSection title="Featured Events" subtitle="Our latest and greatest gatherings">
                    {featuredEvents.map((e, i) => (
                        <EventCard key={i} event={e} index={i} />
                    ))}
                </HScrollSection>
            </section>

            {/* ══ The Builders — Horizontal strip with big icons ══ */}
            <section className="bg-purple-50 py-4 md:py-6">
                <div className="mx-auto max-w-6xl px-5">
                    <Reveal>
                        <h2 className="mb-2 text-xl font-bold text-primary sm:text-2xl">The Builders</h2>
                        <p className="mb-4 text-sm text-muted-foreground">Empowering diverse minds across every stage</p>
                    </Reveal>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                        {personas.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <Reveal key={i} delay={i * 120} variant="scale-up">
                                    <div className="group flex flex-col items-center gap-4 rounded-3xl border border-border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 sm:p-8">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 sm:h-20 sm:w-20">
                                            <Icon className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-foreground sm:text-lg">{p.title}</p>
                                            <p className="mt-1 text-xs text-primary font-medium">{p.goal}</p>
                                        </div>
                                        <span className="rounded-full bg-primary/5 px-4 py-1.5 text-[11px] font-bold text-primary sm:text-xs">
                                            {p.metric}
                                        </span>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══ Community Stats & Journey ══ */}
            <section className="bg-white pb-4 pt-8 md:pb-6 md:pt-12">
                <div className="mx-auto max-w-6xl px-3 sm:px-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8">
                        <Reveal variant="slide-right">
                            <CommunityReach />
                        </Reveal>
                        <Reveal variant="slide-left" delay={100}>
                            <EngagementJourney />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ══ Photo Gallery (Horizontal Scroll) ══ */}
            <section className="mx-auto max-w-6xl pb-6 pt-2 md:pb-8 md:pt-4">
                <HScrollSection title="Gallery" subtitle="Moments captured across our events">
                    {galleryImages.map((g, i) => (
                        <GalleryCard key={i} item={g} index={i} />
                    ))}
                </HScrollSection>
            </section>

            {/* ══ What We Build ══ */}
            <section className="px-5 py-4 md:py-6">
                <div className="mx-auto max-w-4xl">
                    <Reveal>
                        <div className="rounded-3xl border border-border bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-10">
                            <h2 className="mb-1 text-xl font-bold text-primary">What We Build</h2>
                            <p className="mb-4 text-sm text-muted-foreground">Community project breakdown</p>
                            <div className="grid gap-6 md:grid-cols-2">
                                {goals.map((g, i) => (
                                    <GoalBar key={g.label} label={g.label} percent={g.percent} index={i} />
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══ Community Voices ══ */}
            <section className="bg-purple-900 px-5 py-8 md:py-12">
                <div className="mx-auto max-w-6xl">
                    <Reveal>
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">Community Voices</h2>
                            <p className="mt-2 text-sm text-purple-200/80">What our builders say about AI House</p>
                        </div>
                    </Reveal>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {testimonials.map((t, i) => (
                            <Reveal key={i} delay={i * 120} variant={i % 2 === 0 ? "slide-right" : "slide-left"}>
                                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <Quote className="mb-4 h-6 w-6 text-primary" />
                                    <p className="flex-1 text-sm italic leading-relaxed text-slate-700">"{t.text}"</p>
                                    <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-6">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/20">
                                            {t.avatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{t.author}</p>
                                            <p className="text-xs text-slate-500">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ Footer CTA ══ */}
            <section className="px-5 py-12 md:py-20">
                <Reveal variant="scale-up">
                    <div className="mx-auto max-w-md text-center">
                        <h3 className="mb-6 text-2xl font-bold text-foreground">Ready to be part of the movement?</h3>
                        <button onClick={() => router.push("https://docs.google.com/forms/d/e/1FAIpQLScmGt3e2pM9ltxuTGf_G2__FePkX4HIOI-BvxfnOZBK5WcsrA/viewform")} className="rounded-full bg-primary px-10 py-4 text-sm font-bold text-white shadow-xl shadow-purple-500/20 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95">
                            Join AI House →
                        </button>
                    </div>
                </Reveal>
            </section>
        </div>
    );
};

export default Impact;
