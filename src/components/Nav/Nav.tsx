import { CameraIcon } from '-/components/icons/Camera';
import { ChatIcon } from '-/components/icons/Chat';
import { DashboardIcon } from '-/components/icons/Dashboard';
import { LogoIcon } from '-/components/icons/Logo';
import { PhoneIcon } from '-/components/icons/Phone';
import { useEffect } from 'react';
import { SettingsIcon } from '../icons/Settings';

import style from './Nav.module.scss';
import { useData } from '/src/context/DataContext';

export const Nav: React.FC<{ children: any }> = ({ children }) => {
  const data = useData();

  useEffect(() => {
    console.log(location.pathname, location.pathname === '/');
  });

  return (
    <div className={style.layout}>
      <nav className={style.Nav}>
        <LogoIcon className={style.logo} />
        <div className={style.content}>
          <ul>
            <li>
              <a href="/" className={location.pathname === '/' ? style.active : ''}>
                <DashboardIcon />
              </a>
            </li>
            <li>
              <a href="/messages" className={location.pathname === '/messages' ? style.active : ''}>
                <ChatIcon />
              </a>
            </li>
            <li>
              <a href="/video" className={location.pathname === '/video' ? style.active : ''}>
                <CameraIcon />
              </a>
            </li>
            <li>
              <a href="/phone" className={location.pathname === '/phone' ? style.active : ''}>
                <PhoneIcon />
              </a>
            </li>
          </ul>
        </div>
        <div className={style.lower}>
          <p>{data?.username}</p>
          <a href="/settings">
            <SettingsIcon />
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
};
