
import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid } from 'recharts';
import { Player } from '../types';

interface AnalyticsProps {
  players: Player[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ players }) => {
  const scatterData = players.map(p => ({
    name: p.name,
    goals: p.stats.goals,
    assists: p.stats.assists,
    points: p.stats.points,
    iq: p.scoutingGrades.hockeyIQ
  }));

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Player Efficiency Mapping</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" dataKey="goals" name="Goals" stroke="#94a3b8" />
              <YAxis type="number" dataKey="assists" name="Assists" stroke="#94a3b8" />
              <ZAxis type="number" dataKey="iq" range={[60, 400]} name="Hockey IQ" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Scatter name="Players" data={scatterData} fill="#3b82f6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-slate-400 text-sm text-center">
          X-Axis: Goals | Y-Axis: Assists | Size: Hockey IQ Grade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h4 className="font-bold mb-4">Position Distribution</h4>
          <div className="space-y-4">
            {['C', 'LW', 'RW', 'D', 'G'].map(pos => {
              const count = players.filter(p => p.position === pos).length;
              const percentage = (count / players.length) * 100;
              return (
                <div key={pos} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold">{pos}</span>
                    <span className="text-slate-400">{count} Players</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h4 className="font-bold mb-4">Nationality Breakdown</h4>
          <div className="space-y-4">
             {Array.from(new Set(players.map(p => p.nationality))).map(nat => {
               const count = players.filter(p => p.nationality === nat).length;
               return (
                 <div key={nat} className="flex justify-between items-center p-3 bg-slate-900 rounded-xl">
                   <span className="text-slate-200">{nat}</span>
                   <span className="bg-slate-700 px-3 py-1 rounded-full text-xs font-bold">{count}</span>
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    </div>
  );
};
