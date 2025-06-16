
import { useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  const { setOpen, open } = useSidebar();

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div 
      className="h-full fixed left-0 top-0 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Sidebar className={`border-r border-gray-700/30 bg-gray-900/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-out ${
        open 
          ? 'translate-x-0' 
          : '-translate-x-full'
      }`}>
        <SidebarContent className="px-2 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className="text-gray-300 hover:text-white hover:bg-blue-600/30 transition-all duration-300 rounded-lg group border border-transparent hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <a href={item.url} className="flex items-center space-x-3 p-3">
                        <item.icon className="h-5 w-5 group-hover:text-blue-400 transition-colors group-hover:scale-110 transform duration-200" />
                        <span className={`font-medium transition-all duration-300 ${
                          open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                        }`}>
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export function AppSidebar() {
  return (
    <>
      {/* Área de trigger expandida para melhor UX */}
      <div 
        className="fixed left-0 top-0 w-16 h-full z-40 bg-transparent"
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
