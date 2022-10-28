import style from './NotificationsCenter.module.scss';
import { useData } from '/src/context/DataContext';

export const NotificationsCenter: React.FC = () => {
  const data = useData();

  if (!data) return <></>;
  return <div className={style.NotificationsCenter}></div>;
};
