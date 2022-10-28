import { auth, db } from '-/services/firebase/client';
import { UserData } from '-/types/UserData';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import YAML from 'yaml';

const DataContext = createContext<UserData | null>(null);

export const DataContextProvider: React.FC<{ children: any; data: UserData }> = ({ children, data: startData }) => {
  const [data, setData] = useState(startData);
  const [user] = useAuthState(auth);

  useEffect(() => {
    return onSnapshot(doc(collection(db, 'users'), user?.uid), doc => {
      setData(parseData(doc.data() || (data as any)));
    });
  }, [user]);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);

const parseData = (d: UserData) =>
  ({
    ...d,
    friends: d.friends.map(f => YAML.parse(f as any)),
    notifications: d.notifications.map(n => YAML.parse(n as any)),
  } as UserData);
