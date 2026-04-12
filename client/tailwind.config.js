/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 云旅友途 - 蓝白主色调
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#1E40AF',
          light: '#60A5FA',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        secondary: '#0EA5E9',
        accent: '#F59E0B',
        success: '#10B981',
        warning: '#F97316',
        error: '#EF4444',
        background: '#F8FAFC',
        card: '#FFFFFF',
        text: {
          primary: '#1E293B',
          secondary: '#64748B',
          tertiary: '#94A3B8',
        },
        divider: '#E2E8F0',
        // 详情页自适应主题色
        theme: {
          forest: {
            primary: '#16A34A',
            secondary: '#84CC16',
            bg: '#F0FDF4',
          },
          business: {
            primary: '#1E3A5F',
            secondary: '#D4AF37',
            bg: '#F8FAFC',
          },
          escape: {
            primary: '#7C3AED',
            secondary: '#A855F7',
            bg: '#2E1065',
          },
          food: {
            primary: '#EA580C',
            secondary: '#FBBF24',
            bg: '#FFF7ED',
          },
          city: {
            primary: '#0EA5E9',
            secondary: '#38BDF8',
            bg: '#F0F9FF',
          },
          night: {
            primary: '#6366F1',
            secondary: '#8B5CF6',
            bg: '#1E1B4B',
          },
        },
      },
      fontSize: {
        h1: ['24px', { lineHeight: '1.5', fontWeight: '700' }],
        h2: ['20px', { lineHeight: '1.5', fontWeight: '600' }],
        h3: ['17px', { lineHeight: '1.5', fontWeight: '600' }],
        body: ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        tag: ['11px', { lineHeight: '1.5', fontWeight: '500' }],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'full': '50%',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.1)',
        'modal': '0 8px 24px rgba(0,0,0,0.15)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
      },
    },
  },
  plugins: [],
}
