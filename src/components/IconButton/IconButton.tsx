import { HTMLAttributes } from 'react';
import style from './IconButton.module.scss';

interface Props {
  children: any;
  active?: boolean;
  size?: number;
  href?: string;
}

export const IconButton: React.FC<Props & HTMLAttributes<HTMLAnchorElement>> = ({ children, onClick, size, href, active, className, ...props }) => {
  const s = `calc(${size || 24}rem / 16)`;
  return (
    <div className={style.root} style={{ width: s, height: s }}>
      <a
        onClick={e => {
          e.stopPropagation();
          if (!href) e.preventDefault();
          if (onClick) onClick(e);
        }}
        href={href}
        className={style.IconButton + ' ' + (active ? style.active : '') + ' ' + className}
        {...props}>
        {children}
      </a>
    </div>
  );
};
