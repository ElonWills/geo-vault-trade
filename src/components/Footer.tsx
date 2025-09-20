import miningCartImage from "@/assets/mining-cart.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">RWA Mining Exchange</h3>
            <p className="text-sm text-muted-foreground">
              Secure tokenized mineral rights trading with advanced encryption to prevent front-running.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Trading</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Copper Rights</li>
              <li>Gold Rights</li>
              <li>Silver Rights</li>
              <li>Lithium Rights</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Security</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Encrypted Sites</li>
              <li>Anti Front-Running</li>
              <li>Wallet Integration</li>
              <li>Secure Transactions</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Support</li>
              <li>Legal</li>
            </ul>
          </div>
        </div>

        {/* Mining cart animation */}
        <div className="relative mt-12 pt-8 border-t border-border overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 RWA Mining Exchange. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Powered by blockchain technology</span>
            </div>
          </div>
          
          {/* Animated mining cart */}
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none">
            <div className="relative h-full">
              <img 
                src={miningCartImage} 
                alt="Mining Cart"
                className="absolute bottom-2 h-12 w-12 animate-mining-cart opacity-70"
              />
              {/* Mining track */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-stone to-transparent opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;