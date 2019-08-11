import { storiesOf } from '@storybook/react';
import React from 'react';
import { withPadding } from '{{ relative "../../src/styles/storybook-decorators" }}';
import { {{ input | pascal }} } from './';

storiesOf('{{ input | pascal }}', module)
  .addDecorator(withPadding())
  .add('overview', () => (
    <{{ input | pascal }}>TODO</{{ input | pascal }}>
  ));
