// 向导详情页主题配置

export interface GuideTheme {
  // 主题色
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  
  // 背景色
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  
  // 渐变色
  gradientHeader: string;
  gradientButton: string;
  
  // 文字色
  textOnPrimary: string;
  textPrimary: string;
  textSecondary: string;
  
  // 边框色
  borderColor: string;
  
  // 阴影
  shadow: string;
  
  // 特殊标识
  icon: string;
  name: string;
}

// 默认主题（蓝色）
export const defaultTheme: GuideTheme = {
  primary: '#3B82F6',
  primaryLight: '#3B82F620',
  primaryDark: '#2563EB',
  secondary: '#10B981',
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F8FAFC',
  bgCard: '#FFFFFF',
  gradientHeader: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
  gradientButton: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  textOnPrimary: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  borderColor: '#E2E8F0',
  shadow: '0 4px 12px rgba(59,130,246,0.3)',
  icon: '☁️',
  name: 'default'
};

// 密室逃脱主题（暗紫悬疑）
export const escapeTheme: GuideTheme = {
  primary: '#6B46C1',
  primaryLight: '#6B46C120',
  primaryDark: '#553C9A',
  secondary: '#FF6B35',
  bgPrimary: '#1A1A2E',
  bgSecondary: '#16213E',
  bgCard: '#16213E',
  gradientHeader: 'linear-gradient(135deg, #6B46C1 0%, #1A1A2E 100%)',
  gradientButton: 'linear-gradient(135deg, #FF6B35 0%, #E85D26 100%)',
  textOnPrimary: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AEC0',
  borderColor: '#2D3748',
  shadow: '0 4px 12px rgba(107,70,193,0.4)',
  icon: '🔒',
  name: 'escape'
};

// 露营组队主题（森林绿自然）
export const campingTheme: GuideTheme = {
  primary: '#2D5A3D',
  primaryLight: '#2D5A3D20',
  primaryDark: '#1E3D2A',
  secondary: '#FF8C42',
  bgPrimary: '#F5F5DC',
  bgSecondary: '#FFFFFF',
  bgCard: '#FFFFFF',
  gradientHeader: 'linear-gradient(135deg, #2D5A3D 0%, #4A7C59 100%)',
  gradientButton: 'linear-gradient(135deg, #2D5A3D 0%, #4A7C59 100%)',
  textOnPrimary: '#FFFFFF',
  textPrimary: '#1A202C',
  textSecondary: '#4A5568',
  borderColor: '#E2E8F0',
  shadow: '0 4px 12px rgba(45,90,61,0.3)',
  icon: '⛺',
  name: 'camping'
};

// 商务陪同主题（深蓝金色）
export const businessTheme: GuideTheme = {
  primary: '#1E3A5F',
  primaryLight: '#1E3A5F20',
  primaryDark: '#152A45',
  secondary: '#D4AF37',
  bgPrimary: '#F8F9FA',
  bgSecondary: '#FFFFFF',
  bgCard: '#FFFFFF',
  gradientHeader: 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)',
  gradientButton: 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)',
  textOnPrimary: '#D4AF37',
  textPrimary: '#1A202C',
  textSecondary: '#4A5568',
  borderColor: '#E2E8F0',
  shadow: '0 4px 12px rgba(30,58,95,0.3)',
  icon: '💼',
  name: 'business'
};

// 根据分类获取主题
export function getGuideTheme(category?: string): GuideTheme {
  switch (category) {
    case 'escape':
      return escapeTheme;
    case 'camping':
      return campingTheme;
    case 'business':
      return businessTheme;
    default:
      return defaultTheme;
  }
}
