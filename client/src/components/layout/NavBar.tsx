import React from 'react';
import { cn } from '../../utils/cn';

interface NavBarProps {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  transparent?: boolean;
  className?: string;
  onBack?: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  title,
  left,
  right,
  transparent = false,
  className,
  onBack,
}) => {
  return (
    <div
      className={cn(
        'sticky top-0 z-50 flex items-center justify-between px-4 h-11',
        transparent
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-md border-b border-divider',
        className
      )}
      style={{ paddingTop: 'var(--safe-top)' }}
    >
      {/* 左侧 */}
      <div className="flex items-center min-w-[60px]">
        {left || (onBack && (
          <button
            onClick={onBack}
            className="touch-feedback p-1 -ml-1 text-text-primary"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>

      {/* 标题 */}
      <div className="flex-1 text-center text-h3 text-text-primary font-semibold truncate px-2">
        {title}
      </div>

      {/* 右侧 */}
      <div className="flex items-center justify-end min-w-[60px] gap-2">
        {right}
      </div>
    </div>
  );
};
