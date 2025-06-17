import { QrCode, Clock, MapPin, User, Mail, Package, Link } from "lucide-react";
import { CountryFlag } from "./CountryFlag";
import { getDisplayUrl } from "../utils/urlUtils";

interface CompactQRCardProps {
  qr: {
    id: string;
    product: string;
    value: string;
    type: string;
    date: string;
    country?: string;
    city?: string;
    state?: string;
    clientEmail?: string;
    clientId?: string;
    qrId?: string;
    copies?: number;
    page?: string;
    referrer?: string;
  };
}

export const CompactQRCard = ({ qr }: CompactQRCardProps) => {
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

  const getQRTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'produto':
      case 'product':
        return '📦';
      case 'servico':
      case 'service':
        return '🔧';
      case 'link':
      case 'url':
        return '🔗';
      case 'pagamento':
      case 'payment':
        return '💰';
      default:
        return '📋';
    }
  };

  const getQRTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'produto':
      case 'product':
        return 'text-blue-400';
      case 'servico':
      case 'service':
        return 'text-green-400';
      case 'link':
      case 'url':
        return 'text-purple-400';
      case 'pagamento':
      case 'payment':
        return 'text-yellow-400';
      default:
        return 'text-orange-400';
    }
  };

  const country = qr.country || 'Brasil';
  const city = qr.city || 'São Paulo';
  const state = qr.state || 'SP';
  const countryCode = getCountryCode(country);
  const displayUrl = getDisplayUrl(qr.page, qr.referrer);

  return (
    <div className="relative overflow-hidden bg-gray-700/30 border-l-4 border-orange-500 rounded-2xl px-4 py-3 text-sm hover:bg-gray-700/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Primeira linha: Ícone Principal + Bandeira + Localização + Site + Status */}
      <div className="relative z-10 flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-orange-400">
            <QrCode className="h-4 w-4" />
          </div>
          <CountryFlag 
            countryCode={countryCode} 
            countryName={country}
            size="sm"
          />
          <div className="flex items-center space-x-1 text-gray-300">
            <MapPin className="h-3 w-3" />
            <span className="text-white font-medium">{city}, {state}</span>
          </div>
          
          {displayUrl && (
            <div className="flex items-center space-x-1 text-orange-400">
              <Link className="h-3 w-3" />
              <span className="font-bold text-orange-300">{displayUrl}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <span>{getQRTypeIcon(qr.type)}</span>
            <span className={`font-medium ${getQRTypeColor(qr.type)}`}>
              {qr.type || 'QR Code'}
            </span>
          </div>
          
          <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            Gerado
          </div>
        </div>
      </div>

      {/* Segunda linha: Produto + Cliente + Data */}
      <div className="relative z-10 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-orange-400">
            <Package className="h-3 w-3" />
            <span className="font-medium">{qr.product || 'QR Code'}</span>
          </div>
          
          {qr.clientEmail && (
            <div className="flex items-center space-x-1 text-gray-400">
              <Mail className="h-3 w-3" />
              <span className="truncate max-w-32">{qr.clientEmail}</span>
            </div>
          )}
          
          {(qr.clientId || qr.qrId) && (
            <div className="flex items-center space-x-1 text-gray-400">
              <User className="h-3 w-3" />
              <span className="font-mono text-xs">
                {qr.clientId || qr.qrId?.slice(-6)}
              </span>
            </div>
          )}
          
          {qr.copies && qr.copies > 1 && (
            <div className="flex items-center space-x-1 text-gray-400">
              <QrCode className="h-3 w-3" />
              <span>{qr.copies}x copiado</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1 text-gray-400">
          <Clock className="h-3 w-3" />
          <span>
            {qr.date 
              ? new Date(qr.date).toLocaleDateString('pt-BR') + ' ' + new Date(qr.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
              : 'Agora'
            }
          </span>
        </div>
      </div>
    </div>
  );
};
