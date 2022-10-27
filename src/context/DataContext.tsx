import { createContext, useContext } from 'react';
import { UserData } from '../lib/getUserData';

const DataContext = createContext<UserData | null>(null);

export const DataContextProvider: React.FC<{ children: any; data: UserData }> = ({ children, data }) => (
  <DataContext.Provider value={data}>{children}</DataContext.Provider>
);

export const useData = () => useContext(DataContext);
