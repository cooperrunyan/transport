import { Email } from '../../components/icons/Email';
import { Facebook } from '../../components/icons/Facebook';
import { Github } from '../../components/icons/Github';
import { Google } from '../../components/icons/Google';
import { Logo } from '../../components/icons/Logo';
import style from '../../style/pages/login.module.scss';

import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { app, db } from '../../services/firebase/client';

const signinWith = (p: any) =>
  signInWithPopup(getAuth(app), new p()).then(cred => {
    return setDoc(doc(collection(db, 'users'), cred.user.uid), {
      username: cred.user.email!.split('@').slice(0, -1).join('@'),
      email: cred.user.email,
      tz: 'MST',
    });
  });

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
          <li onClick={() => signinWith(GithubAuthProvider)}>
            <a>
              <Github />
              Sign in with Github
            </a>
          </li>
          <li onClick={() => signinWith(GoogleAuthProvider)}>
            <a>
              <Google />
              Sign in with Google
            </a>
          </li>
          <li onClick={() => signinWith(FacebookAuthProvider)}>
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
