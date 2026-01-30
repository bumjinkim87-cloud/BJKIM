
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { PLAYERS } from '../constants';

export const Dashboard: React.FC = () => {
  const watchlist = PLAYERS.filter(p => p.watchlist);
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Front Office Dashboard</h1>
          <p className="text-slate-400 text-sm">Real-time scouting intelligence and prospect tracking</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-xs font-mono text-slate-300">
          LAST REFRESH: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Prospects', value: '1,248', change: '+12', color: 'blue' },
          { label: 'Active Watchlist', value: watchlist.length.toString(), change: '0', color: 'emerald' },
          { label: 'Reports Pending', value: '42', change: '-5', color: 'amber' },
          { label: 'Live Scout Feeds', value: '8', change: 'NEW', color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-sm hover:border-slate-700 transition-all">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-${stat.color}-500/10 text-${stat.color}-400`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Scouting Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Scouting Activity</h3>
              <span className="text-[10px] text-blue-400 font-bold cursor-pointer hover:underline">MARK ALL AS READ</span>
            </div>
            <div className="divide-y divide-slate-800">
              {[
                { player: 'Connor Bedard', msg: 'Elite vision shown in OT vs DET', time: '12m ago', scout: 'D. Hunter' },
                { player: 'Macklin Celebrini', msg: 'Updated physical testing data uploaded', time: '45m ago', scout: 'System' },
                { player: 'Lane Hutson', msg: 'High danger pass completion: 92%', time: '2h ago', scout: 'J. Smith' },
              ].map((alert, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-all cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm font-bold text-white">{alert.player}</p>
                      <p className="text-xs text-slate-400">{alert.msg}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{alert.scout}</p>
                    <p className="text-[10px] text-slate-600 font-mono">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Upcoming Prospect Viewing Schedule</h3>
             <div className="space-y-4">
                {[
                  { game: 'Boston College @ Boston University', date: 'Tonight, 19:00 EST', coverage: 'Full Scout Presence' },
                  { game: 'London Knights vs Kitchener Rangers', date: 'Tomorrow, 14:00 EST', coverage: 'Remote Analysis Only' }
                ].map((game, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div>
                      <p className="text-sm font-bold text-white">{game.game}</p>
                      <p className="text-xs text-slate-400">{game.date}</p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-400 px-2 py-1 bg-blue-400/10 rounded uppercase">{game.coverage}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Watchlist Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Watchlist (Tier 1)</h3>
          </div>
          <div className="p-4 space-y-3">
            {watchlist.map(p => (
              <div key={p.id} className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer">
                <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{p.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase">{p.team} · {p.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-blue-400">{p.stats.points} pts</p>
                  <p className="text-[10px] text-slate-600">GP: {p.stats.gamesPlayed}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-[10px] font-bold text-slate-500 uppercase hover:text-white transition-colors border-t border-slate-800 mt-2">View Full Watchlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};
