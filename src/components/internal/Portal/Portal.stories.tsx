import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../../styles/storybook-decorators';
import { Portal } from './';

storiesOf('Portal', module)
  .addDecorator(withPadding())
  .add('overview', () => (
    <>
      <div>Outside Portal</div>
      <Portal>Inside Portal</Portal>
    </>
  ));
