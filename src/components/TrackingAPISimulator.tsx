
import React, { useEffect } from 'react';
import { trackingEndpoints, TrackingData } from '@/utils/trackingAPI';

// Componente para simular endpoints de API para o script standalone
const TrackingAPISimulator: React.FC = () => {
  useEffect(() => {
    // Interceptar requests para /api/track/* e processar internamente
    const originalFetch = window.fetch;
    
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      console.log('[TrackingAPI] 🔍 Interceptando request:', url);
      
      // Verificar se é uma request para nossa API de tracking (com domínio completo ou relativo)
      if (url.includes('/api/track')) {
        console.log('[TrackingAPI] 📡 Request de tracking detectada:', url);
        
        // Extrair o endpoint correto
        let endpoint = '';
        if (url.includes('/api/track/visit')) {
          endpoint = '/visit';
        } else if (url.includes('/api/track/online')) {
          endpoint = '/online';
        } else if (url.includes('/api/track/offline')) {
          endpoint = '/offline';
        } else if (url.includes('/api/track/payment')) {
          endpoint = '/payment';
        } else if (url.includes('/api/track/qrcode')) {
          endpoint = '/qrcode';
        }
        
        console.log('[TrackingAPI] 🎯 Endpoint identificado:', endpoint);
        
        try {
          const data: TrackingData = init?.body ? JSON.parse(init.body as string) : {};
          console.log('[TrackingAPI] 📊 Dados recebidos:', data);
          
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
              console.error('[TrackingAPI] ❌ Endpoint desconhecido:', endpoint);
              result = { success: false, error: 'Unknown endpoint' };
          }
          
          console.log('[TrackingAPI] ✅ Resultado processado:', result);
          
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
          console.error('[TrackingAPI] ❌ Erro ao processar:', error);
          return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), {
            status: 400,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      }
      
      // Para outras requests, usar fetch original
      return originalFetch(input, init);
    };
    
    console.log('[TrackingAPI] 🔗 Simulador de API inicializado e interceptando requests');
    
    // Cleanup
    return () => {
      window.fetch = originalFetch;
      console.log('[TrackingAPI] 🧹 Simulador de API removido');
    };
  }, []);
  
  return null; // Componente invisível
};

export default TrackingAPISimulator;
