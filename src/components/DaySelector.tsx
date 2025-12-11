import { cn } from '@/lib/utils';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
type Day = typeof DAYS[number];

interface DaySelectorProps {
  selectedDay: Day;
  onDayChange: (day: Day) => void;
}

export const DaySelector = ({ selectedDay, onDayChange }: DaySelectorProps) => {
  const today = new Date();
  const currentDayIndex = today.getDay();

  return (
    <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
      {DAYS.map((day, index) => {
        const isSelected = selectedDay === day;
        const isToday = index === currentDayIndex;
        
        // Calculate the date for each day
        const dayOffset = index - currentDayIndex;
        const date = new Date(today);
        date.setDate(today.getDate() + dayOffset);
        const dayOfMonth = date.getDate();

        return (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className={cn(
              "flex flex-col items-center min-w-[48px] py-2 px-3 rounded-xl transition-all duration-200",
              isSelected 
                ? "bg-primary text-primary-foreground" 
                : "bg-card hover:bg-secondary"
            )}
          >
            <span className={cn(
              "text-xs font-medium",
              isSelected ? "text-primary-foreground" : "text-muted-foreground"
            )}>
              {day}
            </span>
            <span className={cn(
              "text-lg font-bold mt-0.5",
              isSelected ? "text-primary-foreground" : "text-foreground"
            )}>
              {dayOfMonth}
            </span>
            {isToday && !isSelected && (
              <div className="w-1 h-1 rounded-full bg-primary mt-1" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export type { Day };
export { DAYS };