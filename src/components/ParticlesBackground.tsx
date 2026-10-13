import React, { useMemo } from 'react';
import bgGokuUltra from '../assets/images/goku_ultra_instinct_bg_1791890725217.jpg';
import bgGokuSaiyan from '../assets/images/goku_super_saiyan_bg_1791890744568.jpg';
import bgCharts from '../assets/images/trading_charts_mesh_1791890628833.jpg';
import bgRoom from '../assets/images/trader_neon_bg_1791890602311.jpg';

export type BgThemeType = 'goku-ultra' | 'goku-saiyan' | 'charts' | 'room';

interface BackgroundGraphicsProps {
  theme?: BgThemeType;
}

export const ParticlesBackground: React.FC<BackgroundGraphicsProps> = ({ theme = 'goku-ultra' }) => {
  const isGokuUltra = theme === 'goku-ultra';
  const isGokuSaiyan = theme === 'goku-saiyan';

  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const size = 6 + ((i * 17) % 28);
      const posX = (i * 13) % 98;
      const posY = (i * 19) % 98;
      const opacity = 0.25 + ((i * 7) % 45) / 100;
      const duration = 8 + ((i * 5) % 16);
      const delay = (i * 0.9) % 5;
      const isAlt = i % 3 === 0;

      let color = 'rgba(255, 102, 163, 0.45)';
      if (isGokuUltra) {
        color = isAlt ? 'rgba(0, 229, 255, 0.7)' : 'rgba(167, 139, 250, 0.6)';
      } else if (isGokuSaiyan) {
        color = isAlt ? 'rgba(255, 215, 0, 0.75)' : 'rgba(255, 140, 0, 0.6)';
      } else {
        color = isAlt ? 'rgba(255, 215, 0, 0.45)' : 'rgba(255, 102, 163, 0.45)';
      }

      return {
        id: i,
        size,
        posX,
        posY,
        opacity,
        duration,
        delay,
        color,
      };
    });
  }, [isGokuUltra, isGokuSaiyan]);

  const activeImage = useMemo(() => {
    switch (theme) {
      case 'goku-saiyan':
        return bgGokuSaiyan;
      case 'charts':
        return bgCharts;
      case 'room':
        return bgRoom;
      case 'goku-ultra':
      default:
        return bgGokuUltra;
    }
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* High-Resolution Graphic Wallpaper Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat transition-all duration-700 ease-out"
        style={{
          backgroundImage: `url(${activeImage})`,
        }}
      />

      {/* Cyberpunk / Anime Glass Tint Overlay for Contrast & Readability */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isGokuUltra
            ? 'bg-gradient-to-b from-slate-950/45 via-slate-950/25 to-slate-950/55'
            : isGokuSaiyan
            ? 'bg-gradient-to-b from-slate-950/45 via-slate-950/25 to-slate-950/55'
            : 'bg-gradient-to-b from-slate-950/65 via-slate-900/50 to-slate-950/75'
        }`}
      />

      {/* Glowing Energy Aura Ambient Blurs */}
      {isGokuUltra && (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-cyan-400/20 filter blur-[90px] animate-pulse pointer-events-none" />
          <div className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-violet-600/25 filter blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-600/25 filter blur-[100px] pointer-events-none" />
        </>
      )}

      {isGokuSaiyan && (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-amber-400/25 filter blur-[90px] animate-pulse pointer-events-none" />
          <div className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-orange-600/25 filter blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-yellow-500/20 filter blur-[100px] pointer-events-none" />
        </>
      )}

      {!isGokuUltra && !isGokuSaiyan && (
        <>
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#e60073]/25 filter blur-[100px] animate-pulse pointer-events-none" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#00e5ff]/20 filter blur-[100px] animate-pulse pointer-events-none" />
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-[#ff007f]/20 filter blur-[120px] animate-pulse pointer-events-none" />
        </>
      )}

      {/* Floating 3D Divine Energy Particles & Lightning Sparks */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.posX}%`,
            top: `${p.posY}%`,
            backgroundColor: p.color,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s infinite ease-in-out`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 12px ${p.color}`,
            filter: 'blur(0.4px)',
          }}
        />
      ))}

      {/* Subtle Scanline Overlay for High-Tech Anime HUD Feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,38,0)_50%,rgba(0,0,0,0.22)_50%)] bg-[length:100%_4px] opacity-15 pointer-events-none" />
    </div>
  );
};
