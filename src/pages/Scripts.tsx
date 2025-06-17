
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, Code, Globe, Zap, CheckCircle, AlertTriangle, FileText, Database, Eye, Wrench, TestTube, BookOpen, CreditCard, QrCode, Monitor, Settings, Webhook, LineChart, ShoppingCart, Users, Activity, HelpCircle, Lightbulb, ArrowRight, Play, Pause } from "lucide-react";
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

  const completeTrackingScript = `<!-- 🎯 QUERIDOS ANALYTICS - SCRIPT COMPLETO ATUALIZADO -->
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

  // ✨ DETECÇÃO AUTOMÁTICA DE DOMÍNIO
  function getCurrentDomain() {
    return window.location.hostname.replace(/^www\\./, '');
  }

  // Gerar session ID único
  const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  let userLocation = { country: 'Brasil', city: 'São Paulo', state: 'SP', ip: 'Unknown' };
  let isOnline = true;
  let pingInterval = null;
  const currentDomain = getCurrentDomain();

  // Detectar localização real via API
  async function detectLocation() {
    try {
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
          console.log('[Queridos Analytics] ✅ Localização detectada:', userLocation);
          console.log('[Queridos Analytics] 🌐 Domínio detectado:', currentDomain);
          return;
        }
      }
    } catch (error) {
      console.warn('[Queridos Analytics] ⚠️ Erro ao detectar localização:', error);
    }
    console.log('[Queridos Analytics] 📍 Usando localização padrão');
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
    '    console.log("[Queridos Analytics] 📊 Evento registrado:", eventType, "Domain:", "' + currentDomain + '");' +
    '  } catch (error) {' +
    '    console.error("[Queridos Analytics] ❌ Erro:", error);' +
    '  }' +
    '}' +
    '' +
    'window.trackEvent = trackEvent;' +
    '' +
    '// 🎯 API PÚBLICA PARA DESENVOLVEDORES' +
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
    '  },' +
    '  test: function() {' +
    '    console.log("🧪 TESTE QUERIDOS ANALYTICS");' +
    '    console.log("Domínio:", "' + currentDomain + '");' +
    '    console.log("Session:", "' + sessionId + '");' +
    '    this.trackPayment("R$ 99,90", "PIX", "Teste Pagamento", "Teste");' +
    '    this.trackQRCode("QR Teste", "https://teste.com", "url");' +
    '    console.log("✅ Eventos de teste enviados!");' +
    '  }' +
    '};' +
    '' +
    '// Inicialização automática' +
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
  detectLocation();
})();
</script>`;

  const stepByStepGuide = `📋 TUTORIAL PASSO A PASSO

🔥 PASSO 1: ADICIONAR O SCRIPT NO SEU SITE
═══════════════════════════════════════════

1️⃣ Copie o script completo acima
2️⃣ Cole no <head> do seu site, antes do </head>
3️⃣ Salve e publique seu site

💡 DICA: O script detecta automaticamente seu domínio!

🔥 PASSO 2: VERIFICAR SE ESTÁ FUNCIONANDO
═══════════════════════════════════════════

1️⃣ Abra seu site no navegador
2️⃣ Pressione F12 para abrir o console
3️⃣ Digite: window.queridosAnalytics.test()
4️⃣ Deve aparecer: "✅ Eventos de teste enviados!"

🔥 PASSO 3: RASTREAR PAGAMENTOS
═══════════════════════════════════

// Quando gerar um PIX:
window.queridosAnalytics.trackPayment("R$ 150,00", "PIX", "Produto ABC", "Gerado");

// Quando processar cartão:
window.queridosAnalytics.trackPayment("R$ 299,90", "Cartão 3x", "Curso React", "Aprovado");

🔥 PASSO 4: RASTREAR QR CODES
═══════════════════════════════

// QR de URL:
window.queridosAnalytics.trackQRCode("Link Site", "https://meusite.com", "url");

// QR de PIX:
window.queridosAnalytics.trackQRCode("PIX Pagamento", "R$ 50,00", "pagamento");

🔥 PASSO 5: VERIFICAR NO DASHBOARD
═══════════════════════════════════

1️⃣ Acesse o dashboard analytics
2️⃣ Verifique se aparecem visitantes online
3️⃣ Teste pagamentos e QR codes
4️⃣ Confirme se dados estão sendo salvos

✅ PRONTO! Seu site está rastreando tudo automaticamente!`;

  const faqContent = `❓ PERGUNTAS FREQUENTES

🤔 Como sei se o script está funcionando?
═══════════════════════════════════════════
• Abra o console (F12) no seu site
• Digite: window.queridosAnalytics
• Se retornar um objeto, está funcionando!
• Use: window.queridosAnalytics.test() para testar

🤔 Por que não vejo dados no dashboard?
═══════════════════════════════════════
• Verifique se o script está no <head>
• Aguarde 30-60 segundos após adicionar
• Teste com: window.queridosAnalytics.test()
• Verifique o console por erros

🤔 Como implementar em diferentes plataformas?
════════════════════════════════════════════
• WordPress: Adicione no functions.php ou plugin
• Shopify: Cole no theme.liquid
• Wix: Use o código HTML personalizado
• HTML: Cole direto no <head>

🤔 Preciso configurar o domínio manualmente?
══════════════════════════════════════════
• ❌ NÃO! O script detecta automaticamente
• ✅ Cada site será filtrado corretamente
• ✅ Não precisa de configuração extra

🤔 Como migrar do script antigo?
═══════════════════════════════════
• ✅ Scripts antigos continuam funcionando
• ✅ Substitua gradualmente pelos novos
• ✅ Compatibilidade 100% garantida

🤔 Posso usar em múltiplos sites?
═════════════════════════════════
• ✅ SIM! Use o mesmo script em todos
• ✅ Cada site aparecerá separadamente
• ✅ Filtro automático por domínio`;

  const platformIntegration = `🌐 INTEGRAÇÃO COM PLATAFORMAS

🟢 WORDPRESS
═══════════════════════════════════

// Method 1: functions.php
function add_queridos_analytics() {
    if (!is_admin()) {
        echo '${completeTrackingScript}';
    }
}
add_action('wp_head', 'add_queridos_analytics');

// Method 2: Plugin Custom HTML

🟢 SHOPIFY
═══════════════════════════════════

1. Admin → Online Store → Themes
2. Actions → Edit Code
3. Abrir theme.liquid
4. Adicionar antes de </head>:

${completeTrackingScript}

🟢 WIX
═══════════════════════════════════

1. Settings → Custom Code
2. Add to Head
3. Colar o script completo

🟢 HTML PURO
═══════════════════════════════════

<!DOCTYPE html>
<html>
<head>
    <title>Meu Site</title>
    ${completeTrackingScript}
</head>
<body>
    <!-- Seu conteúdo -->
</body>
</html>

🟢 REACT/NEXT.JS
═══════════════════════════════════

// app/layout.tsx ou pages/_app.tsx
import Script from 'next/script'

export default function Layout({ children }) {
  return (
    <html>
      <head>
        <Script
          id="queridos-analytics"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: \`${completeTrackingScript.replace(/`/g, '\\`')}\`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}`;

  const troubleshootingGuide = `🔧 TROUBLESHOOTING - RESOLUÇÃO DE PROBLEMAS

🚨 SCRIPT NÃO CARREGA
═══════════════════════════════════════

✅ Verificações básicas:
• Script está no <head>?
• Sem erros de sintaxe?
• Site está online?

🔍 Como testar:
console.log('Script carregado?', !!window.queridosAnalytics);

🚨 VISITANTES NÃO APARECEM
═══════════════════════════════════════

✅ Soluções:
• Aguarde 1-2 minutos
• Limpe cache do navegador
• Teste em aba anônima
• Verifique console por erros

🔍 Como debugar:
window.queridosAnalytics.test();

🚨 PAGAMENTOS NÃO SALVAM
═══════════════════════════════════════

✅ Verificações:
• Chamando trackPayment() corretamente?
• Valores estão corretos?
• Console mostra erros?

🔍 Exemplo correto:
window.queridosAnalytics.trackPayment("R$ 100,00", "PIX", "Produto", "Gerado");

🚨 DOMÍNIO ERRADO NO DASHBOARD
═══════════════════════════════════════

✅ Soluções:
• Usar script atualizado
• Limpar cache
• Aguardar próxima visita

🔍 Verificar domínio:
console.log('Domínio detectado:', window.queridosAnalytics.getCurrentDomain());

🚨 MÚLTIPLOS SITES MISTURADOS
═══════════════════════════════════════

✅ Soluções:
• Usar script atualizado em todos
• Cada site deve ter o script separadamente
• Filtro automático por domínio

🚨 CONSOLE ERRORS COMUNS
═══════════════════════════════════════

❌ "queridosAnalytics is not defined"
✅ Aguarde script carregar ou use setTimeout

❌ "Failed to fetch location"
✅ Normal, usa localização padrão

❌ "Firebase permission denied"
✅ Verifique configuração Firebase

🆘 SUPORTE EMERGENCIAL
═══════════════════════════════════════

Se nada funcionar:
1. Cole o script exatamente como está
2. Teste com window.queridosAnalytics.test()
3. Envie print do console
4. Informe URL do site`;

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
                🚀 Tutorial Completo: Queridos Analytics
              </h1>
              <p className="text-gray-400 mt-2 text-lg">
                Guia completo para implementar o sistema de analytics no seu site em <span className="text-green-400 font-semibold">5 passos simples</span>
              </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-8 bg-gray-800/50">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Início</span>
                </TabsTrigger>
                <TabsTrigger value="tutorial" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Tutorial</span>
                </TabsTrigger>
                <TabsTrigger value="script" className="flex items-center space-x-2">
                  <Code className="h-4 w-4" />
                  <span>Script</span>
                </TabsTrigger>
                <TabsTrigger value="examples" className="flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Exemplos</span>
                </TabsTrigger>
                <TabsTrigger value="platforms" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Plataformas</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQ</span>
                </TabsTrigger>
                <TabsTrigger value="troubleshooting" className="flex items-center space-x-2">
                  <Wrench className="h-4 w-4" />
                  <span>Problemas</span>
                </TabsTrigger>
                <TabsTrigger value="test" className="flex items-center space-x-2">
                  <TestTube className="h-4 w-4" />
                  <span>Testar</span>
                </TabsTrigger>
              </TabsList>

              {/* INÍCIO - VISÃO GERAL */}
              <TabsContent value="overview" className="space-y-8">
                <Card className="bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Zap className="h-6 w-6 text-yellow-400" />
                      <span>🎯 O que é o Queridos Analytics?</span>
                      <Badge className="bg-green-500/20 text-green-300">✨ Detecção Automática</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-6">
                    <div className="text-lg leading-relaxed">
                      <p className="mb-4">
                        Sistema completo de analytics que <strong className="text-yellow-300">detecta automaticamente</strong> visitantes, 
                        pagamentos e QR codes do seu site em tempo real.
                      </p>
                      
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                        <h4 className="text-green-300 font-semibold mb-3 flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5" />
                          <span>🚀 Por que usar?</span>
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <ArrowRight className="h-4 w-4 text-green-400" />
                            <span><strong>100% Automático</strong> - Detecta domínio, IP e localização sozinho</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <ArrowRight className="h-4 w-4 text-blue-400" />
                            <span><strong>Tempo Real</strong> - Veja visitantes online agora mesmo</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <ArrowRight className="h-4 w-4 text-purple-400" />
                            <span><strong>Fácil de Usar</strong> - Copie, cole e pronto!</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <ArrowRight className="h-4 w-4 text-yellow-400" />
                            <span><strong>Multi-Site</strong> - Funciona em quantos sites quiser</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <h4 className="text-blue-400 font-semibold mb-2 flex items-center space-x-2">
                          <Users className="h-5 w-5" />
                          <span>Visitantes</span>
                        </h4>
                        <p className="text-sm text-gray-400">Rastreamento automático com localização real e tempo online</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <h4 className="text-green-400 font-semibold mb-2 flex items-center space-x-2">
                          <CreditCard className="h-5 w-5" />
                          <span>Pagamentos</span>
                        </h4>
                        <p className="text-sm text-gray-400">Acompanhe PIX, cartão e outros métodos de pagamento</p>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                        <h4 className="text-purple-400 font-semibold mb-2 flex items-center space-x-2">
                          <QrCode className="h-5 w-5" />
                          <span>QR Codes</span>
                        </h4>
                        <p className="text-sm text-gray-400">Monitore geração e acesso de QR codes por tipo</p>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mt-6">
                      <h4 className="text-yellow-300 font-semibold mb-3 text-lg">⚡ Implementação em 30 segundos</h4>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                          <span>Copiar script</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                          <span>Colar no site</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                          <span>Funcionando!</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TUTORIAL PASSO A PASSO */}
              <TabsContent value="tutorial" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <BookOpen className="h-6 w-6 text-blue-400" />
                      <span>📚 Tutorial Passo a Passo</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(stepByStepGuide, "Tutorial copiado!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 whitespace-pre-wrap">
                        <code>{stepByStepGuide}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SCRIPT COMPLETO */}
              <TabsContent value="script" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Code className="h-6 w-6 text-green-400" />
                      <span>📄 Script Completo - Copie e Cole</span>
                      <Badge className="bg-green-500/20 text-green-300">✨ Atualizado</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <p className="text-green-300 text-sm">
                        ✅ <strong>Cole este script no &lt;head&gt; do seu site</strong> - Ele detecta automaticamente o domínio e funciona em qualquer plataforma!
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(completeTrackingScript, "Script completo copiado! Cole no <head> do seu site.")}
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

              {/* EXEMPLOS PRÁTICOS */}
              <TabsContent value="examples" className="space-y-8">
                <div className="grid gap-6">
                  <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <CreditCard className="h-6 w-6 text-green-400" />
                        <span>💳 Exemplos: Rastrear Pagamentos</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-900/80 rounded-lg p-4 relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                          onClick={() => copyToClipboard(`// 💳 EXEMPLOS PRÁTICOS DE PAGAMENTOS

// PIX Instantâneo
function gerarPIX(valor) {
  // Sua lógica de PIX aqui...
  
  // 🎯 ADICIONE ESTA LINHA PARA RASTREAR:
  window.queridosAnalytics.trackPayment(
    "R$ " + valor.toFixed(2).replace('.', ','),
    "PIX",
    "Produto/Serviço",
    "Gerado"
  );
}

// Cartão de Crédito
function processarCartao(valor, parcelas) {
  // Sua lógica de cartão aqui...
  
  // 🎯 ADICIONE ESTA LINHA PARA RASTREAR:
  window.queridosAnalytics.trackPayment(
    "R$ " + valor.toFixed(2).replace('.', ','),
    "Cartão " + parcelas + "x",
    "Compra parcelada",
    "Processando"
  );
}

// Pagamento Aprovado
function pagamentoAprovado(valor, metodo) {
  // 🎯 ADICIONE ESTA LINHA PARA RASTREAR:
  window.queridosAnalytics.trackPayment(
    "R$ " + valor.toFixed(2).replace('.', ','),
    metodo,
    "Pagamento confirmado",
    "Aprovado"
  );
}

// 🧪 TESTE RÁPIDO NO CONSOLE:
window.queridosAnalytics.trackPayment("R$ 99,90", "PIX", "Teste", "Gerado");`, "Exemplos de pagamentos copiados!")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-sm text-gray-300 overflow-x-auto pr-12">
                          <code>{`// 💳 EXEMPLOS PRÁTICOS DE PAGAMENTOS

// PIX Instantâneo
function gerarPIX(valor) {
  // Sua lógica de PIX aqui...
  
  // 🎯 ADICIONE ESTA LINHA PARA RASTREAR:
  window.queridosAnalytics.trackPayment(
    "R$ " + valor.toFixed(2).replace('.', ','),
    "PIX",
    "Produto/Serviço",
    "Gerado"
  );
}

// Cartão de Crédito
function processarCartao(valor, parcelas) {
  // Sua lógica de cartão aqui...
  
  // 🎯 ADICIONE ESTA LINHA PARA RASTREAR:
  window.queridosAnalytics.trackPayment(
    "R$ " + valor.toFixed(2).replace('.', ','),
    "Cartão " + parcelas + "x",
    "Compra parcelada",
    "Processando"
  );
}

// 🧪 TESTE RÁPIDO NO CONSOLE:
window.queridosAnalytics.trackPayment("R$ 99,90", "PIX", "Teste", "Gerado");`}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <QrCode className="h-6 w-6 text-purple-400" />
                        <span>📱 Exemplos: Rastrear QR Codes</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-900/80 rounded-lg p-4 relative">
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                          onClick={() => copyToClipboard(`// 📱 EXEMPLOS PRÁTICOS DE QR CODES

// QR Code de URL/Site
function gerarQRURL(url, titulo) {
  // Sua lógica de QR aqui...
  
  // 🎯 ADICIONE ESTA LINHA PARA RASTREAR:
  window.queridosAnalytics.trackQRCode(
    titulo || "QR Code URL",
    url,
    "url"
  );
}

// QR Code de PIX
function gerarQRPIX(valor, descricao) {
  // Sua lógica de QR PIX aqui...
  
  // 🎯 ADICIONE ESTA LINHA PARA RASTREAR:
  window.queridosAnalytics.trackQRCode(
    "PIX: " + descricao,
    "R$ " + valor.toFixed(2).replace('.', ','),
    "pagamento"
  );
}

// QR Code de Contato
function gerarQRContato(nome, telefone) {
  // 🎯 ADICIONE ESTA LINHA PARA RASTREAR:
  window.queridosAnalytics.trackQRCode(
    "Contato: " + nome,
    telefone,
    "contato"
  );
}

// 🧪 TESTE RÁPIDO NO CONSOLE:
window.queridosAnalytics.trackQRCode("QR Teste", "https://meusite.com", "url");`, "Exemplos de QR codes copiados!")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="text-sm text-gray-300 overflow-x-auto pr-12">
                          <code>{`// 📱 EXEMPLOS PRÁTICOS DE QR CODES

// QR Code de URL/Site
function gerarQRURL(url, titulo) {
  // Sua lógica de QR aqui...
  
  // 🎯 ADICIONE ESTA LINHA PARA RASTREAR:
  window.queridosAnalytics.trackQRCode(
    titulo || "QR Code URL",
    url,
    "url"
  );
}

// QR Code de PIX
function gerarQRPIX(valor, descricao) {
  // Sua lógica de QR PIX aqui...
  
  // 🎯 ADICIONE ESTA LINHA PARA RASTREAR:
  window.queridosAnalytics.trackQRCode(
    "PIX: " + descricao,
    "R$ " + valor.toFixed(2).replace('.', ','),
    "pagamento"
  );
}

// 🧪 TESTE RÁPIDO NO CONSOLE:
window.queridosAnalytics.trackQRCode("QR Teste", "https://meusite.com", "url");`}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* INTEGRAÇÃO COM PLATAFORMAS */}
              <TabsContent value="platforms" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Globe className="h-6 w-6 text-blue-400" />
                      <span>🌐 Como Instalar em Cada Plataforma</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(platformIntegration, "Guia de plataformas copiado!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96 whitespace-pre-wrap">
                        <code>{platformIntegration}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAQ */}
              <TabsContent value="faq" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <HelpCircle className="h-6 w-6 text-yellow-400" />
                      <span>❓ Perguntas Frequentes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(faqContent, "FAQ copiado!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 whitespace-pre-wrap">
                        <code>{faqContent}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TROUBLESHOOTING */}
              <TabsContent value="troubleshooting" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Wrench className="h-6 w-6 text-red-400" />
                      <span>🔧 Resolução de Problemas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <p className="text-red-300 text-sm">
                        🚨 <strong>Problemas comuns e suas soluções</strong> - Se algo não funcionar, as respostas estão aqui!
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/80 rounded-lg p-4 relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                        onClick={() => copyToClipboard(troubleshootingGuide, "Guia de troubleshooting copiado!")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96 whitespace-pre-wrap">
                        <code>{troubleshootingGuide}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TESTE */}
              <TabsContent value="test" className="space-y-8">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <TestTube className="h-6 w-6 text-green-400" />
                      <span>🧪 Como Testar se Está Funcionando</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h4 className="text-green-300 font-semibold mb-3">✅ Teste Rápido (Cole no Console)</h4>
                      <div className="bg-gray-900/80 rounded-lg p-3">
                        <code className="text-green-300">window.queridosAnalytics.test()</code>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        Deve aparecer: "✅ Eventos de teste enviados!"
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <h4 className="text-blue-300 font-semibold mb-2">🔍 Verificar se Script Carregou</h4>
                        <div className="bg-gray-900/80 rounded-lg p-3">
                          <code className="text-blue-300">console.log('Script carregado?', !!window.queridosAnalytics)</code>
                        </div>
                      </div>

                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                        <h4 className="text-purple-300 font-semibold mb-2">🌐 Ver Domínio Detectado</h4>
                        <div className="bg-gray-900/80 rounded-lg p-3">
                          <code className="text-purple-300">window.queridosAnalytics.getCurrentDomain()</code>
                        </div>
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <h4 className="text-yellow-300 font-semibold mb-2">💳 Testar Pagamento</h4>
                        <div className="bg-gray-900/80 rounded-lg p-3">
                          <code className="text-yellow-300">window.queridosAnalytics.trackPayment("R$ 99,90", "PIX", "Teste", "Gerado")</code>
                        </div>
                      </div>

                      <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                        <h4 className="text-pink-300 font-semibold mb-2">📱 Testar QR Code</h4>
                        <div className="bg-gray-900/80 rounded-lg p-3">
                          <code className="text-pink-300">window.queridosAnalytics.trackQRCode("QR Teste", "https://teste.com", "url")</code>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">📊 O que Verificar no Dashboard</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span>Aparecem visitantes online</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                          <span>Pagamentos de teste foram salvos</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-purple-400" />
                          <span>QR codes de teste aparecem</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-yellow-400" />
                          <span>Filtro por site funcionando</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Footer */}
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30 mt-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span>🎉 Pronto! Seu Site Está Rastreado</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-gray-300 mb-4">
                  Após seguir este tutorial, seu site terá:
                </p>
                <div className="grid gap-3">
                  {[
                    "✨ Detecção automática de visitantes com localização real",
                    "💳 Rastreamento completo de pagamentos por método",
                    "📱 Monitoramento de QR codes por tipo e uso",
                    "🌐 Filtro automático por domínio (multi-site)",
                    "⚡ Dados em tempo real no dashboard",
                    "🔄 Sistema 100% automático e funcional"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-300 font-semibold text-center">
                    🚀 Analytics profissional implementado em minutos!
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
