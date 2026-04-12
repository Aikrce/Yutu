// 云旅友途 - 向导模拟数据

export interface Guide {
  id: number;
  name: string;
  avatar: string;
  level: 'featured' | 'newcomer';
  rating: number;
  orderCount: number;
  tags: string[];
  priceHourly: number;
  priceHalfDay: number;
  priceFullDay: number;
  bio: string;
  coverImage: string;
  distance: string;
  isOnline: boolean;
  city: string;
}

const img = (seed: string, w = 400, h = 300) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const MOCK_GUIDES: Guide[] = [
  { id: 1, name: '小李', avatar: img('guide1', 100, 100), level: 'featured', rating: 4.9, orderCount: 128, tags: ['摄影', '讲解', '带娃'], priceHourly: 80, priceHalfDay: 350, priceFullDay: 600, bio: '杭州本地人，5年摄影爱好者，熟悉西湖周边所有拍照机位。帮你拍出朋友圈最靓的照片！', coverImage: img('guide1-cover', 800, 400), distance: '1.2km', isOnline: true, city: '杭州' },
  { id: 2, name: '阿花', avatar: img('guide2', 100, 100), level: 'newcomer', rating: 4.8, orderCount: 32, tags: ['美食', '探店', '拍照'], priceHourly: 50, priceHalfDay: 200, priceFullDay: 380, bio: '成都土著，吃货本货，带你去本地人去的店，不是游客坑！', coverImage: img('guide2-cover', 800, 400), distance: '0.8km', isOnline: true, city: '成都' },
  { id: 3, name: '大刘', avatar: img('guide3', 100, 100), level: 'featured', rating: 4.9, orderCount: 256, tags: ['徒步', '登山', '户外'], priceHourly: 100, priceHalfDay: 400, priceFullDay: 700, bio: '国家登山协会认证向导，10年户外经验，安全第一风景第二！', coverImage: img('guide3-cover', 800, 400), distance: '2.5km', isOnline: false, city: '张家界' },
  { id: 4, name: '小周', avatar: img('guide4', 100, 100), level: 'featured', rating: 5.0, orderCount: 89, tags: ['历史', '讲解', '古建'], priceHourly: 90, priceHalfDay: 380, priceFullDay: 650, bio: '历史系研究生，专门研究明清建筑，故宫就是我家后花园。', coverImage: img('guide4-cover', 800, 400), distance: '3.1km', isOnline: true, city: '北京' },
  { id: 5, name: '晓晓', avatar: img('guide5', 100, 100), level: 'newcomer', rating: 4.7, orderCount: 18, tags: ['文艺', '咖啡', '打卡'], priceHourly: 60, priceHalfDay: 250, priceFullDay: 450, bio: '厦门文艺女青年，知道所有隐藏咖啡馆和拍照圣地。', coverImage: img('guide5-cover', 800, 400), distance: '1.5km', isOnline: true, city: '厦门' },
  { id: 6, name: '老张', avatar: img('guide6', 100, 100), level: 'featured', rating: 4.8, orderCount: 198, tags: ['商务', '翻译', '英语'], priceHourly: 150, priceHalfDay: 600, priceFullDay: 1000, bio: '前外企高管，英语商务陪同，擅长企业对接和展会翻译。', coverImage: img('guide6-cover', 800, 400), distance: '4.2km', isOnline: true, city: '上海' },
  { id: 7, name: '阿妹', avatar: img('guide7', 100, 100), level: 'newcomer', rating: 4.6, orderCount: 12, tags: ['密室', '剧本杀', '组局'], priceHourly: 40, priceHalfDay: 180, priceFullDay: 300, bio: '密室老玩家，剧本杀组局达人，帮你凑人开本！', coverImage: img('guide7-cover', 800, 400), distance: '0.5km', isOnline: true, city: '杭州' },
  { id: 8, name: '王哥', avatar: img('guide8', 100, 100), level: 'featured', rating: 4.9, orderCount: 312, tags: ['自驾', '露营', '户外'], priceHourly: 120, priceHalfDay: 500, priceFullDay: 800, bio: '房车旅行达人，走过318川藏线10次，露营老司机。', coverImage: img('guide8-cover', 800, 400), distance: '5.0km', isOnline: false, city: '成都' },
];

// 搭子数据
export interface Buddy {
  id: number;
  name: string;
  avatar: string;
  destination: string;
  time: string;
  groupSize: string;
  tags: string[];
  bio: string;
  distance: string;
  gender: '男' | '女';
  age: number;
}

