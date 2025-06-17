
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Users, CreditCard, QrCode, Trash2 } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { ExpandedCardContent } from "./ExpandedCardContent";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { clearData } from "@/services/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const ModernMetricsCards = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [loadingCard, setLoadingCard] = useState<number | null>(null);
  const [clearingCard, setClearingCard] = useState<number | null>(null);
  const { metrics } = useRealtimeData();
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    // Validação adicional para valores inválidos
    if (typeof value !== 'number' || isNaN(value)) {
      console.warn('[ModernMetricsCards] Valor inválido para formatação de moeda:', value);
      return 'R$ 0,00';
    }
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Validação robusta das métricas
  const safeMetrics = {
    totalVisits: (metrics?.totalVisits && typeof metrics.totalVisits === 'number') ? metrics.totalVisits : 0,
    onlineUsers: (metrics?.onlineUsers && typeof metrics.onlineUsers === 'number') ? metrics.onlineUsers : 0,
    paymentTotal: (metrics?.paymentTotal && typeof metrics.paymentTotal === 'number') ? metrics.paymentTotal : 0,
    totalQRCodes: (metrics?.totalQRCodes && typeof metrics.totalQRCodes === 'number') ? metrics.totalQRCodes : 0,
  };

  const metricsData = [
    {
      title: "VISITAS",
      value: safeMetrics.totalVisits.toString(),
      icon: Eye,
      color: "blue",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      cardType: "visits" as const,
      clearFunction: clearData.clearVisitors,
      clearMessage: "Limpar todas as visitas registradas?"
    },
    {
      title: "USER ONLINE",
      value: safeMetrics.onlineUsers.toString(),
      icon: Users,
      color: "green",
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      cardType: "userOnline" as const,
      clearFunction: clearData.clearVisitors,
      clearMessage: "Limpar todos os usuários online?"
    },
    {
      title: "PAYMENTS",
      value: formatCurrency(safeMetrics.paymentTotal),
      icon: CreditCard,
      color: "purple",
      gradient: "from-purple-600 to-violet-600",
      bgGradient: "from-purple-500/20 to-violet-500/20",
      cardType: "payments" as const,
      clearFunction: clearData.clearPayments,
      clearMessage: "Limpar todos os pagamentos registrados?"
    },
    {
      title: "QR CODE COPIADOS",
      value: safeMetrics.totalQRCodes.toString(),
      icon: QrCode,
      color: "orange",
      gradient: "from-orange-600 to-red-600",
      bgGradient: "from-orange-500/20 to-red-500/20",
      cardType: "qrCode" as const,
      clearFunction: clearData.clearQRCodes,
      clearMessage: "Limpar todos os QR codes registrados?"
    },
  ];

  const handleCardClick = (index: number, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }

    if (expandedCard === index) {
      setExpandedCard(null);
      return;
    }

    if (loadingCard !== null || clearingCard !== null) {
      return;
    }

    setLoadingCard(index);
    setExpandedCard(null);

    setTimeout(() => {
      setLoadingCard(null);
      setExpandedCard(index);
    }, 800);
  };

  const handleClearData = async (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    
    setClearingCard(index);
    
    try {
      await metricsData[index].clearFunction();
      
      toast({
        title: "Dados limpos com sucesso!",
        description: `${metricsData[index].title} foram removidos do sistema.`,
      });
      
      if (expandedCard === index) {
        setExpandedCard(null);
      }
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      toast({
        title: "Erro ao limpar dados",
        description: "Ocorreu um erro ao tentar limpar os dados.",
        variant: "destructive",
      });
    } finally {
      setClearingCard(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <Card 
            key={index}
            className={`group bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-${metric.color}-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-${metric.color}-500/25 hover:-translate-y-2 cursor-pointer animate-fade-in rounded-2xl ${
              expandedCard === index ? `border-${metric.color}-500/50 shadow-xl shadow-${metric.color}-500/25` : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={(e) => handleCardClick(index, e)}
          >
            <CardContent className="p-4 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${
                expandedCard === index ? 'opacity-100' : ''
              }`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                    expandedCard === index ? 'scale-110' : ''
                  }`}>
                    <metric.icon className="h-5 w-5 text-white" />
                  </div>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300 p-1"
                        disabled={clearingCard === index}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {clearingCard === index ? (
                          <div className="h-3 w-3 animate-spin rounded-full border border-red-400 border-t-transparent"></div>
                        ) : (
                          <Trash2 className="h-3 w-3" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-gray-800 border-gray-700 rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Confirmar Limpeza</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                          {metric.clearMessage} Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 rounded-xl">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 rounded-xl"
                          onClick={(e) => handleClearData(index, e)}
                        >
                          Limpar Dados
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                
                <div className="space-y-1">
                  <p className="text-gray-400 text-xs font-medium">{metric.title}</p>
                  <p className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                    {metric.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loadingCard !== null && (
        <div className="animate-fade-in">
          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 rounded-2xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-6 w-6 rounded bg-gray-700" />
                  <Skeleton className="h-6 w-48 bg-gray-700" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-20 w-full bg-gray-700" />
                  <Skeleton className="h-20 w-full bg-gray-700" />
                  <Skeleton className="h-20 w-full bg-gray-700" />
                </div>
              </div>
              <LoadingSpinner />
            </CardContent>
          </Card>
        </div>
      )}

      {expandedCard !== null && loadingCard === null && (
        <div className="animate-fade-in">
          <ExpandedCardContent cardType={metricsData[expandedCard].cardType} />
        </div>
      )}
    </div>
  );
};
