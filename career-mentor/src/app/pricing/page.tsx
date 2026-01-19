"use client";

import { Navbar } from "@/components/Navbar"; // ADDED BACK
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* Navbar Restored */}
      <Navbar />
      
      {/* Adjusted padding-top to account for fixed Navbar (pt-32) */}
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-24">
            <FadeIn>
                <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-6 text-slate-900">
                Predictable pricing for <br /> unpredictable futures.
                </h1>
                <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                Start with a free analysis. Upgrade for deep market intelligence and personalized skill-gap modeling.
                </p>
            </FadeIn>
            </div>

            {/* Pricing Grid */}
            <div className="grid md:grid-cols-3 gap-8 items-start">
            
            {/* Free Tier */}
            <FadeIn delay={0.1}>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Student</h3>
                    <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">$0</span>
                    <span className="text-slate-500">/mo</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                    Perfect for initial exploration and personality mapping.
                    </p>
                </div>
                <Button variant="outline" className="w-full h-11 border-slate-200 text-slate-900 font-medium rounded-xl hover:bg-slate-50">
                    Get Started
                </Button>
                <div className="mt-8 space-y-4">
                    <Feature text="Basic Personality Analysis" />
                    <Feature text="3 Career Matches" />
                    <Feature text="Public Career Library" />
                </div>
                </div>
            </FadeIn>

            {/* Pro Tier */}
            <FadeIn delay={0.2}>
                <div className="bg-[#0F172A] p-8 rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="mb-8 relative z-10">
                    <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-white">Professional</h3>
                    <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Recommended
                    </span>
                    </div>
                    <div className="flex items-baseline gap-1 text-white">
                    <span className="text-4xl font-bold tracking-tight">$12</span>
                    <span className="text-slate-400">/mo</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                    Deep-dive analysis with real-time labor market data.
                    </p>
                </div>
                <Button className="w-full h-11 bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    Start Free Trial
                </Button>
                <div className="mt-8 space-y-4">
                    <Feature text="Advanced Cognitive Model" light />
                    <Feature text="Unlimited Career Matches" light />
                    <Feature text="Skills Gap Analysis" light />
                    <Feature text="University Degree Mapping" light />
                    <Feature text="Salary Projection Data" light />
                </div>
                </div>
            </FadeIn>

            {/* Enterprise Tier */}
            <FadeIn delay={0.3}>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Institution</h3>
                    <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">Custom</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                    For universities and guidance counselors managing students.
                    </p>
                </div>
                <Button variant="outline" className="w-full h-11 border-slate-200 text-slate-900 font-medium rounded-xl hover:bg-slate-50">
                    Contact Sales
                </Button>
                <div className="mt-8 space-y-4">
                    <Feature text="Bulk Student Management" />
                    <Feature text="Custom API Integration" />
                    <Feature text="Admin Dashboard" />
                    <Feature text="Exportable Reports" />
                </div>
                </div>
            </FadeIn>

            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Feature({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${light ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-100 text-slate-600'}`}>
        <Check className="w-3 h-3" strokeWidth={3} />
      </div>
      <span className={`text-sm ${light ? 'text-slate-300' : 'text-slate-600'}`}>{text}</span>
    </div>
  );
}