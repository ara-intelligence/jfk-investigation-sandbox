
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Shield, Lock, MapPin, Compass, Mountain, Building, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

// Locations of interest
const LOCATIONS = [
  {
    name: "Dealey Plaza",
    coordinates: [-96.8086, 32.7795],
    description: "Site of the assassination",
    zoom: 17.5,
    pitch: 60,
    bearing: 45
  },
  {
    name: "Texas School Book Depository",
    coordinates: [-96.8083, 32.7802],
    description: "Location where Oswald allegedly fired shots",
    zoom: 18.5,
    pitch: 65,
    bearing: 30
  },
  {
    name: "Grassy Knoll",
    coordinates: [-96.8089, 32.7794],
    description: "Suspected location of second shooter",
    zoom: 18,
    pitch: 55,
    bearing: -30
  },
  {
    name: "Parkland Memorial Hospital",
    coordinates: [-96.8383, 32.8088],
    description: "Where President Kennedy was pronounced dead",
    zoom: 16,
    pitch: 50,
    bearing: 0
  }
];

const MapPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState(localStorage.getItem("mapbox_token") || "");
  const [tokenEntered, setTokenEntered] = useState(!!localStorage.getItem("mapbox_token"));
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || !tokenEntered || !mapboxToken) return;
    
    // Set Mapbox token
    mapboxgl.accessToken = mapboxToken;
    
    // Initialize map
    if (!map.current) {
      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/satellite-streets-v12",
          center: [-96.8086, 32.7795], // Dealey Plaza
          zoom: 16,
          pitch: 45,
          bearing: 0,
          projection: { name: "globe" } // Enable 3D globe projection
        });
        
        // Add navigation controls (zoom, rotation)
        map.current.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
            showCompass: true
          }),
          "top-right"
        );
        
        // Add scale control
        map.current.addControl(
          new mapboxgl.ScaleControl({
            maxWidth: 100,
            unit: "imperial"
          }),
          "bottom-left"
        );
        
        // Add atmosphere and fog for better 3D effect
        map.current.on("style.load", () => {
          // Add atmosphere
          map.current?.setFog({
            color: "rgb(186, 210, 235)",
            "high-color": "rgb(36, 92, 223)",
            "horizon-blend": 0.02,
            "space-color": "rgb(11, 11, 25)",
            "star-intensity": 0.6
          });
          
          // Add terrain
          map.current?.addSource("mapbox-dem", {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512
          });
          
          // Add 3D terrain
          map.current?.setTerrain({
            source: "mapbox-dem",
            exaggeration: 1.5
          });
          
          setMapLoaded(true);
          
          // Place markers for locations of interest
          LOCATIONS.forEach(location => {
            if (!map.current) return;
            
            // Create a custom marker element
            const markerElement = document.createElement("div");
            markerElement.className = "flex items-center justify-center w-8 h-8 bg-evidence rounded-full shadow-evidence";
            markerElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-background"><circle cx="12" cy="10" r="3"></circle><path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z"></path></svg>`;
            
            // Add popup
            const popup = new mapboxgl.Popup({ offset: 25, className: "custom-popup" })
              .setHTML(`
                <div class="font-mono">
                  <div class="text-evidence font-bold">${location.name}</div>
                  <div class="text-sm mt-1">${location.description}</div>
                </div>
              `);
            
            // Add marker to map
            const marker = new mapboxgl.Marker(markerElement)
              .setLngLat(location.coordinates)
              .setPopup(popup)
              .addTo(map.current);
            
            markers.current.push(marker);
          });
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        toast({
          title: "Map Error",
          description: "Failed to initialize map. Please check your Mapbox token.",
          variant: "destructive"
        });
        // Reset token if invalid
        localStorage.removeItem("mapbox_token");
        setTokenEntered(false);
      }
    }
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, tokenEntered]);
  
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapboxToken) {
      toast({
        title: "Token Required",
        description: "Please enter a valid Mapbox access token",
        variant: "destructive"
      });
      return;
    }
    
    // Save token to localStorage
    localStorage.setItem("mapbox_token", mapboxToken);
    setTokenEntered(true);
    
    toast({
      title: "Token Saved",
      description: "Your Mapbox token has been saved",
    });
  };
  
  const flyToLocation = (locationIndex: number) => {
    if (!map.current || !mapLoaded) return;
    
    const location = LOCATIONS[locationIndex];
    
    map.current.flyTo({
      center: location.coordinates,
      zoom: location.zoom,
      pitch: location.pitch,
      bearing: location.bearing,
      duration: 2000,
      essential: true
    });
    
    // Show popup
    setTimeout(() => {
      markers.current[locationIndex]?.togglePopup();
    }, 2500);
    
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
                <CardTitle>Investigation Map</CardTitle>
              </div>
              <CardDescription>
                Explore key locations in 3D
              </CardDescription>
            </CardHeader>
            
            {!tokenEntered ? (
              <CardContent>
                <form onSubmit={handleTokenSubmit} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="mapbox_token">Mapbox Access Token</Label>
                    <Input
                      id="mapbox_token"
                      value={mapboxToken}
                      onChange={(e) => setMapboxToken(e.target.value)}
                      placeholder="Enter your Mapbox public token"
                      className="font-mono text-xs"
                    />
                    <p className="text-xs text-muted-foreground">
                      Get a token at <a href="https://mapbox.com" target="_blank" rel="noreferrer" className="text-evidence hover:underline">mapbox.com</a>
                    </p>
                  </div>
                  <Button type="submit" className="w-full">
                    <Lock className="h-4 w-4 mr-1" />
                    Apply Token
                  </Button>
                </form>
              </CardContent>
            ) : (
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
                    <Mountain className="h-3.5 w-3.5 mr-1" /> 3D Enabled
                  </span>
                </div>
              </CardContent>
            )}
          </Card>
          
          {mapLoaded && (
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
                  <span className="text-muted-foreground">Right mouse drag</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono">Zoom:</span>
                  <span className="text-muted-foreground">Mouse wheel</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono">Tilt:</span>
                  <span className="text-muted-foreground">Ctrl + drag</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <div ref={mapContainer} className={`w-full h-[600px] ${!tokenEntered ? 'terminal-grid flex items-center justify-center' : ''}`}>
              {!tokenEntered && (
                <div className="text-center p-6 max-w-md">
                  <Building className="h-12 w-12 text-evidence mx-auto mb-4 opacity-70" />
                  <h3 className="text-lg font-mono text-primary mb-2">3D Map Viewer</h3>
                  <p className="text-muted-foreground mb-4">
                    Enter your Mapbox access token to enable the 3D investigation map. Explore key locations related to the case in an interactive environment.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
