
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  DollarSign,
  Globe, 
  FileText, 
  Menu,
  X,
  Trash2,
  Coins
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
    title: "Sites",
    url: "#",
    icon: Globe,
    isModal: true,
    modalType: "sites",
    gradient: "from-emerald-500 to-green-600",
    hoverGradient: "hover:from-emerald-400 hover:to-green-500",
    textColor: "text-emerald-300",
    borderColor: "border-emerald-500/30"
  },
  {
    title: "Script",
    url: "#",
    icon: FileText,
    isModal: true,
    modalType: "script",
    gradient: "from-cyan-500 to-blue-600",
    hoverGradient: "hover:from-cyan-400 hover:to-blue-500",
    textColor: "text-cyan-300",
    borderColor: "border-cyan-500/30"
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
      <header className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Main logo container with floating money effect */}
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-2xl hover:shadow-yellow-500/25 transition-all duration-500 animate-pulse">
                  <DollarSign className="text-white font-bold text-lg h-6 w-6 drop-shadow-lg" />
                </div>
                
                {/* Floating coins animation */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bounce delay-100 opacity-80">
                  <Coins className="h-3 w-3 text-white p-0.5" />
                </div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-bounce delay-300 opacity-60">
                  <div className="w-full h-full bg-white/20 rounded-full"></div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl blur-md opacity-30 animate-pulse"></div>
              </div>
              
              {/* Enhanced brand name */}
              <div className="relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  Queridos
                </span>
                <div className="absolute inset-0 text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse delay-150">
                  Queridos
                </div>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <SiteSelector />
              
              {/* Enhanced Clear All Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative text-red-300 border-red-500/40 hover:border-red-400 bg-gradient-to-r from-red-950/30 to-red-900/30 hover:from-red-900/40 hover:to-red-800/40 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group overflow-hidden"
                    disabled={isClearingAll}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isClearingAll ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent mr-2"></div>
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                    )}
                    <span className="relative z-10">Limpar Tudo</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800/95 backdrop-blur-xl border-gray-600/50 rounded-2xl shadow-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white text-xl">🗑️ Limpar Todos os Dados</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300 text-base leading-relaxed">
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
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl shadow-lg"
                      onClick={handleClearAll}
                    >
                      🧹 Limpar Tudo
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              {/* Enhanced Navigation Items */}
              <nav className="flex items-center space-x-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.url;
                  
                  return (
                    <a
                      key={item.title}
                      href={item.url}
                      onClick={(e) => handleNavClick(item, e)}
                      className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} ${item.textColor} border ${item.borderColor} shadow-lg`
                          : `${item.textColor} hover:text-white bg-white/5 hover:bg-gradient-to-r ${item.hoverGradient} hover:shadow-lg border border-transparent hover:${item.borderColor}`
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      <Icon className="h-4 w-4 relative z-10 group-hover:animate-pulse" />
                      <span className="relative z-10">{item.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 bg-black/20 rounded-b-2xl backdrop-blur-sm">
              <div className="pb-3 space-y-3">
                <SiteSelector />
                
                {/* Mobile Clear All Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-red-300 border-red-500/40 hover:border-red-400 bg-gradient-to-r from-red-950/30 to-red-900/30 hover:from-red-900/40 hover:to-red-800/40 rounded-xl transition-all duration-300"
                      disabled={isClearingAll}
                    >
                      {isClearingAll ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent mr-2"></div>
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Limpar Tudo
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-800/95 backdrop-blur-xl border-gray-600/50 rounded-2xl shadow-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white text-xl">🗑️ Limpar Todos os Dados</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300 text-base leading-relaxed">
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
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl shadow-lg"
                        onClick={handleClearAll}
                      >
                        🧹 Limpar Tudo
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
              {/* Mobile Navigation Items */}
              <nav className="grid grid-cols-2 gap-3">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.url;
                  
                  return (
                    <a
                      key={item.title}
                      href={item.url}
                      onClick={(e) => handleNavClick(item, e)}
                      className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} ${item.textColor} border ${item.borderColor} shadow-lg`
                          : `${item.textColor} hover:text-white bg-white/5 hover:bg-gradient-to-r ${item.hoverGradient} hover:shadow-lg border border-transparent hover:${item.borderColor}`
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      <Icon className="h-4 w-4 relative z-10 group-hover:animate-pulse" />
                      <span className="relative z-10">{item.title}</span>
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
