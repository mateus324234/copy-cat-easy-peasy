
import { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ModernMetricsCards } from "@/components/ModernMetricsCards";
import { initializeTracking } from "@/utils/trackingScript";
import { listenToRealtimeData } from "@/services/firebase";

const Dashboard = () => {
  useEffect(() => {
    // Inicializar tracking do dashboard (mas não contar visitas)
    initializeTracking();

    // Escutar dados em tempo real do Firebase
    const unsubscribe = listenToRealtimeData((update) => {
      console.log('[Dashboard] Dados atualizados em tempo real:', update);
      // Os componentes de métricas serão atualizados automaticamente
    });

    return () => {
      // Cleanup se necessário
    };
  }, []);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black flex">
        <AppSidebar />
        <main className="flex-1 min-h-screen overflow-hidden">
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
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
