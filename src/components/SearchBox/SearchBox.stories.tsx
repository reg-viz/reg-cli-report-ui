import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchBox } from './';

type Component = typeof SearchBox;
type Story = StoryObj<Component>;

export default {
  component: SearchBox,
  args: {
    placeholder: 'Filter by file name',
    onChange: action('onChange'),
  },
} satisfies Meta<Component>;

export const Overview: Story = {};
