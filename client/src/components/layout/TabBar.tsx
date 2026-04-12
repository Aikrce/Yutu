import React from 'react';
import { cn } from '../../utils/cn';
import { Home, Compass, PlusCircle, MessageCircle, User } from 'lucide-react';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const TABS = [
  { key: 'home', label: '首页', icon: Home },
  { key: 'explore', label: '发现', icon: Compass },
  { key: 'publish', label: '发布', icon: PlusCircle, isCenter: true },
  { key: 'chat', label: '消息', icon: MessageCircle },
  { key: 'profile', label: '我的', icon: User },
];

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onTabChange,
  className,
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50',
        'bg-white/95 backdrop-blur-md border-t border-divider',
        className
      )}
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <div className="flex items-center justify-around h-14">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;

          if (tab.isCenter) {
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className="touch-feedback relative -top-3"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Icon size={24} className="text-white" />
                </div>
              </button>
            );
          }

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                'touch-feedback flex flex-col items-center justify-center gap-0.5 min-w-[48px]',
                isActive ? 'text-primary' : 'text-text-tertiary'
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-tag">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
