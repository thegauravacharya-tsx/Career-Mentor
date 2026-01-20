"use client";

import { useState } from "react";
import { Recommendation } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bookmark, Check, ChevronRight, TrendingUp, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginGateModal } from "@/components/LoginGateModal"; 

interface ResultCardProps {
  data: Recommendation;
  isInitiallySaved: boolean;
  isGuest?: boolean; // Ensure this is optional
}

// FIX: Destructure isGuest here so it is available in the scope
export default function ResultCard({ data, isInitiallySaved, isGuest = false }: ResultCardProps) {
  const [isSaved, setIsSaved] = useState(isInitiallySaved);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 
  const router = useRouter();

  const toggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Use isGuest here
    if (isGuest) return; 

    setIsLoading(true);
    const previousState = isSaved;
    setIsSaved(!isSaved);

    try {
      const res = await fetch("/api/resources/save", {
        method: "POST",
        body: JSON.stringify({
          resourceId: data.id,
          type: data.type,
          title: data.title,
          matchScore: data.matchScore,
          data: data,
        }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch (error) {
      setIsSaved(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-500 bg-emerald-50 border-emerald-100";
    if (score >= 70) return "text-blue-500 bg-blue-50 border-blue-100";
    return "text-amber-500 bg-amber-50 border-amber-100";
  };

  // Use isGuest here
  const handleCardClick = (e: React.MouseEvent) => {
    if (isGuest) {
        e.preventDefault();
        setShowLoginModal(true);
    }
  };

  return (
    <>
        <LoginGateModal 
            open={showLoginModal} 
            onOpenChange={setShowLoginModal} 
            title="Unlock Detailed Insights" 
            description="Sign in to view full career details, salary outlook, and required skills."
        />

        <Dialog>
            <DialogTrigger asChild onClick={handleCardClick}>
                <div className="group bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full">
                    
                    <div className="flex justify-between items-start mb-4 z-10">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(data.matchScore)} flex items-center gap-1.5`}>
                            <TrendingUp className="w-3.5 h-3.5" />
                            {data.matchScore}% Match
                        </div>
                        
                        {/* Use isGuest here */}
                        {!isGuest && (
                            <Button 
                                size="icon" 
                                variant="ghost" 
                                className={`h-9 w-9 rounded-full ${isSaved ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-slate-50 text-slate-400 hover:text-slate-900"}`}
                                onClick={toggleSave}
                                disabled={isLoading}
                            >
                                {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                            </Button>
                        )}
                    </div>

                    <div className="z-10 flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                            {data.title}
                        </h3>
                        <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                            {data.overview}
                        </p>
                    </div>

                    <div className="z-10 mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600">AI</div>
                            <div className="w-6 h-6 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-purple-600">Tech</div>
                        </div>
                        <span className="text-xs font-bold text-slate-900 flex items-center group-hover:translate-x-1 transition-transform">
                            {isGuest ? "Login to View" : "View Details"} <ChevronRight className="w-3 h-3 ml-1" />
                        </span>
                    </div>
                </div>
            </DialogTrigger>

            {!isGuest && (
                <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-[32px] border-none">
                    <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <Badge className="bg-white/10 hover:bg-white/20 text-white border-none px-3 py-1.5 text-xs">
                                    {data.type} PATH
                                </Badge>
                                <div className="text-right">
                                    <span className="text-4xl font-bold tracking-tighter">{data.matchScore}%</span>
                                    <p className="text-white/50 text-xs uppercase tracking-wider">Compatibility</p>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <p className="text-sm text-blue-200 font-medium mb-1">AI Reasoning:</p>
                                <p className="text-slate-300 text-sm leading-relaxed">"{data.matchReason}"</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-white max-h-[50vh] overflow-y-auto">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-blue-600" /> Market Data
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                                        <span className="text-slate-500">Difficulty</span>
                                        <span className="font-semibold text-slate-900">{data.difficulty}</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                                        <span className="text-slate-500">Future Demand</span>
                                        <span className="font-semibold text-slate-900">{data.futureScope}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-3">Top Skills Required</h4>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{data.overview}</p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                            <Button variant="outline" className="rounded-xl" onClick={() => setIsSaved(!isSaved)}>
                                {isSaved ? "Remove from Saved" : "Save for Later"}
                            </Button>
                            <Button className="rounded-xl bg-slate-900 text-white hover:bg-slate-800">
                                Explore Roadmap
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    </>
  );
}