
import { useEffect, useState, useRef } from "react";
import { X, MapPin, CreditCard, QrCode, Globe } from "lucide-react";
import { CountryFlag } from "./CountryFlag";

interface Notification {
  id: string;
  type: 'visit' | 'payment' | 'qrcode';
  title: string;
  message: string;
  country?: string;
  city?: string;
  state?: string;
  amount?: string;
  product?: string;
  timestamp: Date;
}

interface NotificationSystemProps {
  onNewVisit?: (visitor: any) => void;
  onNewPayment?: (payment: any) => void;
  onNewQRCode?: (qr: any) => void;
}

export const NotificationSystem = ({ onNewVisit, onNewPayment, onNewQRCode }: NotificationSystemProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const processedItemsRef = useRef<Set<string>>(new Set());
  const lastProcessedRef = useRef<{ [key: string]: number }>({});

  const playNotificationSound = () => {
    try {
      console.log('[NotificationSystem] Tentando reproduzir som de notificação...');
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      
      console.log('[NotificationSystem] Som reproduzido com sucesso!');
    } catch (error) {
      console.log('[NotificationSystem] Erro ao reproduzir som:', error);
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>, uniqueId: string) => {
    const now = Date.now();
    
    // Verificar se já processamos este item recentemente (últimos 5 segundos)
    if (processedItemsRef.current.has(uniqueId)) {
      console.log('[NotificationSystem] Item já processado, ignorando:', uniqueId);
      return;
    }

    // Verificar se há um item similar processado recentemente
    const lastProcessed = lastProcessedRef.current[uniqueId];
    if (lastProcessed && (now - lastProcessed) < 5000) {
      console.log('[NotificationSystem] Item processado recentemente, ignorando:', uniqueId);
      return;
    }

    console.log('[NotificationSystem] Adicionando nova notificação:', notification);
    
    const newNotification: Notification = {
      ...notification,
      id: uniqueId + '_' + now,
      timestamp: new Date(),
    };
    
    processedItemsRef.current.add(uniqueId);
    lastProcessedRef.current[uniqueId] = now;
    
    setNotifications(prev => [...prev.slice(0, 4), newNotification]); // Keep only 5 notifications, newest at the end
    playNotificationSound();
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);

    // Clean up old processed items after 10 seconds
    setTimeout(() => {
      processedItemsRef.current.delete(uniqueId);
      delete lastProcessedRef.current[uniqueId];
    }, 10000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getCountryCode = (country: string) => {
    const countryMap: { [key: string]: string } = {
      'Brazil': 'br',
      'Brasil': 'br',
      'United States': 'us',
      'USA': 'us',
      'Canada': 'ca',
      'United Kingdom': 'gb',
      'Germany': 'de',
      'France': 'fr',
      'Spain': 'es',
      'Italy': 'it',
      'Portugal': 'pt',
      'Argentina': 'ar',
      'Chile': 'cl',
      'Mexico': 'mx'
    };
    return countryMap[country] || 'br';
  };

  const formatCurrency = (value: string) => {
    if (!value) return '';
    const numValue = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  };

  // Configurar as funções globais de notificação
  useEffect(() => {
    console.log('[NotificationSystem] Configurando funções globais de notificação...');
    
    (window as any).notifyNewVisit = (visitor: any) => {
      console.log('[NotificationSystem] Recebendo notificação de visita:', visitor);
      const uniqueId = `visit_${visitor.sessionId || visitor.id}_${visitor.timestamp || Date.now()}`;
      addNotification({
        type: 'visit',
        title: 'Nova Visita',
        message: `${visitor.city || 'Cidade'}, ${visitor.state || 'Estado'}`,
        country: visitor.country,
        city: visitor.city,
        state: visitor.state,
      }, uniqueId);
      if (onNewVisit) onNewVisit(visitor);
    };
    
    (window as any).notifyNewPayment = (payment: any) => {
      console.log('[NotificationSystem] Recebendo notificação de pagamento:', payment);
      const uniqueId = `payment_${payment.sessionId || payment.id}_${payment.timestamp || Date.now()}`;
      addNotification({
        type: 'payment',
        title: 'Novo Pagamento',
        message: `${payment.city || 'São Paulo'}, ${payment.state || 'SP'}`,
        country: payment.country || 'Brasil',
        city: payment.city,
        state: payment.state,
        amount: payment.amount,
      }, uniqueId);
      if (onNewPayment) onNewPayment(payment);
    };
    
    (window as any).notifyNewQRCode = (qr: any) => {
      console.log('[NotificationSystem] Recebendo notificação de QR code:', qr);
      const uniqueId = `qrcode_${qr.sessionId || qr.id}_${qr.timestamp || Date.now()}`;
      addNotification({
        type: 'qrcode',
        title: 'QR Code Copiado',
        message: `${qr.city || 'São Paulo'}, ${qr.state || 'SP'}`,
        country: qr.country || 'Brasil',
        city: qr.city,
        state: qr.state,
        product: qr.product,
      }, uniqueId);
      if (onNewQRCode) onNewQRCode(qr);
    };

    console.log('[NotificationSystem] Funções globais configuradas com sucesso!');
  }, [onNewVisit, onNewPayment, onNewQRCode]);

  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <Globe className="h-5 w-5 text-blue-400" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-green-400" />;
      case 'qrcode':
        return <QrCode className="h-5 w-5 text-orange-400" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-400" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'visit':
        return 'border-blue-500/50 bg-blue-500/10';
      case 'payment':
        return 'border-green-500/50 bg-green-500/10';
      case 'qrcode':
        return 'border-orange-500/50 bg-orange-500/10';
      default:
        return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-xl border backdrop-blur-lg shadow-xl animate-fade-in ${getNotificationColor(notification.type)}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              {renderNotificationIcon(notification.type)}
              <span className="font-semibold text-white text-sm">
                {notification.title}
              </span>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            {notification.country && (
              <CountryFlag 
                countryCode={getCountryCode(notification.country)} 
                countryName={notification.country}
                size="sm"
              />
            )}
            <div className="flex items-center space-x-1 text-gray-300">
              <MapPin className="h-3 w-3" />
              <span className="text-sm">{notification.message}</span>
            </div>
          </div>
          
          {notification.amount && (
            <div className="text-lg font-bold text-green-400">
              {formatCurrency(notification.amount)}
            </div>
          )}
          
          {notification.product && (
            <div className="text-sm text-orange-400">
              {notification.product}
            </div>
          )}
          
          <div className="text-xs text-gray-500 mt-1">
            {notification.timestamp.toLocaleTimeString('pt-BR')}
          </div>
        </div>
      ))}
    </div>
  );
};
