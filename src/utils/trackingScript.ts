
import { trackingAPI } from '@/services/firebase';
import { v4 as uuidv4 } from 'uuid';

// Store the session ID in localStorage to reuse it across page views
const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem('tracking_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('tracking_session_id', sessionId);
  }
  return sessionId;
};

// Extract domain from current URL
const getCurrentDomain = () => {
  return window.location.hostname.replace(/^www\./, '');
};

// Check if current page should be excluded from tracking
const isPageExcluded = () => {
  const currentPath = window.location.pathname;
  const excludedPages = ['/dashboard', '/login', '/script-test', '/admin'];
  const isExcluded = excludedPages.some(excludedPage => currentPath.includes(excludedPage));
  
  console.log('[TrackingScript] 🚫 Verificando exclusão - Página:', currentPath, 'Excluída:', isExcluded);
  return isExcluded;
};

export async function trackVisit() {
  // Don't track visits on excluded pages
  if (isPageExcluded()) {
    console.log('[TrackingScript] 🚫 Visita não registrada - Página excluída do tracking');
    return;
  }

  try {
    const response = await fetch('https://ipwhois.app/json/');
    const data = await response.json();
    
    if (data.success) {
      const sessionId = getOrCreateSessionId();
      const currentDomain = getCurrentDomain();
      
      console.log('[TrackingScript] 👤 Registrando visita para:', currentDomain, sessionId);
      
      await trackingAPI.visit({
        sessionId,
        ip: data.ip,
        country: data.country,
        city: data.city,
        state: data.region,
        page: window.location.pathname,
        referrer: document.referrer,
        url: window.location.href,
        domain: currentDomain,
        userAgent: navigator.userAgent
      });
      
      // Set up the ping interval
      setupPingInterval(sessionId, data, currentDomain);
      
      // Set up the beforeunload handler
      window.addEventListener('beforeunload', async () => {
        if (!isPageExcluded()) {
          await trackingAPI.offline({
            sessionId,
            country: data.country,
            city: data.city,
            state: data.region,
            domain: currentDomain
          });
        }
      });
    }
  } catch (error) {
    console.error('Failed to track visit:', error);
  }
}

function setupPingInterval(sessionId: string, data: any, domain: string) {
  // Send "online" ping every 30 seconds (only if not excluded page)
  const intervalId = setInterval(async () => {
    if (!isPageExcluded()) {
      console.log('[TrackingScript] 🔄 Ping online para:', domain, sessionId);
      await trackingAPI.online({
        sessionId,
        country: data.country,
        city: data.city,
        state: data.region,
        page: window.location.pathname,
        referrer: document.referrer,
        url: window.location.href,
        domain: domain,
        userAgent: navigator.userAgent
      });
    } else {
      console.log('[TrackingScript] 🚫 Ping online bloqueado - Página excluída');
    }
  }, 30000);
  
  // Clear the interval when the page is unloaded
  window.addEventListener('beforeunload', () => {
    clearInterval(intervalId);
  });
}

export function initializeTracking() {
  // Check if running in browser environment (not SSR)
  if (typeof window !== 'undefined') {
    // Initialize tracking functions on the window object
    (window as any).payment = async (data: any) => {
      try {
        const currentDomain = getCurrentDomain();
        console.log('[TrackingScript] 💰 Registrando pagamento para:', currentDomain);
        
        // Add current page, referrer, and domain to the payment data
        const paymentData = {
          ...data,
          page: window.location.pathname,
          referrer: document.referrer,
          url: window.location.href,
          domain: currentDomain
        };
        await trackingAPI.payment(paymentData);
      } catch (error) {
        console.error('Error registering payment:', error);
      }
    };
    
    (window as any).qrcode = async (data: any) => {
      try {
        const currentDomain = getCurrentDomain();
        console.log('[TrackingScript] 📱 Registrando QR code para:', currentDomain);
        
        // Add current page, referrer, and domain to the QR code data
        const qrData = {
          ...data,
          page: window.location.pathname,
          referrer: document.referrer,
          url: window.location.href,
          domain: currentDomain
        };
        await trackingAPI.qrcode(qrData);
      } catch (error) {
        console.error('Error registering QR code:', error);
      }
    };
    
    console.log('[TrackingScript] Tracking initialized');
  }
}
