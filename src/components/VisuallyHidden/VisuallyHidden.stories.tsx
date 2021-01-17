import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { VisuallyHidden } from './';

export default {
  title: 'VisuallyHidden',
  decorators: [withPadding()],
};

export const Overview = () => <VisuallyHidden>Hidden</VisuallyHidden>;
