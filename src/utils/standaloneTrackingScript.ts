
export const generateStandaloneScript = (firebaseConfig: any) => `
(function() {
  'use strict';
  
  // 🎯 QUERIDOS ANALYTICS - SCRIPT STANDALONE COM FIREBASE DIRETO
  // Conecta diretamente ao Firebase - funciona em qualquer deploy
  
  const FIREBASE_CONFIG = ${JSON.stringify(firebaseConfig)};
  
  // 🚫 PÁGINAS EXCLUÍDAS DO TRACKING (não contam como visitas/online)
  const EXCLUDED_PAGES = ['/dashboard', '/login', '/script-test', '/admin'];
  
  // Verificar se a página atual deve ser excluída do tracking
  function isPageExcluded() {
    const currentPath = window.location.pathname;
    const isExcluded = EXCLUDED_PAGES.some(excludedPage => currentPath.includes(excludedPage));
    console.log('[Queridos Analytics] 🚫 Verificando exclusão - Página:', currentPath, 'Excluída:', isExcluded);
    return isExcluded;
  }
  
  // Gerar UUID simples
  function generateUUID() {
    return 'xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  // Detectar domínio atual
  function getCurrentDomain() {
    return window.location.hostname.replace(/^www\\./, '');
  }
  
  // Session ID único
  const sessionId = 'session_' + generateUUID() + '_' + Date.now();
  let userLocation = { country: 'Brasil', city: 'São Paulo', state: 'SP', ip: 'Unknown' };
  let isOnline = true;
  let pingInterval = null;
  const currentDomain = getCurrentDomain();
  const pageExcluded = isPageExcluded();
  
  // Log do status da página
  console.log('[Queridos Analytics] 📍 Página atual:', window.location.pathname);
  console.log('[Queridos Analytics] 🚫 Página excluída do tracking?', pageExcluded);
  console.log('[Queridos Analytics] 🌐 Domínio atual:', currentDomain);
  
  // Inicializar Firebase
  let database = null;
  let firebaseInitialized = false;
  
  function initFirebase() {
    try {
      console.log('[Queridos Analytics] 🔥 Iniciando carregamento do Firebase...');
      
      // Importar Firebase dinamicamente
      const script1 = document.createElement('script');
      script1.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
      script1.onload = function() {
        console.log('[Queridos Analytics] ✅ Firebase App carregado');
        const script2 = document.createElement('script');
        script2.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js';
        script2.onload = function() {
          try {
            console.log('[Queridos Analytics] ✅ Firebase Database carregado');
            if (!firebase.apps.length) {
              firebase.initializeApp(FIREBASE_CONFIG);
              console.log('[Queridos Analytics] ✅ Firebase App inicializado');
            }
            database = firebase.database();
            firebaseInitialized = true;
            console.log('[Queridos Analytics] ✅ Firebase Database conectado');
            
            // Testar conexão
            database.ref('.info/connected').on('value', function(snapshot) {
              if (snapshot.val() === true) {
                console.log('[Queridos Analytics] ✅ Conexão com Firebase confirmada');
              } else {
                console.log('[Queridos Analytics] ⚠️ Desconectado do Firebase');
              }
            });
            
            // Iniciar tracking após Firebase estar pronto (apenas se não for página excluída)
            startTracking();
          } catch (error) {
            console.error('[Queridos Analytics] ❌ Erro ao inicializar Firebase:', error);
          }
        };
        script2.onerror = function() {
          console.error('[Queridos Analytics] ❌ Erro ao carregar Firebase Database');
        };
        document.head.appendChild(script2);
      };
      script1.onerror = function() {
        console.error('[Queridos Analytics] ❌ Erro ao carregar Firebase App');
      };
      document.head.appendChild(script1);
    } catch (error) {
      console.error('[Queridos Analytics] ❌ Erro ao carregar Firebase:', error);
    }
  }
  
  // Detectar localização via API
  async function detectLocation() {
    try {
      console.log('[Queridos Analytics] 🌍 Detectando localização...');
      const response = await fetch('https://ipapi.co/json/', { timeout: 5000 });
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
          return;
        }
      }
    } catch (error) {
      console.warn('[Queridos Analytics] ⚠️ Erro ao detectar localização, usando padrão:', error);
    }
  }
  
  // Função para salvar dados diretamente no Firebase
  async function saveToFirebase(path, data) {
    if (!database || !firebaseInitialized) {
      console.error('[Queridos Analytics] ❌ Firebase não inicializado para salvar:', path);
      console.error('[Queridos Analytics] Database:', !!database, 'Initialized:', firebaseInitialized);
      return false;
    }
    
    try {
      console.log('[Queridos Analytics] 📡 TENTANDO SALVAR NO FIREBASE:', path);
      console.log('[Queridos Analytics] 📊 DADOS PARA SALVAR:', JSON.stringify(data, null, 2));
      
      let result;
      if (path.includes('visitors/')) {
        result = await database.ref(path).set(data);
        console.log('[Queridos Analytics] ✅ VISITANTE SALVO - resultado:', result);
      } else {
        // Para payments e qrcodes, usar push para gerar ID único
        result = await database.ref(path).push(data);
        console.log('[Queridos Analytics] ✅ DADOS SALVOS COM PUSH - resultado:', result);
        console.log('[Queridos Analytics] 🔑 ID gerado:', result.key);
      }
      
      console.log('[Queridos Analytics] ✅ SUCESSO - Dados salvos no Firebase!');
      return true;
    } catch (error) {
      console.error('[Queridos Analytics] ❌ ERRO AO SALVAR NO FIREBASE:', error);
      console.error('[Queridos Analytics] Path:', path);
      console.error('[Queridos Analytics] Data:', data);
      
      // Tentar novamente após 3 segundos
      setTimeout(() => {
        console.log('[Queridos Analytics] 🔄 TENTATIVA 2 - Tentando salvar novamente...');
        saveToFirebase(path, data);
      }, 3000);
      
      return false;
    }
  }
  
  // Rastrear evento
  async function trackEvent(eventType, data = {}) {
    const timestamp = new Date().toISOString();
    const eventData = {
      sessionId,
      ...userLocation,
      ...data,
      url: window.location.href,
      page: window.location.pathname,
      referrer: document.referrer || 'direct',
      domain: currentDomain,
      userAgent: navigator.userAgent,
      timestamp
    };
    
    console.log('[Queridos Analytics] 🎯 TRACKING EVENTO:', eventType);
    console.log('[Queridos Analytics] 📊 DADOS DO EVENTO:', JSON.stringify(eventData, null, 2));
    
    switch (eventType) {
      case 'visit':
        // 🚫 NÃO RASTREAR VISITAS EM PÁGINAS EXCLUÍDAS
        if (pageExcluded) {
          console.log('[Queridos Analytics] 🚫 VISITA BLOQUEADA - Página excluída:', window.location.pathname);
          return;
        }
        console.log('[Queridos Analytics] 👤 Processando VISITA...');
        const visitResult = await saveToFirebase(\`visitors/\${sessionId}\`, { 
          ...eventData, 
          status: 'online', 
          firstVisit: timestamp 
        });
        console.log('[Queridos Analytics] 👤 VISITA processada:', visitResult);
        break;
        
      case 'online':
        // 🚫 NÃO RASTREAR ONLINE EM PÁGINAS EXCLUÍDAS
        if (pageExcluded) {
          console.log('[Queridos Analytics] 🚫 ONLINE BLOQUEADO - Página excluída:', window.location.pathname);
          return;
        }
        console.log('[Queridos Analytics] 🟢 Processando ONLINE...');
        const onlineResult = await saveToFirebase(\`visitors/\${sessionId}\`, { 
          ...eventData, 
          status: 'online', 
          lastSeen: timestamp 
        });
        console.log('[Queridos Analytics] 🟢 ONLINE processado:', onlineResult);
        break;
        
      case 'offline':
        // 🚫 NÃO RASTREAR OFFLINE EM PÁGINAS EXCLUÍDAS
        if (pageExcluded) {
          console.log('[Queridos Analytics] 🚫 OFFLINE BLOQUEADO - Página excluída:', window.location.pathname);
          return;
        }
        console.log('[Queridos Analytics] 🔴 Processando OFFLINE...');
        if (database && firebaseInitialized) {
          try {
            const offlineResult = await database.ref(\`visitors/\${sessionId}\`).update({
              status: 'offline',
              lastSeen: timestamp,
              timestamp: timestamp
            });
            console.log('[Queridos Analytics] 🔴 OFFLINE processado:', offlineResult);
          } catch (error) {
            console.error('[Queridos Analytics] ❌ Erro ao processar OFFLINE:', error);
          }
        }
        break;
        
      case 'payment':
        // ✅ PAGAMENTOS SEMPRE FUNCIONAM (mesmo em páginas excluídas)
        console.log('[Queridos Analytics] 💰 ===== PROCESSANDO PAGAMENTO =====');
        console.log('[Queridos Analytics] 💰 Dados recebidos:', data);
        console.log('[Queridos Analytics] 💰 EventData completo:', eventData);
        
        const paymentData = {
          ...eventData,
          paymentId: 'payment_' + generateUUID(),
          // Garantir que os campos de pagamento estejam presentes
          amount: data.amount || 'R$ 0,00',
          method: data.method || 'PIX',
          product: data.product || 'Produto',
          status: data.status || 'Gerado'
        };
        
        console.log('[Queridos Analytics] 💰 Dados finais do pagamento:', JSON.stringify(paymentData, null, 2));
        
        const paymentResult = await saveToFirebase('payments', paymentData);
        console.log('[Queridos Analytics] 💰 ===== PAGAMENTO PROCESSADO =====', paymentResult);
        
        if (paymentResult) {
          console.log('[Queridos Analytics] 💰 ✅ PAGAMENTO SALVO COM SUCESSO!');
        } else {
          console.log('[Queridos Analytics] 💰 ❌ FALHA AO SALVAR PAGAMENTO!');
        }
        break;
        
      case 'qrcode':
        // ✅ QR CODES SEMPRE FUNCIONAM (mesmo em páginas excluídas)
        console.log('[Queridos Analytics] 📱 ===== PROCESSANDO QR CODE =====');
        console.log('[Queridos Analytics] 📱 Dados recebidos:', data);
        
        const qrData = {
          ...eventData,
          qrId: 'qr_' + generateUUID(),
          product: data.product || 'QR Code',
          value: data.value || 'N/A',
          type: data.type || 'produto'
        };
        
        console.log('[Queridos Analytics] 📱 Dados finais do QR:', JSON.stringify(qrData, null, 2));
        
        const qrResult = await saveToFirebase('qrcodes', qrData);
        console.log('[Queridos Analytics] 📱 ===== QR CODE PROCESSADO =====', qrResult);
        break;
    }
  }
  
  // Função para iniciar o tracking
  async function startTracking() {
    console.log('[Queridos Analytics] 🚀 INICIANDO TRACKING...');
    
    await detectLocation();
    console.log('[Queridos Analytics] 📍 Localização detectada:', userLocation);
    
    // 🚫 SÓ REGISTRAR VISITA SE NÃO FOR PÁGINA EXCLUÍDA
    if (!pageExcluded) {
      console.log('[Queridos Analytics] 👤 Registrando visita inicial...');
      await trackEvent("visit");
      
      // Ping online a cada 30 segundos (apenas se não for página excluída)
      pingInterval = setInterval(() => {
        if (isOnline && database && firebaseInitialized) {
          console.log('[Queridos Analytics] 🔄 Ping online...');
          trackEvent("online");
        }
      }, 30000);
    } else {
      console.log('[Queridos Analytics] 🚫 VISITA NÃO REGISTRADA - Página excluída do tracking');
    }
    
    console.log('[Queridos Analytics] ✅ TRACKING INICIADO COM SUCESSO!');
  }
  
  // API pública para desenvolvedores
  window.queridosAnalytics = {
    trackPayment: function(amount, method = "PIX", product = "Produto", status = "Gerado") {
      console.log('[Queridos Analytics] 💰 ===== CHAMADA TRACK PAYMENT =====');
      console.log('[Queridos Analytics] 💰 Parâmetros recebidos:');
      console.log('[Queridos Analytics] 💰 - amount:', amount);
      console.log('[Queridos Analytics] 💰 - method:', method);
      console.log('[Queridos Analytics] 💰 - product:', product);
      console.log('[Queridos Analytics] 💰 - status:', status);
      console.log('[Queridos Analytics] 💰 Firebase inicializado?', firebaseInitialized);
      console.log('[Queridos Analytics] 💰 Database disponível?', !!database);
      
      if (!firebaseInitialized || !database) {
        console.error('[Queridos Analytics] 💰 ❌ FIREBASE NÃO ESTÁ PRONTO!');
        console.error('[Queridos Analytics] 💰 Tentando novamente em 2 segundos...');
        setTimeout(() => {
          this.trackPayment(amount, method, product, status);
        }, 2000);
        return;
      }
      
      trackEvent("payment", {
        amount: amount,
        method: method,
        product: product,
        status: status
      });
      
      console.log('[Queridos Analytics] 💰 ===== TRACK PAYMENT EXECUTADO =====');
    },
    
    trackQRCode: function(product = "QR Code", value = "N/A", type = "produto") {
      console.log('[Queridos Analytics] 📱 ===== CHAMADA TRACK QR CODE =====');
      console.log('[Queridos Analytics] 📱 Parâmetros:', product, value, type);
      console.log('[Queridos Analytics] 📱 Firebase inicializado?', firebaseInitialized);
      
      if (!firebaseInitialized || !database) {
        console.error('[Queridos Analytics] 📱 ❌ FIREBASE NÃO ESTÁ PRONTO!');
        setTimeout(() => {
          this.trackQRCode(product, value, type);
        }, 2000);
        return;
      }
      
      trackEvent("qrcode", {
        product: product,
        value: value,
        type: type
      });
      console.log('[Queridos Analytics] 📱 ===== TRACK QR CODE EXECUTADO =====');
    },
    
    getCurrentDomain: function() {
      return currentDomain;
    },
    
    getSessionId: function() {
      return sessionId;
    },
    
    getStatus: function() {
      return {
        firebaseInitialized,
        database: !!database,
        currentDomain,
        sessionId,
        userLocation,
        pageExcluded,
        currentPage: window.location.pathname
      };
    },
    
    test: function() {
      console.log("🧪 ===== TESTE QUERIDOS ANALYTICS =====");
      console.log("🔥 Firebase inicializado:", firebaseInitialized);
      console.log("📊 Database disponível:", !!database);
      console.log("🌐 Domínio:", currentDomain);
      console.log("🔑 Session:", sessionId);
      console.log("📍 Localização:", userLocation);
      console.log("🚫 Página excluída?", pageExcluded);
      console.log("📄 Página atual:", window.location.pathname);
      console.log("⚙️ Firebase Config:", FIREBASE_CONFIG);
      
      if (!firebaseInitialized) {
        console.error("❌ Firebase não está inicializado! Aguarde alguns segundos e tente novamente.");
        return;
      }
      
      console.log("💰 Testando pagamento...");
      this.trackPayment("R$ 99,90", "PIX", "Teste Pagamento", "Teste");
      
      console.log("📱 Testando QR Code...");
      this.trackQRCode("QR Teste", "https://teste.com", "url");
      
      console.log("✅ Eventos de teste enviados para Firebase!");
      console.log("🔍 Verifique o console para logs detalhados");
      console.log("===== FIM DO TESTE =====");
    }
  };
  
  // Marcar como offline ao sair (apenas se não for página excluída)
  window.addEventListener("beforeunload", () => {
    if (isOnline && database && firebaseInitialized && !pageExcluded) {
      console.log('[Queridos Analytics] 👋 Usuário saindo, marcando como offline...');
      isOnline = false;
      trackEvent("offline");
      if (pingInterval) clearInterval(pingInterval);
    }
  });
  
  // Inicialização
  console.log('[Queridos Analytics] 🚀 ===== INICIANDO QUERIDOS ANALYTICS =====');
  console.log('[Queridos Analytics] 🌐 Domínio atual:', currentDomain);
  console.log('[Queridos Analytics] 🔑 Session ID:', sessionId);
  console.log('[Queridos Analytics] 📄 Página atual:', window.location.pathname);
  console.log('[Queridos Analytics] 🚫 Página excluída?', pageExcluded);
  console.log('[Queridos Analytics] 🔥 Firebase Config:', FIREBASE_CONFIG);
  console.log('[Queridos Analytics] ⏰ Timestamp:', new Date().toISOString());
  
  // Aguardar um pouco antes de inicializar para garantir que a página carregou
  setTimeout(() => {
    initFirebase();
  }, 1000);
  
  console.log('[Queridos Analytics] ===== SCRIPT CARREGADO =====');
})();
`;
