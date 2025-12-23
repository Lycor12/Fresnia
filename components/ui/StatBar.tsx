import React from 'react';

export const StatBar: React.FC<{ 
  label: string; 
  value: number; 
  min?: number; 
  max?: number; 
  color?: string;
  showValue?: boolean;
}> = ({ label, value, min = 0, max = 100, color = 'bg-fresnia-blue', showValue = true }) => {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs uppercase font-bold tracking-widest mb-1 text-fresnia-dark">
        <span>{label}</span>
        {showValue && <span>{value}</span>}
      </div>
      <div className="h-2 bg-stone-300 w-full relative">
        <div 
          className={`h-full ${color} transition-all duration-500 absolute top-0 left-0`} 
          style={{ width: `${percentage}%` }}
        />
        {/* Center line for -100 to 100 stats */}
        {min < 0 && <div className="absolute top-0 left-1/2 w-px h-full bg-stone-500 opacity-50"></div>}
      </div>
    </div>
  );
};
