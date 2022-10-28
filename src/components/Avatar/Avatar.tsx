import style from './Avatar.module.scss';

export const Avatar: React.FC<{ photo: string }> = ({ photo }) => {
  return <img className={style.Avatar} src={photo} />;
};
