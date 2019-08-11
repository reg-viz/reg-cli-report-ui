import React from 'react';

export type Props = React.ComponentProps<'svg'>;

export const MoreIcon: React.FC<Props> = ({ fill, ...rest }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
    <circle cx={12} cy={5} r={2} fill={fill} />
    <circle cx={12} cy={12} r={2} fill={fill} />
    <circle cx={12} cy={19} r={2} fill={fill} />
  </svg>
);
