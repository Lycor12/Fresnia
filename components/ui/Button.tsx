import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = '', children, ...props }) => (
  <button 
    className={`px-6 py-3 bg-fresnia-dark text-paper font-header uppercase tracking-wider text-sm hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-fresnia-dark ${className}`}
    {...props}
  >
    {children}
  </button>
);
