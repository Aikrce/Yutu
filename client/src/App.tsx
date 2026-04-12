import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from './components/common/Avatar';
import {
  CloudSearch, CloudLocation, CloudHeart, CloudStar, CloudBell,
  CloudMessage, CloudBuddy, CloudWallet, CloudShield,
  CloudSettings, CloudShare, CloudCheck,
} from './components/icons/CloudIcons';
import { Home, Compass, PlusCircle, MessageCircle, User, MapPin, ChevronRight, Clock, Users, Camera, ImagePlus } from 'lucide-react';
import { MOCK_CONTENTS, type ContentItem } from './data/contents';
import { MOCK_GUIDES, MOCK_BUDDIES, MOCK_CHATS, MOCK_ORDERS, type Guide, type Buddy } from './data/mock';

const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'spot', label: '景点' },
  { key: 'food', label: '美食' },
  { key: 'camping', label: '露营' },
  { key: 'escape', label: '密室' },
  { key: 'city', label: '城市' },
  { key: 'business', label: '商务' },
];

// ==================== 开屏页 ====================
function SplashPage({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[200] bg-primary flex flex-col items-center justify-center">
      <div className="animate-bounce mb-6">
        <svg width="120" height="100" viewBox="0 0 300 200">
          <path d="M64 180 C20 180 0 150 0 120 C0 80 30 60 60 55 C55 25 80 0 120 0 C155 0 180 20 185 50 C195 35 215 28 235 35 C260 45 268 70 260 90 C280 85 300 100 300 125 C300 155 275 180 245 180 Z" fill="white" opacity="0.95"/>
          <circle cx="105" cy="105" r="8" fill="#1E293B"/>
          <circle cx="185" cy="105" r="8" fill="#1E293B"/>
          <circle cx="107" cy="103" r="3" fill="white"/>
          <circle cx="187" cy="103" r="3" fill="white"/>
          <ellipse cx="80" cy="125" rx="12" ry="8" fill="#FCA5A5" opacity="0.6"/>
          <ellipse cx="210" cy="125" rx="12" ry="8" fill="#FCA5A5" opacity="0.6"/>
          <path d="M120 130 Q145 155 170 130" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>
      <h1 className="text-[32px] font-bold text-white tracking-wider mb-2">云旅友途</h1>
      <p className="text-primary-100 text-[15px]">陪你玩转每一段旅途</p>
      <div className="mt-12 w-32 h-1 bg-primary-700 rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full" style={{ animation: 'loading 2s ease-in-out forwards' }} />
      </div>
      <style>{`@keyframes loading { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );
}

// ==================== 瀑布流首页 ====================
function HomePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(20);

  const filteredContents = category === 'all'
    ? MOCK_CONTENTS
    : MOCK_CONTENTS.filter(c => c.category === category);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
        setDisplayCount(prev => Math.min(prev + 10, filteredContents.length));
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [filteredContents.length]);

  useEffect(() => { setDisplayCount(20); }, [category]);

  const visibleContents = filteredContents.slice(0, displayCount);
  const leftCol = visibleContents.filter((_, i) => i % 2 === 0);
  const rightCol = visibleContents.filter((_, i) => i % 2 === 1);

  return (
    <div className="pb-2">
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-divider"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 8px)' }}>
        <div className="px-4 pt-2 pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M17.5 19a4.5 4.5 0 1 0 0-9 4.47 4.47 0 0 0-1.09.14A5.48 5.48 0 0 0 6.5 10 5.5 5.5 0 1 0 6.5 21h11z"/>
                </svg>
              </div>
              <span className="text-[18px] font-bold text-primary">云旅友途</span>
            </div>
            <div className="flex items-center gap-3">
              <CloudBell size={20} />
              <Avatar name="旅小友" size="sm" onlineStatus="online" onClick={() => navigate('/user/1')} />
            </div>
          </div>
          <div className="flex items-center bg-background rounded-lg px-3 py-2 gap-2">
            <CloudSearch size={18} />
            <span className="text-text-tertiary text-[14px]">搜索目的地、景点、美食...</span>
          </div>
        </div>
        <div className="flex gap-1.5 px-4 py-2.5 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => setCategory(cat.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-fast
                ${category === cat.key ? 'bg-primary text-white shadow-sm' : 'bg-background text-text-secondary active:bg-gray-100'}`}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-1">
        <span className="text-[11px] text-text-tertiary">
          {filteredContents.length > 0 ? `共 ${filteredContents.length} 条内容` : '暂无内容'}
        </span>
      </div>

      <div className="px-2.5">
        <div className="flex gap-2.5">
          <div className="flex-1 flex flex-col gap-2.5">
            {leftCol.map(item => <ContentCard key={item.id} item={item} onClick={() => navigate(`/content/${item.id}`)} />)}
          </div>
          <div className="flex-1 flex flex-col gap-2.5">
            {rightCol.map(item => <ContentCard key={item.id} item={item} onClick={() => navigate(`/content/${item.id}`)} />)}
          </div>
        </div>
      </div>

      {displayCount < filteredContents.length && (
        <div className="py-4 text-center text-[13px] text-text-tertiary">加载更多...</div>
      )}
    </div>
  );
}

