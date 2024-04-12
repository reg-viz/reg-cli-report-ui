import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Switch } from './';

type Component = typeof Switch;
type Story = StoryObj<Component>;

export default {
  component: Switch,
  args: {
    id: 'switch',
  },
} satisfies Meta<Component>;

export const Overview: Story = {};

export const WithChecked: Story = {
  args: {
    checked: true,
  },
};

export const WithPrepend: Story = {
  args: {
    prepend: <span>Before</span>,
  },
};

export const WithAppend: Story = {
  args: {
    prepend: <span>After</span>,
  },
};

export const WithPrependAndAppend: Story = {
  args: {
    prepend: <span>Before</span>,
    append: <span>After</span>,
  },
};
