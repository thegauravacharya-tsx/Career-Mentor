import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NotificationProvider } from "@/context/NotificationContext";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch stats for Notification Logic
  const user = await db.user.findUnique({ 
      where: { id: session.user.id },
      include: { _count: { select: { assessments: true } } }
  });

  return (
    <NotificationProvider 
        userCreatedAt={user?.createdAt as Date} // Ensure User model has createdAt
        assessmentCount={user?._count.assessments || 0}
    >
        {children}
    </NotificationProvider>
  );
}