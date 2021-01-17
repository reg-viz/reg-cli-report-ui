import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Footer } from './';

export default {
  title: 'Footer',
  decorators: [withPadding()],
};

export const Overview = () => <Footer />;
