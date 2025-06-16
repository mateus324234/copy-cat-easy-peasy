
import { Badge } from "@/components/ui/badge";

export const ModernDashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="w-full">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
          Dashboard
        </h1>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-blue-500/20 border-blue-500/30 text-blue-300">
            {currentDate}
          </Badge>
          <Badge variant="outline" className="bg-purple-500/20 border-purple-500/30 text-purple-300">
            {currentTime}
          </Badge>
        </div>
      </div>
    </div>
  );
};
