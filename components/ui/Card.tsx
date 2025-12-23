import React from 'react';

export const Card: React.FC<{ children: React.ReactNode, className?: string, title?: string }> = ({ children, className = '', title }) => (
  <div className={`bg-paper border border-stone-300 shadow-sm ${className}`}>
    {title && (
      <div className="bg-stone-200 px-4 py-2 border-b border-stone-300">
        <h3 className="font-header text-fresnia-dark text-sm tracking-widest uppercase">{title}</h3>
      </div>
    )}
    <div className="p-4">
      {children}
    </div>
  </div>
);
