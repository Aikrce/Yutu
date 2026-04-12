// 向导详情页各种主题的组件实现
import { useNavigate } from 'react-router-dom';
import { SubNavBar, SlideInPage } from '../../components/layout/SubNavBar';
import { CloudStar, CloudMessage } from '../../components/icons/CloudIcons';
import { Avatar } from '../../components/common/Avatar';
import { MOCK_USERS } from '../../data/mock';
import type { Guide, Review } from '../../data/mock';

interface PriceOption {
  key: 'hourly' | 'halfDay' | 'fullDay';
  label: string;
  price: number;
}

interface DetailProps {
  guide: Guide;
  backUrl: string;
  reviews: Review[];
  prices: PriceOption[];
  priceType: 'hourly' | 'halfDay' | 'fullDay';
  setPriceType: (v: 'hourly' | 'halfDay' | 'fullDay') => void;
  showBooking: boolean;
  setShowBooking: (v: boolean) => void;
  bookDate: string;
  setBookDate: (v: string) => void;
  bookTime: string;
  setBookTime: (v: string) => void;
}

interface DaySchedule {
  day: number;
  items: { time: string; activity: string }[];
}

interface ServiceItem {
  title: string;
  items: string[];
}
export function DefaultDetail({ guide, backUrl, reviews, prices, priceType, setPriceType, showBooking, setShowBooking, bookDate, setBookDate, bookTime, setBookTime }: DetailProps) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <SubNavBar title="向导详情" />

      {/* 封面图 + 头像覆盖 */}
      <div className="relative">
        <img src={guide.coverImage} alt={guide.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute -bottom-10 left-4 flex items-end gap-3">
          <img src={guide.avatar} alt={guide.name} className="w-20 h-20 rounded-full border-[3px] border-white object-cover shadow-lg" />
          <div className="mb-1">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-bold text-white drop-shadow">{guide.name}</span>
              {guide.level === 'featured' && <span className="text-[10px] bg-accent text-white px-1.5 py-0.5 rounded-full font-medium">精选</span>}
              {guide.level === 'newcomer' && <span className="text-[10px] bg-success/80 text-white px-1.5 py-0.5 rounded-full font-medium">新人</span>}
            </div>
          </div>
        </div>
      </div>

      {/* 数据条 */}
      <div className="mt-12 px-4 py-3 flex items-center justify-around border-b border-divider">
        <div className="text-center"><span className="flex items-center gap-0.5 text-[16px] font-bold text-primary"><CloudStar size={14} /> {guide.rating}</span><span className="text-[11px] text-text-tertiary">评分</span></div>
        <div className="text-center"><p className="text-[16px] font-bold text-text-primary">{guide.orderCount}单</p><span className="text-[11px] text-text-tertiary">完成</span></div>
        <div className="text-center"><p className="text-[16px] font-bold text-text-primary">{guide.distance}</p><span className="text-[11px] text-text-tertiary">距离</span></div>
        <div className="text-center"><span className={`text-[14px] font-semibold ${guide.isOnline ? 'text-success' : 'text-text-tertiary'}`}>{guide.isOnline ? '在线' : '离线'}</span></div>
      </div>

      {/* 技能标签 */}
      <div className="px-4 py-3 border-b border-divider">
        <h3 className="text-[15px] font-semibold text-text-primary mb-2">技能标签</h3>
        <div className="flex flex-wrap gap-2">
          {guide.tags.map((tag: string) => <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-[12px] rounded-full">{tag}</span>)}
        </div>
      </div>

      {/* 关于我 */}
      <div className="px-4 py-3 border-b border-divider">
        <h3 className="text-[15px] font-semibold text-text-primary mb-2">关于我</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed">{guide.bio}</p>
      </div>

      {/* 服务价格 */}
      <div className="px-4 py-3 border-b border-divider">
        <h3 className="text-[15px] font-semibold text-text-primary mb-2">服务价格</h3>
        <div className="flex gap-2">
          {prices.map((p: PriceOption) => (
            <button key={p.key} onClick={() => setPriceType(p.key)}
              className={`flex-1 py-3 rounded-xl text-center transition-fast ${priceType === p.key ? 'bg-primary text-white shadow-sm' : 'bg-background text-text-primary'}`}>
              <p className="text-[13px] font-medium">{p.label}</p>
              <p className="text-[18px] font-bold">¥{p.price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 作品展示 */}
      {guide.works && guide.works.length > 0 && (
        <div className="px-4 py-3 border-b border-divider">
          <h3 className="text-[15px] font-semibold text-text-primary mb-2">作品展示</h3>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {guide.works.map((work: string, i: number) => (
              <img key={i} src={work} alt={`作品${i+1}`} className="w-28 h-28 rounded-lg object-cover shrink-0" loading="lazy" />
            ))}
          </div>
        </div>
      )}

      {/* 用户评价 */}
      <div className="px-4 py-3 pb-24">
        <h3 className="text-[15px] font-semibold text-text-primary mb-2">用户评价 ({guide.orderCount})</h3>
        {reviews.map((review: Review) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-divider last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '用户'} size="xs" />
                <span className="text-[13px] font-medium text-text-primary">{reviewer?.name || '用户'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: unknown, i: number) => <CloudStar key={i} size={12} />)}</div>
                <span className="text-[11px] text-text-tertiary ml-auto">{review.time}</span>
              </div>
              <p className="text-[13px] text-text-secondary">{review.content}</p>
            </div>
          );
        })}
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-divider px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <button onClick={() => navigate(`/chat/2?back=${encodeURIComponent(backUrl)}`)} className="flex-1 py-2.5 bg-primary/10 text-primary text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70">
          <CloudMessage size={18} /> 聊一聊
        </button>
        <button onClick={() => setShowBooking(true)} className="flex-[1.5] py-2.5 bg-primary text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          style={{ boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
          立即预约 ¥{prices.find((p: PriceOption) => p.key === priceType)?.price}
        </button>
      </div>

      {/* 预约时间选择 BottomSheet */}
      {showBooking && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center" onClick={() => setShowBooking(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-[430px] bg-card rounded-t-2xl p-5" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 32px)' }}
            onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <h3 className="text-[17px] font-semibold text-text-primary text-center mb-4">选择预约时间</h3>
            <div className="flex gap-2 mb-4">
              {['今天', '明天', '后天'].map(d => (
                <button key={d} onClick={() => setBookDate(d)}
                  className={`flex-1 py-2 rounded-lg text-[13px] font-medium ${bookDate === d ? 'bg-primary text-white' : 'bg-background text-text-secondary'}`}>{d}</button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(t => (
                <button key={t} onClick={() => setBookTime(t)}
                  className={`py-2 rounded-lg text-[13px] ${bookTime === t ? 'bg-primary text-white' : 'bg-background text-text-secondary'}`}>{t}</button>
              ))}
            </div>
            <button className="w-full py-3 bg-primary text-white text-[16px] font-semibold rounded-xl active:opacity-70">确认预约</button>
          </div>
        </div>
      )}
    </SlideInPage>
  );
}

