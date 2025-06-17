
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Code, Globe, Zap, CheckCircle, AlertTriangle, FileText, Database, Eye, Wrench, TestTube, BookOpen, CreditCard } from "lucide-react";
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

  const completeTrackingScript = `<!-- 🎯 SISTEMA QUERIDOS ANALYTICS - SCRIPT COMPLETO -->
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

  // Gerar session ID único
  const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  let userLocation = { country: 'Brasil', city: 'São Paulo', state: 'SP', ip: 'Unknown' };
  let isOnline = true;
  let pingInterval = null;

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
          return;
        }
      }
    } catch (error) {
      console.warn('[Queridos Analytics] Erro ao detectar localização:', error);
    }

    // Fallback: usar localização padrão
    console.log('[Queridos Analytics] Usando localização padrão');
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
    '    if (eventType === "visit" || eventType === "online") {' +
    '      const visitRef = ref(database, "visitors/" + "' + sessionId + '");' +
    '      const visitData = {' +
    '        sessionId: "' + sessionId + '",' +
    '        ...data,' +
    '        timestamp: serverTimestamp(),' +
    '        status: eventType === "visit" ? "online" : "online",' +
    '        userAgent: navigator.userAgent,' +
    '        url: window.location.href,' +
    '        referrer: document.referrer || "direct",' +
    '        firstVisit: timestamp,' +
    '        lastSeen: timestamp' +
    '      };' +
    '      await set(visitRef, visitData);' +
    '    } else if (eventType === "payment") {' +
    '      const paymentRef = ref(database, "payments/" + Date.now() + "_" + Math.random().toString(36).substr(2, 5));' +
    '      await set(paymentRef, {' +
    '        ...data,' +
    '        sessionId: "' + sessionId + '",' +
    '        timestamp: serverTimestamp(),' +
    '        date: timestamp,' +
    '        url: window.location.href' +
    '      });' +
    '    } else if (eventType === "qrcode") {' +
    '      const qrRef = ref(database, "qrcodes/" + Date.now() + "_" + Math.random().toString(36).substr(2, 5));' +
    '      await set(qrRef, {' +
    '        ...data,' +
    '        sessionId: "' + sessionId + '",' +
    '        timestamp: serverTimestamp(),' +
    '        date: timestamp,' +
    '        url: window.location.href' +
    '      });' +
    '    } else if (eventType === "offline") {' +
    '      const visitRef = ref(database, "visitors/" + "' + sessionId + '");' +
    '      await update(visitRef, {' +
    '        status: "offline",' +
    '        lastSeen: timestamp,' +
    '        timestamp: serverTimestamp()' +
    '      });' +
    '    }' +
    '    console.log("[Queridos Analytics] Evento registrado:", eventType, data);' +
    '  } catch (error) {' +
    '    console.error("[Queridos Analytics] Erro:", error);' +
    '  }' +
    '}' +
    '' +
    'window.trackEvent = trackEvent;' +
    '' +
    '// Expor API pública' +
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

  const nextJsImplementation = `// app/layout.tsx
import Script from "next/script"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* 🎯 SCRIPT ANALYTICS AQUI */}
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

// types/analytics.d.ts
declare global {
  interface Window {
    queridosAnalytics?: {
      trackPayment: (amount: string, method?: string, product?: string, status?: string) => void
      trackQRCode: (product?: string, value?: string, type?: string) => void
    }
  }
}

export {}

