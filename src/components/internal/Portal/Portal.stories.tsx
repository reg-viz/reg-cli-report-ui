import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Portal } from './';

type Component = typeof Portal;
type Story = StoryObj<Component>;

export default {
  component: Portal,
} satisfies Meta<Component>;

export const Overview: Story = {
  render: () => (
    <>
      <div>Outside Portal</div>
      <Portal>Inside Portal</Portal>
    </>
  ),
};
