
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { AlertCircle, Shield, Terminal, Lock } from "lucide-react";

const Layout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scannerPosition, setScannerPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Ensure animations work correctly by setting a loaded state
    setIsLoaded(true);
    
    // Ensure smooth page transitions by scrolling to top
    window.scrollTo(0, 0);
    
    // Animation for scanner effect
    const scannerInterval = setInterval(() => {
      setScannerPosition(prev => (prev + 1) % 100);
    }, 3000);
    
    // Update current time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(scannerInterval);
      clearInterval(timeInterval);
    };
  }, []);

  // Format time as HH:MM:SS
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-hidden relative">
        {/* Header bar with classification and scanning effect */}
        <div className="flex items-center p-4 h-16 border-b backdrop-blur-lg bg-card/30 z-10 sticky top-0 border-primary/20">
          <SidebarTrigger />
          <Terminal className="h-5 w-5 text-primary ml-4 mr-2" />
          <h1 className="text-xl font-mono text-foreground">JFK FILES INVESTIGATION</h1>
          <div className="ml-auto flex items-center space-x-3">
            <div className="text-xs font-mono text-primary/70 mr-2">
              SYS_TIME: {formattedTime}
            </div>
            <div className="px-2 py-1 text-xs bg-classified/20 text-classified-foreground border border-classified/50 rounded-sm font-mono flex items-center">
              <Lock className="h-3 w-3 mr-1.5" /> 
              CLASSIFIED
            </div>
            <div className="px-2 py-1 text-xs bg-secondary text-primary border border-primary/40 rounded-sm font-mono flex items-center">
              <AlertCircle className="h-3 w-3 mr-1.5" /> 
              CLEARANCE LEVEL 4
            </div>
          </div>
        </div>
        
        {/* Main content area with scanning line effect */}
        <div 
          className={`p-6 overflow-auto h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out grid-bg relative ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
        >
          {/* Moving scanner line effect */}
          <div 
            className="scanning-line" 
            style={{ top: `${scannerPosition}%` }}
          />
          
          {/* Content */}
          <Outlet />

          {/* Classification watermark */}
          <div className="fixed bottom-4 right-4 opacity-20 transform rotate-45 pointer-events-none">
            <div className="font-mono text-xl text-primary">
              CONFIDENTIAL
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
