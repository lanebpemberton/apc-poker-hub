import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { events } from '@/data/mockData';
import { Calendar, Clock, MapPin, Star } from 'lucide-react';

export const EventsTab = () => {
  const featuredEvents = events.filter(e => e.featured);
  const upcomingEvents = events.filter(e => !e.featured);

  return (
    <div className="flex flex-col px-4 pt-4 pb-24">
      <h2 className="text-xl font-bold text-foreground mb-4">Events</h2>
      
      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-accent" />
            <h3 className="font-semibold text-foreground">Featured</h3>
          </div>
          <div className="space-y-3">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-foreground">{event.title}</h3>
                    <Badge className="bg-accent text-accent-foreground flex-shrink-0">
                      {event.prizePool}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <h3 className="font-semibold text-foreground mb-3">Upcoming</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:bg-secondary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <Badge variant="secondary" className="flex-shrink-0">
                      {event.prizePool}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};