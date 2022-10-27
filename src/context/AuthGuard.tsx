import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/client';

const loginRoutes = [/\/login/, /\/login\/email/];

export const AuthGuard: React.FC<{ children: any }> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (error) return console.error(error);
    if (!loading && !user && !isLoginRoute(window.location.href)) router.push('/login');
  }, [user, loading, error]);

  if (!loading && user && isLoginRoute(router.route)) router.push('/');
  if ((!loading && user) || isLoginRoute(router.route)) return children;
  if (loading) return <p>loading...</p>;
  if (!user) return null;
};

function isLoginRoute(route: string) {
  for (const loginRoute of loginRoutes) {
    if (loginRoute.test(route)) return true;
  }
  return false;
}