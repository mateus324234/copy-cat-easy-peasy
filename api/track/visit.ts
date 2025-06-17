
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// Configuração do Firebase Admin
const firebaseConfig = {
  apiKey: "AIzaSyDsGz4eMdK4AvSotMRubBA6hLZ9wLdTWlY",
  authDomain: "backend-69215.firebaseapp.com",
  databaseURL: "https://backend-69215-default-rtdb.firebaseio.com",
  projectId: "backend-69215",
  storageBucket: "backend-69215.firebasestorage.app",
  messagingSenderId: "939916254169",
  appId: "1:939916254169:web:749b10fe7817f82f2617c8"
};

// Inicializar Firebase Admin apenas uma vez
if (!getApps().length) {
  initializeApp({
    databaseURL: firebaseConfig.databaseURL,
    projectId: firebaseConfig.projectId
  });
}

export default async function handler(req: any, res: any) {
  // Configurar CORS para permitir requests de qualquer origem
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    console.log('[API Visit] Dados recebidos:', data);

    const database = getDatabase();
    const visitRef = database.ref(`visitors/${data.sessionId}`);
    
    await visitRef.set({
      ...data,
      timestamp: new Date().toISOString(),
      status: 'online',
      firstVisit: new Date().toISOString()
    });

    console.log('[API Visit] Visita registrada:', data.sessionId);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Visit tracked successfully' 
    });
  } catch (error) {
    console.error('[API Visit] Erro:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to track visit' 
    });
  }
}
