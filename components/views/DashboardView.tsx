import React from 'react';
import { useGame } from '../../context/GameContext';
import { Card } from '../ui/Card';
import { StatBar } from '../ui/StatBar';

export const DashboardView: React.FC = () => {
  const { state } = useGame();

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar">
      <h2 className="text-3xl font-display font-bold text-fresnia-dark mb-8 border-b pb-4 border-stone-300">
        Presidential Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Player Profile">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-stone-300 rounded-full flex items-center justify-center text-2xl">👤</div>
            <div>
              <h3 className="font-bold text-lg">{state.player.name || "President"}</h3>
              <p className="text-sm italic text-stone-600">{state.player.background || "No background selected"}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm border-b border-stone-100 pb-1">
              <span className="text-stone-500">Ideology</span>
              <span className="font-bold">{state.player.ideology || "Undefined"}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-stone-100 pb-1">
              <span className="text-stone-500">Term Start</span>
              <span className="font-bold">October 2024</span>
            </div>
          </div>
        </Card>

        <Card title="Crisis Monitor">
          {state.resources.stability < 40 ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h4 className="font-bold text-red-700 uppercase tracking-wide text-sm mb-1">Warning: Unstable</h4>
              <p className="text-sm text-red-600">Civil unrest likely. Stability metrics critical.</p>
            </div>
          ) : (
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h4 className="font-bold text-green-700 uppercase tracking-wide text-sm mb-1">Status: Stable</h4>
              <p className="text-sm text-green-600">No immediate existential threats detected.</p>
            </div>
          )}
          <div className="mt-4">
             <StatBar label="National Stability" value={state.resources.stability} color={state.resources.stability < 40 ? 'bg-red-500' : 'bg-green-500'} />
          </div>
        </Card>

        <Card title="Cabinet Notes" className="md:col-span-2">
          <div className="font-serif text-sm italic text-stone-600 p-4 bg-stone-50 border border-stone-200">
            "Mr. President, remember that the budget deficit is unsustainable in the long term. The Business Council is watching your tax policy closely."
            <div className="mt-2 text-right not-italic font-bold text-xs uppercase text-stone-400">- Finance Minister Kovar</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
