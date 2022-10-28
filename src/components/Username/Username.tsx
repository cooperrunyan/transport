import { forwardRef } from 'react';
import style from './Username.module.scss';

export const Username = forwardRef<HTMLParagraphElement, { children: string; orientation?: 'vertical' | 'horizontal' }>(
  ({ children: username, orientation }, ref) => {
    return (
      <p ref={ref} className={style.Username + ' ' + style[orientation || 'horizontal']}>
        {username}
      </p>
    );
  },
);
