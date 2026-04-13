// 评价页 /review/:orderId
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SubNavBar, SlideInPage } from '../../components/layout/SubNavBar';
import { CloudStar } from '../../components/icons/CloudIcons';
import { MOCK_ORDERS } from '../../data/mock';
import { useIdParam } from '../../utils/navigation';

const QUICK_TAGS = [
  { label: '专业', emoji: '💼' },
  { label: '耐心', emoji: '🤗' },
  { label: '准时', emoji: '⏰' },
  { label: '有趣', emoji: '😄' },
  { label: '靠谱', emoji: '👍' },
  { label: '热情', emoji: '🔥' },
  { label: '贴心', emoji: '💝' },
  { label: '推荐', emoji: '⭐' },
];

export default function ReviewPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = useIdParam();
  const backUrl = searchParams.get('back') || '/';
  const order = MOCK_ORDERS.find(o => o.id === orderId);

  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['专业', '推荐']);
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate(backUrl, { replace: true });
    }, 1500);
  };

  if (!order) return <SlideInPage><SubNavBar title="评价服务" backUrl={backUrl} /><div className="flex items-center justify-center h-64 text-text-tertiary">订单不存在</div></SlideInPage>;

  if (submitted) {
    return (
      <SlideInPage>
        <SubNavBar title="评价服务" backUrl={backUrl} />
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-[32px]">✅</span>
          </div>
          <h3 className="text-[18px] font-bold text-text-primary mb-1">评价成功</h3>
          <p className="text-[14px] text-text-secondary">感谢您的评价！</p>
        </div>
      </SlideInPage>
    );
  }

  return (
    <SlideInPage>
      <SubNavBar title="评价服务" backUrl={backUrl} />

      <div className="px-4 py-3">
        {/* 向导信息 */}
        <div className="bg-card rounded-xl p-4 shadow-card mb-3 flex items-center gap-3">
          <img src={order.guideAvatar} alt={order.guideName} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
          <div>
            <span className="text-[15px] font-bold text-text-primary">{order.guideName}</span>
            <p className="text-[12px] text-text-secondary">{order.service} · {order.date}</p>
          </div>
        </div>

        {/* 星级评分 */}
        <div className="bg-card rounded-xl p-4 shadow-card mb-3 text-center">
          <h3 className="text-[15px] font-semibold text-text-primary mb-3">服务评分</h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} onClick={() => setRating(star)} className="touch-feedback active:scale-[0.9]">
                <CloudStar size={36} color={star <= rating ? '#F59E0B' : '#D1D5DB'} />
              </button>
            ))}
          </div>
          <p className="text-[13px] text-text-secondary">
            {rating === 5 ? '非常满意' : rating === 4 ? '比较满意' : rating === 3 ? '一般' : rating === 2 ? '不太满意' : '很不满意'}
          </p>
        </div>

        {/* 快捷标签 */}
        <div className="bg-card rounded-xl p-4 shadow-card mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary mb-3">标签快选</h3>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map(({ label, emoji }) => (
              <button key={label} onClick={() => toggleTag(label)}
                className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-fast ${selectedTags.includes(label) ? 'bg-primary text-white' : 'bg-background text-text-secondary'}`}>
                {emoji} {label}
              </button>
            ))}
          </div>
        </div>

        {/* 文字评价 */}
        <div className="bg-card rounded-xl p-4 shadow-card mb-24">
          <h3 className="text-[15px] font-semibold text-text-primary mb-3">文字评价</h3>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="分享你的服务体验，帮助更多人做出选择..."
            className="w-full h-24 bg-background rounded-lg p-3 text-[14px] text-text-primary placeholder:text-text-tertiary resize-none border-0 outline-none"
            maxLength={200}
          />
          <div className="text-right text-[11px] text-text-tertiary">{content.length}/200</div>
        </div>
      </div>

      {/* 底部提交按钮 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-divider px-4 py-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <button onClick={handleSubmit} disabled={rating === 0}
          className={`w-full py-3 text-[16px] font-semibold rounded-xl touch-feedback active:scale-[0.97] ${rating === 0 ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white'}`}
          style={rating > 0 ? { boxShadow: '0 4px 12px rgba(59,130,246,0.3)' } : undefined}>
          提交评价
        </button>
      </div>
    </SlideInPage>
  );
}
