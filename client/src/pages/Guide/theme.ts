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

// 摄影向导主题（清新蓝白）
export const photographyTheme: GuideTheme = {
  primary: '#4A90E2',
  primaryLight: '#4A90E220',
  primaryDark: '#3A7BC8',
  secondary: '#87CEEB',
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F0F8FF',
  bgCard: '#FFFFFF',
  gradientHeader: 'linear-gradient(135deg, #4A90E2 0%, #87CEEB 100%)',
  gradientButton: 'linear-gradient(135deg, #4A90E2 0%, #3A7BC8 100%)',
  textOnPrimary: '#FFFFFF',
  textPrimary: '#1A365D',
  textSecondary: '#4A5568',
  borderColor: '#E2E8F0',
  shadow: '0 4px 12px rgba(74,144,226,0.3)',
  icon: '📸',
  name: 'photography'
};

// 美食向导主题（暖橙食欲）
export const foodTheme: GuideTheme = {
  primary: '#FF6B35',
  primaryLight: '#FF6B3520',
  primaryDark: '#E85A26',
  secondary: '#FFA07A',
  bgPrimary: '#FFFCF5',
  bgSecondary: '#FFF8E7',
  bgCard: '#FFFFFF',
  gradientHeader: 'linear-gradient(135deg, #FF6B35 0%, #FFA07A 100%)',
  gradientButton: 'linear-gradient(135deg, #FF6B35 0%, #E85A26 100%)',
  textOnPrimary: '#FFFFFF',
  textPrimary: '#7C2D12',
  textSecondary: '#9A3412',
  borderColor: '#FED7AA',
  shadow: '0 4px 12px rgba(255,107,53,0.3)',
  icon: '🍜',
  name: 'food'
};

// 户外向导主题（山野绿）
export const outdoorTheme: GuideTheme = {
  primary: '#228B22',
  primaryLight: '#228B2220',
  primaryDark: '#1A6B1A',
  secondary: '#696969',
  bgPrimary: '#F5F5F5',
  bgSecondary: '#FFFFFF',
  bgCard: '#FFFFFF',
  gradientHeader: 'linear-gradient(135deg, #228B22 0%, #2E8B57 100%)',
  gradientButton: 'linear-gradient(135deg, #228B22 0%, #1A6B1A 100%)',
  textOnPrimary: '#FFFFFF',
  textPrimary: '#14532D',
  textSecondary: '#166534',
  borderColor: '#BBF7D0',
  shadow: '0 4px 12px rgba(34,139,34,0.3)',
  icon: '⛰️',
  name: 'outdoor'
};

// 历史向导主题（古典红金）
export const historyTheme: GuideTheme = {
  primary: '#8B0000',
  primaryLight: '#8B000020',
  primaryDark: '#6B0000',
  secondary: '#DAA520',
  bgPrimary: '#FAF0E6',
  bgSecondary: '#FFF8DC',
  bgCard: '#FFFFFF',
  gradientHeader: 'linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)',
  gradientButton: 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)',
  textOnPrimary: '#FFD700',
  textPrimary: '#450a0a',
  textSecondary: '#7f1d1d',
  borderColor: '#FECACA',
  shadow: '0 4px 12px rgba(139,0,0,0.3)',
  icon: '🏛️',
  name: 'history'
};

// 文艺向导主题（治愈粉紫）
export const artTheme: GuideTheme = {
  primary: '#9370DB',
  primaryLight: '#9370DB20',
  primaryDark: '#7B5DB0',
  secondary: '#FFB6C1',
  bgPrimary: '#FFF0F5',
  bgSecondary: '#FFFFFF',
  bgCard: '#FFFFFF',
  gradientHeader: 'linear-gradient(135deg, #9370DB 0%, #FFB6C1 100%)',
  gradientButton: 'linear-gradient(135deg, #9370DB 0%, #7B5DB0 100%)',
  textOnPrimary: '#FFFFFF',
  textPrimary: '#581c87',
  textSecondary: '#7c3aed',
  borderColor: '#E9D5FF',
  shadow: '0 4px 12px rgba(147,112,219,0.3)',
  icon: '🎨',
  name: 'art'
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
    case 'photography':
      return photographyTheme;
    case 'food':
      return foodTheme;
    case 'outdoor':
      return outdoorTheme;
    case 'history':
      return historyTheme;
    case 'art':
      return artTheme;
    default:
      return defaultTheme;
  }
}
