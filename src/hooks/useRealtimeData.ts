
import { useState, useEffect } from 'react';
import { listenToRealtimeData } from '@/services/firebase';

export const useRealtimeData = () => {
  const [visitors, setVisitors] = useState<any>({});
  const [payments, setPayments] = useState<any>({});
  const [qrcodes, setQrcodes] = useState<any>({});

  useEffect(() => {
    const unsubscribe = listenToRealtimeData((update) => {
      switch (update.type) {
        case 'visitors':
          setVisitors(update.data);
          break;
        case 'payments':
          setPayments(update.data);
          break;
        case 'qrcodes':
          setQrcodes(update.data);
          break;
      }
    });

    return unsubscribe;
  }, []);

  // Calcular métricas em tempo real
  const onlineUsers = Object.values(visitors).filter(
    (visitor: any) => visitor.status === 'online'
  ).length;

  const totalVisits = Object.keys(visitors).length;

  const totalPayments = Object.keys(payments).length;

  const totalQRCodes = Object.keys(qrcodes).length;

  const paymentTotal = Object.values(payments).reduce((sum: number, payment: any) => {
    const amount = parseFloat(payment.amount || '0');
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

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
