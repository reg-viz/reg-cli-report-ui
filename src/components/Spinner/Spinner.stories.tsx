import type { Meta, StoryObj } from '@storybook/react';
import { Color } from '../../styles/variables';
import { Spinner } from './';

type Component = typeof Spinner;
type Story = StoryObj<Component>;

export default {
  component: Spinner,
  args: {
    'aria-label': 'Loading...',
  },
} satisfies Meta<Component>;

export const Overview: Story = {};

export const WithLarge: Story = {
  args: {
    size: 64,
  },
};

export const WithGray: Story = {
  args: {
    color: Color.TEXT_SUB,
  },
};
