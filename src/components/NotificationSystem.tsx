
import { useEffect, useState } from "react";
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

  const playNotificationSound = () => {
    try {
      // Create a simple beep sound using Web Audio API
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
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only 5 notifications
    playNotificationSound();
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
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

  // Expose functions to parent component
  useEffect(() => {
    if (onNewVisit) {
      (window as any).notifyNewVisit = (visitor: any) => {
        addNotification({
          type: 'visit',
          title: 'Nova Visita',
          message: `${visitor.city || 'Cidade'}, ${visitor.state || 'Estado'}`,
          country: visitor.country,
          city: visitor.city,
          state: visitor.state,
        });
      };
    }
    
    if (onNewPayment) {
      (window as any).notifyNewPayment = (payment: any) => {
        addNotification({
          type: 'payment',
          title: 'Novo Pagamento',
          message: `${payment.city || 'São Paulo'}, ${payment.state || 'SP'}`,
          country: payment.country || 'Brasil',
          city: payment.city,
          state: payment.state,
          amount: payment.amount,
        });
      };
    }
    
    if (onNewQRCode) {
      (window as any).notifyNewQRCode = (qr: any) => {
        addNotification({
          type: 'qrcode',
          title: 'QR Code Copiado',
          message: `${qr.city || 'São Paulo'}, ${qr.state || 'SP'}`,
          country: qr.country || 'Brasil',
          city: qr.city,
          state: qr.state,
          product: qr.product,
        });
      };
    }
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
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
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
