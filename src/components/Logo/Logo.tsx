import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  display: inline-block;
  font-size: 0;
  vertical-align: bottom;
`;

export type Props = React.ComponentProps<'svg'> & {
  size?: number;
};

export const Logo: React.FC<Props> = ({ size, ...rest }) => (
  <Wrapper>
    <svg
      {...rest}
      width={size}
      height={(size as number) * (34 / 20)}
      viewBox="0 0 20 34"
      fill="none"
      aria-label="REG-SUIT">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 16.5705H0L20 33.0435L10 16.5705Z" fill="#7995F0" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 16.5705V33.0435L10 16.5705H0Z" fill="#7995F0" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.66667 21.9922L0 16.5012H10L6.66667 21.9922Z" fill="#A4B8FB" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0V16.5705L5 8.28524L0 0Z" fill="#6A88E9" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0L5 8.2365H15L0 0Z" fill="#A4B8FB" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 16.5705L5 8.2365H15L0 16.5705Z" fill="#7995F0" />
    </svg>
  </Wrapper>
);

Logo.defaultProps = {
  size: 20,
};
