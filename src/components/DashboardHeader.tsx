
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const DashboardHeader = () => {
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
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          {currentDate} • {currentTime}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-white font-medium">Admin User</p>
          <p className="text-gray-400 text-sm">Administrador</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-blue-600 text-white">AU</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
