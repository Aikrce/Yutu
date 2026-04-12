// 向导详情页各种主题的组件实现
import { useNavigate } from 'react-router-dom';
import { SubNavBar, SlideInPage } from '../../components/layout/SubNavBar';
import { CloudStar, CloudMessage } from '../../components/icons/CloudIcons';
import { Avatar } from '../../components/common/Avatar';
import { MOCK_USERS } from '../../data/mock';

// 默认通用布局
export function DefaultDetail({ guide, backUrl, reviews, prices, priceType, setPriceType, showBooking, setShowBooking, bookDate, setBookDate, bookTime, setBookTime }: any) {
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
          {prices.map((p: any) => (
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
        {reviews.map((review: any) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-divider last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '用户'} size="xs" />
                <span className="text-[13px] font-medium text-text-primary">{reviewer?.name || '用户'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: any, i: number) => <CloudStar key={i} size={12} />)}</div>
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
          立即预约 ¥{prices.find((p: any) => p.key === priceType)?.price}
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
export function EscapeRoomDetail({ guide, theme, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: theme.bgPrimary, minHeight: '100%' }}>
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
        {reviews.slice(0, 2).map((review: any) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-[#2D3748] last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '玩家'} size="xs" />
                <span className="text-[13px] font-medium text-white">{reviewer?.name || '玩家'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: any, i: number) => <CloudStar key={i} size={12} color="#FF6B35" />)}</div>
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
export function CampingDetail({ guide, theme, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: theme.bgPrimary, minHeight: '100%' }}>
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
          {guide.schedule.map((day: any) => (
            <div key={day.day} className="mb-4">
              <div className="text-[14px] font-bold text-[#2D5A3D] mb-2">Day {day.day}</div>
              <div className="space-y-2">
                {day.items.map((item: any, i: number) => (
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
        {reviews.slice(0, 2).map((review: any) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '玩家'} size="xs" />
                <span className="text-[13px] font-medium text-[#2D5A3D]">{reviewer?.name || '玩家'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: any, i: number) => <CloudStar key={i} size={12} color="#2D5A3D" />)}</div>
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
export function BusinessDetail({ guide, theme, backUrl, reviews }: any) {
  const navigate = useNavigate();
  
  return (
    <SlideInPage>
      <div style={{ backgroundColor: theme.bgPrimary, minHeight: '100%' }}>
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
          {guide.services.map((service: any, i: number) => (
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
        {reviews.slice(0, 2).map((review: any) => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-gray-200 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '客户'} size="xs" />
                <span className="text-[13px] font-medium text-[#1E3A5F]">{reviewer?.name || '客户'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_: any, i: number) => <CloudStar key={i} size={12} color="#D4AF37" />)}</div>
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
