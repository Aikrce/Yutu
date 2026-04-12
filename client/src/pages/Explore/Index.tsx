// 发现页 - 搭子 + 向导
import { useState } from 'react';
import { CloudSearch } from '../../components/icons/CloudIcons';
import { BuddyCard } from '../../components/business/BuddyCard';
import { GuideCard } from '../../components/business/GuideCard';
import { MOCK_GUIDES, MOCK_BUDDIES } from '../../data/mock';
import { safeAreaTop } from '../../utils/safeArea';

const GUIDE_TAGS = ['全部', '摄影', '美食', '徒步', '历史', '文艺', '商务', '密室'];

export function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'buddy' | 'guide'>('buddy');
  const [guideFilter, setGuideFilter] = useState('全部');

  const filteredGuides = guideFilter === '全部' ? MOCK_GUIDES : MOCK_GUIDES.filter(g => g.tags.includes(guideFilter));

  return (
    <div style={safeAreaTop()}>
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
          {MOCK_BUDDIES.map(buddy => <BuddyCard key={buddy.id} buddy={buddy} />)}
        </div>
      ) : (
        <div>
          <div className="flex gap-1.5 px-4 py-2 overflow-x-auto scrollbar-hide">
            {GUIDE_TAGS.map(tag => (
              <button key={tag} onClick={() => setGuideFilter(tag)}
                className={`shrink-0 px-3 py-1 rounded-full text-[12px] font-medium transition-fast
                  ${guideFilter === tag ? 'bg-primary text-white' : 'bg-background text-text-secondary'}`}>
                {tag}
              </button>
            ))}
          </div>
          <div className="px-4 space-y-3 mt-2">
            {filteredGuides.map(guide => <GuideCard key={guide.id} guide={guide} />)}
          </div>
        </div>
      )}
    </div>
  );
}
