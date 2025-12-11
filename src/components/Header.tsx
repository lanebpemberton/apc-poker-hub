import { Bell } from 'lucide-react';

const ClubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
    <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.5 7.8 8.4 8.3 9.2C6.4 9.7 5 11.4 5 13.5C5 15.4 6.1 17 7.7 17.7C7.3 18.2 7 18.8 7 19.5C7 20.9 8.1 22 9.5 22H14.5C15.9 22 17 20.9 17 19.5C17 18.8 16.7 18.2 16.3 17.7C17.9 17 19 15.4 19 13.5C19 11.4 17.6 9.7 15.7 9.2C16.2 8.4 16.5 7.5 16.5 6.5C16.5 4 14.5 2 12 2Z"/>
  </svg>
);

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border safe-top z-50">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <ClubIcon />
          <span className="font-bold text-lg text-foreground">Atlanta Poker Club</span>
        </div>
        
        <button className="relative p-2 hover:bg-secondary rounded-full transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
      </div>
    </header>
  );
};