
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

export function AppSidebar() {
  const { setOpen } = useSidebar();

  return (
    <div 
      className="fixed left-0 top-0 h-full w-4 z-[9999] bg-transparent"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Sidebar 
        className="bg-gray-900/95 backdrop-blur-xl shadow-2xl border-r border-gray-700/30"
        collapsible="offcanvas"
      >
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
                        <span className="font-medium transition-all duration-300">
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
