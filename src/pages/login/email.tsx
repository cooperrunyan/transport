import nookies from 'nookies';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { useRouter } from 'next/router';

import { LogoIcon } from '-/components/icons/Logo';
import { auth, db } from '-/services/firebase/client';
import style from '-/style/pages/login.module.scss';
import { useRef, useState } from 'react';

import { getTimezone } from '-/lib/getTimezone';
import type { UserData } from '-/lib/getUserData';
import { DEFAULT_AVATAR_URL } from '/src/config/constants';

export { getServerSideProps } from '-/lib/getUserData';

const Page: React.FC<{ data: UserData }> = ({ data }) => {
  const router = useRouter();
  const [activePage, setActivePage] = useState<'login' | 'signup'>('login');

  const loginEmail = useRef<HTMLInputElement>(null);
  const loginPassword = useRef<HTMLInputElement>(null);

  const signupEmail = useRef<HTMLInputElement>(null);
  const signupUsername = useRef<HTMLInputElement>(null);
  const signupDisplayName = useRef<HTMLInputElement>(null);
  const signupPassword = useRef<HTMLInputElement>(null);
  const signupConfirmPassword = useRef<HTMLInputElement>(null);

  return (
    <div>
      <LogoIcon className={style.Logo} />
      <div className={style.content + ' ' + style.email}>
        <LogoIcon className={style.LogoBG} />
        <h1>
          <button onClick={() => setActivePage('login')} className={activePage === 'login' ? style.active : style.inactive}>
            Log in
          </button>
          <button onClick={() => setActivePage('signup')} className={activePage === 'signup' ? style.active : style.inactive}>
            Sign up
          </button>
        </h1>
        {activePage === 'login' && (
          <form
            onSubmit={async e => {
              e.preventDefault();

              const username = loginEmail.current!.value;

              const isEmail =
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(
                  username,
                );

              let email = '';

              if (isEmail) email = username;
              else {
                const q = query(collection(db, 'users'), where('username', '==', username.toLowerCase()));
                (await getDocs(q)).forEach(acc => {
                  email = acc.data().email;
                });
              }

              const cred = await signInWithEmailAndPassword(auth, email, loginPassword.current!.value);
              const token = await cred.user.getIdToken();
              if (token) {
                nookies.set(undefined, 'token', token, { path: '/*' });
                if (auth.currentUser) router.push('/');
              }
            }}>
            <input ref={loginEmail} name="email" type="text" placeholder="Username/Email" onChange={e => (e.target.value = e.target.value.toLowerCase())} />
            <input ref={loginPassword} name="password" type="password" placeholder="Password" />
            <button type="submit">Log in</button>
          </form>
        )}
        {activePage === 'signup' && (
          <form
            onSubmit={async e => {
              e.preventDefault();
              try {
                const cred = await createUserWithEmailAndPassword(auth, signupEmail.current!.value, signupPassword.current!.value);
                await setDoc(doc(collection(db, 'users'), cred.user.uid), {
                  username: signupUsername.current!.value.toLowerCase(),
                  displayName: signupDisplayName.current!.value,
                  phoneNumber: '',
                  photoUrl: DEFAULT_AVATAR_URL,
                  email: signupEmail.current!.value,
                  tz: getTimezone(),
                } as UserData);

                const token = await cred.user.getIdToken();
                if (token) {
                  nookies.set(undefined, 'token', token, { path: '/' });
                  if (auth.currentUser) router.push('/');
                }
              } catch (err) {
                console.error(err);
              }
            }}>
            <input ref={signupEmail} name="email" type="text" placeholder="Email" />
            <input
              ref={signupUsername}
              onChange={e => {
                e.target.value = e.target.value.toLowerCase();
              }}
              name="username"
              type="text"
              placeholder="Username"
            />
            <input ref={signupDisplayName} name="displayName" type="text" placeholder="Display Name" />
            <input ref={signupPassword} name="password" type="password" placeholder="Password" />
            <input ref={signupConfirmPassword} name="password" type="password" placeholder="Confirm Password" />
            <button type="submit">Sign up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Page;
