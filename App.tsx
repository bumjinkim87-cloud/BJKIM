
import React, { useState } from 'react';
import { View, Player, UserRole } from './types';
import { PLAYERS as INITIAL_PLAYERS } from './constants';
import { Dashboard } from './components/Dashboard';
import { PlayerCard } from './components/PlayerCard';
import { PlayerDetail } from './components/PlayerDetail';
import { DraftBoard } from './components/DraftBoard';
import { Analytics } from './components/Analytics';

const App: React.FC = () => {
  // Defaulting to 'COACH' role to bypass the landing page
  const [userRole] = useState<UserRole>('COACH');
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);

  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.league.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updatePlayer = (updatedPlayer: Player) => {
    setPlayers(prev => prev.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
    setSelectedPlayer(updatedPlayer);
  };

  const deletePlayer = (id: string) => {
    if (window.confirm('경고: 해당 선수를 시스템에서 영구 삭제하시겠습니까?')) {
      setPlayers(prev => prev.filter(p => p.id !== id));
      setSelectedPlayer(null);
    }
  };

  const NavItem = ({ view, label, icon }: { view: View; label: string; icon: string }) => (
    <button 
      onClick={() => {
        setActiveView(view);
        setSelectedPlayer(null);
      }}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all w-full group ${
        activeView === view ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-bold text-[11px] uppercase tracking-widest">{label}</span>
    </button>
  );

  const roleLabels = {
    COACH: '감독 (HEAD COACH)',
    SCOUT: '스카웃터 (PRO SCOUT)'
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col p-6 hidden md:flex z-50">
        <div className="mb-12 flex items-center space-x-3 group">
          <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/20">K</div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">KIHA</span>
            <span className="text-[8px] font-bold text-slate-600 tracking-[0.3em] uppercase">Scouting Systems</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
          <NavItem view="dashboard" label="Dashboard" icon="📊" />
          <NavItem view="players" label="Players" icon="⛸" />
          <NavItem view="reports" label="Reports" icon="📋" />
          <NavItem view="watchlist" label="Watchlist" icon="⭐" />
          <NavItem view="draft" label="Draft Board" icon="🏆" />
          <NavItem view="video" label="Video Hub" icon="🎥" />
          <NavItem view="analytics" label="Analytics" icon="📈" />
          <NavItem view="settings" label="Settings" icon="⚙" />
        </nav>

        <div className="mt-auto space-y-6">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg border border-slate-700">
                {userRole === 'COACH' ? '👔' : '⛸️'}
             </div>
             <div className="min-w-0">
                <p className="text-[10px] font-black text-white truncate uppercase tracking-tight">Current User</p>
                <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">{roleLabels[userRole]}</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        <header className="h-16 border-b border-slate-900 flex items-center justify-between px-8 z-40 bg-slate-950/80 backdrop-blur-xl">
          <div className="relative w-96 group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="GLOBAL SEARCH..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900/50 border border-slate-800 text-slate-200 text-[11px] font-bold tracking-widest rounded-lg pl-10 pr-4 py-2 w-full focus:ring-1 focus:ring-blue-500 outline-none uppercase"
            />
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex space-x-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
               <span>Access Level: {userRole}</span>
               <span className="text-emerald-500">Live Connection</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-900"></div>
            <button className="text-slate-500 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {selectedPlayer ? (
              <PlayerDetail 
                player={selectedPlayer} 
                isAdmin={false}
                onBack={() => setSelectedPlayer(null)} 
                onUpdate={updatePlayer}
                onDelete={deletePlayer}
              />
            ) : (
              <div className="animate-in fade-in duration-500">
                {activeView === 'dashboard' && <Dashboard />}
                {activeView === 'players' && (
                  <div>
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Player Database</h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">KIHA Central Scouting Index</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredPlayers.map(player => (
                        <PlayerCard 
                          key={player.id} 
                          player={player} 
                          onClick={(p) => setSelectedPlayer(p)} 
                        />
                      ))}
                    </div>
                  </div>
                )}
                {activeView === 'draft' && <DraftBoard players={players} onPlayerClick={setSelectedPlayer} />}
                {activeView === 'analytics' && <Analytics players={players} />}
                {['reports', 'watchlist', 'video', 'staff', 'settings'].includes(activeView) && (
                  <div className="flex flex-col items-center justify-center py-32 bg-slate-900/30 rounded-3xl border border-slate-900 border-dashed">
                    <span className="text-4xl mb-4">⚙️</span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{activeView} module initializing</h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">KIHA Secure Network Layer - Development in Progress</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
