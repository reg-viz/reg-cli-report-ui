import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { PoweredBy } from './';

storiesOf('PoweredBy', module)
  .addDecorator(withPadding())
  .add('overview', () => <PoweredBy />);
