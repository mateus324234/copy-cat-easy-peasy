
import { trackingAPI as firebaseAPI } from '@/services/firebase';

export interface TrackingData {
  sessionId: string;
  country: string;
  city: string;
  state: string;
  ip: string;
  url: string;
  page: string;
  referrer: string;
  domain: string;
  userAgent: string;
  timestamp: string;
  [key: string]: any;
}

export const trackingEndpoints = {
  async handleVisit(data: TrackingData) {
    try {
      await firebaseAPI.visit(data);
      return { success: true, message: 'Visit tracked' };
    } catch (error) {
      console.error('Error tracking visit:', error);
      return { success: false, error: 'Failed to track visit' };
    }
  },

  async handleOnline(data: TrackingData) {
    try {
      await firebaseAPI.online(data);
      return { success: true, message: 'Online status updated' };
    } catch (error) {
      console.error('Error updating online status:', error);
      return { success: false, error: 'Failed to update online status' };
    }
  },

  async handleOffline(data: TrackingData) {
    try {
      await firebaseAPI.offline(data);
      return { success: true, message: 'Offline status updated' };
    } catch (error) {
      console.error('Error updating offline status:', error);
      return { success: false, error: 'Failed to update offline status' };
    }
  },

  async handlePayment(data: TrackingData) {
    try {
      await firebaseAPI.payment(data);
      return { success: true, message: 'Payment tracked' };
    } catch (error) {
      console.error('Error tracking payment:', error);
      return { success: false, error: 'Failed to track payment' };
    }
  },

  async handleQRCode(data: TrackingData) {
    try {
      await firebaseAPI.qrcode(data);
      return { success: true, message: 'QR code tracked' };
    } catch (error) {
      console.error('Error tracking QR code:', error);
      return { success: false, error: 'Failed to track QR code' };
    }
  }
};

// Simulação de servidor HTTP para demonstração
export const createMockAPIServer = () => {
  const handleRequest = async (endpoint: string, data: TrackingData) => {
    console.log(`[Mock API] ${endpoint}:`, data);
    
    switch (endpoint) {
      case '/track/visit':
        return await trackingEndpoints.handleVisit(data);
      case '/track/online':
        return await trackingEndpoints.handleOnline(data);
      case '/track/offline':
        return await trackingEndpoints.handleOffline(data);
      case '/track/payment':
        return await trackingEndpoints.handlePayment(data);
      case '/track/qrcode':
        return await trackingEndpoints.handleQRCode(data);
      default:
        return { success: false, error: 'Unknown endpoint' };
    }
  };

  return { handleRequest };
};
