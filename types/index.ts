// Explicitly export types from sub-modules
export * from './resources';
export * from './factions';

export enum GamePhase {
  PROLOGUE = 'PROLOGUE',
  MAIN_GAME = 'MAIN_GAME',
  GAME_OVER = 'GAME_OVER'
}

export enum GameView {
  EVENT = 'EVENT',
  FACTIONS = 'FACTIONS',
  REGIONS = 'REGIONS',
  DASHBOARD = 'DASHBOARD'
}

export interface Player {
  name: string;
  background: string;
  ideology: string;
  stats?: {
    integrity: number;
    pragmatism: number;
    charisma: number;
    politicalAcumen: number;
  }
}

export interface GameOption {
  id: string;
  text: string;
  costDescription?: string;
  toolTip?: string;
}

export interface GameEvent {
  title: string;
  narrative: string;
  options: GameOption[];
  turn: number;
  date: string;
}

export interface GameState {
  phase: GamePhase;
  currentView: GameView;
  turn: number;
  date: string;
  player: Player;
  resources: import('./resources').Resources;
  factions: import('./factions').Faction[];
  currentEvent: GameEvent | null;
  history: string[];
  isLoading: boolean;
  error: string | null;
}

export interface AIResponse {
  title: string;
  narrative: string;
  options: GameOption[];
  stateUpdates?: {
    resources?: Partial<import('./resources').Resources>;
    factions?: { name: string; change: number }[];
    indicators?: any;
  };
  isGameOver?: boolean;
  gameOverReason?: string;
}