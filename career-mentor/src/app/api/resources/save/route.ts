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

    // Check if already saved
    const existing = await db.savedResource.findUnique({
      where: {
        userId_resourceId: {
          userId: session.user.id,
          resourceId: resourceId,
        },
      },
    });

    if (existing) {
      // Toggle OFF (Unsave)
      await db.savedResource.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ saved: false });
    } else {
      // Toggle ON (Save)
      await db.savedResource.create({
        data: {
          userId: session.user.id,
          resourceId,
          type,
          title,
          matchScore,
          data,
        },
      });
      return NextResponse.json({ saved: true });
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}