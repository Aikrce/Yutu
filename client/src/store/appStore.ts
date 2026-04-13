// 全局 UI 状态管理
import { create } from 'zustand';

interface AppState {
  activeTab: string;
  showSplash: boolean;
  showPublish: boolean;

  setActiveTab: (tab: string) => void;
  setShowSplash: (show: boolean) => void;
  setShowPublish: (show: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'home',
  showSplash: true,
  showPublish: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setShowSplash: (show) => set({ showSplash: show }),
  setShowPublish: (show) => set({ showPublish: show }),
}));
