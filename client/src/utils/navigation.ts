// 导航工具函数 - 从 SubNavBar 中提取

import { useParams } from 'react-router-dom';

/** 读取路由中的 id 参数并转为数字 */
export function useIdParam(): number {
  const { id } = useParams();
  return Number(id) || 0;
}
