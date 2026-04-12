// 云旅友途 - 自适应主题系统
// 详情页根据内容类型自动切换配色

export type ThemeType = 'default' | 'forest' | 'business' | 'escape' | 'food' | 'city' | 'night';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  bg: string;
  textPrimary: string;
  textSecondary: string;
  card: string;
  border: string;
  isDark: boolean;
}

const THEMES: Record<ThemeType, ThemeColors> = {
  default: {
    primary: '#3B82F6',
    primaryLight: '#60A5FA',
    primaryDark: '#1E40AF',
    secondary: '#0EA5E9',
    bg: '#F8FAFC',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    card: '#FFFFFF',
    border: '#E2E8F0',
    isDark: false,
  },
  forest: {
    primary: '#16A34A',
    primaryLight: '#4ADE80',
    primaryDark: '#166534',
    secondary: '#84CC16',
    bg: '#F0FDF4',
    textPrimary: '#14532D',
    textSecondary: '#4D7C0F',
    card: '#FFFFFF',
    border: '#BBF7D0',
    isDark: false,
  },
  business: {
    primary: '#1E3A5F',
    primaryLight: '#3B82F6',
    primaryDark: '#0F1D33',
    secondary: '#D4AF37',
    bg: '#F8FAFC',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    card: '#FFFFFF',
    border: '#E2E8F0',
    isDark: false,
  },
  escape: {
    primary: '#7C3AED',
    primaryLight: '#A855F7',
    primaryDark: '#5B21B6',
    secondary: '#C084FC',
    bg: '#1E0A3C',
    textPrimary: '#F3E8FF',
    textSecondary: '#C4B5FD',
    card: '#2E1065',
    border: '#4C1D95',
    isDark: true,
  },
  food: {
    primary: '#EA580C',
    primaryLight: '#FB923C',
    primaryDark: '#9A3412',
    secondary: '#FBBF24',
    bg: '#FFF7ED',
    textPrimary: '#431407',
    textSecondary: '#9A3412',
    card: '#FFFFFF',
    border: '#FED7AA',
    isDark: false,
  },
  city: {
    primary: '#0EA5E9',
    primaryLight: '#38BDF8',
    primaryDark: '#0369A1',
    secondary: '#7DD3FC',
    bg: '#F0F9FF',
    textPrimary: '#0C4A6E',
    textSecondary: '#0369A1',
    card: '#FFFFFF',
    border: '#BAE6FD',
    isDark: false,
  },
  night: {
    primary: '#6366F1',
    primaryLight: '#818CF8',
    primaryDark: '#4338CA',
    secondary: '#8B5CF6',
    bg: '#1E1B4B',
    textPrimary: '#E0E7FF',
    textSecondary: '#A5B4FC',
    card: '#312E81',
    border: '#4338CA',
    isDark: true,
  },
};

// 根据内容分类映射主题
export function getThemeByCategory(category: string): ThemeType {
  const categoryMap: Record<string, ThemeType> = {
    // 景点/户外/露营/徒步
    spot: 'forest',
    camping: 'forest',
    hiking: 'forest',
    outdoor: 'forest',
    nature: 'forest',
    // 美食
    food: 'food',
    restaurant: 'food',
    snack: 'food',
    // 商务
    business: 'business',
    corporate: 'business',
    // 密室/剧本杀/游戏
    escape: 'escape',
    mystery: 'escape',
    game: 'escape',
    escape_room: 'escape',
    // 城市/博物馆
    city: 'city',
    museum: 'city',
    sightseeing: 'city',
    // 夜间
    night: 'night',
    bar: 'night',
    club: 'night',
    show: 'night',
    // 游乐场默认
    park: 'city',
    mall: 'default',
  };

  return categoryMap[category] || 'default';
}

export function getThemeColors(theme: ThemeType): ThemeColors {
  return THEMES[theme];
}

// 生成主题CSS变量
export function getThemeCSSVars(theme: ThemeType): React.CSSProperties {
  const colors = THEMES[theme];
  return {
    '--theme-primary': colors.primary,
    '--theme-primary-light': colors.primaryLight,
    '--theme-primary-dark': colors.primaryDark,
    '--theme-secondary': colors.secondary,
    '--theme-bg': colors.bg,
    '--theme-text-primary': colors.textPrimary,
    '--theme-text-secondary': colors.textSecondary,
    '--theme-card': colors.card,
    '--theme-border': colors.border,
  } as React.CSSProperties;
}

export { THEMES };
