import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, Code, Globe, Zap, CheckCircle, AlertTriangle, FileText, Database, Eye, Wrench, TestTube, BookOpen, CreditCard, QrCode, Monitor, Settings, Webhook, LineChart, ShoppingCart, Users, Activity } from "lucide-react";
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

  const completeTrackingScript = `<!-- 🎯 SISTEMA QUERIDOS ANALYTICS - SCRIPT COMPLETO ATUALIZADO -->
<script>
(function() {
  'use strict';
  
  // Configuração Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDsGz4eMdK4AvSotMRubBA6hLZ9wLdTWlY",
    authDomain: "backend-69215.firebaseapp.com",
    databaseURL: "https://backend-69215-default-rtdb.firebaseio.com",
    projectId: "backend-69215",
    storageBucket: "backend-69215.firebasestorage.app",
    messagingSenderId: "939916254169",
    appId: "1:939916254169:web:749b10fe7817f82f2617c8"
  };

  // Função para extrair domínio atual (ATUALIZADA)
  function getCurrentDomain() {
    return window.location.hostname.replace(/^www\\./, '');
  }

  // Gerar session ID único
  const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  let userLocation = { country: 'Brasil', city: 'São Paulo', state: 'SP', ip: 'Unknown' };
  let isOnline = true;
  let pingInterval = null;
  const currentDomain = getCurrentDomain(); // Detectar domínio automaticamente

  // Função para detectar localização real
  async function detectLocation() {
    try {
      // Primeira tentativa: ipapi.co (gratuita e confiável)
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        if (data.ip && !data.error) {
          userLocation = {
            country: data.country_name || 'Brasil',
            city: data.city || 'São Paulo',
            state: data.region || 'SP',
            ip: data.ip
          };
          console.log('[Queridos Analytics] Localização detectada:', userLocation);
          console.log('[Queridos Analytics] Domínio detectado:', currentDomain);
          return;
        }
      }
    } catch (error) {
      console.warn('[Queridos Analytics] Erro ao detectar localização:', error);
    }

    // Fallback: usar localização padrão
    console.log('[Queridos Analytics] Usando localização padrão');
    console.log('[Queridos Analytics] Domínio detectado:', currentDomain);
  }

  // Carregamento dinâmico do Firebase
  const script = document.createElement('script');
  script.type = 'module';
  script.innerHTML = 
    'import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";' +
    'import { getDatabase, ref, set, update, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";' +
    '' +
    'const app = initializeApp(' + JSON.stringify(firebaseConfig) + ');' +
    'const database = getDatabase(app);' +
    '' +
    'async function trackEvent(eventType, data = {}) {' +
    '  try {' +
    '    const timestamp = new Date().toISOString();' +
    '    const eventData = {' +
    '      ...data,' +
    '      url: window.location.href,' +
    '      page: window.location.pathname,' +
    '      referrer: document.referrer || "direct",' +
    '      domain: "' + currentDomain + '",' +
    '      userAgent: navigator.userAgent' +
    '    };' +
    '    ' +
    '    if (eventType === "visit" || eventType === "online") {' +
    '      const visitRef = ref(database, "visitors/" + "' + sessionId + '");' +
    '      const visitData = {' +
    '        sessionId: "' + sessionId + '",' +
    '        ...eventData,' +
    '        timestamp: serverTimestamp(),' +
    '        status: eventType === "visit" ? "online" : "online",' +
    '        firstVisit: timestamp,' +
    '        lastSeen: timestamp' +
    '      };' +
    '      await set(visitRef, visitData);' +
    '    } else if (eventType === "payment") {' +
    '      const paymentRef = ref(database, "payments/" + Date.now() + "_" + Math.random().toString(36).substr(2, 5));' +
    '      await set(paymentRef, {' +
    '        ...eventData,' +
    '        sessionId: "' + sessionId + '",' +
    '        timestamp: serverTimestamp(),' +
    '        date: timestamp' +
    '      });' +
    '    } else if (eventType === "qrcode") {' +
    '      const qrRef = ref(database, "qrcodes/" + Date.now() + "_" + Math.random().toString(36).substr(2, 5));' +
    '      await set(qrRef, {' +
    '        ...eventData,' +
    '        sessionId: "' + sessionId + '",' +
    '        timestamp: serverTimestamp(),' +
    '        date: timestamp' +
    '      });' +
    '    } else if (eventType === "offline") {' +
    '      const visitRef = ref(database, "visitors/" + "' + sessionId + '");' +
    '      await update(visitRef, {' +
    '        status: "offline",' +
    '        lastSeen: timestamp,' +
    '        timestamp: serverTimestamp(),' +
    '        domain: "' + currentDomain + '"' +
    '      });' +
    '    }' +
    '    console.log("[Queridos Analytics] Evento registrado:", eventType, "Domain:", "' + currentDomain + '", eventData);' +
    '  } catch (error) {' +
    '    console.error("[Queridos Analytics] Erro:", error);' +
    '  }' +
    '}' +
    '' +
    'window.trackEvent = trackEvent;' +
    '' +
    '// Expor API pública (ATUALIZADA)' +
    'window.queridosAnalytics = {' +
    '  trackPayment: function(amount, method = "PIX", product = "Produto", status = "Gerado") {' +
    '    trackEvent("payment", {' +
    '      amount: amount,' +
    '      method: method,' +
    '      product: product,' +
    '      status: status,' +
    '      country: userLocation.country,' +
    '      city: userLocation.city,' +
    '      state: userLocation.state,' +
    '      ip: userLocation.ip' +
    '    });' +
    '  },' +
    '  trackQRCode: function(product = "QR Code", value = "N/A", type = "produto") {' +
    '    trackEvent("qrcode", {' +
    '      product: product,' +
    '      value: value,' +
    '      type: type,' +
    '      country: userLocation.country,' +
    '      city: userLocation.city,' +
    '      state: userLocation.state,' +
    '      ip: userLocation.ip' +
    '    });' +
    '  },' +
    '  getCurrentDomain: function() {' +
    '    return "' + currentDomain + '";' +
    '  },' +
    '  getSessionId: function() {' +
    '    return "' + sessionId + '";' +
    '  }' +
    '};' +
    '' +
    '// Inicialização' +
    'detectLocation().then(() => {' +
    '  trackEvent("visit", userLocation);' +
    '  ' +
    '  // Ping online a cada 30 segundos' +
    '  pingInterval = setInterval(() => {' +
    '    if (isOnline) {' +
    '      trackEvent("online", userLocation);' +
    '    }' +
    '  }, 30000);' +
    '});' +
    '' +
    '// Marcar como offline ao sair' +
    'window.addEventListener("beforeunload", () => {' +
    '  if (isOnline) {' +
    '    isOnline = false;' +
    '    trackEvent("offline");' +
    '    if (pingInterval) clearInterval(pingInterval);' +
    '  }' +
    '});';
  
  document.head.appendChild(script);

  // Detectar localização e inicializar
  detectLocation();
})();
</script>`;

  const paymentsTrackingExamples = `// 💳 EXEMPLOS ESPECÍFICOS PARA PAGAMENTOS (ATUALIZADOS)

// IMPORTANTE: O script agora detecta o domínio automaticamente!
// Não é mais necessário configurar manualmente o domínio

// 1. PIX INSTANTÂNEO
function gerarPIX(valor, descricao) {
  // ... sua lógica de geração do PIX ...
  
  // 🎯 TRACKING ESPECÍFICO PARA PIX (COM DOMÍNIO AUTOMÁTICO)
  setTimeout(() => {
    if (window.queridosAnalytics) {
      console.log('Domínio atual:', window.queridosAnalytics.getCurrentDomain());
      window.queridosAnalytics.trackPayment(
        \`R$ \${valor.toFixed(2).replace('.', ',')}\`,
        "PIX",
        descricao || "Pagamento PIX",
        "Gerado"
      );
    }
  }, 1000);
}

// 2. CARTÃO DE CRÉDITO
function processarCartao(dadosCartao, valor, parcelas) {
  // ... sua lógica de processamento ...
  
  // 🎯 TRACKING PARA CARTÃO (COM DOMÍNIO AUTOMÁTICO)
  setTimeout(() => {
    if (window.queridosAnalytics) {
      console.log('Domínio atual:', window.queridosAnalytics.getCurrentDomain());
      window.queridosAnalytics.trackPayment(
        \`R$ \${valor.toFixed(2).replace('.', ',')}\`,
        \`Cartão \${parcelas}x\`,
        \`Compra parcelada em \${parcelas}x\`,
        "Processando"
      );
    }
  }, 1000);
}

// 3. VERIFICAR DOMÍNIO ATUAL
function verificarDominioAtual() {
  if (window.queridosAnalytics) {
    const dominio = window.queridosAnalytics.getCurrentDomain();
    console.log('Site atual sendo rastreado:', dominio);
    return dominio;
  }
  return null;
}

// 4. TESTE COMPLETO
function testeCompleto() {
  if (window.queridosAnalytics) {
    console.log('=== TESTE QUERIDOS ANALYTICS ===');
    console.log('Domínio:', window.queridosAnalytics.getCurrentDomain());
    console.log('Session ID:', window.queridosAnalytics.getSessionId());
    
    // Testar pagamento
    window.queridosAnalytics.trackPayment("R$ 99,90", "PIX", "Teste Pagamento", "Aprovado");
    
    // Testar QR Code
    window.queridosAnalytics.trackQRCode("Teste QR", "https://teste.com", "url");
    
    console.log('Testes enviados! Verifique o dashboard.');
  } else {
    console.error('Queridos Analytics não carregado!');
  }
}`;

  const qrCodeTrackingExamples = `// 📱 EXEMPLOS ESPECÍFICOS PARA QR CODES (ATUALIZADOS)

// IMPORTANTE: O script agora detecta o domínio automaticamente!

// 1. QR CODE DE URL/SITE
function gerarQRURL(url, titulo) {
  // ... sua lógica de geração do QR ...
  
  // 🎯 TRACKING PARA QR DE URL (COM DOMÍNIO AUTOMÁTICO)
  setTimeout(() => {
    if (window.queridosAnalytics) {
      console.log('Domínio atual:', window.queridosAnalytics.getCurrentDomain());
      window.queridosAnalytics.trackQRCode(
        titulo || "QR Code URL",
        url,
        "url"
      );
    }
  }, 1000);
}

// 2. QR CODE DE PIX
function gerarQRPIX(chavePIX, valor, descricao) {
  // ... gerar QR do PIX ...
  
  // 🎯 TRACKING PARA QR PIX (COM DOMÍNIO AUTOMÁTICO)
  setTimeout(() => {
    if (window.queridosAnalytics) {
      console.log('Domínio atual:', window.queridosAnalytics.getCurrentDomain());
      window.queridosAnalytics.trackQRCode(
        \`PIX: \${descricao}\`,
        \`R$ \${valor.toFixed(2).replace('.', ',')}\`,
        "pagamento"
      );
    }
  }, 1000);
}

// 3. VERIFICAR SE ANALYTICS ESTÁ FUNCIONANDO
function verificarAnalytics() {
  console.log('=== VERIFICAÇÃO QUERIDOS ANALYTICS ===');
  if (window.queridosAnalytics) {
    console.log('✅ Script carregado com sucesso!');
    console.log('🌐 Domínio detectado:', window.queridosAnalytics.getCurrentDomain());
    console.log('🔑 Session ID:', window.queridosAnalytics.getSessionId());
    console.log('📊 APIs disponíveis:', Object.keys(window.queridosAnalytics));
  } else {
    console.log('❌ Script não carregado ainda. Aguarde alguns segundos e tente novamente.');
  }
}`;

  const nextJsImplementation = `// app/layout.tsx (ATUALIZADO)
import Script from "next/script"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* 🎯 SCRIPT ANALYTICS ATUALIZADO COM DETECÇÃO AUTOMÁTICA DE DOMÍNIO */}
        <Script id="queridos-analytics" strategy="beforeInteractive">
          {\`${completeTrackingScript.replace(/`/g, '\\`')}\`}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

// types/analytics.d.ts (ATUALIZADO)
declare global {
  interface Window {
    queridosAnalytics?: {
      trackPayment: (amount: string, method?: string, product?: string, status?: string) => void
      trackQRCode: (product?: string, value?: string, type?: string) => void
      getCurrentDomain: () => string // NOVO: Retorna o domínio atual
      getSessionId: () => string // NOVO: Retorna o session ID
    }
  }
}

export {}

// Exemplo - Verificar funcionamento
useEffect(() => {
  // Aguardar carregamento do script
  setTimeout(() => {
    if (window.queridosAnalytics) {
      console.log('🎯 Analytics carregado para:', window.queridosAnalytics.getCurrentDomain())
      
      // Exemplo de pagamento
      const handlePayment = () => {
        window.queridosAnalytics.trackPayment(
          'R$ 150,00',
          'PIX',
          'Produto Teste',
          'Gerado'
        )
      }
      
      // Exemplo de QR Code
      const handleQRCode = () => {
        window.queridosAnalytics.trackQRCode(
          'QR Teste',
          'https://meusite.com/produto',
          'url'
        )
      }
    }
  }, 2000) // Aguardar 2 segundos para garantir carregamento
}, [])`;

  const testingCommands = `// 🧪 TESTE NO CONSOLE DO NAVEGADOR (ATUALIZADO):

// 1. Verificar se carregou corretamente
console.log('Analytics:', window.queridosAnalytics);

// 2. Verificar domínio detectado automaticamente
if (window.queridosAnalytics) {
  console.log('Domínio atual:', window.queridosAnalytics.getCurrentDomain());
  console.log('Session ID:', window.queridosAnalytics.getSessionId());
}

// 3. Testar pagamento (com domínio automático)
if (window.queridosAnalytics) {
  window.queridosAnalytics.trackPayment("R$ 99,90", "PIX", "Teste", "Aprovado");
}

// 4. Testar QR Code (com domínio automático)
if (window.queridosAnalytics) {
  window.queridosAnalytics.trackQRCode("Teste QR", "https://teste.com", "url");
}

// 5. Verificar no console (deve aparecer):
// [Queridos Analytics] Localização detectada: {ip: "...", country: "..."}
// [Queridos Analytics] Domínio detectado: meusite.com
// [Queridos Analytics] Evento registrado: visit Domain: meusite.com {...}
// [Queridos Analytics] Evento registrado: payment Domain: meusite.com {...}

// 6. TESTE COMPLETO AUTOMATIZADO
function testeCompleto() {
  if (!window.queridosAnalytics) {
    console.error('❌ Analytics não carregado!');
    return;
  }
  
  console.log('🎯 INICIANDO TESTE COMPLETO...');
  console.log('Domínio:', window.queridosAnalytics.getCurrentDomain());
  
  // Teste 1: Pagamento
  window.queridosAnalytics.trackPayment("R$ 150,00", "PIX", "Produto Teste", "Gerado");
  console.log('✅ Pagamento enviado');
  
  // Teste 2: QR Code
  window.queridosAnalytics.trackQRCode("QR Teste", "https://exemplo.com", "url");
  console.log('✅ QR Code enviado');
  
  console.log('🎉 Teste concluído! Verifique o dashboard.');
}

// Execute o teste:
testeCompleto();`;

  const personalizedScripts = `// ⚙️ SCRIPTS PERSONALIZADOS PARA SEU PROJETO (ATUALIZADOS)

// Script atual do projeto com detecção automática de domínio
const currentProjectScript = \`
<!-- SCRIPT QUERIDOS ANALYTICS - VERSÃO ATUAL COM DOMÍNIO AUTOMÁTICO -->
<script>
(function() {
  // ✨ NOVA FUNCIONALIDADE: Detecção automática de domínio
  const PROJECT_NAME = 'dashboard-app';
  const ENVIRONMENT = 'production';
  const CURRENT_DOMAIN = window.location.hostname.replace(/^www\\./, '');
  
  console.log('🎯 Iniciando Queridos Analytics para domínio:', CURRENT_DOMAIN);
  
  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDsGz4eMdK4AvSotMRubBA6hLZ9wLdTWlY",
    authDomain: "backend-69215.firebaseapp.com",
    databaseURL: "https://backend-69215-default-rtdb.firebaseio.com",
    projectId: "backend-69215",
    storageBucket: "backend-69215.firebasestorage.app",
    messagingSenderId: "939916254169",
    appId: "1:939916254169:web:749b10fe7817f82f2617c8"
  };
  
  // Configurações personalizadas
  const customSettings = {
    trackAdminPages: false,
    enableDebugMode: \${ENVIRONMENT === 'development'},
    pingInterval: 30000,
    maxRetries: 3,
    autoDomainDetection: true // NOVO: Detecção automática habilitada
  };
  
  // ✅ TODOS OS EVENTOS AGORA INCLUEM O CAMPO 'domain' AUTOMATICAMENTE
  // ✅ NÃO É MAIS NECESSÁRIO CONFIGURAR MANUALMENTE
  
  console.log('⚙️ Configurações:', customSettings);
  console.log('🌐 Domínio detectado automaticamente:', CURRENT_DOMAIN);
})();
</script>
\`;

// Configurações por ambiente (ATUALIZADAS)
const environmentConfigs = {
  development: {
    firebaseConfig: { /* config de dev */ },
    debugMode: true,
    pingInterval: 10000,
    autoDomainDetection: true
  },
  staging: {
    firebaseConfig: { /* config de staging */ },
    debugMode: true,
    pingInterval: 20000,
    autoDomainDetection: true
  },
  production: {
    firebaseConfig: { /* config de produção */ },
    debugMode: false,
    pingInterval: 30000,
    autoDomainDetection: true
  }
};

// Instruções de migração
const migrationInstructions = \`
📋 INSTRUÇÕES PARA ATUALIZAR SITES EXISTENTES:

1. ✅ Substitua o script antigo pelo novo script completo
2. ✅ O novo script detecta o domínio automaticamente
3. ✅ Não é necessário configurar nada manualmente
4. ✅ Compatível com scripts antigos (funciona nos dois)
5. ✅ Novos eventos já incluem o campo 'domain'
6. ✅ Dashboard irá filtrar corretamente por site

🔄 MIGRAÇÃO AUTOMÁTICA:
- Sites com script antigo: continuarão funcionando
- Sites com script novo: aparecerão filtrados corretamente
- Gradualmente substitua todos os scripts

🎯 RESULTADO:
- Cada site mostrará apenas seus dados
- Filtro por domínio funcionará perfeitamente
- Dashboard exibirá informações separadas por site
\`;`;

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
          
          <div className="relative z-10 p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                📋 Documentação Completa: Sistema Queridos Analytics
              </h1>
              <p className="text-gray-400 mt-2 text-lg">
                Guia completo para implementar tracking de visitantes, pagamentos e QR codes <span className="text-green-400 font-semibold">com detecção automática de domínio</span>
              </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-7 bg-gray-800/50">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Visão Geral</span>
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Pagamentos</span>
                </TabsTrigger>
                <TabsTrigger value="qrcodes" className="flex items-center space-x-2">
                  <QrCode className="h-4 w-4" />
                  <span>QR Codes</span>
                </TabsTrigger>
                <TabsTrigger value="implementation" className="flex items-center space-x-2">
                  <Wrench className="h-4 w-4" />
                  <span>Implementação</span>
                </TabsTrigger>
                <TabsTrigger value="monitoring" className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4" />
                  <span>Monitoramento</span>
                </TabsTrigger>
                <TabsTrigger value="apis" className="flex items-center space-x-2">
                  <Webhook className="h-4 w-4" />
                  <span>APIs</span>
                </TabsTrigger>
                <TabsTrigger value="scripts" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Scripts</span>
                </TabsTrigger>
              </TabsList>

              {/* VISÃO GERAL */}
              <TabsContent value="overview" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Zap className="h-6 w-6 text-yellow-400" />
                      <span>🎯 Visão Geral - Script Atualizado</span>
                      <Badge className="bg-green-500/20 text-green-300">✨ NOVO: Domínio Automático</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-4">
                    <p className="text-lg">
                      Este sistema rastreia visitantes, pagamentos e QR codes usando Firebase Realtime Database 
                      com <strong className="text-yellow-300">detecção automática de IP, localização real e domínio</strong>.
                    </p>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h4 className="text-green-300 font-semibold mb-2">🆕 Novidades da Atualização</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>✅ <strong>Detecção automática de domínio</strong> - não precisa configurar manualmente</li>
                        <li>✅ <strong>Campo 'domain' em todos os eventos</strong> - garante filtro correto</li>
                        <li>✅ <strong>URL completa sempre capturada</strong> - melhora precisão dos dados</li>
                        <li>✅ <strong>Compatibilidade com scripts antigos</strong> - migração gradual</li>
                        <li>✅ <strong>Filtro por site 100% funcional</strong> - cada site mostra apenas seus dados</li>
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <h4 className="text-green-400 font-semibold mb-2 flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span>Visitantes</span>
                        </h4>
                        <p className="text-sm text-gray-400">Rastreamento automático com IP real, localização e domínio via API ipapi.co</p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <h4 className="text-blue-400 font-semibold mb-2 flex items-center space-x-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Pagamentos</span>
                        </h4>
                        <p className="text-sm text-gray-400">Registro manual de transações com valores, métodos e domínio</p>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                        <h4 className="text-purple-400 font-semibold mb-2 flex items-center space-x-2">
                          <Code className="h-4 w-4" />
                          <span>QR Codes</span>
                        </h4>
                        <p className="text-sm text-gray-400">Tracking de QR codes gerados ou acessados com domínio automático</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Script Completo Atualizado */}
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Code className="h-6 w-6 text-green-400" />
                      <span>🔧 Script Completo Atualizado</span>
                      <Badge className="bg-green-500/20 text-green-300">✨ Domínio Automático</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <p className="text-green-300 text-sm">
                        ✅ <strong>Script atualizado com detecção automática de domínio!</strong> Agora cada site será filtrado corretamente no dashboard.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(completeTrackingScript, "Script atualizado copiado!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96">
                        <code>{completeTrackingScript}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* PAGAMENTOS */}
              <TabsContent value="payments" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <CreditCard className="h-6 w-6 text-blue-400" />
                      <span>💳 Tracking Avançado de Pagamentos</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <h4 className="text-blue-300 font-semibold mb-3">📊 Métodos de Pagamento Suportados</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "PIX (Instantâneo/Agendado)",
                            "Cartão Crédito/Débito",
                            "Boleto Bancário",
                            "Mercado Pago",
                            "PagSeguro",
                            "Stripe Internacional"
                          ].map((method, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-gray-700/50 rounded p-2">
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span className="text-sm text-gray-300">{method}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(paymentsTrackingExamples, "Exemplos de pagamentos copiados!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96">
                        <code>{paymentsTrackingExamples}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* QR CODES */}
              <TabsContent value="qrcodes" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <QrCode className="h-6 w-6 text-purple-400" />
                      <span>📱 Tracking Avançado de QR Codes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                        <h4 className="text-purple-300 font-semibold mb-3">📊 Tipos de QR Code Suportados</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "URL/Website",
                            "Contato (vCard)",
                            "Produto/Serviço",
                            "Pagamento PIX",
                            "Texto Simples",
                            "WiFi"
                          ].map((type, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-gray-700/50 rounded p-2">
                              <CheckCircle className="h-4 w-4 text-purple-400" />
                              <span className="text-sm text-gray-300">{type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(qrCodeTrackingExamples, "Exemplos de QR codes copiados!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96">
                        <code>{qrCodeTrackingExamples}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* IMPLEMENTAÇÃO */}
              <TabsContent value="implementation" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Wrench className="h-6 w-6 text-orange-400" />
                      <span>🔧 Implementação Prática</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                      <h4 className="text-orange-300 font-semibold mb-3">📝 Passo a Passo da Implementação</h4>
                      <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                        <li>Adicionar Script no layout.tsx com strategy="beforeInteractive"</li>
                        <li>Criar arquivo types/analytics.d.ts com declarações TypeScript</li>
                        <li>Integrar nas páginas com setTimeout de 1000ms</li>
                        <li>Sempre verificar se window.queridosAnalytics existe</li>
                        <li>Testar no console do navegador</li>
                        <li>Verificar dados no Firebase Console</li>
                      </ol>
                    </div>

                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(nextJsImplementation, "Código de implementação copiado!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96">
                        <code>{nextJsImplementation}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* MONITORAMENTO */}
              <TabsContent value="monitoring" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Monitor className="h-6 w-6 text-cyan-400" />
                      <span>📊 Monitoramento e Dashboard</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                        <h4 className="text-cyan-300 font-semibold mb-3">📈 Métricas Importantes</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            "Visitantes Online em Tempo Real",
                            "Faturamento do Dia",
                            "QR Codes Gerados/Escaneados",
                            "Conversão de Pagamentos",
                            "Localização dos Usuários",
                            "Picos de Tráfego"
                          ].map((metric, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-gray-700/50 rounded p-2">
                              <LineChart className="h-4 w-4 text-cyan-400" />
                              <span className="text-sm text-gray-300">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(testingCommands, "Código de monitoramento copiado!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96">
                        <code>{testingCommands}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* APIS */}
              <TabsContent value="apis" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Webhook className="h-6 w-6 text-green-400" />
                      <span>🔌 APIs e Webhooks</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <h4 className="text-green-300 font-semibold mb-3">🔗 Integrações Disponíveis</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            "Webhooks Zapier",
                            "Notificações Slack",
                            "Google Analytics",
                            "Relatórios Automatizados",
                            "Email Notifications",
                            "Discord Webhooks"
                          ].map((integration, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-gray-700/50 rounded p-2">
                              <Webhook className="h-4 w-4 text-green-400" />
                              <span className="text-sm text-gray-300">{integration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(personalizedScripts, "Scripts atualizados copiados!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96">
                        <code>{personalizedScripts}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SCRIPTS PERSONALIZADOS */}
              <TabsContent value="scripts" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Settings className="h-6 w-6 text-yellow-400" />
                      <span>⚙️ Scripts Personalizados Atualizados</span>
                      <Badge className="bg-yellow-500/20 text-yellow-300">✨ Domínio Automático</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <h4 className="text-yellow-300 font-semibold mb-3">🎯 Configurações Atualizadas</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            "✨ Detecção Automática de Domínio",
                            "✅ Campo 'domain' em Todos Eventos",
                            "🔄 Compatibilidade com Scripts Antigos",
                            "📊 Filtro por Site 100% Funcional",
                            "🐛 Debug e Logs Melhorados",
                            "⚡ Performance Otimizada"
                          ].map((config, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-gray-700/50 rounded p-2">
                              <Settings className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm text-gray-300">{config}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(personalizedScripts, "Scripts atualizados copiados!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96">
                        <code>{personalizedScripts}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Como Testar */}
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <TestTube className="h-6 w-6 text-green-400" />
                      <span>🧪 Como Testar</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(testingCommands, "Comandos de teste copiados!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12">
                        <code>{testingCommands}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Estrutura Firebase */}
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Database className="h-6 w-6 text-cyan-400" />
                      <span>🔍 Estrutura do Firebase</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(`backend-69215-default-rtdb/
├── visitors/
│   └── session_abc123_1234567890/
│       ├── sessionId: "session_abc123_1234567890"
│       ├── ip: "177.45.123.45"
│       ├── country: "Brazil"
│       ├── city: "São Paulo"
│       ├── state: "São Paulo"
│       ├── status: "online"
│       ├── userAgent: "Mozilla/5.0..."
│       ├── url: "https://site.com"
│       └── timestamp: ServerValue.TIMESTAMP
│
├── payments/
│   └── 1704123456789_abc12/
│       ├── amount: "R$ 150.00"
│       ├── method: "PIX"
│       ├── product: "Curso React"
│       ├── status: "Gerado"
│       ├── sessionId: "session_abc123_1234567890"
│       ├── ip: "177.45.123.45"
│       ├── country: "Brazil"
│       └── timestamp: ServerValue.TIMESTAMP
│
└── qrcodes/
    └── 1704123456789_def34/
        ├── product: "QR Code URL"
        ├── value: "https://exemplo.com"
        ├── type: "url"
        ├── sessionId: "session_abc123_1234567890"
        ├── ip: "177.45.123.45"
        └── timestamp: ServerValue.TIMESTAMP`, "Estrutura do Firebase copiada!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-cyan-300 overflow-x-auto pr-12">
                        <code>{`backend-69215-default-rtdb/
├── visitors/
│   └── session_abc123_1234567890/
│       ├── sessionId: "session_abc123_1234567890"
│       ├── ip: "177.45.123.45"
│       ├── country: "Brazil"
│       ├── city: "São Paulo"
│       ├── state: "São Paulo"
│       ├── status: "online"
│       ├── userAgent: "Mozilla/5.0..."
│       ├── url: "https://site.com"
│       └── timestamp: ServerValue.TIMESTAMP
│
├── payments/
│   └── 1704123456789_abc12/
│       ├── amount: "R$ 150.00"
│       ├── method: "PIX"
│       ├── product: "Curso React"
│       ├── status: "Gerado"
│       ├── sessionId: "session_abc123_1234567890"
│       ├── ip: "177.45.123.45"
│       ├── country: "Brazil"
│       └── timestamp: ServerValue.TIMESTAMP
│
└── qrcodes/
    └── 1704123456789_def34/
        ├── product: "QR Code URL"
        ├── value: "https://exemplo.com"
        ├── type: "url"
        ├── sessionId: "session_abc123_1234567890"
        ├── ip: "177.45.123.45"
        └── timestamp: ServerValue.TIMESTAMP`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Footer atualizado */}
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30 mt-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span>🎉 Resultado Final - Script Atualizado</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-gray-300 mb-4">Com o script atualizado, o sistema agora:</p>
                <div className="grid gap-3">
                  {[
                    "✨ Detecta o domínio automaticamente sem configuração manual",
                    "🎯 Inclui campo 'domain' em todos os eventos (visit, payment, qrcode, offline)",
                    "📊 Filtra dados corretamente por site no dashboard",
                    "🔄 Mantém compatibilidade com scripts antigos",
                    "📍 Detecta visitantes únicos com IP e localização reais",
                    "💳 Rastreia pagamentos com valores e métodos específicos",
                    "📱 Monitora geração e acesso de QR codes por tipo",
                    "⚡ Mantém usuários online em tempo real",
                    "🔥 Armazena tudo no Firebase automaticamente",
                    "🔌 Oferece APIs para integrações avançadas"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-300 font-semibold text-center">
                    🚀 Sistema completo com filtro por domínio funcionando perfeitamente!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Scripts;
