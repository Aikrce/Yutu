// 云旅友途 - 安全区域样式工具

/** 顶部安全区域 padding */
export function safeAreaTop(fallback = '8px'): React.CSSProperties {
  return { paddingTop: `max(env(safe-area-inset-top), ${fallback})` };
}

/** 底部安全区域 padding */
export function safeAreaBottom(fallback = '4px'): React.CSSProperties {
  return { paddingBottom: `max(env(safe-area-inset-bottom), ${fallback})` };
}

/** 组合安全区域样式 */
export function safeAreaStyles(options: {
  top?: boolean | string;
  bottom?: boolean | string;
}): React.CSSProperties {
  const styles: React.CSSProperties = {};
  if (options.top) {
    styles.paddingTop = `max(env(safe-area-inset-top), ${typeof options.top === 'string' ? options.top : '8px'})`;
  }
  if (options.bottom) {
    styles.paddingBottom = `max(env(safe-area-inset-bottom), ${typeof options.bottom === 'string' ? options.bottom : '4px'})`;
  }
  return styles;
}
