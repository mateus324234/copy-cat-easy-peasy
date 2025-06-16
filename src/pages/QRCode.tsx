
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Shuffle, CheckCircle, Copy } from "lucide-react";
import { useEffect } from "react";
import { initializeTracking } from "@/utils/trackingScript";

const QRCodePage = () => {
  const [customValue, setCustomValue] = useState("");
  const [customProduct, setCustomProduct] = useState("");
  const [lastQR, setLastQR] = useState<any>(null);

  useEffect(() => {
    // Inicializar tracking nesta página
    initializeTracking();
  }, []);

  const generateRandomQR = () => {
    const products = [
      "Produto Premium", "Curso Online", "E-book Digital", 
      "Consultoria", "Software", "Aplicativo"
    ];
    const values = ["149,90", "299,00", "499,90", "799,00", "1299,90"];
    
    return {
      product: products[Math.floor(Math.random() * products.length)],
      value: `R$ ${values[Math.floor(Math.random() * values.length)]}`
    };
  };

  const simulateQRCode = async (value: string, product: string, isRandom = false) => {
    let finalValue = value;
    let finalProduct = product;
    
    if (isRandom) {
      const random = generateRandomQR();
      finalValue = random.value;
      finalProduct = random.product;
    }
    
    try {
      // Chamar a API de tracking
      await (window as any).trackingAPI.qrcode(
        'produto',
        finalProduct || 'QR Code Personalizado',
        finalValue || 'N/A',
        1
      );

      setLastQR({
        product: finalProduct,
        value: finalValue,
        time: new Date().toLocaleTimeString('pt-BR'),
        id: `QR-${Date.now()}`,
        content: `https://meusite.com/produto/${Date.now()}`
      });

      console.log('[Test] QR Code simulado:', { product: finalProduct, value: finalValue });
    } catch (error) {
      console.error('[Test] Erro ao simular QR Code:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Simulação de QR Codes
          </h1>
          <p className="text-gray-400">
            Teste o sistema de tracking de QR Codes em tempo real
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR Code Personalizado */}
          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-cyan-400" />
                <span>QR Code Personalizado</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Nome do Produto
                </label>
                <Input
                  value={customProduct}
                  onChange={(e) => setCustomProduct(e.target.value)}
                  placeholder="Digite o nome do produto..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Valor (ex: R$ 299,90)
                </label>
                <Input
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Digite o valor..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Button
                onClick={() => simulateQRCode(customValue, customProduct)}
                disabled={!customProduct && !customValue}
                className="w-full bg-cyan-600 hover:bg-cyan-700"
              >
                Simular QR Code
              </Button>
            </CardContent>
          </Card>

          {/* QR Code Aleatório */}
          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shuffle className="h-5 w-5 text-orange-400" />
                <span>QR Code Aleatório</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                Gera um QR Code com produto e valor aleatórios
              </p>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="w-24 h-24 bg-white mx-auto mb-3 rounded flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-black" />
                </div>
                <p className="text-center text-gray-400 text-xs">QR Code de exemplo</p>
              </div>
              <Button
                onClick={() => simulateQRCode("", "", true)}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Gerar QR Aleatório
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Último QR Code */}
        {lastQR && (
          <Card className="bg-cyan-900/20 border-cyan-500/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">
                  QR Code Gerado com Sucesso!
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Produto:</span>
                    <p className="text-white font-semibold">{lastQR.product}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Valor:</span>
                    <p className="text-white font-semibold text-lg">{lastQR.value}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Horário:</span>
                    <p className="text-white">{lastQR.time}</p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Conteúdo do QR:</span>
                  <div className="bg-gray-800 rounded p-3 mt-1">
                    <div className="flex items-center justify-between">
                      <code className="text-cyan-400 text-sm break-all">{lastQR.content}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(lastQR.content)}
                        className="text-gray-400 hover:text-white ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instruções */}
        <Card className="bg-purple-900/20 border-purple-500/30">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-3">Como Testar:</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Abra o Dashboard em outra aba para ver os dados em tempo real</li>
              <li>• Simule QR Codes aqui e veja aparecer no dashboard instantaneamente</li>
              <li>• O sistema detecta automaticamente elementos com classe .qr-code</li>
              <li>• Use a API manual: trackingAPI.qrcode('produto', 'Nome do Produto', 'R$ 299,00')</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRCodePage;
