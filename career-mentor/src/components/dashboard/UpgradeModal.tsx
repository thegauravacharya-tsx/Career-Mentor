"use client";

import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UpgradeModalProps {
  children: React.ReactNode;
}

export function UpgradeModal({ children }: UpgradeModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
    
      <DialogContent className="max-w-4xl w-full p-0 border-none rounded-[32px] bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
        {/* Left: Upgrade Info (Dark) */}
        <div className="relative md:w-[40%] bg-[#0F172A] p-8 md:p-10 flex flex-col justify-between">
            {/* Subtle Gradient Overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider mb-6">
                    <Sparkles className="w-3 h-3 fill-current" /> Pro Plan
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
                    Upgrade your <br /> career path.
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Get unlimited access to advanced AI mapping and salary data.
                </p>
            </div>

            <div className="relative z-10 mt-10 md:mt-0">
                <div className="flex items-baseline gap-1 text-white">
                    <span className="text-4xl font-bold tracking-tight">$12</span>
                    <span className="text-slate-400 text-sm font-medium">/ month</span>
                </div>
                <p className="text-slate-500 text-xs mt-2">Billed annually.</p>
            </div>
        </div>

        {/* Right: Features & Actions (White) */}
        <div className="md:w-[60%] bg-white p-8 md:p-10 flex flex-col justify-center">
            
            <div className="space-y-4 mb-4">
                <FeatureItem text="Unlimited AI Career Assessments" />
                <FeatureItem text="Detailed Salary & Market Data" />
                <FeatureItem text="University Degree Path Mapping" />
                <FeatureItem text="Save unlimited paths & degrees" />
                <FeatureItem text="Priority Email Support" />
            </div>

            <div className="mt-auto">
                <Link href="/waitlist"> 
                <Button className="cursor-pointer w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold rounded-xl shadow-lg transition-all text-sm mb-3">
                    Upgrade to Pro
                </Button>
                </Link>
                <p className="text-center text-xs text-slate-400">
                    Secure payment via Stripe. Cancel anytime.
                </p>
            </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
                <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
            </div>
            <span className="text-sm font-medium text-slate-700">{text}</span>
        </div>
    )
}