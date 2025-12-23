import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { GameLayout } from './components/layout/GameLayout';
import { EventView } from './components/views/EventView';
import { FactionView } from './components/views/FactionView';
import { RegionView } from './components/views/RegionView';
import { DashboardView } from './components/views/DashboardView';
import { GameView } from './types/index';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-stone-900 text-paper p-8 text-center">
          <h1 className="text-3xl font-header text-red-500 mb-4">System Failure</h1>
          <p className="font-serif mb-4">The simulation encountered a critical error.</p>
          <pre className="bg-black p-4 rounded text-left text-xs font-mono text-red-300 overflow-auto max-w-full">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-2 bg-stone-700 hover:bg-stone-600 transition-colors uppercase tracking-widest text-sm"
          >
            Reboot System
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const GameContainer: React.FC = () => {
  const { state } = useGame();

  const renderView = () => {
    switch (state.currentView) {
      case GameView.FACTIONS:
        return <FactionView />;
      case GameView.REGIONS:
        return <RegionView />;
      case GameView.DASHBOARD:
        return <DashboardView />;
      case GameView.EVENT:
      default:
        return <EventView />;
    }
  };

  return (
    <GameLayout>
      {renderView()}
    </GameLayout>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </ErrorBoundary>
  );
};

export default App;