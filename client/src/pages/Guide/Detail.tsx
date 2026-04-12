// 向导详情页 /guide/:id
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubNavBar, useIdParam, SlideInPage } from '../../components/layout/SubNavBar';
import { CloudStar, CloudMessage } from '../../components/icons/CloudIcons';
import { Avatar } from '../../components/common/Avatar';
import { MOCK_GUIDES, MOCK_REVIEWS, MOCK_USERS } from '../../data/mock';

export default function GuideDetailPage() {
  const navigate = useNavigate();
  const id = useIdParam();
  const guide = MOCK_GUIDES.find(g => g.id === id);
  const [priceType, setPriceType] = useState<'hourly' | 'halfDay' | 'fullDay'>('hourly');
  const [showBooking, setShowBooking] = useState(false);
  const [bookDate, setBookDate] = useState('今天');
  const [bookTime, setBookTime] = useState('14:00');

  if (!guide) return <SlideInPage><SubNavBar title="向导详情" /><div className="flex items-center justify-center h-64 text-text-tertiary">向导不存在</div></SlideInPage>;

  const reviews = MOCK_REVIEWS.filter(r => r.guideId === id);
  const prices = [
    { key: 'hourly' as const, label: '2小时', price: guide.priceHourly },
    { key: 'halfDay' as const, label: '半天', price: guide.priceHalfDay },
    { key: 'fullDay' as const, label: '全天', price: guide.priceFullDay },
  ];

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
          {guide.tags.map(tag => <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-[12px] rounded-full">{tag}</span>)}
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
          {prices.map(p => (
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
            {guide.works.map((work, i) => (
              <img key={i} src={work} alt={`作品${i+1}`} className="w-28 h-28 rounded-lg object-cover shrink-0" loading="lazy" />
            ))}
          </div>
        </div>
      )}

      {/* 用户评价 */}
      <div className="px-4 py-3 pb-24">
        <h3 className="text-[15px] font-semibold text-text-primary mb-2">用户评价 ({guide.orderCount})</h3>
        {reviews.map(review => {
          const reviewer = MOCK_USERS.find(u => u.id === review.userId);
          return (
            <div key={review.id} className="py-3 border-b border-divider last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <Avatar name={reviewer?.name || '用户'} size="xs" />
                <span className="text-[13px] font-medium text-text-primary">{reviewer?.name || '用户'}</span>
                <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_, i) => <CloudStar key={i} size={12} />)}</div>
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
        <button onClick={() => navigate(`/chat/2`)} className="flex-1 py-2.5 bg-primary/10 text-primary text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70">
          <CloudMessage size={18} /> 聊一聊
        </button>
        <button onClick={() => setShowBooking(true)} className="flex-[1.5] py-2.5 bg-primary text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 active:opacity-70"
          style={{ boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
          立即预约 ¥{prices.find(p => p.key === priceType)?.price}
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
