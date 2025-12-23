import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "./systemPrompt";

// Singleton instance container
let ai: GoogleGenAI | null = null;

// Lazy initializer
const getAI = () => {
  if (!ai) {
    // Defensive check for process env in browser
    const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
    // Note: apiKey might be undefined/empty in some dev environments, usually causing
    // the AI call to fail gracefully later, rather than crashing the app on load.
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    narrative: { type: Type.STRING },
    options: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          text: { type: Type.STRING },
          costDescription: { type: Type.STRING },
          toolTip: { type: Type.STRING }
        },
        required: ["id", "text"]
      }
    },
    stateUpdates: {
      type: Type.OBJECT,
      properties: {
        resources: {
          type: Type.OBJECT,
          properties: {
            politicalCapital: { type: Type.NUMBER },
            treasury: { type: Type.NUMBER },
            approval: { type: Type.NUMBER },
            stability: { type: Type.NUMBER },
            internationalStanding: { type: Type.NUMBER }
          }
        },
        factions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              change: { type: Type.NUMBER }
            },
            required: ["name", "change"]
          }
        }
      }
    },
    isGameOver: { type: Type.BOOLEAN },
    gameOverReason: { type: Type.STRING }
  },
  required: ["title", "narrative", "options"]
};

export const fetchNextTurn = async (context: string) => {
  const model = "gemini-3-flash-preview";
  
  try {
    const client = getAI();
    const response = await client.models.generateContent({
      model: model,
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "user", parts: [{ text: context }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.85,
        topK: 40,
        topP: 0.95,
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};