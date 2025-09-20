import logoImage from "@/assets/rwa-logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={logoImage} 
        alt="RWA Mining Rights Exchange Logo" 
        className="h-10 w-10"
      />
      <span className="text-xl font-bold bg-gradient-copper bg-clip-text text-transparent">
        RWA Mining Exchange
      </span>
    </div>
  );
};

export default Logo;