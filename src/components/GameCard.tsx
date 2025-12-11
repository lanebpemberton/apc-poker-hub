import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { PokerGame } from '@/data/mockData';

interface GameCardProps {
  game: PokerGame;
}

export const GameCard = ({ game }: GameCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden hover:bg-secondary/50 transition-colors cursor-pointer"
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Venue Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={game.venueImage} 
              alt={game.venueName}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Game Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground truncate">{game.venueName}</h3>
                <p className="text-sm text-muted-foreground truncate">{game.gameType}</p>
              </div>
              <div className="flex-shrink-0 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md">
                <span className="text-sm font-bold">{game.prizeAmount}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs">{game.time}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs truncate">{game.location}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <span className="text-xs">{game.ageRequirement}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
