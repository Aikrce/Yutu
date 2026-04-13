// 订单详情页 /order/:id
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SubNavBar, SlideInPage } from '../../components/layout/SubNavBar';
import { CloudStar, CloudMessage, CloudShield } from '../../components/icons/CloudIcons';
import { MOCK_ORDERS, MOCK_GUIDES } from '../../data/mock';
import { useIdParam } from '../../utils/navigation';
import { findChatIdByGuideName } from '../../utils/navigation';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  pending: { label: '待支付', color: 'text-warning', bg: 'bg-warning/10', icon: '⏳' },
  paid: { label: '待服务', color: 'text-primary', bg: 'bg-primary/10', icon: '📋' },
  serving: { label: '服务中', color: 'text-success', bg: 'bg-success/10', icon: '🎯' },
  completed: { label: '已完成', color: 'text-text-secondary', bg: 'bg-gray-100', icon: '✅' },
  cancelled: { label: '已取消', color: 'text-text-tertiary', bg: 'bg-gray-100', icon: '❌' },
};

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = useIdParam();
  const order = MOCK_ORDERS.find(o => o.id === orderId);
  const backUrl = searchParams.get('back') || '/';

  if (!order) return <SlideInPage><SubNavBar title="订单详情" backUrl={backUrl} /><div className="flex items-center justify-center h-64 text-text-tertiary">订单不存在</div></SlideInPage>;

  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const guide = MOCK_GUIDES.find(g => g.id === order.guideId);

  return (
    <SlideInPage>
      <SubNavBar title="订单详情" backUrl={backUrl} />

      <div className="px-4 py-3">
        {/* 状态横幅 */}
        <div className={`${statusConfig.bg} rounded-xl p-4 mb-3 flex items-center gap-3`}>
          <span className="text-[28px]">{statusConfig.icon}</span>
          <div>
            <h3 className={`text-[17px] font-bold ${statusConfig.color}`}>{statusConfig.label}</h3>
            <p className="text-[12px] text-text-tertiary">订单号: {order.orderNo}</p>
          </div>
        </div>

        {/* 向导信息卡 */}
        {guide && (
          <div className="bg-card rounded-xl p-4 shadow-card mb-3 touch-feedback"
            onClick={() => navigate(`/guide/${guide.id}?back=/order/${orderId}`)}>
            <div className="flex items-center gap-3">
              <img src={guide.avatar} alt={guide.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[15px] font-bold text-text-primary">{guide.name}</span>
                  <span className="text-[11px] text-accent flex items-center gap-0.5"><CloudStar size={11} /> {guide.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {guide.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <span className="text-[12px] text-text-tertiary">查看 ›</span>
            </div>
          </div>
        )}

        {/* 服务信息 */}
        <div className="bg-card rounded-xl p-4 shadow-card mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary mb-3">服务信息</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text-secondary">服务类型</span>
              <span className="text-[14px] font-medium text-text-primary">{order.service}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text-secondary">预约日期</span>
              <span className="text-[14px] font-medium text-text-primary">{order.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text-secondary">预约时间</span>
              <span className="text-[14px] font-medium text-text-primary">{order.time}</span>
            </div>
          </div>
        </div>

        {/* 费用明细 */}
        <div className="bg-card rounded-xl p-4 shadow-card mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary mb-3">费用明细</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text-secondary">向导服务费</span>
              <span className="text-[14px] text-text-primary">¥{order.amount - order.serviceFee}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text-secondary">平台服务费</span>
              <span className="text-[14px] text-text-primary">¥{order.serviceFee}</span>
            </div>
            <div className="border-t border-dashed border-divider pt-2.5 flex items-center justify-between">
              <span className="text-[15px] font-semibold text-text-primary">合计</span>
              <span className="text-[20px] font-bold text-accent">¥{order.amount}</span>
            </div>
          </div>
        </div>

        {/* 保障 */}
        <div className="bg-primary/5 rounded-xl p-3 flex items-start gap-2 mb-24">
          <CloudShield size={16} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-[12px] font-medium text-primary mb-0.5">平台安全保障</p>
            <p className="text-[11px] text-text-tertiary">服务不满意可申请退款，平台全程担保交易安全</p>
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-divider px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        {order.status === 'pending' && (
          <>
            <button onClick={() => navigate(`/order/payment?orderId=${order.id}&amount=${order.amount}&guideId=${order.guideId}&back=/order/${order.id}`)}
              className="flex-1 py-2.5 bg-primary text-white text-[15px] font-semibold rounded-xl touch-feedback active:scale-[0.97]"
              style={{ boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
              去支付
            </button>
          </>
        )}
        {order.status === 'paid' && (
          <button onClick={() => {
            const chatId = findChatIdByGuideName(order.guideName) || order.guideId;
            navigate(`/chat/${chatId}?back=/order/${order.id}`);
          }} className="flex-1 py-2.5 bg-primary/10 text-primary text-[15px] font-semibold rounded-xl flex items-center justify-center gap-1.5 touch-feedback active:scale-[0.97]">
            <CloudMessage size={18} /> 联系向导
          </button>
        )}
        {order.status === 'completed' && (
          <button onClick={() => navigate(`/review/${order.id}?back=/order/${order.id}`)}
            className="flex-1 py-2.5 bg-primary text-white text-[15px] font-semibold rounded-xl touch-feedback active:scale-[0.97]"
            style={{ boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
            去评价
          </button>
        )}
        {order.status === 'cancelled' && (
          <button className="flex-1 py-2.5 bg-gray-200 text-text-tertiary text-[15px] font-semibold rounded-xl">
            已取消
          </button>
        )}
      </div>
    </SlideInPage>
  );
}
