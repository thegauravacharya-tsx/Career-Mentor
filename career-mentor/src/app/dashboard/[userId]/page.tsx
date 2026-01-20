import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { CheckCircle2, Target, Bookmark } from "lucide-react";
import { getDashboardMetrics } from "@/lib/dashboard-service"; // Import the service

// Layout & Widget Imports
import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { Header } from "@/components/dashboard/layout/Header";
import { ProgressCard } from "@/components/dashboard/widgets/ProgressCard";
import { MetricCard } from "@/components/dashboard/widgets/MetricCard";
import { RecentActivity } from "@/components/dashboard/widgets/RecentActivity";
import { StartAssessmentCard } from "@/components/dashboard/widgets/StartAssessmentCard";
import { ClarityChart } from "@/components/dashboard/ClarityChart";

interface DashboardProps {
  params: Promise<{ userId: string }>;
}

export default async function DashboardPage({ params }: DashboardProps) {
  // 1. Auth & Security
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/login");

  const { userId } = await params;

  // @ts-ignore
  if (userId !== session.user.id) {
    // @ts-ignore
    redirect(`/dashboard/${session.user.id}`);
  }

  // 2. Fetch User & Metrics in Parallel
  const [user, metrics] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    getDashboardMetrics(userId)
  ]);

  if (!user) return <div>User not found</div>;

  return (
    <div className="min-h-screen bg-[#F2F4F7] font-sans selection:bg-slate-900 selection:text-white flex">

      {/* 1. Sidebar (Fixed Left) */}
      <Sidebar userId={userId} />

      {/* 2. Main Content Area */}
      <div className="flex-1 ml-[280px]">
        <main className="p-8 max-w-[1600px] mx-auto">

          {/* Header */}
          <Header userName={user.name || "User"} userImage={user.image} />

          {/* Grid Layout */}
          <div className="grid grid-cols-12 gap-6 h-auto lg:h-[calc(100vh-180px)] min-h-[600px]">

            {/* -- ROW 1 -- */}

            {/* Card 1: Clarity Score (Live Data) */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4 row-span-2">
              <ClarityChart score={metrics.clarityScore} />
            </div>

            {/* Card 2: Assessments Completed (Live Data) */}
            <div className="col-span-12 md:col-span-7 lg:col-span-4">
              <MetricCard
                label="Assessments Completed"
                value={metrics.totalAssessments.toString()}
                subValue="Sessions"
                icon={Target}
                trend="neutral"
              />
            </div>

            {/* Card 3: Pending Actions / Saved Items (Live Data) */}
            <div className="col-span-12 md:col-span-12 lg:col-span-4">
              <MetricCard
                label="Saved Careers"
                value={metrics.savedResources.toString()}
                subValue="Bookmarks"
                icon={Bookmark}
                trend="up"
              />
            </div>

            {/* -- ROW 2 -- */}

            {/* Card 4: Recent Activity (Live Data) */}
            <div className="col-span-12 lg:col-span-8 row-span-2">
              <RecentActivity activities={metrics.recentActivity} />
            </div>

            {/* Card 5: CTA */}
            <div className="col-span-12 md:col-span-4 row-span-2">
              <StartAssessmentCard />
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}