import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import ResultCard from "@/components/ResultCard";
import { Bookmark, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SavedPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const savedResources = await db.savedResource.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#F2F4F7] font-sans selection:bg-slate-900 selection:text-white flex">
      
      {/* Sidebar */}
      <Sidebar userId={session.user.id} />

      {/* Main Content */}
      <div className="flex-1 ml-[280px]">
        <main className="p-8 pt-12 max-w-[1400px] mx-auto">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-10 mt-4">
                <div className="h-12 w-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                    <Bookmark className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Saved Assessments</h1>
                    <p className="text-slate-500 mt-1">
                        Your bookmarked career paths and degree programs.
                    </p>
                </div>
            </div>

            {/* Content Grid */}
            {savedResources.length === 0 ? (
                <div className="bg-white rounded-[24px] border border-slate-200 p-16 text-center shadow-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                        <Bookmark className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No saved items yet</h3>
                    <p className="text-slate-500 mb-8 max-w-sm">
                        When you see a career path you like in your results, click the bookmark icon to save it here.
                    </p>
                    <Link href="/assessment">
                        <Button className="rounded-xl px-6">
                            Start New Assessment
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedResources.map((resource) => {
                        const recommendationData = resource.data as any; 

                        return (
                            <ResultCard 
                                key={resource.id} 
                                data={{
                                    ...recommendationData,
                                }}
                                isInitiallySaved={true} 
                            />
                        );
                    })}
                </div>
            )}

        </main>
      </div>
    </div>
  );
}