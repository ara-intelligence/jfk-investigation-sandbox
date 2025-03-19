
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure animations work correctly by setting a loaded state
    setIsLoaded(true);
    
    // Ensure smooth page transitions by scrolling to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 overflow-hidden">
        <div className="flex items-center p-4 h-16 border-b backdrop-blur-sm bg-white/50 dark:bg-black/30 z-10 sticky top-0">
          <SidebarTrigger />
          <h1 className="text-xl font-medium ml-4">JFK Files Investigation</h1>
        </div>
        <div 
          className={`p-6 overflow-auto h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
