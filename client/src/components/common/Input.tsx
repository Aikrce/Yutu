import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  prefix,
  suffix,
  inputSize = 'md',
  className,
  ...props
}) => {
  const sizes = {
    sm: 'px-3 py-1.5 text-caption',
    md: 'px-4 py-2.5 text-body',
    lg: 'px-4 py-3 text-h3',
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-body text-text-primary font-medium mb-1.5">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex items-center gap-2 rounded-md border bg-card transition-fast',
          'focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-100',
          error ? 'border-error' : 'border-divider',
          sizes[inputSize]
        )}
      >
        {prefix && <span className="text-text-tertiary shrink-0">{prefix}</span>}
        <input
          className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-tertiary"
          {...props}
        />
        {suffix && <span className="text-text-tertiary shrink-0">{suffix}</span>}
      </div>
      {error && <p className="mt-1 text-caption text-error">{error}</p>}
    </div>
  );
};
