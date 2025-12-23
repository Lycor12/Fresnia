import React from 'react';
import { useGame } from '../../context/GameContext';
import { Card } from '../ui/Card';
import { StatBar } from '../ui/StatBar';

export const FactionView: React.FC = () => {
  const { state } = useGame();

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar">
      <h2 className="text-3xl font-display font-bold text-fresnia-dark mb-8 border-b pb-4 border-stone-300">
        Political Factions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.factions.map(faction => (
          <Card key={faction.id} title={faction.power}>
            <div className="mb-4">
              <h3 className="text-xl font-bold font-display text-ink mb-1">{faction.name}</h3>
              <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-2">
                Leaders: {faction.leaders.join(', ')}
              </p>
              <p className="text-sm font-serif text-stone-700 italic">
                {faction.description}
              </p>
            </div>
            
            <StatBar 
              label="Relationship" 
              value={faction.relationship} 
              min={-100} 
              max={100}
              color={faction.relationship > 0 ? 'bg-fresnia-blue' : 'bg-accent'}
            />

            <div className="mt-4 pt-4 border-t border-stone-200">
              <span className="text-xs font-bold text-stone-400 uppercase">Key Demands</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {faction.demands.map(demand => (
                  <span key={demand} className="text-xs bg-stone-100 px-2 py-1 border border-stone-300 text-stone-600">
                    {demand}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
