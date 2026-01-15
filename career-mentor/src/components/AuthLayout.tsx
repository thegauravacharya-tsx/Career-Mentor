"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-[#F8FAFC]">
      
      {/* --- Background Aesthetics --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-200/40 rounded-full opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-slate-200/30 rounded-full opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      {/* --- Logo --- */}
      <Link href="/home" className="absolute top-8 left-8 z-20 flex items-center gap-2.5 group">
        <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center text-white shadow-lg shadow-slate-200 transition-transform group-hover:scale-105">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"/></svg>
        </div>
        <span className="font-bold text-[#0F172A] text-lg tracking-[-0.03em]">CareerPath</span>
      </Link>

      {/* --- Card Container --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px] bg-white/80 backdrop-blur-xl rounded-[24px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.06)] border border-white/60 p-8 sm:p-10"
      >
        <div className="text-center mb-10">
            {/* Typography Upgrade: Tight tracking, semibold instead of bold, specific leading */}
            <h1 className="text-[26px] font-semibold text-[#0F172A] mb-3 tracking-[-0.025em] leading-tight">
                {title}
            </h1>
            <p className="text-[15px] text-slate-500 leading-relaxed max-w-[320px] mx-auto font-normal">
                {subtitle}
            </p>
        </div>

        {children}

      </motion.div>
    </div>
  );
}