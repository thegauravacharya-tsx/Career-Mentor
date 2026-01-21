"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, Check } from "lucide-react";

interface LimitReachedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function LimitReachedModal({ 
    open, 
    onOpenChange, 
    title = "Limit Reached", 
    description = "You've hit the limit for the free plan." 
}: LimitReachedModalProps) {
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] p-0 overflow-hidden border-none rounded-[32px] bg-white shadow-2xl">
        
        {/* Header Graphic */}
        <div className="bg-[#0F172A] p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                    <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                <p className="text-slate-400 text-sm">{description}</p>
            </div>
        </div>

        {/* Content */}
        <div className="p-8 pt-6">
            <div className="space-y-3 mb-8">
                <FeatureRow text="Unlimited Career Assessments" />
                <FeatureRow text="Save unlimited paths & degrees" />
                <FeatureRow text="Detailed Salary & Market Data" />
            </div>

            <Button className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold rounded-xl shadow-lg">
                Upgrade to Pro <Sparkles className="w-4 h-4 ml-2 text-amber-400" />
            </Button>
            
            <button 
                onClick={() => onOpenChange(false)}
                className="w-full text-center text-slate-400 text-xs font-medium mt-4 hover:text-slate-600 transition-colors"
            >
                Maybe later
            </button>
        </div>

      </DialogContent>
    </Dialog>
  );
}

function FeatureRow({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
            </div>
            <span className="text-sm text-slate-600 font-medium">{text}</span>
        </div>
    )
}