import React, { useState } from 'react';
import { Crown, KeyRound, ShieldCheck, ArrowRight, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Send, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import { getTelegramLink } from '../utils/telegramConfig';

interface KeyAuthModalProps {
  onAuthenticated: () => void;
}

export const VALID_KEY = 'Shivam1212';

export const KeyAuthModal: React.FC<KeyAuthModalProps> = ({ onAuthenticated }) => {
  const [inputKey, setInputKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setIsVerifying(true);

    soundManager.playClick();

    setTimeout(() => {
      const cleanInput = inputKey.trim();
      if (cleanInput === VALID_KEY) {
        setSuccess(true);
        soundManager.playUnlockSound();
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#e60073', '#ff66a3', '#ffc2dc', '#10b981'],
          });
        } catch {
          // ignore
        }
        localStorage.setItem('bhatia_trader_key', cleanInput);
        setTimeout(() => {
          onAuthenticated();
        }, 800);
      } else {
        setIsVerifying(false);
        setError('Invalid Access Key! Please enter authorized VIP key.');
        soundManager.playLossSound();
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl shadow-black/50 border border-white/60 overflow-hidden transform transition-all p-6 sm:p-8">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#ff66a3] via-[#e60073] to-[#ff4d94]" />

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff66a3] to-[#e60073] text-white shadow-lg shadow-pink-500/30 mb-3 animate-bounce-short">
            <Crown className="w-9 h-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#e60073] to-[#ff4d94]">
            BHATIA x TRADER
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#ff66a3] font-semibold mt-1 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            VIP WinGo 1M AI Predictor V3
          </p>
        </div>

        {/* Security Info Card */}
        <div className="bg-pink-50/70 rounded-2xl p-4 border border-pink-100/80 mb-6 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-pink-100 text-[#e60073] mt-0.5">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Protected Access
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Enter your authorized access pass to activate the real-time AI signal algorithm & live WinGo analysis engine.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Access Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setError(null);
                }}
                placeholder="Enter access key..."
                className={`w-full pl-11 pr-12 py-3.5 rounded-xl border ${
                  error ? 'border-red-400 bg-red-50/40 text-red-900' : 'border-pink-200 bg-slate-50/70 focus:bg-white text-slate-800'
                } focus:outline-none focus:ring-2 focus:ring-[#e60073] text-sm font-mono tracking-wider transition-all`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title={showPassword ? 'Hide Key' : 'Show Key'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <div className="mt-2 text-xs font-medium text-red-600 flex items-center gap-1.5 animate-shake">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying || success || !inputKey.trim()}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg mt-2 ${
              success
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : !inputKey.trim()
                ? 'bg-pink-200 text-pink-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-[#ff66a3] via-[#e60073] to-[#ff4d94] hover:from-[#ff4d94] hover:to-[#e60073] text-white shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
            }`}
          >
            {success ? (
              <>
                <CheckCircle2 className="w-5 h-5 animate-scale" />
                Access Granted!
              </>
            ) : isVerifying ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Verifying Key...
              </div>
            ) : (
              <>
                Unlock BHATIA x TRADER
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Telegram VIP Channel Call-to-action */}
        <div className="mt-4 pt-3 border-t border-pink-100 space-y-2">
          <p className="text-[11px] text-slate-500 font-medium text-center">
            Don't have the VIP Passkey yet?
          </p>
          <a
            href={getTelegramLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[#0088cc] to-[#25a5e3] hover:from-[#25a5e3] hover:to-[#0088cc] text-white shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5" />
            Get VIP Key on Telegram Group
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Footer Info */}
        <div className="mt-4 pt-3 border-t border-pink-100 text-center">
          <p className="text-[11px] text-slate-500 font-medium">
            Official System License • Version 3.0 PRO
          </p>
        </div>
      </div>
    </div>
  );
};
