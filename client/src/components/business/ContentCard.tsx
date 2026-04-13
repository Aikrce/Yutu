// 内容卡片组件 - 瀑布流使用
import { useNavigate } from 'react-router-dom';
import { CloudLocation, CloudHeart, CloudMessage } from '../icons/CloudIcons';
import { Avatar } from '../common/Avatar';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { CATEGORIES, getContentImageHeight } from '../../data/constants';
import type { ContentItem } from '../../data/contents';

interface ContentCardProps {
  item: ContentItem;
  onClick?: () => void;
}

export function ContentCard({ item, onClick }: ContentCardProps) {
  const navigate = useNavigate();
  const categoryLabel = CATEGORIES.find(c => c.key === item.category)?.label || '';

  return (
    <div className="bg-card rounded-md overflow-hidden shadow-card touch-feedback active:scale-[0.97] transition-fast" onClick={onClick}>
      <div className="relative">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="w-full object-cover bg-gray-100"
          style={{ height: getContentImageHeight(item.id) }}
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-full">
          {categoryLabel}
        </span>
      </div>
      <div className="p-2.5">
        <h3 className="text-[14px] font-semibold text-text-primary line-clamp-2 leading-snug mb-1.5">{item.title}</h3>
        <div className="flex items-center gap-1 text-[11px] text-text-tertiary mb-2">
          <CloudLocation size={11} /><span>{item.location}</span>
        </div>
        {item.hasCompanion && (
          <div className="flex gap-1.5 mb-2">
            <button className="flex-1 bg-success/10 text-success text-[11px] font-medium py-1 rounded-full touch-feedback active:scale-[0.97]" onClick={(e) => { e.stopPropagation(); navigate(`/user/${item.id}`); }}>求搭子</button>
            <button className="flex-1 bg-primary/10 text-primary text-[11px] font-medium py-1 rounded-full touch-feedback active:scale-[0.97]" onClick={(e) => { e.stopPropagation(); navigate(`/guide/${item.id}`); }}>找向导</button>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Avatar name={item.userName} size="xs" />
            <span className="text-[11px] text-text-secondary max-w-[60px] truncate">{item.userName}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-text-tertiary">
            <span className="flex items-center gap-0.5"><CloudHeart size={11} /> {item.likes}</span>
            <span className="flex items-center gap-0.5"><CloudMessage size={11} /> {item.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
