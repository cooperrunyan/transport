import { signOut } from 'firebase/auth';
import { auth } from '-/services/firebase/client';

import nookies from 'nookies';

export function logout() {
  signOut(auth);
  nookies.destroy(undefined, 'token');
}
