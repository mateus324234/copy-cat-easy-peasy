
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UserDetails } from "./UserDetails";

export const ModernClientsSection = () => {
  const [activeTab, setActiveTab] = useState("online");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gerenciamento de Clientes</h2>
        <Badge variant="outline" className="bg-blue-500/20 border-blue-500/30 text-blue-300">
          38 Ativos
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-800/50 border border-gray-700 backdrop-blur-lg p-1">
          <TabsTrigger 
            value="online" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-300 transition-all duration-300 hover:text-white"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Clientes Online</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="offline"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-gray-700 data-[state=active]:text-white text-gray-300 transition-all duration-300 hover:text-white"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span>Clientes Offline</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="online" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <UserDetails />
            {/* Additional user cards would go here */}
          </div>
        </TabsContent>

        <TabsContent value="offline" className="mt-6">
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-lg font-medium">Nenhum cliente offline no momento</p>
            <p className="text-gray-500 text-sm mt-2">Todos os clientes estão ativos e conectados</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
