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
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="REG-SUIT"
      {...rest}
    >
      <path
        d="M8.61739 13.0679L8.6321 13.0421H8.60268L8.61739 13.0679Z"
        fill="#FF4438"
      />
      <path
        d="M1 13.0421L4.81606 19.6519L5.23897 18.92L1.84461 13.0421H1Z"
        fill="#FF4438"
      />
      <path
        d="M6.08353 17.4564L3.535 13.0421H2.68917L5.66062 18.1882L6.08353 17.4564Z"
        fill="#FF4438"
      />
      <path
        d="M6.92829 15.9939L5.22437 13.0421H4.37976L6.50537 16.7258L6.92829 15.9939Z"
        fill="#FF4438"
      />
      <path
        d="M7.77292 14.5303L6.9136 13.0421H6.06899L7.35 15.2621L7.77292 14.5303Z"
        fill="#FF4438"
      />
      <path
        d="M8.61742 13.0679L8.60271 13.0421H7.7581L8.1945 13.7997L8.61742 13.0679Z"
        fill="#FF4438"
      />
      <path
        d="M15.3633 3L5.54797 20H13.5086L23.3239 3H15.3633Z"
        fill="#FF4438"
      />
    </svg>
  </Wrapper>
);

Logo.defaultProps = {
  size: 24,
};
