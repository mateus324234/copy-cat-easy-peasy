
import React, { useEffect } from 'react';
import { trackingEndpoints, TrackingData } from '@/utils/trackingAPI';

// Componente para simular endpoints de API para o script standalone
const TrackingAPISimulator: React.FC = () => {
  useEffect(() => {
    // Interceptar requests para /api/track/* e processar internamente
    const originalFetch = window.fetch;
    
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Verificar se é uma request para nossa API de tracking
      if (url.includes('/api/track/')) {
        const endpoint = url.split('/api/track')[1];
        
        try {
          const data: TrackingData = init?.body ? JSON.parse(init.body as string) : {};
          
          let result;
          switch (endpoint) {
            case '/visit':
              result = await trackingEndpoints.handleVisit(data);
              break;
            case '/online':
              result = await trackingEndpoints.handleOnline(data);
              break;
            case '/offline':
              result = await trackingEndpoints.handleOffline(data);
              break;
            case '/payment':
              result = await trackingEndpoints.handlePayment(data);
              break;
            case '/qrcode':
              result = await trackingEndpoints.handleQRCode(data);
              break;
            default:
              result = { success: false, error: 'Unknown endpoint' };
          }
          
          // Simular resposta HTTP
          return new Response(JSON.stringify(result), {
            status: result.success ? 200 : 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            }
          });
        } catch (error) {
          return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      // Para outras requests, usar fetch original
      return originalFetch(input, init);
    };
    
    console.log('[TrackingAPI] 🔗 Simulador de API inicializado');
    
    // Cleanup
    return () => {
      window.fetch = originalFetch;
    };
  }, []);
  
  return null; // Componente invisível
};

export default TrackingAPISimulator;
