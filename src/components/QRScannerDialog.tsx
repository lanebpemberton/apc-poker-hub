import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Camera, QrCode, AlertCircle, CameraOff } from 'lucide-react';
import { type SignedInPlayer } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanned: (data: SignedInPlayer) => void;
}

export const QRScannerDialog = ({ open, onOpenChange, onScanned }: QRScannerDialogProps) => {
  const [manualInput, setManualInput] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const { toast } = useToast();

  // Cleanup scanner on unmount or dialog close
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  // Stop scanner when dialog closes
  useEffect(() => {
    if (!open && scannerRef.current) {
      scannerRef.current.stop().catch(() => {});
      setIsScanning(false);
      setCameraError('');
    }
  }, [open]);

  const startScanner = async () => {
    setCameraError('');
    setError('');
    
    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;
      
      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // QR code detected
          handleQRData(decodedText);
          scanner.stop().catch(() => {});
          setIsScanning(false);
        },
        () => {
          // QR code scanning in progress (ignore errors during scanning)
        }
      );
      
      setIsScanning(true);
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('Unable to access camera. Please check permissions or use manual input.');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop().catch(() => {});
      setIsScanning(false);
    }
  };

  const handleQRData = (data: string) => {
    setError('');
    try {
      const parsed = JSON.parse(data);
      
      if (!parsed.gameId || parsed.totalChips === undefined) {
        throw new Error('Invalid QR data: missing required fields');
      }

      const player: SignedInPlayer = {
        id: `scanned-${Date.now()}`,
        name: parsed.playerName || 'Guest Player',
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        gameId: parsed.gameId,
        venueName: parsed.venueName || '',
        foodDrinkAmount: parsed.foodDrinkAmount || 0,
        foodDrinkChips: parsed.foodDrinkChips || 0,
        isVIP: parsed.isVIP || false,
        vipChips: parsed.vipChips || 0,
        isDealer: parsed.isDealer || false,
        dealerChips: parsed.dealerChips || 0,
        totalChips: parsed.totalChips || 0,
        timestamp: parsed.timestamp || new Date().toISOString(),
        status: 'pending',
      };

      toast({
        title: 'QR Code Scanned',
        description: 'Player data loaded successfully.',
      });

      onScanned(player);
    } catch (e) {
      setError('Invalid QR code data. Please try again.');
    }
  };

  const handleParseQR = () => {
    handleQRData(manualInput);
    if (!error) {
      setManualInput('');
      setShowManual(false);
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
              {/* Camera View */}
              <div className="aspect-square bg-secondary rounded-lg flex flex-col items-center justify-center gap-3 border-2 border-dashed border-muted-foreground/30 overflow-hidden relative">
                <div id="qr-reader" className={`w-full h-full ${isScanning ? 'block' : 'hidden'}`} />
                
                {!isScanning && (
                  <div className="flex flex-col items-center gap-3 p-4">
                    {cameraError ? (
                      <>
                        <CameraOff className="w-12 h-12 text-muted-foreground" />
                        <p className="text-sm text-destructive text-center px-4">
                          {cameraError}
                        </p>
                      </>
                    ) : (
                      <>
                        <Camera className="w-12 h-12 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground text-center px-4">
                          Tap "Start Camera" to scan a QR code
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Camera Control Buttons */}
              {!isScanning ? (
                <Button onClick={startScanner} className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <Button onClick={stopScanner} variant="outline" className="w-full">
                  Stop Camera
                </Button>
              )}

              {/* Simulate Scan Button (for testing) */}
              <Button onClick={handleSimulateScan} variant="secondary" className="w-full">
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
