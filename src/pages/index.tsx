import { signOut } from 'firebase/auth';
import { useUser } from '../hooks/useUser';
import { auth } from '../services/firebase/client';

const Page: React.FC = () => {
  const { user, data } = useUser();
  return (
    <div>
      hello {user?.email} {data?.username} <button onClick={() => signOut(auth)}>logout</button>
    </div>
  );
};

export default Page;
