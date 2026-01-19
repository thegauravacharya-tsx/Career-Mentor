"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BrainCircuit, Database, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const FadeIn = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-24">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-8 text-slate-900">
              The Engine.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-light">
              We don't use simple keyword matching. CareerPath employs a three-stage 
              predictive model to align human potential with economic reality.
            </p>
          </FadeIn>
        </div>

        {/* Steps Container */}
        <div className="max-w-5xl mx-auto px-6 space-y-24">
            
            {/* Step 1 */}
            <FadeIn className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <BrainCircuit className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">1. Cognitive Mapping</h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        We start by ignoring job titles. Instead, we map your psychometric profile across 40 dimensions of cognitive style, risk tolerance, and social battery.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center text-slate-500 text-sm font-medium">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                            Big 5 Personality Traits
                        </li>
                        <li className="flex items-center text-slate-500 text-sm font-medium">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                            Abstract Reasoning & Logic
                        </li>
                    </ul>
                </div>
                <div className="order-1 md:order-2 bg-slate-50 rounded-3xl h-[400px] border border-slate-100 relative overflow-hidden flex items-center justify-center">
                    {/* Abstract Visualization */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="w-64 h-64 border border-blue-200/50 rounded-full flex items-center justify-center relative animate-pulse-slow">
                        <div className="w-48 h-48 border border-blue-300/50 rounded-full flex items-center justify-center">
                             <div className="w-32 h-32 bg-blue-100/50 rounded-full backdrop-blur-md" />
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* Step 2 */}
            <FadeIn className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="bg-slate-50 rounded-3xl h-[400px] border border-slate-100 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="grid grid-cols-6 gap-2 opacity-50">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div key={i} className="w-8 h-8 rounded-md bg-slate-200" />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                        <Database className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">2. Vector Embedding</h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        We convert your profile into a high-dimensional vector and run a similarity search against our database of 50,000+ career paths, updated weekly.
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        This allows us to find non-obvious matches. For example, matching a "Graphic Designer" with high logic scores to "Frontend Architecture".
                    </p>
                </div>
            </FadeIn>

             {/* Step 3 */}
             <FadeIn className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <LineChart className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">3. Economic Feasibility</h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        Passion isn't enough. We cross-reference matches with real-time labor market data to ensure growth potential, salary trajectory, and automation resistance.
                    </p>
                </div>
                 <div className="order-1 md:order-2 bg-slate-50 rounded-3xl h-[400px] border border-slate-100 relative overflow-hidden flex items-end p-8 gap-4">
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                     <div className="w-full bg-slate-200 h-[40%] rounded-t-lg" />
                     <div className="w-full bg-slate-300 h-[60%] rounded-t-lg" />
                     <div className="w-full bg-slate-900 h-[80%] rounded-t-lg shadow-lg" />
                     <div className="w-full bg-slate-200 h-[50%] rounded-t-lg" />
                </div>
            </FadeIn>

        </div>
      </main>
      <Footer />
    </div>
  );
}