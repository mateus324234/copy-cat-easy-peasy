
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

export async function trackVisit() {
  try {
    const response = await fetch('https://ipwhois.app/json/');
    const data = await response.json();
    
    if (data.success) {
      const sessionId = getOrCreateSessionId();
      await trackingAPI.visit({
        sessionId,
        ip: data.ip,
        country: data.country,
        city: data.city,
        state: data.region,
        page: window.location.pathname,
        referrer: document.referrer,
        url: window.location.href,
        userAgent: navigator.userAgent
      });
      
      // Set up the ping interval
      setupPingInterval(sessionId, data);
      
      // Set up the beforeunload handler
      window.addEventListener('beforeunload', async () => {
        await trackingAPI.offline({
          sessionId,
          country: data.country,
          city: data.city,
          state: data.region
        });
      });
    }
  } catch (error) {
    console.error('Failed to track visit:', error);
  }
}

function setupPingInterval(sessionId: string, data: any) {
  // Send "online" ping every 30 seconds
  const intervalId = setInterval(async () => {
    await trackingAPI.online({
      sessionId,
      country: data.country,
      city: data.city,
      state: data.region,
      page: window.location.pathname,
      referrer: document.referrer,
      url: window.location.href,
      userAgent: navigator.userAgent
    });
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
        // Add current page and referrer to the payment data
        const paymentData = {
          ...data,
          page: window.location.pathname,
          referrer: document.referrer
        };
        await trackingAPI.payment(paymentData);
      } catch (error) {
        console.error('Error registering payment:', error);
      }
    };
    
    (window as any).qrcode = async (data: any) => {
      try {
        // Add current page and referrer to the QR code data
        const qrData = {
          ...data,
          page: window.location.pathname,
          referrer: document.referrer
        };
        await trackingAPI.qrcode(qrData);
      } catch (error) {
        console.error('Error registering QR code:', error);
      }
    };
    
    console.log('[TrackingScript] Tracking initialized');
  }
}
