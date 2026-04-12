import React from 'react';
import { cn } from '../../utils/cn';

interface TagProps {
  children: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'accent' | 'default';
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

const TAG_COLORS = {
  primary: 'bg-primary-50 text-primary border-primary-100',
  success: 'bg-green-50 text-green-700 border-green-100',
  warning: 'bg-orange-50 text-orange-700 border-orange-100',
  error: 'bg-red-50 text-red-700 border-red-100',
  accent: 'bg-amber-50 text-amber-700 border-amber-100',
  default: 'bg-gray-50 text-text-secondary border-gray-100',
};

export const Tag: React.FC<TagProps> = ({
  children,
  color = 'default',
  closable = false,
  onClose,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-tag font-medium border',
        TAG_COLORS[color],
        className
      )}
    >
      {children}
      {closable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="ml-0.5 text-current opacity-60 hover:opacity-100 transition-fast"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
};
