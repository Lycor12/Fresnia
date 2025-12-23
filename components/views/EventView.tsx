import React, { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { fetchNextTurn } from '../../systems/gemini/client';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { GameOption } from '../../types/index';

export const EventView: React.FC = () => {
  const { state, dispatch } = useGame();
  const { currentEvent, isLoading } = state;
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Initialize game if no event exists
  useEffect(() => {
    // Prevent double invocation in React Strict Mode
    if (initialized.current) return;
    
    if (!currentEvent && !isLoading && state.turn === 1) {
      initialized.current = true;
      handleOption(null);
    }
  }, []);

  // Scroll to top on new event
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [currentEvent]);

  const handleOption = async (option: GameOption | null) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Build context for AI
    const decisionContext = option 
      ? `Turn ${state.turn}: The player selected "${option.text}". ID: ${option.id}.` 
      : "Start of Game.";

    const historyContext = state.history.concat(decisionContext).slice(-5).join('\n');
    
    const context = `
      Current Phase: ${state.phase}
      Turn: ${state.turn}
      Date: ${state.date}
      Resources: PC=${state.resources.politicalCapital}, Treasury=${state.resources.treasury}B, Approval=${state.resources.approval}%, Stability=${state.resources.stability}
      Faction Relationships: ${state.factions.map(f => `${f.name}:${f.relationship}`).join(', ')}
      Recent History: ${historyContext}
    `;

    try {
      const data = await fetchNextTurn(context);
      
      if (option) {
        dispatch({ 
          type: 'UPDATE_GAME_STATE', 
          payload: { history: [...state.history, decisionContext] }
        });
      }

      dispatch({ 
        type: 'APPLY_TURN_UPDATE', 
        payload: { 
          stateUpdates: data.stateUpdates || {},
          event: {
            title: data.title,
            narrative: data.narrative,
            options: data.options,
            turn: state.turn + 1,
            date: state.date // Real implementation would increment date logic
          }
        } 
      });

      if (data.isGameOver) {
        alert(`GAME OVER: ${data.gameOverReason}`);
      }

    } catch (err) {
      console.error("Failed to load turn:", err);
      dispatch({ type: 'SET_ERROR', payload: "Failed to contact advisors (API Error)" });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  if (isLoading && !currentEvent) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 font-header text-fresnia-dark animate-pulse">Consulting Cabinet...</p>
        </div>
      </div>
    );
  }

  if (!currentEvent) return null;

  return (
    <div className="h-full flex flex-col relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-paper/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* Narrative Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 pb-6 border-b border-stone-300 text-center">
            <span className="text-xs font-bold tracking-[0.3em] text-stone-500 uppercase">Official Dispatch</span>
            <h2 className="text-4xl font-display font-bold text-fresnia-dark mt-2 mb-2">{currentEvent.title}</h2>
          </div>

          <div 
            className="prose prose-stone prose-lg font-serif text-ink leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentEvent.narrative.replace(/\n/g, '<br/>') }} 
          />
        </div>
      </div>

      {/* Decision Area */}
      <div className="flex-shrink-0 bg-white border-t border-stone-300 p-6 md:p-8 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.1)] z-20">
        <div className="max-w-4xl mx-auto grid gap-4">
          {currentEvent.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleOption(opt)}
              disabled={isLoading}
              className="group text-left p-5 border border-stone-400 bg-paper hover:bg-stone-100 hover:border-fresnia-dark hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-display font-bold text-lg text-fresnia-dark group-hover:text-accent">
                  {opt.text}
                </span>
                {opt.costDescription && (
                  <span className="text-xs font-bold text-stone-500 bg-stone-200 px-2 py-1 rounded ml-4 shrink-0">
                    {opt.costDescription}
                  </span>
                )}
              </div>
              {opt.toolTip && (
                <p className="text-sm font-serif text-stone-600 italic opacity-80">
                  Analysis: {opt.toolTip}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};