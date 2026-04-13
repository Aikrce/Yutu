// 图片错误处理组件 - 加载失败时显示占位图
import { useState } from 'react';
import { cn } from '../../utils/cn';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  fallbackIcon?: React.ReactNode;
}

export function ImageWithFallback({
  fallback,
  fallbackIcon,
  className,
  alt,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    if (fallback) {
      return <img src={fallback} alt={alt} className={className} {...props} />;
    }
    return (
      <div
        className={cn('flex items-center justify-center bg-gray-100 text-gray-400', className)}
        role="img"
        aria-label={alt}
      >
        {fallbackIcon || (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        )}
      </div>
    );
  }

  return (
    <img
      className={className}
      alt={alt}
      onError={(e) => {
        setHasError(true);
        onError?.(e);
      }}
      {...props}
    />
  );
}
