
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <div className="flex justify-between items-center w-full">
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
      
      <div className="flex items-center space-x-4">
        <div className="text-right space-y-1">
          <p className="text-white font-medium text-lg">Admin User</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-green-400 text-sm font-medium">Online</p>
          </div>
        </div>
        <Avatar className="h-12 w-12 ring-2 ring-blue-500/30 hover:ring-blue-500/60 transition-all duration-300 hover:scale-110">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
            AU
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
