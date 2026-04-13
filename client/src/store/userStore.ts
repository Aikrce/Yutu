// 用户状态管理
import { create } from 'zustand';
import type { MockUser } from '../data/mock';
import { MOCK_USERS } from '../data/mock';

interface UserState {
  currentUser: MockUser;
  setCurrentUser: (user: MockUser) => void;
}

// 默认使用第一个用户（旅小友）
export const useUserStore = create<UserState>((set) => ({
  currentUser: MOCK_USERS[0],

  setCurrentUser: (user) => set({ currentUser: user }),
}));
