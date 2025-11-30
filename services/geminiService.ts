import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChartDataPoint, MarketInsight } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMarketTrend = async (data: ChartDataPoint[]): Promise<MarketInsight> => {
  try {
    const dataSummary = JSON.stringify(data.slice(-5)); // Analyze last 5 data points
    
    const prompt = `
      Act as a senior Web3 Quantitative Analyst. Analyze this JSON dataset of recent token performance (Price/Volume): ${dataSummary}.
      
      Provide a concise JSON response with three fields:
      1. "analysis": A 2-sentence market summary for a dashboard widget. Use technical jargon like "support levels", "volume divergence", or "momentum".
      2. "sentiment": One of "bullish", "bearish", or "neutral".
      3. "confidence": A number between 0 and 100 representing confidence level.

      Do not include markdown formatting. Return raw JSON.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as MarketInsight;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      analysis: "Unable to connect to the Quantum Neural Network for real-time analysis.",
      sentiment: "neutral",
      confidence: 0
    };
  }
};