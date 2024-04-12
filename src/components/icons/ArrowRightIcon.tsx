import React from 'react';

export type Props = React.ComponentProps<'svg'>;

export const ArrowRightIcon = ({ fill, ...rest }: Props) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
    <path
      d="M9.00278 17.5874C9.39066 17.9752 10.0195 17.9752 10.4074 17.5874L14.9974 12.9973C15.1927 12.802 15.2897 12.5454 15.2883 12.2894C15.2897 12.0334 15.1927 11.7773 14.9974 11.582L10.4074 6.99191C10.0195 6.6041 9.39066 6.6041 9.00278 6.99191C8.6149 7.37985 8.6149 8.00864 9.00278 8.39658L12.8959 12.2896L9.00278 16.1827C8.6149 16.5706 8.6149 17.1994 9.00278 17.5874Z"
      fill={fill}
    />
  </svg>
);
