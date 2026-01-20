import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResultCard from '@/components/ResultCard';
import { Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function FreeResultsPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch Session (No user check needed here)
  const assessmentSession = await db.assessmentSession.findUnique({
    where: { id },
    include: { recommendations: true }
  });

  if (!assessmentSession) return notFound();

  const careers = assessmentSession.recommendations.filter(r => r.type === 'CAREER');
  const degrees = assessmentSession.recommendations.filter(r => r.type === 'DEGREE');

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                        <Sparkles className="w-3 h-3" /> Free Analysis Complete
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        Your Career Preview
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
                        Based on your answers, here are your top matches. 
                        <strong> Sign in</strong> to save these results and view detailed career roadmaps.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/signup">
                        <Button className="h-12 px-8 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg">
                            Sign Up to Save
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="careers" className="w-full">
            <div className="flex items-center justify-between mb-8">
                <TabsList className="bg-white border border-slate-200 p-1 rounded-xl h-auto shadow-sm">
                    <TabsTrigger value="careers" className="px-6 py-3 rounded-lg text-sm font-medium data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">
                        <Briefcase className="w-4 h-4 mr-2" /> Career Paths
                    </TabsTrigger>
                    <TabsTrigger value="degrees" className="px-6 py-3 rounded-lg text-sm font-medium data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">
                        <GraduationCap className="w-4 h-4 mr-2" /> Educational Degrees
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="careers" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {careers.map(rec => (
                        <ResultCard 
                            key={rec.id} 
                            data={rec} 
                            isInitiallySaved={false}
                            isGuest={true} // ENABLE GUEST MODE
                        />
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="degrees" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {degrees.map(rec => (
                        <ResultCard 
                            key={rec.id} 
                            data={rec} 
                            isInitiallySaved={false}
                            isGuest={true} // ENABLE GUEST MODE
                        />
                    ))}
                </div>
            </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}