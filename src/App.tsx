
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { lazy, Suspense, useEffect, useState } from "react";

// Layout components
import Layout from "./components/Layout";
import LoadingFallback from "./components/LoadingFallback";

// Eagerly load commonly accessed pages for faster transitions
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Persons from "./pages/Persons";
import Notes from "./pages/Notes";

// Lazy load less frequently accessed pages
const DocumentViewer = lazy(() => import("./pages/DocumentViewer"));
const PersonDetail = lazy(() => import("./pages/PersonDetail"));
const Timeline = lazy(() => import("./pages/Timeline"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Search = lazy(() => import("./pages/Search"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

// Create a minimal loading wrapper to reduce loading flicker
const MinimalSuspense = ({ children }: { children: React.ReactNode }) => {
  const [showLoader, setShowLoader] = useState(false);
  
  useEffect(() => {
    // Only show loading screen if loading takes more than 150ms
    const timer = setTimeout(() => setShowLoader(true), 150);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Suspense fallback={showLoader ? <LoadingFallback /> : null}>
      {children}
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MinimalSuspense>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="documents" element={<Documents />} />
                <Route path="documents/:id" element={<DocumentViewer />} />
                <Route path="persons" element={<Persons />} />
                <Route path="persons/:id" element={<PersonDetail />} />
                <Route path="timeline" element={<Timeline />} />
                <Route path="notes" element={<Notes />} />
                <Route path="search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </MinimalSuspense>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
