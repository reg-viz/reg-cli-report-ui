import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Sign } from './';

export default {
  title: 'Sign',
  decorators: [withPadding()],
};

export const Overview = () => (
  <>
    <Sign variant="passed" />
    <Sign variant="new" />
    <Sign variant="changed" />
    <Sign variant="deleted" />
  </>
);
