import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Toggle } from './';

type Component = typeof Toggle;
type Story = StoryObj<Component>;

export default {
  component: Toggle,
  args: {
    onClick: action('onClick') as any,
  },
} satisfies Meta<Component>;

export const Overview: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return <Toggle {...args} open={open} onClick={() => setOpen(!open)} />;
  },
};

export const WithOpen: Story = {
  args: {
    open: true,
  },
};

export const WithClose: Story = {
  args: {
    open: false,
  },
};
