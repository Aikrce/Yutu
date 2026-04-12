// 内容详情页 /content/:id
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubNavBar, SlideInPage } from '../../components/layout/SubNavBar';
import { CloudHeart, CloudStar, CloudLocation, CloudShare, CloudBuddy } from '../../components/icons/CloudIcons';
import { Avatar } from '../../components/common/Avatar';
import { MOCK_CONTENTS, MOCK_USERS, MOCK_GUIDES } from '../../data/mock';

export default function ContentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contentId = Number(id) || 0;
  const content = MOCK_CONTENTS.find(c => c.id === contentId);
  const [liked, setLiked] = useState(false);
  const [collected, setCollected] = useState(false);
  const [likeCount, setLikeCount] = useState(content?.likes || 0);

  if (!content) return <SlideInPage><SubNavBar title="内容详情" /><div className="flex items-center justify-center h-64 text-text-tertiary">内容不存在</div></SlideInPage>;

  const author = MOCK_USERS.find(u => u.name === content.userName);
  const nearbyGuides = MOCK_GUIDES.slice(0, 2);

  // 模拟评论数据
  const comments = [
    { id: 1, name: '旅行者小张', avatar: 'user-comment1', content: '太美了！下次一定去', time: '1小时前', likes: 5 },
    { id: 2, name: '摄影师阿明', avatar: 'user-comment2', content: '光线真好，用的什么设备？', time: '2小时前', likes: 3 },
    { id: 3, name: '背包客小李', avatar: 'user-comment3', content: '上次去的时候人太多了，建议工作日去', time: '3小时前', likes: 8 },
    { id: 4, name: '美食家晓晓', avatar: 'user-comment4', content: '附近有什么好吃的推荐吗？', time: '5小时前', likes: 2 },
    { id: 5, name: '周末玩家', avatar: 'user-comment5', content: '收藏了，周末安排！', time: '昨天', likes: 1 },
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <SlideInPage>
      <SubNavBar title="内容详情" />

      {/* 封面大图 */}
      <img src={content.image} alt={content.title} className="w-full h-64 object-cover" />

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
        <button className="px-3 py-1 bg-primary text-white text-[12px] font-semibold rounded-full active:opacity-70">+ 关注</button>
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
              <button className="px-3 py-1 bg-primary/10 text-primary text-[12px] font-semibold rounded-full active:opacity-70">立即预约</button>
            </div>
          ))}
        </div>
      )}

      {/* 评论列表 */}
      <div className="px-4 py-3 pb-24">
        <h3 className="text-[15px] font-semibold text-text-primary mb-2">评论 ({content.comments})</h3>
        {comments.map(comment => (
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
            <button onClick={() => navigate(`/user/1?back=/content/${contentId}`)} className="flex-1 py-2 bg-success/10 text-success text-[13px] font-semibold rounded-full flex items-center justify-center gap-1 active:opacity-70">
              <CloudBuddy size={14} /> 求搭子
            </button>
            <button onClick={() => navigate(`/guide/1?back=/content/${contentId}`)} className="flex-1 py-2 bg-primary/10 text-primary text-[13px] font-semibold rounded-full flex items-center justify-center gap-1 active:opacity-70">
              <CloudStar size={14} /> 找向导
            </button>
          </div>
        )}
      </div>
    </SlideInPage>
  );
}
