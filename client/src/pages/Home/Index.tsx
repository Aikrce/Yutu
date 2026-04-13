// 瀑布流首页
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '../../components/common/Avatar';
import { Input } from '../../components/common/Input';
import { CloudBell, CloudSearch } from '../../components/icons/CloudIcons';
import { ContentCard } from '../../components/business/ContentCard';
import { MOCK_CONTENTS } from '../../data/contents';
import { CATEGORIES, WATERFALL_CONFIG } from '../../data/constants';
import { safeAreaTop } from '../../utils/safeArea';

export function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const backUrl = encodeURIComponent(location.pathname + location.search);
  const [category, setCategory] = useState('all');
  const [displayCount, setDisplayCount] = useState(WATERFALL_CONFIG.initialCount);

  const handleCategoryChange = (key: string) => {
    setCategory(key);
    setDisplayCount(WATERFALL_CONFIG.initialCount);
  };

  const filteredContents = category === 'all'
    ? MOCK_CONTENTS
    : MOCK_CONTENTS.filter(c => c.category === category);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setDisplayCount(prev => Math.min(prev + WATERFALL_CONFIG.loadMoreCount, filteredContents.length));
  }, [filteredContents.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: `${WATERFALL_CONFIG.scrollThreshold}px` },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);


  const visibleContents = filteredContents.slice(0, displayCount);
  const leftCol = visibleContents.filter((_, i) => i % 2 === 0);
  const rightCol = visibleContents.filter((_, i) => i % 2 === 1);

  return (
    <div className="pb-2">
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-divider"
        style={safeAreaTop()}>
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
              <Avatar name="旅小友" size="sm" onlineStatus="online" onClick={() => navigate(`/user/1?back=${backUrl}`)} />
            </div>
          </div>
          <Input prefix={<CloudSearch size={18} />} placeholder="搜索目的地、景点、美食..." inputSize="sm" className="bg-background" />
        </div>
        <div className="flex gap-1.5 px-4 py-2.5 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => handleCategoryChange(cat.key)}
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
            {leftCol.map(item => <ContentCard key={item.id} item={item} onClick={() => navigate(`/content/${item.id}?back=${backUrl}`)} />)}
          </div>
          <div className="flex-1 flex flex-col gap-2.5">
            {rightCol.map(item => <ContentCard key={item.id} item={item} onClick={() => navigate(`/content/${item.id}?back=${backUrl}`)} />)}
          </div>
        </div>
      </div>

      {displayCount < filteredContents.length && (
        <div ref={sentinelRef} className="py-4 text-center text-[13px] text-text-tertiary">加载更多...</div>
      )}
    </div>
  );
}
