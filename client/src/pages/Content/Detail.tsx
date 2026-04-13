// 内容详情页 /content/:id
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SubNavBar, SlideInPage } from '../../components/layout/SubNavBar';
import { useIdParam } from '../../utils/navigation';
import { CloudHeart, CloudStar, CloudLocation, CloudShare, CloudBuddy } from '../../components/icons/CloudIcons';
import { Avatar } from '../../components/common/Avatar';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { MOCK_CONTENTS, MOCK_USERS, MOCK_GUIDES, MOCK_COMMENTS } from '../../data/mock';
import { useTheme } from '../../hooks/useTheme';

export default function ContentDetailPage() {
  const contentId = useIdParam();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const backUrl = searchParams.get('back') || '/';
  const content = MOCK_CONTENTS.find(c => c.id === contentId);
  const { cssVars, setThemeByCategory, colors } = useTheme();

  // 根据内容分类自动切换主题
  useEffect(() => {
    if (content?.category) {
      setThemeByCategory(content.category);
    }
  }, [content?.category, setThemeByCategory]);
  const [liked, setLiked] = useState(false);
  const [collected, setCollected] = useState(false);
  const [likeCount, setLikeCount] = useState(content?.likes || 0);

  if (!content) return <SlideInPage><SubNavBar title="内容详情" backUrl={backUrl} /><div className="flex items-center justify-center h-64 text-text-tertiary">内容不存在</div></SlideInPage>;

  const author = MOCK_USERS.find(u => u.name === content.userName);
  const nearbyGuides = MOCK_GUIDES.slice(0, 2);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <SlideInPage>
      <div style={cssVars} className={colors.isDark ? 'bg-[var(--theme-bg)] text-[var(--theme-text-primary)]' : ''}>
      <SubNavBar title="内容详情" backUrl={backUrl} />

      {/* 封面大图 */}
      <ImageWithFallback src={content.image} alt={content.title} className="w-full h-64 object-cover" />

      {/* 标题 + 位置 + 标签 */}
      <div className="px-4 py-3 border-b border-divider">
        <h1 className="text-[18px] font-bold text-text-primary mb-2">{content.title}</h1>
        <div className="flex items-center gap-1 text-[13px] text-text-secondary mb-2">
          <CloudLocation size={14} className="text-primary" />
          <span>{content.location}</span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {content.tags.map(tag => (
            <span key={tag} className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* 作者行 */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-divider"
        onClick={() => author && navigate(`/user/${author.id}?back=/content/${contentId}`)}>
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Avatar name={content.userName} size="sm" />
          <div>
            <p className="text-[14px] font-semibold text-text-primary">{content.userName}</p>
            <p className="text-[11px] text-text-tertiary">2小时前 · {content.location.split('·')[0]?.trim()}</p>
          </div>
        </div>
        <button className="px-3 py-1 bg-primary text-white text-[12px] font-semibold rounded-full touch-feedback active:scale-[0.97]">+ 关注</button>
      </div>

      {/* 正文 */}
      <div className="px-4 py-3 border-b border-divider">
        <p className="text-[14px] text-text-secondary leading-relaxed">
          这里的风景真的太棒了！推荐大家一定要来看看，特别是下午时分光线最好，拍照超美。附近的美食也很不错，可以安排一整天的行程。如果需要当地向导带路，下面有推荐的向导哦～
        </p>
      </div>

      {/* 周边向导推荐 */}
      {content.hasCompanion && nearbyGuides.length > 0 && (
        <div className="px-4 py-3 border-b border-divider">
          <h3 className="text-[15px] font-semibold text-text-primary mb-2">周边向导推荐</h3>
          {nearbyGuides.map(guide => (
            <div key={guide.id} className="flex items-center gap-3 py-2"
              onClick={() => navigate(`/guide/${guide.id}?back=/content/${contentId}`)}>
              <img src={guide.avatar} alt={guide.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-medium text-text-primary">{guide.name}</span>
                  <span className="text-[11px] text-accent flex items-center gap-0.5"><CloudStar size={11} /> {guide.rating}</span>
                </div>
                <p className="text-[12px] text-text-secondary">¥{guide.priceHourly}/小时</p>
              </div>
              <button className="px-3 py-1 bg-primary/10 text-primary text-[12px] font-semibold rounded-full touch-feedback active:scale-[0.97]">立即预约</button>
            </div>
          ))}
        </div>
      )}

      {/* 评论列表 */}
      <div className="px-4 py-3 pb-24">
        <h3 className="text-[15px] font-semibold text-text-primary mb-2">评论 ({content.comments})</h3>
        {MOCK_COMMENTS.map(comment => (
          <div key={comment.id} className="py-3 border-b border-divider last:border-0">
            <div className="flex items-center gap-2 mb-1">
              <Avatar name={comment.name} size="xs" />
              <span className="text-[13px] font-medium text-text-primary">{comment.name}</span>
              <span className="text-[11px] text-text-tertiary ml-auto">{comment.time}</span>
            </div>
            <p className="text-[13px] text-text-secondary ml-8">{comment.content}</p>
            <div className="flex items-center gap-3 ml-8 mt-1 text-[11px] text-text-tertiary">
              <button className="flex items-center gap-0.5 active:opacity-50"><CloudHeart size={11} /> {comment.likes}</button>
              <button className="active:opacity-50">回复</button>
            </div>
          </div>
        ))}
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-divider px-4 py-2"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}>
        <div className="flex items-center gap-3 mb-2">
          <input type="text" placeholder="写评论..." className="flex-1 bg-background rounded-full px-3 py-1.5 text-[13px]" />
          <button onClick={handleLike} className={`flex items-center gap-0.5 text-[12px] ${liked ? 'text-error' : 'text-text-tertiary'}`}>
            <CloudHeart size={16} color={liked ? '#EF4444' : undefined} /> {likeCount}
          </button>
          <button onClick={() => setCollected(!collected)} className={`flex items-center gap-0.5 text-[12px] ${collected ? 'text-accent' : 'text-text-tertiary'}`}>
            <CloudStar size={16} color={collected ? '#F59E0B' : undefined} /> 收藏
          </button>
          <button className="flex items-center gap-0.5 text-[12px] text-text-tertiary">
            <CloudShare size={16} /> 分享
          </button>
        </div>
        {content.hasCompanion && (
          <div className="flex gap-2">
            <button onClick={() => navigate(`/user/${author?.id || 1}?back=/content/${contentId}`)} className="flex-1 py-2 bg-success/10 text-success text-[13px] font-semibold rounded-full flex items-center justify-center gap-1 touch-feedback active:scale-[0.97]">
              <CloudBuddy size={14} /> 求搭子
            </button>
            <button onClick={() => navigate(`/guide/${nearbyGuides[0]?.id || 1}?back=/content/${contentId}`)} className="flex-1 py-2 bg-primary/10 text-primary text-[13px] font-semibold rounded-full flex items-center justify-center gap-1 touch-feedback active:scale-[0.97]">
              <CloudStar size={14} /> 找向导
            </button>
          </div>
        )}
      </div>
      </div>
    </SlideInPage>
  );
}
