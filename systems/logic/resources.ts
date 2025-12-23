import { Resources } from '../../types/resources';

// Helper to clamp values
export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const applyResourceUpdates = (current: Resources, updates: Partial<Resources>): Resources => {
  return {
    politicalCapital: clamp(current.politicalCapital + (updates.politicalCapital || 0), 0, 100),
    treasury: current.treasury + (updates.treasury || 0),
    approval: clamp(current.approval + (updates.approval || 0), 0, 100),
    stability: clamp(current.stability + (updates.stability || 0), 0, 100),
    internationalStanding: clamp(current.internationalStanding + (updates.internationalStanding || 0), -100, 100)
  };
};

export const calculatePCRegen = (approval: number) => {
  if (approval > 60) return 5;
  if (approval > 45) return 3;
  if (approval > 30) return 1;
  return -2;
};
