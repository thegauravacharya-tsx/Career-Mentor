import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const saveSchema = z.object({
  resourceId: z.string(),
  type: z.string(),
  title: z.string(),
  matchScore: z.number(),
  data: z.any(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { resourceId, type, title, matchScore, data } = saveSchema.parse(body);

    const userId = session.user.id;

    // Check if toggling OFF (Unsave)
    const existing = await db.savedResource.findUnique({
      where: {
        userId_resourceId: { userId, resourceId },
      },
    });

    if (existing) {
      await db.savedResource.delete({ where: { id: existing.id } });
      return NextResponse.json({ saved: false });
    } else {
      // --- LIMIT CHECK LOGIC ---
      // Free User Limits: 5 Careers, 5 Degrees
      
      // 1. Count existing saved items of this type
      const count = await db.savedResource.count({
        where: { userId, type }
      });

      // Limit Threshold
      if (count >= 5) {
        return NextResponse.json(
            { error: "LIMIT_REACHED", message: `You can only save 5 ${type.toLowerCase()}s on the free plan.` }, 
            { status: 403 }
        );
      }

      // 2. Save if under limit
      await db.savedResource.create({
        data: { userId, resourceId, type, title, matchScore, data },
      });
      return NextResponse.json({ saved: true });
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}