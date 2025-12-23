import React, { createContext, useContext, useReducer, ReactNode } from 'react';
// Use explicit paths to avoid 'index' resolution issues in some environments
import { GameState, GamePhase, GameEvent, GameOption, GameView } from '../types/index';
import { Resources } from '../types/resources';
import { Faction } from '../types/factions';
import { INITIAL_FACTIONS } from '../constants/factions';
import { applyResourceUpdates, clamp } from '../systems/logic/resources';

// --- State Definition ---
interface State {
  phase: GamePhase;
  currentView: GameView;
  turn: number;
  date: string;
  player: {
    name: string;
    background: string;
    ideology: string;
  };
  resources: Resources;
  factions: Faction[];
  currentEvent: GameEvent | null;
  history: string[];
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: State = {
  phase: GamePhase.PROLOGUE,
  currentView: GameView.EVENT,
  turn: 1,
  date: "October 2024",
  player: { name: "President", background: "", ideology: "" },
  resources: {
    politicalCapital: 60,
    treasury: -120,
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

// --- Actions ---
type Action = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_GAME_STATE'; payload: Partial<State> }
  | { type: 'APPLY_TURN_UPDATE'; payload: { stateUpdates: any; event: GameEvent } }
  | { type: 'CHANGE_VIEW'; payload: GameView };

// --- Reducer ---
const gameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CHANGE_VIEW':
      return { ...state, currentView: action.payload };
    case 'UPDATE_GAME_STATE':
      return { ...state, ...action.payload };
    case 'APPLY_TURN_UPDATE':
      const { stateUpdates, event } = action.payload;
      
      // Apply Resource Updates safely
      const updates = stateUpdates || {};
      const newResources = updates.resources 
        ? applyResourceUpdates(state.resources, updates.resources) 
        : state.resources;
        
      // Apply Faction Updates safely
      let newFactions = [...state.factions];
      if (updates.factions && Array.isArray(updates.factions)) {
        updates.factions.forEach((update: { name: string; change: number }) => {
          const idx = newFactions.findIndex(f => f.name === update.name);
          if (idx !== -1) {
            newFactions[idx] = {
              ...newFactions[idx],
              relationship: clamp(newFactions[idx].relationship + update.change, -100, 100)
            };
          }
        });
      }

      // Check for Game Phase Transition (Prologue -> Main)
      let newPhase = state.phase;
      if (state.phase === GamePhase.PROLOGUE && state.turn >= 3) {
        newPhase = GamePhase.MAIN_GAME;
      }

      return {
        ...state,
        resources: newResources,
        factions: newFactions,
        currentEvent: event,
        turn: state.turn + 1,
        phase: newPhase,
        isLoading: false,
        currentView: GameView.EVENT // Always switch back to event view on new turn
      };
    default:
      return state;
  }
};

// --- Context ---
const GameContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};