import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const GameLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-stone-900 w-full">
      <Header />
      <div className="flex-1 flex overflow-hidden w-full">
        <Sidebar />
        <main className="flex-1 relative bg-paper overflow-hidden flex flex-col w-full">
          {children}
        </main>
      </div>
    </div>
  );
};