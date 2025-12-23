import React from 'react';
import { useGame } from '../../context/GameContext';
import { Briefcase, Coins, TrendingUp, Scale, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const { state } = useGame();
  const { resources } = state;

  return (
    <header className="h-20 bg-stone-850 text-stone-200 border-b-4 border-accent shadow-lg flex-shrink-0 z-10">
      <div className="h-full flex items-center justify-between px-4 md:px-8 max-w-[1920px] mx-auto overflow-x-auto custom-scrollbar">
        
        <div className="flex gap-6 md:gap-12 min-w-max mx-auto">
          <ResourceItem 
            icon={<Briefcase size={16} />} 
            label="Political Capital" 
            value={resources.politicalCapital}
            color="text-yellow-500"
          />
          <ResourceItem 
            icon={<Coins size={16} />} 
            label="Treasury" 
            value={`₣${resources.treasury}B`}
            color={resources.treasury < 0 ? 'text-red-400' : 'text-green-400'}
          />
          <ResourceItem 
            icon={<TrendingUp size={16} />} 
            label="Approval" 
            value={`${resources.approval}%`}
          />
          <ResourceItem 
            icon={<Scale size={16} />} 
            label="Stability" 
            value={resources.stability}
            color={resources.stability < 40 ? 'text-red-500 animate-pulse' : ''}
          />
          <ResourceItem 
            icon={<Globe size={16} />} 
            label="Int'l Standing" 
            value={resources.internationalStanding}
          />
        </div>

      </div>
    </header>
  );
};

const ResourceItem: React.FC<{ icon: React.ReactNode, label: string, value: string | number, color?: string }> = ({ icon, label, value, color = 'text-white' }) => (
  <div className="flex flex-col items-center min-w-[100px]">
    <div className="flex items-center gap-2 text-stone-400 text-[10px] uppercase tracking-wider mb-1">
      {icon} {label}
    </div>
    <div className={`text-xl font-bold font-mono ${color}`}>
      {value}
    </div>
  </div>
);
