// 底部Tab栏 - 统一版本
import React from 'react';
import { Home, Compass, PlusCircle, MessageCircle, User } from 'lucide-react';
import { Z_INDEX } from '../../data/constants';
import { safeAreaBottom } from '../../utils/safeArea';

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
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-divider ${className || ''}`}
      style={{ zIndex: Z_INDEX.tabBar, ...safeAreaBottom() }}
    >
      <div className="flex items-center justify-around h-12">
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
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg" style={{ boxShadow: '0 4px 12px rgba(59,130,246,0.4)' }}>
                  <Icon size={22} className="text-white" />
                </div>
              </button>
            );
          }

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`touch-feedback flex flex-col items-center justify-center gap-0.5 min-w-[44px] ${isActive ? 'text-primary' : 'text-text-tertiary'}`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
