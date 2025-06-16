
/**
 * Sistema de Tracking em Tempo Real com Firebase
 * Baseado no modelo fornecido com melhorias
 */
export function initializeTracking() {
  (function() {
    'use strict';

    // Configuração
    const SITE = 'dashboard-app';
    const REF = 'direct';
    const API_BASE = '/api/tracking'; // Usaremos nossa API interna
    
    // Gerar session ID único
    const SESSION_ID = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    let pingInterval: NodeJS.Timeout | null = null;
    let inactivityTimer: NodeJS.Timeout | null = null;
    let isOnline = true;
    let isActive = true;
    let lastActivity = Date.now();
    let startTime = Date.now();

    // Localização do usuário
    let userLocation = { country: 'Brasil', city: 'São Paulo', state: 'SP', ip: 'Unknown' };

    // Função para obter localização usando APIs reais
    async function getLocation() {
      try {
        // Primeira tentativa: IPWHOIS API
        try {
          const ipwhoResponse = await fetch('https://ipwhois.app/json/', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          
          if (ipwhoResponse.ok) {
            const data = await ipwhoResponse.json();
            if (data.success) {
              userLocation = {
                country: data.country || 'Brasil',
                city: data.city || 'São Paulo',
                state: data.region || 'SP',
                ip: data.ip || 'Unknown'
              };
              console.log('[Tracking] Localização obtida via IPWHOIS:', userLocation);
              return;
            }
          }
        } catch (ipwhoError) {
          console.warn('[Tracking] IPWHOIS falhou, tentando fallback');
        }

        // Segunda tentativa: ipinfo.io com seu token
        try {
          const ipinfoResponse = await fetch('https://ipinfo.io/json?token=d64885a1e83ad4', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          
          if (ipinfoResponse.ok) {
            const data = await ipinfoResponse.json();
            userLocation = {
              country: data.country === 'BR' ? 'Brasil' : (data.country || 'Brasil'),
              city: data.city || 'São Paulo',
              state: data.region || 'SP',
              ip: data.ip || 'Unknown'
            };
            console.log('[Tracking] Localização obtida via ipinfo.io:', userLocation);
            return;
          }
        } catch (ipinfoError) {
          console.warn('[Tracking] ipinfo.io falhou');
        }

      } catch (error) {
        console.warn('[Tracking] Erro ao obter localização:', error);
      }
    }

    // Função para enviar dados para Firebase via nossa API
    async function sendTracking(endpoint: string, data: any) {
      try {
        // Importar dinamicamente nosso Firebase service
        const { trackingAPI } = await import('../services/firebase');
        
        const payload = {
          site: SITE,
          ref: REF,
          sessionId: SESSION_ID,
          ...userLocation,
          ...data
        };

        // Chamar a função correspondente do Firebase
        switch (endpoint) {
          case 'visit':
            await trackingAPI.visit(payload);
            break;
          case 'online':
            await trackingAPI.online(payload);
            break;
          case 'offline':
            await trackingAPI.offline(payload);
            break;
          case 'payment':
            await trackingAPI.payment(payload);
            break;
          case 'qrcode':
            await trackingAPI.qrcode(payload);
            break;
        }
      } catch (error) {
        console.log('[Tracking] Erro ao enviar dados:', error);
      }
    }

    // Registrar visita inicial
    async function trackVisit() {
      // Verificar se é dashboard administrativo
      const isAdminDashboard = window.location.pathname.includes('/dashboard') || 
                              window.location.pathname.includes('/admin') ||
                              document.title.includes('Dashboard');
      
      if (isAdminDashboard) {
        console.log('[Tracking] Dashboard administrativo detectado - visita ignorada');
        return;
      }
      
      await getLocation();
      
      await sendTracking('visit', {
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        country: userLocation.country,
        city: userLocation.city,
        state: userLocation.state,
        ip: userLocation.ip
      });
    }

    // Detectores de atividade
    function setupActivityDetection() {
      const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      function resetActivityTimer() {
        lastActivity = Date.now();
        
        if (!isActive) {
          isActive = true;
          console.log('[Tracking] Usuário voltou a ser ativo');
          startOnlinePing();
        }
        
        clearTimeout(inactivityTimer!);
        inactivityTimer = setTimeout(() => {
          if (isActive && isOnline) {
            console.log('[Tracking] Usuário inativo por 15 segundos - pausando ping');
            isActive = false;
            stopOnlinePing();
          }
        }, 15000);
      }

      activityEvents.forEach(event => {
        document.addEventListener(event, resetActivityTimer, true);
      });

      document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
          console.log('[Tracking] Aba ficou oculta');
          isActive = false;
          stopOnlinePing();
        } else {
          console.log('[Tracking] Aba voltou ao foco');
          resetActivityTimer();
        }
      });

      resetActivityTimer();
    }

    // Ping online a cada 3 segundos
    function startOnlinePing() {
      if (pingInterval) return;
      
      pingInterval = setInterval(async () => {
        if (isOnline && isActive) {
          const isAdminDashboard = window.location.pathname.includes('/dashboard') || 
                                  window.location.pathname.includes('/admin') ||
                                  document.title.includes('Dashboard');
          
          if (isAdminDashboard) {
            return;
          }
          
          await sendTracking('online', {
            status: 'online',
            currentPage: window.location.pathname,
            cartValue: getCartValue(),
            timeOnSite: Math.floor((Date.now() - startTime) / 1000) + 's',
            isActive: true
          });
        }
      }, 3000);
    }

    function stopOnlinePing() {
      if (pingInterval) {
        clearInterval(pingInterval);
        pingInterval = null;
      }
    }

    // Marcar como offline com sendBeacon
    async function setOffline() {
      if (isOnline) {
        isOnline = false;
        clearInterval(pingInterval!);
        
        // Usar sendBeacon para garantir envio
        const payload = JSON.stringify({
          sessionId: SESSION_ID,
          status: 'offline'
        });
        
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/tracking/offline', payload);
        } else {
          await sendTracking('offline', { sessionId: SESSION_ID });
        }
      }
    }

    // Detectar valor do carrinho
    function getCartValue() {
      const cartSelectors = [
        '[data-cart-total]', '.cart-total', '#cart-total',
        '.total-price', '[data-total]', '.price', '.valor',
        '.preco', '.amount', '.total', '[data-price]'
      ];
      
      for (const selector of cartSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          const value = extractMoneyValue(element.textContent);
          if (value) return value;
        }
      }
      
      return null;
    }
    
    function extractMoneyValue(text: string | null) {
      if (!text) return null;
      
      const patterns = [
        /R\$\s*(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/,
        /(\d{1,3}(?:\.\d{3})*,\d{2})/,
        /(\d+,\d{2})/,
        /R\$\s*(\d+(?:,\d{2})?)/
      ];
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return match[0].trim();
      }
      
      return null;
    }

    // API pública para tracking manual
    (window as any).trackingAPI = {
      payment: async function(amount: string, method = 'PIX', product = 'Produto', transactionId?: string) {
        let cleanAmount = amount;
        
        if (typeof amount === 'string') {
          cleanAmount = amount
            .replace(/R\$\s*/, '')
            .replace(/\./g, '')
            .replace(',', '.')
            .trim();
        }
        
        await sendTracking('payment', {
          amount: cleanAmount,
          currency: 'BRL',
          method: method,
          product: product,
          transactionId: transactionId || 'TXN-' + Date.now(),
          status: 'aprovado'
        });
      },

      qrcode: async function(qrType = 'produto', product = 'QR Code', value = '0', copies = 1) {
        await sendTracking('qrcode', {
          qrId: 'QR-' + Date.now(),
          type: qrType,
          product: product,
          value: value,
          copies: copies
        });
      }
    };

    // Event listeners para fechamento
    window.addEventListener('beforeunload', setOffline);
    window.addEventListener('unload', setOffline);
    window.addEventListener('pagehide', setOffline);

    // Inicialização
    async function init() {
      await getLocation();
      await trackVisit();
      setupActivityDetection();
      
      console.log('[Tracking] Sistema iniciado');
      console.log('[Tracking] Session ID:', SESSION_ID);
    }

    // Aguardar carregamento
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }

  })();
}
