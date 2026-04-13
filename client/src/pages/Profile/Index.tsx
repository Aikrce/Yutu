// 我的页面
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CloudBuddy, CloudStar, CloudWallet, CloudShare, CloudShield, CloudSettings } from '../../components/icons/CloudIcons';
import { Avatar } from '../../components/common/Avatar';
import { MOCK_ORDERS, MOCK_GUIDES } from '../../data/mock';
import { findChatIdByGuideName } from '../../utils/navigation';
import { safeAreaTop } from '../../utils/safeArea';

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: '待支付', color: 'text-warning' },
  paid: { label: '待服务', color: 'text-primary' },
  serving: { label: '服务中', color: 'text-success' },
  completed: { label: '已完成', color: 'text-text-tertiary' },
  cancelled: { label: '已取消', color: 'text-text-tertiary' },
};

export function ProfilePage() {
  const navigate = useNavigate();
  const [showOrders, setShowOrders] = useState(false);

  return (
    <div style={safeAreaTop()}>
      <div className="bg-primary px-4 py-6 rounded-b-2xl">
        <div className="flex items-center gap-3">
          <Avatar name="旅小友" size="xl" onlineStatus="online" />
          <div>
            <h2 className="text-[18px] font-bold text-white">旅小友</h2>
            <p className="text-[13px] text-primary-100">ID: 10086 · 杭州</p>
          </div>
        </div>
        <div className="flex justify-around mt-4">
          <div className="text-center"><p className="text-[18px] font-bold text-white">12</p><p className="text-[11px] text-primary-100">发布</p></div>
          <div className="text-center"><p className="text-[18px] font-bold text-white">5</p><p className="text-[11px] text-primary-100">收藏</p></div>
          <div className="text-center"><p className="text-[18px] font-bold text-white">3</p><p className="text-[11px] text-primary-100">关注</p></div>
          <div className="text-center"><p className="text-[18px] font-bold text-white">28</p><p className="text-[11px] text-primary-100">粉丝</p></div>
        </div>
      </div>

      {/* 订单快捷入口 */}
      <div className="px-4 mt-4">
        <div className="bg-card rounded-md p-3 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[15px] font-semibold text-text-primary">我的订单</span>
            <button onClick={() => setShowOrders(!showOrders)} className="text-[12px] text-primary flex items-center gap-0.5">
              全部订单 <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: '待支付', count: MOCK_ORDERS.filter(o => o.status === 'pending').length, color: 'text-warning' },
              { label: '待服务', count: MOCK_ORDERS.filter(o => o.status === 'paid').length, color: 'text-primary' },
              { label: '已完成', count: MOCK_ORDERS.filter(o => o.status === 'completed').length, color: 'text-success' },
              { label: '已取消', count: 0, color: 'text-text-tertiary' },
            ].map(item => (
              <button key={item.label} className="flex flex-col items-center gap-1 py-1 touch-feedback">
                <span className={`text-[18px] font-bold ${item.color}`}>{item.count}</span>
                <span className="text-[11px] text-text-secondary">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 订单列表 */}
      {showOrders && (
        <div className="px-4 mt-2 space-y-2">
          {MOCK_ORDERS.map(order => (
            <div key={order.id} className="bg-card rounded-md p-3 shadow-card touch-feedback" onClick={() => navigate(`/order/${order.id}?back=/`)}>
              <div className="flex items-center gap-2.5 mb-2">
                <img src={order.guideAvatar} alt={order.guideName} className="w-8 h-8 rounded-full object-cover" loading="lazy" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-medium text-text-primary">{order.guideName}</span>
                    <span className={`text-[12px] font-medium ${STATUS_MAP[order.status].color}`}>{STATUS_MAP[order.status].label}</span>
                  </div>
                  <p className="text-[12px] text-text-secondary">{order.service} · {order.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-divider">
                <span className="text-[15px] font-bold text-accent">¥{order.amount}</span>
                {order.status === 'paid' && (
                  <button onClick={(e) => { e.stopPropagation(); const guide = MOCK_GUIDES.find(g => g.name === order.guideName); if (guide) navigate(`/chat/${findChatIdByGuideName(guide.name) || guide.id}?back=/`); }} className="px-3 py-1 text-[12px] text-primary bg-primary/10 rounded-full touch-feedback active:scale-[0.97]">联系向导</button>
                )}
                {order.status === 'completed' && (
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/review/${order.id}?back=/`); }} className="px-3 py-1 text-[12px] text-primary bg-primary/10 rounded-full touch-feedback active:scale-[0.97]">去评价</button>
                )}
                {order.status === 'pending' && (
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/order/${order.id}?back=/`); }} className="px-3 py-1 text-[12px] text-white bg-primary rounded-full touch-feedback active:scale-[0.97]">去支付</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 功能菜单 */}
      <div className="px-4 mt-4 space-y-1">
        {[
          { Icon: CloudBuddy, label: '我的搭子', desc: '3个进行中' },
          { Icon: CloudStar, label: '成为向导', desc: '申请认证' },
          { Icon: CloudWallet, label: '我的钱包', desc: '余额 ¥128.00' },
          { Icon: CloudShare, label: '邀请好友', desc: '赚现金奖励' },
          { Icon: CloudShield, label: '安全中心', desc: '一键报警 · 行程分享' },
          { Icon: CloudSettings, label: '设置', desc: '' },
        ].map(({ Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-3 py-3 px-2 bg-card rounded-md touch-feedback">
            <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon size={18} />
            </div>
            <div className="flex-1">
              <span className="text-[14px] text-text-primary">{label}</span>
              {desc && <p className="text-[11px] text-text-tertiary">{desc}</p>}
            </div>
            <ChevronRight size={16} className="text-text-tertiary" />
          </div>
        ))}
      </div>
    </div>
  );
}
