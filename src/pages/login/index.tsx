import { Email } from '../../icons/Email';
import { Facebook } from '../../icons/Facebook';
import { Github } from '../../icons/Github';
import { Google } from '../../icons/Google';
import { Logo } from '../../icons/Logo';
import style from '../../style/pages/login.module.scss';

const Page: React.FC = () => {
  return (
    <div>
      <Logo className={style.Logo} />
      <div className={style.content}>
        <Logo className={style.LogoBG} />
        <h1>Log in</h1>
        <ul>
          <li>
            <a>
              <Email /> Sign in with email
            </a>
          </li>
          <li>
            <a href="https://github.com/login/oauth/authorize?client_id=949c8e5210dee77e9897">
              <Github />
              Sign in with Github
            </a>
          </li>
          <li>
            <a>
              <Google />
              Sign in with Google
            </a>
          </li>
          <li>
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
