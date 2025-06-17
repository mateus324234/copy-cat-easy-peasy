
export const generateStandaloneScript = (apiBaseUrl: string) => `
(function() {
  'use strict';
  
  // 🎯 QUERIDOS ANALYTICS - SCRIPT STANDALONE
  // Versão independente - funciona em qualquer site
  
  const API_BASE_URL = '${apiBaseUrl}';
  
  // Gerar UUID simples
  function generateUUID() {
    return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
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
  
  // Função para enviar eventos para API
  async function sendToAPI(endpoint, data) {
    try {
      const response = await fetch(API_BASE_URL + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        console.log('[Queridos Analytics] ✅ Evento enviado:', endpoint);
      } else {
        console.warn('[Queridos Analytics] ⚠️ Erro ao enviar:', response.status);
      }
    } catch (error) {
      console.error('[Queridos Analytics] ❌ Erro de rede:', error);
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
    
    switch (eventType) {
      case 'visit':
        await sendToAPI('/track/visit', { ...eventData, status: 'online', firstVisit: timestamp });
        break;
      case 'online':
        await sendToAPI('/track/online', { ...eventData, status: 'online', lastSeen: timestamp });
        break;
      case 'offline':
        await sendToAPI('/track/offline', { ...eventData, status: 'offline', lastSeen: timestamp });
        break;
      case 'payment':
        await sendToAPI('/track/payment', eventData);
        break;
      case 'qrcode':
        await sendToAPI('/track/qrcode', eventData);
        break;
    }
  }
  
  // API pública para desenvolvedores
  window.queridosAnalytics = {
    trackPayment: function(amount, method = "PIX", product = "Produto", status = "Gerado") {
      trackEvent("payment", {
        amount: amount,
        method: method,
        product: product,
        status: status
      });
    },
    
    trackQRCode: function(product = "QR Code", value = "N/A", type = "produto") {
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
      console.log("🧪 TESTE QUERIDOS ANALYTICS");
      console.log("Domínio:", currentDomain);
      console.log("Session:", sessionId);
      this.trackPayment("R$ 99,90", "PIX", "Teste Pagamento", "Teste");
      this.trackQRCode("QR Teste", "https://teste.com", "url");
      console.log("✅ Eventos de teste enviados!");
    }
  };
  
  // Inicialização automática
  detectLocation().then(() => {
    trackEvent("visit");
    
    // Ping online a cada 30 segundos
    pingInterval = setInterval(() => {
      if (isOnline) {
        trackEvent("online");
      }
    }, 30000);
  });
  
  // Marcar como offline ao sair
  window.addEventListener("beforeunload", () => {
    if (isOnline) {
      isOnline = false;
      trackEvent("offline");
      if (pingInterval) clearInterval(pingInterval);
    }
  });
  
  console.log('[Queridos Analytics] 🚀 Inicializado - Domínio:', currentDomain);
})();
`;
