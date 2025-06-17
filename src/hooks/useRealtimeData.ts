
import { useState, useEffect, useRef } from 'react';
import { listenToRealtimeData } from '@/services/firebase';

export const useRealtimeData = () => {
  const [visitors, setVisitors] = useState<any>({});
  const [payments, setPayments] = useState<any>({});
  const [qrcodes, setQrcodes] = useState<any>({});
  
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
          // Detectar novos visitantes com ID único
          const newVisitorKeys = Object.keys(newVisitors).filter(
            key => !notifiedVisitorsRef.current.has(key) && 
                   newVisitors[key].status === 'online'
          );
          
          if (newVisitorKeys.length > 0) {
            console.log(`[useRealtimeData] Novos visitantes detectados:`, newVisitorKeys.length);
            newVisitorKeys.forEach(key => {
              const visitor = newVisitors[key];
              console.log(`[useRealtimeData] Disparando notificação para visitante:`, visitor);
              if ((window as any).notifyNewVisit) {
                (window as any).notifyNewVisit({
                  ...visitor,
                  sessionId: key,
                  timestamp: visitor.timestamp || Date.now()
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
                (window as any).notifyNewPayment({
                  ...payment,
                  sessionId: key,
                  timestamp: payment.timestamp || Date.now()
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
                (window as any).notifyNewQRCode({
                  ...qrcode,
                  sessionId: key,
                  timestamp: qrcode.timestamp || Date.now()
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

  // Calcular métricas em tempo real com logs detalhados
  const onlineUsers = Object.values(visitors).filter(
    (visitor: any) => visitor.status === 'online'
  ).length;

  const totalVisits = Object.keys(visitors).length;
  const totalPayments = Object.keys(payments).length;
  const totalQRCodes = Object.keys(qrcodes).length;

  // Melhorar o cálculo de pagamentos com tipagem correta
  console.log(`[useRealtimeData] Calculando total de pagamentos...`);
  console.log(`[useRealtimeData] Dados de pagamentos:`, payments);
  
  const paymentTotal = (Object.values(payments) as any[]).reduce((sum: number, payment: any): number => {
    console.log(`[useRealtimeData] Processando pagamento:`, payment);
    
    let amount = 0;
    if (payment.amount) {
      const amountStr = payment.amount.toString().trim();
      console.log(`[useRealtimeData] Valor original:`, amountStr);
      
      // Melhor parsing para valores monetários brasileiros
      let cleanAmount = amountStr;
      
      // Remover "R$" e espaços
      cleanAmount = cleanAmount.replace(/R\$\s*/g, '');
      
      // Se contém vírgula, assumir que é o separador decimal brasileiro
      if (cleanAmount.includes(',')) {
        // Remover pontos (separadores de milhares) e trocar vírgula por ponto
        cleanAmount = cleanAmount.replace(/\./g, '').replace(',', '.');
      }
      
      // Remover qualquer caractere não numérico exceto ponto e hífen
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

  return {
    visitors,
    payments,
    qrcodes,
    metrics: {
      onlineUsers,
      totalVisits,
      totalPayments,
      totalQRCodes,
      paymentTotal
    }
  };
};
