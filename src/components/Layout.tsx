
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { AlertCircle, Shield } from "lucide-react";

const Layout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scannerPosition, setScannerPosition] = useState(0);

  useEffect(() => {
    // Ensure animations work correctly by setting a loaded state
    setIsLoaded(true);
    
    // Ensure smooth page transitions by scrolling to top
    window.scrollTo(0, 0);
    
    // Animation for scanner effect
    const interval = setInterval(() => {
      setScannerPosition(prev => (prev + 1) % 100);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-hidden relative">
        {/* Header bar with classification and scanning effect */}
        <div className="flex items-center p-4 h-16 border-b backdrop-blur-lg bg-card/30 z-10 sticky top-0">
          <SidebarTrigger />
          <Shield className="h-5 w-5 text-evidence ml-4 mr-2" />
          <h1 className="text-xl font-medium text-foreground">JFK Files Investigation</h1>
          <div className="ml-auto flex items-center space-x-3">
            <div className="px-2 py-1 text-xs bg-classified/20 text-classified-foreground border border-classified/40 rounded font-mono">
              CLASSIFIED
            </div>
            <div className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded font-mono flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" /> CLEARANCE LEVEL 4
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
            <div className="font-mono text-xl text-evidence">
              CONFIDENTIAL
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
