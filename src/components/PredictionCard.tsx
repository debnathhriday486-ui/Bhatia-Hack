import React from 'react';
import { RadarVisualizer } from './RadarVisualizer';
import { PredictionType } from '../types';
import { Sparkles, Timer, Cpu, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface PredictionCardProps {
  nextPeriod: string;
  fullPeriod?: string;
  prediction: PredictionType | null;
  oppositeNumbers: number[];
  secondsRemaining: number;
  totalCycleSeconds: number;
  activeAlgorithmName: string;
  isAnalyzing: boolean;
  onInstantDraw?: () => void;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  nextPeriod,
  fullPeriod,
  prediction,
  oppositeNumbers,
  secondsRemaining,
  totalCycleSeconds,
  activeAlgorithmName,
  isAnalyzing,
  onInstantDraw,
}) => {
  const progressPercent = Math.min(100, Math.max(0, (secondsRemaining / totalCycleSeconds) * 100));

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-white/92 backdrop-blur-md p-5 rounded-3xl mb-5 text-center shadow-2xl shadow-black/30 border border-white/80 overflow-hidden">
      {/* Top Gradient Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff66a3] via-[#e60073] to-[#ff4d94]" />

      {/* Lottie / Radar Core Visualizer */}
      <RadarVisualizer isAnalyzing={isAnalyzing} />

      {/* Countdown Timer Strip */}
      <div className="max-w-[280px] mx-auto mb-4 bg-white/70 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-pink-200/80 shadow-xs flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <Timer className="w-3.5 h-3.5 text-[#e60073]" />
          Next Draw in:
        </span>
        <span className={`text-xs font-mono font-bold ${secondsRemaining <= 5 ? 'text-rose-600 animate-pulse font-extrabold' : 'text-slate-800'}`}>
          {formatTimer(secondsRemaining)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="max-w-[280px] mx-auto h-1.5 bg-pink-200/70 rounded-full mb-4 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            secondsRemaining <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-[#ff66a3] to-[#e60073]'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Combined Period & Prediction Box */}
      <div className="flex flex-col gap-3 w-full max-w-[320px] mx-auto">
        {/* Next Period Box */}
        <div className="bg-white p-3.5 rounded-2xl border border-pink-200 shadow-md shadow-pink-500/5 transition-all hover:-translate-y-0.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff66a3] mb-1 flex items-center justify-center gap-1.5">
            <span>Next Period</span>
            <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 uppercase tracking-wider">
              LIVE SYNC
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#e60073] font-mono tracking-wider">
            {nextPeriod || '-------'}
          </div>
          {fullPeriod && (
            <div className="text-[10px] text-slate-500 font-mono mt-0.5 tracking-tight truncate">
              Issue #{fullPeriod}
            </div>
          )}
        </div>

        {/* Prediction Box */}
        <div className="bg-white p-4 rounded-2xl border border-pink-200 shadow-lg shadow-pink-500/10 transition-all hover:-translate-y-0.5 animate-pulse-glow">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff66a3] mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#e60073]" />
            Prediction Signal
          </div>

          {prediction ? (
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                {prediction === 'BIG' ? (
                  <span className="inline-flex items-center gap-1 text-2xl sm:text-3xl font-extrabold text-[#e60073] tracking-wide">
                    <ArrowUpRight className="w-6 h-6 stroke-[3]" />
                    BIG
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-2xl sm:text-3xl font-extrabold text-[#ff66a3] tracking-wide">
                    <ArrowDownRight className="w-6 h-6 stroke-[3]" />
                    SMALL
                  </span>
                )}
                <span className="text-sm sm:text-base font-bold text-slate-700 bg-pink-100 px-2 py-0.5 rounded-lg border border-pink-200">
                  ({oppositeNumbers.join(',')})
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 font-medium">
                Target: {prediction} • Numbers: {oppositeNumbers.join(', ')}
              </p>
            </div>
          ) : (
            <div className="text-xl font-bold text-slate-400 font-mono py-1">
              Calculating...
            </div>
          )}
        </div>
      </div>

      {/* Algorithm Status Bar */}
      <div className="mt-4 pt-3 border-t border-pink-200/60 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#ff66a3]">
        <Cpu className="w-3.5 h-3.5 text-[#e60073]" />
        <span>Advanced Analysis System Active</span>
        <span className="text-slate-400">•</span>
        <span className="text-[#e60073] font-bold text-[11px] truncate max-w-[150px]">
          {activeAlgorithmName}
        </span>
      </div>

      {/* Instant Next Round for quick verification */}
      {onInstantDraw && (
        <div className="mt-3">
          <button
            onClick={onInstantDraw}
            className="text-[10px] font-bold uppercase tracking-wider text-pink-600 hover:text-pink-800 bg-white/70 hover:bg-white px-3 py-1 rounded-full border border-pink-200 shadow-2xs transition-all cursor-pointer"
          >
            ⚡ Test Instant Draw
          </button>
        </div>
      )}
    </div>
  );
};
