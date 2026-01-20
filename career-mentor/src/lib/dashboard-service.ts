import { db } from "@/lib/db";

export async function getDashboardMetrics(userId: string) {
  // 1. Fetch all assessments for this user
  const assessments = await db.assessmentSession.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      recommendations: true
    }
  });

  // 2. Calculate "Assessments Completed"
  const totalAssessments = assessments.length;

  // 3. Calculate "Clarity Score" 
  // Logic: Base 10% + (15% per assessment) + (Bonus for high match scores)
  // Max 100%
  let clarityScore = 10; 
  
  if (totalAssessments > 0) {
    clarityScore += (totalAssessments * 15);
    
    // Check average top match score
    const totalTopMatchScore = assessments.reduce((acc, curr) => {
        const topRec = curr.recommendations.sort((a, b) => b.matchScore - a.matchScore)[0];
        return acc + (topRec ? topRec.matchScore : 0);
    }, 0);
    
    const avgMatch = totalTopMatchScore / totalAssessments;
    clarityScore += (avgMatch * 0.4); // Add 40% weight of average match
  }

  // Cap at 100
  clarityScore = Math.min(Math.round(clarityScore), 100);

  // 4. Determine "Action Items"
  // Logic: If clarity < 50, action is "Take Assessment". If > 80, "Save Career".
  let pendingActions = 0;
  if (totalAssessments === 0) pendingActions += 1; // Take first quiz
  
  const savedResources = await db.savedResource.count({ where: { userId } });
  if (savedResources === 0 && totalAssessments > 0) pendingActions += 1; // Save a career
  
  // 5. Format Recent Activity
  const recentActivity = assessments.slice(0, 3).map(a => {
    const topRec = a.recommendations.sort((x, y) => y.matchScore - x.matchScore)[0];
    return {
      id: a.id,
      role: topRec ? topRec.title : "Assessment Completed",
      match: topRec ? `${topRec.matchScore}%` : "N/A",
      date: a.createdAt
    };
  });

  return {
    clarityScore,
    totalAssessments,
    pendingActions,
    savedResources,
    recentActivity
  };
}