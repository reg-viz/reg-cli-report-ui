import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Switch } from './';

const defaultProps = {
  id: 'switch',
};

export default {
  title: 'Switch',
  decorators: [withPadding()],
};

export const Overview = () => <Switch {...defaultProps} />;

export const WithChecked = () => <Switch {...defaultProps} checked={true} />;

export const WithPrepend = () => (
  <Switch {...defaultProps} prepend={<span>Before</span>} />
);

export const WithAppend = () => (
  <Switch {...defaultProps} append={<span>After</span>} />
);

export const WithPrependAndAppend = () => (
  <Switch
    {...defaultProps}
    prepend={<span>Before</span>}
    append={<span>After</span>}
  />
);