// ==================== 内容卡片 ====================
function ContentCard({ item, onClick }: { item: ContentItem; onClick?: () => void }) {
  const navigate = useNavigate();
  const categoryLabel = CATEGORIES.find(c => c.key === item.category)?.label || '';
  return (
    <div className="bg-card rounded-md overflow-hidden shadow-card touch-feedback active:scale-[0.97] transition-fast" onClick={onClick}>
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full object-cover bg-gray-100"
          style={{ height: 120 + (item.id % 3) * 40 }} loading="lazy" />
        <span className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-full">
          {categoryLabel}
        </span>
      </div>
      <div className="p-2.5">
        <h3 className="text-[14px] font-semibold text-text-primary line-clamp-2 leading-snug mb-1.5">{item.title}</h3>
        <div className="flex items-center gap-1 text-[11px] text-text-tertiary mb-2">
          <CloudLocation size={11} /><span>{item.location}</span>
        </div>
        {item.hasCompanion && (
          <div className="flex gap-1.5 mb-2">
            <button className="flex-1 bg-success/10 text-success text-[11px] font-medium py-1 rounded-full active:opacity-70">求搭子</button>
            <button className="flex-1 bg-primary/10 text-primary text-[11px] font-medium py-1 rounded-full active:opacity-70" onClick={(e) => { e.stopPropagation(); navigate(`/guide/1`); }}>找向导</button>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Avatar name={item.userName} size="xs" />
            <span className="text-[11px] text-text-secondary max-w-[60px] truncate">{item.userName}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-text-tertiary">
            <span className="flex items-center gap-0.5"><CloudHeart size={11} /> {item.likes}</span>
            <span className="flex items-center gap-0.5"><CloudMessage size={11} /> {item.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== 发现页 ====================
function ExplorePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'buddy' | 'guide'>('buddy');
  const [guideFilter, setGuideFilter] = useState('全部');

  const guideTags = ['全部', '摄影', '美食', '徒步', '历史', '文艺', '商务', '密室'];
  const filteredGuides = guideFilter === '全部' ? MOCK_GUIDES : MOCK_GUIDES.filter(g => g.tags.includes(guideFilter));

  return (
    <div style={{ paddingTop: 'max(env(safe-area-inset-top), 8px)' }}>
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center bg-background rounded-lg px-3 py-2.5 gap-2">
          <CloudSearch size={18} />
          <span className="text-text-tertiary text-[14px]">搜索搭子、向导、目的地...</span>
        </div>
      </div>

      {/* 双Tab切换 */}
      <div className="flex px-4 mb-3">
        <button onClick={() => setActiveTab('buddy')}
          className={`flex-1 py-2 text-[15px] font-semibold text-center border-b-2 transition-fast
            ${activeTab === 'buddy' ? 'text-primary border-primary' : 'text-text-tertiary border-transparent'}`}>
          附近搭子
        </button>
        <button onClick={() => setActiveTab('guide')}
          className={`flex-1 py-2 text-[15px] font-semibold text-center border-b-2 transition-fast
            ${activeTab === 'guide' ? 'text-primary border-primary' : 'text-text-tertiary border-transparent'}`}>
          精选向导
        </button>
      </div>

      {activeTab === 'buddy' ? (
        <div className="px-4 space-y-3">
          {MOCK_BUDDIES.map(buddy => <BuddyCard key={buddy.id} buddy={buddy} onNavigate={navigate} />)}
        </div>
      ) : (
        <div>
          <div className="flex gap-1.5 px-4 py-2 overflow-x-auto scrollbar-hide">
            {guideTags.map(tag => (
              <button key={tag} onClick={() => setGuideFilter(tag)}
                className={`shrink-0 px-3 py-1 rounded-full text-[12px] font-medium transition-fast
                  ${guideFilter === tag ? 'bg-primary text-white' : 'bg-background text-text-secondary'}`}>
                {tag}
              </button>
            ))}
          </div>
          <div className="px-4 space-y-3 mt-2">
            {filteredGuides.map(guide => <GuideCard key={guide.id} guide={guide} onNavigate={navigate} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function BuddyCard({ buddy, onNavigate }: { buddy: Buddy; onNavigate: ReturnType<typeof useNavigate> }) {
  return (
    <div className="bg-card rounded-md p-3 shadow-card touch-feedback">
      <div className="flex gap-3">
        <Avatar name={buddy.name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[15px] font-semibold text-text-primary">{buddy.name}</span>
            <span className="text-[11px] text-text-tertiary">{buddy.gender} · {buddy.age}岁</span>
            <span className="text-[11px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">{buddy.distance}</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-text-secondary mb-1">
            <MapPin size={12} className="text-primary" />
            <span>{buddy.destination}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-text-tertiary mb-2">
            <span className="flex items-center gap-1"><Clock size={11} /> {buddy.time}</span>
            <span className="flex items-center gap-1"><Users size={11} /> {buddy.groupSize}</span>
          </div>
          <p className="text-[13px] text-text-secondary line-clamp-1">{buddy.bio}</p>
          <div className="flex gap-1.5 mt-2">
            {buddy.tags.map(tag => (
              <span key={tag} className="text-[10px] bg-background text-text-secondary px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3 pt-2 border-t border-divider">
        <button className="flex-1 py-1.5 text-[13px] font-medium text-primary bg-primary/10 rounded-full active:opacity-70">打招呼</button>
        <button className="flex-1 py-1.5 text-[13px] font-medium text-white bg-primary rounded-full active:opacity-70" onClick={() => onNavigate(`/user/${buddy.id + 6}`)}>一起玩</button>
      </div>
    </div>
  );
}

function GuideCard({ guide, onNavigate }: { guide: Guide; onNavigate: ReturnType<typeof useNavigate> }) {
  return (
    <div className="bg-card rounded-md overflow-hidden shadow-card touch-feedback" onClick={() => onNavigate(`/guide/${guide.id}`)}>
      <div className="relative h-28">
        <img src={guide.coverImage} alt={guide.name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-3 flex items-center gap-2">
          <Avatar name={guide.name} size="sm" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-bold text-white">{guide.name}</span>
              {guide.level === 'featured' && (
                <span className="text-[10px] bg-accent text-white px-1.5 py-0.5 rounded-full font-medium">精选</span>
              )}
              {guide.level === 'newcomer' && (
                <span className="text-[10px] bg-success/80 text-white px-1.5 py-0.5 rounded-full font-medium">新人</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/80">
              <span className="flex items-center gap-0.5"><CloudStar size={11} /> {guide.rating}</span>
              <span>{guide.orderCount}单</span>
              <span>{guide.distance}</span>
              {guide.isOnline && <span className="text-success">在线</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-[13px] text-text-secondary line-clamp-2 mb-2">{guide.bio}</p>
        <div className="flex gap-1.5 mb-2">
          {guide.tags.map(tag => (
            <span key={tag} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-bold text-accent">¥{guide.priceHourly}<span className="text-[11px] font-normal text-text-tertiary">/小时</span></span>
          <button className="px-4 py-1.5 bg-primary text-white text-[13px] font-medium rounded-full active:opacity-70" onClick={(e) => { e.stopPropagation(); onNavigate(`/guide/${guide.id}`); }}>立即预约</button>
        </div>
      </div>
    </div>
  );
}

// ==================== 消息页 ====================
function ChatPage() {
  const navigate = useNavigate();
  return (
    <div style={{ paddingTop: 'max(env(safe-area-inset-top), 8px)' }}>
      <div className="px-4 pt-2 pb-2">
        <h1 className="text-[20px] font-bold text-text-primary mb-3">消息</h1>
        <div className="flex items-center bg-background rounded-lg px-3 py-2.5 gap-2">
          <CloudSearch size={18} />
          <span className="text-text-tertiary text-[14px]">搜索联系人</span>
        </div>
      </div>
      <div className="px-4">
        {MOCK_CHATS.map(chat => (
          <div key={chat.id} className="flex items-center gap-3 py-3 border-b border-divider touch-feedback"
            onClick={() => chat.type === 'user' && navigate(`/chat/${chat.id}`)}>
            {chat.type === 'system' ? (
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <CloudBell size={20} />
              </div>
            ) : (
              <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover shrink-0" loading="lazy" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-medium text-text-primary">{chat.name}</span>
                  {chat.isGuide && chat.rating && (
                    <span className="text-[10px] bg-accent/10 text-accent px-1 py-0.5 rounded-full">⭐{chat.rating}</span>
                  )}
                </div>
                <span className="text-[11px] text-text-tertiary shrink-0">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-text-secondary line-clamp-1 flex-1">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="ml-2 shrink-0 w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">{chat.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== 我的页 ====================
function ProfilePage() {
  const navigate = useNavigate();
  const [showOrders, setShowOrders] = useState(false);
  const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: '待支付', color: 'text-warning' },
    paid: { label: '待服务', color: 'text-primary' },
    serving: { label: '服务中', color: 'text-success' },
    completed: { label: '已完成', color: 'text-text-tertiary' },
    cancelled: { label: '已取消', color: 'text-text-tertiary' },
  };

  return (
    <div style={{ paddingTop: 'max(env(safe-area-inset-top), 8px)' }}>
      <div className="bg-primary px-4 py-6 rounded-b-2xl">
        <div className="flex items-center gap-3">
          <Avatar name="旅小友" size="xl" onlineStatus="online" onClick={() => navigate('/user/1')} />
          <div>
            <h2 className="text-[18px] font-bold text-white">旅小友</h2>
            <p className="text-[13px] text-primary-100">ID: 10086 · 杭州</p>
          </div>
        </div>
        <div className="flex justify-around mt-4">
          <div className="text-center"><p className="text-[18px] font-bold text-white">12</p><p className="text-[11px] text-primary-100">发布</p></div>
          <div className="text-center"><p className="text-[18px] font-bold text-white">5</p><p className="text-[11px] text-primary-100">收藏</p></div>
          <div className="text-center"><p className="text-[18px] font-bold text-white">3</p><p className="text-[11px] text-primary-100">关注</p></div>
          <div className="text-center"><p className="text-[18px] font-bold text-white">28</p><p className="text-[11px] text-primary-100">粉丝</p></div>
        </div>
      </div>

      {/* 订单快捷入口 */}
      <div className="px-4 mt-4">
        <div className="bg-card rounded-md p-3 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[15px] font-semibold text-text-primary">我的订单</span>
            <button onClick={() => setShowOrders(!showOrders)} className="text-[12px] text-primary flex items-center gap-0.5">
              全部订单 <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: '待支付', count: MOCK_ORDERS.filter(o => o.status === 'pending').length, color: 'text-warning' },
              { label: '待服务', count: MOCK_ORDERS.filter(o => o.status === 'paid').length, color: 'text-primary' },
              { label: '已完成', count: MOCK_ORDERS.filter(o => o.status === 'completed').length, color: 'text-success' },
              { label: '已取消', count: 0, color: 'text-text-tertiary' },
            ].map(item => (
              <button key={item.label} className="flex flex-col items-center gap-1 py-1 touch-feedback">
                <span className={`text-[18px] font-bold ${item.color}`}>{item.count}</span>
                <span className="text-[11px] text-text-secondary">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 订单列表（展开时显示） */}
      {showOrders && (
        <div className="px-4 mt-2 space-y-2">
          {MOCK_ORDERS.map(order => (
            <div key={order.id} className="bg-card rounded-md p-3 shadow-card">
              <div className="flex items-center gap-2.5 mb-2">
                <img src={order.guideAvatar} alt={order.guideName} className="w-8 h-8 rounded-full object-cover" loading="lazy" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-medium text-text-primary">{order.guideName}</span>
                    <span className={`text-[12px] font-medium ${statusMap[order.status].color}`}>{statusMap[order.status].label}</span>
                  </div>
                  <p className="text-[12px] text-text-secondary">{order.service} · {order.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-divider">
                <span className="text-[15px] font-bold text-accent">¥{order.amount}</span>
                {order.status === 'paid' && (
                  <button className="px-3 py-1 text-[12px] text-primary bg-primary/10 rounded-full active:opacity-70">联系向导</button>
                )}
                {order.status === 'completed' && (
                  <button className="px-3 py-1 text-[12px] text-primary bg-primary/10 rounded-full active:opacity-70">去评价</button>
                )}
                {order.status === 'pending' && (
                  <button className="px-3 py-1 text-[12px] text-white bg-primary rounded-full active:opacity-70">去支付</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 功能菜单 */}
      <div className="px-4 mt-4 space-y-1">
        {[
          { Icon: CloudBuddy, label: '我的搭子', desc: '3个进行中' },
          { Icon: CloudStar, label: '成为向导', desc: '申请认证' },
          { Icon: CloudWallet, label: '我的钱包', desc: '余额 ¥128.00' },
          { Icon: CloudShare, label: '邀请好友', desc: '赚现金奖励' },
          { Icon: CloudShield, label: '安全中心', desc: '一键报警 · 行程分享' },
          { Icon: CloudSettings, label: '设置', desc: '' },
        ].map(({ Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-3 py-3 px-2 bg-card rounded-md touch-feedback">
            <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon size={18} />
            </div>
            <div className="flex-1">
              <span className="text-[14px] text-text-primary">{label}</span>
              {desc && <p className="text-[11px] text-text-tertiary">{desc}</p>}
            </div>
            <ChevronRight size={16} className="text-text-tertiary" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== 发布页 ====================
function PublishPage({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [publishType, setPublishType] = useState<'photo' | 'buddy' | 'guide'>('photo');

  if (step === 'select') {
    return (
      <div className="fixed inset-0 z-[100] flex items-end justify-center" onClick={onClose}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative w-full max-w-[430px] bg-card rounded-t-2xl p-5 pb-8" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 32px)' }}
          onClick={e => e.stopPropagation()}>
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
          <h3 className="text-[17px] font-semibold text-text-primary text-center mb-5">选择发布类型</h3>
          <div className="space-y-3">
            {[
              { type: 'photo' as const, icon: <Camera size={22} className="text-primary" />, title: '发图文', desc: '分享景点、美食、体验' },
              { type: 'buddy' as const, icon: <CloudBuddy size={22} />, title: '找搭子', desc: '找人一起玩' },
              { type: 'guide' as const, icon: <CloudStar size={22} />, title: '当向导', desc: '申请成为向导' },
            ].map(item => (
              <button key={item.type} onClick={() => { setPublishType(item.type); setStep('form'); }}
                className="w-full flex items-center gap-3 p-3 bg-background rounded-xl touch-feedback active:scale-[0.98] transition-fast">
                <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center shrink-0">{item.icon}</div>
                <div className="text-left">
                  <p className="text-[15px] font-semibold text-text-primary">{item.title}</p>
                  <p className="text-[12px] text-text-secondary">{item.desc}</p>
                </div>
                <ChevronRight size={18} className="text-text-tertiary ml-auto" />
              </button>
            ))}
          </div>
          <button onClick={onClose} className="w-full mt-4 py-2.5 text-[15px] text-text-secondary">取消</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background" style={{ paddingTop: 'max(env(safe-area-inset-top), 0px)' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-divider">
        <button onClick={() => setStep('select')} className="text-[15px] text-text-secondary">取消</button>
        <span className="text-[16px] font-semibold text-text-primary">
          {publishType === 'photo' ? '发布图文' : publishType === 'buddy' ? '找搭子' : '申请向导'}
        </span>
        <button className="text-[15px] text-primary font-semibold">发布</button>
      </div>
      <div className="px-4 py-4">
        {publishType === 'photo' && (
          <>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <ImagePlus size={24} className="text-gray-400" />
                </div>
              ))}
              <div className="w-24 h-24 bg-primary/5 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
                <div className="text-center">
                  <PlusCircle size={20} className="text-primary mx-auto" />
                  <span className="text-[10px] text-primary">添加图片</span>
                </div>
              </div>
            </div>
            <input type="text" placeholder="添加标题（必填）" className="w-full text-[16px] font-semibold text-text-primary placeholder:text-text-tertiary py-2 border-b border-divider mb-3" />
            <textarea placeholder="添加描述（选填）" rows={4} className="w-full text-[14px] text-text-primary placeholder:text-text-tertiary py-2 resize-none" />
            <div className="mt-4 space-y-3">
              <button className="flex items-center gap-2 w-full py-3 border-b border-divider">
                <CloudLocation size={18} /><span className="text-[14px] text-text-secondary">添加位置</span>
              </button>
              <button className="flex items-center gap-2 w-full py-3 border-b border-divider">
                <CloudStar size={18} /><span className="text-[14px] text-text-secondary">添加标签</span>
              </button>
              <div className="flex items-center justify-between py-3">
                <span className="text-[14px] text-text-secondary flex items-center gap-2"><CloudBuddy size={18} /> 求搭子</span>
                <div className="w-10 h-6 bg-gray-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow" /></div>
              </div>
            </div>
          </>
        )}
        {publishType === 'buddy' && (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] text-text-tertiary mb-1 block">目的地</label>
                <input type="text" placeholder="去哪里玩？" className="w-full text-[15px] py-2 border-b border-divider text-text-primary" />
              </div>
              <div>
                <label className="text-[13px] text-text-tertiary mb-1 block">时间</label>
                <input type="text" placeholder="什么时候去？" className="w-full text-[15px] py-2 border-b border-divider text-text-primary" />
              </div>
              <div>
                <label className="text-[13px] text-text-tertiary mb-1 block">人数</label>
                <div className="flex gap-2">
                  {['2人', '3-4人', '5人+'].map(n => (
                    <button key={n} className="px-4 py-1.5 bg-primary/10 text-primary text-[13px] rounded-full">{n}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[13px] text-text-tertiary mb-1 block">兴趣标签</label>
                <div className="flex flex-wrap gap-2">
                  {['摄影', '美食', '徒步', '密室', '购物', '文艺', '自驾', '露营'].map(tag => (
                    <button key={tag} className="px-3 py-1 bg-background text-text-secondary text-[12px] rounded-full">{tag}</button>
                  ))}
                </div>
              </div>
              <textarea placeholder="说点什么，吸引搭子来..." rows={3} className="w-full text-[14px] py-2 resize-none border border-divider rounded-lg p-2" />
            </div>
            <button className="w-full mt-6 py-3 bg-primary text-white text-[16px] font-semibold rounded-xl active:opacity-70">发布找搭子</button>
          </>
        )}
        {publishType === 'guide' && (
          <div className="text-center py-8">
            <CloudStar size={48} className="mx-auto mb-4" />
            <h3 className="text-[18px] font-bold text-text-primary mb-2">成为云旅友途向导</h3>
            <p className="text-[14px] text-text-secondary mb-6">分享你的专业知识，陪旅友玩转目的地</p>
            <div className="text-left space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <CloudCheck size={20} className="text-success shrink-0 mt-0.5" />
                <div><p className="text-[14px] font-medium text-text-primary">实名认证</p><p className="text-[12px] text-text-tertiary">需提供身份证信息</p></div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <CloudCheck size={20} className="text-success shrink-0 mt-0.5" />
                <div><p className="text-[14px] font-medium text-text-primary">技能认证</p><p className="text-[12px] text-text-tertiary">至少一项专业标签</p></div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background rounded-lg">
                <CloudCheck size={20} className="text-success shrink-0 mt-0.5" />
                <div><p className="text-[14px] font-medium text-text-primary">灵活收入</p><p className="text-[12px] text-text-tertiary">自由定价，按单结算</p></div>
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-white text-[16px] font-semibold rounded-xl active:opacity-70">开始申请</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== 底部Tab ====================
function TabBar({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  const tabs = [
    { key: 'home', label: '首页', Icon: Home },
    { key: 'explore', label: '发现', Icon: Compass },
    { key: 'publish', label: '发布', Icon: PlusCircle, center: true },
    { key: 'chat', label: '消息', Icon: MessageCircle },
    { key: 'profile', label: '我的', Icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white/95 backdrop-blur-md border-t border-divider"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 4px)' }}>
      <div className="flex items-center justify-around h-12">
        {tabs.map(({ key, label, Icon, center }) => {
          const isActive = active === key;
          if (center) return (
            <button key={key} onClick={() => onChange(key)} className="touch-feedback relative -top-3">
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg" style={{ boxShadow: '0 4px 12px rgba(59,130,246,0.4)' }}>
                <Icon size={22} className="text-white" />
              </div>
            </button>
          );
          return (
            <button key={key} onClick={() => onChange(key)}
              className={`touch-feedback flex flex-col items-center justify-center gap-0.5 min-w-[44px] ${isActive ? 'text-primary' : 'text-text-tertiary'}`}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px]">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ==================== App主入口 ====================
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showPublish, setShowPublish] = useState(false);

  const handleSplashFinish = useCallback(() => setShowSplash(false), []);
  const handleTabChange = useCallback((tab: string) => {
    if (tab === 'publish') {
      setShowPublish(true);
    } else {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {showSplash && <SplashPage onFinish={handleSplashFinish} />}
      <div className={`transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'explore' && <ExplorePage />}
        {activeTab === 'chat' && <ChatPage />}
        {activeTab === 'profile' && <ProfilePage />}
        <TabBar active={activeTab} onChange={handleTabChange} />
      </div>
      {showPublish && <PublishPage onClose={() => setShowPublish(false)} />}
    </div>
  );
}

export default App;
