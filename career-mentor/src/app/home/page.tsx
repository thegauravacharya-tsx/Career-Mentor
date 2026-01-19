"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight, Layers, BarChart2, LayoutDashboard, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { useSession } from "next-auth/react";

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-multiply select-none">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <SmoothScroll>
      <div className="bg-[#FDFDFD] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
        
        <GrainOverlay />
        <Navbar />

        <main>
          
          {/* --- SECTION 1: HERO --- */}
          <section className="min-h-screen flex items-center justify-center px-6 relative border-b border-slate-100 py-32 md:py-0">
            <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              
              <div className="relative z-10">
                <FadeIn delay={0.1}>
                  <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-[-0.035em] leading-[0.9] text-slate-950 mb-8">
                    Career intelligence <br />
                    <span className="text-slate-400">for the ambitious.</span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-xl text-slate-600 max-w-lg leading-relaxed mb-10 tracking-tight">
                    Align your trajectory with market reality. We use predictive AI modeling to map your skills against 500+ emerging career paths.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex items-center gap-6">
                    {isLoading ? (
                        <div className="h-14 w-48 bg-slate-100 rounded-lg animate-pulse" />
                    ) : session ? (
                        // LOGGED IN VIEW
                        <>
                            <Link href="/dashboard">
                                <Button className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-base shadow-xl transition-all cursor-pointer">
                                    Go to Dashboard <LayoutDashboard className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/assessment">
                                <Button variant="outline" className="h-14 px-6 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium text-base transition-all cursor-pointer">
                                    New Assessment <Plus className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </>
                    ) : (
                        // LOGGED OUT VIEW
                        <>
                            <Link href="/assessment">
                                <Button className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-base shadow-xl transition-all cursor-pointer">
                                    Start Assessment <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/methodology" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2 group cursor-pointer">
                                Read the manifesto <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </>
                    )}
                  </div>
                </FadeIn>
              </div>

              {/* Abstract Visual */}
              <div className="relative h-full w-full hidden md:flex items-center justify-center select-none pointer-events-none">
                  <div className="absolute w-[600px] h-[600px] bg-[conic-gradient(from_0deg_at_50%_50%,#e2e8f0_0deg,transparent_60deg,transparent_300deg,#e2e8f0_360deg)] opacity-40 blur-[80px] rounded-full animate-slow-spin" />
                  <div className="w-72 h-96 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-8 flex flex-col justify-between relative z-10">
                      <div className="space-y-6">
                        <div className="h-2 w-20 bg-slate-900/10 rounded-full" />
                        <div className="space-y-3">
                          <div className="h-1.5 w-full bg-slate-900/5 rounded-full" />
                          <div className="h-1.5 w-3/4 bg-slate-900/5 rounded-full" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div className="w-8 h-24 bg-slate-200/50 rounded-t-md" />
                            <div className="w-8 h-32 bg-slate-300/50 rounded-t-md" />
                            <div className="w-8 h-16 bg-slate-200/50 rounded-t-md" />
                            <div className="w-8 h-40 bg-slate-900/80 rounded-t-md" />
                        </div>
                        <div className="h-px w-full bg-slate-200" />
                      </div>
                  </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 2: PHILOSOPHY --- */}
          <section className="min-h-[80vh] flex items-center justify-center bg-white border-b border-slate-100 py-32">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.1] text-slate-900 mb-8">
                  Most career advice is retrospective. <br />
                  <span className="text-slate-400">Ours is predictive.</span>
                </h2>
                <p className="text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-light">
                  Traditional guidance relies on outdated job titles. We built an engine that understands the velocity of the job market and the nuance of your cognitive profile.
                </p>
              </FadeIn>
            </div>
          </section>

          {/* --- SECTION 3: FEATURES --- */}
          <section className="min-h-screen flex items-center justify-center bg-slate-50/50 px-6 border-b border-slate-100 py-32">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-12 flex flex-col justify-between shadow-sm min-h-[400px]">
                  <div className="max-w-md">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-700">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Multi-Dimensional Analysis</h3>
                    <p className="text-lg text-slate-500 leading-relaxed">
                      We analyze your risk tolerance, cognitive style, and problem-solving velocity to build a complete profile.
                    </p>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <div className="px-5 py-2.5 bg-slate-50 rounded-lg border border-slate-100 text-sm font-semibold text-slate-600">Risk: Moderate</div>
                    <div className="px-5 py-2.5 bg-slate-50 rounded-lg border border-slate-100 text-sm font-semibold text-slate-600">Logic: High</div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-12 flex flex-col shadow-sm min-h-[400px]">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-700">
                      <BarChart2 className="w-6 h-6" />
                    </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Market Realism</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Recommendations weighted by real-time economic demand.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* --- SECTION 4: FINAL CTA --- */}
          <section className="min-h-[80vh] flex flex-col justify-center bg-white py-32">
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <FadeIn>
                    <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-[-0.04em] mb-10">
                        Stop guessing. <br /> Start planning.
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/assessment">
                            <Button className="h-16 px-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer">
                                Start Assessment
                            </Button>
                        </Link>
                    </div>
                    <p className="mt-6 text-slate-500">No credit card required. Free analysis included.</p>
                    </div>
                </FadeIn>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}