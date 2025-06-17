
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { SiteProvider } from '@/context/SiteContext';

import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Payments from '@/pages/Payments';
import QRCode from '@/pages/QRCode';
import Scripts from '@/pages/Scripts';
import ScriptTest from '@/pages/ScriptTest';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SiteProvider>
        <HashRouter>
          <Toaster />
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/qrcode" element={<QRCode />} />
              <Route path="/scripts" element={<Scripts />} />
              <Route path="/script-test" element={<ScriptTest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </HashRouter>
      </SiteProvider>
    </QueryClientProvider>
  );
}

export default App;
