
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Shuffle, CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { initializeTracking } from "@/utils/trackingScript";

const Payments = () => {
  const [customAmount, setCustomAmount] = useState("");
  const [lastPayment, setLastPayment] = useState<any>(null);

  useEffect(() => {
    // Inicializar tracking nesta página
    initializeTracking();
  }, []);

  const generateRandomAmount = () => {
    const amounts = ["99,90", "199,50", "299,00", "499,90", "799,00", "1299,90"];
    return amounts[Math.floor(Math.random() * amounts.length)];
  };

  const simulatePayment = async (amount: string, isRandom = false) => {
    const finalAmount = amount || generateRandomAmount();
    
    try {
      // Chamar a API de tracking
      await (window as any).trackingAPI.payment(
        `R$ ${finalAmount}`,
        'PIX',
        isRandom ? 'Produto Aleatório' : 'Produto Personalizado',
        `TXN-${Date.now()}`
      );

      setLastPayment({
        amount: `R$ ${finalAmount}`,
        method: 'PIX',
        time: new Date().toLocaleTimeString('pt-BR'),
        id: `TXN-${Date.now()}`
      });

      console.log('[Test] Pagamento simulado:', finalAmount);
    } catch (error) {
      console.error('[Test] Erro ao simular pagamento:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            Simulação de Pagamentos
          </h1>
          <p className="text-gray-400">
            Teste o sistema de tracking de pagamentos em tempo real
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pagamento com Valor Personalizado */}
          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-green-400" />
                <span>Valor Personalizado</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Valor (ex: 299,90)
                </label>
                <Input
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Digite o valor..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Button
                onClick={() => simulatePayment(customAmount)}
                disabled={!customAmount}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Simular Pagamento PIX
              </Button>
            </CardContent>
          </Card>

          {/* Pagamento Aleatório */}
          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shuffle className="h-5 w-5 text-purple-400" />
                <span>Valor Aleatório</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                Gera um valor aleatório entre R$ 99,90 e R$ 1.299,90
              </p>
              <Button
                onClick={() => simulatePayment("", true)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Pagamento Aleatório
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Último Pagamento */}
        {lastPayment && (
          <Card className="bg-green-900/20 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white">
                  Pagamento Processado com Sucesso!
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Valor:</span>
                  <p className="text-white font-semibold text-lg">{lastPayment.amount}</p>
                </div>
                <div>
                  <span className="text-gray-400">Método:</span>
                  <p className="text-white">{lastPayment.method}</p>
                </div>
                <div>
                  <span className="text-gray-400">Horário:</span>
                  <p className="text-white">{lastPayment.time}</p>
                </div>
                <div>
                  <span className="text-gray-400">ID:</span>
                  <p className="text-white font-mono text-xs">{lastPayment.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instruções */}
        <Card className="bg-blue-900/20 border-blue-500/30">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-3">Como Testar:</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Abra o Dashboard em outra aba para ver os dados em tempo real</li>
              <li>• Simule pagamentos aqui e veja aparecer no dashboard instantaneamente</li>
              <li>• O sistema detecta automaticamente elementos com classe .payment-success</li>
              <li>• Use a API manual: trackingAPI.payment('R$ 299,00', 'PIX', 'Produto')</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;
