import { Faction, GameState, GamePhase, GameView } from "./types/index";

export const INITIAL_FACTIONS: Faction[] = [
  { 
    id: 'business',
    name: "Fresnian Business Council", 
    relationship: 10, 
    description: "Major corporations, mining magnates. Controls 35% of GDP.",
    leaders: ["Damien Korvash", "Elena Sarros", "Viktor Malens"],
    power: 'Elite',
    demands: ["Low taxes", "Deregulation", "AU market access"]
  },
  { 
    id: 'labor',
    name: "Fresnian Labor Congress", 
    relationship: 0, 
    description: "Industrial unions and public sector workers.",
    leaders: ["Marina Volensk", "Gregor Tanis"],
    power: 'Mass',
    demands: ["Wage increases", "Job security", "Wealth redistribution"]
  },
  { 
    id: 'military',
    name: "Armed Forces Command", 
    relationship: 20, 
    description: "Military officer corps and defense establishment.",
    leaders: ["General Markus Draven", "Admiral Lena Kross"],
    power: 'Institutional',
    demands: ["Defense budget", "National security", "Strategic autonomy"]
  },
  { 
    id: 'vernish',
    name: "Vernish National Assembly", 
    relationship: -10, 
    description: "Regional minority party seeking autonomy.",
    leaders: ["Aleksandr Rovin", "Katya Marenko"],
    power: 'Regional',
    demands: ["Cultural autonomy", "Language rights", "Resource sharing"]
  },
  { 
    id: 'nationalist',
    name: "Fresnian National Party", 
    relationship: -20, 
    description: "Right-wing nationalist opposition.",
    leaders: ["Dimitri Volkov", "Father Mikhael"],
    power: 'Mass',
    demands: ["Ethnic dominance", "Traditional values", "Strong borders"]
  },
  { 
    id: 'democrats',
    name: "Democratic Alliance", 
    relationship: 10, 
    description: "Urban progressives and intellectuals.",
    leaders: ["Senator Irina Vasquez", "Alexei Dorn"],
    power: 'Elite',
    demands: ["Liberal democracy", "Rule of law", "Anti-corruption"]
  },
  { 
    id: 'agrarian',
    name: "Agrarian Union", 
    relationship: 5, 
    description: "Farmers and rural communities.",
    leaders: ["Josef Brandt", "Dr. Nadia Kovar"],
    power: 'Mass',
    demands: ["Subsidies", "Rural infrastructure", "Fair crop prices"]
  },
  { 
    id: 'religious',
    name: "Religious Orthodox Council", 
    relationship: 5, 
    description: "Fresnian Orthodox Church authority.",
    leaders: ["Patriarch Simeon IV", "Bishop Andrei Koslov"],
    power: 'Mass',
    demands: ["Religious freedom", "Traditional family values"]
  },
  { 
    id: 'enviro',
    name: "Environmental Coalition", 
    relationship: 0, 
    description: "Climate activists and scientists.",
    leaders: ["Dr. Elisa Varen", "Maxim Sedor"],
    power: 'Mass',
    demands: ["Climate action", "Renewable transition", "Pollution reduction"]
  },
  { 
    id: 'dakhari',
    name: "Dakhari Cultural Assembly", 
    relationship: -5, 
    description: "Highland minority group.",
    leaders: ["Tamara Davan", "Reza Kashani"],
    power: 'Regional',
    demands: ["Cultural recognition", "Infrastructure investment"]
  },
  { 
    id: 'judiciary',
    name: "Judiciary & Legal Establishment", 
    relationship: 30, 
    description: "Courts and legal profession.",
    leaders: ["Chief Justice Marta Volnova", "Boris Tarev"],
    power: 'Institutional',
    demands: ["Judicial independence", "Rule of law"]
  },
  { 
    id: 'media',
    name: "Media Consortium", 
    relationship: 20, 
    description: "Journalists and broadcasters.",
    leaders: ["Vera Kostin", "Edgar Volynsky"],
    power: 'Institutional',
    demands: ["Press freedom", "Access to information"]
  },
];

export const INITIAL_STATE: GameState = {
  phase: GamePhase.PROLOGUE,
  currentView: GameView.EVENT,
  turn: 1,
  date: "October 2024",
  player: {
    name: "President",
    background: "",
    ideology: ""
  },
  resources: {
    politicalCapital: 60,
    treasury: -120, // Deficit
    approval: 55,
    stability: 65,
    internationalStanding: 10
  },
  factions: INITIAL_FACTIONS,
  currentEvent: null,
  history: [],
  isLoading: false,
  error: null
};

// A compressed version of the user's massive prompt to fit in context efficiently while retaining core instructions.
export const SYSTEM_PROMPT = `
You are the Game Master for "The Fresnia Chronicles", a serious, complex geopolitical RPG.
The player is the President of Fresnia.
World Context: Fresnia is a resource-rich (rare earths), mid-sized nation bridging democratic Aurelia and authoritarian Khazaria. Key issues: Economic stagnation, Vernish separatism, climate change, corruption.

Core Rules:
1. Radical Realism: Decisions have trade-offs. No purely "good" choices.
2. Narrative: Write in a sophisticated, formal political thriller style (like Le Carré or House of Cards). Use Markdown.
3. Mechanics: Manage Political Capital (0-100), Treasury (Billions, starts negative), Approval (%), Stability (0-100), International Standing.
4. Factions: 12 key factions including Business Council, Labor Congress, Military, Vernish Assembly (Separatists).

Your Goal:
Generate the next game event based on the current state and the player's last decision.

Output Format:
Return ONLY a valid JSON object with this schema:
{
  "title": "Event Headline",
  "narrative": "3-4 paragraphs of descriptive text setting the scene, dialogue from advisors, and the stakes.",
  "options": [
    { "id": "A", "text": "Action text", "costDescription": "Cost: 10 PC", "toolTip": "Predicted: +Labor, -Business, Risk of inflation" }
  ],
  "stateUpdates": {
    "resources": { "politicalCapital": -5 },
    "factions": [ { "name": "Business Council", "change": -10 } ]
  },
  "isGameOver": false,
  "gameOverReason": null
}

If the player is in the PROLOGUE phase:
- Ask them to define their Background (Urban Elite, Working Class, etc.) and Ideology.
- Do not apply heavy resource costs yet.
- Transition to MAIN_GAME after 3 setup turns.

If in MAIN_GAME:
- Generate complex crises (Strikes, Coups, Diplomatic Incidents).
- Apply "stateUpdates" based on the *previous* decision's consequence before presenting the *new* event narrative.
- Ensure the narrative explains *why* stats changed based on the last choice.
`;