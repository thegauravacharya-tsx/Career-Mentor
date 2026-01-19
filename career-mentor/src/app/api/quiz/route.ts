import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth"; // Import Session
import { authOptions } from "@/lib/auth"; // Import Auth Options
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { db } from '@/lib/db';

// ... (Keep your existing schema/parser definitions intact) ...
const schema = z.object({
  analysis: z.string().describe("A brief analysis of the user profile based on answers."),
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

const parser = StructuredOutputParser.fromZodSchema(schema);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answers } = body;

    // 1. Check for User Session
    const session = await getServerSession(authOptions);

    if (!answers) {
      return NextResponse.json({ error: "Missing answers" }, { status: 400 });
    }

    const model = new ChatGoogleGenerativeAI({
        model: "gemini-flash-latest",
        maxOutputTokens: 8192,
        apiKey: process.env.GOOGLE_API_KEY,
        temperature: 0.7,
    });

    const formatInstructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
      template: `
        You are an expert Career Counselor. Analyze the following user answers:
        {answers}
        Based on this, recommend 3 specific Career Paths and 3 Educational Degrees.
        IMPORTANT: You must strictly follow the JSON format below. Do not add markdown code blocks.
        {format_instructions}
      `,
      inputVariables: ["answers"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const input = await prompt.format({ answers: JSON.stringify(answers) });
    const response = await model.invoke(input);
    
    let content = response.content as string;
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsedResult = await parser.parse(content);

    // 2. Save with User Relation (if logged in)
    const sessionData: any = {
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
    };

    // Link User ID if session exists
    if (session && session.user) {
        sessionData.userId = session.user.id;
    }

    const newAssessmentSession = await db.assessmentSession.create({
      data: sessionData,
      include: {
        recommendations: true
      }
    });

    return NextResponse.json({ id: newAssessmentSession.id });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to generate recommendations." }, { status: 500 });
  }
}