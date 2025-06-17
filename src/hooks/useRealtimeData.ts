
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

  useEffect(() => {
    const unsubscribe = listenToRealtimeData((update) => {
      console.log(`[useRealtimeData] Recebendo update:`, update.type, update.data);
      
      switch (update.type) {
        case 'visitors':
          const newVisitors = update.data;
          // Detectar novos visitantes
          const newVisitorKeys = Object.keys(newVisitors).filter(
            key => !prevVisitorsRef.current[key] && newVisitors[key].status === 'online'
          );
          
          if (newVisitorKeys.length > 0) {
            console.log(`[useRealtimeData] Novos visitantes detectados:`, newVisitorKeys.length);
            newVisitorKeys.forEach(key => {
              const visitor = newVisitors[key];
              console.log(`[useRealtimeData] Disparando notificação para visitante:`, visitor);
              if ((window as any).notifyNewVisit) {
                (window as any).notifyNewVisit(visitor);
              }
            });
          }
          
          prevVisitorsRef.current = { ...newVisitors };
          setVisitors(newVisitors);
          break;
          
        case 'payments':
          const newPayments = update.data;
          // Detectar novos pagamentos
          const newPaymentKeys = Object.keys(newPayments).filter(
            key => !prevPaymentsRef.current[key]
          );
          
          if (newPaymentKeys.length > 0) {
            console.log(`[useRealtimeData] Novos pagamentos detectados:`, newPaymentKeys.length);
            newPaymentKeys.forEach(key => {
              const payment = newPayments[key];
              console.log(`[useRealtimeData] Disparando notificação para pagamento:`, payment);
              if ((window as any).notifyNewPayment) {
                (window as any).notifyNewPayment(payment);
              }
            });
          }
          
          prevPaymentsRef.current = { ...newPayments };
          setPayments(newPayments);
          break;
          
        case 'qrcodes':
          const newQrcodes = update.data;
          // Detectar novos QR codes
          const newQrcodeKeys = Object.keys(newQrcodes).filter(
            key => !prevQrcodesRef.current[key]
          );
          
          if (newQrcodeKeys.length > 0) {
            console.log(`[useRealtimeData] Novos QR codes detectados:`, newQrcodeKeys.length);
            newQrcodeKeys.forEach(key => {
              const qrcode = newQrcodes[key];
              console.log(`[useRealtimeData] Disparando notificação para QR code:`, qrcode);
              if ((window as any).notifyNewQRCode) {
                (window as any).notifyNewQRCode(qrcode);
              }
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

  // Debug detalhado para pagamentos
  console.log(`[useRealtimeData] Calculando total de pagamentos...`);
  console.log(`[useRealtimeData] Dados de pagamentos:`, payments);
  
  const paymentTotal = Object.values(payments).reduce((sum: number, payment: any) => {
    console.log(`[useRealtimeData] Processando pagamento:`, payment);
    
    let amount = 0;
    if (payment.amount) {
      // Tentar diferentes formatos de valor
      const amountStr = payment.amount.toString();
      console.log(`[useRealtimeData] Valor original:`, amountStr);
      
      // Remover caracteres não numéricos exceto ponto e vírgula
      const cleanAmount = amountStr.replace(/[^\d.,]/g, '');
      console.log(`[useRealtimeData] Valor limpo:`, cleanAmount);
      
      // Converter vírgula para ponto se necessário
      const normalizedAmount = cleanAmount.replace(',', '.');
      amount = parseFloat(normalizedAmount);
      
      console.log(`[useRealtimeData] Valor parseado:`, amount);
    }
    
    const newSum = sum + (isNaN(amount) ? 0 : amount);
    console.log(`[useRealtimeData] Soma atual: ${sum} + ${amount} = ${newSum}`);
    return newSum;
  }, 0);

  console.log(`[useRealtimeData] Total final de pagamentos: R$ ${paymentTotal}`);

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
