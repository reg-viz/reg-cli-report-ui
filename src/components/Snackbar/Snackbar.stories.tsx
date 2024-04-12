import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './';

type Component = typeof Snackbar;
type Story = StoryObj<Component>;

export default {
  component: Snackbar,
  args: {
    children: 'Snackbar',
  },
} satisfies Meta<Component>;

export const Overview: Story = {};
