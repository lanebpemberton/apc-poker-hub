import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard } from '@/data/mockData';
import { Trophy, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-accent" />;
    case 2:
      return <Medal className="w-5 h-5 text-muted-foreground" />;
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />;
    default:
      return null;
  }
};

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-accent/10 border-accent/30';
    case 2:
      return 'bg-muted/50 border-muted-foreground/20';
    case 3:
      return 'bg-amber-500/10 border-amber-500/30';
    default:
      return '';
  }
};

export const LeaderboardsTab = () => {
  return (
    <div className="flex flex-col px-4 pt-4 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Leaderboards</h2>
        <span className="text-sm text-muted-foreground">Season 11</span>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-2 mb-6">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <Avatar className="w-14 h-14 border-2 border-muted-foreground/30">
            <AvatarImage src={leaderboard[1].avatar} />
            <AvatarFallback>{leaderboard[1].name[0]}</AvatarFallback>
          </Avatar>
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold text-foreground">{leaderboard[1].name}</p>
            <p className="text-xs text-muted-foreground">{leaderboard[1].points} pts</p>
          </div>
          <div className="w-16 h-16 bg-secondary flex items-center justify-center mt-2 rounded-t-lg">
            <span className="text-2xl font-bold text-muted-foreground">2</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center -mt-4">
          <div className="relative">
            <Avatar className="w-18 h-18 border-2 border-accent">
              <AvatarImage src={leaderboard[0].avatar} className="w-full h-full" />
              <AvatarFallback>{leaderboard[0].name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2">
              <Trophy className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm font-bold text-foreground">{leaderboard[0].name}</p>
            <p className="text-xs text-accent font-semibold">{leaderboard[0].points} pts</p>
          </div>
          <div className="w-16 h-20 bg-accent/20 flex items-center justify-center mt-2 rounded-t-lg">
            <span className="text-2xl font-bold text-accent">1</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <Avatar className="w-14 h-14 border-2 border-amber-500/30">
            <AvatarImage src={leaderboard[2].avatar} />
            <AvatarFallback>{leaderboard[2].name[0]}</AvatarFallback>
          </Avatar>
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold text-foreground">{leaderboard[2].name}</p>
            <p className="text-xs text-muted-foreground">{leaderboard[2].points} pts</p>
          </div>
          <div className="w-16 h-12 bg-amber-500/20 flex items-center justify-center mt-2 rounded-t-lg">
            <span className="text-2xl font-bold text-amber-600">3</span>
          </div>
        </div>
      </div>

      {/* Rest of Leaderboard */}
      <div className="space-y-2">
        {leaderboard.slice(3).map((player) => (
          <Card key={player.id} className={cn("transition-colors", getRankStyle(player.rank))}>
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <span className="w-6 text-center font-bold text-muted-foreground">
                  {player.rank}
                </span>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={player.avatar} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{player.name}</p>
                  <p className="text-xs text-muted-foreground">{player.gamesPlayed} games</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{player.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};