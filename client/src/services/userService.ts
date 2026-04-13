// 用户服务
import { MOCK_USERS } from '../data/mock';
import type { MockUser } from '../data/mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const userService = {
  /** 获取用户信息 */
  async getUserById(id: number): Promise<MockUser | undefined> {
    await delay(200);
    return MOCK_USERS.find((u) => u.id === id);
  },

  /** 获取用户列表 */
  async getUsers(): Promise<MockUser[]> {
    await delay(300);
    return MOCK_USERS;
  },
};
