import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Slider } from './';

storiesOf('Slider', module)
  .addDecorator(withPadding())
  .add('overview', () => <Slider min={0} max={1} step={0.01} />);
