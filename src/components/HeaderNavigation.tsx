
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  DollarSign,
  Code, 
  Settings, 
  FileText, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScriptModal } from "./ScriptModal";

const navigationItems = [
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
    isModal: true,
  },
];

export const HeaderNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (item: any, e: React.MouseEvent) => {
    if (item.isModal) {
      e.preventDefault();
      setIsScriptModalOpen(true);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <DollarSign className="text-white font-bold text-sm h-5 w-5" />
              </div>
              <span className="text-white font-semibold text-lg">Queridos</span>
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
                    onClick={(e) => handleNavClick(item, e)}
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
                      onClick={(e) => handleNavClick(item, e)}
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
            </div>
          )}
        </div>
      </header>

      <ScriptModal 
        isOpen={isScriptModalOpen} 
        onClose={() => setIsScriptModalOpen(false)} 
      />
    </>
  );
};
