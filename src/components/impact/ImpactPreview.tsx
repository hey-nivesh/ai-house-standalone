"use client";
import { Users, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

const ImpactPreview = () => {
    const router = useRouter();

    return (
        <section className="w-full px-4 py-4 md:py-6">
            <div className="mx-auto max-w-4xl">
                <div
                    className="relative overflow-hidden rounded-3xl border border-impact-border shadow-xl"
                    style={{
                        background: "linear-gradient(135deg, #2e1065 0%, #4c1d95 100%)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Subtle overlay for Texture/Depth */}
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(107,33,170,0.3),transparent_70%)]" />

                    <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-10 md:flex-row md:justify-between md:gap-6 md:px-12 md:py-14">
                        {/* Left - Counters */}
                        <div className="flex flex-row items-center gap-6 md:flex-col md:gap-5">
                            <div className="flex items-center gap-2.5">
                                <Calendar className="h-6 w-6 text-white/80 md:h-7 md:w-7" />
                                <div>
                                    <p className="text-2xl font-bold text-white md:text-3xl">100+</p>
                                    <p className="text-xs font-medium text-white/70 md:text-sm">Events</p>
                                </div>
                            </div>
                            <div className="hidden h-px w-12 bg-white/20 md:block" />
                            <div className="h-8 w-px bg-white/20 md:hidden" />
                            <div className="flex items-center gap-2.5">
                                <Users className="h-6 w-6 text-white/80 md:h-7 md:w-7" />
                                <div>
                                    <p className="text-2xl font-bold text-white md:text-3xl">15k+</p>
                                    <p className="text-xs font-medium text-white/70 md:text-sm">Community</p>
                                </div>
                            </div>
                        </div>

                        {/* Middle - Persona Stack */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center -space-x-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-xs font-semibold text-white shadow-lg backdrop-blur-sm md:h-16 md:w-16 md:text-sm">
                                    Student
                                </div>
                                <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-xs font-semibold text-white shadow-lg backdrop-blur-sm md:h-16 md:w-16 md:text-sm">
                                    Dev
                                </div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm md:h-16 md:w-16 md:text-sm">
                                    Founder
                                </div>
                            </div>
                            <p className="text-xs font-medium text-white/80 md:text-sm">
                                Empowering diverse builders.
                            </p>
                        </div>

                        {/* Right - CTA */}
                        <div className="flex flex-col items-center gap-3">
                            <p className="text-center text-sm font-medium text-white/90 md:text-base">
                                See the difference we're making.
                            </p>
                            <button
                                onClick={() => router.push("/impact")}
                                className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-purple-900 transition-all duration-200 hover:scale-105 hover:bg-purple-50 md:px-7 md:py-3 md:text-base"
                            >
                                Explore Our Full Impact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImpactPreview;
