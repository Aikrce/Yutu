import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

// 通用二级页面顶部导航
export function SubNavBar({ title, right }: { title: React.ReactNode; right?: React.ReactNode }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const backTo = searchParams.get('back') || '/';

  const handleBack = () => {
    navigate(backTo, { replace: true });
  };

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-divider flex items-center h-11 px-3"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 0px)' }}>
      <button onClick={handleBack} className="touch-feedback p-2 -ml-1 flex items-center gap-0.5 text-text-primary">
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>
      <span className="flex-1 text-center text-[17px] font-semibold text-text-primary">{title}</span>
      <div className="w-8">{right}</div>
    </div>
  );
}

// 读取路由参数的工具
export function useIdParam(): number {
  const { id } = useParams();
  return Number(id) || 0;
}

// 页面滑入动画包裹
export function SlideInPage({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="fixed inset-0 z-[60] bg-background animate-slide-in" style={{ maxWidth: '430px', margin: '0 auto', ...style }}>
      {children}
    </div>
  );
}
