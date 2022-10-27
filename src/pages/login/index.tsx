import { Email } from '../../icons/Email';
import { Facebook } from '../../icons/Facebook';
import { Github } from '../../icons/Github';
import { Google } from '../../icons/Google';
import { Logo } from '../../icons/Logo';
import style from '../../style/pages/login.module.scss';

import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { app } from '../../services/firebase/client';

const Page: React.FC = () => {
  return (
    <div>
      <Logo className={style.Logo} />
      <div className={style.content}>
        <Logo className={style.LogoBG} />
        <h1>Log in</h1>
        <ul>
          <li>
            <a href="/login/email">
              <Email /> Sign in with email
            </a>
          </li>
          <li onClick={() => signInWithRedirect(getAuth(app), new GithubAuthProvider())}>
            <a>
              <Github />
              Sign in with Github
            </a>
          </li>
          <li onClick={() => signInWithRedirect(getAuth(app), new GoogleAuthProvider())}>
            <a>
              <Google />
              Sign in with Google
            </a>
          </li>
          <li onClick={() => signInWithRedirect(getAuth(app), new FacebookAuthProvider())}>
            <a>
              <Facebook /> Sign in with Facebook
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Page;