export const MOCK_BUDDIES: Buddy[] = [
  { id: 1, name: '小红', avatar: img('buddy1', 100, 100), destination: '西湖断桥', time: '今天 14:00-18:00', groupSize: '2-4人', tags: ['摄影', '日落', '散步'], bio: '想找人一起拍日落照片，我带了单反！', distance: '0.5km', gender: '女', age: 24 },
  { id: 2, name: '阿杰', avatar: img('buddy2', 100, 100), destination: '灵隐寺', time: '明天 09:00-12:00', groupSize: '2人', tags: ['寺庙', '登山', '文化'], bio: '周末闲逛，求搭子一起爬山', distance: '1.2km', gender: '男', age: 28 },
  { id: 3, name: '小美', avatar: img('buddy3', 100, 100), destination: '河坊街', time: '今天 18:00-21:00', groupSize: '3-5人', tags: ['美食', '逛街', '拍照'], bio: '杭州美食打卡，一起吃遍河坊街！', distance: '0.8km', gender: '女', age: 22 },
  { id: 4, name: '大鹏', avatar: img('buddy4', 100, 100), destination: '千岛湖', time: '周六 全天', groupSize: '4-6人', tags: ['自驾', '露营', '湖景'], bio: '自驾千岛湖露营，已有2人，还差4人', distance: '2.3km', gender: '男', age: 31 },
  { id: 5, name: '娜娜', avatar: img('buddy5', 100, 100), destination: '西溪湿地', time: '周日 10:00-16:00', groupSize: '2-3人', tags: ['湿地', '划船', '自然'], bio: '想去西溪湿地划船看花，有人一起吗？', distance: '1.8km', gender: '女', age: 26 },
  { id: 6, name: '老王', avatar: img('buddy6', 100, 100), destination: '密室逃脱', time: '今天 19:00-22:00', groupSize: '4-6人', tags: ['密室', '中恐', '组局'], bio: '坦克玩家求组队，重恐也可以！', distance: '0.3km', gender: '男', age: 27 },
];

// 聊天数据
export interface ChatItem {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  type: 'user' | 'system';
  isGuide: boolean;
  rating?: number;
}

export const MOCK_CHATS: ChatItem[] = [
  { id: 1, name: '系统通知', avatar: '', lastMessage: '您的搭子匹配成功！小红已接受您的邀请', time: '刚刚', unread: 2, type: 'system', isGuide: false },
  { id: 2, name: '小李', avatar: img('guide1', 100, 100), lastMessage: '好的，我们下午2点断桥见！', time: '09:15', unread: 1, type: 'user', isGuide: true, rating: 4.9 },
  { id: 3, name: '小红', avatar: img('buddy1', 100, 100), lastMessage: '我带了单反，可以帮你拍照哦', time: '昨天', unread: 0, type: 'user', isGuide: false },
  { id: 4, name: '阿杰', avatar: img('buddy2', 100, 100), lastMessage: '明天灵隐寺见，我带了登山杖', time: '昨天', unread: 0, type: 'user', isGuide: false },
  { id: 5, name: '阿花', avatar: img('guide2', 100, 100), lastMessage: '推荐你去建设路那家串串，本地人最爱', time: '周一', unread: 0, type: 'user', isGuide: true, rating: 4.8 },
  { id: 6, name: '小周', avatar: img('guide4', 100, 100), lastMessage: '故宫讲解可以约明天上午', time: '上周', unread: 0, type: 'user', isGuide: true, rating: 5.0 },
];

// 订单数据
export interface OrderItem {
  id: number;
  orderNo: string;
  guideName: string;
  guideAvatar: string;
  service: string;
  date: string;
  time: string;
  amount: number;
  status: 'pending' | 'paid' | 'serving' | 'completed' | 'cancelled';
}

export const MOCK_ORDERS: OrderItem[] = [
  { id: 1, orderNo: 'YT20260412001', guideName: '小李', guideAvatar: img('guide1', 100, 100), service: '半日摄影向导', date: '2026-04-13', time: '14:00-18:00', amount: 350, status: 'paid' },
  { id: 2, orderNo: 'YT20260410002', guideName: '阿花', guideAvatar: img('guide2', 100, 100), service: '全日美食探店', date: '2026-04-10', time: '10:00-18:00', amount: 380, status: 'completed' },
  { id: 3, orderNo: 'YT20260408003', guideName: '大刘', guideAvatar: img('guide3', 100, 100), service: '半日徒步向导', date: '2026-04-08', time: '08:00-12:00', amount: 400, status: 'completed' },
  { id: 4, orderNo: 'YT20260415004', guideName: '小周', guideAvatar: img('guide4', 100, 100), service: '全日历史讲解', date: '2026-04-15', time: '09:00-18:00', amount: 650, status: 'pending' },
];
