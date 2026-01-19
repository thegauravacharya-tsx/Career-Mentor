import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

// Layout & Widget Imports
import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { Header } from "@/components/dashboard/layout/Header";
import { ProgressCard } from "@/components/dashboard/widgets/ProgressCard";
import { SkillLevelCard, ActivityCard } from "@/components/dashboard/widgets/StatsCards";
import { InsightsCard } from "@/components/dashboard/widgets/InsightsCard";

interface DashboardProps {
  params: Promise<{ userId: string }>;
}

export default async function DashboardPage({ params }: DashboardProps) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const { userId } = await params;

  // Strict IDOR Check
  // @ts-ignore
  if (userId !== session.user.id) {
    // @ts-ignore
    redirect(`/dashboard/${session.user.id}`);
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div className="min-h-screen bg-[#F2F4F7] font-sans selection:bg-slate-900 selection:text-white flex">
      
      {/* 1. Sidebar */}
      <Sidebar userId={userId} />

      {/* 2. Main Content Area */}
      <div className="flex-1 ml-[280px]">
        <main className="p-8 max-w-[1600px] mx-auto">
            
            {/* Header */}
            <Header userName={user.name || "User"} userImage={user.image} />
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-[600px]">
                
                {/* -- ROW 1 -- */}
                <div className="col-span-12 md:col-span-5 lg:col-span-4 row-span-2">
                    <ProgressCard />
                </div>

                {/* Card 2: Skill Level -> Spans 4 cols, 1 row */}
                <div className="col-span-12 md:col-span-7 lg:col-span-4">
                    <SkillLevelCard />
                </div>

                {/* Card 3: Activity */}
                <div className="col-span-12 md:col-span-12 lg:col-span-4">
                    <ActivityCard />
                </div>

                <div className="col-span-12 lg:col-span-8 row-span-1">
                    <InsightsCard />
                </div>

            </div>

        </main>
      </div>
    </div>
  );
}