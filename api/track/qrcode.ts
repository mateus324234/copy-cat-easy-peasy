
import { initializeApp, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

const firebaseConfig = {
  databaseURL: "https://backend-69215-default-rtdb.firebaseio.com",
  projectId: "backend-69215"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default async function handler(req: any, res: any) {
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
    console.log('[API QRCode] Dados recebidos:', data);

    const database = getDatabase();
    const qrRef = database.ref('qrcodes').push();
    
    await qrRef.set({
      ...data,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString(),
      qrId: qrRef.key
    });

    console.log('[API QRCode] QR Code registrado:', data);
    
    return res.status(200).json({ 
      success: true, 
      message: 'QR Code tracked successfully' 
    });
  } catch (error) {
    console.error('[API QRCode] Erro:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to track QR code' 
    });
  }
}
