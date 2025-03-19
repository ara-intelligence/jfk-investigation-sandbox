
import { 
  Files, 
  Home, 
  Clock, 
  Users, 
  BookOpen,
  Search,
  Shield,
  AlertTriangle,
  Fingerprint,
  FileText
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Navigation items
const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Documents",
    path: "/documents",
    icon: FileText,
  },
  {
    title: "Persons of Interest",
    path: "/persons",
    icon: Users,
  },
  {
    title: "Timeline",
    path: "/timeline",
    icon: Clock,
  },
  {
    title: "Investigation Notes",
    path: "/notes",
    icon: BookOpen,
  },
  {
    title: "Global Search",
    path: "/search",
    icon: Search,
  },
];

export function AppSidebar() {
  const location = useLocation();
  
  // Check if the current path matches the menu item path
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-sidebar-border/60">
      <SidebarHeader className="p-4 flex items-center space-x-2 border-b border-sidebar-border/60">
        <Shield className="h-5 w-5 text-evidence" />
        <span className="font-bold text-lg tracking-tight">FBI Archives</span>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-sidebar-foreground/70 font-mono">CASE FILE: 11-22-1963</div>
            <div className="h-2 w-2 bg-evidence rounded-full animate-pulse"></div>
          </div>
          <div className="text-xs py-1 px-2 bg-sidebar-accent/40 rounded-sm mb-4 flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1.5 text-warning" />
            <span className="text-sidebar-foreground/90 font-mono">ACTIVE INVESTIGATION</span>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Investigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center space-x-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Quick search case files..."
                className="w-full rounded-md border border-sidebar-border bg-sidebar-accent/30 py-2 pl-8 pr-3 text-sm ring-offset-background focus-visible:ring-1 focus-visible:ring-sidebar-ring focus-visible:outline-none transition-colors"
              />
            </div>
          </div>
        </SidebarGroup>
        
        <div className="px-4 py-4 mt-auto">
          <div className="flex items-center space-x-2 mb-1">
            <Fingerprint className="h-4 w-4 text-primary" />
            <span className="text-xs text-sidebar-foreground/70 font-medium">AGENT AUTHENTICATED</span>
          </div>
          <div className="text-xs font-mono text-sidebar-foreground/50 pt-1">
            CLEARANCE LEVEL: 4 • TERMINAL: XK-342
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
