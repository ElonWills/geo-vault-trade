import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wallet } from "lucide-react";

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const { toast } = useToast();

  const connectWallet = () => {
    // Simulate wallet connection
    const mockAddress = "0x" + Math.random().toString(16).substr(2, 40);
    setAddress(mockAddress);
    setIsConnected(true);
    
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to mining rights exchange",
    });
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
    
    toast({
      title: "Wallet Disconnected",
      description: "Wallet disconnected from exchange",
    });
  };

  return (
    <div className="flex items-center gap-3">
      {isConnected ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
            <div className="h-2 w-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-mono">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={disconnectWallet}
            className="border-stone text-stone hover:bg-stone hover:text-background"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button 
          onClick={connectWallet}
          className="bg-gradient-copper hover:opacity-90 text-background font-semibold"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;