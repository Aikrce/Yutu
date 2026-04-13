// 订单确认页 /order/confirm
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SubNavBar, SlideInPage } from '../../components/layout/SubNavBar';
import { CloudStar, CloudShield } from '../../components/icons/CloudIcons';
import { MOCK_GUIDES } from '../../data/mock';

export default function OrderConfirmPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const guideId = Number(searchParams.get('guideId')) || 0;
  const bookDate = searchParams.get('date') || '今天';
  const bookTime = searchParams.get('time') || '14:00';
  const priceType = searchParams.get('priceType') || 'hourly';
  const backUrl = searchParams.get('back') || '/';

  const guide = MOCK_GUIDES.find(g => g.id === guideId);

  if (!guide) return <SlideInPage><SubNavBar title="确认订单" backUrl={backUrl} /><div className="flex items-center justify-center h-64 text-text-tertiary">向导不存在</div></SlideInPage>;

  const priceMap: Record<string, { label: string; price: number }> = {
    hourly: { label: '2小时', price: guide.priceHourly },
    halfDay: { label: '半天', price: guide.priceHalfDay },
    fullDay: { label: '全天', price: guide.priceFullDay },
  };
  const selected = priceMap[priceType] || priceMap.hourly;
  const serviceFee = 10;
  const total = selected.price + serviceFee;

  const handleSubmit = () => {
    const orderId = Date.now() % 10000;
    navigate(`/order/payment?orderId=${orderId}&amount=${total}&guideId=${guideId}&back=${encodeURIComponent(backUrl)}`);
  };

  return (
    <SlideInPage>
      <SubNavBar title="确认订单" backUrl={backUrl} />

      <div className="px-4 py-3">
        {/* 向导信息卡片 */}
        <div className="bg-card rounded-xl p-4 shadow-card mb-3">
          <div className="flex items-center gap-3">
            <img src={guide.avatar} alt={guide.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[16px] font-bold text-text-primary">{guide.name}</span>
                <span className="text-[11px] text-accent flex items-center gap-0.5"><CloudStar size={11} /> {guide.rating}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {guide.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 服务信息 */}
        <div className="bg-card rounded-xl p-4 shadow-card mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary mb-3">服务信息</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text-secondary">服务类型</span>
              <span className="text-[14px] font-medium text-text-primary">{selected.label}向导服务</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text-secondary">预约日期</span>
              <span className="text-[14px] font-medium text-text-primary">{bookDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text-secondary">预约时间</span>
              <span className="text-[14px] font-medium text-text-primary">{bookTime}</span>
            </div>
          </div>
        </div>

        {/* 费用明细 */}
        <div className="bg-card rounded-xl p-4 shadow-card mb-3">
          <h3 className="text-[15px] font-semibold text-text-primary mb-3">费用明细</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text-secondary">向导服务费({selected.label})</span>
              <span className="text-[14px] text-text-primary">¥{selected.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-text-secondary">平台服务费</span>
              <span className="text-[14px] text-text-primary">¥{serviceFee}</span>
            </div>
            <div className="border-t border-dashed border-divider pt-2.5 flex items-center justify-between">
              <span className="text-[15px] font-semibold text-text-primary">合计</span>
              <span className="text-[20px] font-bold text-accent">¥{total}</span>
            </div>
          </div>
        </div>

        {/* 保障提示 */}
        <div className="bg-primary/5 rounded-xl p-3 flex items-start gap-2 mb-24">
          <CloudShield size={16} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-[12px] font-medium text-primary mb-0.5">平台安全保障</p>
            <p className="text-[11px] text-text-tertiary">服务不满意可申请退款，平台全程担保交易安全</p>
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-divider px-4 py-3 flex items-center justify-between"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
        <div>
          <span className="text-[12px] text-text-secondary">合计</span>
          <span className="text-[22px] font-bold text-accent ml-1">¥{total}</span>
        </div>
        <button onClick={handleSubmit}
          className="px-8 py-2.5 bg-primary text-white text-[16px] font-semibold rounded-xl touch-feedback active:scale-[0.97]"
          style={{ boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
          提交订单
        </button>
      </div>
    </SlideInPage>
  );
}
