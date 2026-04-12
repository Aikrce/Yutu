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
  works: string[];
}

const img = (seed: string, w = 400, h = 300) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const MOCK_GUIDES: Guide[] = [
  { id: 1, name: '小李', avatar: img('guide1', 100, 100), level: 'featured', rating: 4.9, orderCount: 128, tags: ['摄影', '讲解', '带娃'], priceHourly: 80, priceHalfDay: 350, priceFullDay: 600, bio: '杭州本地人，5年摄影爱好者，熟悉西湖周边所有拍照机位。帮你拍出朋友圈最靓的照片！', coverImage: img('guide1-cover', 800, 400), distance: '1.2km', isOnline: true, city: '杭州', works: [img('work1a', 200, 200), img('work1b', 200, 200), img('work1c', 200, 200), img('work1d', 200, 200)] },
  { id: 2, name: '阿花', avatar: img('guide2', 100, 100), level: 'newcomer', rating: 4.8, orderCount: 32, tags: ['美食', '探店', '拍照'], priceHourly: 50, priceHalfDay: 200, priceFullDay: 380, bio: '成都土著，吃货本货，带你去本地人去的店，不是游客坑！', coverImage: img('guide2-cover', 800, 400), distance: '0.8km', isOnline: true, city: '成都', works: [img('work2a', 200, 200), img('work2b', 200, 200), img('work2c', 200, 200), img('work2d', 200, 200)] },
  { id: 3, name: '大刘', avatar: img('guide3', 100, 100), level: 'featured', rating: 4.9, orderCount: 256, tags: ['徒步', '登山', '户外'], priceHourly: 100, priceHalfDay: 400, priceFullDay: 700, bio: '国家登山协会认证向导，10年户外经验，安全第一风景第二！', coverImage: img('guide3-cover', 800, 400), distance: '2.5km', isOnline: false, city: '张家界', works: [img('work3a', 200, 200), img('work3b', 200, 200), img('work3c', 200, 200), img('work3d', 200, 200)] },
  { id: 4, name: '小周', avatar: img('guide4', 100, 100), level: 'featured', rating: 5.0, orderCount: 89, tags: ['历史', '讲解', '古建'], priceHourly: 90, priceHalfDay: 380, priceFullDay: 650, bio: '历史系研究生，专门研究明清建筑，故宫就是我家后花园。', coverImage: img('guide4-cover', 800, 400), distance: '3.1km', isOnline: true, city: '北京', works: [img('work4a', 200, 200), img('work4b', 200, 200), img('work4c', 200, 200), img('work4d', 200, 200)] },
  { id: 5, name: '晓晓', avatar: img('guide5', 100, 100), level: 'newcomer', rating: 4.7, orderCount: 18, tags: ['文艺', '咖啡', '打卡'], priceHourly: 60, priceHalfDay: 250, priceFullDay: 450, bio: '厦门文艺女青年，知道所有隐藏咖啡馆和拍照圣地。', coverImage: img('guide5-cover', 800, 400), distance: '1.5km', isOnline: true, city: '厦门', works: [img('work5a', 200, 200), img('work5b', 200, 200), img('work5c', 200, 200), img('work5d', 200, 200)] },
  { id: 6, name: '老张', avatar: img('guide6', 100, 100), level: 'featured', rating: 4.8, orderCount: 198, tags: ['商务', '翻译', '英语'], priceHourly: 150, priceHalfDay: 600, priceFullDay: 1000, bio: '前外企高管，英语商务陪同，擅长企业对接和展会翻译。', coverImage: img('guide6-cover', 800, 400), distance: '4.2km', isOnline: true, city: '上海', works: [img('work6a', 200, 200), img('work6b', 200, 200), img('work6c', 200, 200), img('work6d', 200, 200)] },
  { id: 7, name: '阿妹', avatar: img('guide7', 100, 100), level: 'newcomer', rating: 4.6, orderCount: 12, tags: ['密室', '剧本杀', '组局'], priceHourly: 40, priceHalfDay: 180, priceFullDay: 300, bio: '密室老玩家，剧本杀组局达人，帮你凑人开本！', coverImage: img('guide7-cover', 800, 400), distance: '0.5km', isOnline: true, city: '杭州', works: [img('work7a', 200, 200), img('work7b', 200, 200), img('work7c', 200, 200), img('work7d', 200, 200)] },
  { id: 8, name: '王哥', avatar: img('guide8', 100, 100), level: 'featured', rating: 4.9, orderCount: 312, tags: ['自驾', '露营', '户外'], priceHourly: 120, priceHalfDay: 500, priceFullDay: 800, bio: '房车旅行达人，走过318川藏线10次，露营老司机。', coverImage: img('guide8-cover', 800, 400), distance: '5.0km', isOnline: false, city: '成都', works: [img('work8a', 200, 200), img('work8b', 200, 200), img('work8c', 200, 200), img('work8d', 200, 200)] },
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

// 聊天列表数据
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

// ==================== 新增：用户数据 ====================
export interface MockUser {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  city: string;
  publishCount: number;
  favoriteCount: number;
  followingCount: number;
  followerCount: number;
  isGuide: boolean;
  guideId?: number;
}

export const MOCK_USERS: MockUser[] = [
  { id: 1, name: '旅小友', avatar: img('user-me', 100, 100), bio: '旅行改变人生，云旅友途改变旅行', city: '杭州', publishCount: 12, favoriteCount: 5, followingCount: 3, followerCount: 28, isGuide: false },
  { id: 2, name: '小李', avatar: img('guide1', 100, 100), bio: '杭州本地人，5年摄影爱好者', city: '杭州', publishCount: 56, favoriteCount: 23, followingCount: 18, followerCount: 312, isGuide: true, guideId: 1 },
  { id: 3, name: '阿花', avatar: img('guide2', 100, 100), bio: '成都土著，吃货本货', city: '成都', publishCount: 34, favoriteCount: 45, followingCount: 12, followerCount: 156, isGuide: true, guideId: 2 },
  { id: 4, name: '大刘', avatar: img('guide3', 100, 100), bio: '10年户外经验，安全第一', city: '张家界', publishCount: 28, favoriteCount: 12, followingCount: 8, followerCount: 489, isGuide: true, guideId: 3 },
  { id: 5, name: '小周', avatar: img('guide4', 100, 100), bio: '历史系研究生，故宫专家', city: '北京', publishCount: 42, favoriteCount: 31, followingCount: 22, followerCount: 267, isGuide: true, guideId: 4 },
  { id: 6, name: '晓晓', avatar: img('guide5', 100, 100), bio: '文艺女青年，咖啡控', city: '厦门', publishCount: 18, favoriteCount: 67, followingCount: 45, followerCount: 89, isGuide: true, guideId: 5 },
  { id: 7, name: '小红', avatar: img('buddy1', 100, 100), bio: '日落收藏家，单反随身带', city: '杭州', publishCount: 8, favoriteCount: 15, followingCount: 6, followerCount: 34, isGuide: false },
  { id: 8, name: '阿杰', avatar: img('buddy2', 100, 100), bio: '周末登山爱好者', city: '杭州', publishCount: 5, favoriteCount: 8, followingCount: 3, followerCount: 12, isGuide: false },
  { id: 9, name: '小美', avatar: img('buddy3', 100, 100), bio: '杭州美食探店达人', city: '杭州', publishCount: 22, favoriteCount: 38, followingCount: 15, followerCount: 67, isGuide: false },
  { id: 10, name: '大鹏', avatar: img('buddy4', 100, 100), bio: '自驾游老司机', city: '杭州', publishCount: 15, favoriteCount: 9, followingCount: 7, followerCount: 45, isGuide: false },
];

// ==================== 新增：评价数据 ====================
export interface Review {
  id: number;
  guideId: number;
  userId: number;
  rating: number;
  content: string;
  time: string;
}

export const MOCK_REVIEWS: Review[] = [
  // 小李的评价 (guideId: 1)
  { id: 1, guideId: 1, userId: 7, rating: 5, content: '小李拍照技术超棒！帮我拍了好多美照，朋友圈都被点赞爆了！', time: '3天前' },
  { id: 2, guideId: 1, userId: 8, rating: 5, content: '非常专业，知道所有拍照的好角度，推荐！', time: '1周前' },
  { id: 3, guideId: 1, userId: 9, rating: 4, content: '人很好很耐心，不过周末人有点多，建议工作日去', time: '2周前' },
  // 阿花的评价 (guideId: 2)
  { id: 4, guideId: 2, userId: 7, rating: 5, content: '跟着阿花吃到了好多本地人才知道的小店！绝了！', time: '5天前' },
  { id: 5, guideId: 2, userId: 10, rating: 5, content: '成都美食天花板！阿花太会选店了', time: '1周前' },
  { id: 6, guideId: 2, userId: 1, rating: 4, content: '很热情，吃的都很地道，值得约', time: '2周前' },
  // 大刘的评价 (guideId: 3)
  { id: 7, guideId: 3, userId: 8, rating: 5, content: '大刘太靠谱了！登山全程照顾，安全感满满', time: '4天前' },
  { id: 8, guideId: 3, userId: 1, rating: 5, content: '专业向导，路线规划得很好，沿途讲解也很精彩', time: '1周前' },
  { id: 9, guideId: 3, userId: 10, rating: 5, content: '走过318的男人，跟着他没错', time: '3周前' },
  // 小周的评价 (guideId: 4)
  { id: 10, guideId: 4, userId: 9, rating: 5, content: '小周讲历史太生动了！故宫在他嘴里活过来了', time: '2天前' },
  { id: 11, guideId: 4, userId: 7, rating: 5, content: '知识量巨大，每个建筑都能说出故事来', time: '5天前' },
  { id: 12, guideId: 4, userId: 1, rating: 5, content: '比导游好太多！强烈推荐历史爱好者约小周', time: '2周前' },
  // 晓晓的评价 (guideId: 5)
  { id: 13, guideId: 5, userId: 7, rating: 4, content: '晓晓带我去的咖啡馆都好有氛围！拍照超出片', time: '3天前' },
  { id: 14, guideId: 5, userId: 9, rating: 5, content: '文艺女青年带路，打卡圣地全知道', time: '1周前' },
  { id: 15, guideId: 5, userId: 1, rating: 4, content: '厦门的文艺之旅，很独特的体验', time: '2周前' },
  // 老张的评价 (guideId: 6)
  { id: 16, guideId: 6, userId: 10, rating: 5, content: '老张英语太好了！商务翻译很专业', time: '4天前' },
  { id: 17, guideId: 6, userId: 1, rating: 5, content: '展会陪同很到位，外国客户沟通很顺畅', time: '1周前' },
  { id: 18, guideId: 6, userId: 8, rating: 4, content: '商务向导首选，只是价格稍高', time: '3周前' },
  // 阿妹的评价 (guideId: 7)
  { id: 19, guideId: 7, userId: 7, rating: 5, content: '阿妹组局太强了！密室玩得超嗨', time: '2天前' },
  { id: 20, guideId: 7, userId: 8, rating: 4, content: '剧本杀达人，带节奏很稳', time: '5天前' },
  { id: 21, guideId: 7, userId: 1, rating: 4, content: '组局方便，就是时间有点难约', time: '1周前' },
  // 王哥的评价 (guideId: 8)
  { id: 22, guideId: 8, userId: 10, rating: 5, content: '跟着王哥露营太爽了！装备齐全，还教搭帐篷', time: '3天前' },
  { id: 23, guideId: 8, userId: 8, rating: 5, content: '318老司机，安全又刺激', time: '1周前' },
  { id: 24, guideId: 8, userId: 1, rating: 5, content: '房车露营体验太棒了！王哥超靠谱', time: '2周前' },
];

// ==================== 新增：聊天消息数据 ====================
export interface ChatMessage {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
  type: 'text';
  time: string;
  isMe: boolean;
}

export const MOCK_MESSAGES: ChatMessage[] = [
  // 与小李的对话 (chatId: 2)
  { id: 1, chatId: 2, senderId: 2, content: '嗨！我是小李，杭州摄影向导 📸', type: 'text', time: '14:00', isMe: false },
  { id: 2, chatId: 2, senderId: 0, content: '你好小李！我想预约下午的拍照服务', type: 'text', time: '14:02', isMe: true },
  { id: 3, chatId: 2, senderId: 2, content: '好的呀！下午2点断桥见，光线最好～', type: 'text', time: '14:03', isMe: false },
  { id: 4, chatId: 2, senderId: 0, content: '需要我自己带相机吗？', type: 'text', time: '14:05', isMe: true },
  { id: 5, chatId: 2, senderId: 2, content: '不用！我带了两台，一台上长焦一台广角，帮你拍出大片感 😎', type: 'text', time: '14:06', isMe: false },
  { id: 6, chatId: 2, senderId: 2, content: '好的，我们下午2点断桥见！', type: 'text', time: '09:15', isMe: false },

  // 与小红的对话 (chatId: 3)
  { id: 7, chatId: 3, senderId: 7, content: '嗨～我看到你也想去西湖拍日落', type: 'text', time: '10:00', isMe: false },
  { id: 8, chatId: 3, senderId: 0, content: '对呀！你带了相机吗？', type: 'text', time: '10:02', isMe: true },
  { id: 9, chatId: 3, senderId: 7, content: '我带了单反，可以帮你拍照哦', type: 'text', time: '10:05', isMe: false },

  // 与阿杰的对话 (chatId: 4)
  { id: 10, chatId: 4, senderId: 8, content: '明天灵隐寺约起！', type: 'text', time: '16:00', isMe: false },
  { id: 11, chatId: 4, senderId: 0, content: '好呀，几点集合？', type: 'text', time: '16:05', isMe: true },
  { id: 12, chatId: 4, senderId: 8, content: '明天灵隐寺见，我带了登山杖', type: 'text', time: '16:10', isMe: false },

  // 与阿花的对话 (chatId: 5)
  { id: 13, chatId: 5, senderId: 3, content: '来成都一定要吃火锅！', type: 'text', time: '11:00', isMe: false },
  { id: 14, chatId: 5, senderId: 0, content: '推荐哪家？不要太辣的', type: 'text', time: '11:05', isMe: true },
  { id: 15, chatId: 5, senderId: 3, content: '推荐你去建设路那家串串，本地人最爱', type: 'text', time: '11:08', isMe: false },

  // 与小周的对话 (chatId: 6)
  { id: 16, chatId: 6, senderId: 5, content: '故宫讲解可以约明天上午', type: 'text', time: '09:00', isMe: false },
  { id: 17, chatId: 6, senderId: 0, content: '好的！上午几点开始比较好？', type: 'text', time: '09:05', isMe: true },
  { id: 18, chatId: 6, senderId: 5, content: '9点开门就去，人少拍照好，讲解也清静', type: 'text', time: '09:08', isMe: false },
];

// 再导出 MOCK_CONTENTS，方便二级页面使用
export { MOCK_CONTENTS } from './contents';
