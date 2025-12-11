import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, QrCode, Users, UserCheck, UserMinus, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { QRScannerDialog } from '@/components/QRScannerDialog';
import { gamesByDay, mockSignedInPlayers, type SignedInPlayer } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const TDGameDashboard = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [players, setPlayers] = useState<SignedInPlayer[]>(
    mockSignedInPlayers.filter(p => p.gameId === gameId)
  );
  const [pendingPlayer, setPendingPlayer] = useState<SignedInPlayer | null>(null);

  // Find the game
  const game = useMemo(() => {
    for (const day of Object.keys(gamesByDay)) {
      const found = gamesByDay[day].find((g) => g.id === gameId);
      if (found) return { ...found, day };
    }
    return null;
  }, [gameId]);

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

  const handleQRScanned = (data: SignedInPlayer) => {
    setPendingPlayer(data);
    setScannerOpen(false);
  };

  const handleApprovePlayer = () => {
    if (pendingPlayer) {
      setPlayers(prev => [...prev, { ...pendingPlayer, status: 'approved' }]);
      toast({
        title: 'Player Approved',
        description: `${pendingPlayer.name || 'Player'} has been added to the game.`,
      });
      setPendingPlayer(null);
    }
  };

  const handleRejectPlayer = () => {
    setPendingPlayer(null);
    toast({
      title: 'Player Rejected',
      description: 'Sign-in request was declined.',
      variant: 'destructive',
    });
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
    toast({
      title: 'Player Removed',
      description: 'Player has been removed from the game.',
    });
  };

  const approvedPlayers = players.filter(p => p.status === 'approved');

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-md z-10 border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-foreground text-lg">Manage Game</h1>
            <p className="text-sm text-muted-foreground">{game.venueName} • {game.day} {game.time}</p>
          </div>
          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
            TD Mode
          </Badge>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{approvedPlayers.length}</p>
              <p className="text-xs text-muted-foreground">Signed In</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <UserCheck className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
              <p className="text-2xl font-bold text-foreground">
                {approvedPlayers.reduce((acc, p) => acc + p.totalChips, 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Chips</p>
            </CardContent>
          </Card>
        </div>

        {/* Scan Button */}
        <Button
          onClick={() => setScannerOpen(true)}
          className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
        >
          <Scan className="w-5 h-5 mr-2" />
          Scan Player QR Code
        </Button>

        {/* Pending Player Review */}
        {pendingPlayer && (
          <Card className="border-primary bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <QrCode className="w-4 h-4 text-primary" />
                Review Sign-In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={pendingPlayer.avatar} />
                  <AvatarFallback>{pendingPlayer.name?.[0] || 'P'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{pendingPlayer.name || 'Unknown Player'}</p>
                  <p className="text-sm text-muted-foreground">{pendingPlayer.totalChips.toLocaleString()} chips</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-secondary/50 rounded-lg p-2">
                  <p className="text-muted-foreground">F&D Commitment</p>
                  <p className="font-medium text-foreground">${pendingPlayer.foodDrinkAmount}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-2">
                  <p className="text-muted-foreground">F&D Chips</p>
                  <p className="font-medium text-foreground">{pendingPlayer.foodDrinkChips.toLocaleString()}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-2">
                  <p className="text-muted-foreground">VIP</p>
                  <p className="font-medium text-foreground">{pendingPlayer.isVIP ? 'Yes (+1,500)' : 'No'}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-2">
                  <p className="text-muted-foreground">Dealer</p>
                  <p className="font-medium text-foreground">{pendingPlayer.isDealer ? 'Yes (+1,500)' : 'No'}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleApprovePlayer} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  Approve
                </Button>
                <Button onClick={handleRejectPlayer} variant="destructive" className="flex-1">
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Player List */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4" />
              Signed In Players ({approvedPlayers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {approvedPlayers.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">
                No players signed in yet. Scan QR codes to add players.
              </p>
            ) : (
              approvedPlayers.map((player) => (
                <div key={player.id} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={player.avatar} />
                    <AvatarFallback>{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{player.name}</p>
                      {player.isVIP && (
                        <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">VIP</Badge>
                      )}
                      {player.isDealer && (
                        <Badge variant="secondary" className="text-xs bg-accent/20 text-accent">Dealer</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{player.totalChips.toLocaleString()} chips</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePlayer(player.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <UserMinus className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* QR Scanner Dialog */}
      <QRScannerDialog
        open={scannerOpen}
        onOpenChange={setScannerOpen}
        onScanned={handleQRScanned}
      />
    </div>
  );
};

export default TDGameDashboard;
