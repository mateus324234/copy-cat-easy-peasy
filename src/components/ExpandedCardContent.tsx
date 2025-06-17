import { Card, CardContent } from "@/components/ui/card";
import { CompactVisitCard } from "./CompactVisitCard";
import { CompactPaymentCard } from "./CompactPaymentCard";
import { CompactQRCard } from "./CompactQRCard";
import { SiteFilter } from "./SiteFilter";
import { Clock, Globe, Monitor, CreditCard, QrCode, Users, MapPin, Mail, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { useSiteGrouping } from "@/hooks/useSiteGrouping";
import { Button } from "@/components/ui/button";
import { clearData } from "@/services/firebase";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ExpandedCardContentProps {
  cardType: 'visits' | 'userOnline' | 'payments' | 'qrCode';
}

export const ExpandedCardContent = ({ cardType }: ExpandedCardContentProps) => {
  const { visitors, payments, qrcodes } = useRealtimeData();
  const { toast } = useToast();
  const [isClearing, setIsClearing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSite, setSelectedSite] = useState('todos');
  const itemsPerPage = 20;

  const handleClearData = async () => {
    setIsClearing(true);
    
    try {
      let clearFunction;
      let successMessage;
      
      switch (cardType) {
        case 'visits':
        case 'userOnline':
          clearFunction = clearData.clearVisitors;
          successMessage = 'Visitas limpas com sucesso!';
          break;
        case 'payments':
          clearFunction = clearData.clearPayments;
          successMessage = 'Pagamentos limpos com sucesso!';
          break;
        case 'qrCode':
          clearFunction = clearData.clearQRCodes;
          successMessage = 'QR Codes limpos com sucesso!';
          break;
      }
      
      if (clearFunction) {
        await clearFunction();
        setCurrentPage(1);
        setSelectedSite('todos');
        toast({
          title: successMessage,
          description: "Os dados foram removidos do sistema.",
        });
      }
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      toast({
        title: "Erro ao limpar dados",
        description: "Ocorreu um erro ao tentar limpar os dados.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  const renderHeader = (title: string, icon: any, count: number) => {
    const Icon = icon;
    return (
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Icon className="h-5 w-5 text-blue-400" />
          <span>{title} ({count})</span>
        </h3>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-red-400 border-red-400/30 hover:bg-red-400/10 hover:border-red-400"
              disabled={isClearing}
            >
              {isClearing ? (
                <div className="h-4 w-4 animate-spin rounded-full border border-red-400 border-t-transparent mr-2"></div>
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Limpar Tudo
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-800 border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Confirmar Limpeza</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                Tem certeza que deseja limpar todos os dados desta categoria? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleClearData}
              >
                Limpar Tudo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

  const renderPagination = (totalItems: number) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) return null;

    return (
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={`${
                  currentPage === 1 
                    ? 'pointer-events-none opacity-50' 
                    : 'cursor-pointer hover:bg-gray-700'
                } text-white border-gray-600`}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className={`cursor-pointer ${
                      currentPage === pageNumber 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'text-white border-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={`${
                  currentPage === totalPages 
                    ? 'pointer-events-none opacity-50' 
                    : 'cursor-pointer hover:bg-gray-700'
                } text-white border-gray-600`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };

  const handleSiteChange = (site: string) => {
    setSelectedSite(site);
    setCurrentPage(1);
  };

  const renderVisits = () => {
    const visitorsArray = Object.entries(visitors).map(([id, visitor]: [string, any]) => ({
      id,
      ...visitor
    })).filter((visitor) => {
      return visitor.ip && 
             visitor.ip !== 'N/A' && 
             visitor.country && 
             visitor.city &&
             visitor.firstVisit &&
             !visitor.sessionId?.includes('dashboard');
    }).sort((a, b) => {
      const timeA = new Date(a.firstVisit || a.timestamp || 0).getTime();
      const timeB = new Date(b.firstVisit || b.timestamp || 0).getTime();
      return timeB - timeA;
    });

    const totalItems = visitorsArray.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = visitorsArray.slice(startIndex, endIndex);

    if (visitorsArray.length === 0) {
      return (
        <div className="text-center py-12">
          <Globe className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhuma visita real registrada ainda</p>
          <p className="text-gray-500 text-sm">Acesse outras páginas para gerar dados reais</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {renderHeader("Detalhes das Visitas", Globe, totalItems)}
        
        <div className="space-y-1 min-h-[600px]">
          {currentItems.map((visit) => (
            <CompactVisitCard key={visit.id} visit={visit} />
          ))}
        </div>
        
        {renderPagination(totalItems)}
      </div>
    );
  };

  const renderUserOnline = () => {
    const onlineVisitors = Object.entries(visitors).filter(([_, visitor]: [string, any]) => 
      visitor.status === 'online' &&
      visitor.ip && 
      visitor.ip !== 'N/A' && 
      visitor.country && 
      visitor.city &&
      !visitor.sessionId?.includes('dashboard')
    ).map(([id, visitor]: [string, any]) => ({
      id,
      ...visitor
    })).sort((a, b) => {
      const timeA = new Date(a.lastSeen || a.timestamp || 0).getTime();
      const timeB = new Date(b.lastSeen || b.timestamp || 0).getTime();
      return timeB - timeA;
    });

    const totalItems = onlineVisitors.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = onlineVisitors.slice(startIndex, endIndex);

    if (onlineVisitors.length === 0) {
      return (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhum usuário online no momento</p>
          <p className="text-gray-500 text-sm">Acesse outras páginas para aparecer aqui</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {renderHeader("Usuários Online", Users, totalItems)}
        
        <div className="space-y-1 min-h-[600px]">
          {currentItems.map((user) => (
            <CompactVisitCard key={user.id} visit={user} />
          ))}
        </div>
        
        {renderPagination(totalItems)}
      </div>
    );
  };

  const renderPayments = () => {
    const paymentsArray = Object.entries(payments).map(([id, payment]: [string, any]) => ({
      id,
      ...payment
    })).sort((a, b) => {
      const timeA = new Date(a.date || a.timestamp || 0).getTime();
      const timeB = new Date(b.date || b.timestamp || 0).getTime();
      return timeB - timeA;
    });

    const { grouped, sites } = useSiteGrouping(paymentsArray);
    
    const filteredPayments = selectedSite === 'todos' 
      ? paymentsArray 
      : grouped[selectedSite] || [];

    const totalItems = filteredPayments.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredPayments.slice(startIndex, endIndex);

    if (paymentsArray.length === 0) {
      return (
        <div className="text-center py-12">
          <CreditCard className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhum pagamento registrado ainda</p>
          <p className="text-gray-500 text-sm">Vá para /payments para testar</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {renderHeader("Pagamentos", CreditCard, paymentsArray.length)}
        
        <SiteFilter
          sites={sites}
          selectedSite={selectedSite}
          onSiteChange={handleSiteChange}
          grouped={grouped}
          totalCount={paymentsArray.length}
        />
        
        <div className="space-y-1 min-h-[600px]">
          {currentItems.map((payment) => (
            <CompactPaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
        
        {renderPagination(totalItems)}
      </div>
    );
  };

  const renderQrCode = () => {
    const qrcodesArray = Object.entries(qrcodes).map(([id, qr]: [string, any]) => ({
      id,
      ...qr
    })).sort((a, b) => {
      const timeA = new Date(a.date || a.timestamp || 0).getTime();
      const timeB = new Date(b.date || b.timestamp || 0).getTime();
      return timeB - timeA;
    });

    const { grouped, sites } = useSiteGrouping(qrcodesArray);
    
    const filteredQRCodes = selectedSite === 'todos' 
      ? qrcodesArray 
      : grouped[selectedSite] || [];

    const totalItems = filteredQRCodes.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredQRCodes.slice(startIndex, endIndex);

    if (qrcodesArray.length === 0) {
      return (
        <div className="text-center py-12">
          <QrCode className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhum QR Code registrado ainda</p>
          <p className="text-gray-500 text-sm">Vá para /qrcode para testar</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {renderHeader("QR Codes", QrCode, qrcodesArray.length)}
        
        <SiteFilter
          sites={sites}
          selectedSite={selectedSite}
          onSiteChange={handleSiteChange}
          grouped={grouped}
          totalCount={qrcodesArray.length}
        />
        
        <div className="space-y-1 min-h-[600px]">
          {currentItems.map((qr) => (
            <CompactQRCard key={qr.id} qr={qr} />
          ))}
        </div>
        
        {renderPagination(totalItems)}
      </div>
    );
  };

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border-gray-700 animate-fade-in">
      <CardContent className="p-6">
        {cardType === 'visits' && renderVisits()}
        {cardType === 'userOnline' && renderUserOnline()}
        {cardType === 'payments' && renderPayments()}
        {cardType === 'qrCode' && renderQrCode()}
      </CardContent>
    </Card>
  );
};
