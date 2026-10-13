import React, { useState } from 'react';
import { StatsState, HistoryItem } from '../types';
import {
  Zap,
  Crown,
  TrendingUp,
  Layers,
  Trophy,
  History,
  ChevronLeft,
  ChevronRight,
  ListOrdered,
  Dices,
  Loader2,
  PieChart,
} from 'lucide-react';

interface StatsViewProps {
  stats: StatsState;
  extendedHistory: HistoryItem[];
}

export const StatsView: React.FC<StatsViewProps> = ({ stats, extendedHistory }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const totalRounds = stats.wins + stats.losses;
  const accuracy = totalRounds > 0 ? Math.round((stats.wins / totalRounds) * 100) : 0;

  const totalPages = Math.max(1, Math.ceil(extendedHistory.length / pageSize));
  const startIndex = currentPage * pageSize;
  const paginatedHistory = extendedHistory.slice(startIndex, startIndex + pageSize);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Page Title */}
      <div className="text-center">
        <h2 className="text-xl font-bold tracking-tight text-[#e60073] flex items-center justify-center gap-2">
          <PieChart className="w-5 h-5 text-[#e60073]" />
          SERVER STATUS & ANALYTICS
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time algorithmic performance tracking
        </p>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="bg-white/92 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/80 shadow-xl shadow-black/20">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#ff66a3] mb-3 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-[#e60073]" />
          System Telemetry
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Current Streak */}
          <div className="bg-[#fff5fa] p-3.5 rounded-2xl border border-pink-200/80 text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-tr from-[#ff66a3] to-[#e60073] flex items-center justify-center text-white mb-2 shadow-sm shadow-pink-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff66a3]">
              Current Streak
            </div>
            <div className="text-2xl font-bold text-[#e60073] font-mono mt-0.5">
              {stats.streaks.current}
            </div>
          </div>

          {/* Best Streak */}
          <div className="bg-[#fff5fa] p-3.5 rounded-2xl border border-pink-200/80 text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-tr from-[#ff66a3] to-[#e60073] flex items-center justify-center text-white mb-2 shadow-sm shadow-pink-500/30">
              <Crown className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff66a3]">
              Best Streak
            </div>
            <div className="text-2xl font-bold text-[#e60073] font-mono mt-0.5">
              {stats.streaks.best}
            </div>
          </div>

          {/* Win Rate */}
          <div className="bg-[#fff5fa] p-3.5 rounded-2xl border border-pink-200/80 text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-tr from-[#ff66a3] to-[#e60073] flex items-center justify-center text-white mb-2 shadow-sm shadow-pink-500/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff66a3]">
              Win Rate
            </div>
            <div className="text-2xl font-bold text-[#e60073] font-mono mt-0.5">
              {accuracy}%
            </div>
          </div>

          {/* Total Predictions */}
          <div className="bg-[#fff5fa] p-3.5 rounded-2xl border border-pink-200/80 text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-tr from-[#ff66a3] to-[#e60073] flex items-center justify-center text-white mb-2 shadow-sm shadow-pink-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff66a3]">
              Total Predictions
            </div>
            <div className="text-2xl font-bold text-[#e60073] font-mono mt-0.5">
              {totalRounds}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Box (BEST WORKING) */}
      <div className="bg-white/92 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/80 shadow-xl shadow-black/20">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#e60073] mb-3 flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-[#e60073]" />
          BEST WORKING PERFORMANCE
        </h3>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-[#fff5fa] p-3 rounded-2xl border border-pink-200 text-center">
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#ff66a3]">
              Wins
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#e60073] font-mono mt-1">
              {stats.wins}
            </div>
          </div>

          <div className="bg-[#fff5fa] p-3 rounded-2xl border border-pink-200 text-center">
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#ff66a3]">
              Losses
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#ff66a3] font-mono mt-1">
              {stats.losses}
            </div>
          </div>

          <div className="bg-[#fff5fa] p-3 rounded-2xl border border-pink-200 text-center">
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#ff66a3]">
              Accuracy
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#ff4d94] font-mono mt-1">
              {accuracy}%
            </div>
          </div>
        </div>
      </div>

      {/* Extended History Table with Pagination */}
      <div className="bg-white/92 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/80 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#e60073] flex items-center gap-1.5">
            <History className="w-4 h-4 text-[#e60073]" />
            LAST RESULTS & AUDIT LOG
          </h3>
          <span className="text-[11px] font-bold text-slate-500 font-mono">
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-pink-200">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="bg-[#ff66a3] text-white font-bold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-2 border-r border-pink-400/40">
                  <span className="inline-flex items-center gap-1 justify-center">
                    <ListOrdered className="w-3.5 h-3.5" />
                    Period
                  </span>
                </th>
                <th className="py-2.5 px-2 border-r border-pink-400/40">
                  <span className="inline-flex items-center gap-1 justify-center">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Prediction
                  </span>
                </th>
                <th className="py-2.5 px-2 border-r border-pink-400/40">
                  <span className="inline-flex items-center gap-1 justify-center">
                    <Dices className="w-3.5 h-3.5" />
                    Result
                  </span>
                </th>
                <th className="py-2.5 px-2">
                  <span className="inline-flex items-center gap-1 justify-center">
                    <Trophy className="w-3.5 h-3.5" />
                    Status
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
              {paginatedHistory.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-400 italic font-medium">
                    No extended history recorded yet.
                  </td>
                </tr>
              ) : (
                paginatedHistory.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  const oppositeText = item.oppositeNumbers?.length
                    ? `(${item.oppositeNumbers.join(',')})`
                    : '';
                  const isBig = item.prediction === 'BIG';

                  return (
                    <tr
                      key={item.id || `${item.period}-ext-${idx}`}
                      className={`transition-colors hover:bg-pink-100/60 ${
                        isEven ? 'bg-white' : 'bg-pink-50/40'
                      }`}
                    >
                      <td className="py-2.5 px-2 font-mono font-bold text-slate-700">
                        {item.period}
                      </td>
                      <td className="py-2.5 px-2 whitespace-nowrap font-bold">
                        <span className={isBig ? 'text-[#e60073]' : 'text-[#ff66a3]'}>
                          {item.prediction}{' '}
                        </span>
                        <span className="text-slate-600 font-semibold text-[11px]">
                          {oppositeText}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 font-bold font-mono">
                        {item.result !== null ? (
                          <span
                            className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-[11px] shadow-2xs font-bold ${
                              item.result >= 5 ? 'bg-[#e60073]' : 'bg-[#ff66a3]'
                            }`}
                          >
                            {item.result}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="py-2.5 px-2 font-bold whitespace-nowrap">
                        {item.status === 'WIN' || item.status === 'NUMBER WIN' ? (
                          <span className="text-[#e60073] font-extrabold text-xs uppercase tracking-wide">
                            {item.status === 'NUMBER WIN' || (item.oppositeHit && !item.predictionWin)
                              ? 'NUMBER WIN'
                              : 'WIN'}
                          </span>
                        ) : item.status === 'LOSS' ? (
                          <span className="text-[#ff66a3] font-bold text-xs uppercase tracking-wide">
                            LOSS
                          </span>
                        ) : (
                          <div className="flex items-center justify-center py-1">
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-pink-200 border-t-[#ff66a3] animate-spin" />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Buttons (Previous & Next) */}
        <div className="flex items-center justify-between pt-3">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              currentPage === 0
                ? 'bg-pink-100 text-pink-300 cursor-not-allowed'
                : 'bg-[#ff66a3] hover:bg-[#ff4d94] text-white shadow-sm shadow-pink-500/20'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-xs font-bold text-slate-600">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              currentPage >= totalPages - 1
                ? 'bg-pink-100 text-pink-300 cursor-not-allowed'
                : 'bg-[#ff66a3] hover:bg-[#ff4d94] text-white shadow-sm shadow-pink-500/20'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
