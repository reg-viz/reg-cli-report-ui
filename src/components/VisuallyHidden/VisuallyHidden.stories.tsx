import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { VisuallyHidden } from './';

storiesOf('VisuallyHidden', module)
  .addDecorator(withPadding())
  .add('overview', () => <VisuallyHidden>Hidden</VisuallyHidden>);
