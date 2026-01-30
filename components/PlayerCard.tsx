
import React from 'react';
import { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  onClick: (player: Player) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => {
  return (
    <div 
      onClick={() => onClick(player)}
      className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all cursor-pointer group shadow-lg"
    >
      <div className="relative h-48">
        <img 
          src={player.image} 
          alt={player.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          {player.position}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{player.name}</h3>
          <p className="text-sm text-slate-300">{player.team}</p>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between border-b border-slate-700 pb-1">
          <span className="text-slate-400">나이</span>
          <span className="font-semibold">{player.age}세</span>
        </div>
        <div className="flex justify-between border-b border-slate-700 pb-1">
          <span className="text-slate-400">신장</span>
          <span className="font-semibold">{player.height}</span>
        </div>
        <div className="flex justify-between border-b border-slate-700 pb-1">
          <span className="text-slate-400">드래프트</span>
          <span className="font-semibold">{player.draftYear}년</span>
        </div>
        <div className="flex justify-between border-b border-slate-700 pb-1">
          <span className="text-slate-400">포인트</span>
          <span className="font-semibold text-blue-400">{player.stats.points} P</span>
        </div>
      </div>
      <div className="px-4 pb-4">
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
            <div 
                className="bg-blue-500 h-1.5 rounded-full" 
                style={{ width: `${(player.scoutingGrades.hockeyIQ + player.scoutingGrades.skating) * 5}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider text-center">Prospect Grade Index</p>
      </div>
    </div>
  );
};
