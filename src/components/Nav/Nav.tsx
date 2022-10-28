import { CameraIcon } from '-/components/icons/Camera';
import { ChatIcon } from '-/components/icons/Chat';
import { DashboardIcon } from '-/components/icons/Dashboard';
import { LogoIcon } from '-/components/icons/Logo';
import { PhoneIcon } from '-/components/icons/Phone';
import { useEffect, useRef } from 'react';
import { SettingsIcon } from '../icons/Settings';
import { Username } from '../Username/Username';

import style from './Nav.module.scss';
import { useData } from '/src/context/DataContext';

const NAV_VERTICAL_PADDING = 32 * 2; // 32px on each side
const NAV_LOGO_HEIGHT = 36;
const NAV_ITEMS_HEIGHT = 4 * 48 + 3 * 24 + 48; // 4 items, 3 gaps, plus top margin
const LOWER_HEIGHT = 24 + 32; // 24 for settings icon, 32 gap (excluding username)

const TOTAL_SUBTRACTION_HEIGHT = NAV_VERTICAL_PADDING + NAV_LOGO_HEIGHT + NAV_ITEMS_HEIGHT + LOWER_HEIGHT;

export const Nav: React.FC<{ children: any }> = ({ children }) => {
  const data = useData();

  const nav = useRef<HTMLDivElement>(null);
  const lower = useRef<HTMLDivElement>(null);
  const username = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      const usernameHeight = username.current!.clientHeight;
      const amt = nav.current!.clientHeight - TOTAL_SUBTRACTION_HEIGHT - usernameHeight;

      if (amt <= 64) username.current!.classList.add(style.hidden);
      else username.current!.classList.remove(style.hidden);
    };

    handler();

    window.addEventListener('resize', handler);

    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div className={style.layout}>
      <nav ref={nav} className={style.Nav}>
        <div className={style.logo}>
          <LogoIcon />
        </div>
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
        <div ref={lower} className={style.lower}>
          <Username ref={username} orientation="vertical">
            {data?.username || ''}
          </Username>
          <a href="/settings">
            <SettingsIcon />
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
};
