// 搭子卡片组件
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import type { Buddy } from '../../data/mock';

interface BuddyCardProps {
  buddy: Buddy;
}

export function BuddyCard({ buddy }: BuddyCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-md p-3 shadow-card touch-feedback">
      <div className="flex gap-3">
        <Avatar name={buddy.name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[15px] font-semibold text-text-primary">{buddy.name}</span>
            <span className="text-[11px] text-text-tertiary">{buddy.gender} · {buddy.age}岁</span>
            <span className="text-[11px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">{buddy.distance}</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-text-secondary mb-1">
            <MapPin size={12} className="text-primary" />
            <span>{buddy.destination}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-text-tertiary mb-2">
            <span className="flex items-center gap-1"><Clock size={11} /> {buddy.time}</span>
            <span className="flex items-center gap-1"><Users size={11} /> {buddy.groupSize}</span>
          </div>
          <p className="text-[13px] text-text-secondary line-clamp-1">{buddy.bio}</p>
          <div className="flex gap-1.5 mt-2">
            {buddy.tags.map(tag => (
              <span key={tag} className="text-[10px] bg-background text-text-secondary px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3 pt-2 border-t border-divider">
        <button className="flex-1 py-1.5 text-[13px] font-medium text-primary bg-primary/10 rounded-full active:opacity-70">打招呼</button>
        <button className="flex-1 py-1.5 text-[13px] font-medium text-white bg-primary rounded-full active:opacity-70" onClick={() => navigate(`/user/${buddy.id + 6}`)}>一起玩</button>
      </div>
    </div>
  );
}
