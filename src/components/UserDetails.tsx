
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Trash2, Clock, MapPin, Monitor, Globe } from "lucide-react";

export const UserDetails = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informações do Usuário */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">carlos74</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">IP: 192.168.1.104</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">Localização: São Paulo, BR</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Monitor className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">Dispositivo: Desktop Windows</span>
                </div>
              </div>
            </div>

            {/* Status de Autenticação */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Status de Autenticação</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Usuário:</span>
                  <span className="text-red-400 font-medium">Incorreto</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Senha:</span>
                  <span className="text-red-400 font-medium">Incorreto</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Token:</span>
                  <span className="text-red-400 font-medium">Incorreto</span>
                </div>
              </div>
            </div>

            {/* Tentativas */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Tentativas de Senha</h4>
              <div className="space-y-1">
                <p className="text-gray-300 text-sm">• 123456 (Falhou)</p>
                <p className="text-gray-300 text-sm">• password123 (Falhou)</p>
                <p className="text-gray-300 text-sm">• carlos2024 (Falhou)</p>
              </div>
            </div>
          </div>

          {/* Painel de Ações */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-medium mb-4">Ações Disponíveis</h4>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Bloquear
                </Button>
                <Button 
                  className="w-full bg-red-800 hover:bg-red-900 text-white"
                  size="lg"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
                <Button 
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  size="lg"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Aguardar
                </Button>
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Última Atividade</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Último acesso:</span>
                  <span className="text-white">Agora</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sessão ativa:</span>
                  <span className="text-green-400">12min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tentativas:</span>
                  <span className="text-red-400">3 falhas</span>
                </div>
              </div>
            </div>

            {/* Status do Sistema */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Status do Sistema</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Servidor Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Monitoramento Ativo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-300">Tentativa Suspeita</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
