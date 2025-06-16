
import { useEffect } from "react";
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
  useSidebar,
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

function SidebarContent_() {
  const { setOpen } = useSidebar();

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div 
      className="h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Sidebar className="border-r border-gray-700/50 bg-gray-900/98 backdrop-blur-xl shadow-2xl">
        <SidebarHeader className="p-4 border-b border-gray-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
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
                      className="text-gray-300 hover:text-white hover:bg-blue-600/30 transition-all duration-300 rounded-lg group border border-transparent hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <a href={item.url} className="flex items-center space-x-3 p-3">
                        <item.icon className="h-4 w-4 group-hover:text-blue-400 transition-colors group-hover:scale-110 transform duration-200" />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="p-4 border-t border-gray-700/30">
          <div className="text-center">
            <p className="text-gray-400 text-xs">v1.0.0</p>
            <p className="text-gray-500 text-xs">Admin Panel</p>
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}

export function AppSidebar() {
  return (
    <>
      {/* Invisible trigger area */}
      <div 
        className="fixed left-0 top-0 w-4 h-full z-50 bg-transparent"
        onMouseEnter={() => {
          const sidebar = document.querySelector('[data-sidebar="sidebar"]');
          if (sidebar) {
            sidebar.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          }
        }}
      />
      <SidebarContent_ />
    </>
  );
}
