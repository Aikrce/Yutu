// 云旅友途 - 统一云朵图标体系 v2
// 设计原则（v2修正）：
// 1. 功能符号为主，云朵为辅 —— 图标主体形状一眼可辨功能
// 2. 云朵DNA通过"圆润感 + 小云装饰"融入，而非用云朵包裹
// 3. 统一规范：1.5px线宽、圆角4px、主蓝#3B82F6、多尺寸适配
// 4. 每个图标 = 清晰功能符号 + 云朵润色（底部小云弧/云角/云形负空间）

// ==================== 颜色系统 ====================
const C = {
  primary: '#3B82F6',
  white: '#FFFFFF',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  muted: '#94A3B8',
  light: '#EFF6FF',
};

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// ==================== 一、导航/核心功能图标 ====================
// 这些图标用于页面内功能入口，必须辨识度极高

/** 搜索 - 放大镜 + 云角底座 */
export function CloudSearch({ size = 24, color, className }: IconProps) {
  const c = color || C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke={c} strokeWidth="1.5" />
      <path d="M15.5 15.5L20.5 20.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      {/* 云角装饰 - 镜片内小云弧 */}
      <path d="M7.5 10.5C7.5 9 8.5 8 10 8" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** 定位 - 地图钉 + 云底座 */
export function CloudLocation({ size = 24, color, className }: IconProps) {
  const c = color || C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke={c} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="9" r="3" stroke={c} strokeWidth="1.5" fill="none" />
      {/* 云底座 - 钉底小云弧 */}
      <path d="M8 18.5C6.5 19 5 19.5 5 20.5C5 21.88 8.13 23 12 23C15.87 23 19 21.88 19 20.5C19 19.5 17.5 19 16 18.5" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** 心形/收藏 - 心 + 云弧 */
export function CloudHeart({ size = 24, color, className }: IconProps) {
  const c = color || C.danger;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" stroke={c} strokeWidth="1.5" fill="none" />
      {/* 心内小云弧装饰 */}
      <path d="M8.5 7C9 6 10 5.5 11 6" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/** 星星/精选 - 五角星 + 云闪 */
export function CloudStar({ size = 24, color, className }: IconProps) {
  const c = color || C.warning;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      {/* 星内小云闪 */}
      <path d="M10 10.5L11 9L12 10.5" stroke={c} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    </svg>
  );
}

/** 铃铛/通知 */
export function CloudBell({ size = 24, color, className }: IconProps) {
  const c = color || C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      {/* 铃铛内小云弧 */}
      <path d="M9 8C9 6.5 10 5 12 5" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/** 消息/聊天 - 气泡 + 云朵形状融合 */
export function CloudMessage({ size = 24, color, className }: IconProps) {
  const c = color || C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* 云朵形状的聊天气泡 - 功能与云朵融合 */}
      <path d="M21 12C21 16.4183 16.9706 20 12 20C10.5 20 9.08 19.67 7.8 19.08L3 21L4.5 17.2C3.03 15.73 2 13.78 2 12C2 7.58172 6.02944 4 12 4C17.9706 4 21 7.58172 21 12Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <circle cx="8" cy="12" r="1" fill={c} />
      <circle cx="12" cy="12" r="1" fill={c} />
      <circle cx="16" cy="12" r="1" fill={c} />
    </svg>
  );
}

/** 搭子/双人 - 两人 + 云弧连接 */
export function CloudBuddy({ size = 24, color, className }: IconProps) {
  const c = color || C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="7" r="3" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M3 21V19C3 16.79 4.79 15 7 15H11C13.21 15 15 16.79 15 19V21" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* 第二人（稍小偏后） */}
      <circle cx="17" cy="7" r="2.5" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M17 15C19.21 15 21 16.79 21 19V21" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* 云弧连接两人 */}
      <path d="M12 8C13 7.5 14 7.5 15 8" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** 确认/勾选 - 对勾 + 云弧 */
export function CloudCheck({ size = 24, color, className }: IconProps) {
  const c = color || C.success;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M8 12L11 15L16 9" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* 圈内小云弧 */}
      <path d="M5 8C5.5 6 7 5 9 5.5" stroke={c} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/** 发布/加号 - 加号 + 云圆底 */
export function CloudPublish({ size = 24, color, className }: IconProps) {
  const c = color || C.white;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 5V19M5 12H19" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ==================== 二、我的页功能图标 ====================
// 用于个人中心菜单项，带浅蓝圆形底座 + 云润色图标

/** 订单/列表 */
export function CloudOrder({ size = 24, color, className }: IconProps) {
  const c = color || C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="2" width="18" height="20" rx="3" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M7 7H17M7 11H14M7 15H17" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      {/* 文档角小云弧 */}
      <path d="M16 2V5C16 6 17 7 18 7H21" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** 钱包 */
export function CloudWallet({ size = 24, color, className }: IconProps) {
  const c = color || C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="6" width="20" height="14" rx="3" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M2 10H22" stroke={c} strokeWidth="1.5" />
      <path d="M17 14H17.01" stroke={c} strokeWidth="2" strokeLinecap="round" />
      {/* 钱包上缘云弧 */}
      <path d="M5 6C5 4 6.5 3 8 3.5H18" stroke={c} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** 安全/盾牌 */
export function CloudShield({ size = 24, color, className }: IconProps) {
  const c = color || C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L4 5V11C4 16.25 7.4 20.78 12 22C16.6 20.78 20 16.25 20 11V5L12 2Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M9 12L11 14L15 10" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* 盾牌内云弧 */}
      <path d="M7 6C8 5 9.5 4.5 11 5" stroke={c} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/** 设置/齿轮 */
export function CloudSettings({ size = 24, color, className }: IconProps) {
  const c = color || C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      {/* 齿轮内云弧 */}
      <path d="M10.5 9.5C11 9 12 8.8 13 9.2" stroke={c} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/** 分享 */
export function CloudShare({ size = 24, color, className }: IconProps) {
  const c = color || C.primary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="18" cy="5" r="3" stroke={c} strokeWidth="1.5" fill="none" />
      <circle cx="6" cy="12" r="3" stroke={c} strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="19" r="3" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}

// ==================== 三、品牌装饰图标 ====================

/** 品牌云吉祥物 - 开屏页/空状态使用 */
export function CloudMascot({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* 云朵身体 */}
      <path d="M78 72H22C11 72 2 63 2 51C2 41 8 33 17 30.5C17 29.5 17 28.5 17 27.5C17 19 24 12 33 12C38 12 42.5 14 45.5 17.5C49 14.5 53.5 12.5 58.5 12.5C69 12.5 77.5 20.5 77.5 31C77.5 31.5 77.5 32 77.5 32.5C86 34.5 93 42 93 51C93 63 87 72 78 72Z" fill="#7AC9F2" />
      {/* 高光 */}
      <ellipse cx="40" cy="40" rx="14" ry="7" fill="white" opacity="0.25" />
      {/* 左眼 */}
      <circle cx="40" cy="56" r="4" fill="#1E293B" />
      <circle cx="41.5" cy="54.5" r="1.5" fill="white" />
      {/* 右眼 */}
      <circle cx="60" cy="56" r="4" fill="#1E293B" />
      <circle cx="61.5" cy="54.5" r="1.5" fill="white" />
      {/* 腮红 */}
      <ellipse cx="32" cy="62" rx="5" ry="3" fill="#FFB6C1" opacity="0.5" />
      <ellipse cx="68" cy="62" rx="5" ry="3" fill="#FFB6C1" opacity="0.5" />
      {/* 微笑 */}
      <path d="M44 64Q50 71 56 64" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* 小脚 */}
      <ellipse cx="42" cy="82" rx="6" ry="4" fill="#60A5FA" />
      <ellipse cx="58" cy="82" rx="6" ry="4" fill="#60A5FA" />
      {/* 阴影 */}
      <ellipse cx="50" cy="90" rx="20" ry="4" fill="#1E3A5F" opacity="0.1" />
    </svg>
  );
}

/** 空状态 - 云朵+问号（困惑表情） */
export function CloudEmpty({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      {/* 云朵身体 */}
      <path d="M78 72H22C11 72 2 63 2 51C2 41 8 33 17 30.5C17 29.5 17 28.5 17 27.5C17 19 24 12 33 12C38 12 42.5 14 45.5 17.5C49 14.5 53.5 12.5 58.5 12.5C69 12.5 77.5 20.5 77.5 31C77.5 31.5 77.5 32 77.5 32.5C86 34.5 93 42 93 51C93 63 87 72 78 72Z" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2.5" />
      {/* 困惑眼睛 */}
      <circle cx="40" cy="50" r="3" fill="#94A3B8" />
      <circle cx="60" cy="50" r="3" fill="#94A3B8" />
      {/* O型嘴 */}
      <ellipse cx="50" cy="61" rx="4" ry="5" fill="none" stroke="#94A3B8" strokeWidth="2" />
      {/* 问号 */}
      <text x="76" y="32" fill="#93C5FD" fontSize="22" fontWeight="bold" fontFamily="system-ui">?</text>
    </svg>
  );
}

/** 加载动画 - 云朵旋转 */
export function CloudLoading({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} style={{ animation: 'spin 1.5s linear infinite' }}>
      <path d="M78 72H22C11 72 2 63 2 51C2 41 8 33 17 30.5C17 29.5 17 28.5 17 27.5C17 19 24 12 33 12C38 12 42.5 14 45.5 17.5C49 14.5 53.5 12.5 58.5 12.5C69 12.5 77.5 20.5 77.5 31C77.5 31.5 77.5 32 77.5 32.5C86 34.5 93 42 93 51C93 63 87 72 78 72Z" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2.5" />
      <path d="M50 40A12 12 0 1 1 38 52" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M38 52L35 47L42 49" fill="#3B82F6" />
    </svg>
  );
}

// ==================== 四、图标索引 ====================
export const CLOUD_ICONS = {
  search: CloudSearch,
  location: CloudLocation,
  heart: CloudHeart,
  star: CloudStar,
  bell: CloudBell,
  message: CloudMessage,
  buddy: CloudBuddy,
  check: CloudCheck,
  publish: CloudPublish,
  order: CloudOrder,
  wallet: CloudWallet,
  shield: CloudShield,
  settings: CloudSettings,
  share: CloudShare,
  mascot: CloudMascot,
  empty: CloudEmpty,
  loading: CloudLoading,
} as const;
