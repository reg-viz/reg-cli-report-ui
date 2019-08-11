import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Sign } from './';

storiesOf('Sign', module)
  .addDecorator(withPadding())
  .add('overview', () => (
    <>
      <Sign variant="passed" />
      <Sign variant="new" />
      <Sign variant="changed" />
      <Sign variant="deleted" />
    </>
  ));
