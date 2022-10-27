import nookies from 'nookies';

import { collection, doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { verifyIdToken } from '../services/firebase/admin';
import { db } from '../services/firebase/client';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = await verifyIdToken(nookies.get(context).token);
  const data = token ? (await getUserData(token?.uid)) || null : null;

  return {
    props: { data },
  };
}

export async function getUserData(uid: string): Promise<UserData> {
  return (await getDoc(doc(collection(db, 'users'), uid))).data() as any;
}

export type UserData = {
  tz: string;
  username: string;
  email: string;
};
