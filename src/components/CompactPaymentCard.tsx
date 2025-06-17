import { CreditCard, Clock, MapPin, User, Mail, Link } from "lucide-react";
import { CountryFlag } from "./CountryFlag";
import { getDisplayUrl } from "../utils/urlUtils";

interface CompactPaymentCardProps {
  payment: {
    id: string;
    amount: string;
    status: string;
    method: string;
    product: string;
    date: string;
    country?: string;
    city?: string;
    state?: string;
    clientEmail?: string;
    clientId?: string;
    transactionId?: string;
    page?: string;
    referrer?: string;
  };
}

export const CompactPaymentCard = ({ payment }: CompactPaymentCardProps) => {
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
    if (!value) return 'R$ 0,00';
    const numValue = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'pix':
        return '💸';
      case 'credit':
      case 'cartao':
        return '💳';
      case 'debit':
        return '💳';
      default:
        return '💰';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'aprovado':
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pendente':
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'cancelado':
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const country = payment.country || 'Brasil';
  const city = payment.city || 'São Paulo';
  const state = payment.state || 'SP';
  const countryCode = getCountryCode(country);
  const displayUrl = getDisplayUrl(payment.page, payment.referrer);

  return (
    <div className="relative overflow-hidden bg-gray-700/30 border-l-4 border-purple-500 rounded-2xl px-4 py-3 text-sm hover:bg-gray-700/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Primeira linha: Localização + Valor + Status */}
      <div className="relative z-10 flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <CountryFlag 
            countryCode={countryCode} 
            countryName={country}
            size="sm"
          />
          <div className="flex items-center space-x-1 text-gray-300">
            <MapPin className="h-3 w-3" />
            <span className="text-white font-medium">{city}, {state}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold text-white">
            {formatCurrency(payment.amount)}
          </span>
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
            {payment.status || 'Aprovado'}
          </div>
        </div>
      </div>

      {/* Segunda linha: Método + Produto + Link + Cliente + Data */}
      <div className="relative z-10 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-purple-400">
            <span>{getPaymentMethodIcon(payment.method)}</span>
            <span className="font-medium">{payment.method || 'PIX'}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-300">
            <CreditCard className="h-3 w-3" />
            <span>{payment.product || 'Produto'}</span>
          </div>
          
          {displayUrl && (
            <div className="flex items-center space-x-1 text-purple-400">
              <Link className="h-3 w-3" />
              <span className="font-medium">{displayUrl}</span>
            </div>
          )}
          
          {payment.clientEmail && (
            <div className="flex items-center space-x-1 text-gray-400">
              <Mail className="h-3 w-3" />
              <span className="truncate max-w-32">{payment.clientEmail}</span>
            </div>
          )}
          
          {(payment.clientId || payment.transactionId) && (
            <div className="flex items-center space-x-1 text-gray-400">
              <User className="h-3 w-3" />
              <span className="font-mono text-xs">
                {payment.clientId || payment.transactionId?.slice(-6)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1 text-gray-400">
          <Clock className="h-3 w-3" />
          <span>
            {payment.date 
              ? new Date(payment.date).toLocaleDateString('pt-BR') + ' ' + new Date(payment.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
              : 'Agora'
            }
          </span>
        </div>
      </div>
    </div>
  );
};
