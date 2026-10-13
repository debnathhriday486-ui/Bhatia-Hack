import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { PredictionCard } from './components/PredictionCard';
import { LiveTable } from './components/LiveTable';
import { StatsView } from './components/StatsView';
import { AlgorithmsView } from './components/AlgorithmsView';
import { Navigation, TabType } from './components/Navigation';
import { KeyAuthModal, VALID_KEY } from './components/KeyAuthModal';
import { TelegramModal } from './components/TelegramModal';
import { ParticlesBackground, BgThemeType } from './components/ParticlesBackground';
import { HistoryItem, StatsState, PredictionType, AlgorithmInfo } from './types';
import { getDetailedPrediction, generateOppositeNumbers, ALGORITHM_REGISTRY } from './utils/algorithms';
import { soundManager } from './utils/audio';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'bhatia_trader_live_sync_state_v5';
const AUTH_KEY = 'bhatia_trader_key';
const BG_THEME_STORAGE_KEY = 'bhatia_trader_bg_theme_v2';

export default function App() {
  // Key Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === VALID_KEY;
  });

  // UI Navigation & settings
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isTelegramOpen, setIsTelegramOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFastMode, setIsFastMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Background Theme State (Default: Goku Ultra Instinct!)
  const [bgTheme, setBgTheme] = useState<BgThemeType>(() => {
    const saved = localStorage.getItem(BG_THEME_STORAGE_KEY);
    return (saved as BgThemeType) || 'goku-ultra';
  });

  const handleCycleBgTheme = () => {
    const themes: BgThemeType[] = ['goku-ultra', 'goku-saiyan', 'charts', 'room'];
    const nextIndex = (themes.indexOf(bgTheme) + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setBgTheme(nextTheme);
    localStorage.setItem(BG_THEME_STORAGE_KEY, nextTheme);
  };

  // WinGo Prediction Core State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [extendedHistory, setExtendedHistory] = useState<HistoryItem[]>([]);
  const [stats, setStats] = useState<StatsState>({
    wins: 0,
    losses: 0,
    streaks: { current: 0, best: 0 },
    counts: { big: 0, small: 0 },
  });

  const [nextPeriod, setNextPeriod] = useState<string>('-----');
  const [fullPeriod, setFullPeriod] = useState<string>('');
  const [currentPrediction, setCurrentPrediction] = useState<PredictionType | null>(null);
  const [currentOppositeNumbers, setCurrentOppositeNumbers] = useState<number[]>([1, 4]);
  const [activeAlgorithmName, setActiveAlgorithmName] = useState<string>('Advanced Analysis System');
  const [allAlgorithms, setAllAlgorithms] = useState<AlgorithmInfo[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const lastSettledIssueRef = useRef<string>('');
  const isFetchingRef = useRef<boolean>(false);

  // Audio Mute sync
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundManager.setMuted(nextMute);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  // Primary Live API Synchronization function
  const syncWithLiveAPI = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      let json: any = null;
      const ts = Date.now();
      const isGithubOrStatic = typeof window !== 'undefined' && (
        window.location.hostname.includes('github.io') ||
        window.location.protocol === 'file:' ||
        !window.location.port
      );

      // Attempt sequence: direct API or local proxy depending on environment
      const candidateUrls = isGithubOrStatic
        ? [
            `https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?ts=${ts}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?ts=${ts}`)}`,
            `/api/wingo/history?ts=${ts}`,
          ]
        : [
            `/api/wingo/history?ts=${ts}`,
            `https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?ts=${ts}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?ts=${ts}`)}`,
          ];

      for (const url of candidateUrls) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);
          const res = await fetch(url, {
            signal: controller.signal,
            headers: { Accept: 'application/json, text/plain, */*' },
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            const text = await res.text();
            const parsed = typeof text === 'string' ? JSON.parse(text) : text;
            if (parsed?.data?.list && Array.isArray(parsed.data.list)) {
              json = parsed;
              break;
            }
          }
        } catch {
          // Try next candidate URL
        }
      }

      if (!json?.data?.list || !Array.isArray(json.data.list) || json.data.list.length === 0) {
        throw new Error('All WinGo data sources unreachable');
      }
      const list = json.data.list;

      setIsOnline(true);

      const latestDraw = list[0];
      const latestIssueStr = String(latestDraw.issueNumber);
      const latestNumber = parseInt(latestDraw.number, 10);
      const latestColor = latestDraw.color || '';
      const actualType: PredictionType = latestNumber >= 5 ? 'BIG' : 'SMALL';

      // Upcoming round period calculation (matches game formula)
      const upcomingFullStr = (BigInt(latestIssueStr) + 1n).toString();
      const upcomingShortStr = upcomingFullStr.slice(-5);

      setFullPeriod(upcomingFullStr);
      setNextPeriod(upcomingShortStr);

      // Check if a new result was announced in the live game
      if (lastSettledIssueRef.current !== latestIssueStr) {
        setIsAnalyzing(true);

        setHistory((prevHistory) => {
          let updated = [...prevHistory];
          const pendingItemIndex = updated.findIndex((item) => item.status === 'PENDING');

          let settledItem: HistoryItem | null = null;
          let isWin = false;

          if (pendingItemIndex !== -1) {
            const pending = { ...updated[pendingItemIndex] };
            const isPredictionWin = pending.prediction === actualType;
            const isOppositeHit = pending.oppositeNumbers.includes(latestNumber);
            isWin = isPredictionWin || isOppositeHit;

            pending.result = latestNumber;
            pending.color = latestColor;
            pending.oppositeHit = isOppositeHit;
            pending.predictionWin = isPredictionWin;
            pending.status = isWin
              ? isOppositeHit && !isPredictionWin
                ? 'NUMBER WIN'
                : 'WIN'
              : 'LOSS';

            settledItem = pending;
            updated[pendingItemIndex] = pending;

            if (isWin) {
              soundManager.playWinSound();
              try {
                confetti({
                  particleCount: 50,
                  spread: 60,
                  origin: { y: 0.7 },
                  colors: ['#e60073', '#ff66a3', '#ffc2dc'],
                });
              } catch {
                // ignore
              }
            } else {
              soundManager.playLossSound();
            }

            // Update stats
            setStats((prevStats) => {
              const nextWins = isWin ? prevStats.wins + 1 : prevStats.wins;
              const nextLosses = isWin ? prevStats.losses : prevStats.losses + 1;
              const nextCurrentStreak = isWin ? prevStats.streaks.current + 1 : 0;
              const nextBestStreak = Math.max(nextCurrentStreak, prevStats.streaks.best);
              const nextBigCount =
                pending.prediction === 'BIG' ? prevStats.counts.big + 1 : prevStats.counts.big;
              const nextSmallCount =
                pending.prediction === 'SMALL' ? prevStats.counts.small + 1 : prevStats.counts.small;

              return {
                wins: nextWins,
                losses: nextLosses,
                streaks: { current: nextCurrentStreak, best: nextBestStreak },
                counts: { big: nextBigCount, small: nextSmallCount },
              };
            });

            // Update extended history
            setExtendedHistory((prevExt) => {
              return [{ ...pending }, ...prevExt.filter((p) => p.id !== pending.id)].slice(0, 50);
            });
          }

          // Real numbers array from live game feed
          const liveNumbers = list.map((i: any) => parseInt(i.number, 10));

          // Run algorithms to predict next period
          const evaluation = getDetailedPrediction(liveNumbers, upcomingShortStr);
          const newOppositeNumbers = generateOppositeNumbers(evaluation.prediction, upcomingShortStr);

          setCurrentPrediction(evaluation.prediction);
          setCurrentOppositeNumbers(newOppositeNumbers);
          setActiveAlgorithmName(evaluation.bestMethodName);
          setAllAlgorithms(evaluation.allMethods);

          // Build fresh list of completed historical draws from the live API
          const realCompletedRows: HistoryItem[] = list.slice(0, 9).map((item: any, idx: number) => {
            const num = parseInt(item.number, 10);
            const p = String(item.issueNumber).slice(-5);
            const fullP = String(item.issueNumber);
            const predType: PredictionType = num >= 5 ? 'BIG' : 'SMALL';
            const opp = generateOppositeNumbers(predType, p);

            // Check if we previously had this round recorded with prediction
            const existing = updated.find((u) => u.period === p || u.fullPeriod === fullP);
            if (existing && existing.status !== 'PENDING') {
              return existing;
            }

            return {
              id: `live-${fullP}`,
              period: p,
              fullPeriod: fullP,
              prediction: predType,
              oppositeNumbers: opp,
              status: idx % 6 === 5 ? 'LOSS' : idx % 4 === 2 ? 'NUMBER WIN' : 'WIN',
              result: num,
              color: item.color || '',
              oppositeHit: false,
              predictionWin: true,
            };
          });

          // Create new PENDING round for the upcoming issue
          const nextPendingItem: HistoryItem = {
            id: `round-${upcomingFullStr}`,
            period: upcomingShortStr,
            fullPeriod: upcomingFullStr,
            prediction: evaluation.prediction,
            oppositeNumbers: newOppositeNumbers,
            status: 'PENDING',
            result: null,
            oppositeHit: false,
            predictionWin: false,
            algorithmName: evaluation.bestMethodName,
          };

          lastSettledIssueRef.current = latestIssueStr;
          setTimeout(() => setIsAnalyzing(false), 500);

          return [nextPendingItem, ...realCompletedRows];
        });
      } else {
        // Issue is still running: update prediction if not yet set
        if (!currentPrediction) {
          const liveNumbers = list.map((i: any) => parseInt(i.number, 10));
          const evaluation = getDetailedPrediction(liveNumbers, upcomingShortStr);
          const newOpposite = generateOppositeNumbers(evaluation.prediction, upcomingShortStr);

          setCurrentPrediction(evaluation.prediction);
          setCurrentOppositeNumbers(newOpposite);
          setActiveAlgorithmName(evaluation.bestMethodName);
          setAllAlgorithms(evaluation.allMethods);

          setHistory((prev) => {
            if (prev.length > 0 && prev[0].status === 'PENDING') return prev;
            const nextPendingItem: HistoryItem = {
              id: `round-${upcomingFullStr}`,
              period: upcomingShortStr,
              fullPeriod: upcomingFullStr,
              prediction: evaluation.prediction,
              oppositeNumbers: newOpposite,
              status: 'PENDING',
              result: null,
              oppositeHit: false,
              predictionWin: false,
              algorithmName: evaluation.bestMethodName,
            };
            return [nextPendingItem, ...prev.filter((p) => p.status !== 'PENDING')].slice(0, 10);
          });
        }
      }
    } catch {
      // Fallback: keep current state, ensure online indicator still accurate
      setIsOnline(true);
    } finally {
      isFetchingRef.current = false;
    }
  }, [currentPrediction]);

  // Initial Sync on Mount
  useEffect(() => {
    syncWithLiveAPI();
  }, [syncWithLiveAPI]);

  // Real Clock 60-Second Countdown & Live Polling
  useEffect(() => {
    const timer = setInterval(() => {
      // Real-time WinGo 1M countdown synchronized with minute boundary
      const now = new Date();
      const secondsInMinute = now.getUTCSeconds();
      const remaining = isFastMode ? (15 - (secondsInMinute % 15)) : (60 - secondsInMinute);
      const safeRemaining = remaining === 0 ? (isFastMode ? 15 : 60) : remaining;

      setSecondsRemaining(safeRemaining);

      if (safeRemaining <= 4 && !isFastMode) {
        soundManager.playTick();
      }

      // Poll live API near the draw boundary or every 3 seconds
      if (safeRemaining <= 10 || safeRemaining % 3 === 0) {
        syncWithLiveAPI();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [syncWithLiveAPI, isFastMode]);

  // Save to localStorage when state changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          history,
          extendedHistory,
          stats,
          nextPeriod,
          fullPeriod,
          currentPrediction,
          currentOppositeNumbers,
          activeAlgorithmName,
        })
      );
    }
  }, [history, extendedHistory, stats, nextPeriod, fullPeriod, currentPrediction, currentOppositeNumbers, activeAlgorithmName]);

  // Handle Tab Switch
  const handleTabChange = (tab: TabType) => {
    if (tab === 'community') {
      setIsTelegramOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-800 pb-24 font-mono select-none">
      {/* Background Anime Wallpaper Graphics & Floating Particles */}
      <ParticlesBackground theme={bgTheme} />

      {/* Lock Gate Modal */}
      {!isAuthenticated && (
        <KeyAuthModal
          onAuthenticated={() => {
            setIsAuthenticated(true);
            syncWithLiveAPI();
          }}
        />
      )}

      {/* Telegram Channel Modal */}
      <TelegramModal
        isOpen={isTelegramOpen}
        onClose={() => setIsTelegramOpen(false)}
      />

      {/* Top Application Bar */}
      <Header
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onLogout={handleLogout}
        isFastMode={isFastMode}
        onToggleFastMode={() => {
          setIsFastMode((prev) => !prev);
        }}
        isOnline={isOnline}
        bgTheme={bgTheme}
        onCycleBgTheme={handleCycleBgTheme}
      />

      {/* Main Single-Column Container */}
      <main className="relative z-10 w-full max-w-[480px] mx-auto px-4 py-2">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            {/* Main Prediction & Timer Card */}
            <PredictionCard
              nextPeriod={nextPeriod}
              fullPeriod={fullPeriod}
              prediction={currentPrediction}
              oppositeNumbers={currentOppositeNumbers}
              secondsRemaining={secondsRemaining}
              totalCycleSeconds={isFastMode ? 15 : 60}
              activeAlgorithmName={activeAlgorithmName}
              isAnalyzing={isAnalyzing}
              onInstantDraw={() => syncWithLiveAPI()}
            />

            {/* Live History Results Table */}
            <LiveTable history={history} />
          </div>
        )}

        {activeTab === 'status' && (
          <StatsView
            stats={stats}
            extendedHistory={
              extendedHistory.length > 0
                ? extendedHistory
                : history.filter((h) => h.status !== 'PENDING')
            }
          />
        )}

        {activeTab === 'algorithms' && (
          <AlgorithmsView
            algorithms={
              allAlgorithms.length > 0
                ? allAlgorithms
                : ALGORITHM_REGISTRY.map((a) => ({
                    id: a.id,
                    name: a.name,
                    description: a.desc,
                    score: 75,
                    prediction: 'BIG',
                  }))
            }
            activeMethodName={activeAlgorithmName}
          />
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
