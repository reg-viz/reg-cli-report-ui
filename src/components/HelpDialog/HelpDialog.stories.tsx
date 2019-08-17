import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
import { HelpDialog } from './';

const defaultProps = {
  open: true,
  onRequestClose: action('onRequestClose'),
};

storiesOf('HelpDialog', module)
  .addDecorator(withPadding())
  .add('overview', () => <HelpDialog {...defaultProps} />);
