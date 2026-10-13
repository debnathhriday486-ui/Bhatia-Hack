import React, { useState } from 'react';
import { Send, Crown, ExternalLink, ShieldCheck, X, Copy, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { getTelegramLink, TELEGRAM_GROUP_LINK } from '../utils/telegramConfig';

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramModal: React.FC<TelegramModalProps> = ({ isOpen, onClose }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const telegramLink = getTelegramLink();

  if (!isOpen) return null;

  const handleCopy = () => {
    soundManager.playClick();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(telegramLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl shadow-black/50 border border-white/60 overflow-hidden text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-pink-50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Telegram Icon */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#0088cc] to-[#34b7f1] flex items-center justify-center text-white shadow-lg shadow-sky-500/30 mb-3 animate-pulse">
          <Send className="w-7 h-7 -translate-x-0.5 translate-y-0.5" />
        </div>

        <h3 className="text-xl font-extrabold text-[#e60073]">
          BHATIA x TRADER
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Official VIP Prediction Channel & Group
        </p>

        {/* Status card */}
        <div className="my-4 p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-sky-700">
              <Crown className="w-4 h-4 text-amber-500" />
              VIP Access Status:
            </span>
            <span className="text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              AUTHORIZED
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed">
            Join the official Telegram group for daily 100% WinGo 1M signals, secret Martingale money management, and instant key updates.
          </p>

          {/* Current link display & Copy */}
          <div className="pt-2 border-t border-sky-200/50 flex items-center justify-between gap-2">
            <div className="text-[11px] font-mono text-sky-800 truncate bg-white/80 px-2 py-1 rounded-lg border border-sky-200 flex-1 text-left select-all">
              {telegramLink}
            </div>
            <button
              onClick={handleCopy}
              title="Copy Telegram Link"
              className="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 transition-colors flex items-center gap-1 text-[10px] font-bold shrink-0 cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {/* Primary Action Button: Opens actual Telegram Link */}
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#0088cc] to-[#25a5e3] hover:from-[#25a5e3] hover:to-[#0088cc] text-white shadow-md shadow-sky-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Join Telegram Group
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Back Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider border border-pink-200 text-slate-600 hover:bg-pink-50 transition-colors cursor-pointer"
          >
            Back to Signals
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-pink-100 text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          Verified Official Bhatia Trader Community
        </div>
      </div>
    </div>
  );
};
