import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { Header } from "@/components/dashboard/layout/Header";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Calendar, 
  Search,
  Filter,
  BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }
  
  // Fetch Assessments
  const assessments = await db.assessmentSession.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
        recommendations: {
            take: 1, 
            orderBy: { matchScore: 'desc' }
        }
    }
  });

  return (
    <div className="min-h-screen bg-[#F2F4F7] font-sans selection:bg-slate-900 selection:text-white flex">
      
      {/* Sidebar */}
      <Sidebar userId={session.user.id} />

      {/* Main Content */}
      <div className="flex-1 ml-[280px]">
        <main className="p-8 max-w-[1400px] mx-auto">
            
            <Header userName={session.user.name || "User"} userImage={session.user.image} />

            {/* --- Content Area --- */}
            <div className="space-y-6">
                
                {/* Page Title & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Assessment History</h2>
                        <p className="text-slate-500 mt-1">View and manage your past career analysis reports.</p>
                    </div>
                    <Link href="/assessment">
                        <Button className="h-11 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-lg shadow-slate-200">
                            + Take New Assessment
                        </Button>
                    </Link>
                </div>

                {/* Data Table Card */}
                <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                    
                    {/* Table Toolbar */}
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search reports..." 
                                    className="h-10 pl-9 pr-4 rounded-xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-blue-500/20 w-64"
                                />
                            </div>
                            <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-600">
                                <Filter className="w-4 h-4 mr-2" /> Filter
                            </Button>
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            {assessments.length} Total Reports
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div className="col-span-4">Top Career Match</div>
                        <div className="col-span-3">Date Taken</div>
                        <div className="col-span-2">Match Score</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-1 text-right">Action</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-slate-100">
                        {assessments.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-slate-900 font-bold mb-1">No history found</h3>
                                <p className="text-slate-500 text-sm">You haven't taken any assessments yet.</p>
                            </div>
                        ) : (
                            assessments.map((assessment) => {
                                const topMatch = assessment.recommendations[0];
                                return (
                                    <div key={assessment.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50/80 transition-colors group">
                                        
                                        {/* Column 1: Title */}
                                        <div className="col-span-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                    <BarChart3 className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 truncate pr-4">
                                                        {topMatch ? topMatch.title : "Incomplete Analysis"}
                                                    </p>
                                                    <p className="text-xs text-slate-500">AI Model v2.0</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Column 2: Date */}
                                        <div className="col-span-3 flex items-center gap-2 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            {new Date(assessment.createdAt).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </div>

                                        {/* Column 3: Score */}
                                        <div className="col-span-2">
                                            {topMatch ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-emerald-500 rounded-full" 
                                                            style={{ width: `${topMatch.matchScore}%` }} 
                                                        />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700">{topMatch.matchScore}%</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-slate-400">N/A</span>
                                            )}
                                        </div>

                                        {/* Column 4: Status */}
                                        <div className="col-span-2">
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-semibold">
                                                Completed
                                            </Badge>
                                        </div>

                                        {/* Column 5: Action */}
                                        <div className="col-span-1 text-right">
                                            <Link href={`/results/${assessment.id}`}>
                                                <Button size="sm" variant="outline" className="h-9 rounded-lg border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300 hover:text-blue-600">
                                                    View
                                                </Button>
                                            </Link>
                                        </div>

                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

        </main>
      </div>
    </div>
  );
}