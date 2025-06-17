
import { CountryFlag } from "./CountryFlag";
import { Clock, Monitor } from "lucide-react";

interface CompactVisitCardProps {
  visit: {
    id: string;
    country: string;
    city: string;
    state: string;
    ip: string;
    status: string;
    firstVisit: string;
    userAgent?: string;
  };
}

export const CompactVisitCard = ({ visit }: CompactVisitCardProps) => {
  const getCountryCode = (country: string) => {
    if (!country) return null;
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
      'Mexico': 'mx',
      'Japan': 'jp',
      'China': 'cn',
      'India': 'in',
      'Australia': 'au'
    };
    return countryMap[country] || country.toLowerCase().slice(0, 2);
  };

  const getBrowserFromUserAgent = (userAgent?: string) => {
    if (!userAgent) return 'Chrome (Windows)';
    if (userAgent.includes('Chrome')) return 'Chrome (Windows)';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    return 'Chrome (Windows)';
  };

  const countryCode = getCountryCode(visit.country);
  const browser = getBrowserFromUserAgent(visit.userAgent);

  return (
    <div className="relative overflow-hidden bg-gray-700/30 border-l-4 border-blue-500 rounded-xl px-4 py-3 text-sm hover:bg-gray-700/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Primeira linha: Bandeira + Localização + Status + Data */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {countryCode && (
            <CountryFlag 
              countryCode={countryCode} 
              countryName={visit.country}
              size="sm"
            />
          )}
          <span className="text-white font-medium">
            {visit.city}, {visit.state}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              visit.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
            }`}></div>
            <span className={`text-xs ${
              visit.status === 'online' ? 'text-green-400' : 'text-gray-400'
            }`}>
              {visit.status === 'online' ? 'Online' : 'Desconhecido, Desconhecido'}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <Clock className="h-3 w-3" />
            <span className="text-xs">
              {new Date(visit.firstVisit).toLocaleDateString('pt-BR')} {new Date(visit.firstVisit).toLocaleTimeString('pt-BR')}
            </span>
          </div>
        </div>
      </div>

      {/* Segunda linha: Desktop + Browser + IP */}
      <div className="relative z-10 flex items-center justify-between mt-1">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-gray-400">
            <Monitor className="h-3 w-3" />
            <span className="text-xs">Desktop</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <span className="text-xs">{browser}</span>
          </div>
        </div>
        <div className="text-gray-300 text-xs">
          <span className="text-gray-400">IP:</span>
          <span className="text-white font-mono ml-1">{visit.ip}</span>
        </div>
      </div>
    </div>
  );
};
