import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
import { Header } from './';

storiesOf('Header', module)
  .addDecorator(withPadding())
  .add('overview', () => (
    <Header
      variant="changed"
      title="atoms/reg-suit-component.png"
      current={2}
      max={302}
      onRequestClose={action('onRequestClose') as any}
    />
  ));
