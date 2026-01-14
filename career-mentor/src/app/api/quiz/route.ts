import { NextResponse } from 'next/server';
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { db } from '@/lib/db';
import { geminiModel } from '@/lib/gemini';

// Define the Schema
const schema = z.object({
  analysis: z.string(),
  recommendations: z.array(
    z.object({
      title: z.string(),
      type: z.enum(["CAREER", "DEGREE"]),
      matchScore: z.number().min(0).max(100),
      matchReason: z.string(),
      overview: z.string(),
      skills: z.array(z.string()),
      difficulty: z.enum(["Easy", "Moderate", "Hard"]),
      futureScope: z.enum(["Low", "Medium", "High"])
    })
  )
});

type AssessmentResult = z.infer<typeof schema>;
const parser = StructuredOutputParser.fromZodSchema(schema);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answers } = body;

    if (!answers) return NextResponse.json({ error: "Missing answers" }, { status: 400 });

    const formatInstructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
      template: `
        You are an expert Career Counselor. Analyze the following user answers:
        {answers}

        Based on this, recommend 3 specific Career Paths and 3 Educational Degrees.
        
        IMPORTANT: Return ONLY raw JSON. No markdown formatting.
        {format_instructions}
      `,
      inputVariables: ["answers"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const input = await prompt.format({ answers: JSON.stringify(answers) });
    
    // Call Gemini
    const response = await geminiModel.invoke(input);
    
    // Clean Output
    let content = response.content as string;
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    // Parse
    const parsedResult = await parser.parse(content) as AssessmentResult;

    // Save to DB
    const session = await db.assessmentSession.create({
      data: {
        answers: answers,
        resultSummary: parsedResult.analysis,
        recommendations: {
          create: parsedResult.recommendations.map((rec) => ({
            title: rec.title,
            type: rec.type,
            matchScore: rec.matchScore,
            matchReason: rec.matchReason,
            overview: rec.overview,
            skills: rec.skills,
            difficulty: rec.difficulty,
            futureScope: rec.futureScope
          }))
        }
      },
      include: { recommendations: true }
    });

    return NextResponse.json({ id: session.id });

    } catch (error: any) {
    console.error("AI Error Details:", error); // Log full object to terminal

    // 1. Handle Rate Limits (429)
    if (error.message?.includes("429") || error.status === 429) {
      return NextResponse.json(
        { error: "AI is busy. Please wait 10 seconds and try again." }, 
        { status: 429 }
      );
    }

    // 2. Handle Model Not Found (404) - Helps debug if model name changes again
    if (error.message?.includes("404") || error.status === 404) {
       return NextResponse.json(
        { error: "AI Configuration Error: Model not found. Check server logs." }, 
        { status: 404 }
      );
    }

    // 3. Generic Error
    return NextResponse.json(
      { error: error.message || "Failed to generate recommendations." }, 
      { status: 500 }
    );
  }
}