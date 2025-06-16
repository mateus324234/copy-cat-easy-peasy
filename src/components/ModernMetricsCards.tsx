
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Info, Shield, MousePointer, MoreHorizontal, TrendingUp } from "lucide-react";
import { useState } from "react";

const metricsData = [
  {
    title: "Visitantes",
    value: "38",
    subtitle: "38 Online",
    icon: Users,
    color: "blue",
    gradient: "from-blue-600 to-cyan-600",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    change: "+5.2%",
    trend: "up"
  },
  {
    title: "Informações",
    value: "14,592",
    subtitle: "+12.8%",
    icon: Info,
    color: "green",
    gradient: "from-green-600 to-emerald-600",
    bgGradient: "from-green-500/20 to-emerald-500/20",
    change: "+12.8%",
    trend: "up"
  },
  {
    title: "Bloqueados",
    value: "347",
    subtitle: "Crítico",
    icon: Shield,
    color: "red",
    gradient: "from-red-600 to-pink-600",
    bgGradient: "from-red-500/20 to-pink-500/20",
    change: "-2.1%",
    trend: "down"
  },
  {
    title: "Clicks",
    value: "26,842",
    subtitle: "CTR médio +7.4%",
    icon: MousePointer,
    color: "purple",
    gradient: "from-purple-600 to-violet-600",
    bgGradient: "from-purple-500/20 to-violet-500/20",
    change: "+7.4%",
    trend: "up"
  },
];

export const ModernMetricsCards = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => (
        <Card 
          key={index}
          className={`group bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-${metric.color}-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-${metric.color}-500/25 hover:-translate-y-2 cursor-pointer animate-fade-in`}
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={() => setExpandedCard(expandedCard === index ? null : index)}
        >
          <CardContent className="p-6 relative overflow-hidden">
            {/* Background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="h-6 w-6 text-white animate-pulse" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-400 text-sm font-medium">{metric.title}</p>
                <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                  {metric.value}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'} flex items-center space-x-1`}>
                    <TrendingUp className={`h-3 w-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span>{metric.change}</span>
                  </span>
                  <span className="text-gray-400 text-sm">{metric.subtitle}</span>
                </div>
              </div>
              
              {/* Expanded content */}
              {expandedCard === index && (
                <div className="mt-4 pt-4 border-t border-gray-700 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-gray-400">Hoje</p>
                      <p className="text-white font-medium">1,247</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Esta semana</p>
                      <p className="text-white font-medium">8,932</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Este mês</p>
                      <p className="text-white font-medium">32,451</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Último mês</p>
                      <p className="text-white font-medium">28,763</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
