// 支付页 /order/payment
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SubNavBar, SlideInPage } from '../../components/layout/SubNavBar';
import { CloudShield, CloudCheck } from '../../components/icons/CloudIcons';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const amount = Number(searchParams.get('amount')) || 0;
  const orderId = searchParams.get('orderId') || '1';
  const backUrl = searchParams.get('back') || '/';
  const [payMethod, setPayMethod] = useState<'wechat' | 'alipay'>('wechat');
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
      // 1秒后跳转订单详情
      setTimeout(() => {
        navigate(`/order/${orderId}?status=paid&back=${encodeURIComponent('/')}`, { replace: true });
      }, 1000);
    }, 1500);
  };

  return (
    <SlideInPage>
      <SubNavBar title="支付" backUrl={backUrl} />

      {paid ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
            <CloudCheck size={32} className="text-success" />
          </div>
          <h3 className="text-[18px] font-bold text-text-primary mb-1">支付成功</h3>
          <p className="text-[14px] text-text-secondary">正在跳转到订单详情...</p>
        </div>
      ) : (
        <div className="px-4 py-3">
          {/* 支付金额 */}
          <div className="bg-card rounded-xl p-6 shadow-card mb-3 text-center">
            <p className="text-[13px] text-text-secondary mb-2">支付金额</p>
            <p className="text-[36px] font-bold text-accent">¥{amount}</p>
          </div>

          {/* 支付方式 */}
          <div className="bg-card rounded-xl p-4 shadow-card mb-3">
            <h3 className="text-[15px] font-semibold text-text-primary mb-3">选择支付方式</h3>
            <div className="space-y-2.5">
              <button onClick={() => setPayMethod('wechat')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-fast ${payMethod === 'wechat' ? 'border-[#07C160] bg-[#07C160]/5' : 'border-divider'}`}>
                <div className="w-9 h-9 bg-[#07C160] rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8.5 13.5l2-3m0 0l2 3m-2-3v7m-6-4a7 7 0 1114 0 7 7 0 01-14 0z"/></svg>
                </div>
                <span className="text-[15px] font-medium text-text-primary">微信支付</span>
                {payMethod === 'wechat' && <CloudCheck size={18} className="text-[#07C160] ml-auto" />}
              </button>
              <button onClick={() => setPayMethod('alipay')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-fast ${payMethod === 'alipay' ? 'border-[#1677FF] bg-[#1677FF]/5' : 'border-divider'}`}>
                <div className="w-9 h-9 bg-[#1677FF] rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16 8 8 0 010-16zm-1 4v4H9l3 4 3-4h-2V8h-2z"/></svg>
                </div>
                <span className="text-[15px] font-medium text-text-primary">支付宝</span>
                {payMethod === 'alipay' && <CloudCheck size={18} className="text-[#1677FF] ml-auto" />}
              </button>
            </div>
          </div>

          {/* 安全保障 */}
          <div className="flex items-center justify-center gap-1.5 py-3">
            <CloudShield size={14} className="text-primary" />
            <span className="text-[12px] text-text-tertiary">支付环境安全，资金由平台担保</span>
          </div>
        </div>
      )}

      {/* 底部支付按钮 */}
      {!paid && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-divider px-4 py-3"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}>
          <button onClick={handlePay} disabled={paying}
            className={`w-full py-3 text-[16px] font-semibold rounded-xl touch-feedback active:scale-[0.97] ${paying ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white'}`}
            style={!paying ? { boxShadow: '0 4px 12px rgba(59,130,246,0.3)' } : undefined}>
            {paying ? '支付中...' : `确认支付 ¥${amount}`}
          </button>
        </div>
      )}
    </SlideInPage>
  );
}
