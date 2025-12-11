import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { PlayTab } from '@/components/tabs/PlayTab';
import { NewsTab } from '@/components/tabs/NewsTab';
import { EventsTab } from '@/components/tabs/EventsTab';
import { LeaderboardsTab } from '@/components/tabs/LeaderboardsTab';
import { YouTab } from '@/components/tabs/YouTab';

type TabType = 'news' | 'events' | 'play' | 'leaderboards' | 'you';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('play');

  const renderContent = () => {
    switch (activeTab) {
      case 'news':
        return <NewsTab />;
      case 'events':
        return <EventsTab />;
      case 'play':
        return <PlayTab />;
      case 'leaderboards':
        return <LeaderboardsTab />;
      case 'you':
        return <YouTab />;
      default:
        return <PlayTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content Area */}
      <main className="pt-14 pb-20 min-h-screen overflow-y-auto">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;