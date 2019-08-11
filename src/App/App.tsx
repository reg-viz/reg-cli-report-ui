import React from 'react';
import styled from 'styled-components';
import { Sidebar } from '../components/Sidebar';
import { GlobalStyle } from '../styles/global-styles';
import { Logo } from '../components/Logo';
import { Space, Shadow, Color } from '../styles/variables';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';
import { Viewer } from '../components/Viewer';
import { Notification } from '../components/Notification';
import { IconButton } from '../components/IconButton';
import { HelpIcon } from '../components/icons/HelpIcon';

const Layout = styled.main`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  flex: 1 0 auto;
  max-width: 100%;
`;

const Brand = styled.span`
  position: absolute;
  top: ${Space * 3}px;
  right: ${Space * 3}px;
`;

const Help = styled.span`
  position: fixed;
  right: ${Space * 3}px;
  bottom: ${Space * 3}px;
  border-radius: 50%;
  box-shadow: ${Shadow.LEVEL2};
`;

export type Props = {};

export const App: React.FC<Props> = () => (
  <>
    <GlobalStyle />

    <Brand>
      <Logo size={20} />
    </Brand>

    <Layout>
      <Sidebar />
      <Content>
        <Main />
        <Footer />
      </Content>
    </Layout>

    <Help>
      <IconButton variant="black">
        <HelpIcon fill={Color.WHITE} />
      </IconButton>
    </Help>

    <Viewer />
    <Notification />
  </>
);
