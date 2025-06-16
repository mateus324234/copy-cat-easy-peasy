
import { Card, CardContent } from "@/components/ui/card";
import { CountryFlag } from "./CountryFlag";
import { Clock, Globe, Monitor, CreditCard, QrCode, Users, MapPin, Mail } from "lucide-react";

interface ExpandedCardContentProps {
  cardType: 'visits' | 'userOnline' | 'payments' | 'qrCode';
}

const mockData = {
  visits: [
    { id: 1, country: 'Brazil', countryCode: 'br', city: 'São Paulo', state: 'SP', ip: '192.168.1.100', time: '14:32:15', browser: 'Chrome 120.0' },
    { id: 2, country: 'United States', countryCode: 'us', city: 'New York', state: 'NY', ip: '10.0.0.55', time: '09:15:42', browser: 'Firefox 119.0' },
    { id: 3, country: 'Canada', countryCode: 'ca', city: 'Toronto', state: 'ON', ip: '172.16.0.23', time: '11:28:07', browser: 'Safari 17.1' },
  ],
  userOnline: [
    { id: 1, name: 'João Silva', email: 'joao@email.com', ip: '192.168.1.100', country: 'Brazil', countryCode: 'br', city: 'São Paulo' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', ip: '10.0.0.55', country: 'United States', countryCode: 'us', city: 'Miami' },
    { id: 3, name: 'Carlos Lima', email: 'carlos@email.com', ip: '172.16.0.23', country: 'Portugal', countryCode: 'pt', city: 'Lisboa' },
  ],
  payments: [
    { id: 1, amount: 'R$ 299,90', status: 'Aprovado', client: 'João Silva', date: '15/01/2024', country: 'Brazil', countryCode: 'br' },
    { id: 2, amount: 'US$ 99,99', status: 'Pendente', client: 'John Doe', date: '15/01/2024', country: 'United States', countryCode: 'us' },
    { id: 3, amount: 'EUR 79,50', status: 'Aprovado', client: 'Pierre Martin', date: '14/01/2024', country: 'France', countryCode: 'fr' },
  ],
  qrCode: [
    { id: 1, content: 'https://mysite.com/product/123', date: '15/01/2024 14:32', country: 'Brazil', countryCode: 'br', city: 'São Paulo', state: 'SP' },
    { id: 2, content: 'https://mysite.com/promo/winter', date: '15/01/2024 12:15', country: 'Argentina', countryCode: 'ar', city: 'Buenos Aires', state: 'BA' },
    { id: 3, content: 'https://mysite.com/contact', date: '14/01/2024 18:45', country: 'Chile', countryCode: 'cl', city: 'Santiago', state: 'RM' },
  ],
};

export const ExpandedCardContent = ({ cardType }: ExpandedCardContentProps) => {
  const renderVisits = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center space-x-2">
        <Globe className="h-5 w-5 text-blue-400" />
        <span>Detalhes das Visitas</span>
      </h3>
      <div className="grid gap-4">
        {mockData.visits.map((visit) => (
          <div key={visit.id} className="bg-gray-700/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <CountryFlag countryCode={visit.countryCode} countryName={visit.country} />
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{visit.time}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Localização:</span>
                <p className="text-white">{visit.city}, {visit.state}</p>
              </div>
              <div>
                <span className="text-gray-400">IP:</span>
                <p className="text-white font-mono">{visit.ip}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">Navegador:</span>
                <p className="text-white flex items-center space-x-2">
                  <Monitor className="h-4 w-4" />
                  <span>{visit.browser}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUserOnline = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center space-x-2">
        <Users className="h-5 w-5 text-green-400" />
        <span>Usuários Online</span>
      </h3>
      <div className="grid gap-4">
        {mockData.userOnline.map((user) => (
          <div key={user.id} className="bg-gray-700/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-400 text-sm flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>{user.email}</span>
                  </p>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-gray-600">
              <div>
                <CountryFlag countryCode={user.countryCode} countryName={user.country} />
              </div>
              <div>
                <span className="text-gray-400">IP:</span>
                <p className="text-white font-mono">{user.ip}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">Cidade:</span>
                <p className="text-white flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.city}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center space-x-2">
        <CreditCard className="h-5 w-5 text-purple-400" />
        <span>Informações de Pagamentos</span>
      </h3>
      <div className="grid gap-4">
        {mockData.payments.map((payment) => (
          <div key={payment.id} className="bg-gray-700/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">{payment.amount}</div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                payment.status === 'Aprovado' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {payment.status}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Cliente:</span>
                <p className="text-white font-medium">{payment.client}</p>
              </div>
              <div>
                <span className="text-gray-400">Data:</span>
                <p className="text-white">{payment.date}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">País do Cliente:</span>
                <div className="mt-1">
                  <CountryFlag countryCode={payment.countryCode} countryName={payment.country} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQrCode = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center space-x-2">
        <QrCode className="h-5 w-5 text-cyan-400" />
        <span>QR Codes Copiados</span>
      </h3>
      <div className="grid gap-4">
        {mockData.qrCode.map((qr) => (
          <div key={qr.id} className="bg-gray-700/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-cyan-400" />
                <span className="text-gray-400 text-sm">Conteúdo copiado</span>
              </div>
              <span className="text-gray-400 text-sm">{qr.date}</span>
            </div>
            <div className="bg-gray-800 rounded p-3 mb-3">
              <code className="text-cyan-400 text-sm break-all">{qr.content}</code>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <CountryFlag countryCode={qr.countryCode} countryName={qr.country} />
              </div>
              <div>
                <span className="text-gray-400">Localização:</span>
                <p className="text-white">{qr.city}, {qr.state}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
