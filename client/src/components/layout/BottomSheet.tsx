import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  title,
  children,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      // 使用 requestAnimationFrame 延迟 setState，避免 effect 内同步调用
      requestAnimationFrame(() => {
        setVisible(true);
        requestAnimationFrame(() => setAnimating(true));
      });
      document.body.style.overflow = 'hidden';
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 关闭动画由 open prop 驱动
      setAnimating(false);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = '';
      }, 400);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* 遮罩 */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 transition-slow',
          animating ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* 抽屉内容 */}
      <div
        ref={sheetRef}
        className={cn(
          'absolute bottom-0 left-0 right-0 max-w-[430px] mx-auto',
          'bg-white rounded-t-lg shadow-modal',
          'transition-slow transform',
          animating ? 'translate-y-0' : 'translate-y-full',
          className
        )}
      >
        {/* 拖拽手柄 */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* 标题 */}
        {title && (
          <div className="px-4 pb-3 text-h3 font-semibold text-text-primary">
            {title}
          </div>
        )}

        {/* 内容区 */}
        <div className="px-4 pb-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
          {children}
        </div>

        {/* 安全区域 */}
        <div style={{ height: 'var(--safe-bottom)' }} />
      </div>
    </div>
  );
};
