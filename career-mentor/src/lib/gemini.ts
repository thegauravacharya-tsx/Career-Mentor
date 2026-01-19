// src/lib/gemini.ts
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest", 
  maxOutputTokens: 8192,
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.7,
  maxRetries: 2,
});