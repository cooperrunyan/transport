import style from './NameCluster.module.scss';

import Image from 'next/image';
import { Avatar } from '../Avatar/Avatar';

interface Props {
  photo: string;
  name: string;
  username: string;
}

export const NameCluster: React.FC<Props> = ({ photo, name, username }) => {
  return (
    <div className={style.NameCluster}>
      <Avatar photo={photo} />
      <div className={style.nameGroup}>
        <p className={style.name}>{name}</p>
        <p className={style.username}>{username}</p>
      </div>
    </div>
  );
};