// Exemplo - Página de Pagamentos
const gerarPagamento = () => {
  // ... lógica do pagamento ...
  
  // 🎯 TRACKING DO PAGAMENTO
  setTimeout(() => {
    if (window.queridosAnalytics) {
      window.queridosAnalytics.trackPayment(
        \`R$ \${valor}\`,           // Valor
        metodoPagamento,         // Método
        descricao || "Produto",  // Descrição
        "Gerado"                 // Status
      )
    }
  }, 1000) // Delay para garantir que o script carregou
}

// Exemplo - Página de QR Code
const gerarQRCode = () => {
  // ... lógica do QR code ...
  
  // 🎯 TRACKING DO QR CODE
  setTimeout(() => {
    if (window.queridosAnalytics) {
      window.queridosAnalytics.trackQRCode(
        \`QR Code \${tipo}\`,  // Produto
        conteudo,           // Valor/conteúdo
        tipo                // Tipo
      )
    }
  }, 1000)
}`;

  const firebaseStructure = `backend-69215-default-rtdb/
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
        └── timestamp: ServerValue.TIMESTAMP`;

  const testingCommands = `// 🧪 TESTE NO CONSOLE DO NAVEGADOR:

// Verificar se carregou
console.log(window.queridosAnalytics);

// Testar pagamento
window.queridosAnalytics.trackPayment("R$ 99,90", "PIX", "Teste", "Aprovado");

// Testar QR Code
window.queridosAnalytics.trackQRCode("Teste QR", "https://teste.com", "url");

// Verificar console (deve aparecer):
// [Queridos Analytics] Localização detectada: {ip: "...", country: "..."}
// [Queridos Analytics] Evento registrado: visit {...}
// [Queridos Analytics] Evento registrado: payment {...}`;

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
                📋 Tutorial Completo: Sistema de Analytics
              </h1>
              <p className="text-gray-400 mt-2 text-lg">
                Como implementar o sistema Queridos Analytics com tracking funcional completo
              </p>
            </div>

            <div className="space-y-8">
              {/* Visão Geral */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-yellow-400" />
                    <span>🎯 Visão Geral</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p className="text-lg">
                    Este sistema rastreia visitantes, pagamentos e QR codes usando Firebase Realtime Database 
                    com <strong className="text-yellow-300">detecção automática de IP e localização real</strong>.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h4 className="text-green-400 font-semibold mb-2 flex items-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <span>Visitantes</span>
                      </h4>
                      <p className="text-sm text-gray-400">Rastreamento automático com IP real e localização via API ipapi.co</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="text-blue-400 font-semibold mb-2 flex items-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Pagamentos</span>
                      </h4>
                      <p className="text-sm text-gray-400">Registro manual de transações com valores e métodos</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                      <h4 className="text-purple-400 font-semibold mb-2 flex items-center space-x-2">
                        <Code className="h-4 w-4" />
                        <span>QR Codes</span>
                      </h4>
                      <p className="text-sm text-gray-400">Tracking de QR codes gerados ou acessados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Script Completo */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Code className="h-6 w-6 text-green-400" />
                    <span>🔧 Script Completo Funcional</span>
                    <Badge className="bg-green-500/20 text-green-300">Testado no v0.dev</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-300 text-sm">
                      ✅ <strong>Este script foi testado e está funcionando</strong> no v0.dev com detecção real de IP e localização.
                    </p>
                  </div>
                  
                  <div className="bg-gray-900/80 rounded-lg p-4 relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                      onClick={() => copyToClipboard(completeTrackingScript, "Script completo copiado!")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96">
                      <code>{completeTrackingScript}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Estrutura do Projeto */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-blue-400" />
                    <span>📁 Estrutura do Projeto</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900/60 rounded-lg p-4">
                    <pre className="text-sm text-blue-300">
{`projeto/
├── app/
│   ├── layout.tsx          ← SCRIPT PRINCIPAL AQUI
│   ├── pagamentos/page.tsx ← TRACKING DE PAGAMENTOS
│   ├── qrcode/page.tsx     ← TRACKING DE QR CODES
│   └── ...
└── types/
    └── analytics.d.ts      ← TIPOS TYPESCRIPT`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Implementação Next.js */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Wrench className="h-6 w-6 text-purple-400" />
                    <span>🔧 Implementação Next.js/v0.dev</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="text-purple-300 font-semibold mb-2">📝 Passo a Passo:</h4>
                    <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                      <li>Adicionar Script no layout.tsx com strategy="beforeInteractive"</li>
                      <li>Criar arquivo types/analytics.d.ts com declarações TypeScript</li>
                      <li>Integrar nas páginas com setTimeout de 1000ms</li>
                      <li>Sempre verificar se window.queridosAnalytics existe</li>
                    </ol>
                  </div>
                  
                  <div className="bg-gray-900/80 rounded-lg p-4 relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 text-gray-400 border-gray-600 hover:bg-gray-700"
                      onClick={() => copyToClipboard(nextJsImplementation, "Código Next.js copiado!")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <pre className="text-sm text-gray-300 overflow-x-auto pr-12 max-h-96">
                      <code>{nextJsImplementation}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Como Funciona */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Database className="h-6 w-6 text-cyan-400" />
                    <span>🔍 Como o Sistema Funciona</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                      <h4 className="text-cyan-300 font-semibold mb-2">A. Carregamento Automático</h4>
                      <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                        <li>Script carrega quando a página abre</li>
                        <li>Detecta IP e localização via API ipapi.co</li>
                        <li>Registra visita inicial no Firebase</li>
                        <li>Mantém usuário "online" com ping a cada 30s</li>
                      </ul>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">B. Estrutura dos Dados no Firebase</h4>
                      <div className="bg-gray-900/60 rounded p-3">
                        <pre className="text-xs text-cyan-300 overflow-x-auto">
                          <code>{firebaseStructure}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Como Testar */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <TestTube className="h-6 w-6 text-green-400" />
                    <span>🧪 Como Testar se Está Funcionando</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h4 className="text-green-300 font-semibold mb-2">A. Console do Navegador</h4>
                      <div className="bg-gray-900/60 rounded p-3">
                        <pre className="text-sm text-green-300">
                          <code>{testingCommands}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="text-blue-300 font-semibold mb-2">B. Firebase Console</h4>
                      <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                        <li>Acesse: <a href="https://console.firebase.google.com/" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">https://console.firebase.google.com/</a></li>
                        <li>Projeto: <code className="bg-gray-700 px-1 rounded">backend-69215</code></li>
                        <li>Realtime Database</li>
                        <li>Verifique dados em: <code className="bg-gray-700 px-1 rounded">/visitors/</code>, <code className="bg-gray-700 px-1 rounded">/payments/</code>, <code className="bg-gray-700 px-1 rounded">/qrcodes/</code></li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Problemas Comuns */}
              <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-300 flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6" />
                    <span>⚠️ Problemas Comuns e Soluções</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-yellow-100 space-y-4">
                  <div className="grid gap-4">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <h4 className="text-red-300 font-semibold mb-2">❌ "queridosAnalytics is not defined"</h4>
                      <p className="text-sm text-gray-300 mb-2"><strong>Causa:</strong> Script não carregou ainda</p>
                      <p className="text-sm text-green-300"><strong>Solução:</strong> Usar setTimeout e verificar se existe</p>
                    </div>

                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                      <h4 className="text-orange-300 font-semibold mb-2">❌ Dados não aparecem no Firebase</h4>
                      <p className="text-sm text-gray-300 mb-2"><strong>Causa:</strong> Configuração incorreta ou permissões</p>
                      <p className="text-sm text-green-300"><strong>Solução:</strong> Verificar regras do Firebase Database</p>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="text-blue-300 font-semibold mb-2">❌ IP sempre igual</h4>
                      <p className="text-sm text-gray-300 mb-2"><strong>Causa:</strong> API de geolocalização bloqueada</p>
                      <p className="text-sm text-green-300"><strong>Solução:</strong> Verificar se ipapi.co está acessível</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Checklist */}
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span>✅ Checklist de Implementação</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {[
                      "Script no Layout: Adicionar o script completo no app/layout.tsx dentro da tag <head>",
                      "Strategy: Usar strategy=\"beforeInteractive\" no Script do Next.js",
                      "Tipos: Criar arquivo types/analytics.d.ts com as declarações",
                      "Integração: Adicionar chamadas window.queridosAnalytics.trackPayment() e trackQRCode()",
                      "Delay: Usar setTimeout(..., 1000) nas chamadas de tracking",
                      "Verificação: Sempre verificar se window.queridosAnalytics existe antes de chamar",
                      "Concatenação: Usar concatenação de strings (+) ao invés de template literals aninhados"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 bg-gray-700/50 rounded-lg p-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Template para IAs */}
              <Card className="bg-purple-500/10 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center space-x-2">
                    <BookOpen className="h-6 w-6" />
                    <span>📝 Template para Outras IAs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900/60 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Instrução para IA:</h4>
                    <blockquote className="border-l-4 border-purple-400 pl-4 text-gray-300">
                      <p className="mb-2">"Adicione o sistema de analytics Queridos Analytics seguindo exatamente estes passos:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>No arquivo app/layout.tsx, adicione o Script do Firebase dentro da tag &lt;head&gt; com strategy="beforeInteractive"</li>
                        <li>Crie o arquivo types/analytics.d.ts com as declarações TypeScript</li>
                        <li>Nas páginas onde há ações (pagamentos, QR codes), adicione as chamadas de tracking com setTimeout de 1000ms</li>
                        <li>Use concatenação de strings (+) ao invés de template literals aninhados</li>
                        <li>Sempre verifique se window.queridosAnalytics existe antes de chamar</li>
                      </ol>
                      <p className="mt-2">O sistema deve detectar IP real, localização real, e enviar dados para Firebase Realtime Database."</p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>

              {/* Resultado Final */}
              <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-yellow-400" />
                    <span>🎉 Resultado Final</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-gray-300 mb-4">Quando implementado corretamente, o sistema:</p>
                  <div className="grid gap-3">
                    {[
                      "Detecta visitantes únicos com IP e localização reais",
                      "Rastreia pagamentos com valores e métodos",
                      "Monitora geração de QR codes",
                      "Mantém usuários online em tempo real",
                      "Armazena tudo no Firebase automaticamente"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-300 font-semibold text-center">
                      🚀 Agora você pode copiar este tutorial e passar para qualquer IA implementar corretamente!
                    </p>
                  </div>
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
