import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { userProfile, gamesByDay } from '@/data/mockData';
import { 
  Trophy, 
  Gamepad2, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Star,
  Shield,
  MapPin,
  Clock
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

const MenuItem = ({ icon: Icon, label, onClick, badge }: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  badge?: string;
}) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-3 p-4 hover:bg-secondary rounded-lg transition-colors"
  >
    <Icon className="w-5 h-5 text-muted-foreground" />
    <span className="flex-1 text-left font-medium text-foreground">{label}</span>
    {badge && (
      <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
        {badge}
      </Badge>
    )}
    <ChevronRight className="w-5 h-5 text-muted-foreground" />
  </button>
);

export const YouTab = () => {
  const navigate = useNavigate();
  const isTD = userProfile.role === 'td' || userProfile.role === 'admin';

  // Get assigned games details for TD
  const assignedGames = isTD 
    ? userProfile.assignedGames.map(gameId => {
        for (const day of Object.keys(gamesByDay)) {
          const found = gamesByDay[day].find(g => g.id === gameId);
          if (found) return { ...found, day };
        }
        return null;
      }).filter(Boolean)
    : [];

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
        
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Rank #{userProfile.currentRank}</span>
          </div>
          {isTD && (
            <div className="flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">TD</span>
            </div>
          )}
        </div>
      </div>

      {/* TD Games Section */}
      {isTD && assignedGames.length > 0 && (
        <Card className="mb-6 border-accent/30 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">My TD Games</h3>
            </div>
            <div className="space-y-2">
              {assignedGames.map((game: any) => (
                <button
                  key={game.id}
                  onClick={() => navigate(`/game/${game.id}/manage`)}
                  className="w-full flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-secondary transition-colors"
                >
                  <img 
                    src={game.venueImage} 
                    alt={game.venueName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{game.venueName}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {game.day} {game.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {game.location}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
