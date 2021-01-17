import React from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
import { SearchBox } from './';

export default {
  title: 'SearchBox',
  decorators: [withPadding()],
};

export const Overview = () => (
  <SearchBox placeholder="Filter by file name" onChange={action('onChange')} />
);
