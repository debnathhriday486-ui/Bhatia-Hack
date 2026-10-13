export type PredictionType = 'BIG' | 'SMALL';
export type RoundStatus = 'WIN' | 'NUMBER WIN' | 'LOSS' | 'PENDING';

export interface HistoryItem {
  id: string;
  period: string;
  fullPeriod?: string;
  color?: string;
  prediction: PredictionType;
  oppositeNumbers: number[];
  status: RoundStatus;
  result: number | null;
  oppositeHit: boolean;
  predictionWin: boolean;
  timestamp?: number;
  algorithmName?: string;
}

export interface StatsState {
  wins: number;
  losses: number;
  streaks: {
    current: number;
    best: number;
  };
  counts: {
    big: number;
    small: number;
  };
}

export interface AlgorithmInfo {
  id: number;
  name: string;
  description: string;
  score: number;
  prediction: PredictionType;
}
