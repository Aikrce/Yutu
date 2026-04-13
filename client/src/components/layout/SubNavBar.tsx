// 通用二级页面顶部导航
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export function SubNavBar({ title, right, backUrl }: { title: React.ReactNode; right?: React.ReactNode; backUrl?: string }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fallbackBackUrl = searchParams.get('back') || '/';
  const targetBackUrl = backUrl || fallbackBackUrl;
  
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-divider flex items-center h-11 px-3"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 0px)' }}>
      <button onClick={() => navigate(targetBackUrl, { replace: true })} className="touch-feedback p-2 -ml-1 flex items-center gap-0.5 text-text-primary">
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>
      <span className="flex-1 text-center text-[17px] font-semibold text-text-primary">{title}</span>
      <div className="w-8">{right}</div>
    </div>
  );
}

// 页面滑入动画包裹
export function SlideInPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[60] bg-background animate-slide-in" style={{ maxWidth: '430px', margin: '0 auto' }}>
      {children}
    </div>
  );
}
