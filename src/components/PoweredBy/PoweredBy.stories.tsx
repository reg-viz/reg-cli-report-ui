import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { PoweredBy } from './';

export default {
  title: 'PoweredBy',
  decorators: [withPadding()],
};

export const Overview = () => <PoweredBy />;
