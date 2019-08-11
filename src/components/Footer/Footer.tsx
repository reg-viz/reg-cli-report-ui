import React from 'react';
import styled from 'styled-components';
import { Space, FontSize, Color } from '../../styles/variables';
import { Logo } from '../Logo';
import { Container } from '../Container';

const Wrapper = styled.footer`
  padding: ${Space * 18}px 0 ${Space * 15}px;
  text-align: center;

  & p {
    margin: ${Space * 2}px 0 0;
    font-weight: bold;
    font-size: ${FontSize.SMALL};
  }

  & a {
    color: ${Color.PRIMARY};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export type Props = {};

export const Footer: React.FC<Props> = () => (
  <Wrapper>
    <Container>
      <Logo size={24} />
      <p>
        powered by <a href="https://github.com/reg-viz">reg-viz</a>
      </p>
    </Container>
  </Wrapper>
);
