
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDetails } from "./UserDetails";

export const ClientsSection = () => {
  const [activeTab, setActiveTab] = useState("online");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger 
            value="online" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
          >
            Clientes Online
          </TabsTrigger>
          <TabsTrigger 
            value="offline"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
          >
            Clientes Offline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="online" className="mt-6">
          <UserDetails />
        </TabsContent>

        <TabsContent value="offline" className="mt-6">
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400">Nenhum cliente offline no momento</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
