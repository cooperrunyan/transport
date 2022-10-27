import admin from 'firebase-admin';
import serviceAccount from '../../../secret.json';

if (admin.apps.length === 0)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });

export const verifyIdToken = (token: string) => admin.auth().verifyIdToken(token);
