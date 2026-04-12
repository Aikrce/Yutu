// 云旅友途 - App 主入口（精简版）
import { useState, useCallback } from 'react';
import { SplashPage } from './pages/Home/Splash';
import { HomePage } from './pages/Home/Index';
import { ExplorePage } from './pages/Explore/Index';
import { ChatPage } from './pages/Chat/Index';
import { ProfilePage } from './pages/Profile/Index';
import { PublishPage } from './pages/Publish/Index';
import { TabBar } from './components/layout/TabBar';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showPublish, setShowPublish] = useState(false);

  const handleSplashFinish = useCallback(() => setShowSplash(false), []);
  const handleTabChange = useCallback((tab: string) => {
    if (tab === 'publish') {
      setShowPublish(true);
    } else {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {showSplash && <SplashPage onFinish={handleSplashFinish} />}
      <div className={`transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'explore' && <ExplorePage />}
        {activeTab === 'chat' && <ChatPage />}
        {activeTab === 'profile' && <ProfilePage />}
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      {showPublish && <PublishPage onClose={() => setShowPublish(false)} />}
    </div>
  );
}

export default App;
