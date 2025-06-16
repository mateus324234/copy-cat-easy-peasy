
import { DashboardHeader } from "@/components/DashboardHeader";
import { MetricsCards } from "@/components/MetricsCards";
import { ClientsSection } from "@/components/ClientsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6 space-y-6">
        <DashboardHeader />
        <MetricsCards />
        <ClientsSection />
      </div>
    </div>
  );
};

export default Index;
