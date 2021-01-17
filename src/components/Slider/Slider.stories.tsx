import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Slider } from './';

export default {
  title: 'Slider',
  decorators: [withPadding()],
};

export const Overview = () => <Slider min={0} max={1} step={0.01} />;
