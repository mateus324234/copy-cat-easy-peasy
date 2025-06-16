
import { Card, CardContent } from "@/components/ui/card";
import { Users, Info, Shield, MousePointer } from "lucide-react";

export const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Visitantes</p>
              <p className="text-3xl font-bold text-white">38</p>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-500 text-sm">38 Online</span>
              </div>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Informações</p>
              <p className="text-3xl font-bold text-white">14,592</p>
              <span className="text-green-500 text-sm">+12.8%</span>
            </div>
            <Info className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Bloqueados</p>
              <p className="text-3xl font-bold text-white">347</p>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-red-500 text-sm">Crítico</span>
              </div>
            </div>
            <Shield className="h-8 w-8 text-red-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Clicks</p>
              <p className="text-3xl font-bold text-white">26,842</p>
              <span className="text-green-500 text-sm">CTR médio +7.4%</span>
            </div>
            <MousePointer className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
