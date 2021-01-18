import React from 'react';
import { action } from '@storybook/addon-actions';
import { withPadding } from '../../styles/storybook-decorators';
import { Header } from './';

export default {
  title: 'Header',
  decorators: [withPadding()],
};

export const Overview = () => (
  <Header
    variant="changed"
    title="atoms/reg-suit-component.png"
    current={2}
    max={302}
    markersEnabled={true}
    onRequestClose={action('onRequestClose') as any}
    onMarkersToggle={action('onMarkersToggle') as any}
  />
);
