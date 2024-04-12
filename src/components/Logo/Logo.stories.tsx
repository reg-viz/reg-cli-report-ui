import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Logo } from './';

type Component = typeof Logo;
type Story = StoryObj<Component>;

export default {
  component: Logo,
} satisfies Meta<Component>;

export const Overview: Story = {
  render: () => (
    <>
      <Logo /> <Logo size={30} /> <Logo size={40} />
    </>
  ),
};
