// 向导服务
import { MOCK_GUIDES, MOCK_REVIEWS } from '../data/mock';
import type { Guide, Review } from '../data/mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const guideService = {
  /** 获取向导列表 */
  async getGuides(): Promise<Guide[]> {
    await delay(300);
    return MOCK_GUIDES;
  },

  /** 获取向导详情 */
  async getGuideById(id: number): Promise<Guide | undefined> {
    await delay(200);
    return MOCK_GUIDES.find((g) => g.id === id);
  },

  /** 获取向导评价 */
  async getReviews(guideId: number): Promise<Review[]> {
    await delay(200);
    return MOCK_REVIEWS.filter((r) => r.guideId === guideId);
  },
};
