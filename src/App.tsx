import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Scripts from "@/pages/Scripts";
import Analytics from "@/pages/Analytics";
import TrackingAPISimulator from "@/components/TrackingAPISimulator";

function App() {
  return (
    <QueryClient>
      <Router>
        <Toaster />
        <TrackingAPISimulator />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scripts" element={<Scripts />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </QueryClient>
  );
}

export default App;
