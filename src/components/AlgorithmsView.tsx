import React from 'react';
import { AlgorithmInfo } from '../types';
import { Cpu, Award, Activity } from 'lucide-react';

interface AlgorithmsViewProps {
  algorithms: AlgorithmInfo[];
  activeMethodName: string;
}

export const AlgorithmsView: React.FC<AlgorithmsViewProps> = ({
  algorithms,
  activeMethodName,
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center">
        <h2 className="text-xl font-bold tracking-tight text-[#e60073] flex items-center justify-center gap-2">
          <Cpu className="w-5 h-5 text-[#e60073]" />
          20-ALGORITHM AI ENGINE
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time dynamic method evaluation & confidence ranking
        </p>
      </div>

      <div className="bg-white/92 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/80 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-100">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff66a3]">
              Active Selected Strategy
            </div>
            <div className="text-base font-bold text-[#e60073] flex items-center gap-1.5 mt-0.5">
              <Award className="w-4 h-4 text-amber-500 fill-amber-400" />
              {activeMethodName}
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            TOP SCORING
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[480px] overflow-y-auto pr-1">
          {algorithms.map((algo, index) => {
            const isActive = algo.name === activeMethodName;

            return (
              <div
                key={algo.id}
                className={`p-3 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-[#e60073] shadow-sm'
                    : 'bg-[#fff9fc] border-pink-100 hover:border-pink-300'
                }`}
              >
                <div className="flex items-start justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-pink-100 text-[#e60073]">
                      #{algo.id}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                      {algo.name}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      algo.prediction === 'BIG'
                        ? 'bg-rose-100 text-[#e60073]'
                        : 'bg-pink-100 text-[#ff66a3]'
                    }`}
                  >
                    {algo.prediction}
                  </span>
                </div>

                <p className="text-[10px] text-slate-500 line-clamp-1 mb-2">
                  {algo.description}
                </p>

                {/* Score progress bar */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 mb-1">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#ff66a3]" />
                    Weight Score
                  </span>
                  <span className="font-bold text-[#e60073]">{algo.score}%</span>
                </div>
                <div className="h-1.5 bg-pink-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff66a3] to-[#e60073] rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(10, algo.score)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
