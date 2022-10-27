import nookies from 'nookies';

import { signOut } from 'firebase/auth';
import { GetServerSidePropsContext } from 'next';
import { verifyIdToken } from '../services/firebase/admin';
import { auth } from '../services/firebase/client';
import { getUserData, UserData } from '../services/firebase/getUserData';

const Page: React.FC<{ data: UserData }> = ({ data }) => {
  return (
    <div>
      hello {data.email} {data.username} <button onClick={() => signOut(auth)}>logout</button>
    </div>
  );
};

export default Page;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = await verifyIdToken(nookies.get(context).token);
  const data = await getUserData(token.uid);

  return {
    props: { data },
  };
}
