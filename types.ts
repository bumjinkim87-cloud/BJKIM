
export type UserRole = 'COACH' | 'SCOUT';

export interface Player {
  id: string;
  name: string;
  age: number;
  position: 'C' | 'LW' | 'RW' | 'D' | 'G';
  team: string;
  league: string;
  nationality: string;
  height: string;
  weight: string;
  draftYear: number;
  image: string;
  stats: {
    gamesPlayed: number;
    goals: number;
    assists: number;
    points: number;
    plusMinus: number;
    penaltyMinutes?: number;
  };
  scoutingGrades: {
    skating: number; // 1-10
    shooting: number;
    passing: number;
    hockeyIQ: number;
    physicality: number;
    competeLevel: number;
  };
  projections?: {
    role: string;
    ceiling: string;
    floor: string;
  };
  strengths: string[];
  weaknesses: string[];
  watchlist?: boolean;
  tier?: 'Tier 1' | 'Tier 2' | 'Tier 3';
}

export interface ScoutingReport {
  id: string;
  playerId: string;
  playerName: string;
  scoutName: string;
  date: string;
  summary: string;
  technicalAnalysis: string;
  projection: string;
}

export type View = 
  | 'dashboard' 
  | 'players' 
  | 'reports' 
  | 'watchlist' 
  | 'draft' 
  | 'video' 
  | 'analytics' 
  | 'staff' 
  | 'settings' 
  | 'report-builder';
