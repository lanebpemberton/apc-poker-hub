import { Newspaper, Calendar, Trophy, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'news' | 'events' | 'play' | 'leaderboards' | 'you';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const PokerChipIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <rect x="11" y="2" width="2" height="3" fill="currentColor" rx="0.5" />
    <rect x="11" y="19" width="2" height="3" fill="currentColor" rx="0.5" />
    <rect x="2" y="11" width="3" height="2" fill="currentColor" rx="0.5" />
    <rect x="19" y="11" width="3" height="2" fill="currentColor" rx="0.5" />
  </svg>
);

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'news' as TabType, label: 'News', icon: Newspaper },
    { id: 'events' as TabType, label: 'Events', icon: Calendar },
    { id: 'play' as TabType, label: 'Play', icon: null, isCenter: true },
    { id: 'leaderboards' as TabType, label: 'Leaderboards', icon: Trophy },
    { id: 'you' as TabType, label: 'You', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center -mt-6 transition-all duration-200",
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg",
                  isActive 
                    ? "bg-primary text-primary-foreground scale-110" 
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}>
                  <PokerChipIcon className="w-7 h-7" />
                </div>
                <span className={cn(
                  "text-[10px] mt-1 font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {tab.label}
                </span>
              </button>
            );
          }

          const Icon = tab.icon!;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};