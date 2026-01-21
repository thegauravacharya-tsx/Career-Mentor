import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = waitlistSchema.parse(body);

    const existing = await db.waitlist.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ message: "You're already on the list!" }, { status: 200 });
    }

    await db.waitlist.create({
      data: { email },
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) { 
    
    if (error?.errors?.[0]?.message) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}