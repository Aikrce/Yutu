// 云旅友途 - 全局常量

// 分类标签
export const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'spot', label: '景点' },
  { key: 'food', label: '美食' },
  { key: 'camping', label: '露营' },
  { key: 'escape', label: '密室' },
  { key: 'city', label: '城市' },
  { key: 'business', label: '商务' },
] as const;

// z-index 层级
export const Z_INDEX = {
  tabBar: 50,
  detail: 60,
  modal: 100,
  splash: 200,
} as const;

// 瀑布流图片高度
export function getContentImageHeight(id: number): number {
  return 120 + (id % 3) * 40;
}

// 开屏时长
export const SPLASH_DURATION = 2200;

// 瀑布流配置
export const WATERFALL_CONFIG: {
  initialCount: number;
  loadMoreCount: number;
  scrollThreshold: number;
} = {
  initialCount: 20,
  loadMoreCount: 10,
  scrollThreshold: 400,
};