// 密室逃脱详情页
export function EscapeRoomDetail({ guide, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: '#1A1A2E', minHeight: '100%' }}>
      <SubNavBar title="密室详情" />

      {/* 顶部视频/图片区 */}
      <div className="relative">
        <img src={guide.coverImage} alt={guide.name} className="w-full aspect-[16/9] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-[12px] font-semibold">
          👻 {guide.horrorLevel}
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-[10px] opacity-80 mb-1">真人NPC · 沉浸式</div>
        </div>
      </div>

      {/* 主题信息卡片 */}
      <div className="relative -mt-6 bg-[#16213E] rounded-t-3xl px-4 pt-6 pb-4" style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.3)' }}>
        <h1 className="text-[22px] font-bold text-white mb-2">🔒 密室{guide.name}·{guide.tags[0]}·真人NPC</h1>
        
        {/* 标签行 */}
        <div className="flex flex-wrap gap-2 mb-3">
          {guide.horrorLevel && <span className="px-2 py-1 bg-orange-500 text-white text-[11px] rounded-full">👻 {guide.horrorLevel}</span>}
          {guide.tags.map((tag: string, i: number) => (
            <span key={i} className="px-2 py-1 bg-[#6B46C1] text-white text-[11px] rounded-full">{tag}</span>
          ))}
          {guide.groupSize && <span className="px-2 py-1 bg-sky-500 text-white text-[11px] rounded-full">👥 {guide.groupSize}</span>}
        </div>

        {/* 基础信息 */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-[13px] text-gray-300">
            <span>⏱️ {guide.duration}</span>
            <span>难度 {'⭐'.repeat(guide.difficulty || 0)}</span>
          </div>
          <div className="text-[13px] text-gray-300">📍 {guide.location}</div>
        </div>

        {/* 剧情简介 */}
        <p className="text-[13px] text-gray-400 leading-relaxed mb-3 line-clamp-2">{guide.bio}</p>

        {/* 特色标签 */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {guide.features?.map((feature: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-[#1A1A2E] text-gray-300 text-[12px] rounded-full whitespace-nowrap">{feature}</span>
          ))}
        </div>
      </div>

      {/* 价格 */}
      <div className="bg-[#16213E] px-4 py-3 border-b border-[#2D3748]">
        <div className="flex items-center justify-between">
          <span className="text-[24px] font-bold text-orange-500">¥{guide.pricePerPerson}/人</span>
          <span className="text-[13px] text-gray-400">已服务 {guide.orderCount} 次</span>
        </div>
      </div>

      {/* 坦克车主信息 */}
      <div className="bg-[#16213E] px-4 py-4 border-b border-[#2D3748]">
        <div className="flex items-start gap-3 mb-3">
          <img src={guide.avatar} alt={guide.name} className="w-20 h-20 rounded-full border-[3px] border-[#6B46C1] object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[18px] font-bold text-white">{guide.name}🎭</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {guide.certifications?.map((cert: string, i: number) => (
                <span key={i} className="px-2 py-0.5 border border-[#6B46C1] text-[#6B46C1] text-[10px] rounded">{cert}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[13px] text-gray-400 leading-relaxed">{guide.bio}</p>
      </div>

      {/* 用户评价 */}
      <div className="bg-[#16213E] px-4 py-3">
        <h3 className="text-[15px] font-semibold text-white mb-3">玩家评价</h3>
        {reviews.slice(0, 2).map((review: Review) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-[#2D3748] last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '玩家'} size="xs" />
                <span className="text-[13px] font-medium text-white">{reviewer?.name || '玩家'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: unknown, i: number) => <CloudStar key={i} size={12} color="#FF6B35" />)}</div>
                <span className="text-[11px] text-gray-500 ml-auto">{review.time}</span>
              </div>
              <p className="text-[13px] text-gray-400">{review.content}</p>
            </div>
          );
        })}
      </div>

      {/* 安全提示 */}
      {guide.warning && (
        <div className="bg-orange-500 px-4 py-3">
          <p className="text-[13px] text-white">⚠️ {guide.warning}</p>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-[#16213E] border-t border-[#2D3748] px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <button onClick={() => navigate(`/chat/2?back=${encodeURIComponent(backUrl)}`)} className="flex-1 py-2.5 border-2 border-[#6B46C1] text-[#6B46C1] text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70">
          <CloudMessage size={18} /> 咨询坦克
        </button>
        <button className="flex-[1.5] py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          style={{ boxShadow: '0 4px 12px rgba(255,107,53,0.4)' }}>
          加入队伍 ¥{guide.pricePerPerson}
        </button>
      </div>
      </div>
    </SlideInPage>
  );
}

// 露营组队详情页
export function CampingDetail({ guide, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: '#F5F5DC', minHeight: '100%' }}>
      <SubNavBar title="露营详情" />

      {/* 顶部大图区 */}
      <div className="relative">
        <img src={guide.coverImage} alt={guide.name} className="w-full aspect-[16/9] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* 活动信息卡片 */}
      <div className="relative -mt-6 bg-white rounded-t-3xl px-4 pt-6 pb-4" style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
        <h1 className="text-[20px] font-bold text-[#2D5A3D] mb-2">⛺ {guide.name}·安吉小杭坑·周末出逃</h1>
        
        {/* 标签行 */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-[#2D5A3D] text-white text-[11px] rounded-full">⛺ 露营</span>
          <span className="px-2 py-1 bg-orange-500 text-white text-[11px] rounded-full">🔥 篝火晚会</span>
          {guide.features?.map((feature: string, i: number) => (
            <span key={i} className="px-2 py-1 bg-purple-500 text-white text-[11px] rounded-full">{feature}</span>
          ))}
        </div>

        {/* 基础信息 */}
        <div className="space-y-2 mb-3">
          <div className="text-[13px] text-gray-600">🕒 {guide.duration}</div>
          <div className="text-[13px] text-gray-600">📍 {guide.location}</div>
          <div className="text-[13px] text-gray-600">👥 {guide.groupSize}</div>
        </div>

        {/* 价格 */}
        <div className="text-[24px] font-bold text-[#2D5A3D]">¥{guide.pricePerPerson}/人</div>
        <div className="text-[12px] text-gray-500 mt-1">含装备+餐食+保险</div>
      </div>

      {/* 领队信息 */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-3">
          <img src={guide.avatar} alt={guide.name} className="w-20 h-20 rounded-full border-[3px] border-[#2D5A3D] object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[18px] font-bold text-[#2D5A3D]">{guide.name}🏕️</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {guide.certifications?.slice(0, 3).map((cert: string, i: number) => (
                <span key={i} className="px-2 py-0.5 border border-[#2D5A3D] text-[#2D5A3D] text-[10px] rounded">{cert}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed">{guide.bio}</p>
      </div>

      {/* 行程详情 */}
      {guide.schedule && (
        <div className="bg-[#F5F5DC] px-4 py-4">
          <h3 className="text-[15px] font-semibold text-[#2D5A3D] mb-3">行程安排</h3>
          {guide.schedule.map((day: DaySchedule) => (
            <div key={day.day} className="mb-4">
              <div className="text-[14px] font-bold text-[#2D5A3D] mb-2">Day {day.day}</div>
              <div className="space-y-2">
                {day.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-[#2D5A3D] rounded-full" />
                      {i < day.items.length - 1 && <div className="w-0.5 h-full bg-[#2D5A3D]/30" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="text-[12px] text-gray-500">{item.time}</div>
                      <div className="text-[13px] text-gray-700">{item.activity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 包含服务 */}
      {guide.includes && (
        <div className="bg-[#2D5A3D] px-4 py-4">
          <h3 className="text-[15px] font-semibold text-white mb-3">包含服务</h3>
          <div className="space-y-2">
            {guide.includes.map((item: string, i: number) => (
              <div key={i} className="text-[13px] text-white">{item}</div>
            ))}
          </div>
        </div>
      )}

      {/* 装备清单 */}
      {guide.equipment && (
        <div className="bg-white px-4 py-4">
          <h3 className="text-[15px] font-semibold text-[#2D5A3D] mb-3">装备清单</h3>
          <div className="mb-3">
            <div className="text-[13px] font-semibold text-[#2D5A3D] mb-2">提供：</div>
            <div className="flex flex-wrap gap-2">
              {guide.equipment.provided.map((item: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-[#2D5A3D]/10 text-[#2D5A3D] text-[12px] rounded">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-[#2D5A3D] mb-2">自备：</div>
            <div className="flex flex-wrap gap-2">
              {guide.equipment.self.map((item: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-[12px] rounded">{item}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 用户评价 */}
      <div className="bg-white px-4 py-3">
        <h3 className="text-[15px] font-semibold text-[#2D5A3D] mb-3">玩家评价</h3>
        {reviews.slice(0, 2).map((review: Review) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '玩家'} size="xs" />
                <span className="text-[13px] font-medium text-[#2D5A3D]">{reviewer?.name || '玩家'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: unknown, i: number) => <CloudStar key={i} size={12} color="#2D5A3D" />)}</div>
                <span className="text-[11px] text-gray-500 ml-auto">{review.time}</span>
              </div>
              <p className="text-[13px] text-gray-600">{review.content}</p>
            </div>
          );
        })}
      </div>

      {/* 安全提示 */}
      {guide.warning && (
        <div className="bg-[#2D5A3D] px-4 py-3">
          <p className="text-[13px] text-white">⚠️ {guide.warning}</p>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <button onClick={() => navigate(`/chat/2?back=${encodeURIComponent(backUrl)}`)} className="py-2.5 px-4 border-2 border-[#2D5A3D] text-[#2D5A3D] text-[13px] font-semibold rounded-xl active:opacity-70">
          💬 咨询领队
        </button>
        <button className="flex-1 py-2.5 bg-gradient-to-r from-[#2D5A3D] to-[#4A7C59] text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          style={{ boxShadow: '0 4px 12px rgba(45,90,61,0.3)' }}>
          加入露营 ¥{guide.pricePerPerson}
        </button>
      </div>
      </div>
    </SlideInPage>
  );
}

// 商务陪同详情页
export function BusinessDetail({ guide, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: '#F8F9FA', minHeight: '100%' }}>
      <SubNavBar title="商务陪同" />

      {/* 顶部形象区 */}
      <div className="relative">
        <img src={guide.coverImage} alt={guide.name} className="w-full aspect-[16/9] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] to-[#2C5282] opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-[24px] font-bold mb-2" style={{ color: '#D4AF37' }}>专业商务陪同</div>
            <div className="text-[14px] opacity-90">本地资源 · 企业对接 · 语言服务</div>
          </div>
        </div>
      </div>

      {/* 服务信息卡片 */}
      <div className="relative -mt-6 bg-white rounded-t-3xl px-4 pt-6 pb-4 border-t-4" style={{ borderColor: '#D4AF37', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
        <h1 className="text-[20px] font-bold text-[#1E3A5F] mb-2">💼 {guide.name}·杭州本地通·资源整合</h1>
        
        {/* 标签行 */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-[#1E3A5F] text-white text-[11px] rounded-full">💼 商务陪同</span>
          <span className="px-2 py-1 bg-sky-500 text-white text-[11px] rounded-full">🌐 翻译</span>
          <span className="px-2 py-1 bg-black text-white text-[11px] rounded-full">🚗 专车接送</span>
          <span className="px-2 py-1 bg-[#D4AF37] text-white text-[11px] rounded-full">🍽️ 商务宴请</span>
        </div>

        {/* 服务形式 */}
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {['全天8h', '半天4h', '晚宴3h', '接送2h'].map((form, i) => (
            <span key={i} className="px-3 py-1.5 bg-gray-100 text-[#1E3A5F] text-[12px] rounded-full whitespace-nowrap">{form}</span>
          ))}
        </div>

        {/* 价格 */}
        <div className="text-[24px] font-bold" style={{ color: '#D4AF37', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>¥{guide.pricePerPerson}/天起</div>
        <div className="text-[12px] text-gray-500 mt-1">含专车</div>
      </div>

      {/* 商务陪玩者信息 */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-3">
          <img src={guide.avatar} alt={guide.name} className="w-20 h-20 rounded-full border-[3px] border-[#1E3A5F] object-cover" style={{ boxShadow: '0 0 0 1px #D4AF37' }} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[18px] font-bold text-[#1E3A5F]">{guide.name}💼</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {guide.certifications?.map((cert: string, i: number) => (
                <span key={i} className="px-2 py-0.5 border-2" style={{ borderColor: '#D4AF37', color: '#D4AF37', fontSize: '10px' }}>{cert}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-3 text-[13px]">
          <div><span className="font-bold text-[#1E3A5F]">{guide.orderCount}+</span><span className="text-gray-500 ml-1">次服务</span></div>
          <div><span className="font-bold text-[#1E3A5F]">100%</span><span className="text-gray-500 ml-1">好评</span></div>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed">{guide.bio}</p>
      </div>

      {/* 服务能力 */}
      {guide.services && (
        <div className="bg-[#1E3A5F] px-4 py-4" style={{ color: '#D4AF37' }}>
          <h3 className="text-[15px] font-semibold mb-3">服务能力</h3>
          {guide.services.map((service: ServiceItem, i: number) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="text-[14px] font-semibold mb-2" style={{ color: '#D4AF37' }}>{service.title}</div>
              <div className="space-y-1">
                {service.items.map((item: string, j: number) => (
                  <div key={j} className="text-[13px] text-white pl-3">• {item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 资源网络 */}
      {guide.resources && (
        <div className="px-4 py-4" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)' }}>
          <h3 className="text-[15px] font-semibold text-[#1E3A5F] mb-3">资源网络</h3>
          <div className="bg-white/90 rounded-lg p-3">
            <div className="text-[13px] text-[#1E3A5F] mb-2 font-semibold">可对接资源：</div>
            <div className="space-y-1">
              {guide.resources.map((resource: string, i: number) => (
                <div key={i} className="text-[12px] text-[#1E3A5F] pl-3">• {resource}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 客户评价 */}
      <div className="bg-white px-4 py-3">
        <h3 className="text-[15px] font-semibold text-[#1E3A5F] mb-3">客户评价</h3>
        {reviews.slice(0, 2).map((review: Review) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '客户'} size="xs" />
                <span className="text-[13px] font-medium text-[#1E3A5F]">{reviewer?.name || '客户'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: unknown, i: number) => <CloudStar key={i} size={12} color="#D4AF37" />)}</div>
                <span className="text-[11px] text-gray-500 ml-auto">{review.time}</span>
              </div>
              <p className="text-[13px] text-gray-600">{review.content}</p>
            </div>
          );
        })}
      </div>

      {/* 安全保障 */}
      {guide.warning && (
        <div className="bg-[#1E3A5F] px-4 py-3">
          <p className="text-[13px] text-white">{guide.warning}</p>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <button onClick={() => navigate(`/chat/2?back=${encodeURIComponent(backUrl)}`)} className="py-2.5 px-4 border-2 border-[#1E3A5F] text-[#1E3A5F] text-[13px] font-semibold rounded-xl active:opacity-70">
          💬 咨询详情
        </button>
        <button className="flex-1 py-2.5 text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)', color: '#D4AF37', boxShadow: '0 4px 12px rgba(30,58,95,0.3)' }}>
          立即预约 ¥{guide.pricePerPerson}
        </button>
      </div>
      </div>
    </SlideInPage>
  );
}

// ==================== 摄影向导详情页 ====================
export function PhotographyDetail({ guide, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '100%' }}>
      <SubNavBar title="摄影服务" />

      {/* 顶部作品轮播 */}
      <div className="relative">
        <img src={guide.coverImage} alt={guide.name} className="w-full aspect-[16/9] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-[10px] opacity-80">ISO 100 · f/2.8 · 1/500s</div>
        </div>
      </div>

      {/* 摄影师信息卡片 */}
      <div className="relative -mt-6 bg-white rounded-t-3xl px-4 pt-6 pb-4 border-t-4 border-[#4A90E2]" style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
        <h1 className="text-[20px] font-bold text-[#1A365D] mb-2">📸 西湖摄影·人像风光·跟拍旅拍</h1>
        
        {/* 标签行 */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-[#4A90E2] text-white text-[11px] rounded-full">📸 风光摄影</span>
          <span className="px-2 py-1 bg-pink-500 text-white text-[11px] rounded-full">👤 人像写真</span>
          <span className="px-2 py-1 bg-orange-500 text-white text-[11px] rounded-full">🌅 日出日落</span>
          <span className="px-2 py-1 bg-green-500 text-white text-[11px] rounded-full">👶 亲子跟拍</span>
        </div>

        {/* 服务形式 */}
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {['2小时跟拍￥350', '半日深度￥600', '全天旅拍￥1000', '夜景人像￥450'].map((form, i) => (
            <span key={i} className="px-3 py-1.5 bg-[#F0F8FF] text-[#4A90E2] text-[12px] rounded-full whitespace-nowrap">{form}</span>
          ))}
        </div>

        {/* 价格 */}
        <div className="text-[24px] font-bold text-[#4A90E2]">¥{guide.pricePerPerson}起</div>
        <div className="text-[12px] text-gray-500 mt-1">含精修20张</div>
      </div>

      {/* 摄影师信息 */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-3">
          <img src={guide.avatar} alt={guide.name} className="w-20 h-20 rounded-full border-[3px] border-[#4A90E2] object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[18px] font-bold text-[#1A365D]">{guide.name}📷</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {guide.certifications?.map((cert: string, i: number) => (
                <span key={i} className="px-2 py-0.5 border border-[#4A90E2] text-[#4A90E2] text-[10px] rounded">{cert}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-3 text-[13px]">
          <div><span className="font-bold text-[#4A90E2]">2000+</span><span className="text-gray-500 ml-1">张作品</span></div>
          <div><span className="font-bold text-[#4A90E2]">{guide.orderCount}</span><span className="text-gray-500 ml-1">次服务</span></div>
          <div><span className="font-bold text-[#4A90E2]">{guide.rating}分</span><span className="text-gray-500 ml-1">好评</span></div>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed">{guide.bio}</p>
      </div>

      {/* 设备展示 */}
      <div className="bg-[#F0F8FF] px-4 py-4">
        <h3 className="text-[15px] font-semibold text-[#1A365D] mb-3">📷 拍摄设备</h3>
        <div className="flex flex-wrap gap-2">
          {guide.equipment?.provided.map((item: string, i: number) => (
            <span key={i} className="px-3 py-1.5 bg-white text-[#4A90E2] text-[12px] rounded-full">{item}</span>
          ))}
        </div>
      </div>

      {/* 拍摄服务 */}
      {guide.services && (
        <div className="bg-white px-4 py-4">
          <h3 className="text-[15px] font-semibold text-[#1A365D] mb-3">拍摄服务</h3>
          {guide.services.map((service: any, i: number) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="text-[14px] font-semibold text-[#4A90E2] mb-2">{service.title}</div>
              <div className="space-y-1">
                {service.items.map((item: string, j: number) => (
                  <div key={j} className="text-[13px] text-gray-600 pl-3">• {item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 客户评价 */}
      <div className="bg-white px-4 py-3">
        <h3 className="text-[15px] font-semibold text-[#1A365D] mb-3">客户评价</h3>
        {reviews.slice(0, 2).map((review: Review) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '客户'} size="xs" />
                <span className="text-[13px] font-medium text-[#1A365D]">{reviewer?.name || '客户'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: any, i: number) => <CloudStar key={i} size={12} color="#4A90E2" />)}</div>
                <span className="text-[11px] text-gray-500 ml-auto">{review.time}</span>
              </div>
              <p className="text-[13px] text-gray-600">{review.content}</p>
            </div>
          );
        })}
      </div>

      {/* 拍摄须知 */}
      {guide.warning && (
        <div className="bg-[#F0F8FF] px-4 py-3">
          <p className="text-[13px] text-[#1A365D]">{guide.warning}</p>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <button onClick={() => navigate(`/chat/2?back=${encodeURIComponent(backUrl)}`)} className="py-2.5 px-4 border-2 border-[#4A90E2] text-[#4A90E2] text-[13px] font-semibold rounded-xl active:opacity-70">
          💬 咨询风格
        </button>
        <button className="flex-1 py-2.5 bg-gradient-to-r from-[#4A90E2] to-[#3A7BC8] text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          style={{ boxShadow: '0 4px 12px rgba(74,144,226,0.3)' }}>
          立即预约 ¥{guide.pricePerPerson}
        </button>
      </div>
      </div>
    </SlideInPage>
  );
}

// ==================== 美食向导详情页 ====================
export function FoodDetail({ guide, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: '#FFFCF5', minHeight: '100%' }}>
      <SubNavBar title="美食探店" />

      {/* 顶部美食轮播 */}
      <div className="relative">
        <img src={guide.coverImage} alt={guide.name} className="w-full aspect-[16/9] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-[10px] opacity-80">热气腾腾 · 辣椒红油 · 竹签串串</div>
        </div>
      </div>

      {/* 探店信息卡片 */}
      <div className="relative -mt-6 bg-[#FFF8E7] rounded-t-3xl px-4 pt-6 pb-4" style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
        <h1 className="text-[20px] font-bold text-[#7C2D12] mb-2">🍜 成都美食·市井串串·本地人带路</h1>
        
        {/* 标签行 */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-red-500 text-white text-[11px] rounded-full">🍢 串串</span>
          <span className="px-2 py-1 bg-orange-500 text-white text-[11px] rounded-full">🌶️ 火锅</span>
          <span className="px-2 py-1 bg-yellow-500 text-white text-[11px] rounded-full">🍜 面食</span>
          <span className="px-2 py-1 bg-pink-500 text-white text-[11px] rounded-full">🍧 甜品</span>
        </div>

        {/* 路线 */}
        <div className="text-[13px] text-[#9A3412] mb-3">📍 建设路→春熙路→宽窄巷子→锦里（4小时吃遍）</div>

        {/* 价格 */}
        <div className="text-[24px] font-bold text-[#FF6B35]">¥{guide.pricePerPerson}/人</div>
        <div className="text-[12px] text-gray-500 mt-1">含3顿正餐+2顿小吃，人均50吃撑</div>
      </div>

      {/* 美食向导信息 */}
      <div className="bg-[#FFF8E7] px-4 py-4 border-b border-[#FED7AA]">
        <div className="flex items-start gap-3 mb-3">
          <img src={guide.avatar} alt={guide.name} className="w-20 h-20 rounded-full border-[3px] border-[#FF6B35] object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[18px] font-bold text-[#7C2D12]">{guide.name}🌶️</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {guide.certifications?.map((cert: string, i: number) => (
                <span key={i} className="px-2 py-0.5 border border-[#FF6B35] text-[#FF6B35] text-[10px] rounded">{cert}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[13px] text-[#9A3412] leading-relaxed">{guide.bio}</p>
      </div>

      {/* 探店路线 */}
      {guide.schedule && (
        <div className="bg-white px-4 py-4">
          <h3 className="text-[15px] font-semibold text-[#7C2D12] mb-3">🗺️ 探店路线</h3>
          {guide.schedule.map((day: any) => (
            <div key={day.day} className="space-y-3">
              {day.items.map((item: any, i: number) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#FF6B35] rounded-full" />
                    {i < day.items.length - 1 && <div className="w-0.5 h-full bg-[#FF6B35]/30" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="text-[12px] text-[#FF6B35] font-semibold">{item.time}</div>
                    <div className="text-[13px] text-[#7C2D12]">{item.activity}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* 包含美食 */}
      {guide.includes && (
        <div className="bg-[#FF6B35] px-4 py-4">
          <h3 className="text-[15px] font-semibold text-white mb-3">包含美食</h3>
          <div className="space-y-2">
            {guide.includes.map((item: string, i: number) => (
              <div key={i} className="text-[13px] text-white">{item}</div>
            ))}
          </div>
        </div>
      )}

      {/* 食客评价 */}
      <div className="bg-white px-4 py-3">
        <h3 className="text-[15px] font-semibold text-[#7C2D12] mb-3">食客评价</h3>
        {reviews.slice(0, 2).map((review: Review) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '食客'} size="xs" />
                <span className="text-[13px] font-medium text-[#7C2D12]">{reviewer?.name || '食客'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: any, i: number) => <CloudStar key={i} size={12} color="#FF6B35" />)}</div>
                <span className="text-[11px] text-gray-500 ml-auto">{review.time}</span>
              </div>
              <p className="text-[13px] text-gray-600">{review.content}</p>
            </div>
          );
        })}
      </div>

      {/* 温馨提示 */}
      {guide.warning && (
        <div className="bg-[#FF6B35] px-4 py-3">
          <p className="text-[13px] text-white">{guide.warning}</p>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-[#FED7AA] px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <button onClick={() => navigate(`/chat/2?back=${encodeURIComponent(backUrl)}`)} className="py-2.5 px-4 border-2 border-[#FF6B35] text-[#FF6B35] text-[13px] font-semibold rounded-xl active:opacity-70">
          💬 咨询路线
        </button>
        <button className="flex-1 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#E85A26] text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          style={{ boxShadow: '0 4px 12px rgba(255,107,53,0.3)' }}>
          立即预约 ¥{guide.pricePerPerson}
        </button>
      </div>
      </div>
    </SlideInPage>
  );
}

// ==================== 户外向导详情页 ====================
export function OutdoorDetail({ guide, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100%' }}>
      <SubNavBar title="户外徒步" />

      {/* 顶部风景轮播 */}
      <div className="relative">
        <img src={guide.coverImage} alt={guide.name} className="w-full aspect-[16/9] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#228B22]/80 to-[#2E8B57]/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-[14px] opacity-90">海拔1200m · 难度⭐⭐⭐ · 耗时6h</div>
          </div>
        </div>
      </div>

      {/* 徒步信息卡片 */}
      <div className="relative -mt-6 bg-white rounded-t-3xl px-4 pt-6 pb-4 border-t-4 border-[#228B22]" style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
        <h1 className="text-[20px] font-bold text-[#14532D] mb-2">⛰️ 张家界徒步·天门山穿越·专业领队</h1>
        
        {/* 标签行 */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-[#228B22] text-white text-[11px] rounded-full">⛰️ 登山</span>
          <span className="px-2 py-1 bg-gray-500 text-white text-[11px] rounded-full">🧗 攀岩</span>
          <span className="px-2 py-1 bg-amber-700 text-white text-[11px] rounded-full">🏕️ 露营</span>
          <span className="px-2 py-1 bg-blue-500 text-white text-[11px] rounded-full">📸 风光</span>
        </div>

        {/* 路线选择 */}
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {['天门山一日游￥400', '黄石寨深度￥600', '三天两夜穿越￥1200'].map((form, i) => (
            <span key={i} className="px-3 py-1.5 bg-[#BBF7D0] text-[#14532D] text-[12px] rounded-full whitespace-nowrap">{form}</span>
          ))}
        </div>

        {/* 难度和价格 */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] text-[#14532D]">难度：{'⭐'.repeat(guide.difficulty || 0)}（中级）</span>
        </div>
        <div className="text-[24px] font-bold text-[#228B22]">¥{guide.pricePerPerson}起</div>
        <div className="text-[12px] text-gray-500 mt-1">含装备+保险+向导</div>
      </div>

      {/* 户外领队信息 */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-3">
          <img src={guide.avatar} alt={guide.name} className="w-20 h-20 rounded-full border-[3px] border-[#228B22] object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[18px] font-bold text-[#14532D]">{guide.name}🏔️</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {guide.certifications?.map((cert: string, i: number) => (
                <span key={i} className="px-2 py-0.5 border border-[#228B22] text-[#228B22] text-[10px] rounded">{cert}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-3 text-[13px]">
          <div><span className="font-bold text-[#228B22]">{guide.orderCount}</span><span className="text-gray-500 ml-1">次带队</span></div>
          <div><span className="font-bold text-[#228B22]">100%</span><span className="text-gray-500 ml-1">安全</span></div>
          <div><span className="font-bold text-[#228B22]">{guide.rating}分</span><span className="text-gray-500 ml-1">好评</span></div>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed">{guide.bio}</p>
      </div>

      {/* 安全保障 */}
      <div className="bg-[#228B22] px-4 py-4 text-white">
        <h3 className="text-[15px] font-semibold mb-3">🛡️ 安全保障</h3>
        {guide.includes && (
          <div className="space-y-2">
            {guide.includes.map((item: string, i: number) => (
              <div key={i} className="text-[13px]">{item}</div>
            ))}
          </div>
        )}
      </div>

      {/* 路线详情 */}
      {guide.schedule && (
        <div className="bg-white px-4 py-4">
          <h3 className="text-[15px] font-semibold text-[#14532D] mb-3">🗓️ 路线详情</h3>
          {guide.schedule.map((day: any) => (
            <div key={day.day} className="space-y-3">
              {day.items.map((item: any, i: number) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#228B22] rounded-full" />
                    {i < day.items.length - 1 && <div className="w-0.5 h-full bg-[#228B22]/30" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="text-[12px] text-[#228B22] font-semibold">{item.time}</div>
                    <div className="text-[13px] text-gray-700">{item.activity}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* 装备清单 */}
      {guide.equipment && (
        <div className="bg-[#F5F5F5] px-4 py-4">
          <h3 className="text-[15px] font-semibold text-[#14532D] mb-3">🎒 装备清单</h3>
          <div className="mb-3">
            <div className="text-[13px] font-semibold text-[#228B22] mb-2">提供：</div>
            <div className="flex flex-wrap gap-2">
              {guide.equipment.provided.map((item: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-[#BBF7D0] text-[#14532D] text-[12px] rounded">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-[#228B22] mb-2">自备：</div>
            <div className="flex flex-wrap gap-2">
              {guide.equipment.self.map((item: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-gray-200 text-gray-600 text-[12px] rounded">{item}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 队员评价 */}
      <div className="bg-white px-4 py-3">
        <h3 className="text-[15px] font-semibold text-[#14532D] mb-3">队员评价</h3>
        {reviews.slice(0, 2).map((review: Review) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '队员'} size="xs" />
                <span className="text-[13px] font-medium text-[#14532D]">{reviewer?.name || '队员'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: any, i: number) => <CloudStar key={i} size={12} color="#228B22" />)}</div>
                <span className="text-[11px] text-gray-500 ml-auto">{review.time}</span>
              </div>
              <p className="text-[13px] text-gray-600">{review.content}</p>
            </div>
          );
        })}
      </div>

      {/* 安全须知 */}
      {guide.warning && (
        <div className="bg-[#228B22] px-4 py-3">
          <p className="text-[13px] text-white">{guide.warning}</p>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <button onClick={() => navigate(`/chat/2?back=${encodeURIComponent(backUrl)}`)} className="py-2.5 px-4 border-2 border-[#228B22] text-[#228B22] text-[13px] font-semibold rounded-xl active:opacity-70">
          💬 咨询路线
        </button>
        <button className="flex-1 py-2.5 bg-gradient-to-r from-[#228B22] to-[#1A6B1A] text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          style={{ boxShadow: '0 4px 12px rgba(34,139,34,0.3)' }}>
          立即预约 ¥{guide.pricePerPerson}
        </button>
      </div>
      </div>
    </SlideInPage>
  );
}

// ==================== 历史向导详情页 ====================
export function HistoryDetail({ guide, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: '#FAF0E6', minHeight: '100%' }}>
      <SubNavBar title="历史讲解" />

      {/* 顶部古建轮播 */}
      <div className="relative">
        <img src={guide.coverImage} alt={guide.name} className="w-full aspect-[16/9] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/90 to-[#A52A2A]/90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-[14px] opacity-90">明清两代 · 600年历史 · 9999.5间房</div>
          </div>
        </div>
      </div>

      {/* 讲解服务卡片 */}
      <div className="relative -mt-6 bg-white rounded-t-3xl px-4 pt-6 pb-4 border-t-4 border-[#8B0000]" style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
        <h1 className="text-[20px] font-bold text-[#450a0a] mb-2">🏛️ 故宫讲解·明清历史·古建专家</h1>
        
        {/* 标签行 */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-[#8B0000] text-white text-[11px] rounded-full">🏛️ 明清历史</span>
          <span className="px-2 py-1 bg-amber-700 text-white text-[11px] rounded-full">🏗️ 古建艺术</span>
          <span className="px-2 py-1 bg-yellow-600 text-white text-[11px] rounded-full">👑 宫廷文化</span>
          <span className="px-2 py-1 bg-purple-700 text-white text-[11px] rounded-full">🎭 文物故事</span>
        </div>

        {/* 讲解路线 */}
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {['中轴线精华￥380', '东西六宫深度￥650', '全天精讲￥980'].map((form, i) => (
            <span key={i} className="px-3 py-1.5 bg-[#FFF8DC] text-[#8B0000] text-[12px] rounded-full whitespace-nowrap">{form}</span>
          ))}
        </div>

        {/* 价格 */}
        <div className="text-[24px] font-bold text-[#8B0000]" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>¥{guide.pricePerPerson}起</div>
        <div className="text-[12px] text-gray-500 mt-1">3小时精讲，历史系研究生</div>
      </div>

      {/* 历史讲解员信息 */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-3">
          <img src={guide.avatar} alt={guide.name} className="w-20 h-20 rounded-full border-[3px] border-[#8B0000] object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[18px] font-bold text-[#450a0a]">{guide.name}📜</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {guide.certifications?.map((cert: string, i: number) => (
                <span key={i} className="px-2 py-0.5 border border-[#8B0000] text-[#8B0000] text-[10px] rounded">{cert}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-3 text-[13px]">
          <div><span className="font-bold text-[#8B0000]">{guide.orderCount}</span><span className="text-gray-500 ml-1">次讲解</span></div>
          <div><span className="font-bold text-[#8B0000]">5000+</span><span className="text-gray-500 ml-1">人听过</span></div>
          <div><span className="font-bold text-[#8B0000]">{guide.rating}分</span><span className="text-gray-500 ml-1">好评</span></div>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed">{guide.bio}</p>
      </div>

      {/* 讲解内容 */}
      {guide.services && (
        <div className="bg-[#8B0000] px-4 py-4 text-white">
          <h3 className="text-[15px] font-semibold mb-3" style={{ color: '#FFD700' }}>讲解内容</h3>
          {guide.services.map((service: any, i: number) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="text-[14px] font-semibold mb-2" style={{ color: '#FFD700' }}>{service.title}</div>
              <div className="space-y-1">
                {service.items.map((item: string, j: number) => (
                  <div key={j} className="text-[13px] pl-3">• {item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 文物故事 */}
      {guide.resources && (
        <div className="bg-[#FFF8DC] px-4 py-4">
          <h3 className="text-[15px] font-semibold text-[#8B0000] mb-3">🏺 文物故事</h3>
          <div className="space-y-2">
            {guide.resources.map((item: string, i: number) => (
              <div key={i} className="text-[13px] text-[#450a0a] pl-3">• {item}</div>
            ))}
          </div>
        </div>
      )}

      {/* 游客评价 */}
      <div className="bg-white px-4 py-3">
        <h3 className="text-[15px] font-semibold text-[#8B0000] mb-3">游客评价</h3>
        {reviews.slice(0, 2).map((review: Review) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '游客'} size="xs" />
                <span className="text-[13px] font-medium text-[#8B0000]">{reviewer?.name || '游客'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: any, i: number) => <CloudStar key={i} size={12} color="#DAA520" />)}</div>
                <span className="text-[11px] text-gray-500 ml-auto">{review.time}</span>
              </div>
              <p className="text-[13px] text-gray-600">{review.content}</p>
            </div>
          );
        })}
      </div>

      {/* 参观须知 */}
      {guide.warning && (
        <div className="bg-[#8B0000] px-4 py-3">
          <p className="text-[13px] text-white">{guide.warning}</p>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <button onClick={() => navigate(`/chat/2?back=${encodeURIComponent(backUrl)}`)} className="py-2.5 px-4 border-2 border-[#8B0000] text-[#8B0000] text-[13px] font-semibold rounded-xl active:opacity-70">
          💬 咨询路线
        </button>
        <button className="flex-1 py-2.5 text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          style={{ background: 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)', color: '#FFD700', boxShadow: '0 4px 12px rgba(139,0,0,0.3)' }}>
          立即预约 ¥{guide.pricePerPerson}
        </button>
      </div>
      </div>
    </SlideInPage>
  );
}

// ==================== 文艺向导详情页 ====================
export function ArtDetail({ guide, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: '#FFF0F5', minHeight: '100%' }}>
      <SubNavBar title="文艺探店" />

      {/* 顶部氛围轮播 */}
      <div className="relative">
        <img src={guide.coverImage} alt={guide.name} className="w-full aspect-[16/9] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#9370DB]/80 to-[#FFB6C1]/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-[14px] opacity-90">慢生活 · 治愈系 · 拍照圣地</div>
          </div>
        </div>
      </div>

      {/* 探店信息卡片 */}
      <div className="relative -mt-6 bg-white rounded-t-3xl px-4 pt-6 pb-4 border-t-4 border-[#9370DB]" style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
        <h1 className="text-[20px] font-bold text-[#581c87] mb-2">🎨 厦门文艺·咖啡探店·拍照圣地</h1>
        
        {/* 标签行 */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-[#9370DB] text-white text-[11px] rounded-full">☕ 咖啡</span>
          <span className="px-2 py-1 bg-blue-500 text-white text-[11px] rounded-full">📚 书店</span>
          <span className="px-2 py-1 bg-pink-500 text-white text-[11px] rounded-full">🌸 花店</span>
          <span className="px-2 py-1 bg-purple-500 text-white text-[11px] rounded-full">📸 拍照</span>
        </div>

        {/* 路线 */}
        <div className="text-[13px] text-[#7c3aed] mb-3">📍 沙坡尾→鼓浪屿→曾厝垵→环岛路（文艺一日游）</div>

        {/* 价格 */}
        <div className="text-[24px] font-bold text-[#9370DB]">¥{guide.pricePerPerson}/人</div>
        <div className="text-[12px] text-gray-500 mt-1">含咖啡+手作+拍照</div>
      </div>

      {/* 文艺向导信息 */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-3">
          <img src={guide.avatar} alt={guide.name} className="w-20 h-20 rounded-full border-[3px] border-[#9370DB] object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[18px] font-bold text-[#581c87]">{guide.name}🌸</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {guide.certifications?.map((cert: string, i: number) => (
                <span key={i} className="px-2 py-0.5 border border-[#9370DB] text-[#9370DB] text-[10px] rounded">{cert}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-3 text-[13px]">
          <div><span className="font-bold text-[#9370DB]">50+</span><span className="text-gray-500 ml-1">家探店</span></div>
          <div><span className="font-bold text-[#9370DB]">1000+</span><span className="text-gray-500 ml-1">张照片</span></div>
          <div><span className="font-bold text-[#9370DB]">{guide.rating}分</span><span className="text-gray-500 ml-1">好评</span></div>
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed">{guide.bio}</p>
      </div>

      {/* 探店路线 */}
      {guide.schedule && (
        <div className="bg-white px-4 py-4">
          <h3 className="text-[15px] font-semibold text-[#581c87] mb-3">🗺️ 探店路线</h3>
          {guide.schedule.map((day: any) => (
            <div key={day.day} className="space-y-3">
              {day.items.map((item: any, i: number) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#9370DB] rounded-full" />
                    {i < day.items.length - 1 && <div className="w-0.5 h-full bg-[#9370DB]/30" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="text-[12px] text-[#9370DB] font-semibold">{item.time}</div>
                    <div className="text-[13px] text-gray-700">{item.activity}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* 包含体验 */}
      {guide.includes && (
        <div className="bg-[#9370DB] px-4 py-4">
          <h3 className="text-[15px] font-semibold text-white mb-3">包含体验</h3>
          <div className="space-y-2">
            {guide.includes.map((item: string, i: number) => (
              <div key={i} className="text-[13px] text-white">{item}</div>
            ))}
          </div>
        </div>
      )}

      {/* 游客评价 */}
      <div className="bg-white px-4 py-3">
        <h3 className="text-[15px] font-semibold text-[#581c87] mb-3">游客评价</h3>
        {reviews.slice(0, 2).map((review: Review) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '游客'} size="xs" />
                <span className="text-[13px] font-medium text-[#581c87]">{reviewer?.name || '游客'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: any, i: number) => <CloudStar key={i} size={12} color="#9370DB" />)}</div>
                <span className="text-[11px] text-gray-500 ml-auto">{review.time}</span>
              </div>
              <p className="text-[13px] text-gray-600">{review.content}</p>
            </div>
          );
        })}
      </div>

      {/* 温馨提示 */}
      {guide.warning && (
        <div className="bg-[#9370DB] px-4 py-3">
          <p className="text-[13px] text-white">{guide.warning}</p>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-gray-200 px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <button onClick={() => navigate(`/chat/2?back=${encodeURIComponent(backUrl)}`)} className="py-2.5 px-4 border-2 border-[#9370DB] text-[#9370DB] text-[13px] font-semibold rounded-xl active:opacity-70">
          💬 咨询路线
        </button>
        <button className="flex-1 py-2.5 bg-gradient-to-r from-[#9370DB] to-[#7B5DB0] text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          style={{ boxShadow: '0 4px 12px rgba(147,112,219,0.3)' }}>
          立即预约 ¥{guide.pricePerPerson}
        </button>
      </div>
      </div>
    </SlideInPage>
  );
}
