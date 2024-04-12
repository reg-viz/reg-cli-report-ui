import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './';

type Component = typeof Header;
type Story = StoryObj<Component>;

export default {
  component: Header,
  args: {
    variant: 'changed',
    title: 'atoms/reg-suit-component.png',
    current: 2,
    max: 302,
    markersEnabled: true,
    onRequestClose: action('onRequestClose') as any,
    onMarkersToggle: action('onMarkersToggle') as any,
  },
} satisfies Meta<Component>;

export const Overview: Story = {};
