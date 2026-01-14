// src/app/results/[id]/page.tsx
import Link from 'next/link';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecommendationCard from '@/components/RecommendationCard';
import { ArrowLeft, BookOpen, Briefcase } from 'lucide-react';

// FIX: Define params as a Promise
interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ResultsPage({ params }: PageProps) {
  
  // FIX: Await the params before accessing properties
  const { id } = await params;

  // 1. Fetch Session Data
  const session = await db.assessmentSession.findUnique({
    where: { id: id },
    include: { recommendations: true }
  });

  if (!session) return notFound();

  // 2. Sort Recommendations
  const careers = session.recommendations.filter(r => r.type === 'CAREER');
  const degrees = session.recommendations.filter(r => r.type === 'DEGREE');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/home">
                <div className="font-bold text-xl flex items-center gap-2">
                    CareerPath.AI <span className="text-slate-400 font-normal">/ Results</span>
                </div>
            </Link>
            <Link href="/assessment">
                <Button variant="outline" size="sm">Retake Test</Button>
            </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Intro */}
        <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Your Career Analysis</h1>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">AI Summary</h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                    {session.resultSummary}
                </p>
            </div>
        </div>

        {/* Tabs for Careers vs Degrees */}
        <Tabs defaultValue="careers" className="w-full">
            <div className="flex items-center justify-between mb-8">
                <TabsList className="bg-white border border-slate-200 p-1 rounded-xl h-auto">
                    <TabsTrigger value="careers" className="px-6 py-3 rounded-lg text-base data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        <Briefcase className="w-4 h-4 mr-2" /> Recommended Careers
                    </TabsTrigger>
                    <TabsTrigger value="degrees" className="px-6 py-3 rounded-lg text-base data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                        <BookOpen className="w-4 h-4 mr-2" /> Educational Paths
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="careers" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {careers.map(rec => (
                    <RecommendationCard key={rec.id} data={rec} />
                ))}
            </TabsContent>

            <TabsContent value="degrees" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 {degrees.map(rec => (
                    <RecommendationCard key={rec.id} data={rec} />
                ))}
            </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}