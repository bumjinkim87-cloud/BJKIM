
import { GoogleGenAI } from "@google/genai";
import { Player } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an AI-powered professional scouting report for a specific player.
 * Uses gemini-3-flash-preview for efficient text summarization.
 */
export const getAIScoutingSummary = async (player: Player) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a deep professional scouting analysis for this hockey prospect:
      Name: ${player.name}
      Position: ${player.position}
      Team: ${player.team}
      Nationality: ${player.nationality}
      Current Season Stats: GP: ${player.stats.gamesPlayed}, G: ${player.stats.goals}, A: ${player.stats.assists}, PTS: ${player.stats.points}
      Scouting Grades (1-10): Skating: ${player.scoutingGrades.skating}, Shooting: ${player.scoutingGrades.shooting}, Passing: ${player.scoutingGrades.passing}, IQ: ${player.scoutingGrades.hockeyIQ}, Physicality: ${player.scoutingGrades.physicality}
      
      Format your response with:
      1. Executive Summary
      2. Key Technical Strengths
      3. Critical Areas for Development
      4. NHL Projection & Player Comparison`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini AI error generating scouting summary:", error);
    return "The AI scout is currently reviewing the footage. Please try again in a few moments.";
  }
};

/**
 * Compares multiple players using AI reasoning to highlight competitive advantages.
 * Uses gemini-3-pro-preview for complex reasoning tasks.
 */
export const comparePlayersAI = async (players: Player[]) => {
  if (!players || players.length < 2) return "Please provide at least two players for comparison.";
  
  const playerProfiles = players.map(p => `
    [Player: ${p.name}]
    Pos: ${p.position} | PTS: ${p.stats.points} | Grades: Skating ${p.scoutingGrades.skating}, IQ ${p.scoutingGrades.hockeyIQ}, Shooting ${p.scoutingGrades.shooting}
  `).join('\n---\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Compare the following elite hockey prospects and provide a scouting head-to-head:
      ${playerProfiles}
      
      Focus on who has the higher NHL ceiling, tactical versatility, and defensive responsibility.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini AI error during player comparison:", error);
    return "AI comparison analysis failed. Please verify player data.";
  }
};
