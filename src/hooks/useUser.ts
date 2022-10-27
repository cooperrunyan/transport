import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase/client';
import { getUserData } from '../services/firebase/getUserData';

export function useUser() {
  const [alive, setAlive] = useState(true);
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState<{
    tz: string;
    username: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (!user) return;
    getUserData(user.uid).then(data => {
      if (!alive) return;
      setData(data);
    });

    return () => setAlive(false);
  }, [user]);

  return {
    user,
    loading,
    error,
    data,
  };
}
