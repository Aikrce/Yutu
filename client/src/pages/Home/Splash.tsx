// 开屏页
import { useEffect } from 'react';
import { SPLASH_DURATION, Z_INDEX } from '../../data/constants';

export function SplashPage({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-primary flex flex-col items-center justify-center" style={{ zIndex: Z_INDEX.splash }}>
      <div className="animate-bounce mb-6">
        <svg width="120" height="100" viewBox="0 0 300 200">
          <path d="M64 180 C20 180 0 150 0 120 C0 80 30 60 60 55 C55 25 80 0 120 0 C155 0 180 20 185 50 C195 35 215 28 235 35 C260 45 268 70 260 90 C280 85 300 100 300 125 C300 155 275 180 245 180 Z" fill="white" opacity="0.95"/>
          <circle cx="105" cy="105" r="8" fill="#1E293B"/>
          <circle cx="185" cy="105" r="8" fill="#1E293B"/>
          <circle cx="107" cy="103" r="3" fill="white"/>
          <circle cx="187" cy="103" r="3" fill="white"/>
          <ellipse cx="80" cy="125" rx="12" ry="8" fill="#FCA5A5" opacity="0.6"/>
          <ellipse cx="210" cy="125" rx="12" ry="8" fill="#FCA5A5" opacity="0.6"/>
          <path d="M120 130 Q145 155 170 130" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>
      <h1 className="text-[32px] font-bold text-white tracking-wider mb-2">云旅友途</h1>
      <p className="text-primary-100 text-[15px]">陪你玩转每一段旅途</p>
      <div className="mt-12 w-32 h-1 bg-primary-700 rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full animate-loading-bar" />
      </div>
    </div>
  );
}
