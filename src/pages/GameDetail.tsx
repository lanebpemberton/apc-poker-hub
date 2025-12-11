import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Trophy, Users, Calendar, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SignInDialog } from '@/components/SignInDialog';
import { gamesByDay, type PokerGame } from '@/data/mockData';

// Get venue description from mock data
const venueDescriptions: Record<string, string> = {
  'The Brass Tap': 'Experience craft beer excellence while you play! The Brass Tap offers an upscale sports bar atmosphere with over 60 beers on tap. Our poker corner features comfortable seating, great lighting, and a friendly crowd of regulars. Perfect for both beginners and seasoned players.',
  "Mac McGee's": "Step into Atlanta's favorite Irish pub for a night of cards and craic! Mac McGee's brings authentic Irish hospitality to your poker experience. Enjoy traditional pub fare, excellent whiskey selection, and a lively atmosphere that makes every hand memorable.",
  'Taco Mac': 'Your neighborhood wing and beer joint with a passion for poker! Taco Mac offers a casual, sports-focused environment with massive TV screens and an extensive beer menu. Our weekly games attract a fun, competitive crowd looking for good times and great cards.',
  'Hudson Grille': 'Upscale American dining meets competitive poker at Hudson Grille. Enjoy premium cocktails and elevated pub cuisine in a sophisticated yet welcoming setting. Our Midtown location draws professionals looking to unwind with a friendly game after work.',
  'Whitehall Tavern': "Buckhead's premier destination for craft cocktails and poker action! Whitehall Tavern combines trendy nightlife vibes with serious card play. The modern industrial decor and energetic crowd create the perfect backdrop for an exciting night at the tables.",
  'The Local No. 7': 'A true neighborhood gem in Tucker! The Local No. 7 prides itself on community and camaraderie. Our poker nights feature a welcoming mix of regulars and newcomers, fantastic bar food, and an atmosphere that feels like playing cards at a friend\'s house.',
  "Marlow's Tavern": "Southern hospitality at its finest! Marlow's Tavern offers farm-to-table American tavern fare in a refined yet relaxed setting. Our Sandy Springs location hosts some of the most competitive games in the league, with players who appreciate both good food and good poker.",
  'Stats Brewpub': 'Downtown Atlanta\'s ultimate sports and poker destination! Stats Brewpub features house-crafted beers, massive screens for game-watching, and dedicated poker tables. The energy here is unmatched, especially on game nights when the city comes alive.',
  'Big Game Sports Bar': 'Go big or go home at Big Game Sports Bar! This Roswell hotspot is known for high-energy poker nights with fantastic drink specials. The spacious layout ensures comfortable play, and the enthusiastic staff keeps the games running smoothly.',
  'Fadó Irish Pub': 'Authentic Irish atmosphere in the heart of Buckhead! Fadó brings the spirit of a Dublin pub to your poker game. Enjoy perfectly poured Guinness, traditional Irish dishes, and a warm, welcoming environment that makes late-night games feel special.',
  'Schoolhouse Brewing': 'Where craft beer meets competitive cards! Schoolhouse Brewing in Marietta offers unique house-made beers in a converted schoolhouse setting. The quirky, creative atmosphere attracts a diverse crowd of beer enthusiasts and poker lovers alike.',
  'The Fred': 'Johns Creek\'s premier entertainment venue for serious poker! The Fred hosts our biggest tournaments with professional-grade equipment and dedicated staff. The spacious layout and focused atmosphere make it the go-to spot for players chasing the big prizes.',
  'Vortex Bar & Grill': 'Little Five Points\' legendary burger joint brings attitude to the poker table! The Vortex is famous for outrageous burgers and an unapologetically unique atmosphere. Our games here attract players who appreciate character, creativity, and competition.',
};

const getVenueDescription = (venueName: string): string => {
  return venueDescriptions[venueName] || 'Join us for an exciting evening of poker at one of Atlanta\'s finest venues. Experience great food, drinks, and competitive card play in a welcoming atmosphere.';
};

const GameDetail = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);

  // Find the game across all days
  const game = useMemo(() => {
    for (const day of Object.keys(gamesByDay)) {
      const found = gamesByDay[day].find((g) => g.id === gameId);
      if (found) return { ...found, day };
    }
    return null;
  }, [gameId]);

  // Check if game is today
  const isToday = useMemo(() => {
    if (!game) return false;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = days[new Date().getDay()];
    return game.day === today;
  }, [game]);

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Game not found</h2>
          <Button variant="ghost" onClick={() => navigate('/')} className="mt-4">
            Go back home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={game.venueImage}
          alt={game.venueName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 -mt-16 relative z-10">
        {/* Main Info Card */}
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{game.venueName}</h1>
                <p className="text-muted-foreground mt-1">{game.gameType}</p>
              </div>
              <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg">
                <span className="text-lg font-bold">{game.prizeAmount}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">{game.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm">{game.day}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">{game.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm">{game.ageRequirement}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Directions Button */}
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => {
            const address = encodeURIComponent(`${game.venueName}, ${game.location}`);
            // Try to detect iOS for Apple Maps, otherwise use Google Maps
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const mapsUrl = isIOS 
              ? `maps://maps.apple.com/?q=${address}`
              : `https://www.google.com/maps/search/?api=1&query=${address}`;
            window.open(mapsUrl, '_blank');
          }}
        >
          <Navigation className="w-4 h-4 mr-2" />
          Get Directions
        </Button>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">About the Venue</h2>
          <p className="text-muted-foreground leading-relaxed">
            {getVenueDescription(game.venueName)}
          </p>
        </div>

        {/* Prize Info */}
        <Card className="mt-6 bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">Prize Pool</p>
                <p className="text-sm text-muted-foreground">
                  Top finishers share the {game.prizeAmount} prize pool plus earn season points
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Sign In Button (only for today's games) */}
      {isToday && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border">
          <Button
            onClick={() => setSignInDialogOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
          >
            Sign In to Game
          </Button>
        </div>
      )}

      {/* Sign In Dialog */}
      <SignInDialog
        open={signInDialogOpen}
        onOpenChange={setSignInDialogOpen}
        venueName={game.venueName}
        gameId={game.id}
      />
    </div>
  );
};

export default GameDetail;
