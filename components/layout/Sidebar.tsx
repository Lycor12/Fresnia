import React from 'react';
import { useGame } from '../../context/GameContext';
import { GameView } from '../../types/index';
import { ScrollText, Users, Map, LayoutDashboard } from 'lucide-react';
import { StatBar } from '../ui/StatBar';

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useGame();

  const navItems = [
    { view: GameView.EVENT, label: 'Current Event', icon: <ScrollText size={18} /> },
    { view: GameView.FACTIONS, label: 'Factions', icon: <Users size={18} /> },
    { view: GameView.REGIONS, label: 'Regions', icon: <Map size={18} /> },
    { view: GameView.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <aside className="w-80 bg-stone-100 border-r border-stone-300 flex-shrink-0 flex flex-col h-full overflow-hidden">
      {/* Brand */}
      <div className="p-6 text-center border-b border-stone-300 bg-paper">
        <div className="w-16 h-16 bg-stone-850 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-header border-4 border-double border-accent shadow-md">
          FR
        </div>
        <h1 className="font-header text-lg text-fresnia-dark font-bold">Republic of Fresnia</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Executive Office</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="space-y-1 mb-8">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => dispatch({ type: 'CHANGE_VIEW', payload: item.view })}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-header uppercase tracking-wider transition-all duration-200 border-l-4 ${
                state.currentView === item.view
                  ? 'bg-white border-accent text-fresnia-dark shadow-sm'
                  : 'border-transparent text-stone-600 hover:bg-stone-200 hover:text-stone-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="px-4">
          <h3 className="font-header text-xs text-stone-400 uppercase tracking-widest mb-4 border-b border-stone-200 pb-2">
            Intelligence Brief
          </h3>
          <StatBar label="Econ Health" value={state.resources.treasury + 200} max={500} color="bg-green-600" showValue={false} />
          <StatBar label="Military" value={70} color="bg-red-700" showValue={false} />
          <StatBar label="Social Order" value={state.resources.stability} color="bg-blue-600" showValue={false} />
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-stone-300 bg-stone-200 text-center">
        <p className="text-[10px] text-stone-500 font-mono">
          Turn {state.turn} | {state.date}
        </p>
      </div>
    </aside>
  );
};