// 用户个人主页 /user/:id
import { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { SubNavBar, SlideInPage } from '../../components/layout/SubNavBar';
import { useIdParam } from '../../utils/navigation';
import { CloudStar, CloudHeart, CloudLocation, CloudMessage } from '../../components/icons/CloudIcons';
import { MOCK_USERS, MOCK_CONTENTS } from '../../data/mock';

export default function UserProfilePage() {
  const userId = useIdParam();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const backUrl = searchParams.get('back') || '/';
  const currentPath = encodeURIComponent(location.pathname + location.search);
  const user = MOCK_USERS.find(u => u.id === userId);
  const [activeTab, setActiveTab] = useState<'publish' | 'favorite'>('publish');
  const [isFollowing, setIsFollowing] = useState(false);

  if (!user) return <SlideInPage><SubNavBar title="用户主页" backUrl={backUrl} /><div className="flex items-center justify-center h-64 text-text-tertiary">用户不存在</div></SlideInPage>;

  const userContents = MOCK_CONTENTS.filter(c => c.userName === user.name);

  return (
    <SlideInPage>
      <SubNavBar title="个人主页" backUrl={backUrl} right={
        <button className="text-[13px] text-text-tertiary">⋯</button>
      } />

      {/* 背景图 + 头像 */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-primary/30 to-primary-100 overflow-hidden">
          <img src={user.avatar} alt="" className="w-full h-full object-cover blur-xl opacity-50 scale-110" />
        </div>
        <div className="absolute -bottom-12 left-4 flex items-end gap-3">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-[72px] h-[72px] rounded-full border-[3px] border-white object-cover shadow-lg" />
            {user.isGuide && (
              <div className="absolute -bottom-1 -right-1 bg-accent text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">向导</div>
            )}
          </div>
        </div>
        <div className="absolute top-3 right-4">
          <button onClick={() => setIsFollowing(!isFollowing)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-fast ${
              isFollowing ? 'bg-gray-100 text-text-secondary' : 'bg-primary text-white'
            }`}>
            {isFollowing ? '已关注' : '+ 关注'}
          </button>
        </div>
      </div>

      {/* 用户信息 */}
      <div className="mt-14 px-4">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-[18px] font-bold text-text-primary">{user.name}</h2>
          {user.isGuide && (
            <button onClick={() => navigate(`/guide/${user.guideId}?back=${currentPath}`)} className="text-[11px] bg-accent/10 text-accent px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <CloudStar size={11} /> 查看向导页
            </button>
          )}
        </div>
        <p className="text-[13px] text-text-secondary mb-1">{user.bio}</p>
        <p className="text-[12px] text-text-tertiary flex items-center gap-1"><CloudLocation size={12} /> {user.city}</p>
      </div>

      {/* 数据统计 */}
      <div className="flex justify-around px-4 py-3 mt-2 border-b border-divider">
        <div className="text-center"><p className="text-[18px] font-bold text-text-primary">{user.publishCount}</p><p className="text-[11px] text-text-tertiary">发布</p></div>
        <div className="text-center"><p className="text-[18px] font-bold text-text-primary">{user.favoriteCount}</p><p className="text-[11px] text-text-tertiary">收藏</p></div>
        <div className="text-center"><p className="text-[18px] font-bold text-text-primary">{user.followingCount}</p><p className="text-[11px] text-text-tertiary">关注</p></div>
        <div className="text-center"><p className="text-[18px] font-bold text-text-primary">{user.followerCount}</p><p className="text-[11px] text-text-tertiary">粉丝</p></div>
      </div>

      {/* 双Tab */}
      <div className="flex px-4 border-b border-divider">
        <button onClick={() => setActiveTab('publish')}
          className={`flex-1 py-2.5 text-[14px] font-semibold text-center border-b-2 transition-fast ${activeTab === 'publish' ? 'text-primary border-primary' : 'text-text-tertiary border-transparent'}`}>
          发布
        </button>
        <button onClick={() => setActiveTab('favorite')}
          className={`flex-1 py-2.5 text-[14px] font-semibold text-center border-b-2 transition-fast ${activeTab === 'favorite' ? 'text-primary border-primary' : 'text-text-tertiary border-transparent'}`}>
          收藏
        </button>
      </div>

      {/* 内容列表 - 复用瀑布流 */}
      <div className="px-2.5 py-3 pb-20">
        {activeTab === 'publish' ? (
          userContents.length > 0 ? (
            <div className="flex gap-2.5">
              <div className="flex-1 flex flex-col gap-2.5">
                {userContents.filter((_, i) => i % 2 === 0).map(item => (
                  <div key={item.id} onClick={() => navigate(`/content/${item.id}?back=${currentPath}`)}
                    className="bg-card rounded-md overflow-hidden shadow-card touch-feedback active:scale-[0.97] transition-fast">
                    <img src={item.image} alt={item.title} className="w-full object-cover bg-gray-100" style={{ height: 120 + (item.id % 3) * 40 }} loading="lazy" />
                    <div className="p-2.5">
                      <h3 className="text-[13px] font-semibold text-text-primary line-clamp-2 leading-snug">{item.title}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-text-tertiary mt-1">
                        <span className="flex items-center gap-0.5"><CloudHeart size={11} /> {item.likes}</span>
                        <span className="flex items-center gap-0.5"><CloudMessage size={11} /> {item.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-2.5">
                {userContents.filter((_, i) => i % 2 === 1).map(item => (
                  <div key={item.id} onClick={() => navigate(`/content/${item.id}?back=${currentPath}`)}
                    className="bg-card rounded-md overflow-hidden shadow-card touch-feedback active:scale-[0.97] transition-fast">
                    <img src={item.image} alt={item.title} className="w-full object-cover bg-gray-100" style={{ height: 120 + (item.id % 3) * 40 }} loading="lazy" />
                    <div className="p-2.5">
                      <h3 className="text-[13px] font-semibold text-text-primary line-clamp-2 leading-snug">{item.title}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-text-tertiary mt-1">
                        <span className="flex items-center gap-0.5"><CloudHeart size={11} /> {item.likes}</span>
                        <span className="flex items-center gap-0.5"><CloudMessage size={11} /> {item.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-text-tertiary">
              <CloudStar size={40} className="mb-3 opacity-30" />
              <p className="text-[14px]">暂无发布内容</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-text-tertiary">
            <CloudStar size={40} className="mb-3 opacity-30" />
            <p className="text-[14px]">暂无收藏内容</p>
          </div>
        )}
      </div>
    </SlideInPage>
  );
}
