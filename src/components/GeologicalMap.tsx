import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import geologicalMapImage from "@/assets/geological-map.jpg";
import { MapPin, Lock, Eye, EyeOff } from "lucide-react";

interface DrillSite {
  id: string;
  x: number;
  y: number;
  mineral: string;
  value: string;
  encrypted: boolean;
  status: 'active' | 'pending' | 'completed';
}

const mockSites: DrillSite[] = [
  { id: "1", x: 25, y: 35, mineral: "Copper", value: "2.5M RWAC", encrypted: true, status: 'active' },
  { id: "2", x: 60, y: 45, mineral: "Gold", value: "8.2M RWAG", encrypted: false, status: 'pending' },
  { id: "3", x: 40, y: 70, mineral: "Silver", value: "1.8M RWAS", encrypted: true, status: 'completed' },
  { id: "4", x: 75, y: 25, mineral: "Lithium", value: "4.1M RWAL", encrypted: false, status: 'active' },
  { id: "5", x: 15, y: 80, mineral: "Iron", value: "950K RWAI", encrypted: true, status: 'pending' },
];

const GeologicalMap = () => {
  const [selectedSite, setSelectedSite] = useState<DrillSite | null>(null);
  const [showEncrypted, setShowEncrypted] = useState(false);

  const getSiteColor = (site: DrillSite) => {
    if (site.encrypted && !showEncrypted) return "encrypted";
    
    switch (site.mineral) {
      case "Copper": return "copper";
      case "Gold": return "gold";
      case "Silver": return "stone";
      case "Lithium": return "primary";
      case "Iron": return "earth";
      default: return "muted";
    }
  };

  const getSiteStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-accent";
      case "pending": return "bg-primary";
      case "completed": return "bg-secondary";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">
          Geological Survey Interface
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowEncrypted(!showEncrypted)}
            className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            {showEncrypted ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {showEncrypted ? "Hide" : "Show"} Encrypted Sites
          </button>
          <Badge variant="outline" className="border-accent text-accent">
            {mockSites.length} Active Sites
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="relative h-[600px] overflow-hidden bg-gradient-geological">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${geologicalMapImage})` }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/10" />
            
            {/* Scanning animation overlay */}
            <div className="absolute inset-0">
              <div className="h-full w-1 bg-accent/30 animate-geological-scan" />
            </div>

            {/* Drill sites */}
            {mockSites.map((site) => (
              <div
                key={site.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${site.x}%`, top: `${site.y}%` }}
                onClick={() => setSelectedSite(site)}
              >
                <div className="relative">
                  <div 
                    className={`h-4 w-4 rounded-full animate-drill-pulse border-2 ${
                      site.encrypted && !showEncrypted 
                        ? "bg-encrypted border-encrypted/50 blur-sm" 
                        : `bg-${getSiteColor(site)} border-${getSiteColor(site)}/50`
                    }`}
                  />
                  {site.encrypted && !showEncrypted && (
                    <Lock className="absolute -top-1 -right-1 h-3 w-3 text-encrypted" />
                  )}
                  <MapPin className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-3 w-3 text-foreground/70" />
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Site Details</h3>
            {selectedSite ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Site ID:</span>
                  <span className="font-mono">{selectedSite.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mineral:</span>
                  <Badge className={`bg-${getSiteColor(selectedSite)}`}>
                    {selectedSite.encrypted && !showEncrypted ? "████████" : selectedSite.mineral}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Token Value:</span>
                  <span className="font-semibold">
                    {selectedSite.encrypted && !showEncrypted ? "████████" : selectedSite.value}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className={getSiteStatusColor(selectedSite.status)}>
                    {selectedSite.status}
                  </Badge>
                </div>
                {selectedSite.encrypted && (
                  <div className="p-3 bg-encrypted/10 rounded-lg border border-encrypted/20">
                    <div className="flex items-center gap-2 text-encrypted">
                      <Lock className="h-4 w-4" />
                      <span className="text-sm">Encrypted Site</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Full details protected until trade finalization
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">Select a drill site to view details</p>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Active Trades</h3>
            <div className="space-y-3">
              {mockSites.filter(site => site.status === 'active').map((site) => (
                <div key={site.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">
                      {site.encrypted && !showEncrypted ? "████████" : site.mineral} Rights
                    </p>
                    <p className="text-sm text-muted-foreground">Site #{site.id}</p>
                  </div>
                  <Badge className={`bg-${getSiteColor(site)}`}>
                    {site.encrypted && !showEncrypted ? "████" : site.value.split(' ')[0]}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GeologicalMap;