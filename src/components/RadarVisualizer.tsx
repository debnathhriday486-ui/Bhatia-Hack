import React, { useEffect, useState } from 'react';

export const RadarVisualizer: React.FC<{ isAnalyzing?: boolean }> = ({ isAnalyzing = false }) => {
  const [lottieLoaded, setLottieLoaded] = useState(false);

  useEffect(() => {
    // Attempt to load dotlottie web component if not already in document
    if (!document.querySelector('script[src*="dotlottie-wc"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js';
      script.type = 'module';
      script.onload = () => setLottieLoaded(true);
      script.onerror = () => setLottieLoaded(false);
      document.head.appendChild(script);
    } else {
      setLottieLoaded(true);
    }
  }, []);

  return (
    <div className="flex items-center justify-center my-2 h-[170px] relative overflow-hidden">
      {lottieLoaded ? (
        // Render custom element safely via innerHTML or wrapper
        <div
          className="w-[170px] h-[170px] flex items-center justify-center"
          dangerouslySetInnerHTML={{
            __html: `<dotlottie-wc src="https://lottie.host/bdf9ec0a-bd30-4fcb-891d-89074bd3ce84/y2xSCgdC8k.lottie" style="width: 170px;height: 170px;" autoplay loop></dotlottie-wc>`,
          }}
        />
      ) : (
        // High-fidelity fallback quantum radar core
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Outer Pulsing Wave Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-pink-300/40 animate-ping opacity-30" />
          
          {/* Secondary rotating radar orbit */}
          <div className="absolute inset-2 rounded-full border border-dashed border-pink-400/50 animate-[spin_10s_linear_infinite]" />
          
          {/* Inner ring */}
          <div className="absolute inset-5 rounded-full border border-pink-300 bg-gradient-to-br from-pink-100/60 to-rose-100/40 shadow-inner flex items-center justify-center">
            {/* Spinning Radar Beam */}
            <div className="absolute inset-0 rounded-full overflow-hidden animate-[spin_3s_linear_infinite]">
              <div className="w-1/2 h-1/2 origin-bottom-right bg-gradient-to-tl from-[#e60073]/40 to-transparent" />
            </div>

            {/* Glowing Core Orb */}
            <div className={`w-14 h-14 rounded-full bg-gradient-to-tr from-[#e60073] via-[#ff66a3] to-pink-300 flex items-center justify-center shadow-lg shadow-pink-500/40 transition-transform duration-500 ${isAnalyzing ? 'scale-110' : 'scale-100 animate-pulse'}`}>
              <div className="w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#e60073]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
