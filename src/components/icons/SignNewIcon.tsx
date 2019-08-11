import React from 'react';

export type Props = React.ComponentProps<'svg'>;

export const SignNewIcon: React.FC<Props> = ({ fill, ...rest }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
    <path
      d="M20 18.2222V5.77778C20 4.8 19.2 4 18.2222 4H5.77778C4.8 4 4 4.8 4 5.77778V18.2222C4 19.2 4.8 20 5.77778 20H18.2222C19.2 20 20 19.2 20 18.2222ZM8.88889 13.3333L11.1111 16.0089L14.2222 12L18.2222 17.3333H5.77778L8.88889 13.3333Z"
      fill={fill}
    />
  </svg>
);
