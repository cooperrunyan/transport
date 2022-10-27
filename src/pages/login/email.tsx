import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../../firebase/client';
import { Logo } from '../../icons/Logo';
import style from '../../style/pages/login.module.scss';

const Page: React.FC = () => {
  const router = useRouter();
  const [activePage, setActivePage] = useState<'login' | 'signup'>('login');

  const loginEmail = useRef<HTMLInputElement>(null);
  const loginPassword = useRef<HTMLInputElement>(null);

  const signupEmail = useRef<HTMLInputElement>(null);
  const signupUsername = useRef<HTMLInputElement>(null);
  const signupPassword = useRef<HTMLInputElement>(null);
  const signupConfirmPassword = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (auth.currentUser) router.push('/');
  });

  return (
    <div>
      <Logo className={style.Logo} />
      <div className={style.content + ' ' + style.email}>
        <Logo className={style.LogoBG} />
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
              signInWithEmailAndPassword(auth, loginEmail.current!.value, loginPassword.current!.value);
              if (auth.currentUser) router.push('/');
            }}>
            <input ref={loginEmail} name="email" type="text" placeholder="Username/Email" />
            <input ref={loginPassword} name="password" type="password" placeholder="Password" />
            <button type="submit">Log in</button>
          </form>
        )}
        {activePage === 'signup' && (
          <form
            onSubmit={async e => {
              e.preventDefault();
              try {
                await createUserWithEmailAndPassword(auth, signupEmail.current!.value, signupPassword.current!.value);
              } catch (err) {
                console.error(err);
              }
            }}>
            <input ref={signupEmail} name="email" type="text" placeholder="Email" />
            <input ref={signupUsername} name="username" type="text" placeholder="Username" />
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
