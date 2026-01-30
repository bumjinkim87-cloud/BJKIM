
import React, { useState, useEffect } from 'react';
import { Player } from '../types';
import { getAIScoutingSummary } from '../services/geminiService';

interface PlayerDetailProps {
  player: Player;
  isAdmin: boolean;
  onBack: () => void;
  onUpdate: (updatedPlayer: Player) => void;
  onDelete: (id: string) => void;
}

export const PlayerDetail: React.FC<PlayerDetailProps> = ({ player, isAdmin, onBack, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlayer, setEditedPlayer] = useState<Player>({ ...player });
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const handleAISummary = async () => {
    setLoadingAI(true);
    const summary = await getAIScoutingSummary(player);
    setAiReport(summary || "Failed to generate AI analysis.");
    setLoadingAI(false);
  };

  const handleSave = () => {
    onUpdate(editedPlayer);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedPlayer(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Player] as any),
          [child]: isNaN(Number(value)) || value === '' ? value : Number(value)
        }
      }));
    } else {
      setEditedPlayer(prev => ({
        ...prev,
        [name]: isNaN(Number(value)) || value === '' ? value : Number(value)
      }));
    }
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* Header Bar */}
      <div className="flex justify-between items-center pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          </button>
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{player.name}</h1>
            <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              <span className="text-blue-400">{player.team}</span>
              <span>•</span>
              <span>{player.position}</span>
              <span>•</span>
              <span>Draft Class {player.draftYear}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          {isAdmin && (
            <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className={`${isEditing ? 'bg-emerald-600' : 'bg-slate-800'} text-white px-6 py-2 rounded-lg font-bold uppercase text-xs tracking-widest transition-all shadow-xl`}>
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          )}
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl">
            Export PDF Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Col: Bio & Grades */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="relative group">
              <img src={player.image} className="w-full aspect-[4/5] object-cover grayscale-[0.2]" alt="" />
              {isEditing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4">
                  <input name="image" value={editedPlayer.image} onChange={handleChange} className="w-full bg-slate-900 text-[10px] p-2" placeholder="Image URL..." />
                </div>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">HT</p>
                  {isEditing ? <input name="height" value={editedPlayer.height} onChange={handleChange} className="w-full bg-transparent text-center font-bold" /> : <p className="text-sm font-bold text-white">{player.height}</p>}
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">WT</p>
                  {isEditing ? <input name="weight" value={editedPlayer.weight} onChange={handleChange} className="w-full bg-transparent text-center font-bold" /> : <p className="text-sm font-bold text-white">{player.weight}</p>}
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">AGE</span>
                  {isEditing ? <input name="age" type="number" value={editedPlayer.age} onChange={handleChange} className="bg-transparent text-right font-bold w-12" /> : <span className="text-white font-bold">{player.age}</span>}
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">NATIONALITY</span>
                  {isEditing ? <input name="nationality" value={editedPlayer.nationality} onChange={handleChange} className="bg-transparent text-right font-bold w-24" /> : <span className="text-white font-bold">{player.nationality}</span>}
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">STATUS</span>
                  <span className="text-emerald-400 font-bold uppercase">Active Follow</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scouting Grades</h3>
            <div className="space-y-4">
              {Object.entries(isEditing ? editedPlayer.scoutingGrades : player.scoutingGrades).map(([key, val]) => (
                <div key={key}>
                  <div className="flex justify-between text-[10px] mb-1.5 uppercase font-bold">
                    <span className="text-slate-500">{key}</span>
                    {isEditing ? (
                      <input 
                        name={`scoutingGrades.${key}`} 
                        type="number" 
                        min="1" max="10" 
                        value={val as number} 
                        onChange={handleChange} 
                        className="w-10 bg-slate-800 text-blue-400 text-right pr-1"
                      />
                    ) : <span className="text-blue-400">{val}/10</span>}
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000" 
                      style={{ width: `${(val as number) * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center/Right Col: Detailed Report & Projections */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-5 gap-4">
             {['GP', 'G', 'A', 'PTS', '+/-'].map((lbl, idx) => {
               const valMap: any = { GP: 'gamesPlayed', G: 'goals', A: 'assists', PTS: 'points', '+/-': 'plusMinus' };
               const val = (isEditing ? editedPlayer.stats : player.stats)[valMap[lbl] as keyof typeof player.stats];
               return (
                 <div key={lbl} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center shadow-lg">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{lbl}</p>
                    {isEditing ? (
                      <input 
                        name={`stats.${valMap[lbl]}`} 
                        type="number" 
                        value={val as number} 
                        onChange={handleChange} 
                        className="bg-transparent text-xl font-black w-full text-center"
                      />
                    ) : (
                      <p className={`text-2xl font-black ${lbl === 'PTS' ? 'text-blue-400' : 'text-white'}`}>{val}</p>
                    )}
                 </div>
               );
             })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths / Weaknesses */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Report</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2">Strengths</h4>
                  <ul className="space-y-2">
                    {(isEditing ? editedPlayer.strengths : player.strengths).map((s, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-slate-300">
                        <span className="text-emerald-500 mt-1">▸</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase mb-2">Critical Weaknesses</h4>
                  <ul className="space-y-2">
                    {(isEditing ? editedPlayer.weaknesses : player.weaknesses).map((w, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-slate-300">
                        <span className="text-amber-500 mt-1">▸</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Projection & Player Comparison */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Projection Analysis</h3>
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Projected Role</p>
                <p className="text-sm font-bold text-white uppercase italic">Elite Top-Line Playmaker</p>
              </div>
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">NHL Pro Comparable</p>
                <p className="text-sm font-bold text-blue-400 uppercase italic">Nathan MacKinnon / Jack Hughes</p>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Draft Projection</p>
                <p className="text-sm font-bold text-white">Consensus Top 3 Overall</p>
              </div>
            </div>
          </div>

          {/* AI Augmented Intelligence Section */}
          <div className="bg-slate-900 border border-blue-500/30 p-8 rounded-2xl relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all">
               <span className="text-8xl">🤖</span>
            </div>
            <div className="flex justify-between items-center mb-6 relative">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">AI Augmented Scouting Summary</h3>
                <p className="text-xs text-slate-400">Gemini Pro 3 Analysis based on aggregated data points</p>
              </div>
              {!aiReport && (
                <button 
                  onClick={handleAISummary}
                  disabled={loadingAI}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all"
                >
                  {loadingAI ? 'Scanning Data...' : 'Generate AI Brief'}
                </button>
              )}
            </div>
            
            <div className="relative">
              {aiReport ? (
                <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-300 animate-in slide-in-from-top-4 duration-500">
                  {aiReport.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/50">
                  <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-2">Neural Engine Idle</p>
                  <p className="text-slate-700 text-[10px]">Click above to run comprehensive automated projection analysis</p>
                </div>
              )}
            </div>
          </div>

          {/* Video / Clips Section */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tactical Video Tags</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { tag: 'Rush Entry', count: 12 },
                  { tag: 'Powerplay Distribution', count: 8 },
                  { tag: 'Backchecking Effort', count: 4 },
                ].map((clip, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 group-hover:border-blue-500 transition-all mb-2 relative overflow-hidden">
                       <span className="text-slate-600 group-hover:text-blue-400 transition-colors">▶ CLIP_REF_{clip.tag.slice(0,3)}</span>
                       <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/50 text-[8px] text-white rounded">0:45</div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{clip.tag}</span>
                      <span className="text-[10px] text-slate-600">{clip.count} files</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
