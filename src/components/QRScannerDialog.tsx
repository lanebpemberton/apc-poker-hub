import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Camera, QrCode, AlertCircle } from 'lucide-react';
import { type SignedInPlayer } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface QRScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanned: (data: SignedInPlayer) => void;
}

export const QRScannerDialog = ({ open, onOpenChange, onScanned }: QRScannerDialogProps) => {
  const [manualInput, setManualInput] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleParseQR = () => {
    setError('');
    try {
      const data = JSON.parse(manualInput);
      
      // Validate required fields
      if (!data.gameId || data.totalChips === undefined) {
        throw new Error('Invalid QR data: missing required fields');
      }

      // Create player object from QR data
      const player: SignedInPlayer = {
        id: `scanned-${Date.now()}`,
        name: data.playerName || 'Guest Player',
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        gameId: data.gameId,
        venueName: data.venueName || '',
        foodDrinkAmount: data.foodDrinkAmount || 0,
        foodDrinkChips: data.foodDrinkChips || 0,
        isVIP: data.isVIP || false,
        vipChips: data.vipChips || 0,
        isDealer: data.isDealer || false,
        dealerChips: data.dealerChips || 0,
        totalChips: data.totalChips || 0,
        timestamp: data.timestamp || new Date().toISOString(),
        status: 'pending',
      };

      onScanned(player);
      setManualInput('');
      setShowManual(false);
    } catch (e) {
      setError('Invalid QR code data. Please try again.');
    }
  };

  const handleSimulateScan = () => {
    // Simulate a scanned player for testing
    const mockPlayer: SignedInPlayer = {
      id: `scanned-${Date.now()}`,
      name: 'James W.',
      avatar: 'https://i.pravatar.cc/150?img=3',
      gameId: '7',
      venueName: "Marlow's Tavern",
      foodDrinkAmount: 25,
      foodDrinkChips: 2500,
      isVIP: false,
      vipChips: 0,
      isDealer: true,
      dealerChips: 1500,
      totalChips: 4000,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };

    toast({
      title: 'QR Code Scanned',
      description: 'Player data loaded successfully.',
    });

    onScanned(mockPlayer);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            Scan Player QR Code
          </DialogTitle>
          <DialogDescription>
            Scan a player's sign-in QR code or paste the data manually.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!showManual ? (
            <>
              {/* Camera View Placeholder */}
              <div className="aspect-square bg-secondary rounded-lg flex flex-col items-center justify-center gap-3 border-2 border-dashed border-muted-foreground/30">
                <Camera className="w-12 h-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center px-4">
                  Camera scanner will be available in the native app.
                </p>
              </div>

              {/* Simulate Scan Button (for testing) */}
              <Button onClick={handleSimulateScan} className="w-full">
                Simulate QR Scan (Demo)
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <Button variant="outline" onClick={() => setShowManual(true)} className="w-full">
                Paste QR Data Manually
              </Button>
            </>
          ) : (
            <>
              <Textarea
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder='Paste JSON data here, e.g., {"gameId": "7", "totalChips": 3500, ...}'
                className="min-h-[120px] font-mono text-xs"
              />

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowManual(false)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleParseQR} className="flex-1">
                  Parse Data
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
