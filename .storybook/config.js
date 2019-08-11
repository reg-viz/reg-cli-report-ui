import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { GlobalStyle } from '../src/styles/global-styles';

addDecorator((story) => (
  <React.Fragment>
    <GlobalStyle />
    {story()}
  </React.Fragment>
));

const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
