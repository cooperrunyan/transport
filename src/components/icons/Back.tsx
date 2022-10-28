import { SVGAttributes } from 'react';

export const BackIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--grey-10)" {...props}>
    <path d="M15.375 5.25L8.625 12L15.375 18.75" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
