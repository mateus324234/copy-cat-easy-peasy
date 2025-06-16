import { Card, CardContent } from "@/components/ui/card";
import { CountryFlag } from "./CountryFlag";
import { Clock, Globe, Monitor, CreditCard, QrCode, Users, MapPin, Mail, Trash2 } from "lucide-react";
import { useRealtimeData } from "@/hooks/useRealtimeData";
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

interface ExpandedCardContentProps {
  cardType: 'visits' | 'userOnline' | 'payments' | 'qrCode';
}

export const ExpandedCardContent = ({ cardType }: ExpandedCardContentProps) => {
  const { visitors, payments, qrcodes } = useRealtimeData();
  const { toast } = useToast();
  const [isClearing, setIsClearing] = useState(false);

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
      <div className="flex items-center justify-between mb-4">
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

  const renderVisits = () => {
    const visitorsArray = Object.entries(visitors).map(([id, visitor]: [string, any]) => ({
      id,
      ...visitor
    }));

    if (visitorsArray.length === 0) {
      return (
        <div className="text-center py-8">
          <Globe className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhuma visita registrada ainda</p>
          <p className="text-gray-500 text-sm">Acesse outras páginas para gerar dados</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {renderHeader("Detalhes das Visitas", Globe, visitorsArray.length)}
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {visitorsArray.slice(0, 10).map((visit) => (
            <div key={visit.id} className="bg-gray-700/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <CountryFlag 
                  countryCode={visit.country === 'Brazil' ? 'br' : 'us'} 
                  countryName={visit.country || 'Brasil'} 
                />
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    {visit.firstVisit ? new Date(visit.firstVisit).toLocaleTimeString('pt-BR') : 'Agora'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Localização:</span>
                  <p className="text-white">{visit.city || 'São Paulo'}, {visit.state || 'SP'}</p>
                </div>
                <div>
                  <span className="text-gray-400">IP:</span>
                  <p className="text-white font-mono">{visit.ip || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400">Status:</span>
                  <p className="text-white flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${visit.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span>{visit.status === 'online' ? 'Online' : 'Offline'}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderUserOnline = () => {
    const onlineVisitors = Object.entries(visitors).filter(([_, visitor]: [string, any]) => 
      visitor.status === 'online'
    ).map(([id, visitor]: [string, any]) => ({
      id,
      ...visitor
    }));

    if (onlineVisitors.length === 0) {
      return (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhum usuário online no momento</p>
          <p className="text-gray-500 text-sm">Acesse outras páginas para aparecer aqui</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {renderHeader("Usuários Online", Users, onlineVisitors.length)}
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {onlineVisitors.map((user) => (
            <div key={user.id} className="bg-gray-700/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {(user.city || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Usuário #{user.id.slice(-6)}</p>
                    <p className="text-gray-400 text-sm flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{user.city || 'São Paulo'}</span>
                    </p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-gray-600">
                <div>
                  <CountryFlag 
                    countryCode={user.country === 'Brazil' ? 'br' : 'us'} 
                    countryName={user.country || 'Brasil'} 
                  />
                </div>
                <div>
                  <span className="text-gray-400">IP:</span>
                  <p className="text-white font-mono">{user.ip || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPayments = () => {
    const paymentsArray = Object.entries(payments).map(([id, payment]: [string, any]) => ({
      id,
      ...payment
    }));

    if (paymentsArray.length === 0) {
      return (
        <div className="text-center py-8">
          <CreditCard className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhum pagamento registrado ainda</p>
          <p className="text-gray-500 text-sm">Vá para /payments para testar</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {renderHeader("Pagamentos", CreditCard, paymentsArray.length)}
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {paymentsArray.slice(0, 10).map((payment) => (
            <div key={payment.id} className="bg-gray-700/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">
                  {payment.amount || 'R$ 0,00'}
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                  {payment.status || 'Aprovado'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Método:</span>
                  <p className="text-white font-medium">{payment.method || 'PIX'}</p>
                </div>
                <div>
                  <span className="text-gray-400">Produto:</span>
                  <p className="text-white">{payment.product || 'Produto'}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400">Data:</span>
                  <p className="text-white">
                    {payment.date ? new Date(payment.date).toLocaleString('pt-BR') : 'Agora'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQrCode = () => {
    const qrcodesArray = Object.entries(qrcodes).map(([id, qr]: [string, any]) => ({
      id,
      ...qr
    }));

    if (qrcodesArray.length === 0) {
      return (
        <div className="text-center py-8">
          <QrCode className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhum QR Code registrado ainda</p>
          <p className="text-gray-500 text-sm">Vá para /qrcode para testar</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {renderHeader("QR Codes", QrCode, qrcodesArray.length)}
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {qrcodesArray.slice(0, 10).map((qr) => (
            <div key={qr.id} className="bg-gray-700/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5 text-cyan-400" />
                  <span className="text-gray-400 text-sm">QR Code</span>
                </div>
                <span className="text-gray-400 text-sm">
                  {qr.date ? new Date(qr.date).toLocaleString('pt-BR') : 'Agora'}
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-400 text-sm">Produto:</span>
                  <p className="text-white font-medium">{qr.product || 'QR Code'}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Valor:</span>
                  <p className="text-white">{qr.value || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Tipo:</span>
                  <p className="text-white">{qr.type || 'produto'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
