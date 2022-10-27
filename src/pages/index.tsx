import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/client';

const Page: React.FC = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      hello {user?.email} <button onClick={() => signOut(auth)}>logout</button>
    </div>
  );
};

export default Page;
