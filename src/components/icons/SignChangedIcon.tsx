import React from 'react';

export type Props = React.ComponentProps<'svg'>;

export const SignChangedIcon: React.FC<Props> = ({ fill, ...rest }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
    <path
      d="M3 19H21L12 3L3 19ZM12.8182 16.4737H11.1818V14.7895H12.8182V16.4737ZM12.8182 13.1053H11.1818V9.73684H12.8182V13.1053Z"
      fill={fill}
    />
  </svg>
);
