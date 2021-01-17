import React from 'react';
import { withPadding } from '../../../styles/storybook-decorators';
import { Portal } from './';

export default {
  title: 'Portal',
  decorators: [withPadding()],
};

export const Overview = () => (
  <>
    <div>Outside Portal</div>
    <Portal>Inside Portal</Portal>
  </>
);
