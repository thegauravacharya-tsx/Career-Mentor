import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { ProfileForm } from "@/components/dashboard/settings/ProfileForm";
import { DeleteAccountCard } from "@/components/dashboard/settings/DeleteAccountCard";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div className="min-h-screen bg-[#F2F4F7] font-sans selection:bg-slate-900 selection:text-white flex">
      
      {/* 1. Reuse Fixed Sidebar */}
      <Sidebar userId={session.user.id} />

      {/* 2. Main Content Area */}
      <div className="flex-1 ml-[280px]">
        <main className="p-8 pt-12 max-w-[1200px] mx-auto">
            
            <div className="space-y-8">
                {/* 3. Main Settings Card */}
                <ProfileForm user={user} />

                {/* 4. Danger Zone */}
                <DeleteAccountCard />
            </div>

        </main>
      </div>
    </div>
  );
}