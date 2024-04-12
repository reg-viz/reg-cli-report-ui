import type { Meta, StoryObj } from '@storybook/react';
import { PoweredBy } from './';

type Component = typeof PoweredBy;
type Story = StoryObj<Component>;

export default {
  component: PoweredBy,
} satisfies Meta<Component>;

export const Overview: Story = {};
