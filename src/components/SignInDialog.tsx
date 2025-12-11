import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle, Minus, Plus, Coins } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venueName: string;
  gameId?: string;
}

interface SignInData {
  gameId: string;
  venueName: string;
  foodDrinkAmount: number;
  foodDrinkChips: number;
  isVIP: boolean;
  vipChips: number;
  isDealer: boolean;
  dealerChips: number;
  totalChips: number;
  timestamp: string;
}

export const SignInDialog = ({ open, onOpenChange, venueName, gameId = '' }: SignInDialogProps) => {
  const [foodDrinkAmount, setFoodDrinkAmount] = useState(0);
  const [isVIP, setIsVIP] = useState(false);
  const [isDealer, setIsDealer] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrData, setQRData] = useState<string>('');

  const foodDrinkChips = foodDrinkAmount * 100;
  const vipChips = isVIP ? 1500 : 0;
  const dealerChips = isDealer ? 1500 : 0;
  
  const totalChips = useMemo(() => {
    return foodDrinkChips + vipChips + dealerChips;
  }, [foodDrinkChips, vipChips, dealerChips]);

  const handleFoodDrinkChange = (value: number) => {
    const newValue = Math.max(0, Math.min(30, value));
    setFoodDrinkAmount(newValue);
  };

  const handleVIPToggle = (checked: boolean) => {
    if (checked) {
      toast({
        title: "VIP Membership Required",
        description: (
          <span>
            Purchase a VIP membership for 6 months{' '}
            <a 
              href="https://atlantapokerclub.com/league/memberships/vip-memberships/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent underline hover:text-accent/80"
            >
              here
            </a>
          </span>
        ),
      });
      return;
    }
    setIsVIP(false);
  };

  const handleCompleteSignIn = () => {
    const signInData: SignInData = {
      gameId,
      venueName,
      foodDrinkAmount,
      foodDrinkChips,
      isVIP,
      vipChips,
      isDealer,
      dealerChips,
      totalChips,
      timestamp: new Date().toISOString(),
    };
    
    const jsonString = JSON.stringify(signInData);
    setQRData(jsonString);
    setShowQRCode(true);
  };

  const handleClose = (openState: boolean) => {
    if (!openState) {
      // Reset form when closing
      setFoodDrinkAmount(0);
      setIsVIP(false);
      setIsDealer(false);
      setShowQRCode(false);
      setQRData('');
    }
    onOpenChange(openState);
  };

  if (showQRCode) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">Sign In Pending</DialogTitle>
            <DialogDescription className="text-muted-foreground text-center">
              Show this QR code to the tournament director
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center py-8">
            <div className="bg-white p-4 rounded-xl">
              <QRCodeSVG 
                value={qrData} 
                size={200}
                level="M"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              {venueName} • {totalChips.toLocaleString()} bonus chips
            </p>
          </div>

          <Button 
            onClick={() => handleClose(false)}
            variant="outline"
            className="w-full"
          >
            Done
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl">Game Sign In</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Sign in to {venueName} and earn bonus chips!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Food & Drink Commitment */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Food & Drink Commitment</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px] bg-popover border-border">
                  <p className="text-sm">
                    The amount you spend on food and drinks at the venue earns you free bonus chips. 
                    Every $1 spent = 100 bonus chips (up to $30).
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0"
                  onClick={() => handleFoodDrinkChange(foodDrinkAmount - 5)}
                  disabled={foodDrinkAmount <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    value={foodDrinkAmount}
                    onChange={(e) => handleFoodDrinkChange(parseInt(e.target.value) || 0)}
                    className="pl-7 text-center text-lg font-semibold"
                    min={0}
                    max={30}
                  />
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0"
                  onClick={() => handleFoodDrinkChange(foodDrinkAmount + 5)}
                  disabled={foodDrinkAmount >= 30}
                >
                  <Plus className="h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="shrink-0 px-3"
                  onClick={() => handleFoodDrinkChange(30)}
                  disabled={foodDrinkAmount >= 30}
                >
                  Max
                </Button>
              </div>
              
              <div className="flex items-center gap-1.5 min-w-[90px] justify-end">
                <Coins className="w-4 h-4 text-accent" />
                <span className="font-semibold text-accent">{foodDrinkChips.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* VIP Toggle */}
          <div className="flex items-center justify-between py-3 border-t border-border">
            <div className="flex items-center gap-3">
              <Switch
                id="vip-toggle"
                checked={isVIP}
                onCheckedChange={handleVIPToggle}
              />
              <Label htmlFor="vip-toggle" className="text-sm font-medium cursor-pointer">
                VIP Member
              </Label>
            </div>
            <div className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-accent" />
              <span className={`font-semibold ${isVIP ? 'text-accent' : 'text-muted-foreground'}`}>
                1,500
              </span>
            </div>
          </div>

          {/* Dealer Toggle */}
          <div className="flex items-center justify-between py-3 border-t border-border">
            <div className="flex items-center gap-3">
              <Switch
                id="dealer-toggle"
                checked={isDealer}
                onCheckedChange={setIsDealer}
              />
              <Label htmlFor="dealer-toggle" className="text-sm font-medium cursor-pointer">
                Dealer
              </Label>
            </div>
            <div className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-accent" />
              <span className={`font-semibold ${isDealer ? 'text-accent' : 'text-muted-foreground'}`}>
                1,500
              </span>
            </div>
          </div>

          {/* Total Chips */}
          <div className="flex items-center justify-between py-4 px-4 bg-secondary/50 rounded-lg border-t border-border">
            <span className="font-semibold text-lg">Total Bonus Chips</span>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-accent" />
              <span className="text-xl font-bold text-accent">{totalChips.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleCompleteSignIn}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
        >
          Complete Sign In
        </Button>
      </DialogContent>
    </Dialog>
  );
};
