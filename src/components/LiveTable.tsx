import React from 'react';
import { HistoryItem } from '../types';
import { ListOrdered, TrendingUp, Dices, Trophy, Loader2 } from 'lucide-react';

interface LiveTableProps {
  history: HistoryItem[];
}

export const LiveTable: React.FC<LiveTableProps> = ({ history }) => {
  return (
    <div className="bg-white/92 backdrop-blur-md rounded-2xl border border-white/80 shadow-2xl shadow-black/20 overflow-hidden mb-5">
      <div className="overflow-x-auto">
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
            {history.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400 italic font-medium">
                  Waiting for initial data...
                </td>
              </tr>
            ) : (
              history.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const oppositeText = item.oppositeNumbers?.length
                  ? `(${item.oppositeNumbers.join(',')})`
                  : '';
                const isBig = item.prediction === 'BIG';

                return (
                  <tr
                    key={item.id || `${item.period}-${idx}`}
                    className={`transition-colors hover:bg-pink-100/60 ${
                      isEven ? 'bg-white' : 'bg-pink-50/40'
                    }`}
                  >
                    {/* Period */}
                    <td className="py-2.5 px-2 font-mono font-bold text-slate-700">
                      {item.period}
                    </td>

                    {/* Prediction formatted as BIG (1,4) */}
                    <td className="py-2.5 px-2 whitespace-nowrap font-bold">
                      <span className={isBig ? 'text-[#e60073]' : 'text-[#ff66a3]'}>
                        {item.prediction}{' '}
                      </span>
                      <span className="text-slate-600 font-semibold text-[11px]">
                        {oppositeText}
                      </span>
                    </td>

                    {/* Result Number badge with real WinGo color scheme */}
                    <td className="py-2.5 px-2 font-bold font-mono">
                      {item.result !== null ? (
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs shadow-xs font-bold ${
                            item.result === 0
                              ? 'bg-gradient-to-r from-purple-600 to-rose-500'
                              : item.result === 5
                              ? 'bg-gradient-to-r from-purple-600 to-emerald-500'
                              : item.result % 2 === 1
                              ? 'bg-gradient-to-tr from-emerald-500 to-green-600'
                              : 'bg-gradient-to-tr from-rose-500 to-red-600'
                          }`}
                          title={`Color: ${item.color || (item.result % 2 === 1 ? 'green' : 'red')}`}
                        >
                          {item.result}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold">-</span>
                      )}
                    </td>

                    {/* Status: WIN / NUMBER WIN / LOSS / Pending */}
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
                          <div className="w-4 h-4 rounded-full border-2 border-pink-200 border-t-[#ff66a3] animate-spin" />
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
    </div>
  );
};
