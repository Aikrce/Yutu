import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onlineStatus?: 'online' | 'offline' | 'busy' | 'away';
  badge?: string | number | null;
  bgColor?: string;
  className?: string;
  onClick?: () => void;
}

const SIZE_MAP = {
  xs: { container: 24, ring: 2, badge: 10, status: 6 },
  sm: { container: 32, ring: 2, badge: 12, status: 8 },
  md: { container: 48, ring: 3, badge: 14, status: 10 },
  lg: { container: 64, ring: 3, badge: 16, status: 12 },
  xl: { container: 80, ring: 4, badge: 20, status: 14 },
};

function getStableHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

// 默认头像图案背景（6种风格）
function generatePatternStyle(hue: number, patternIndex: number): React.CSSProperties {
  const patterns: React.CSSProperties[] = [
    // 格子+云朵
    {
      background: `
        linear-gradient(45deg, hsl(${hue}, 60%, 90%) 25%, transparent 25%),
        linear-gradient(-45deg, hsl(${hue}, 60%, 90%) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, hsl(${hue}, 60%, 90%) 75%),
        linear-gradient(-45deg, transparent 75%, hsl(${hue}, 60%, 90%) 75%)
      `,
      backgroundSize: '40% 40%',
      backgroundPosition: '0 0, 0 50%, 50% -50%, -50% 0px',
      backgroundColor: `hsl(${hue}, 50%, 95%)`,
    },
    // 波点
    {
      background: `radial-gradient(circle, hsl(${hue}, 70%, 80%) 20%, transparent 20%)`,
      backgroundSize: '30% 30%',
      backgroundColor: `hsl(${hue}, 40%, 94%)`,
    },
    // 条纹
    {
      background: `repeating-linear-gradient(45deg, hsl(${hue}, 50%, 93%), hsl(${hue}, 50%, 93%) 4px, hsl(${hue}, 60%, 88%) 4px, hsl(${hue}, 60%, 88%) 8px)`,
    },
    // 渐变云雾
    {
      background: `
        radial-gradient(ellipse at 30% 50%, hsl(${hue}, 60%, 88%) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 30%, hsl(${(hue + 30) % 360}, 50%, 90%) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 80%, hsl(${(hue + 60) % 360}, 55%, 85%) 0%, transparent 45%)
      `,
      backgroundColor: `hsl(${hue}, 40%, 95%)`,
    },
    // 同心圆
    {
      background: `
        radial-gradient(circle at center, transparent 30%, hsl(${hue}, 50%, 90%) 31%, hsl(${hue}, 50%, 90%) 33%, transparent 34%),
        radial-gradient(circle at center, transparent 55%, hsl(${hue}, 50%, 88%) 56%, hsl(${hue}, 50%, 88%) 58%, transparent 59%)
      `,
      backgroundColor: `hsl(${hue}, 40%, 95%)`,
    },
    // 星空+云
    {
      background: `
        radial-gradient(1px 1px at 20% 30%, hsl(${hue}, 60%, 80%) 0%, transparent 100%),
        radial-gradient(1px 1px at 40% 70%, hsl(${(hue + 40) % 360}, 50%, 85%) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 60% 20%, hsl(${hue}, 70%, 75%) 0%, transparent 100%),
        radial-gradient(1px 1px at 80% 50%, hsl(${(hue + 20) % 360}, 55%, 82%) 0%, transparent 100%)
      `,
      backgroundColor: `hsl(${hue}, 35%, 94%)`,
    },
  ];
  return patterns[patternIndex % patterns.length];
}

function getBlockColor(hue: number): string {
  return `hsl(${hue}, 55%, 70%)`;
}

function getUploadedBgColor(hue: number): string {
  return `hsl(${hue}, 25%, 92%)`;
}

const STATUS_COLORS = {
  online: '#10B981',
  offline: '#94A3B8',
  busy: '#EF4444',
  away: '#F59E0B',
};

// 云朵小图标SVG（用于默认头像中心的云朵剪影）
function CloudIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 80" fill={color}>
      <path d="M80 65H25C12 65 2 55 2 42C2 31 9 22 19 19C19 18.5 19 18 19 17.5C19 8 27 0 37 0C42 0 46.5 2 49.5 5.5C53 2.5 57.5 0.5 62.5 0.5C73.5 0.5 82.5 9 82.5 19.5C82.5 20 82.5 20.5 82.5 21C91 23 98 31 98 41C98 54 90 65 80 65Z" />
    </svg>
  );
}

