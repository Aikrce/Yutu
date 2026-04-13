// 内容服务 - 先返回 mock 数据，后续接真实 API
import { MOCK_CONTENTS } from '../data/contents';
import type { ContentItem } from '../data/contents';
import { MOCK_COMMENTS } from '../data/mock';
import type { ContentComment } from '../data/mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const contentService = {
  /** 获取内容列表 */
  async getContents(category?: string): Promise<ContentItem[]> {
    await delay(300);
    if (category && category !== 'all') {
      return MOCK_CONTENTS.filter((c) => c.category === category);
    }
    return MOCK_CONTENTS;
  },

  /** 获取内容详情 */
  async getContentById(id: number): Promise<ContentItem | undefined> {
    await delay(200);
    return MOCK_CONTENTS.find((c) => c.id === id);
  },

  /** 获取评论列表 */
  async getComments(contentId: number): Promise<ContentComment[]> {
    await delay(200);
    void contentId;
    return MOCK_COMMENTS;
  },
};
