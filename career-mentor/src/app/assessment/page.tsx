// src/app/assessment/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CAREER_QUESTIONS, type Question } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Progress Percentage
  const progress = ((currentIndex + 1) / CAREER_QUESTIONS.length) * 100;
  
  // Explicitly type the current question
  const currentQuestion: Question = CAREER_QUESTIONS[currentIndex];

  const handleSelect = (value: any) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentIndex < CAREER_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      submitAssessment();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const submitAssessment = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) throw new Error("Analysis failed");
      
      const data = await res.json();
      router.push(`/results/${data.id}`); // Redirect to results page
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  // Check if current question is answered to enable "Next" button
  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      
      {/* Header / Progress */}
      <div className="w-full max-w-2xl mb-12">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Question {currentIndex + 1} of {CAREER_QUESTIONS.length}</span>
          <span>{Math.round(progress)}% completed</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card Area */}
      <div className="w-full max-w-2xl min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8 leading-tight">
              {currentQuestion.text}
            </h2>

            {/* Input Types */}
            <div className="space-y-6">
              
              {/* Type: Choice Buttons */}
              {currentQuestion.type === 'choice' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options?.map((option: string) => (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`
                        p-6 text-left rounded-xl border-2 transition-all font-medium text-lg
                        ${answers[currentQuestion.id] === option 
                          ? 'border-blue-600 bg-blue-50 text-blue-700' 
                          : 'border-slate-100 hover:border-blue-300 hover:bg-slate-50 text-slate-700'}
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Type: Slider */}
              {currentQuestion.type === 'slider' && (
                <div className="py-10 px-2">
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    onValueChange={(val) => handleSelect(val[0])}
                    className="mb-8"
                  />
                  <div className="flex justify-between text-slate-500 font-medium uppercase text-xs tracking-wider">
                    <span>{currentQuestion.minLabel}</span>
                    <span>{currentQuestion.maxLabel}</span>
                  </div>
                  {/* Visual Feedback for Slider */}
                  <div className="mt-6 text-center text-blue-600 font-bold text-xl">
                     {answers[currentQuestion.id] || 50}%
                  </div>
                </div>
              )}
              
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-2xl mt-8 flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          disabled={currentIndex === 0 || isLoading}
          className="text-slate-400 hover:text-slate-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Button 
          size="lg"
          onClick={handleNext}
          disabled={!isAnswered || isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : currentIndex === CAREER_QUESTIONS.length - 1 ? (
            "Finish"
          ) : (
            <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>

    </div>
  );
}