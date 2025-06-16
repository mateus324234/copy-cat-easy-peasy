
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Settings, FileText, PlusCircle, Globe, Home, Users } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/dashboard",
    icon: Users,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
  {
    title: "Script",
    url: "#",
    icon: FileText,
  },
  {
    title: "Novo Script",
    url: "#",
    icon: PlusCircle,
  },
  {
    title: "Sites",
    url: "#",
    icon: Globe,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-700 bg-gray-900/95 backdrop-blur-lg">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Settings className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Dashboard</h2>
            <p className="text-gray-400 text-xs">Painel de Controle</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mb-2">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="text-gray-300 hover:text-white hover:bg-blue-600/20 transition-all duration-200 rounded-lg group"
                  >
                    <a href={item.url} className="flex items-center space-x-3 p-3">
                      <item.icon className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-gray-700">
        <div className="text-center">
          <p className="text-gray-400 text-xs">v1.0.0</p>
          <p className="text-gray-500 text-xs">Admin Panel</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
