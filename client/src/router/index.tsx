import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

const GuideDetailPage = lazy(() => import('../pages/Guide/Detail'));
const UserProfilePage = lazy(() => import('../pages/User/Profile'));
const ContentDetailPage = lazy(() => import('../pages/Content/Detail'));
const ChatDetailPage = lazy(() => import('../pages/Chat/Detail'));
const OrderConfirmPage = lazy(() => import('../pages/Order/Confirm'));
const OrderPaymentPage = lazy(() => import('../pages/Order/Payment'));
const OrderDetailPage = lazy(() => import('../pages/Order/Detail'));
const ReviewPage = lazy(() => import('../pages/Order/Review'));

function PageFallback() {
  return <div className="flex items-center justify-center h-screen text-text-tertiary text-[14px]">加载中...</div>;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* 一级Tab页面 */}
      <Route path="/" element={<App />} />

      {/* 二级页面 - 滑入覆盖 */}
      <Route path="/guide/:id" element={<Suspense fallback={<PageFallback />}><ErrorBoundary><GuideDetailPage /></ErrorBoundary></Suspense>} />
      <Route path="/user/:id" element={<Suspense fallback={<PageFallback />}><ErrorBoundary><UserProfilePage /></ErrorBoundary></Suspense>} />
      <Route path="/content/:id" element={<Suspense fallback={<PageFallback />}><ErrorBoundary><ContentDetailPage /></ErrorBoundary></Suspense>} />
      <Route path="/chat/:id" element={<Suspense fallback={<PageFallback />}><ErrorBoundary><ChatDetailPage /></ErrorBoundary></Suspense>} />

      {/* 三级页面 - 订单交易链路 */}
      <Route path="/order/confirm" element={<Suspense fallback={<PageFallback />}><ErrorBoundary><OrderConfirmPage /></ErrorBoundary></Suspense>} />
      <Route path="/order/payment" element={<Suspense fallback={<PageFallback />}><ErrorBoundary><OrderPaymentPage /></ErrorBoundary></Suspense>} />
      <Route path="/order/:id" element={<Suspense fallback={<PageFallback />}><ErrorBoundary><OrderDetailPage /></ErrorBoundary></Suspense>} />
      <Route path="/review/:orderId" element={<Suspense fallback={<PageFallback />}><ErrorBoundary><ReviewPage /></ErrorBoundary></Suspense>} />

      {/* 兜底 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
