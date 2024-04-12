import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './';

type Component = typeof Slider;
type Story = StoryObj<Component>;

export default {
  component: Slider,
  args: {
    min: 0,
    max: 1,
    step: 0.01,
  },
} satisfies Meta<Component>;

export const Overview: Story = {};
