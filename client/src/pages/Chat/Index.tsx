// 消息页
import { useNavigate } from 'react-router-dom';
import { CloudSearch, CloudBell } from '../../components/icons/CloudIcons';
import { MOCK_CHATS } from '../../data/mock';
import { safeAreaTop } from '../../utils/safeArea';

export function ChatPage() {
  const navigate = useNavigate();

  return (
    <div style={safeAreaTop()}>
      <div className="px-4 pt-2 pb-2">
        <h1 className="text-[20px] font-bold text-text-primary mb-3">消息</h1>
        <div className="flex items-center bg-background rounded-lg px-3 py-2.5 gap-2">
          <CloudSearch size={18} />
          <span className="text-text-tertiary text-[14px]">搜索联系人</span>
        </div>
      </div>
      <div className="px-4">
        {MOCK_CHATS.map(chat => (
          <div key={chat.id} className="flex items-center gap-3 py-3 border-b border-divider touch-feedback"
            onClick={() => chat.type === 'user' && navigate(`/chat/${chat.id}`)}>
            {chat.type === 'system' ? (
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <CloudBell size={20} />
              </div>
            ) : (
              <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover shrink-0" loading="lazy" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-medium text-text-primary">{chat.name}</span>
                  {chat.isGuide && chat.rating && (
                    <span className="text-[10px] bg-accent/10 text-accent px-1 py-0.5 rounded-full">⭐{chat.rating}</span>
                  )}
                </div>
                <span className="text-[11px] text-text-tertiary shrink-0">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-text-secondary line-clamp-1 flex-1">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="ml-2 shrink-0 w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">{chat.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
