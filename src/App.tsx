
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { lazy, Suspense } from "react";

// Layout components
import Layout from "./components/Layout";
import LoadingFallback from "./components/LoadingFallback";

// Lazy loaded pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Documents = lazy(() => import("./pages/Documents"));
const DocumentViewer = lazy(() => import("./pages/DocumentViewer"));
const Persons = lazy(() => import("./pages/Persons"));
const PersonDetail = lazy(() => import("./pages/PersonDetail"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Notes = lazy(() => import("./pages/Notes"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="documents" element={<Documents />} />
                <Route path="documents/:id" element={<DocumentViewer />} />
                <Route path="persons" element={<Persons />} />
                <Route path="persons/:id" element={<PersonDetail />} />
                <Route path="timeline" element={<Timeline />} />
                <Route path="notes" element={<Notes />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
