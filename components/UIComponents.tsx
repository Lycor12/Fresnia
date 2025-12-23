import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
  <button 
    className={`px-4 py-2 bg-fresnia-dark text-paper font-header uppercase tracking-wider text-sm hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={`bg-paper border border-stone-300 p-6 shadow-md ${className}`}>
    {children}
  </div>
);

export const StatBar: React.FC<{ label: string; value: number; min?: number; max?: number; color?: string }> = ({ label, value, min = 0, max = 100, color = 'bg-fresnia-blue' }) => {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs uppercase font-bold tracking-widest mb-1 text-fresnia-dark">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-stone-300 w-full">
        <div 
          className={`h-full ${color} transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
