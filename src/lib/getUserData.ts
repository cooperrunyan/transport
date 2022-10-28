import nookies from 'nookies';

import { collection, doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';

import { verifyIdToken } from '-/services/firebase/admin';
import { db } from '-/services/firebase/client';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const token = await verifyIdToken(nookies.get(ctx).token);
    const data = token ? (await getUserData(token?.uid)) || null : null;

    if (data)
      return {
        props: { data },
      };
    else {
      if (ctx.req.url?.startsWith('/login')) return { props: {} };
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
      return { props: {} };
    }
  } catch {
    return { props: {} };
  }
}

export async function getUserData(uid: string): Promise<UserData> {
  return (await getDoc(doc(collection(db, 'users'), uid))).data() as any;
}

export type UserData = {
  tz: string;
  photoUrl: string;
  phoneNumber: string;
  displayName: string;
  username: string;
  email: string;
};
