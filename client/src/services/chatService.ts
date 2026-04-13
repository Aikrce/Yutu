// 聊天服务
import { MOCK_CHATS, MOCK_MESSAGES } from '../data/mock';
import type { ChatItem, ChatMessage } from '../data/mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const chatService = {
  /** 获取聊天列表 */
  async getChats(): Promise<ChatItem[]> {
    await delay(300);
    return MOCK_CHATS;
  },

  /** 获取聊天消息 */
  async getMessages(chatId: number): Promise<ChatMessage[]> {
    await delay(200);
    return MOCK_MESSAGES.filter((m) => m.chatId === chatId);
  },
};
