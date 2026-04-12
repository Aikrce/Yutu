// 聊天详情页 /chat/:id
import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SubNavBar, SlideInPage } from '../../components/layout/SubNavBar';
import { CloudStar } from '../../components/icons/CloudIcons';
import { Send, Image as ImageIcon, Camera } from 'lucide-react';
import { MOCK_CHATS, MOCK_MESSAGES, MOCK_USERS } from '../../data/mock';
import type { ChatMessage } from '../../data/mock';

export default function ChatDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const chatId = Number(id) || 0;
  const backUrl = searchParams.get('back') || '/';
  const chat = MOCK_CHATS.find(c => c.id === chatId);
  const [inputText, setInputText] = useState('');
  const [sentMessages, setSentMessages] = useState<ChatMessage[]>([]);
  const initialMessages = useMemo(() => MOCK_MESSAGES.filter(m => m.chatId === chatId), [chatId]);
  const messages = useMemo(() => [...initialMessages, ...sentMessages], [initialMessages, sentMessages]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!chat) return <SlideInPage><SubNavBar title="聊天" /><div className="flex items-center justify-center h-64 text-text-tertiary">会话不存在</div></SlideInPage>;

  const otherUser = MOCK_USERS.find(u => u.name === chat.name);
  const isGuide = chat.isGuide;

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: Math.max(0, ...messages.map(m => m.id)) + 1,
      chatId,
      senderId: 0,
      content: inputText,
      type: 'text',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setSentMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <SlideInPage>
      <SubNavBar
        title={
          <div className="flex items-center gap-1.5">
            <span>{chat.name}</span>
            {isGuide && chat.rating && (
              <span className="text-[11px] text-accent flex items-center gap-0.5"><CloudStar size={11} /> {chat.rating}</span>
            )}
          </div>
        }
      />

      {/* 消息区域 */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3" style={{ height: 'calc(100vh - 120px)' }}>
        {/* 对方信息卡 */}
        {isGuide && (
          <div className="flex items-center gap-2 bg-primary/5 rounded-xl p-3 mb-4"
            onClick={() => otherUser && navigate(`/user/${otherUser.id}?back=${encodeURIComponent(backUrl)}`)}>
            <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-text-primary">{chat.name}</span>
                <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">向导</span>
              </div>
              <p className="text-[12px] text-text-secondary">点击查看主页</p>
            </div>
            <button onClick={() => navigate(`/guide/1`)} className="px-3 py-1 bg-primary text-white text-[11px] rounded-full active:opacity-70">预约</button>
          </div>
        )}

        {/* 消息列表 */}
        {messages.map((msg, idx) => (
          <div key={msg.id} className="mb-3">
            {/* 时间分割 */}
            {(idx === 0 || messages[idx - 1].time !== msg.time) && (
              <div className="text-center text-[11px] text-text-tertiary my-2">{msg.time}</div>
            )}

            {msg.isMe ? (
              /* 我的消息 - 右侧蓝色气泡 */
              <div className="flex justify-end">
                <div className="max-w-[70%] bg-primary text-white px-3 py-2 rounded-2xl rounded-br-md text-[14px] leading-relaxed">
                  {msg.content}
                </div>
              </div>
            ) : (
              /* 对方消息 - 左侧白色气泡 */
              <div className="flex gap-2">
                <img src={chat.avatar} alt={chat.name} className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                  onClick={() => otherUser && navigate(`/user/${otherUser.id}?back=${encodeURIComponent(backUrl)}`)} />
                <div className="max-w-[70%] bg-white px-3 py-2 rounded-2xl rounded-bl-md text-[14px] leading-relaxed text-text-primary shadow-sm border border-gray-50">
                  {msg.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部输入栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-divider px-3 py-2"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}>
        <div className="flex items-center gap-2">
          <button className="p-1.5 touch-feedback"><ImageIcon size={20} className="text-text-tertiary" /></button>
          <button className="p-1.5 touch-feedback"><Camera size={20} className="text-text-tertiary" /></button>
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="输入消息..."
            className="flex-1 bg-background rounded-full px-3 py-2 text-[14px]"
          />
          <button onClick={handleSend}
            className={`p-2 rounded-full ${inputText.trim() ? 'bg-primary text-white' : 'bg-gray-100 text-text-tertiary'}`}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </SlideInPage>
  );
}
