
import { Player } from './types';

export const PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Connor Bedard',
    age: 19,
    position: 'C',
    team: 'Chicago Blackhawks',
    league: 'NHL',
    nationality: 'Canada',
    height: "5'10\"",
    weight: '185 lbs',
    draftYear: 2023,
    image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=400',
    stats: { gamesPlayed: 68, goals: 22, assists: 39, points: 61, plusMinus: -44, penaltyMinutes: 28 },
    scoutingGrades: { skating: 9, shooting: 10, passing: 9, hockeyIQ: 10, physicality: 6, competeLevel: 9 },
    strengths: ['Elite Shooting', 'Vision', 'Edge Work'],
    weaknesses: ['Defensive positioning', 'Strength'],
    watchlist: true,
    tier: 'Tier 1'
  },
  {
    id: '2',
    name: 'Macklin Celebrini',
    age: 18,
    position: 'C',
    team: 'San Jose Sharks',
    league: 'NHL',
    nationality: 'Canada',
    height: "6'0\"",
    weight: '190 lbs',
    draftYear: 2024,
    image: 'https://images.unsplash.com/photo-1580748141549-71748d60bdc9?auto=format&fit=crop&q=80&w=400',
    stats: { gamesPlayed: 0, goals: 0, assists: 0, points: 0, plusMinus: 0, penaltyMinutes: 0 },
    scoutingGrades: { skating: 8, shooting: 9, passing: 9, hockeyIQ: 9, physicality: 7, competeLevel: 10 },
    strengths: ['Two-way play', 'Elite IQ', 'Faceoffs'],
    weaknesses: ['Consistency in physical battles'],
    watchlist: true,
    tier: 'Tier 1'
  },
  {
    id: '3',
    name: 'Lane Hutson',
    age: 20,
    position: 'D',
    team: 'Montreal Canadiens',
    league: 'NHL',
    nationality: 'USA',
    height: "5'10\"",
    weight: '162 lbs',
    draftYear: 2022,
    image: 'https://images.unsplash.com/photo-1550256201-2a912e9b8966?auto=format&fit=crop&q=80&w=400',
    stats: { gamesPlayed: 2, goals: 0, assists: 2, points: 2, plusMinus: -2, penaltyMinutes: 0 },
    scoutingGrades: { skating: 10, shooting: 7, passing: 10, hockeyIQ: 10, physicality: 5, competeLevel: 8 },
    strengths: ['Deceptive skating', 'O-zone creation', 'Powerplay QB'],
    weaknesses: ['Size', 'D-zone coverage'],
    watchlist: false
  }
];

export const POSITIONS = ['C', 'LW', 'RW', 'D', 'G'] as const;
export const LEAGUES = ['NHL', 'AHL', 'CHL', 'SHL', 'Liiga', 'NCAA', 'KHL'];
