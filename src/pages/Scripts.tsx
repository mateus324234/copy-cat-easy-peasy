
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Code, Globe, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Scripts = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Código copiado!",
      description: description,
    });
  };

  const trackingScript = `<!-- Queridos Analytics Script -->
<script>
(function() {
  // Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDsGz4eMdK4AvSotMRubBA6hLZ9wLdTWlY",
    authDomain: "backend-69215.firebaseapp.com", 
    databaseURL: "https://backend-69215-default-rtdb.firebaseio.com",
    projectId: "backend-69215",
    storageBucket: "backend-69215.firebasestorage.app",
    messagingSenderId: "939916254169",
    appId: "1:939916254169:web:749b10fe7817f82f2617c8"
  };

  // Carregamento dinâmico do Firebase
  const script = document.createElement('script');
  script.type = 'module';
  script.innerHTML = \`
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
    import { getDatabase, ref, set, update, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js';
    
    const app = initializeApp(\${JSON.stringify(firebaseConfig)});
    const database = getDatabase(app);
    
    // Gerar ID único para sessão
    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    
    // Função para registrar eventos
    async function trackEvent(eventType, data = {}) {
      try {
        if (eventType === 'visit' || eventType === 'online') {
          const visitRef = ref(database, \`visitors/\${sessionId}\`);
          await set(visitRef, {
            sessionId,
            ...data,
            timestamp: serverTimestamp(),
            status: 'online',
            userAgent: navigator.userAgent,
            url: window.location.href,
            referrer: document.referrer,
            firstVisit: new Date().toISOString(),
            lastSeen: new Date().toISOString()
          });
        } else if (eventType === 'payment') {
          const paymentRef = ref(database, \`payments/\${Date.now()}_\${Math.random().toString(36).substr(2, 5)}\`);
          await set(paymentRef, {
            ...data,
            sessionId,
            timestamp: serverTimestamp(),
            date: new Date().toISOString(),
            url: window.location.href
          });
        } else if (eventType === 'qrcode') {
          const qrRef = ref(database, \`qrcodes/\${Date.now()}_\${Math.random().toString(36).substr(2, 5)}\`);
          await set(qrRef, {
            ...data,
            sessionId,
            timestamp: serverTimestamp(),
            date: new Date().toISOString(),
            url: window.location.href
          });
        }
        console.log('[Queridos Analytics] Evento registrado:', eventType, data);
      } catch (error) {
        console.error('[Queridos Analytics] Erro:', error);
      }
    }
    
    // Registrar visita inicial
    trackEvent('visit', {
      country: 'Brazil',
      city: 'São Paulo',
      state: 'SP',
      ip: 'Detectado automaticamente'
    });
    
    // Manter usuário online
    setInterval(() => {
      trackEvent('online', {
        country: 'Brazil',
        city: 'São Paulo', 
        state: 'SP',
        ip: 'Detectado automaticamente'
      });
    }, 30000);
    
    // Marcar como offline quando sair
    window.addEventListener('beforeunload', () => {
      const visitRef = ref(database, \`visitors/\${sessionId}\`);
      update(visitRef, {
        status: 'offline',
        lastSeen: new Date().toISOString(),
        timestamp: serverTimestamp()
      });
    });
    
    // Expor funções globalmente
    window.queridosAnalytics = {
      trackPayment: (amount, method = 'PIX', product = 'Produto', status = 'Aprovado') => {
        trackEvent('payment', { amount, method, product, status });
      },
      trackQRCode: (product = 'QR Code', value = 'N/A', type = 'produto') => {
        trackEvent('qrcode', { product, value, type });
      }
    };
  \`;
  document.head.appendChild(script);
})();
</script>`;

  const lovableIntegration = `<!-- Para projetos Lovable -->
<!-- Cole este código no arquivo index.html do seu projeto Lovable -->

${trackingScript}

<!-- Exemplo de uso em componentes React -->
<script>
// Para rastrear pagamentos
window.queridosAnalytics?.trackPayment('R$ 99,90', 'PIX', 'Curso React', 'Aprovado');

// Para rastrear QR codes
window.queridosAnalytics?.trackQRCode('WhatsApp Link', 'https://wa.me/...', 'contato');
</script>`;

  const v0Integration = `<!-- Para projetos v0.dev -->
<!-- Adicione no head do seu HTML -->

${trackingScript}

<!-- Uso em JavaScript -->
<script>
// Aguarde o carregamento do script
setTimeout(() => {
  // Rastrear pagamento
  window.queridosAnalytics?.trackPayment('$49.99', 'Credit Card', 'Premium Plan');
  
  // Rastrear QR code
  window.queridosAnalytics?.trackQRCode('Download App', 'https://app.example.com');
}, 1000);
</script>`;

  const generalHtmlIntegration = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Site</title>
    
    ${trackingScript}
