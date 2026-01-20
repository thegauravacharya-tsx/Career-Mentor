"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UpgradeModalProps {
  children: React.ReactNode; // The trigger button
}

export function UpgradeModal({ children }: UpgradeModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      {/* 
         DialogContent customization:
         - max-w-4xl for wide layout
         - p-0 to remove default padding so image touches edges
         - overflow-hidden for rounded corners 
      */}
      <DialogContent className="max-w-[850px] w-full p-0 overflow-hidden border-none rounded-[32px] bg-white shadow-2xl">
        
        <div className="flex flex-col md:flex-row min-h-[500px]">
            
            {/* Left Side: Image & Price (40% width) */}
            <div className="md:w-[40%] bg-slate-900 relative flex flex-col justify-end p-8 overflow-hidden group">
                {/* Background Image (Using a placeholder scenic URL or abstract gradient) */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')` }}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="relative z-10 text-white">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Pro Plan</h2>
                    <p className="text-white/80 font-medium text-lg">$12 / month per user</p>
                </div>
            </div>

            {/* Right Side: Features & Actions (60% width) */}
            <div className="md:w-[60%] p-10 md:p-12 flex flex-col justify-between bg-white">
                
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Upgrade to Pro</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                        Get access to advanced AI career mapping, detailed salary forecasts, and personalized skill gap analysis.
                    </p>

                    <div className="space-y-4">
                        <FeatureItem text="Unlimited AI Career Assessments" />
                        <FeatureItem text="Detailed Salary & Market Data" />
                        <FeatureItem text="University Degree Path Mapping" />
                        <FeatureItem text="Export Reports to PDF" />
                        <FeatureItem text="Priority Support" />
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-10 pt-6">
                    <Button variant="ghost" className="flex-1 h-12 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium">
                        Maybe later
                    </Button>
                    <Button className="flex-1 h-12 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-[15px] shadow-lg shadow-slate-900/10">
                        Upgrade Now
                    </Button>
                </div>

            </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-[6px] bg-[#0F172A] flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
            <span className="text-[15px] text-slate-600 font-medium">{text}</span>
        </div>
    )
}