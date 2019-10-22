import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Color } from '../../styles/variables';
import { Spinner } from './';

storiesOf('Spinner', module)
  .addDecorator(withPadding())
  .add('overview', () => <Spinner aria-label="Loading..." />)
  .add('with large', () => <Spinner size={64} aria-label="Loading..." />)
  .add('with gray', () => <Spinner color={Color.TEXT_SUB} aria-label="Loading..." />);
