import React from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
import { HelpDialog } from './';

const defaultProps = {
  open: true,
  onRequestClose: action('onRequestClose'),
};

export default {
  title: 'HelpDialog',
  decorators: [withPadding()],
};

export const Overview = () => <HelpDialog {...defaultProps} />;
