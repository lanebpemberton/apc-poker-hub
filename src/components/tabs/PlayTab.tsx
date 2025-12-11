import { useState } from 'react';
import { DaySelector, type Day, DAYS } from '@/components/DaySelector';
import { GameCard } from '@/components/GameCard';
import { gamesByDay, userProfile } from '@/data/mockData';
import { Spade } from 'lucide-react';

export const PlayTab = () => {
  const today = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState<Day>(DAYS[today]);
  
  const games = gamesByDay[selectedDay] || [];

  return (
    <div className="flex flex-col">
      {/* Greeting */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Spade className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">
            Ready to play, {userProfile.name}!
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Find your next game below
        </p>
      </div>

      {/* Day Selector */}
      <DaySelector selectedDay={selectedDay} onDayChange={setSelectedDay} />

      {/* Games List */}
      <div className="flex-1 px-4 pb-24 space-y-3">
        {games.length > 0 ? (
          games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Spade className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">No games scheduled</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Check back later or select another day
            </p>
          </div>
        )}
      </div>
    </div>
  );
};