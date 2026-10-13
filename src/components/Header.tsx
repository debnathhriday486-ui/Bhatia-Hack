import React from 'react';
import { Crown, Volume2, VolumeX, ShieldCheck, LogOut, Zap, Clock, Flame, Send } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { BgThemeType } from './ParticlesBackground';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onLogout: () => void;
  isFastMode: boolean;
  onToggleFastMode: () => void;
  isOnline: boolean;
  bgTheme: BgThemeType;
  onCycleBgTheme: () => void;
  onOpenTelegram: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleMute,
  onLogout,
  isFastMode,
  onToggleFastMode,
  isOnline,
  bgTheme,
  onCycleBgTheme,
  onOpenTelegram,
}) => {
  const getThemeLabel = (theme: BgThemeType) => {
    switch (theme) {
      case 'goku-ultra':
        return 'GOKU ULTRA';
      case 'goku-saiyan':
        return 'GOKU SSJ';
      case 'charts':
        return 'CHARTS';
      case 'room':
        return 'NEON';
    }
  };

  return (
    <header className="w-full max-w-[480px] mx-auto px-4 pt-3 pb-2 relative z-20">
      <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3 shadow-lg shadow-black/20 border border-white/60 flex items-center justify-between gap-2">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-tr from-[#ff66a3] to-[#e60073] flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <Crown className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-[#e60073] truncate">
                BHATIA x TRADER
              </h1>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-pink-100 text-[#e60073] uppercase tracking-wider">
                V3
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                {isOnline ? 'LIVE AI' : 'SYNCING'}
              </span>
              <span>•</span>
              <span className="text-pink-600 flex items-center gap-0.5 font-semibold truncate">
                <ShieldCheck className="w-3 h-3 text-emerald-600 inline shrink-0" />
                VIP ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Background Theme Switcher Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onCycleBgTheme();
            }}
            title="Click to switch background wallpaper (Goku Ultra Instinct / Goku SSJ / Charts)"
            className="p-1.5 sm:px-2 rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 text-slate-700 transition-all flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
            <span className="text-[10px] font-bold text-pink-700 hidden sm:inline">
              {getThemeLabel(bgTheme)}
            </span>
          </button>

          {/* Fast demo mode toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleFastMode();
            }}
            title={isFastMode ? 'Fast 15s Mode Active (Click for 60s)' : 'Standard 60s WinGo 1M (Click for 15s Fast Test)'}
            className={`p-1.5 sm:px-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
              isFastMode
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white text-slate-600 border-pink-200 hover:bg-pink-50'
            }`}
          >
            {isFastMode ? <Zap className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5 text-slate-500" />}
            <span className="text-[10px] hidden sm:inline">{isFastMode ? '15s' : '60s'}</span>
          </button>

          {/* Telegram VIP Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTelegram();
            }}
            title="Join Official VIP Telegram Group"
            className="p-1.5 sm:px-2 rounded-xl border border-sky-300 bg-gradient-to-r from-[#0088cc] to-[#25a5e3] hover:from-[#25a5e3] hover:to-[#0088cc] text-white shadow-xs flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
          >
            <Send className="w-3.5 h-3.5 -translate-x-0.5 translate-y-0.5" />
            <span className="text-[10px] font-bold hidden sm:inline">VIP</span>
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleMute();
            }}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-1.5 sm:p-2 rounded-xl border border-pink-200 bg-white hover:bg-pink-50 text-slate-600 transition-colors cursor-pointer active:scale-95"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#e60073]" />}
          </button>

          {/* Lock / Logout */}
          <button
            onClick={() => {
              soundManager.playClick();
              onLogout();
            }}
            title="Lock / Change Key"
            className="p-1.5 sm:p-2 rounded-xl border border-pink-200 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
