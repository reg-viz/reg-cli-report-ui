import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Logo } from './';

export default {
  title: 'Logo',
  decorators: [withPadding()],
};

export const Overview = () => (
  <>
    <Logo /> <Logo size={30} /> <Logo size={40} />
  </>
);
