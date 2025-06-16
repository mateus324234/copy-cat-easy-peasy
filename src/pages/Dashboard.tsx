import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ModernMetricsCards } from "@/components/ModernMetricsCards";
import { Badge } from "@/components/ui/badge";
import { initializeTracking } from "@/utils/trackingScript";
import { listenToRealtimeData } from "@/services/firebase";
import { Wifi, WifiOff, Activity } from "lucide-react";

const Dashboard = () => {
  const [connectionStatus, setConnectionStatus] = useState("Conectando...");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    console.log('[Dashboard] Inicializando...');
    
    // Inicializar tracking do dashboard (mas não contar visitas)
    initializeTracking();
    
    // Escutar dados em tempo real do Firebase
    try {
      const unsubscribe = listenToRealtimeData((update) => {
        console.log('[Dashboard] Dados atualizados em tempo real:', update);
        setConnectionStatus("Conectado em tempo real ✓");
        setLastUpdate(new Date());
        // Os componentes de métricas serão atualizados automaticamente
      });
      
      setConnectionStatus("Ouvindo Firebase...");

      return () => {
        console.log('[Dashboard] Limpando listeners...');
        // Cleanup se necessário
      };
    } catch (error) {
      console.error('[Dashboard] Erro ao conectar Firebase:', error);
      setConnectionStatus("Erro de conexão");
    }
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
            {/* Status Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Queridos
                </h1>
                <p className="text-gray-400 mt-1">
                  Monitoramento de visitantes, pagamentos e QR codes
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge 
                  variant="outline" 
                  className={`${
                    connectionStatus.includes('✓') 
                      ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                      : connectionStatus.includes('Erro')
                      ? 'bg-red-500/20 border-red-500/30 text-red-300'
                      : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
                  }`}
                >
                  {connectionStatus.includes('✓') ? (
                    <Wifi className="h-3 w-3 mr-1" />
                  ) : connectionStatus.includes('Erro') ? (
                    <WifiOff className="h-3 w-3 mr-1" />
                  ) : (
                    <Activity className="h-3 w-3 mr-1 animate-spin" />
                  )}
                  {connectionStatus}
                </Badge>
                
                {lastUpdate && (
                  <Badge variant="outline" className="bg-blue-500/20 border-blue-500/30 text-blue-300">
                    Atualizado: {lastUpdate.toLocaleTimeString('pt-BR')}
                  </Badge>
                )}
              </div>
            </div>
            
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
