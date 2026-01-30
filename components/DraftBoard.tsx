
import React from 'react';
import { Player } from '../types';

interface DraftBoardProps {
  players: Player[];
  onPlayerClick: (player: Player) => void;
}

export const DraftBoard: React.FC<DraftBoardProps> = ({ players, onPlayerClick }) => {
  const rankedPlayers = [...players].sort((a, b) => b.stats.points - a.stats.points);

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-xl font-bold text-white">KIHA Official Draft Ranking</h3>
        <p className="text-slate-400 text-sm">Ranked by performance and scout aggregate grades</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Player</th>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Points</th>
              <th className="px-6 py-4">Scout Index</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {rankedPlayers.map((player, index) => (
              <tr key={player.id} className="hover:bg-slate-700/50 transition-colors cursor-pointer" onClick={() => onPlayerClick(player)}>
                <td className="px-6 py-4 font-bold text-blue-400">#{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={player.image} alt={player.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-medium text-slate-200">{player.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">{player.position}</td>
                <td className="px-6 py-4 text-slate-300 font-semibold">{player.stats.points}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full" 
                        style={{ width: `${(player.scoutingGrades.hockeyIQ + player.scoutingGrades.skating) * 5}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-400 hover:text-white text-sm font-medium">View Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
