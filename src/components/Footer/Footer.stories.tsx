import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Footer } from './';

storiesOf('Footer', module)
  .addDecorator(withPadding())
  .add('overview', () => <Footer />);