</head>
<body>
    <h1>Meu Site</h1>
    
    <button onclick="simularPagamento()">Simular Pagamento</button>
    <button onclick="simularQRCode()">Simular QR Code</button>
    
    <script>
        function simularPagamento() {
            window.queridosAnalytics?.trackPayment('R$ 149,90', 'PIX', 'Produto Premium');
        }
        
        function simularQRCode() {
            window.queridosAnalytics?.trackQRCode('WhatsApp', 'https://wa.me/5511999999999', 'contato');
        }
    </script>
</body>
</html>`;

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black flex">
        <AppSidebar />
        <main className="flex-1 min-h-screen overflow-auto">
          {/* Animated background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Scripts de Integração
              </h1>
              <p className="text-gray-400 mt-2">
                Como integrar o sistema Queridos Analytics em outros sites e plataformas
              </p>
            </div>

            <div className="space-y-8">
              {/* Visão Geral */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span>Visão Geral</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>
                    O sistema Queridos Analytics permite monitorar visitantes, pagamentos e QR codes 
                    em qualquer site através de um script simples. Os dados são enviados em tempo real 
                    para o Firebase e aparecem no dashboard.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">✅ Visitantes</h4>
                      <p className="text-sm text-gray-400">Rastreamento automático de visitas e usuários online</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">💳 Pagamentos</h4>
                      <p className="text-sm text-gray-400">Registro manual de transações com detalhes</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">📱 QR Codes</h4>
                      <p className="text-sm text-gray-400">Tracking de QR codes copiados ou acessados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Integração Lovable */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-blue-400" />
                    <span>Integração com Lovable</span>
                    <Badge className="bg-blue-500/20 text-blue-300">Recomendado</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Para projetos criados na plataforma Lovable, adicione o script no arquivo index.html 
                    ou através do DevMode.
                  </p>
                  
                  <div className="bg-gray-900/80 rounded-lg p-4 relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                      onClick={() => copyToClipboard(lovableIntegration, "Código para Lovable copiado!")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <pre className="text-sm text-gray-300 overflow-x-auto pr-12">
                      <code>{lovableIntegration}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Integração v0.dev */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Code className="h-5 w-5 text-green-400" />
                    <span>Integração com v0.dev</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Para projetos criados no v0.dev da Vercel, adicione o script no componente raiz 
                    ou no layout principal.
                  </p>
                  
                  <div className="bg-gray-900/80 rounded-lg p-4 relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                      onClick={() => copyToClipboard(v0Integration, "Código para v0.dev copiado!")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <pre className="text-sm text-gray-300 overflow-x-auto pr-12">
                      <code>{v0Integration}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Integração HTML Geral */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <ExternalLink className="h-5 w-5 text-purple-400" />
                    <span>Integração HTML Geral</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Para qualquer site HTML, WordPress, ou outras plataformas, use este código completo:
                  </p>
                  
                  <div className="bg-gray-900/80 rounded-lg p-4 relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                      onClick={() => copyToClipboard(generalHtmlIntegration, "Código HTML completo copiado!")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96">
                      <code>{generalHtmlIntegration}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* API de Eventos */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">API de Eventos Disponíveis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    <div className="bg-gray-700/50 rounded-lg p-5">
                      <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Rastrear Pagamento</span>
                      </h4>
                      <div className="bg-gray-900/60 rounded p-3">
                        <code className="text-green-300 text-sm">
                          window.queridosAnalytics.trackPayment(amount, method, product, status)
                        </code>
                      </div>
                      <div className="mt-3 text-sm text-gray-400">
                        <p><strong>amount:</strong> Valor do pagamento (ex: "R$ 99,90")</p>
                        <p><strong>method:</strong> Método de pagamento (ex: "PIX", "Credit Card")</p>
                        <p><strong>product:</strong> Nome do produto (ex: "Curso React")</p>
                        <p><strong>status:</strong> Status do pagamento (ex: "Aprovado", "Pendente")</p>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-5">
                      <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Rastrear QR Code</span>
                      </h4>
                      <div className="bg-gray-900/60 rounded p-3">
                        <code className="text-blue-300 text-sm">
                          window.queridosAnalytics.trackQRCode(product, value, type)
                        </code>
                      </div>
                      <div className="mt-3 text-sm text-gray-400">
                        <p><strong>product:</strong> Nome/descrição do QR (ex: "WhatsApp Link")</p>
                        <p><strong>value:</strong> URL ou valor do QR (ex: "https://wa.me/...")</p>
                        <p><strong>type:</strong> Tipo do QR (ex: "contato", "produto", "link")</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Considerações Importantes */}
              <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-300">⚠️ Considerações Importantes</CardTitle>
                </CardHeader>
                <CardContent className="text-yellow-100 space-y-3">
                  <ul className="list-disc list-inside space-y-2">
                    <li>O script rastreia visitantes automaticamente quando carregado</li>
                    <li>Os eventos de pagamento e QR code devem ser chamados manualmente</li>
                    <li>Todos os dados são enviados para o mesmo Firebase configurado</li>
                    <li>O dashboard Queridos mostrará todos os dados em tempo real</li>
                    <li>Certifique-se de que o Firebase está acessível no site de destino</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Scripts;
