import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sign } from './';

type Component = typeof Sign;
type Story = StoryObj<Component>;

export default {
  component: Sign,
} satisfies Meta<Component>;

export const Overview: Story = {
  render: () => (
    <>
      <Sign variant="passed" />
      <Sign variant="new" />
      <Sign variant="changed" />
      <Sign variant="deleted" />
    </>
  ),
};
