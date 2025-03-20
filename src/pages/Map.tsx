
import { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import { Info, Shield, Compass, MapPin } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

// Locations of interest
const LOCATIONS = [
  {
    name: "Dealey Plaza",
    coordinates: { lat: 32.7795, lng: -96.8086, altitude: 0.05 },
    description: "Site of the assassination",
  },
  {
    name: "Texas School Book Depository",
    coordinates: { lat: 32.7802, lng: -96.8083, altitude: 0.05 },
    description: "Location where Oswald allegedly fired shots",
  },
  {
    name: "Grassy Knoll",
    coordinates: { lat: 32.7794, lng: -96.8089, altitude: 0.05 },
    description: "Suspected location of second shooter",
  },
  {
    name: "Parkland Memorial Hospital",
    coordinates: { lat: 32.8088, lng: -96.8383, altitude: 0.05 },
    description: "Where President Kennedy was pronounced dead",
  }
];

const MapPage = () => {
  const globeEl = useRef<HTMLDivElement>(null);
  const globe = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  
  const customGlobeImageUrl = "https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-night.jpg";
  
  // Initialize globe
  useEffect(() => {
    if (!globeEl.current) return;
    
    // Create the globe instance
    globe.current = Globe()
      .globeImageUrl(customGlobeImageUrl)
      .backgroundColor("rgba(5, 5, 35, 1)")
      .atmosphereColor("rgba(65, 119, 134, 0.7)")
      .atmosphereAltitude(0.15)
      .pointsData(LOCATIONS)
      .pointLabel("name")
      .pointLat(d => d.coordinates.lat)
      .pointLng(d => d.coordinates.lng)
      .pointAltitude(d => d.coordinates.altitude)
      .pointRadius(0.5)
      .pointColor(() => "#00ff8c")
      .pointResolution(64)
      .pointsMerge(true)
      .pointsTransitionDuration(1000)
      .customLayerData(LOCATIONS)
      .customThreeObject(d => {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 16, 16),
          new THREE.MeshLambertMaterial({ 
            color: '#00ff8c',
            transparent: true,
            opacity: 0.8
          })
        );
        return mesh;
      })
      .customThreeObjectUpdate((obj, d) => {
        Object.assign(obj.position, globe.current.getCoords(
          d.coordinates.lat, 
          d.coordinates.lng, 
          d.coordinates.altitude
        ));
      });
    
    // Set initial position - Dallas, Texas
    globe.current
      .pointOfView({ 
        lat: 32.7795, 
        lng: -96.8086, 
        altitude: 1.5 
      }, 2000)
      .enablePointerInteraction(true);
    
    // Add glow effect
    const globeMaterial = globe.current.globeMaterial();
    globeMaterial.bumpScale = 5;
    
    // Mount the globe
    globe.current(globeEl.current);
    
    // Add event listener for points
    globe.current.onPointClick(point => {
      flyToLocation(LOCATIONS.findIndex(loc => loc.name === point.name));
    });

    // Set globe as ready
    setGlobeReady(true);
    
    // Cleanup
    return () => {
      if (globe.current && globeEl.current) {
        // Manual cleanup of the globe instance
        globeEl.current.innerHTML = '';
      }
    };
  }, []);
  
  // Fly to a specific location
  const flyToLocation = (locationIndex: number) => {
    if (!globe.current || locationIndex < 0 || locationIndex >= LOCATIONS.length) return;
    
    const location = LOCATIONS[locationIndex];
    
    globe.current.pointOfView(
      {
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
        altitude: 0.5
      },
      1500
    );
    
    toast({
      title: `Navigating to ${location.name}`,
      description: location.description,
    });
  };
  
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-1">
                <Compass className="h-5 w-5 text-evidence" />
                <CardTitle>Investigation Globe</CardTitle>
              </div>
              <CardDescription>
                Explore key locations in 3D
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="terminal-panel rounded-md p-3">
                <div className="text-xs font-mono flex items-center space-x-1.5 text-primary mb-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  <span>LOCATIONS OF INTEREST</span>
                </div>
                
                <Separator className="my-2 bg-primary/20" />
                
                <div className="space-y-2 mt-3">
                  {LOCATIONS.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => flyToLocation(index)}
                      className="w-full flex items-center text-left p-2 rounded-sm hacker-menu-item"
                    >
                      <MapPin className="h-3.5 w-3.5 mr-1.5" />
                      <span className="font-mono text-xs">{location.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <span>Use mouse to navigate</span>
                <span className="flex items-center">
                  <span className="h-2 w-2 bg-evidence rounded-full mr-1.5"></span> 3D Globe
                </span>
              </div>
            </CardContent>
          </Card>
          
          {globeReady && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-1">
                  <Info className="h-5 w-5 text-evidence" />
                  <CardTitle>Navigation Help</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono">Pan:</span>
                  <span className="text-muted-foreground">Left mouse drag</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono">Rotate:</span>
                  <span className="text-muted-foreground">Left mouse drag</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono">Zoom:</span>
                  <span className="text-muted-foreground">Mouse wheel</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono">Click marker:</span>
                  <span className="text-muted-foreground">Fly to location</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <div ref={globeEl} className="w-full h-[600px]"></div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
