
export const generateStandaloneScript = (firebaseConfig: any) => `
(function() {
  'use strict';
  
  // 🎯 QUERIDOS ANALYTICS - SCRIPT STANDALONE COM FIREBASE DIRETO
  // Conecta diretamente ao Firebase - funciona em qualquer deploy
  
  const FIREBASE_CONFIG = ${JSON.stringify(firebaseConfig)};
  
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
  
  // Inicializar Firebase
  let database = null;
  
  function initFirebase() {
    try {
      // Importar Firebase dinamicamente
      const script1 = document.createElement('script');
      script1.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
      script1.onload = function() {
        const script2 = document.createElement('script');
        script2.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js';
        script2.onload = function() {
          try {
            if (!firebase.apps.length) {
              firebase.initializeApp(FIREBASE_CONFIG);
            }
            database = firebase.database();
            console.log('[Queridos Analytics] ✅ Firebase inicializado com sucesso');
            
            // Iniciar tracking após Firebase estar pronto
            startTracking();
          } catch (error) {
            console.error('[Queridos Analytics] ❌ Erro ao inicializar Firebase:', error);
          }
        };
        document.head.appendChild(script2);
      };
      document.head.appendChild(script1);
    } catch (error) {
      console.error('[Queridos Analytics] ❌ Erro ao carregar Firebase:', error);
    }
  }
  
  // Detectar localização via API
  async function detectLocation() {
    try {
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
      console.warn('[Queridos Analytics] ⚠️ Erro ao detectar localização, usando padrão');
    }
  }
  
  // Função para salvar dados diretamente no Firebase
  async function saveToFirebase(path, data) {
    if (!database) {
      console.error('[Queridos Analytics] ❌ Firebase não inicializado');
      return;
    }
    
    try {
      console.log('[Queridos Analytics] 📡 Salvando no Firebase:', path, data);
      
      if (path.includes('visitors/')) {
        await database.ref(path).set(data);
      } else {
        // Para payments e qrcodes, usar push para gerar ID único
        await database.ref(path).push(data);
      }
      
      console.log('[Queridos Analytics] ✅ Dados salvos com sucesso no Firebase');
    } catch (error) {
      console.error('[Queridos Analytics] ❌ Erro ao salvar no Firebase:', error);
      
      // Tentar novamente após 5 segundos
      setTimeout(() => {
        console.log('[Queridos Analytics] 🔄 Tentando salvar novamente...');
        saveToFirebase(path, data);
      }, 5000);
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
    
    console.log('[Queridos Analytics] 🎯 Tracking evento:', eventType, eventData);
    
    switch (eventType) {
      case 'visit':
        await saveToFirebase(\`visitors/\${sessionId}\`, { 
          ...eventData, 
          status: 'online', 
          firstVisit: timestamp 
        });
        break;
        
      case 'online':
        await saveToFirebase(\`visitors/\${sessionId}\`, { 
          ...eventData, 
          status: 'online', 
          lastSeen: timestamp 
        });
        break;
        
      case 'offline':
        if (database) {
          await database.ref(\`visitors/\${sessionId}\`).update({
            status: 'offline',
            lastSeen: timestamp,
            timestamp: timestamp
          });
        }
        break;
        
      case 'payment':
        await saveToFirebase('payments', {
          ...eventData,
          paymentId: 'payment_' + generateUUID()
        });
        break;
        
      case 'qrcode':
        await saveToFirebase('qrcodes', {
          ...eventData,
          qrId: 'qr_' + generateUUID()
        });
        break;
    }
  }
  
  // Função para iniciar o tracking
  async function startTracking() {
    console.log('[Queridos Analytics] 🚀 Iniciando tracking...');
    
    await detectLocation();
    console.log('[Queridos Analytics] 📍 Localização detectada, iniciando tracking...');
    
    // Registrar visita inicial
    await trackEvent("visit");
    
    // Ping online a cada 30 segundos
    pingInterval = setInterval(() => {
      if (isOnline && database) {
        trackEvent("online");
      }
    }, 30000);
  }
  
  // API pública para desenvolvedores
  window.queridosAnalytics = {
    trackPayment: function(amount, method = "PIX", product = "Produto", status = "Gerado") {
      console.log('[Queridos Analytics] 💰 Tracking pagamento:', amount, method, product, status);
      trackEvent("payment", {
        amount: amount,
        method: method,
        product: product,
        status: status
      });
    },
    
    trackQRCode: function(product = "QR Code", value = "N/A", type = "produto") {
      console.log('[Queridos Analytics] 📱 Tracking QR Code:', product, value, type);
      trackEvent("qrcode", {
        product: product,
        value: value,
        type: type
      });
    },
    
    getCurrentDomain: function() {
      return currentDomain;
    },
    
    getSessionId: function() {
      return sessionId;
    },
    
    test: function() {
      console.log("🧪 TESTE QUERIDOS ANALYTICS - FIREBASE DIRETO");
      console.log("Domínio:", currentDomain);
      console.log("Session:", sessionId);
      console.log("Firebase Config:", FIREBASE_CONFIG);
      this.trackPayment("R$ 99,90", "PIX", "Teste Pagamento", "Teste");
      this.trackQRCode("QR Teste", "https://teste.com", "url");
      console.log("✅ Eventos de teste enviados para Firebase!");
    }
  };
  
  // Marcar como offline ao sair
  window.addEventListener("beforeunload", () => {
    if (isOnline && database) {
      isOnline = false;
      trackEvent("offline");
      if (pingInterval) clearInterval(pingInterval);
    }
  });
  
  // Inicialização
  console.log('[Queridos Analytics] 🚀 Inicializando com Firebase direto...');
  console.log('[Queridos Analytics] 🌐 Domínio:', currentDomain);
  console.log('[Queridos Analytics] 🔥 Firebase Config:', FIREBASE_CONFIG);
  
  initFirebase();
})();
`;
