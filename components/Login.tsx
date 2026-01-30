
import React from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const roles = [
    {
      id: 'COACH' as UserRole,
      title: '감독',
      subtitle: 'Head Coach',
      description: '팀 전력 분석, 로스터 관리 및 심층 통계 분석',
      icon: '👔',
      color: 'emerald'
    },
    {
      id: 'SCOUT' as UserRole,
      title: '스카웃터',
      subtitle: 'Pro Scout',
      description: '유망주 관찰 리포트 작성 및 드래프트 보드 업데이트',
      icon: '⛸️',
      color: 'amber'
    }
  ];

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center p-6 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_100%)] opacity-50"></div>
      
      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center bg-blue-600 w-20 h-20 rounded-2xl font-black text-white text-4xl shadow-2xl shadow-blue-500/20 mb-8 border border-blue-400/20">K</div>
          <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-3">KIHA SCOUTING SYSTEM</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Professional NHL Internal Network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {roles.map((role, idx) => (
            <button
              key={role.id}
              onClick={() => onLogin(role.id)}
              className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2rem] text-left hover:border-blue-500/50 hover:bg-slate-800/60 transition-all group flex flex-col h-full shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-300 transform-gpu">{role.icon}</div>
              <h3 className="text-2xl font-black text-white mb-1">{role.title}</h3>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6">{role.subtitle}</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-10 flex-1">{role.description}</p>
              
              <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                <span>Access System</span>
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-20 text-center animate-in fade-in duration-1000 delay-500">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800">
             <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">Authorized Access Only • Secure Encrypted Session</p>
          </div>
        </div>
      </div>
    </div>
  );
};
