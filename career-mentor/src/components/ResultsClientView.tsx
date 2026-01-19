"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResultCard from '@/components/ResultCard';
import { Briefcase, GraduationCap, LayoutDashboard, Sparkles } from 'lucide-react';

interface ResultsClientViewProps {
  sessionData: {
    resultSummary: string | null;
    recommendations: any[]; 
  };
  savedIds: string[];
}

export default function ResultsClientView({ sessionData, savedIds }: ResultsClientViewProps) {
    const savedSet = new Set(savedIds);

    const careers = sessionData.recommendations.filter((r: any) => r.type === 'CAREER');
    const degrees = sessionData.recommendations.filter((r: any) => r.type === 'DEGREE');

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">

            <main className="pt-10 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
                    
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                            <Sparkles className="w-3 h-3" /> Analysis Complete
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                            Your Career Blueprint
                        </h1>
                        <p className="text-lg text-slate-500 leading-relaxed">
                            Based on your profile, our AI has identified these high-potential paths. 
                            Save the ones that resonate to build your roadmap.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="flex-shrink-0">
                        <Link href="/dashboard">
                            <Button variant="outline" className="h-11 px-5 border-slate-200 text-slate-700 hover:bg-white hover:text-slate-900 font-medium rounded-xl shadow-sm bg-white">
                                <LayoutDashboard className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Executive Summary Box */}
                <div className="mb-12 p-8 bg-white rounded-[24px] border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-lg">
                        <Sparkles className="w-5 h-5 text-purple-600" /> Executive Summary
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-[15px]">
                        {sessionData.resultSummary}
                    </p>
                </div>

                {/* Tabs & Grid */}
                <Tabs defaultValue="careers" className="w-full">
                    <div className="flex items-center justify-between mb-8">
                        <TabsList className="bg-white border border-slate-200 p-1.5 rounded-xl h-auto shadow-sm">
                            <TabsTrigger value="careers" className="px-5 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">
                                <Briefcase className="w-4 h-4 mr-2" /> Career Paths
                            </TabsTrigger>
                            <TabsTrigger value="degrees" className="px-5 py-2.5 rounded-lg text-sm font-medium data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">
                                <GraduationCap className="w-4 h-4 mr-2" /> Educational Degrees
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="careers" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {careers.map((rec: any) => (
                                <ResultCard 
                                    key={rec.id} 
                                    data={rec} 
                                    isInitiallySaved={savedSet.has(rec.id)} 
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="degrees" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {degrees.map((rec: any) => (
                                <ResultCard 
                                    key={rec.id} 
                                    data={rec} 
                                    isInitiallySaved={savedSet.has(rec.id)} 
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

            </main>
        </div>
    );
}