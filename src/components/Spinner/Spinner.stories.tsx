import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Color } from '../../styles/variables';
import { Spinner } from './';

export default {
  title: 'Spinner',
  decorators: [withPadding()],
};

export const Overview = () => <Spinner aria-label="Loading..." />;

export const WithLarge = () => <Spinner size={64} aria-label="Loading..." />;

export const WithGray = () => (
  <Spinner color={Color.TEXT_SUB} aria-label="Loading..." />
);
