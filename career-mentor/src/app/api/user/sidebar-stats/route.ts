import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const savedCount = await db.savedResource.count({
    where: { userId: session.user.id }
  });

  return NextResponse.json({ hasSavedItems: savedCount > 0 });
}