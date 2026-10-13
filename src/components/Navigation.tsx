import React from 'react';
import { Home, BarChart3, Cpu, Send } from 'lucide-react';
import { soundManager } from '../utils/audio';

export type TabType = 'home' | 'status' | 'algorithms' | 'community';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as TabType, icon: Home, label: 'Home' },
    { id: 'status' as TabType, icon: BarChart3, label: 'Status' },
    { id: 'algorithms' as TabType, icon: Cpu, label: 'AI Engine' },
    { id: 'community' as TabType, icon: Send, label: 'Telegram' },
  ];

  const handleSelect = (id: TabType) => {
    soundManager.playClick();
    onTabChange(id);
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 p-1.5 bg-white/92 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/40 border border-white/70">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            title={tab.label}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
              isActive
                ? 'bg-[#e60073] text-white shadow-md shadow-pink-600/40 scale-105'
                : 'bg-[#ff66a3]/20 hover:bg-[#ff66a3]/40 text-[#e60073]'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-bold mt-0.5 leading-none">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
