import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  variant?: 'rect' | 'circle' | 'text' | 'card' | 'avatar';
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
}) => {
  const variants = {
    rect: 'rounded-md',
    circle: 'rounded-full',
    text: 'rounded-sm h-4',
    card: 'rounded-md',
    avatar: 'rounded-full',
  };

  const defaultSizes = {
    rect: { width: '100%', height: 120 },
    circle: { width: 48, height: 48 },
    text: { width: '100%', height: 16 },
    card: { width: '100%', height: 200 },
    avatar: { width: 40, height: 40 },
  };

  const size = defaultSizes[variant];

  return (
    <div
      className={cn('skeleton', variants[variant], className)}
      style={{
        width: width || size.width,
        height: height || size.height,
      }}
    />
  );
};

// 瀑布流卡片骨架屏
export const WaterfallSkeleton: React.FC = () => {
  return (
    <div className="bg-card rounded-md p-2">
      <Skeleton variant="rect" height={140} className="rounded-sm" />
      <div className="mt-2 space-y-2">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" height={12} />
        <div className="flex items-center gap-2 mt-2">
          <Skeleton variant="circle" width={20} height={20} />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
      </div>
    </div>
  );
};
