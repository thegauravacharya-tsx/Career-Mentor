import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import ResultsClientView from '@/components/ResultsClientView'; 

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

  return (
    <ResultsClientView 
        sessionData={assessmentSession} 
        savedIds={savedIds} 
    />
  );
}