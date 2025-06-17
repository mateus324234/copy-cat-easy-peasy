
import { useEffect } from "react";
import { ModernMetricsCards } from "@/components/ModernMetricsCards";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { NotificationSystem } from "@/components/NotificationSystem";
import { initializeTracking } from "@/utils/trackingScript";

const Dashboard = () => {
  useEffect(() => {
    console.log('[Dashboard] Inicializando...');
    
    // Inicializar tracking do dashboard (mas não contar visitas)
    initializeTracking();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <HeaderNavigation />
      
      <main className="relative min-h-screen overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative z-10 p-6">
          <div className="animate-fade-in">
            <ModernMetricsCards />
          </div>
        </div>
        
        <NotificationSystem 
          onNewVisit={(visitor) => console.log('New visit:', visitor)}
          onNewPayment={(payment) => console.log('New payment:', payment)}
          onNewQRCode={(qr) => console.log('New QR code:', qr)}
        />
      </main>
    </div>
  );
};

export default Dashboard;
