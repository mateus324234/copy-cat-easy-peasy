
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Users, CreditCard, QrCode, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { ExpandedCardContent } from "./ExpandedCardContent";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealtimeData } from "@/hooks/useRealtimeData";

export const ModernMetricsCards = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [loadingCard, setLoadingCard] = useState<number | null>(null);
  const { metrics } = useRealtimeData();

  const metricsData = [
    {
      title: "VISITAS",
      value: metrics.totalVisits.toString(),
      icon: Eye,
      color: "blue",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      cardType: "visits" as const
    },
    {
      title: "USER ONLINE",
      value: metrics.onlineUsers.toString(),
      icon: Users,
      color: "green",
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      cardType: "userOnline" as const
    },
    {
      title: "PAYMENTS",
      value: metrics.totalPayments.toString(),
      icon: CreditCard,
      color: "purple",
      gradient: "from-purple-600 to-violet-600",
      bgGradient: "from-purple-500/20 to-violet-500/20",
      cardType: "payments" as const
    },
    {
      title: "QR CODE COPIADOS",
      value: metrics.totalQRCodes.toString(),
      icon: QrCode,
      color: "orange",
      gradient: "from-orange-600 to-red-600",
      bgGradient: "from-orange-500/20 to-red-500/20",
      cardType: "qrCode" as const
    },
  ];

  const handleCardClick = (index: number) => {
    if (loadingCard !== null || expandedCard === index) {
      setExpandedCard(null);
      return;
    }

    setLoadingCard(index);
    setExpandedCard(null);

    setTimeout(() => {
      setLoadingCard(null);
      setExpandedCard(index);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <Card 
            key={index}
            className={`group bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-${metric.color}-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-${metric.color}-500/25 hover:-translate-y-2 cursor-pointer animate-fade-in ${
              expandedCard === index ? `border-${metric.color}-500/50 shadow-xl shadow-${metric.color}-500/25` : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleCardClick(index)}
          >
            <CardContent className="p-4 relative overflow-hidden">
              {/* Background gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                expandedCard === index ? 'opacity-100' : ''
              }`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                    expandedCard === index ? 'scale-110' : ''
                  }`}>
                    <metric.icon className="h-5 w-5 text-white" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 p-1"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
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

      {/* Loading State */}
      {loadingCard !== null && (
        <div className="animate-fade-in">
          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
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

      {/* Expanded Card Content */}
      {expandedCard !== null && loadingCard === null && (
        <div className="animate-fade-in">
          <ExpandedCardContent cardType={metricsData[expandedCard].cardType} />
        </div>
      )}
    </div>
  );
};
