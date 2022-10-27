import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './client';

export async function getUserData(uid: string): Promise<UserData> {
  return (await getDoc(doc(collection(db, 'users'), uid))).data() as any;
}

export type UserData = {
  tz: string;
  username: string;
  email: string;
};
