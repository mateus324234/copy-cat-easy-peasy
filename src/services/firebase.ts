
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, onValue, push, serverTimestamp } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDsGz4eMdK4AvSotMRubBA6hLZ9wLdTWlY",
  authDomain: "backend-69215.firebaseapp.com",
  databaseURL: "https://backend-69215-default-rtdb.firebaseio.com",
  projectId: "backend-69215",
  storageBucket: "backend-69215.firebasestorage.app",
  messagingSenderId: "939916254169",
  appId: "1:939916254169:web:749b10fe7817f82f2617c8",
  measurementId: "G-MP2BSVHF48"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// API Endpoints simulados que gravam no Firebase
export const trackingAPI = {
  async visit(data: any) {
    const visitRef = ref(database, `visitors/${data.sessionId}`);
    await set(visitRef, {
      ...data,
      timestamp: serverTimestamp(),
      status: 'online',
      firstVisit: new Date().toISOString()
    });
    console.log('[Firebase] Visita registrada:', data.sessionId);
  },

  async online(data: any) {
    const visitRef = ref(database, `visitors/${data.sessionId}`);
    await update(visitRef, {
      ...data,
      timestamp: serverTimestamp(),
      lastSeen: new Date().toISOString(),
      status: 'online'
    });
  },

  async offline(data: any) {
    const visitRef = ref(database, `visitors/${data.sessionId}`);
    await update(visitRef, {
      status: 'offline',
      timestamp: serverTimestamp(),
      lastSeen: new Date().toISOString()
    });
    console.log('[Firebase] Usuário offline:', data.sessionId);
  },

  async payment(data: any) {
    const paymentRef = push(ref(database, 'payments'));
    await set(paymentRef, {
      ...data,
      timestamp: serverTimestamp(),
      date: new Date().toISOString(),
      paymentId: paymentRef.key
    });
    console.log('[Firebase] Pagamento registrado:', data);
  },

  async qrcode(data: any) {
    const qrRef = push(ref(database, 'qrcodes'));
    await set(qrRef, {
      ...data,
      timestamp: serverTimestamp(),
      date: new Date().toISOString(),
      qrId: qrRef.key
    });
    console.log('[Firebase] QR Code registrado:', data);
  }
};

// Função para escutar dados em tempo real
export function listenToRealtimeData(callback: (data: any) => void) {
  const visitorsRef = ref(database, 'visitors');
  const paymentsRef = ref(database, 'payments');
  const qrcodesRef = ref(database, 'qrcodes');

  onValue(visitorsRef, (snapshot) => {
    const visitors = snapshot.val() || {};
    callback({ type: 'visitors', data: visitors });
  });

  onValue(paymentsRef, (snapshot) => {
    const payments = snapshot.val() || {};
    callback({ type: 'payments', data: payments });
  });

  onValue(qrcodesRef, (snapshot) => {
    const qrcodes = snapshot.val() || {};
    callback({ type: 'qrcodes', data: qrcodes });
  });
}
