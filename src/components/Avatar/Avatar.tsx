import style from './Avatar.module.scss';
import { photoUrl } from '/src/lib/photoUrl';

export const Avatar: React.FC<{ photo: string; size?: number }> = ({ photo, size }) => {
  const s = size || 48;
  return (
    <img
      className={style.Avatar}
      src={photoUrl(photo)}
      style={{
        width: `calc(${s}rem / 16)`,
        height: `calc(${s}rem / 16)`,
      }}
    />
  );
};
