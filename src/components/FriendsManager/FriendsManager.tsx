import style from './FriendsManager.module.scss';
import { useData } from '/src/context/DataContext';

export const FriendsManager: React.FC = () => {
  const data = useData();

  if (!data) return <></>;
  return <div className={style.FriendsManager}>{data.displayName}</div>;
};
