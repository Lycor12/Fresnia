export interface Resources {
  politicalCapital: number;
  treasury: number; // Billions
  approval: number; // 0-100
  stability: number; // 0-100
  internationalStanding: number; // -100 to 100
}

export interface Indicators {
  gdpGrowth: number;
  unemployment: number;
  inflation: number;
  inequality: number;
  crimeRate: number;
  pressFreedom: number;
  corruptionIndex: number;
}
