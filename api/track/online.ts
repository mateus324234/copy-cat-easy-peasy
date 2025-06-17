
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
    console.log('[API Online] Dados recebidos:', data);

    const database = getDatabase();
    const visitRef = database.ref(`visitors/${data.sessionId}`);
    
    await visitRef.update({
      ...data,
      timestamp: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      status: 'online'
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Online status updated' 
    });
  } catch (error) {
    console.error('[API Online] Erro:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to update online status' 
    });
  }
}
