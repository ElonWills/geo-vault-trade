import Logo from "./Logo";
import WalletConnect from "./WalletConnect";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-foreground">
              Confidential RWA Rights Exchange
            </h1>
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;