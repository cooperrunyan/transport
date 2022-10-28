import nookies from 'nookies';

import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import { EmailIcon } from '-/components/icons/Email';
import { FacebookIcon } from '-/components/icons/Facebook';
import { GithubIcon } from '-/components/icons/Github';
import { GoogleIcon } from '-/components/icons/Google';
import { LogoIcon } from '-/components/icons/Logo';
import style from '-/style/pages/login.module.scss';

import { UserData } from '-/lib/getUserData';
import { getTimezone } from '-/lib/getTimezone';
import { app, db } from '-/services/firebase/client';

export { getServerSideProps } from '-/lib/getUserData';

const Page: React.FC<{ data: UserData }> = ({ data }) => {
  return (
    <div>
      <LogoIcon className={style.Logo} />
      <div className={style.content}>
        <LogoIcon className={style.LogoBG} />
        <h1>Log in</h1>
        <ul>
          <li>
            <a href="/login/email">
              <EmailIcon /> Sign in with email
            </a>
          </li>
          <li onClick={() => signinWith(GithubAuthProvider)}>
            <a>
              <GithubIcon />
              Sign in with Github
            </a>
          </li>
          <li onClick={() => signinWith(GoogleAuthProvider)}>
            <a>
              <GoogleIcon />
              Sign in with Google
            </a>
          </li>
          <li onClick={() => signinWith(FacebookAuthProvider)}>
            <a>
              <FacebookIcon /> Sign in with Facebook
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Page;

const signinWith = (P: any) =>
  signInWithPopup(getAuth(app), new P()).then(async cred => {
    await setDoc(doc(collection(db, 'users'), cred.user.uid), {
      username: cred.user.email!.split('@').slice(0, -1).join('@') || '',
      displayName: cred.user.displayName || '',
      photoUrl: cred.user.photoURL || '',
      phoneNumber: cred.user.phoneNumber || '',
      email: cred.user.email,
      tz: getTimezone(),
    });

    const token = await cred.user.getIdToken();
    if (token) nookies.set(undefined, 'token', token, { path: '/' });
  });
