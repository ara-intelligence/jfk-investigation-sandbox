
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
  FileText,
  Bell,
  CheckCircle,
  Flag,
  Map
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

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
    title: "Evidence Map",
    path: "/map",
    icon: Map,
  },
  {
    title: "Global Search",
    path: "/search",
    icon: Search,
  },
];

// Case tasks with status
const caseTasks = [
  { id: 1, title: "Review witness statements", completed: true },
  { id: 2, title: "Cross-reference timelines", completed: false },
  { id: 3, title: "Analysis of bullet trajectories", completed: false },
  { id: 4, title: "Background check on O. Tippit", completed: false },
];

export function AppSidebar() {
  const location = useLocation();
  const [tasks, setTasks] = useState(caseTasks);
  
  // Check if the current path matches the menu item path
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Handle task completion toggle
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Calculate progress percentage
  const progressPercentage = Math.round(
    (tasks.filter(task => task.completed).length / tasks.length) * 100
  );

  return (
    <Sidebar className="border-r border-sidebar-border/60">
      <SidebarHeader className="p-4 flex items-center space-x-2 border-b border-sidebar-border/60">
        <Shield className="h-5 w-5 text-evidence" />
        <span className="font-mono text-lg tracking-tight">TERMINAL_SYS</span>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-sidebar-foreground/70 font-mono">CASE_JFK-112263</div>
            <div className="h-2 w-2 bg-evidence rounded-full animate-pulse"></div>
          </div>
          
          {/* Case Progress Tracker - Replacing the "ACTIVE INVESTIGATION" label */}
          <div className="mb-4 font-mono text-xs">
            <div className="flex justify-between items-center mb-1.5">
              <div className="text-primary text-xs font-mono flex items-center gap-1.5">
                <Flag className="h-3.5 w-3.5" />
                <span>INVESTIGATION PROGRESS</span>
              </div>
              <div className="text-primary">{progressPercentage}%</div>
            </div>
            <div className="w-full bg-sidebar-accent h-1.5 rounded-sm overflow-hidden">
              <div 
                className="bg-primary h-full rounded-sm transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            {/* Task checklist */}
            <div className="mt-3 space-y-1.5 text-xs max-h-32 overflow-y-auto pr-1">
              {tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-start w-full text-left p-1.5 rounded-sm hacker-menu-item ${
                    task.completed ? "text-primary/70" : "text-sidebar-foreground/80"
                  }`}
                >
                  <CheckCircle className={`h-3.5 w-3.5 mt-0.5 mr-1.5 flex-shrink-0 ${
                    task.completed ? "opacity-100" : "opacity-40"
                  }`} />
                  <span className={task.completed ? "line-through" : ""}>
                    {task.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Investigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center space-x-3 font-mono text-sm">
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
                placeholder="SEARCH FILES..."
                className="w-full rounded-sm border border-sidebar-border bg-sidebar-accent/30 py-2 pl-8 pr-3 text-sm ring-offset-background focus-visible:ring-1 focus-visible:ring-sidebar-ring focus-visible:outline-none transition-colors font-mono placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
        </SidebarGroup>
        
        <div className="px-4 py-4 mt-auto">
          <div className="flex items-center space-x-2 mb-1">
            <Fingerprint className="h-4 w-4 text-primary" />
            <span className="text-xs text-sidebar-foreground/70 font-mono">USER AUTHENTICATED</span>
          </div>
          <div className="text-xs font-mono text-sidebar-foreground/50 pt-1">
            ACCESS_LVL: 4 • TERM_ID: XK-342
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
