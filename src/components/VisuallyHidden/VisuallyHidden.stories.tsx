import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from './';

type Component = typeof VisuallyHidden;
type Story = StoryObj<Component>;

export default {
  component: VisuallyHidden,
  args: {
    children: 'Hidden',
  },
} satisfies Meta<Component>;

export const Overview: Story = {};
