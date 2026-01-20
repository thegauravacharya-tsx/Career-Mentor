import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import ResultsClientView from '@/components/ResultsClientView'; 
import { NotificationProvider } from "@/context/NotificationContext";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ResultsPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { id } = await params;

  const assessmentSession = await db.assessmentSession.findUnique({
    where: { id },
    include: { recommendations: true }
  });

  if (!assessmentSession) return notFound();

  const savedItems = await db.savedResource.findMany({
    where: { userId: session.user.id },
    select: { resourceId: true }
  });
  
  const savedIds = savedItems.map(item => item.resourceId);

  const user = await db.user.findUnique({ 
      where: { id: session.user.id },
      include: { _count: { select: { assessments: true } } }
  });

  const userCreatedAt = user?.createdAt ? new Date(user.createdAt) : undefined;

  return (
    <NotificationProvider
        userCreatedAt={userCreatedAt} 
        assessmentCount={user?._count.assessments || 0}
    >
        <ResultsClientView 
            sessionData={assessmentSession} 
            savedIds={savedIds} 
        />
    </NotificationProvider>
  );
}