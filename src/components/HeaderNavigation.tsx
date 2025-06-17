
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  CreditCard, 
  QrCode, 
  Code, 
  Settings, 
  FileText, 
  PlusCircle, 
  Globe,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
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
    title: "Payments Test",
    url: "/payments",
    icon: CreditCard,
  },
  {
    title: "QR Code Test",
    url: "/qrcode",
    icon: QrCode,
  },
  {
    title: "Scripts",
    url: "/scripts",
    icon: Code,
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

export const HeaderNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-white font-semibold text-lg">Dashboard</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.url;
              
              return (
                <a
                  key={item.title}
                  href={item.url}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                
                return (
                  <a
                    key={item.title}
                    href={item.url}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
