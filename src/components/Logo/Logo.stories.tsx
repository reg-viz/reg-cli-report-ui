import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Logo } from './';

storiesOf('Logo', module)
  .addDecorator(withPadding())
  .add('overview', () => (
    <>
      <Logo /> <Logo size={30} /> <Logo size={40} />
    </>
  ));
