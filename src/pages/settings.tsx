import style from '-/style/pages/settings.module.scss';

import { auth, db } from '-/services/firebase/client';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar } from '../components/Avatar/Avatar';
import { BackIcon } from '../components/icons/Back';
import { LogoIcon } from '../components/icons/Logo';
import { DataContextProvider } from '../context/DataContext';
import { timezones } from '../lib/timezones';
import { logout } from '../lib/logout';
import { UserData } from '../types/UserData';

const Page: React.FC<{ data: UserData }> = ({ data }) => {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('@');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [tz, setTz] = useState('');

  const save = async () => {
    console.log({
      username,
      displayName,
      email,
      phoneNumber,
      tz,
    });

    await updateDoc(doc(collection(db, 'users'), user?.uid), {
      username,
      displayName,
      phoneNumber,
      email,
      tz,
    } as UserData);

    resetState();
    router.back();
  };

  const resetState = () => {
    setDisplayName(data.displayName);
    setUsername(data.username);
    setEmail(data.email);
    setPhoneNumber(data.phoneNumber);
    setTz(data.tz);
  };

  useEffect(() => resetState(), []);

  if (!user) return <></>;

  return (
    <DataContextProvider data={data}>
      <div className={style.layout}>
        <div className={style.bar}>
          <LogoIcon />
          <div className={style.lower}>
            <p className={style.username}>{data.username}</p>
            <button onClick={() => router.back()}>
              <BackIcon />
            </button>
          </div>
        </div>
        <div className={style.main}>
          <h1 className={style.settingsText}>Settings</h1>
          <div className={style.content}>
            <Avatar photo={data.photoUrl} size={64} />
            <form
              className={style.data}
              onSubmit={e => {
                e.preventDefault();
                save();
              }}>
              <p>Display Name:</p>
              <input className={style.displayName} type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />

              <div className={style.row}>
                <p>Time Zone:</p>
                <select value={tz} onChange={e => setTz(e.target.value)}>
                  {timezones.map(tz => (
                    <option value={tz.code} key={tz.code}>
                      {tz.code} ({tz.name}) {tz.relative}
                    </option>
                  ))}
                </select>
              </div>

              <div className={style.row}>
                <p>Phone Number:</p>
                <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="(000) 000-0000" />
              </div>

              <div className={style.row}>
                <p>Email:</p>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div className={style.row}>
                <p>Username:</p>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className={style.buttonRow}>
                <button
                  type="submit"
                  disabled={
                    data.displayName === displayName && data.email === email && data.phoneNumber === phoneNumber && data.tz === tz && data.username === username
                  }>
                  Save
                </button>

                <div className={style.dangerZone}>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      logout();
                    }}>
                    Logout
                  </button>
                  <button
                    onClick={e => {
                      e.preventDefault();
                    }}>
                    Delete Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DataContextProvider>
  );
};

export default Page;

export { getServerSideProps } from '-/lib/getUserData';
