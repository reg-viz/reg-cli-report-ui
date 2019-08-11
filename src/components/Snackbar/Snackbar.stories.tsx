import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Snackbar } from './';

storiesOf('Snackbar', module)
  .addDecorator(withPadding())
  .add('overview', () => <Snackbar>Snackbar</Snackbar>);
