import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import GuideDetailPage from '../pages/Guide/Detail';
import UserProfilePage from '../pages/User/Profile';
import ContentDetailPage from '../pages/Content/Detail';
import ChatDetailPage from '../pages/Chat/Detail';

export default function AppRouter() {
  return (
    <Routes>
      {/* 一级Tab页面 */}
      <Route path="/*" element={<App />} />

      {/* 二级页面 - 滑入覆盖 */}
      <Route path="/guide/:id" element={<GuideDetailPage />} />
      <Route path="/user/:id" element={<UserProfilePage />} />
      <Route path="/content/:id" element={<ContentDetailPage />} />
      <Route path="/chat/:id" element={<ChatDetailPage />} />

      {/* 兜底 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
