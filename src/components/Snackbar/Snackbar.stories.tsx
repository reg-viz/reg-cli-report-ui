import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Snackbar } from './';

export default {
  title: 'Snackbar',
  decorators: [withPadding()],
};

export const Overview = () => <Snackbar>Snackbar</Snackbar>;
