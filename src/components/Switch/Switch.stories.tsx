import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '../../styles/storybook-decorators';
import { Switch } from './';

const defaultProps = {
  id: 'switch',
};

storiesOf('Switch', module)
  .addDecorator(withPadding())
  .add('overview', () => <Switch {...defaultProps} />)
  .add('with checked', () => <Switch {...defaultProps} checked={true} />)
  .add('with prepend', () => (
    <Switch {...defaultProps} prepend={<span>Before</span>} />
  ))
  .add('with append', () => (
    <Switch {...defaultProps} append={<span>After</span>} />
  ))
  .add('with prepend and append', () => (
    <Switch
      {...defaultProps}
      prepend={<span>Before</span>}
      append={<span>After</span>}
    />
  ));
