
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  DollarSign,
  Code, 
  Globe, 
  FileText, 
  Menu,
  X,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScriptModal } from "./ScriptModal";
import { SitesModal } from "./SitesModal";
import { SiteSelector } from "./SiteSelector";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const navigationItems = [
  {
    title: "Scripts",
    url: "/scripts",
    icon: Code,
  },
  {
    title: "Sites",
    url: "#",
    icon: Globe,
    isModal: true,
    modalType: "sites"
  },
  {
    title: "Script",
    url: "#",
    icon: FileText,
    isModal: true,
    modalType: "script"
  },
];

export const HeaderNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [isSitesModalOpen, setIsSitesModalOpen] = useState(false);
  const [isClearingAll, setIsClearingAll] = useState(false);
  const location = useLocation();
  const { clearAllData } = useRealtimeData();
  const { toast } = useToast();

  const handleNavClick = (item: any, e: React.MouseEvent) => {
    if (item.isModal) {
      e.preventDefault();
      if (item.modalType === "script") {
        setIsScriptModalOpen(true);
      } else if (item.modalType === "sites") {
        setIsSitesModalOpen(true);
      }
      setIsMobileMenuOpen(false);
    }
  };

  const handleClearAll = async () => {
    setIsClearingAll(true);
    
    try {
      await clearAllData();
      toast({
        title: "🧹 Todos os dados foram limpos!",
        description: "Visitas, pagamentos e QR codes foram removidos do sistema.",
      });
    } catch (error) {
      console.error('Erro ao limpar todos os dados:', error);
      toast({
        title: "❌ Erro ao limpar dados",
        description: "Ocorreu um erro ao tentar limpar todos os dados.",
        variant: "destructive",
      });
    } finally {
      setIsClearingAll(false);
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

            {/* Desktop Navigation with Site Selector and Clear All Button */}
            <div className="hidden md:flex items-center space-x-4">
              <SiteSelector />
              
              {/* Clear All Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-400 border-red-400/30 hover:bg-red-400/10 hover:border-red-400 bg-red-950/20"
                    disabled={isClearingAll}
                  >
                    {isClearingAll ? (
                      <div className="h-4 w-4 animate-spin rounded-full border border-red-400 border-t-transparent mr-2"></div>
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Limpar Tudo
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800 border-gray-700 rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">🗑️ Limpar Todos os Dados</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                      Esta ação irá remover <strong>TODOS</strong> os dados do sistema:
                      <br />• Todas as visitas e usuários online
                      <br />• Todos os pagamentos registrados
                      <br />• Todos os QR codes copiados
                      <br /><br />
                      <span className="text-red-400 font-semibold">Esta ação não pode ser desfeita!</span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 rounded-xl">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 rounded-xl"
                      onClick={handleClearAll}
                    >
                      🧹 Limpar Tudo
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <nav className="flex items-center space-x-1">
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
              <div className="pb-3 space-y-3">
                <SiteSelector />
                
                {/* Mobile Clear All Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-red-400 border-red-400/30 hover:bg-red-400/10 hover:border-red-400 bg-red-950/20"
                      disabled={isClearingAll}
                    >
                      {isClearingAll ? (
                        <div className="h-4 w-4 animate-spin rounded-full border border-red-400 border-t-transparent mr-2"></div>
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Limpar Tudo
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-800 border-gray-700 rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">🗑️ Limpar Todos os Dados</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300">
                        Esta ação irá remover <strong>TODOS</strong> os dados do sistema:
                        <br />• Todas as visitas e usuários online
                        <br />• Todos os pagamentos registrados
                        <br />• Todos os QR codes copiados
                        <br /><br />
                        <span className="text-red-400 font-semibold">Esta ação não pode ser desfeita!</span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 rounded-xl">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 rounded-xl"
                        onClick={handleClearAll}
                      >
                        🧹 Limpar Tudo
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
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
      
      <SitesModal
        isOpen={isSitesModalOpen}
        onClose={() => setIsSitesModalOpen(false)}
      />
    </>
  );
};
