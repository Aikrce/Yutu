// 向导卡片组件
import { useNavigate, useLocation } from 'react-router-dom';
import { CloudStar } from '../icons/CloudIcons';
import { Avatar } from '../common/Avatar';
import type { Guide } from '../../data/mock';

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const backUrl = encodeURIComponent(location.pathname + location.search);

  return (
    <div className="bg-card rounded-md overflow-hidden shadow-card touch-feedback" onClick={() => navigate(`/guide/${guide.id}?back=${backUrl}`)}>
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
          <button className="px-4 py-1.5 bg-primary text-white text-[13px] font-medium rounded-full active:opacity-70" onClick={(e) => { e.stopPropagation(); navigate(`/guide/${guide.id}?back=${backUrl}`); }}>立即预约</button>
        </div>
      </div>
    </div>
  );
}
