"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Calendar, 
  ArrowRight, 
  BarChart3,
  TrendingUp,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner"; 

interface Assessment {
    id: string;
    createdAt: string;
    recommendations: { title: string; matchScore: number }[];
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    let isMounted = true; 

    if (status === "unauthenticated") {
      router.push("/login");
    }
    
    if (session?.user?.id) {
        fetch(`/api/user/assessments`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) { 
                    setAssessments(data);
                    setIsLoadingData(false);
                }
            })
            .catch(() => {
                if (isMounted) setIsLoadingData(false);
            });
    }

    return () => {
        isMounted = false; 
    };
  }, [session, status, router]);

  const handleViewClick = (id: string) => {
    setIsNavigating(true);
    router.push(`/results/${id}`);
  };

  if (status === "loading" || isLoadingData || isNavigating) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F2F4F7]">
            <div className="flex flex-col items-center gap-4">
                <Spinner />
                <p className="text-slate-500 text-sm font-medium animate-pulse">
                    {isNavigating ? "Loading Report..." : "Loading History..."}
                </p>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F4F7] font-sans selection:bg-slate-900 selection:text-white flex">
      
      {session?.user?.id && <Sidebar userId={session.user.id} />}

      <div className="flex-1 ml-[280px]">
        <main className="p-8 pt-12 max-w-[1200px] mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Assessment History</h1>
                    <p className="text-slate-500 mt-2 text-lg">
                        Review your past career analysis reports and track your progress.
                    </p>
                </div>
                <Link href="/assessment">
                    <Button className="h-12 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-lg shadow-slate-200 cursor-pointer">
                        + New Assessment
                    </Button>
                </Link>
            </div>

            <div className="space-y-4">
                {assessments.length === 0 ? (
                    <div className="bg-white rounded-[24px] border border-slate-200 p-16 text-center shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No history found</h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                            You haven't completed any career assessments yet.
                        </p>
                        <Link href="/assessment">
                            <Button variant="outline" className="rounded-xl border-slate-200 cursor-pointer">
                                Start Assessment
                            </Button>
                        </Link>
                    </div>
                ) : (
                    assessments.map((assessment) => {
                        const topMatch = assessment.recommendations[0];
                        const date = new Date(assessment.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                        });

                        return (
                            <div 
                                key={assessment.id} 
                                className="group bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div className="flex items-start gap-6 flex-1 min-w-0">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-black transition-colors">
                                        <BarChart3 className="w-7 h-7" />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-lg text-slate-900 truncate">
                                                {topMatch ? topMatch.title : "Incomplete Analysis"}
                                            </h3>
                                            <Badge variant="secondary" className="hidden sm:flex bg-slate-100 text-slate-600 font-normal">
                                                v2.0
                                            </Badge>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" /> {date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" /> Completed
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 md:gap-12 md:pt-0">
                                    <div className="flex flex-col items-start md:items-end">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Match Score</span>
                                        {topMatch ? (
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                                <span className="text-xl font-bold text-slate-900">{topMatch.matchScore}%</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm font-medium text-slate-400">N/A</span>
                                        )}
                                    </div>

                                    <button 
                                        onClick={() => handleViewClick(assessment.id)}
                                        className="h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all cursor-pointer"
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

        </main>
      </div>
    </div>
  );
}