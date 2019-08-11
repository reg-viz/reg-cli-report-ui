import React from 'react';

export type Props = React.ComponentProps<'svg'>;

export const SignPassedIcon: React.FC<Props> = ({ fill, ...rest }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
    <path
      d="M4.35284 11.5109C3.8824 11.9926 3.88237 12.7737 4.35284 13.2554L8.63356 17.6387C9.10404 18.1204 9.86685 18.1204 10.3373 17.6387L19.6472 8.10582C20.1176 7.62412 20.1176 6.84303 19.6472 6.36129C19.1767 5.87955 18.4139 5.87959 17.9434 6.36129L9.48542 15.0219L6.05656 11.5109C5.58609 11.0292 4.82328 11.0292 4.35284 11.5109Z"
      fill={fill}
    />
  </svg>
);
