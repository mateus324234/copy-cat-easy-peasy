import { useState, useEffect, useRef } from 'react';
import { listenToRealtimeData, clearData } from '@/services/firebase';
import { useSite } from '@/context/SiteContext';
import { getDisplayUrl, getFullDomain } from '@/utils/urlUtils';

export const useRealtimeData = () => {
  const [visitors, setVisitors] = useState<any>({});
  const [payments, setPayments] = useState<any>({});
  const [qrcodes, setQrcodes] = useState<any>({});
  const { activeSite } = useSite();
  
  // Refs para armazenar os dados anteriores e detectar novos itens
  const prevVisitorsRef = useRef<any>({});
  const prevPaymentsRef = useRef<any>({});
  const prevQrcodesRef = useRef<any>({});
  
  // Set para rastrear IDs únicos já notificados
  const notifiedVisitorsRef = useRef<Set<string>>(new Set());
  const notifiedPaymentsRef = useRef<Set<string>>(new Set());
  const notifiedQrcodesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = listenToRealtimeData((update) => {
      console.log(`[useRealtimeData] Recebendo update:`, update.type, update.data);
      
      switch (update.type) {
        case 'visitors':
          const newVisitors = update.data;
          // Detectar novos visitantes com ID único (excluindo dashboard e bots)
          const newVisitorKeys = Object.keys(newVisitors).filter(
            key => !notifiedVisitorsRef.current.has(key) && 
                   newVisitors[key].status === 'online' &&
                   !isDashboardSession(newVisitors[key]) &&
                   !isBotSession(newVisitors[key])
          );
          
          if (newVisitorKeys.length > 0) {
            console.log(`[useRealtimeData] Novos visitantes detectados:`, newVisitorKeys.length);
            newVisitorKeys.forEach(key => {
              const visitor = newVisitors[key];
              console.log(`[useRealtimeData] Disparando notificação para visitante:`, visitor);
              if ((window as any).notifyNewVisit) {
                const eventTimestamp = visitor.timestamp?.seconds ? 
                  visitor.timestamp.seconds * 1000 : 
                  (typeof visitor.timestamp === 'number' ? visitor.timestamp : Date.now());
                
                (window as any).notifyNewVisit({
                  ...visitor,
                  sessionId: key,
                  timestamp: eventTimestamp
                });
              }
              notifiedVisitorsRef.current.add(key);
            });
          }
          
          prevVisitorsRef.current = { ...newVisitors };
          setVisitors(newVisitors);
          break;
          
        case 'payments':
          const newPayments = update.data;
          // Detectar novos pagamentos com ID único
          const newPaymentKeys = Object.keys(newPayments).filter(
            key => !notifiedPaymentsRef.current.has(key)
          );
          
          if (newPaymentKeys.length > 0) {
            console.log(`[useRealtimeData] Novos pagamentos detectados:`, newPaymentKeys.length);
            newPaymentKeys.forEach(key => {
              const payment = newPayments[key];
              console.log(`[useRealtimeData] Disparando notificação para pagamento:`, payment);
              if ((window as any).notifyNewPayment) {
                const eventTimestamp = payment.timestamp?.seconds ? 
                  payment.timestamp.seconds * 1000 : 
                  (typeof payment.timestamp === 'number' ? payment.timestamp : Date.now());
                
                (window as any).notifyNewPayment({
                  ...payment,
                  sessionId: key,
                  timestamp: eventTimestamp
                });
              }
              notifiedPaymentsRef.current.add(key);
            });
          }
          
          prevPaymentsRef.current = { ...newPayments };
          setPayments(newPayments);
          break;
          
        case 'qrcodes':
          const newQrcodes = update.data;
          // Detectar novos QR codes com ID único
          const newQrcodeKeys = Object.keys(newQrcodes).filter(
            key => !notifiedQrcodesRef.current.has(key)
          );
          
          if (newQrcodeKeys.length > 0) {
            console.log(`[useRealtimeData] Novos QR codes detectados:`, newQrcodeKeys.length);
            newQrcodeKeys.forEach(key => {
              const qrcode = newQrcodes[key];
              console.log(`[useRealtimeData] Disparando notificação para QR code:`, qrcode);
              if ((window as any).notifyNewQRCode) {
                const eventTimestamp = qrcode.timestamp?.seconds ? 
                  qrcode.timestamp.seconds * 1000 : 
                  (typeof qrcode.timestamp === 'number' ? qrcode.timestamp : Date.now());
                
                (window as any).notifyNewQRCode({
                  ...qrcode,
                  sessionId: key,
                  timestamp: eventTimestamp
                });
              }
              notifiedQrcodesRef.current.add(key);
            });
          }
          
          prevQrcodesRef.current = { ...newQrcodes };
          setQrcodes(newQrcodes);
          break;
      }
    });

    return unsubscribe;
  }, []);

  // Função para verificar se é um bot
  function isBotSession(visitor: any): boolean {
    const userAgent = visitor.userAgent || '';
    const sessionId = visitor.sessionId || '';
    const ip = visitor.ip || '';
    const page = visitor.page || visitor.url || '';
    
    // Lista de user agents conhecidos de bots
    const botUserAgents = [
      'vercel-screenshot',
      'bot',
      'crawler',
      'spider',
      'lighthouse',
      'pagespeed',
      'googlebot',
      'bingbot',
      'slurp',
      'duckduckbot',
      'baiduspider',
      'yandexbot',
      'facebookexternalhit',
      'twitterbot',
      'linkedinbot',
      'whatsapp',
      'telegram',
      'headlesschrome',
      'phantomjs',
      'selenium',
      'webdriver'
    ];
    
    // Verificar user agent
    const isBot = botUserAgents.some(botAgent => 
      userAgent.toLowerCase().includes(botAgent.toLowerCase())
    );
    
    // Verificar IPs conhecidos de serviços (Vercel, etc)
    const knownServiceIPs = [
      '76.76.19.', // Vercel
      '76.223.126.', // Vercel
    ];
    
    const isServiceIP = knownServiceIPs.some(serviceIP => ip.startsWith(serviceIP));
    
    // Verificar se o domínio da página é de serviços de deploy
    const isServiceDomain = page.includes('vercel.app') || 
                           page.includes('netlify.app') || 
                           page.includes('herokuapp.com');
    
    if (isBot || isServiceIP || isServiceDomain) {
      console.log(`[useRealtimeData] 🤖 Bot/Serviço filtrado:`, { 
        sessionId, 
        userAgent, 
        ip, 
        page,
        reason: isBot ? 'UserAgent Bot' : isServiceIP ? 'Service IP' : 'Service Domain'
      });
      return true;
    }
    
    return false;
  }

  // Função para verificar se é uma sessão do dashboard (melhorada)
  function isDashboardSession(visitor: any): boolean {
    const page = visitor.page || visitor.url || '';
    const referrer = visitor.referrer || '';
    const sessionId = visitor.sessionId || '';
    const domain = visitor.domain || '';
    
    // Verificar se a página é do dashboard
    const dashboardPages = ['/dashboard', '/login', '/admin'];
    const isDashboardPage = dashboardPages.some(dashPage => page.includes(dashPage));
    
    // Verificar se o referrer é do dashboard
    const isDashboardReferrer = dashboardPages.some(dashPage => referrer.includes(dashPage));
    
    // Verificar se o sessionId indica dashboard
    const isDashboardSessionId = sessionId.includes('dashboard');
    
    // Verificar se é um domínio de dashboard (localhost, lovable, etc)
    const isDashboardDomain = domain.includes('localhost') || 
                             domain.includes('lovable.app') || 
                             domain.includes('127.0.0.1');
    
    const isDashboard = isDashboardPage || isDashboardReferrer || isDashboardSessionId || isDashboardDomain;
    
    if (isDashboard) {
      console.log(`[useRealtimeData] 🚫 Sessão do dashboard filtrada:`, { 
        sessionId, 
        page, 
        referrer, 
        domain,
        reason: isDashboardPage ? 'Dashboard Page' : 
                isDashboardReferrer ? 'Dashboard Referrer' : 
                isDashboardSessionId ? 'Dashboard SessionId' : 'Dashboard Domain'
      });
    }
    
    return isDashboard;
  }

  // Filter data by selected site
  const filteredData = {
    visitors: activeSite === 'all' ? visitors : filterBySite(visitors, activeSite),
    payments: activeSite === 'all' ? payments : filterBySite(payments, activeSite),
    qrcodes: activeSite === 'all' ? qrcodes : filterBySite(qrcodes, activeSite),
  };

  // Helper function to filter data by site
  function filterBySite(data: Record<string, any>, siteDomain: string) {
    console.log(`[Filter] Filtrando por site: ${siteDomain}`);
    console.log(`[Filter] Total de itens antes do filtro:`, Object.keys(data).length);
    
    const filtered = Object.fromEntries(
      Object.entries(data).filter(([key, item]) => {
        // 1. Se o item tem campo domain explícito, usar ele diretamente
        if (item.domain) {
          const matches = item.domain === siteDomain;
          console.log(`[Filter] Item ${key}: Domain=${item.domain}, Target=${siteDomain}, Matches=${matches}`);
          return matches;
        }
        
        // 2. Fallback: tentar extrair domínio da URL completa
        const itemUrl = item.url || item.page || item.referrer;
        
        if (!itemUrl) {
          console.log(`[Filter] Item ${key} sem URL válida (url: ${item.url}, page: ${item.page}, referrer: ${item.referrer})`);
          return false;
        }
        
        const itemDomain = getFullDomain(itemUrl);
        console.log(`[Filter] Item ${key}: URL=${itemUrl}, Domain=${itemDomain}, Target=${siteDomain}`);
        
        const matches = itemDomain === siteDomain;
        console.log(`[Filter] Item ${key} matches: ${matches}`);
        
        return matches;
      })
    );
    
    console.log(`[Filter] Total de itens após filtro:`, Object.keys(filtered).length);
    console.log(`[Filter] Itens filtrados:`, Object.keys(filtered));
    return filtered;
  }

  // Calcular métricas em tempo real com logs detalhados (excluindo dashboard e bots)
  const realVisitors = Object.entries(filteredData.visitors).filter(([key, visitor]: [string, any]) => {
    const isDashboard = isDashboardSession(visitor);
    const isBot = isBotSession(visitor);
    const isValid = !isDashboard && !isBot;
    
    if (!isValid) {
      console.log(`[useRealtimeData] 🚫 Visitante filtrado: ${key}, Dashboard: ${isDashboard}, Bot: ${isBot}`);
    }
    
    return isValid;
  });

  const onlineUsers = realVisitors.filter(([key, visitor]: [string, any]) => {
    const isOnline = visitor.status === 'online';
    if (isOnline) {
      console.log(`[useRealtimeData] 👤 Usuário online válido: ${key}, page: ${visitor.page}, userAgent: ${visitor.userAgent?.substring(0, 50)}...`);
    }
    return isOnline;
  }).length;

  console.log(`[useRealtimeData] 📊 Total de visitantes reais (sem dashboard/bots): ${realVisitors.length}`);
  console.log(`[useRealtimeData] 🟢 Total de usuários online (sem dashboard/bots): ${onlineUsers}`);

  const totalVisits = realVisitors.length;
  const totalPayments = Object.keys(filteredData.payments).length;
  const totalQRCodes = Object.keys(filteredData.qrcodes).length;

  console.log(`[useRealtimeData] Calculando total de pagamentos...`);
  console.log(`[useRealtimeData] Dados de pagamentos:`, filteredData.payments);
  
  const paymentTotal = (Object.values(filteredData.payments) as any[]).reduce((sum: number, payment: any): number => {
    console.log(`[useRealtimeData] Processando pagamento:`, payment);
    
    let amount = 0;
    if (payment.amount) {
      const amountStr = payment.amount.toString().trim();
      console.log(`[useRealtimeData] Valor original:`, amountStr);
      
      let cleanAmount = amountStr;
      
      cleanAmount = cleanAmount.replace(/R\$\s*/g, '');
      
      if (cleanAmount.includes(',')) {
        cleanAmount = cleanAmount.replace(/\./g, '').replace(',', '.');
      }
      
      cleanAmount = cleanAmount.replace(/[^\d.-]/g, '');
      
      console.log(`[useRealtimeData] Valor limpo:`, cleanAmount);
      amount = parseFloat(cleanAmount);
      console.log(`[useRealtimeData] Valor parseado:`, amount);
    }
    
    const validAmount = isNaN(amount) ? 0 : amount;
    const newSum = sum + validAmount;
    console.log(`[useRealtimeData] Soma atual: ${sum} + ${validAmount} = ${newSum}`);
    return newSum;
  }, 0);

  console.log(`[useRealtimeData] Total final de pagamentos: R$ ${paymentTotal.toFixed(2)}`);

  // Função para limpar todos os dados
  const clearAllData = async () => {
    console.log(`[useRealtimeData] 🧹 Iniciando limpeza geral de todos os dados...`);
    try {
      await Promise.all([
        clearData.clearVisitors(),
        clearData.clearPayments(),
        clearData.clearQRCodes()
      ]);
      console.log(`[useRealtimeData] ✅ Todos os dados foram limpos com sucesso!`);
      return true;
    } catch (error) {
      console.error(`[useRealtimeData] ❌ Erro ao limpar dados:`, error);
      throw error;
    }
  };

  return {
    visitors: Object.fromEntries(realVisitors),
    payments: filteredData.payments,
    qrcodes: filteredData.qrcodes,
    metrics: {
      onlineUsers,
      totalVisits,
      totalPayments,
      totalQRCodes,
      paymentTotal
    },
    clearAllData
  };
};
