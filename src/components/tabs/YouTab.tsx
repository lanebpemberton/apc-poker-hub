import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { userProfile } from '@/data/mockData';
import { 
  Trophy, 
  Gamepad2, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Star
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }: { 
  icon: React.ElementType; 
  label: string; 
  value: string | number;
  color: string;
}) => (
  <Card className="flex-1">
    <CardContent className="p-3 text-center">
      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

const MenuItem = ({ icon: Icon, label, onClick }: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-3 p-4 hover:bg-secondary rounded-lg transition-colors"
  >
    <Icon className="w-5 h-5 text-muted-foreground" />
    <span className="flex-1 text-left font-medium text-foreground">{label}</span>
    <ChevronRight className="w-5 h-5 text-muted-foreground" />
  </button>
);

export const YouTab = () => {
  return (
    <div className="flex flex-col px-4 pt-4 pb-24">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-24 h-24 border-4 border-primary mb-3">
          <AvatarImage src={userProfile.avatar} />
          <AvatarFallback className="text-2xl">{userProfile.name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold text-foreground">{userProfile.name}</h2>
        <p className="text-sm text-muted-foreground">Member since {userProfile.memberSince}</p>
        
        <div className="flex items-center gap-1 mt-2 bg-primary/20 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Rank #{userProfile.currentRank}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard 
          icon={Gamepad2} 
          label="Games" 
          value={userProfile.gamesPlayed} 
          color="bg-primary/20 text-primary"
        />
        <StatCard 
          icon={DollarSign} 
          label="Winnings" 
          value={userProfile.totalWinnings} 
          color="bg-accent/20 text-accent"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Points" 
          value={userProfile.seasonPoints} 
          color="bg-secondary text-foreground"
        />
      </div>

      {/* Season Progress */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground">Season 11 Progress</h3>
            <span className="text-sm text-primary font-semibold">{userProfile.seasonPoints} pts</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(userProfile.seasonPoints / 2500) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {2500 - userProfile.seasonPoints} points to next tier
          </p>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card>
        <CardContent className="p-2">
          <MenuItem icon={Trophy} label="My Achievements" />
          <MenuItem icon={Settings} label="Settings" />
          <MenuItem icon={HelpCircle} label="Help & Support" />
          <div className="border-t border-border my-2" />
          <MenuItem icon={LogOut} label="Sign Out" />
        </CardContent>
      </Card>
    </div>
  );
};