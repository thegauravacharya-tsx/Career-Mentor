// src/lib/gemini.ts
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const geminiModel = new ChatGoogleGenerativeAI({
  // Use the alias that points to the current stable version
  model: "gemini-flash-latest", 
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.7,
  maxRetries: 2,
});