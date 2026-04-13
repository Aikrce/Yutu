// 导航工具函数 - 从 SubNavBar 中提取

import { useParams } from 'react-router-dom';
import { MOCK_CHATS } from '../data/mock';

/** 读取路由中的 id 参数并转为数字 */
export function useIdParam(): number {
  const { id } = useParams();
  return Number(id) || 0;
}

/** 根据向导名称查找对应的聊天会话 ID */
export function findChatIdByGuideName(guideName: string): number | undefined {
  const chat = MOCK_CHATS.find(c => c.type === 'user' && c.name === guideName);
  return chat?.id;
}