// 右上角装饰元素（全部用云朵变体）
const DECORATIONS: ((color: string, s: number) => React.ReactNode)[] = [
  // 小云朵
  (c, s) => <CloudIcon size={s} color={c} />,
  // 双层云
  (c, s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill={c}>
      <path d="M65 55H20C10 55 2 47 2 37C2 28 8 21 16 19C16 18.5 16 18 16 17.5C16 9 23 2 32 2C36 2 39.5 3.5 42 6C45 3.5 48.5 2 52.5 2C61 2 68 8.5 68 17C68 17.5 68 18 68 18.5C74.5 20 80 27 80 35C80 46 73.5 55 65 55Z" opacity="0.7"/>
      <path d="M50 75H15C8 75 3 69 3 62C3 55.5 7 50 13 48.5C13 48 13 47.5 13 47C13 40 19 34 27 34C30 34 32.5 35 34.5 37C37 35 40 33.5 43 33.5C50 33.5 55.5 38.5 55.5 45C55.5 45.5 55.5 46 55.5 46.5C60.5 48 65 53 65 59C65 67.5 58.5 75 50 75Z" x="30" y="10"/>
    </svg>
  ),
  // 云朵+小星
  (c, s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill={c}>
      <path d="M70 60H22C11 60 3 52 3 42C3 32 9 24 18 22C18 21 18 20 18 19C18 8.5 26 0 36 0C41 0 45 2 48 5.5C51.5 2.5 56 0.5 61 0.5C72 0.5 81 9 81 20C81 20.5 81 21 81 21.5C89.5 23.5 96 31 96 40C96 51.5 87 60 70 60Z"/>
      <circle cx="85" cy="20" r="5" opacity="0.6"/>
      <circle cx="92" cy="12" r="3" opacity="0.4"/>
    </svg>
  ),
  // 云朵+爱心
  (c, s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill={c}>
      <path d="M65 55H20C10 55 2 47 2 37C2 28 8 21 16 19C16 18.5 16 18 16 17.5C16 9 23 2 32 2C36 2 39.5 3.5 42 6C45 3.5 48.5 2 52.5 2C61 2 68 8.5 68 17C68 17.5 68 18 68 18.5C74.5 20 80 27 80 35C80 46 73.5 55 65 55Z"/>
      <path d="M85 25C85 22 82 18 78 18C74 18 72 21 72 21C72 21 70 18 66 18C62 18 59 22 59 25C59 32 72 38 72 38C72 38 85 32 85 25Z" opacity="0.5"/>
    </svg>
  ),
];

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = '',
  size = 'md',
  onlineStatus,
  badge,
  bgColor,
  className,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const dims = SIZE_MAP[size];
  const hue = getStableHue(name || '云旅友途');
  const patternIndex = hue % 6;
  const hasImage = src && !imageError;
  const uploadedBg = bgColor || getUploadedBgColor(hue);
  const decorIndex = hue % DECORATIONS.length;
  const decorColor = `hsl(${hue}, 50%, 75%)`;

  const containerStyle: React.CSSProperties = { width: dims.container, height: dims.container };

  return (
    <div
      className={cn('relative inline-flex shrink-0 cursor-pointer', className)}
      style={containerStyle}
      onClick={onClick}
    >
      {/* 默认头像：图案背景 + 云朵剪影主体 */}
      {!hasImage && (
        <div
          className="w-full h-full rounded-full overflow-hidden relative"
          style={generatePatternStyle(hue, patternIndex)}
        >
          {/* 主体：云朵剪影（替代文字+人形剪影） */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* 头部云朵 */}
            <CloudIcon
              size={dims.container * 0.5}
              color={getBlockColor(hue)}
            />
            {/* 肩膀弧形 */}
            <div
              className="rounded-t-full -mt-1"
              style={{
                width: dims.container * 0.7,
                height: dims.container * 0.22,
                backgroundColor: getBlockColor(hue),
              }}
            />
          </div>
          {/* 右上角装饰云朵 */}
          <div className="absolute top-0 right-0" style={{ width: dims.container * 0.35, height: dims.container * 0.35 }}>
            {DECORATIONS[decorIndex](decorColor, dims.container * 0.35)}
          </div>
        </div>
      )}

      {/* 上传后头像：纯色背景 + 人物头像 */}
      {hasImage && (
        <div
          className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: uploadedBg }}
        >
          <img
            src={src}
            alt={name}
            className="object-cover rounded-full"
            style={{ width: dims.container * 0.85, height: dims.container * 0.85, objectFit: 'cover' }}
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* 在线状态 */}
      {onlineStatus && (
        <div
          className="absolute border-2 border-white rounded-full"
          style={{
            width: dims.status, height: dims.status,
            backgroundColor: STATUS_COLORS[onlineStatus],
            bottom: size === 'xs' ? -1 : 0,
            right: size === 'xs' ? -1 : 0,
          }}
        />
      )}

      {/* 徽章 */}
      {badge !== null && badge !== undefined && (
        <div
          className="absolute flex items-center justify-center rounded-full bg-accent text-white font-bold border-2 border-white"
          style={{
            width: dims.badge, height: dims.badge,
            fontSize: Math.max(dims.badge * 0.5, 8),
            top: -2, right: -2,
          }}
        >
          {typeof badge === 'number' && badge >= 100 ? '99+' : badge}
        </div>
      )}
    </div>
  );
};

export default Avatar;
