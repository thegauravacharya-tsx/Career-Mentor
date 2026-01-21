"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CAREER_QUESTIONS, type Question } from "@/lib/questions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { LimitReachedModal } from "@/components/dashboard/LimitReachedModal";
import { ArrowLeft, ArrowRight, Check, Sparkles, BrainCircuit, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived State
  const currentQuestion: Question = CAREER_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / CAREER_QUESTIONS.length) * 100;
  const isAnswered = answers[currentQuestion.id] !== undefined;
  const [showLimitModal, setShowLimitModal] = useState(false);

  // Handlers
  const handleSelect = (value: any) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentIndex < CAREER_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      submitAssessment();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      if (res.status === 403) {
        setIsSubmitting(false);
        setShowLimitModal(true);
        return;
      }

      if (!res.ok) throw new Error("Analysis failed");
      
      const data = await res.json();
      router.push(`/results/${data.id}`);
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center relative overflow-hidden">
        <GrainOverlay />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-purple-900/20 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10 p-8"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 mx-auto mb-8 animate-pulse">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Analyzing Profile</h2>
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
            Our AI is cross-referencing your cognitive style with 50,000+ career paths and real-time market data...
          </p>
          
          <div className="w-64 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-blue-500 animate-progress-indeterminate" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans flex flex-col">
      <GrainOverlay />

        <LimitReachedModal 
          open={showLimitModal} 
          onOpenChange={setShowLimitModal}
          title="Assessment Limit Reached"
          description="You have used all 3 free assessments included in the basic plan."
       />

      {/* Header / Progress */}
      <header className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-sm fixed top-0 w-full z-20">
        <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Question {currentIndex + 1}/{CAREER_QUESTIONS.length}
            </span>
        </div>
        <div className="w-32 md:w-64">
            <Progress value={progress} className="h-2 bg-slate-100" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6">
        <div className="w-full max-w-5xl">
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="grid md:grid-cols-12 gap-12 md:gap-24 items-start"
                >
                    {/* Left Column: Context */}
                    <div className="md:col-span-5 pt-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Sparkles className="w-3 h-3" />
                            {currentQuestion.type === 'slider' ? 'Self Assessment' : 'Preference'}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-[1.15] mb-6">
                            {currentQuestion.text}
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Be honest. There are no wrong answers. We use this to map your latent potential.
                        </p>
                    </div>

                    {/* Right Column: Interaction */}
                    <div className="md:col-span-7">
                        
                        {currentQuestion.type === 'choice' && (
                            <div className="grid gap-4">
                                {currentQuestion.options?.map((option) => {
                                    const isSelected = answers[currentQuestion.id] === option;
                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleSelect(option)}
                                            className={cn(
                                                "group relative p-6 text-left rounded-2xl border-2 transition-all duration-200 outline-none",
                                                isSelected 
                                                    ? "border-blue-600 bg-blue-50/50 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]" 
                                                    : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"
                                            )}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className={cn(
                                                    "text-lg font-medium transition-colors",
                                                    isSelected ? "text-blue-900" : "text-slate-700"
                                                )}>
                                                    {option}
                                                </span>
                                                {isSelected && (
                                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {currentQuestion.type === 'slider' && (
                            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm mt-8">
                                <div className="mb-12 text-center">
                                    <span className="text-5xl font-bold text-slate-900 tracking-tighter">
                                        {answers[currentQuestion.id] || 50}
                                    </span>
                                    <span className="text-slate-400 text-xl font-medium ml-1">%</span>
                                </div>
                                <Slider
                                    defaultValue={[50]}
                                    value={[answers[currentQuestion.id] || 50]}
                                    max={100}
                                    step={1}
                                    onValueChange={(val) => handleSelect(val[0])}
                                    className="py-4"
                                />
                                <div className="flex justify-between mt-6 text-sm font-bold text-slate-500 uppercase tracking-wide">
                                    <span>{currentQuestion.minLabel}</span>
                                    <span>{currentQuestion.maxLabel}</span>
                                </div>
                            </div>
                        )}

                    </div>
                </motion.div>
            </AnimatePresence>

        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 w-full bg-white border-t border-slate-200 p-6 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Button 
                variant="ghost" 
                onClick={handleBack}
                disabled={currentIndex === 0 || isSubmitting}
                className="text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <Button 
                onClick={handleNext}
                disabled={!isAnswered || isSubmitting}
                className={cn(
                    "h-12 px-8 rounded-xl font-semibold transition-all duration-300",
                    isAnswered 
                        ? "bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-lg shadow-slate-900/20 translate-y-0" 
                        : "bg-slate-100 text-slate-300 cursor-not-allowed"
                )}
            >
                {currentIndex === CAREER_QUESTIONS.length - 1 ? "Complete Analysis" : "Continue"} 
                <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </footer>

    </div>
  );
}