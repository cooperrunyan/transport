import 'firebase/auth';
import firebase from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

export const app = firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSEGING_SENDER_ID,
  appId: process.env.APP_ID,
});

export { firebase };

export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
