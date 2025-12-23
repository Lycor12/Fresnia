export interface Faction {
  id: string;
  name: string;
  relationship: number; // -100 to 100
  description: string;
  leaders: string[];
  power: 'Elite' | 'Mass' | 'Institutional' | 'Regional';
  demands: string[];
}
