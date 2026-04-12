// 云旅友途 - 自适应主题Hook
import { useState, useCallback, useMemo } from 'react';
import { type ThemeType, getThemeColors, getThemeCSSVars, getThemeByCategory } from '../types/theme';

export function useTheme(initialTheme: ThemeType = 'default') {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(initialTheme);

  const colors = useMemo(() => getThemeColors(currentTheme), [currentTheme]);
  const cssVars = useMemo(() => getThemeCSSVars(currentTheme), [currentTheme]);

  const setThemeByCategory = useCallback((category: string) => {
    const theme = getThemeByCategory(category);
    setCurrentTheme(theme);
  }, []);

  return {
    currentTheme,
    setCurrentTheme,
    setThemeByCategory,
    colors,
    cssVars,
    isDark: colors.isDark,
  };
}
