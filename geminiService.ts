import { GoogleGenAI, Type } from "@google/genai";
import { GameState, AIResponse, GamePhase } from "./types/index";
import { SYSTEM_PROMPT } from "./systems/gemini/systemPrompt";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

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

export const generateTurn = async (
  gameState: GameState,
  lastDecision: string | null
): Promise<AIResponse> => {
  const model = "gemini-3-flash-preview";
  
  // Construct a focused prompt context
  const context = `
    Current Phase: ${gameState.phase}
    Turn: ${gameState.turn}
    Date: ${gameState.date}
    Player: ${gameState.player.name} (${gameState.player.background} - ${gameState.player.ideology})
    
    Current Resources:
    - Political Capital: ${gameState.resources.politicalCapital}
    - Treasury: ${gameState.resources.treasury}B
    - Approval: ${gameState.resources.approval}%
    - Stability: ${gameState.resources.stability}
    - Int'l Standing: ${gameState.resources.internationalStanding}

    Faction Relationships:
    ${gameState.factions.map(f => `- ${f.name}: ${f.relationship}`).join('\n')}

    Recent History:
    ${gameState.history.slice(-3).join('\n')}

    Player's Last Decision: ${lastDecision || "None (Game Start)"}

    INSTRUCTION:
    ${gameState.phase === GamePhase.PROLOGUE 
      ? "Generate a prologue event to define the player's character background or ideology. If it is the start, introduce the election victory." 
      : "Generate a significant political event, crisis, or legislative decision based on the previous choice."}
    
    Adhere strictly to the System Prompt.
  `;

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
        temperature: 0.8,
      }
    });

    if (response.text) {
        return JSON.parse(response.text) as AIResponse;
    }
    throw new Error("No response text");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      title: "Communication Breakdown",
      narrative: "The secure line to your advisors has been severed. (API Error). Please try again.",
      options: [{ id: "retry", text: "Retry Connection" }]
    };
  }
};