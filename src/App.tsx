
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Scripts from "@/pages/Scripts";
import Dashboard from "@/pages/Dashboard";
import TrackingAPISimulator from "@/components/TrackingAPISimulator";
import { SiteProvider } from "@/context/SiteContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SiteProvider>
        <Router>
          <Toaster />
          <TrackingAPISimulator />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scripts" element={<Scripts />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </SiteProvider>
    </QueryClientProvider>
  );
}

export default App;
